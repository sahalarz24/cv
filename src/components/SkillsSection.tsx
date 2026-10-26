import React, { useState } from 'react';
import { Box, Palette, Database, ShieldCheck, Check, Layers, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Bidang' },
    { id: '3d-animasi', label: '3D & Animasi' },
    { id: 'desain-canva', label: 'Desain Grafis Canva' },
    { id: 'sistem-informasi', label: 'Sistem Informasi' },
    { id: 'soft-skills', label: 'Karakter & Kepemimpinan' },
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Box':
        return <Box className="w-5 h-5 text-blue-400" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-cyan-400" />;
      case 'Database':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      default:
        return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  const filteredCategories =
    selectedCategory === 'all'
      ? PORTFOLIO_DATA.skillCategories
      : PORTFOLIO_DATA.skillCategories.filter((c) => c.id === selectedCategory);

  return (
    <section id="keahlian" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#0c0e17]/80 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Matriks Kompetensi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Keahlian Teknis, Desain & Karakter
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Kombinasi keahlian praktis dalam produksi visual kreatif dan fondasi analisis sistem komputasi.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl overflow-x-auto max-w-full">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/30'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Stack */}
        <div className="space-y-12">
          {filteredCategories.map((cat: SkillCategory) => (
            <div key={cat.id} className="space-y-4">
              
              {/* Category Subheader */}
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-md">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{cat.title}</h3>
                  <div className="text-xs text-neutral-400">{cat.description}</div>
                </div>
              </div>

              {/* Skills Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.05] transition-all flex flex-col justify-between group backdrop-blur-sm"
                  >
                    <div>
                      {/* Title & Level Indicator */}
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-sm sm:text-base font-bold text-neutral-100 group-hover:text-blue-300 transition-colors">
                          {item.name}
                        </h4>
                        <span className="text-xs font-mono font-medium text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 whitespace-nowrap shrink-0">
                          {item.level}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>

                    {/* Metadata line */}
                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                      <span>Sumber: {item.experience}</span>
                      <span className="flex items-center gap-1 text-emerald-400 font-sans font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Kompeten
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* Modern Tooling Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-white/[0.02] to-transparent border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-5 backdrop-blur-md">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Ekosistem Perangkat Lunak & Teknologi</div>
              <div className="text-xs text-neutral-400 mt-0.5">
                Canva Pro · Blender 3D · Three.js · Draw.io / ERD · Relational Database (SQL) · Google Workspace · Windows OS
              </div>
            </div>
          </div>
          <a
            href="#karya"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 whitespace-nowrap shrink-0"
          >
            Lihat Implementasi Karya →
          </a>
        </div>

      </div>
    </section>
  );
};
