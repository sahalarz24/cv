import React from 'react';
import { GraduationCap, Award, Compass, Calendar, Building2, CheckCircle2, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA, EducationExperience } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section id="pendidikan" className="py-16 sm:py-24 border-b border-white/[0.08] bg-[#090a0f] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Pendidikan & Pengalaman</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Perjalanan Akademis & Tempaan Karakter
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Rekam jejak pendidikan formal dan pengalaman organisasi yang membentuk dedikasi kerja Sahal Arzaka.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-white/[0.12] ml-4 sm:ml-6 space-y-10 pl-6 sm:pl-8">
          {PORTFOLIO_DATA.educationHistory.map((item: EducationExperience, index: number) => (
            <div key={index} className="relative group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#090a0f] border-2 border-blue-500 group-hover:border-blue-400 group-hover:scale-125 transition-all shadow-[0_0_12px_rgba(59,130,246,0.6)]" />

              {/* Card Container */}
              <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 hover:bg-white/[0.05] transition-all duration-300 space-y-4 backdrop-blur-md shadow-lg">
                
                {/* Header row: Period, Institution, Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 text-blue-400 font-semibold font-mono tabular-nums">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{item.period}</span>
                    <span className="text-neutral-600">/</span>
                    <span className="text-neutral-300 font-sans font-medium">{item.role}</span>
                  </div>

                  <span className="text-neutral-300 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1]">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Institution */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400/80" />
                    <span>{item.institution}</span>
                  </div>
                </div>

                {/* Description Narrative */}
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Achievements & Responsibilities */}
                <div className="pt-3 border-t border-white/[0.06] space-y-2">
                  <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    Fokus Pembelajaran & Kontribusi:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {item.achievements.map((achieve, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{achieve}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
