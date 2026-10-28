import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Phone, MapPin, Copy, Check, Send, Sparkles, ExternalLink } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface ContactSectionProps {
  preselectedService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyEmail = (emailStr: string) => {
    navigator.clipboard.writeText(emailStr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (personalInfo.phone) {
      navigator.clipboard.writeText(personalInfo.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-[#050505] text-white relative overflow-hidden border-t border-white/10">
      
      {/* Background ambient glow */}
      <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[#7e22ce]/15 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Header matching original .contact-header */}
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl sm:text-7xl md:text-8xl text-[#b651f0] tracking-widest uppercase drop-shadow-[0_0_35px_rgba(182,81,240,0.35)]">
            CONTACT ME
          </h2>
          <p className="font-poppins text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Let’s work together! Send me a message for collaborations or engineering inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info Boxes matching original .contact-info */}
          <div className="lg:col-span-5 space-y-4 text-left">
            
            {/* Social Channels Box */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-4">
                Social Profiles
              </span>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://www.instagram.com/alisha_ahmed84/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#b651f0] hover:bg-[#b651f0]/10 transition-all group"
                >
                  <i className="ri-instagram-line text-2xl text-[#b651f0] group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bebas text-lg text-white">Instagram</h4>
                    <span className="text-[11px] text-slate-400 font-mono">@alisha_ahmed84</span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/alisha-ahmed-391440235/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#b651f0] hover:bg-[#b651f0]/10 transition-all group"
                >
                  <i className="ri-linkedin-box-fill text-2xl text-[#b651f0] group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bebas text-lg text-white">LinkedIn</h4>
                    <span className="text-[11px] text-slate-400 font-mono">Alisha Ahmed</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Email Box matching original */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#b651f0]/10 flex items-center justify-center text-[#b651f0] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-mono text-sm sm:text-base font-semibold text-white hover:text-[#d68aff] transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                  <div className="text-[11px] text-[#b651f0] font-mono">
                    Direct Response & Freelance / Roles
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopyEmail(personalInfo.email)}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Box matching original */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#b651f0]/10 flex items-center justify-center text-[#b651f0] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href="tel:03353641052"
                    className="font-mono text-sm sm:text-base font-semibold text-white hover:text-[#d68aff] transition-colors"
                  >
                    0335-3641052
                  </a>
                </div>
              </div>

              <button
                onClick={handleCopyPhone}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-md flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#b651f0]/10 flex items-center justify-center text-[#b651f0] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Location
                </span>
                <span className="font-poppins text-sm font-medium text-white">
                  Karachi, Pakistan (Open to Remote & Relocation)
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/15 backdrop-blur-xl shadow-2xl">
              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide mb-2">
                SEND A MESSAGE
              </h3>
              <p className="font-poppins text-xs text-slate-300 mb-6">
                Fill out the form below to initiate discussion on roles, contracts, or engineering projects.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-[#b651f0]/15 border border-[#b651f0]/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#b651f0] text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bebas text-2xl text-white">
                    MESSAGE RECEIVED!
                  </h4>
                  <p className="font-poppins text-xs text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out. I usually respond within a few hours to schedule a meeting or review requirements.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-2 text-xs font-mono text-[#d68aff] hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#b651f0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#b651f0] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Fullstack Opportunity / Project Collaboration"
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#b651f0] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Alisha, I reviewed your 15 projects and would like to discuss..."
                      className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#b651f0] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#b651f0] hover:bg-[#a855f7] text-white font-bebas text-2xl tracking-widest uppercase transition-all shadow-lg shadow-purple-950/60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="font-mono text-sm animate-pulse">TRANSMITTING...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>TRANSMIT MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
