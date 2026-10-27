import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Dotted 3D globe with animated data arcs flying from Auckland to cities worldwide.
 * Drag to spin; it keeps rotating slowly on its own. Pauses when off-screen.
 * Drawn for a dark backdrop (the "Built Right" section is always dark).
 */

const RADIUS = 2;
const HOME = { lat: -36.85, lon: 174.76 }; // Auckland
const DESTINATIONS = [
  { lat: -33.87, lon: 151.21 }, // Sydney
  { lat: 1.35, lon: 103.82 }, // Singapore
  { lat: 35.68, lon: 139.69 }, // Tokyo
  { lat: 51.51, lon: -0.13 }, // London
  { lat: 40.71, lon: -74.01 }, // New York
  { lat: 37.77, lon: -122.42 }, // San Francisco
  { lat: 25.2, lon: 55.27 }, // Dubai
  { lat: 19.08, lon: 72.88 }, // Mumbai
  { lat: 43.65, lon: -79.38 }, // Toronto
  { lat: -23.55, lon: -46.63 } // São Paulo
];

const toVector = (lat: number, lon: number, r = RADIUS) => {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
};

export default function NetworkGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.cursor = 'grab';
    renderer.domElement.style.touchAction = 'pan-y';

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.6, 7);
    camera.lookAt(0, 0, 0);

    const globe = new THREE.Group();
    // Tip the southern hemisphere toward the camera so Auckland sits near the centre.
    globe.rotation.x = -0.55;
    scene.add(globe);

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T) => {
      disposables.push(item);
      return item;
    };

    // Solid inner sphere to hide dots on the far side, plus a soft atmosphere halo.
    const core = new THREE.Mesh(
      track(new THREE.SphereGeometry(RADIUS * 0.985, 48, 48)),
      track(new THREE.MeshBasicMaterial({ color: 0x0b1d33 }))
    );
    globe.add(core);
    const halo = new THREE.Mesh(
      track(new THREE.SphereGeometry(RADIUS * 1.12, 48, 48)),
      track(
        new THREE.MeshBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.12, side: THREE.BackSide, blending: THREE.AdditiveBlending })
      )
    );
    scene.add(halo);

    // Fibonacci-distributed surface dots.
    const DOTS = 1800;
    const dotPositions = new Float32Array(DOTS * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < DOTS; i++) {
      const y = 1 - (i / (DOTS - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = golden * i;
      dotPositions.set([Math.cos(t) * r * RADIUS, y * RADIUS, Math.sin(t) * r * RADIUS], i * 3);
    }
    const dotGeometry = track(new THREE.BufferGeometry());
    dotGeometry.setAttribute('position', new THREE.BufferAttribute(dotPositions, 3));
    globe.add(
      new THREE.Points(
        dotGeometry,
        track(new THREE.PointsMaterial({ color: 0x7dd3fc, size: 0.042, transparent: true, opacity: 0.9 }))
      )
    );

    // Home marker with a pulsing ring.
    const home = toVector(HOME.lat, HOME.lon);
    const homeDot = new THREE.Mesh(track(new THREE.SphereGeometry(0.06, 16, 16)), track(new THREE.MeshBasicMaterial({ color: 0x34d399 })));
    homeDot.position.copy(home);
    globe.add(homeDot);
    const pulseMaterial = track(new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, side: THREE.DoubleSide }));
    const pulse = new THREE.Mesh(track(new THREE.RingGeometry(0.08, 0.11, 32)), pulseMaterial);
    pulse.position.copy(home.clone().multiplyScalar(1.002));
    pulse.lookAt(home.clone().multiplyScalar(2));
    globe.add(pulse);

    // Arcs: drawn progressively, with a glowing packet riding the leading edge.
    const SEGMENTS = 80;
    const packetGeometry = track(new THREE.SphereGeometry(0.035, 12, 12));
    const packetMaterial = track(new THREE.MeshBasicMaterial({ color: 0xa7f3d0 }));
    const arcs = DESTINATIONS.map((dest, i) => {
      const end = toVector(dest.lat, dest.lon);
      const lift = 1 + home.distanceTo(end) * 0.28;
      const mid = home.clone().add(end).normalize().multiplyScalar(RADIUS * lift);
      const curve = new THREE.QuadraticBezierCurve3(home, mid, end);
      const geometry = track(new THREE.BufferGeometry().setFromPoints(curve.getPoints(SEGMENTS)));
      const material = track(
        new THREE.LineBasicMaterial({ color: i % 2 ? 0x22d3ee : 0x34d399, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending })
      );
      const line = new THREE.Line(geometry, material);
      globe.add(line);
      const packet = new THREE.Mesh(packetGeometry, packetMaterial);
      globe.add(packet);
      const endDot = new THREE.Mesh(track(new THREE.SphereGeometry(0.035, 12, 12)), track(new THREE.MeshBasicMaterial({ color: 0x7dd3fc })));
      endDot.position.copy(end);
      globe.add(endDot);
      return { curve, geometry, material, packet, offset: i * 0.37 };
    });

    // Face Auckland toward the viewer initially.
    globe.rotation.y = -Math.atan2(home.x, home.z);

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    // Drag to rotate, with inertia.
    let dragging = false;
    let lastX = 0;
    let velocity = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      renderer.domElement.style.cursor = 'grabbing';
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velocity = (e.clientX - lastX) * 0.005;
      globe.rotation.y += velocity;
      lastX = e.clientX;
    };
    const onUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = 'grab';
    };
    renderer.domElement.addEventListener('pointerdown', onDown);
    renderer.domElement.addEventListener('pointermove', onMove);
    renderer.domElement.addEventListener('pointerup', onUp);
    renderer.domElement.addEventListener('pointercancel', onUp);

    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = false;

    const renderFrame = () => {
      const t = clock.getElapsedTime();
      if (!dragging) {
        velocity *= 0.95;
        globe.rotation.y += velocity + (reducedMotion ? 0 : 0.0018);
      }

      const p = (t * 1.2) % 1;
      pulse.scale.setScalar(1 + p * 2.5);
      pulseMaterial.opacity = 1 - p;

      for (const arc of arcs) {
        // 0→1 draws the arc, 1→1.4 holds, then it restarts.
        const cycle = reducedMotion ? 1 : ((t * 0.35 + arc.offset) % 1.4);
        const progress = Math.min(cycle, 1);
        arc.geometry.setDrawRange(0, Math.max(2, Math.floor(progress * (SEGMENTS + 1))));
        arc.material.opacity = cycle > 1 ? 0.85 * (1 - (cycle - 1) / 0.4) : 0.85;
        arc.packet.visible = cycle <= 1;
        arc.packet.position.copy(arc.curve.getPoint(progress));
      }

      renderer.render(scene, camera);
    };

    const loop = () => {
      renderFrame();
      frameId = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!frameId) frameId = requestAnimationFrame(loop);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      renderFrame();
    });
    resizeObserver.observe(container);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    visibilityObserver.observe(container);

    const onVisibilityChange = () => {
      if (!document.hidden && visible) start();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      disposables.forEach(d => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
