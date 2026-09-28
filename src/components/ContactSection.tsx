import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { SolutionType } from '../types/index.ts';
import { CloudMeshLogo } from './CloudMeshLogo.tsx';

interface ContactSectionProps {
  prefilledScope?: string;
  prefilledSolution?: string;
  onClearPrefill?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledScope,
  prefilledSolution,
  onClearPrefill
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Website for My Business',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (prefilledSolution) {
      setFormData(prev => ({
        ...prev,
        projectType: prefilledSolution
      }));
    }
  }, [prefilledSolution]);

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your name';
    if (!formData.companyName.trim()) errs.companyName = 'Please enter your business or shop name';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      projectType: 'Website for My Business',
      message: ''
    });
    setIsSubmitted(false);
    if (onClearPrefill) onClearPrefill();
  };

  return (
    <section id="contact" className="py-20 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Contact info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-2">
                <span
                  id="dot-anchor-contact"
                  className="w-2.5 h-2.5 rounded-sm border border-sky-500/40 dark:border-sky-400/40 rotate-45 inline-block shrink-0"
                  aria-hidden="true"
                />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Let's talk about your business project.
              </h2>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you need a new website, a custom admin portal to manage operations, or a mobile ordering app for your food shop or cart, send us a quick note. We respond promptly to discuss how we can help.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 text-xs">
              <div className="flex items-start gap-3">
                <CloudMeshLogo size="sm" showText={false} />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">CloudMesh Digital Solutions</div>
                  <div className="text-slate-600 dark:text-slate-400">Registered Software Company in New Zealand</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Headquarters</div>
                  <div className="text-slate-600 dark:text-slate-400">Quay Street, Auckland CBD, New Zealand</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Email Us Directly</div>
                  <div className="text-slate-600 dark:text-slate-400 font-medium">hello@cloudmesh.co.nz</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Free Consultation</div>
                  <div className="text-slate-600 dark:text-slate-400">We will review your goals and explain practical options with zero pressure.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form or Success */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/50 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Message Received!</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900 dark:text-white">{formData.fullName}</span>. We have received your inquiry for <span className="font-semibold text-slate-900 dark:text-white">{formData.companyName}</span>. Our team in Auckland will review your request and get back to you shortly.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="pb-2 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Tell Us What You Need</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Fill out this quick form and we'll be in touch to discuss details</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Name <span className="text-sky-600 dark:text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Liam Smith"
                      className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/80 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                        errors.fullName ? 'border-red-500' : 'border-slate-300 dark:border-slate-800'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-500 dark:text-red-400 mt-0.5">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Business or Shop Name <span className="text-sky-600 dark:text-sky-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Harbor Food Cart or Kiwi Trades"
                      className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/80 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                        errors.companyName ? 'border-red-500' : 'border-slate-300 dark:border-slate-800'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-[11px] text-red-500 dark:text-red-400 mt-0.5">{errors.companyName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Email Address <span className="text-sky-600 dark:text-sky-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="liam@example.com"
                      className={`w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/80 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 ${
                        errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-800'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500 dark:text-red-400 mt-0.5">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 021 123 4567"
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    What are you looking to build?
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                  >
                    <option value="Custom Website">Custom Website for My Business</option>
                    <option value="Business Admin Portal">Business Admin Portal for Operations</option>
                    <option value="Food Shop / Cart App">Mobile App for Food Shop or Food Cart</option>
                    <option value="Complete Digital Suite">Complete Digital Suite (Website + Portal + App)</option>
                    <option value="Other Project">Other Custom Software Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    How can we help? (Optional notes)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us a little bit about what you do and what you'd like your new website, portal, or food app to handle..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 font-sans"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 dark:text-slate-950 dark:bg-sky-400 dark:hover:bg-sky-300 rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm shadow-sky-500/20 active:scale-95 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Sending Your Message...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Inquiry to CloudMesh Team
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  We respect your privacy and will never share your contact details.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
