
import React from 'react';
import { VisualType } from '../types';

interface VisualConceptProps {
  type: VisualType;
}

const VisualConcept: React.FC<VisualConceptProps> = ({ type }) => {
  const renderVisual = () => {
    switch (type) {
      case 'esm-loading':
        return (
          <div className="relative h-56 bg-zinc-950 rounded-[2rem] overflow-hidden flex items-center justify-center border border-zinc-900">
            <div className="flex gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse" />
                  <div className="h-16 w-0.5 bg-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 w-full h-6 bg-purple-500 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                  </div>
                  <div className="px-3 py-1.5 bg-zinc-900 border border-purple-500/20 rounded-xl text-[10px] font-black text-purple-400 uppercase tracking-widest">mod_{i}.js</div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-6 text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black">Native ESM Protocol</div>
          </div>
        );
      case 'hmr':
        return (
          <div className="relative h-56 bg-zinc-950 rounded-[2rem] overflow-hidden flex items-center justify-center border border-zinc-900">
            <div className="flex items-center gap-16">
              <div className="relative w-20 h-24 bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col p-3">
                <div className="w-full h-3 bg-purple-500/30 rounded-full mb-3 animate-pulse" />
                <div className="w-3/4 h-3 bg-zinc-800 rounded-full" />
              </div>
              <div className="text-purple-500 animate-pulse font-black text-3xl">→</div>
              <div className="relative w-28 h-28 bg-purple-500/5 border border-purple-500/20 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full absolute inset-0 bg-purple-500/10 animate-ping" />
                <span className="text-purple-400 text-[10px] font-black text-center p-3 uppercase tracking-widest">HMR Pulse</span>
              </div>
            </div>
            <div className="absolute bottom-6 text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black">Hot Module Injection</div>
          </div>
        );
      case 'folder-tree':
        return (
          <div className="h-56 bg-black rounded-[2rem] p-8 font-mono text-sm overflow-hidden border border-zinc-900">
            <div className="text-purple-500 font-black mb-3 uppercase tracking-widest">root/</div>
            <div className="pl-6 text-zinc-600">├── <span className="text-emerald-400">index.html</span></div>
            <div className="pl-6 text-zinc-600">├── src/</div>
            <div className="pl-12 text-zinc-400 animate-pulse font-black uppercase tracking-tighter">│   ├── <span className="text-blue-400">main.js</span></div>
            <div className="pl-12 text-zinc-600">│   └── style.css</div>
            <div className="pl-6 text-zinc-600">├── public/</div>
            <div className="pl-12 text-zinc-700">│   └── assets/</div>
            <div className="pl-6 text-zinc-600">└── config.js</div>
          </div>
        );
      case 'env-flow':
        return (
          <div className="h-56 bg-zinc-950 rounded-[2rem] overflow-hidden flex items-center justify-center border border-zinc-900">
            <div className="flex flex-col items-center gap-4">
              <div className="px-6 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-400 text-[10px] font-black uppercase tracking-widest">ENV SOURCE</div>
              <div className="h-10 w-px bg-zinc-800" />
              <div className="flex gap-8">
                <div className="flex flex-col items-center opacity-30">
                  <div className="px-3 py-1.5 border border-zinc-800 rounded-lg text-[10px] font-bold">PRIVATE_KEY</div>
                  <X size={14} className="text-red-500 mt-2" />
                </div>
                <div className="flex flex-col items-center">
                  <div className="px-3 py-1.5 border border-purple-500 bg-purple-500 text-white rounded-lg text-[10px] font-black shadow-lg shadow-purple-500/20">VITE_URL</div>
                  <Check size={14} className="text-emerald-500 mt-2" />
                </div>
              </div>
            </div>
          </div>
        );
      case 'bundling':
        return (
          <div className="h-56 bg-zinc-950 rounded-[2rem] overflow-hidden flex items-center justify-center border border-zinc-900">
            <div className="flex items-center gap-8">
               <div className="grid grid-cols-2 gap-2 animate-pulse">
                {[1,2,3,4].map(i => <div key={i} className="w-5 h-5 bg-zinc-800 rounded-lg" />)}
               </div>
               <div className="text-purple-500 font-black text-2xl">→</div>
               <div className="w-16 h-20 bg-purple-600 rounded-2xl flex flex-col p-2 gap-2 shadow-2xl border border-white/20">
                 <div className="w-full h-2 bg-white/20 rounded-full" />
                 <div className="w-full h-2 bg-white/20 rounded-full" />
                 <div className="w-full h-full bg-white/10 rounded-xl" />
               </div>
            </div>
            <div className="absolute bottom-6 text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black">Rollup Engine</div>
          </div>
        );
      case 'ssr-hydration':
        return (
          <div className="h-56 bg-zinc-950 rounded-[2rem] overflow-hidden border border-zinc-900 flex items-center justify-center">
             <div className="relative">
                <div className="w-48 h-32 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center overflow-hidden">
                   <div className="w-full h-full bg-blue-500/10 absolute top-0 left-0 transition-transform duration-1000 origin-top animate-pulse" />
                   <div className="text-blue-400 font-black text-xs uppercase tracking-widest z-10">HTML Loaded</div>
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest animate-bounce shadow-xl shadow-blue-600/20">
                  Hydrating...
                </div>
             </div>
          </div>
        );
      default:
        return (
           <div className="h-56 bg-zinc-950 rounded-[2rem] border border-zinc-900 flex items-center justify-center">
             <div className="w-16 h-16 bg-purple-600/10 rounded-full flex items-center justify-center animate-pulse">
               <Zap className="text-purple-500" size={32} />
             </div>
           </div>
        );
    }
  };

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-5 text-zinc-600 uppercase tracking-[0.4em] text-[10px] font-black">
        <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
        VISUAL CORE ENGINE
      </div>
      {renderVisual()}
    </div>
  );
};

const Check: React.FC<{ size: number, className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const X: React.FC<{ size: number, className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const Zap: React.FC<{ size: number, className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);

export default VisualConcept;
