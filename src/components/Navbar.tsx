import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, FileText, Sparkles, MessageCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface NavbarProps {
  onOpenCVModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCVModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Tentang', href: '#tentang' },
    { label: 'Keahlian', href: '#keahlian' },
    { label: 'Karya 3D & Desain', href: '#karya' },
    { label: 'Pendidikan', href: '#pendidikan' },
    { label: 'Kontak', href: '#kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#090a0f]/80 border-b border-white/[0.08] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand title & subtle role kicker */}
        <a
          href="#"
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            SA
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              {PORTFOLIO_DATA.personal.fullName}
            </span>
            <span className="text-[10px] text-neutral-400 hidden sm:inline -mt-0.5">
              Sistem Informasi · 3D & Desain
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white hover:underline underline-offset-8 decoration-blue-500 transition-all whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenCVModal}
            className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-white/[0.04] border border-white/[0.1] rounded-lg hover:bg-white/[0.08] hover:text-white hover:border-white/[0.2] transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-blue-400" />
            <span>Curriculum Vitae</span>
          </button>
          <a
            href={PORTFOLIO_DATA.personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-500 hover:to-indigo-500 active:scale-95 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-md shadow-blue-500/25 border border-blue-400/20"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>Hubungi Saya</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-200" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenCVModal}
            className="px-2.5 py-1.5 text-[11px] font-medium text-neutral-200 bg-white/[0.05] border border-white/[0.1] rounded-lg flex items-center gap-1"
          >
            <FileText className="w-3 h-3 text-blue-400" />
            <span>CV</span>
          </button>

          <a
            href={PORTFOLIO_DATA.personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-xs text-white bg-blue-600 rounded-lg"
            title="Chat WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#0c0e17]/95 backdrop-blur-2xl px-5 pt-3 pb-6 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-200 hover:text-white hover:bg-white/[0.05] rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-neutral-600 text-xs">→</span>
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCVModal();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-neutral-200 bg-white/[0.04] border border-white/[0.1] rounded-lg hover:bg-white/[0.08] text-center flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Buka CV Sahal Arzaka (Siap Cetak / PDF)</span>
            </button>
            <a
              href={PORTFOLIO_DATA.personal.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-center flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Hubungi Langsung via WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
