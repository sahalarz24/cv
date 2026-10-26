import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-[#06070a] border-t border-white/[0.08] text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                SA
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {PORTFOLIO_DATA.personal.fullName}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-2 max-w-md leading-relaxed">
              Mahasiswa S1 Sistem Informasi Universitas Komputama · Alumni SMK Komputama Majenang (Animasi) · Pembuat Aset 3D & Desainer Canva.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-neutral-300">
            <a href="#tentang" className="hover:text-white transition-colors">Tentang</a>
            <a href="#keahlian" className="hover:text-white transition-colors">Keahlian</a>
            <a href="#karya" className="hover:text-white transition-colors">Karya & Proyek</a>
            <a href="#pendidikan" className="hover:text-white transition-colors">Pendidikan</a>
            <a href="#kontak" className="hover:text-white transition-colors">Kontak</a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} Sahal Arzaka. All rights reserved.</span>
            <span>·</span>
            <span>{PORTFOLIO_DATA.personal.location}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href={PORTFOLIO_DATA.personal.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
              WA: {PORTFOLIO_DATA.personal.phone}
            </a>
            <span>·</span>
            <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:text-blue-400 transition-colors">
              {PORTFOLIO_DATA.personal.email}
            </a>
            <button
              onClick={scrollToTop}
              title="Kembali ke atas"
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 hover:text-white transition-colors ml-2"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
