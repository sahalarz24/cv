import React from 'react';
import { Award, Compass, Laptop, Sparkles, CheckCircle2, FileText, ArrowRight, Code2, Paintbrush } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenCVModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenCVModal }) => {
  return (
    <section id="tentang" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0c0e17]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Profil & Filosofi Kreatif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug" style={{ textWrap: 'balance' }}>
            Membangun Jembatan antara Seni Animasi dan Ketepatan Sistem Informasi
          </h2>
        </div>

        {/* 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Narrative with Visual Accents */}
          <div className="lg:col-span-7 space-y-5 text-neutral-300 text-sm sm:text-base leading-relaxed">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md space-y-4">
              <p>
                Saya adalah seorang individu yang bersemangat dalam dunia teknologi digital dan visual kreatif. Perjalanan saya berakar dari <strong className="text-white">SMK Komputama Majenang</strong> pada <strong className="text-white">Jurusan Animasi</strong>, tempat saya mengasah keahlian pemodelan aset 3D, prinsip gerak animasi, dan estetika desain visual.
              </p>
              <p>
                Menyadari bahwa industri masa kini memerlukan integrasi menyeluruh antara antarmuka visual dan keandalan data, saya melanjutkan studi di <strong className="text-white">Universitas Komputama</strong> program studi <strong className="text-white">Sistem Informasi (S1)</strong>. Di sini, saya memperdalam kemampuan analitis, perancangan basis data, logika alur sistem, serta manajemen teknologi informasi.
              </p>
              <p>
                Selain bidang akademis dan teknis, saya memiliki pengalaman berharga dalam organisasi <strong className="text-white">Gerakan Pramuka</strong> yang telah membentuk ketangguhan mental, inisiatif kepemimpinan, dan kemampuan beradaptasi dalam menghadapi tantangan di lapangan secara mandiri maupun beregu.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenCVModal}
                className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-2 shadow-md shadow-blue-500/20"
              >
                <FileText className="w-4 h-4 text-neutral-200" />
                <span>Buka Ringkasan CV Sahal</span>
              </button>
              <a
                href="#keahlian"
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] transition-colors flex items-center gap-1.5"
              >
                <span>Eksplorasi Keahlian Lengkap</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>

          {/* Right Column: 3 Pillar Glass Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: Animasi & 3D */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-950/30 to-white/[0.02] border border-white/[0.08] hover:border-blue-500/40 transition-all group backdrop-blur-md">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <Paintbrush className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                    Kreativitas Visual & Aset 3D
                  </h3>
                  <div className="text-xs text-blue-400 font-medium mt-0.5">SMK Komputama Majenang (Animasi)</div>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Terbiasa membuat aset 3D geometris, pemahaman ruang dan proporsi, serta kemahiran desain cepat menggunakan Canva untuk materi visual yang eye-catching.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Sistem Informasi */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 transition-all group backdrop-blur-md">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <Laptop className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Logika & Analisis Sistem Informasi
                  </h3>
                  <div className="text-xs text-emerald-400 font-medium mt-0.5">Universitas Komputama (S1)</div>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Memahami pemodelan alur kerja sistem, diagram relasi basis data (ERD), flowchart proses bisnis, serta integrasi teknologi untuk efisiensi operasional.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Karakter & Pramuka */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/30 to-white/[0.02] border border-white/[0.08] hover:border-amber-500/40 transition-all group backdrop-blur-md">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Kepemimpinan & Kerja Sama Tim
                  </h3>
                  <div className="text-xs text-amber-400 font-medium mt-0.5">Organisasi Gerakan Pramuka</div>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    Etika kerja profesional, komitmen terhadap instruksi dan deadline, serta daya juang tinggi dalam memecahkan masalah praktis di lapangan.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
