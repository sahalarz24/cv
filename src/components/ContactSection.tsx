import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check, Send, MessageSquare, ArrowUpRight, Clock, ShieldCheck, Sparkles, MessageCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderOrg, setSenderOrg] = useState('');
  const [message, setMessage] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const quickTemplates = [
    { label: 'Tawaran Magang', text: 'Halo Sahal, kami tertarik dengan portofolio Anda dan ingin menawarkan kesempatan magang di perusahaan kami.' },
    { label: 'Proyek Desain / 3D', text: 'Halo Sahal, kami membutuhkan bantuan untuk pembuatan materi desain grafis / aset 3D. Apakah Anda tersedia?' },
    { label: 'Wawancara Kerja', text: 'Halo Sahal, profil keahlian Sistem Informasi dan visual Anda cocok dengan posisi yang sedang kami buka. Bisakah kita jadwalkan diskusi?' },
  ];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const greeting = senderName ? `Halo Sahal, saya ${senderName}` : 'Halo Sahal';
    const org = senderOrg ? ` dari ${senderOrg}` : '';
    const body = message ? `%0A%0A${encodeURIComponent(message)}` : '';
    const fullText = `${encodeURIComponent(greeting + org + ', saya melihat portofolio profesional Anda.')}${body}`;
    const url = `https://wa.me/6285865120332?text=${fullText}`;
    window.open(url, '_blank');
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      senderName ? `Peluang Karir / Kerjasama dari ${senderName}${senderOrg ? ` (${senderOrg})` : ''}` : 'Peluang Karir / Rekrutmen Sahal Arzaka'
    );
    const body = encodeURIComponent(
      `Halo Sahal Arzaka,\n\n${message || 'Saya tertarik dengan portofolio dan profil keahlian Anda.'}\n\nSalam,\n${senderName || 'Perekrut / Kolaborator'}\n${senderOrg || ''}`
    );
    window.location.href = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="kontak" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#090a0f] relative overflow-hidden">
      {/* Glow lights */}
      <div className="absolute top-1/2 left-1/3 -z-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Kontak & Saluran Cepat</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
            Mari Terhubung untuk Peluang Magang, Kerja & Proyek
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Respon cepat tersedia melalui WhatsApp dan Email resmi. Terbuka untuk diskusi kesempatan kerja di seluruh Indonesia.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Direct WhatsApp Box */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all space-y-4 backdrop-blur-md shadow-lg group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400">WhatsApp / Telepon</div>
                    <div className="text-base sm:text-lg font-bold text-white font-mono mt-0.5">{PORTFOLIO_DATA.personal.phoneDisplay}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.personal.phone, 'phone')}
                  title="Salin Nomor Telepon"
                  className="p-2 rounded-xl bg-white/[0.05] text-neutral-400 hover:text-white border border-white/[0.1] hover:bg-white/[0.1] transition-colors"
                >
                  {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-neutral-400">Nomor aktif untuk pesan & telepon</span>
                <a
                  href={PORTFOLIO_DATA.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Buka Chat Langsung</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Email Box */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.05] transition-all space-y-4 backdrop-blur-md shadow-lg group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-neutral-400">Email Resmi</div>
                    <div className="text-sm sm:text-base font-bold text-white font-mono truncate mt-0.5">{PORTFOLIO_DATA.personal.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                  title="Salin Alamat Email"
                  className="p-2 rounded-xl bg-white/[0.05] text-neutral-400 hover:text-white border border-white/[0.1] hover:bg-white/[0.1] transition-colors shrink-0"
                >
                  {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-neutral-400">Kirim surat penawaran & berkas</span>
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                >
                  <span>Kirim Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Location & Availability Card */}
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] text-xs space-y-3.5 backdrop-blur-md">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <div className="font-bold text-neutral-200">Domisili & Kampus</div>
                  <div className="text-neutral-400 mt-0.5">{PORTFOLIO_DATA.personal.location}</div>
                  <div className="text-neutral-400 mt-0.5">Universitas Komputama (Prodi Sistem Informasi)</div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-white/[0.06] flex items-center gap-2 text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Waktu Respon Rata-rata: Kurang dari 24 Jam</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Message Composer */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/[0.1] backdrop-blur-2xl space-y-6 shadow-2xl">
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>Kirim Pesan / Undangan Wawancara Langsung</span>
                </h3>
                <p className="text-xs text-neutral-400">
                  Pilih template cepat di bawah atau tulis pesan kustom. Pesan akan langsung diarahkan ke WhatsApp atau Email Sahal.
                </p>
              </div>

              {/* Quick Template Chips */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-medium text-neutral-400">Template Pesan Cepat:</span>
                <div className="flex flex-wrap gap-2">
                  {quickTemplates.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setMessage(tpl.text)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-blue-500/40 text-xs text-neutral-300 hover:text-white transition-all text-left"
                    >
                      + {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Nama Anda / HRD <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Perusahaan / Organisasi
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: PT Studio Animasi Digital"
                      value={senderOrg}
                      onChange={(e) => setSenderOrg(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                    Pesan / Kebutuhan Rekrutmen <span className="text-blue-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Halo Sahal, kami sedang mencari kandidat untuk posisi Junior IT / Desainer Canva / 3D Asset Artist..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/[0.1] text-sm text-neutral-100 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 border border-emerald-400/20"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Kirim Langsung via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSendEmail}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-neutral-200 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.1] hover:text-white transition-all flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                    <span>Kirim via Email Client</span>
                  </button>
                </div>

                <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-2 border-t border-white/[0.06]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Saluran resmi langsung terhubung ke WhatsApp dan Email pribadi Sahal Arzaka.</span>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
