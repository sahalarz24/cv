import React, { useState } from 'react';
import { Box, Palette, Database, Users, Eye, X, ExternalLink, Sparkles, Layers, ArrowRight, CheckCircle2, Monitor, Cpu, FolderOpen, Download } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { Interactive3DViewer } from './Interactive3DViewer';
import { ErrorBoundary } from './ErrorBoundary';

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [spotlightMode, setSpotlightMode] = useState<'interactive3d' | 'drivePreview'>('interactive3d');

  const filterTabs = [
    { id: 'all', label: 'Semua Karya' },
    { id: '3d-animasi', label: 'Aset 3D & Animasi' },
    { id: 'desain-grafis', label: 'Desain Grafis Canva' },
    { id: 'sistem-informasi', label: 'Sistem Informasi' },
    { id: 'organisasi', label: 'Publikasi Pramuka' },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === activeFilter);

  const driveProjectUrl = "https://drive.google.com/file/d/1zJvHX_1CMcdH0uO-BASwhU7_yBRLapSQ/view?usp=drivesdk";
  const driveEmbedUrl = "https://drive.google.com/file/d/1zJvHX_1CMcdH0uO-BASwhU7_yBRLapSQ/preview";

  return (
    <section id="karya" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#090a0f] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-40 -z-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 -z-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Karya & Studi Kasus Unggulan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Eksplorasi Aset 3D, Desain Canva & Alur Sistem
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Portofolio pilihan yang menggabungkan kreasi digital visual interaktif dengan perancangan arsitektur data.
            </p>
          </div>

          {/* Modern Filter Pill Bar */}
          <div className="flex items-center gap-1.5 p-1.5 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border border-blue-400/30'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured 3D Interactive Console (When 'all' or '3d-animasi' is active) */}
        {(activeFilter === 'all' || activeFilter === '3d-animasi') && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.12] backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span>3D Interactive Studio & Google Drive Asset</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                  Proyek Aset 3D Sahal Arzaka
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  Lulusan SMK Jurusan Animasi terbiasa merancang aset 3 dimensi dengan topologi teratur. Di sebelah kanan Anda dapat mencoba penampil 3D interaktif atau langsung melihat berkas proyek 3D asli melalui Google Drive.
                </p>
                
                <div className="pt-1 flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] font-mono text-neutral-300">Blender 4.2</span>
                  <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] font-mono text-neutral-300">mobil.blend (2.97 MB)</span>
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/15 border border-blue-500/30 font-mono text-blue-300">Google Drive Linked</span>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-2.5">
                  <a
                    href={driveProjectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl transition-all inline-flex items-center gap-2 shadow-md shadow-blue-500/25 border border-blue-400/30"
                  >
                    <FolderOpen className="w-4 h-4 text-cyan-200" />
                    <span>Buka di Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                  </a>

                  <a
                    href="/assets/projects/mobil.blend"
                    download="mobil.blend"
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-white/[0.07] hover:bg-white/[0.14] border border-white/[0.14] rounded-xl transition-all inline-flex items-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-cyan-300" />
                    <span>Unduh .blend (2.97 MB)</span>
                  </a>

                  <button
                    onClick={() => setSelectedProject(PORTFOLIO_DATA.projects[0])}
                    className="px-4 py-2.5 text-xs font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-xl transition-all inline-flex items-center gap-2"
                  >
                    <span>Studi Kasus Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right: Viewport with switcher between 3D Canvas and Google Drive Preview */}
              <div className="lg:col-span-7 space-y-2.5">
                {/* Switcher tabs */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-1.5 p-1 bg-black/50 border border-white/[0.08] rounded-xl text-xs">
                    <button
                      onClick={() => setSpotlightMode('interactive3d')}
                      className={`px-3 py-1 rounded-lg transition-all ${
                        spotlightMode === 'interactive3d'
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Kanvas 3D Interaktif
                    </button>
                    <button
                      onClick={() => setSpotlightMode('drivePreview')}
                      className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                        spotlightMode === 'drivePreview'
                          ? 'bg-blue-600 text-white font-semibold shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <FolderOpen className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Google Drive File</span>
                    </button>
                  </div>

                  <a
                    href={driveProjectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-medium text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
                  >
                    <span>Buka di Tab Baru</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {spotlightMode === 'interactive3d' ? (
                  <ErrorBoundary>
                    <Interactive3DViewer />
                  </ErrorBoundary>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0c0e17] shadow-2xl flex flex-col h-72 sm:h-80">
                    <div className="px-4 py-2.5 bg-black/60 border-b border-white/[0.08] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                        <span className="font-semibold text-white">Google Drive 3D Project Preview</span>
                      </div>
                      <a
                        href={driveProjectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-blue-400 hover:underline flex items-center gap-1"
                      >
                        <span>Akses Penuh</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="flex-1 w-full relative bg-neutral-950">
                      <iframe
                        src={driveEmbedUrl}
                        title="Google Drive 3D Project Preview"
                        className="w-full h-full border-0"
                        allow="autoplay"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bento Grid Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] hover:border-blue-500/50 transition-all duration-300 overflow-hidden flex flex-col justify-between backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
            >
              <div>
                {/* Visual Thumbnail Header with Dynamic Tech Graphic */}
                <div className="relative h-48 bg-[#0d0f18] p-5 border-b border-white/[0.08] flex flex-col justify-between overflow-hidden">
                  
                  {/* Subtle Grid Accent */}
                  <div
                    className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-35 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(${project.accentColor} 1.5px, transparent 1.5px)`,
                      backgroundSize: '18px 18px',
                    }}
                  />

                  {/* Top Category Line */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-200 px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/[0.1]">
                      {project.categoryLabel}
                    </span>
                    <span className="text-neutral-400 font-mono text-[11px]">{project.year}</span>
                  </div>

                  {/* Center Visual Motif Icon */}
                  <div className="relative z-10 self-center my-auto p-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] group-hover:scale-110 group-hover:border-blue-400/40 transition-all duration-300 shadow-md">
                    {project.category === '3d-animasi' && <Box className="w-8 h-8 text-blue-400" />}
                    {project.category === 'desain-grafis' && <Palette className="w-8 h-8 text-cyan-400" />}
                    {project.category === 'sistem-informasi' && <Database className="w-8 h-8 text-emerald-400" />}
                    {project.category === 'organisasi' && <Users className="w-8 h-8 text-pink-400" />}
                  </div>

                  {/* Bottom Line */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="truncate">Peran: {project.role}</span>
                    <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Detail <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-neutral-400">
                <div className="truncate max-w-[210px] text-[11px] text-neutral-400 font-mono">
                  {project.tools.slice(0, 3).join(' · ')}
                </div>
                <div className="text-[11px] text-blue-400 font-medium whitespace-nowrap">
                  Buka Proyek →
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Lightbox Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d0f18] border border-white/[0.15] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-neutral-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 mb-1.5">
                  <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">{selectedProject.categoryLabel}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-400 font-normal">{selectedProject.year}</span>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-400 font-normal">Peran: {selectedProject.role}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl bg-white/[0.06] text-neutral-400 hover:text-white hover:bg-white/[0.12] transition-colors"
                aria-label="Tutup jendela modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Google Drive Integration Spotlight inside Modal if applicable */}
            {selectedProject.driveUrl && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-white/[0.03] to-transparent border border-blue-500/30 space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Berkas Resmi Proyek 3D di Google Drive</div>
                      <div className="text-[11px] text-neutral-400">Tautan berkas asli yang diunggah oleh Sahal Arzaka</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {selectedProject.blendFilePath && (
                      <a
                        href={selectedProject.blendFilePath}
                        download="mobil.blend"
                        className="px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.15] text-xs font-semibold text-white transition-all inline-flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Unduh .blend ({selectedProject.blendFileSize || '2.97 MB'})</span>
                      </a>
                    )}
                    <a
                      href={selectedProject.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-all inline-flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20"
                    >
                      <span>Buka di Google Drive</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Live Embedded Preview */}
                <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden border border-white/[0.1] bg-black/60 relative">
                  <iframe
                    src={selectedProject.driveEmbedUrl}
                    title="Pratinjau File Proyek 3D Google Drive"
                    className="w-full h-full border-0"
                    allow="autoplay"
                  />
                </div>
              </div>
            )}

            {/* 3D Viewer inside modal if applicable */}
            {selectedProject.has3DViewer && (
              <div className="rounded-2xl overflow-hidden border border-white/[0.1]">
                <ErrorBoundary>
                  <Interactive3DViewer compact={true} />
                </ErrorBoundary>
              </div>
            )}

            {/* Narrative / Full Description */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-400" />
                <span>Ringkasan & Metodologi Pengerjaan</span>
              </h4>
              <p className="text-sm text-neutral-300 leading-relaxed p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                {selectedProject.fullDesc}
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Poin Kunci & Hasil Capaian</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-neutral-300">
                {selectedProject.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools Used */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-neutral-500 block text-[11px] mb-1">Perangkat & Keahlian Terkait:</span>
                <div className="text-neutral-300 font-mono text-xs flex flex-wrap items-center gap-1.5">
                  {selectedProject.tools.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all inline-flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                >
                  <span>Diskusikan Proyek Ini</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
