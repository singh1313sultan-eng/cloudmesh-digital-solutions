import React, { useState, useEffect, useId } from 'react';
import { Send, CheckCircle2, Mail, MapPin, MessageSquare } from 'lucide-react';
import { SectionHeading } from './SectionHeading.tsx';
import { Scroll3D } from './Scroll3D.tsx';
import { FloatingShapes } from './FloatingShapes.tsx';
import { CONTACT_EMAIL } from '../data/site.ts';

const PROJECT_TYPES = [
  { value: 'Custom Website', label: 'Custom website or online store' },
  { value: 'Business Admin Portal', label: 'Business portal or dashboard' },
  { value: 'Food Shop / Cart App', label: 'Mobile app (food, logistics, other)' },
  { value: 'Complete Digital Suite', label: 'Complete suite (website + portal + app)' },
  { value: 'Other Project', label: 'Something else' }
];

interface ContactSectionProps {
  prefilledScope?: string;
  prefilledSolution?: string;
  onClearPrefill?: () => void;
}

type FormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
};

const EMPTY_FORM: FormData = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  projectType: PROJECT_TYPES[0].value,
  message: ''
};

const inputClass = (hasError?: boolean) =>
  `w-full px-4 py-3 text-sm bg-slate-50 dark:bg-slate-950/80 border rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-colors ${
    hasError ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
  }`;

export const ContactSection: React.FC<ContactSectionProps> = ({ prefilledScope, prefilledSolution, onClearPrefill }) => {
  const uid = useId();
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  useEffect(() => {
    if (prefilledSolution && PROJECT_TYPES.some(t => t.value === prefilledSolution)) {
      setFormData(prev => ({ ...prev, projectType: prefilledSolution }));
    }
  }, [prefilledSolution]);

  useEffect(() => {
    if (prefilledScope) {
      setFormData(prev => (prev.message ? prev : { ...prev, message: prefilledScope }));
    }
  }, [prefilledScope]);

  const update = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name';
    if (!formData.companyName.trim()) errs.companyName = 'Please enter your business name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // No backend yet: hand the enquiry to the visitor's email client so it is never silently lost.
    const subject = `Project enquiry: ${formData.projectType} — ${formData.companyName}`;
    const body = [
      `Name: ${formData.fullName}`,
      `Business: ${formData.companyName}`,
      `Email: ${formData.email}`,
      formData.phone && `Phone: ${formData.phone}`,
      `Project type: ${formData.projectType}`,
      '',
      formData.message
    ]
      .filter(line => line !== '')
      .join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsSubmitted(false);
    onClearPrefill?.();
  };

  const fieldId = (name: string) => `${uid}-${name}`;

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <FloatingShapes
        shapes={[
          { kind: 'ring', position: { top: '10%', left: '-6%' }, size: 260, speed: -200, spin: 18 },
          { kind: 'cube', position: { bottom: '12%', left: '30%' }, size: 64, speed: -240, spin: 15 },
          { kind: 'sphere', position: { top: '6%', right: '4%' }, size: 60, speed: -300 }
        ]}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 space-y-10">
            <SectionHeading
              eyebrow="Get in Touch"
              title={
                <>
                  Let's build something <span className="accent-serif text-gradient">remarkable.</span>
                </>
              }
              description="Need a new website, an operations portal or a mobile app? Send us a note — we reply within one business day."
            />

            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sky-600 dark:text-sky-400">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Email us</div>
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400">
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sky-600 dark:text-sky-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Studio</div>
                  <div className="text-slate-600 dark:text-slate-400">Auckland CBD, New Zealand · working worldwide</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-emerald-600 dark:text-emerald-400">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Free consultation</div>
                  <div className="text-slate-600 dark:text-slate-400">We review your goals and explain practical options — no pressure.</div>
                </div>
              </li>
            </ul>
          </div>

          <Scroll3D axis="right" tilt={24} className="lg:col-span-7">
          <div className="rounded-[2rem] bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-2xl shadow-slate-900/5 dark:shadow-black/40">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-4" role="status">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Almost there, {formData.fullName.split(' ')[0]}!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your email app should have opened with your enquiry ready to go — just press send. If it didn't open, email us
                  directly at{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-sky-600 dark:text-sky-400">
                    {CONTACT_EMAIL}
                  </a>
                  .
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 rounded-full border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-900 dark:hover:border-white transition-colors"
                >
                  Start a new enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {(
                    [
                      { name: 'fullName', label: 'Your name', type: 'text', placeholder: 'Jane Smith', autoComplete: 'name', required: true },
                      { name: 'companyName', label: 'Business name', type: 'text', placeholder: 'Your business', autoComplete: 'organization', required: true },
                      { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@company.co.nz', autoComplete: 'email', required: true },
                      { name: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '021 123 4567', autoComplete: 'tel', required: false }
                    ] as const
                  ).map(f => (
                    <div key={f.name}>
                      <label htmlFor={fieldId(f.name)} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        {f.label}
                        {f.required && <span className="text-sky-600 dark:text-sky-400"> *</span>}
                      </label>
                      <input
                        id={fieldId(f.name)}
                        name={f.name}
                        type={f.type}
                        autoComplete={f.autoComplete}
                        required={f.required}
                        value={formData[f.name]}
                        onChange={update(f.name)}
                        placeholder={f.placeholder}
                        aria-invalid={!!errors[f.name]}
                        aria-describedby={errors[f.name] ? fieldId(`${f.name}-error`) : undefined}
                        className={inputClass(!!errors[f.name])}
                      />
                      {errors[f.name] && (
                        <p id={fieldId(`${f.name}-error`)} className="text-xs text-red-500 dark:text-red-400 mt-1">
                          {errors[f.name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor={fieldId('projectType')} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    What are you looking to build?
                  </label>
                  <select
                    id={fieldId('projectType')}
                    value={formData.projectType}
                    onChange={update('projectType')}
                    className={inputClass()}
                  >
                    {PROJECT_TYPES.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={fieldId('message')} className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Tell us about your project
                  </label>
                  <textarea
                    id={fieldId('message')}
                    rows={4}
                    value={formData.message}
                    onChange={update('message')}
                    placeholder="What does your business do, and what should your new website, portal or app handle?"
                    className={inputClass()}
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white py-4 text-sm font-semibold text-white dark:text-slate-950 shadow-lg transition-transform active:scale-[0.98]"
                >
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  Send enquiry
                </button>
                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  We respect your privacy and never share your details.
                </p>
              </form>
            )}
          </div>
          </Scroll3D>
        </div>
      </div>
    </section>
  );
};
