import React from 'react';
import { Sparkles, ShieldCheck, Layers, Zap, ArrowUpRight, CheckCircle2, Briefcase, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface RecruiterMatchProps {
  onOpenCVModal: () => void;
}

export const RecruiterMatch: React.FC<RecruiterMatchProps> = ({ onOpenCVModal }) => {
  const suitableRoles = [
    { title: 'Junior 3D Modeler / Asset Artist', area: 'Animasi & Game' },
    { title: 'Graphic Designer (Canva Specialist)', area: 'Marketing & Media' },
    { title: 'Junior System Analyst / IT Staff', area: 'Sistem Informasi' },
    { title: 'Social Media & Promo Kit Designer', area: 'Digital Creative' },
    { title: 'Magang IT & Multimedia', area: 'Teknologi & Vokasi' },
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0c0e17]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Panduan Khusus Rekruter & HRD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug" style={{ textWrap: 'balance' }}>
            Mengapa Sahal Arzaka Adalah Kandidat Tepat untuk Tim Anda?
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Ringkasan nilai tambah, etika kerja, dan potensi kontribusi nyata di lingkungan kerja profesional.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {PORTFOLIO_DATA.whyHireMe.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.05] transition-all space-y-3 backdrop-blur-md"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.1]">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white">{item.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Suitable Roles & Quick CTA Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0d0f18] to-[#090a0f] border border-white/[0.12] flex flex-col lg:flex-row lg:items-center justify-between gap-8 backdrop-blur-2xl shadow-xl">
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Posisi & Peran Yang Sangat Relevan:</span>
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {suitableRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-neutral-200 flex items-center gap-1.5 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span className="font-medium">{role.title}</span>
                  <span className="text-neutral-400 text-[10px]">({role.area})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenCVModal}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-200 bg-white/[0.05] border border-white/[0.12] rounded-xl hover:bg-white/[0.1] transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Tinjau CV Lengkap</span>
            </button>
            <a
              href={PORTFOLIO_DATA.personal.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25 border border-blue-400/20"
            >
              <span>Jadwalkan Wawancara / Diskusi</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
