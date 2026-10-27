import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Interactive WebGL "mesh cloud": a geodesic network core wrapped in orbit rings with
 * travelling data packets and a slow particle field. Reacts to pointer and scroll,
 * pauses when off-screen, follows the light/dark theme and honours reduced motion.
 */

const PALETTE = {
  light: { core: 0x0284c7, edge: 0x0ea5e9, accent: 0x059669, dust: 0x64748b, opacity: 0.55 },
  dark: { core: 0x38bdf8, edge: 0x22d3ee, accent: 0x34d399, dust: 0x94a3b8, opacity: 0.75 }
} as const;

const isDarkTheme = () => document.documentElement.classList.contains('dark');

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      // WebGL unavailable: the decorative scene is simply omitted.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const root = new THREE.Group();
    scene.add(root);

    // --- Geodesic core: wireframe edges + glowing vertices -------------------------
    const coreGeometry = new THREE.IcosahedronGeometry(1.75, 2);
    const edgesGeometry = new THREE.EdgesGeometry(coreGeometry, 1);
    const edgeMaterial = new THREE.LineBasicMaterial({ transparent: true });
    const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);
    root.add(edges);

    const vertexMaterial = new THREE.PointsMaterial({ size: 0.075, transparent: true, sizeAttenuation: true });
    const vertices = new THREE.Points(coreGeometry, vertexMaterial);
    root.add(vertices);

    const innerGeometry = new THREE.IcosahedronGeometry(0.95, 1);
    const innerMaterial = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true });
    const inner = new THREE.Mesh(innerGeometry, innerMaterial);
    root.add(inner);

    const glowGeometry = new THREE.SphereGeometry(0.42, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({ transparent: true });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    root.add(glow);

    // --- Orbit rings with travelling packets ---------------------------------------
    const ringMaterial = new THREE.MeshBasicMaterial({ transparent: true });
    const packetMaterial = new THREE.MeshBasicMaterial();
    const packetGeometry = new THREE.SphereGeometry(0.07, 16, 16);
    const orbits = [
      { radius: 2.55, tilt: new THREE.Euler(1.15, 0.25, 0), speed: 0.45, phase: 0 },
      { radius: 2.95, tilt: new THREE.Euler(-0.6, 0.9, 0.3), speed: -0.32, phase: 2.1 },
      { radius: 3.35, tilt: new THREE.Euler(0.35, -0.7, -0.5), speed: 0.24, phase: 4.2 }
    ].map(({ radius, tilt, speed, phase }) => {
      const pivot = new THREE.Group();
      pivot.rotation.copy(tilt);
      const ringGeometry = new THREE.TorusGeometry(radius, 0.006, 8, 180);
      pivot.add(new THREE.Mesh(ringGeometry, ringMaterial));
      const packet = new THREE.Mesh(packetGeometry, packetMaterial);
      pivot.add(packet);
      root.add(pivot);
      return { radius, speed, phase, packet, ringGeometry };
    });

    // --- Ambient particle field ----------------------------------------------------
    const DUST_COUNT = 700;
    const dustPositions = new Float32Array(DUST_COUNT * 3);
    for (let i = 0; i < DUST_COUNT; i++) {
      const r = 4 + Math.random() * 6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      dustPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      dustPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({ size: 0.03, transparent: true, sizeAttenuation: true });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const applyTheme = () => {
      const dark = isDarkTheme();
      const p = dark ? PALETTE.dark : PALETTE.light;
      const blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;

      edgeMaterial.color.setHex(p.edge);
      edgeMaterial.opacity = p.opacity * 0.6;
      edgeMaterial.blending = blending;
      vertexMaterial.color.setHex(p.core);
      vertexMaterial.opacity = p.opacity + 0.2;
      vertexMaterial.blending = blending;
      innerMaterial.color.setHex(p.accent);
      innerMaterial.opacity = p.opacity * 0.45;
      innerMaterial.blending = blending;
      glowMaterial.color.setHex(p.accent);
      glowMaterial.opacity = dark ? 0.35 : 0.18;
      glowMaterial.blending = blending;
      ringMaterial.color.setHex(p.core);
      ringMaterial.opacity = p.opacity * 0.5;
      packetMaterial.color.setHex(p.accent);
      dustMaterial.color.setHex(p.dust);
      dustMaterial.opacity = dark ? 0.55 : 0.4;

      [edgeMaterial, vertexMaterial, innerMaterial, glowMaterial].forEach(m => (m.needsUpdate = true));
    };
    applyTheme();

    // Observer callbacks run asynchronously, after renderFrame below is initialised.
    const themeObserver = new MutationObserver(() => {
      applyTheme();
      if (reducedMotion) renderFrame();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // --- Sizing --------------------------------------------------------------------
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      // Pull back on narrow viewports so the orbits are never cropped.
      camera.position.z = w / h < 1 ? 9.5 : 7.5;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) renderFrame();
    });
    resizeObserver.observe(container);
    resize();

    // --- Interaction ---------------------------------------------------------------
    const pointer = { x: 0, y: 0 };
    const onPointerMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // --- Render loop ---------------------------------------------------------------
    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = true;

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);

      root.rotation.y += (pointer.x * 0.5 + t * 0.12 - root.rotation.y) * 0.04;
      root.rotation.x += (pointer.y * 0.3 + scroll * 0.6 - root.rotation.x) * 0.04;
      root.position.y = scroll * 0.9;

      inner.rotation.y = -t * 0.35;
      inner.rotation.z = t * 0.2;
      glow.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
      dust.rotation.y = t * 0.015;
      dust.rotation.x = t * 0.008;

      for (const o of orbits) {
        const a = o.phase + t * o.speed;
        o.packet.position.set(Math.cos(a) * o.radius, Math.sin(a) * o.radius, 0);
      }

      renderer.render(scene, camera);
    };

    const loop = () => {
      renderFrame();
      if (visible && !document.hidden) {
        frameId = requestAnimationFrame(loop);
      } else {
        frameId = 0;
      }
    };

    const start = () => {
      if (!frameId && !reducedMotion) frameId = requestAnimationFrame(loop);
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    visibilityObserver.observe(container);

    const onVisibilityChange = () => {
      if (!document.hidden) start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    if (reducedMotion) {
      renderFrame();
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);

      [coreGeometry, edgesGeometry, innerGeometry, glowGeometry, packetGeometry, dustGeometry].forEach(g => g.dispose());
      orbits.forEach(o => o.ringGeometry.dispose());
      [edgeMaterial, vertexMaterial, innerMaterial, glowMaterial, ringMaterial, packetMaterial, dustMaterial].forEach(m =>
        m.dispose()
      );
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
