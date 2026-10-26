import React, { useState } from 'react';
import { ArrowDown, Mail, Phone, CheckCircle2, Copy, Check, Sparkles, MapPin, ExternalLink, Box, Palette, Database, Compass } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroProps {
  onOpenCVModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCVModal }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2500);
  };

  const kpiIcons = [
    <Box className="w-4 h-4 text-blue-400" key="box" />,
    <Database className="w-4 h-4 text-emerald-400" key="db" />,
    <Palette className="w-4 h-4 text-cyan-400" key="pal" />,
    <Compass className="w-4 h-4 text-amber-400" key="comp" />,
  ];

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-white/[0.08] overflow-hidden bg-grid-pattern">
      {/* High-tech atmospheric lighting glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[600px] h-[350px] bg-gradient-to-b from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 -z-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 -z-10 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Hierarchy & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Modern Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md text-xs text-neutral-300 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-emerald-300">Siap Magang & Kerja</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400 hidden sm:inline">Universitas Komputama</span>
            </div>

            {/* Main Headline with Modern Gradient Typography */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]" style={{ textWrap: 'balance' }}>
              Memadukan Logika Sistem Informasi dengan{' '}
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                Estetika Visual 3D & Desain
              </span>
            </h1>

            {/* Lead Narrative */}
            <p className="text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed max-w-2xl font-normal">
              Halo, saya <strong className="text-white font-semibold">{PORTFOLIO_DATA.personal.fullName}</strong>, mahasiswa S1 Sistem Informasi Universitas Komputama dengan latar belakang kejuruan Animasi dari SMK Komputama Majenang. Memiliki keahlian pembuatan aset 3D dan desain kreatif Canva.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#karya"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2 border border-blue-400/30"
              >
                <span>Lihat Karya & Proyek</span>
                <ArrowDown className="w-4 h-4 text-blue-200" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-neutral-200 bg-white/[0.05] border border-white/[0.12] hover:bg-white/[0.1] hover:text-white hover:border-emerald-500/50 transition-all flex items-center gap-2 backdrop-blur-md shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {PORTFOLIO_DATA.personal.phone}</span>
              </a>

              <button
                onClick={onOpenCVModal}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.15] transition-all"
              >
                Ringkasan CV
              </button>
            </div>

            {/* Quick Contact & Verification Badges */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{PORTFOLIO_DATA.personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <a
                  href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                  className="hover:text-white transition-colors"
                >
                  {PORTFOLIO_DATA.personal.email}
                </a>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.personal.email, 'email')}
                  title="Salin Email"
                  className="p-1 hover:text-white bg-white/[0.05] rounded border border-white/[0.08] transition-colors"
                >
                  {copied === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Ultra-Modern Creator Profile Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer Ambient Glow Effect */}
              <div className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-cyan-400/20 blur-xl opacity-80 pointer-events-none" />

              {/* Main Profile Glass Card */}
              <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white/[0.09] to-white/[0.02] border border-white/[0.14] backdrop-blur-2xl shadow-2xl overflow-hidden">
                
                {/* Photo Frame Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-neutral-950 flex items-center justify-center border border-white/[0.08]">
                  <img
                    src={PORTFOLIO_DATA.personal.photoUrl}
                    alt={PORTFOLIO_DATA.personal.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top select-none transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Scrim */}
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/80 to-transparent pointer-events-none" />

                  {/* Floating Top Left Chip */}
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-white/[0.15] text-[11px] font-semibold text-emerald-400 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Terbuka untuk Rekrutmen</span>
                  </div>

                  {/* Floating Top Right Badge */}
                  <div className="absolute top-3 right-3 bg-blue-950/80 backdrop-blur-md border border-blue-400/30 text-[10px] font-semibold text-blue-300 px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-300" />
                    <span>3D & Canva</span>
                  </div>

                  {/* Bottom Identity & Details Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white space-y-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                            {PORTFOLIO_DATA.personal.fullName}
                          </h2>
                          <div className="p-0.5 rounded-full bg-blue-500 text-white" title="Profil Terverifikasi">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <p className="text-xs text-neutral-300 font-medium">
                          S1 Sistem Informasi · Universitas Komputama
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-card Modern Tags Grid */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                      <Box className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Keahlian Visual</span>
                      <span className="font-semibold text-neutral-200 text-xs truncate block">Aset 3D & Canva</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Etos & Disiplin</span>
                      <span className="font-semibold text-neutral-200 text-xs truncate block">Organisasi Pramuka</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Below-Split Modern Glass KPI Strip */}
        <div className="mt-14 pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.kpiStats.map((kpi, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.04] transition-all group backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-neutral-400 group-hover:text-blue-300 transition-colors">
                    {kpi.label}
                  </span>
                  <div className="p-1 rounded-lg bg-white/[0.04] group-hover:bg-blue-500/20 transition-colors">
                    {kpiIcons[idx]}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono tabular-nums flex items-baseline gap-1.5">
                  <span>{kpi.value}</span>
                  <span className="text-xs font-normal text-blue-400 font-sans">{kpi.unit}</span>
                </div>
                <div className="text-[11px] text-neutral-400 mt-1">{kpi.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
