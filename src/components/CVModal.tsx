import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, CheckCircle, ExternalLink, Sparkles, FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#0d0f18] border border-white/[0.15] shadow-2xl text-neutral-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-200">
            <div className="p-1 rounded bg-blue-500/10 text-blue-400">
              <FileText className="w-4 h-4" />
            </div>
            <span>Curriculum Vitae (CV)</span>
            <span className="text-neutral-500">· Sahal Arzaka</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs text-white font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/25"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white transition-colors"
              aria-label="Tutup CV"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable CV Sheet */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0a0c13] print:bg-white print:text-black">
          
          {/* CV Header */}
          <div className="border-b border-white/[0.08] pb-6 print:border-neutral-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white print:text-black tracking-tight">
                  {PORTFOLIO_DATA.personal.fullName}
                </h1>
                <p className="text-sm font-semibold text-blue-400 print:text-blue-700 mt-1">
                  Mahasiswa Sistem Informasi | Kreator Aset 3D & Desain Grafis Canva
                </p>
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/[0.15] print:border-neutral-400 shrink-0 shadow-md">
                <img
                  src={PORTFOLIO_DATA.personal.photoUrl}
                  alt={PORTFOLIO_DATA.personal.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Quick Contacts */}
            <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-neutral-300 print:text-neutral-700">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400 print:text-neutral-800" />
                {PORTFOLIO_DATA.personal.phoneDisplay}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400 print:text-neutral-800" />
                {PORTFOLIO_DATA.personal.email}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400 print:text-neutral-800" />
                {PORTFOLIO_DATA.personal.location}
              </span>
            </div>
          </div>

          {/* Ringkasan Profil */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-neutral-400 print:text-neutral-600 uppercase tracking-wider">
              Ringkasan Profesional
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 print:text-neutral-800 leading-relaxed">
              {PORTFOLIO_DATA.personal.summary}
            </p>
          </div>

          {/* Riwayat Pendidikan */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold text-neutral-400 print:text-neutral-600 uppercase tracking-wider">
              Riwayat Pendidikan & Vokasi
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] print:bg-neutral-100 border border-white/[0.08] print:border-neutral-300">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-white print:text-black text-sm">
                    S1 Sistem Informasi — Universitas Komputama
                  </span>
                  <span className="font-mono text-neutral-400 print:text-neutral-600">2024 - Sekarang</span>
                </div>
                <p className="text-xs text-neutral-300 print:text-neutral-700 mt-1">
                  Fokus pada pemodelan proses bisnis, basis data relasional, diagram alir sistem, dan dasar pengembangan aplikasi web.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] print:bg-neutral-100 border border-white/[0.08] print:border-neutral-300">
                <div className="flex justify-between items-baseline text-xs">
                  <span className="font-bold text-white print:text-black text-sm">
                    SMK Jurusan Animasi — SMK Komputama Majenang
                  </span>
                  <span className="font-mono text-neutral-400 print:text-neutral-600">2021 - 2024</span>
                </div>
                <p className="text-xs text-neutral-300 print:text-neutral-700 mt-1">
                  Fokus pada pembuatan aset 3D, prinsip animasi gerak, penyusunan storyboard, serta estetika visual digital.
                </p>
              </div>
            </div>
          </div>

          {/* Pengalaman Organisasi */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-neutral-400 print:text-neutral-600 uppercase tracking-wider">
              Pengalaman Organisasi
            </h2>
            <div className="p-4 rounded-2xl bg-white/[0.03] print:bg-neutral-100 border border-white/[0.08] print:border-neutral-300">
              <div className="flex justify-between items-baseline text-xs">
                <span className="font-bold text-white print:text-black text-sm">
                  Gerakan Pramuka (Dewan Ambalan / Anggota Aktif)
                </span>
                <span className="font-mono text-neutral-400 print:text-neutral-600">Pangkalan SMK Komputama Majenang</span>
              </div>
              <p className="text-xs text-neutral-300 print:text-neutral-700 mt-1">
                Berperan aktif dalam kepanitiaan perkemahan tahunan, tim publikasi dokumentasi kegiatan, serta mengasah kerja sama regu dan problem-solving lapangan.
              </p>
            </div>
          </div>

          {/* Ringkasan Keahlian Teknis */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-neutral-400 print:text-neutral-600 uppercase tracking-wider">
              Keahlian & Perangkat Lunak
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-semibold text-neutral-200 print:text-black">Kreatif & Visual:</span>
                <div className="text-neutral-400 print:text-neutral-700">
                  Aset 3D Modeling (Blender), Desain Grafis Canva Pro, Storyboarding, Tipografi & Layout, Visual Social Media Kit.
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-neutral-200 print:text-black">Sistem Informasi & IT:</span>
                <div className="text-neutral-400 print:text-neutral-700">
                  Analisis Alur Sistem (Flowchart/DFD), Konsep Basis Data & ERD, Dasar Pemrograman Web (HTML/CSS/JS), Troubleshooting IT.
                </div>
              </div>
            </div>
          </div>

          {/* Nilai Tambah Karakter */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-neutral-400 print:text-neutral-600 uppercase tracking-wider">
              Karakter & Etos Kerja
            </h2>
            <div className="text-xs text-neutral-300 print:text-neutral-700 grid grid-cols-2 gap-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-800" />
                <span>Disiplin & Tepat Waktu</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-800" />
                <span>Kerjasama Tim & Komunikatif</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-800" />
                <span>Cepat Belajar Hal Baru</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 print:text-neutral-800" />
                <span>Tanggung Jawab & Loyalitas</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-[#090a0f] flex items-center justify-between text-xs text-neutral-400">
          <span>Kandidat: Sahal Arzaka ({PORTFOLIO_DATA.personal.phone})</span>
          <a
            href={PORTFOLIO_DATA.personal.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
          >
            <span>Hubungi Rekrutmen</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
