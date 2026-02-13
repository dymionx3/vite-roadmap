
import React from 'react';
import { Lesson, Difficulty } from '../types';
import { Home, BookOpen, CheckCircle, Zap } from 'lucide-react';

interface SidebarProps {
  lessons: Lesson[];
  activeId: string;
  completedIds: string[];
  onSelect: (id: string) => void;
  onGoHome: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ lessons, activeId, completedIds, onSelect, onGoHome }) => {
  const grouped = {
    [Difficulty.Beginner]: lessons.filter(l => l.difficulty === Difficulty.Beginner),
    [Difficulty.Intermediate]: lessons.filter(l => l.difficulty === Difficulty.Intermediate),
    [Difficulty.Advanced]: lessons.filter(l => l.difficulty === Difficulty.Advanced),
  };

  const getDiffAccent = (diff: string) => {
    if (diff === Difficulty.Beginner) return 'text-emerald-500';
    if (diff === Difficulty.Intermediate) return 'text-blue-500';
    return 'text-fuchsia-500';
  };

  return (
    <aside className="w-72 bg-zinc-950 border-r border-zinc-900 flex flex-col h-full">
      <div className="p-8 border-b border-zinc-900/50">
        <div className="flex items-center gap-3 text-white font-black text-2xl mb-8 group cursor-pointer" onClick={onGoHome}>
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform">
            <Zap size={22} fill="white" className="text-white" />
          </div>
          <span className="tracking-tighter">VITE<span className="text-purple-500">PRO</span></span>
        </div>
        <button 
          onClick={onGoHome}
          className="flex items-center gap-3 w-full p-4 rounded-2xl hover:bg-zinc-900 transition-all text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-widest border border-transparent hover:border-zinc-800"
        >
          <Home size={18} />
          Overview
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-10 custom-scrollbar">
        {Object.entries(grouped).map(([diff, items]) => (
          <div key={diff}>
            <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 px-4 ${getDiffAccent(diff)}`}>
              {diff}
            </h3>
            <div className="space-y-1">
              {items.map(lesson => {
                const isActive = lesson.id === activeId;
                const isCompleted = completedIds.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => onSelect(lesson.id)}
                    className={`flex items-center gap-3 w-full p-4 rounded-2xl text-sm transition-all text-left group border ${
                      isActive 
                        ? 'bg-white text-black font-bold border-white shadow-lg' 
                        : 'text-zinc-500 border-transparent hover:bg-zinc-900 hover:text-zinc-200'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle size={16} className={`${isActive ? 'text-black' : 'text-emerald-500'} shrink-0`} />
                    ) : (
                      <BookOpen size={16} className={`${isActive ? 'text-black' : 'text-zinc-600'} shrink-0`} />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-6 border-t border-zinc-900/50">
        <div className="bg-gradient-to-br from-zinc-900 to-black p-4 rounded-2xl border border-zinc-800 text-[9px] text-zinc-600 font-mono uppercase tracking-widest text-center shadow-inner">
          Neural Engine Connected
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
