
import React from 'react';
import { Trophy, Star, Menu, Zap } from 'lucide-react';

interface NavbarProps {
  points: number;
  completedCount: number;
  totalCount: number;
  onToggleMenu: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ points, completedCount, totalCount, onToggleMenu }) => {
  const progressPercent = (completedCount / totalCount) * 100;

  return (
    <nav className="h-20 border-b border-zinc-900/50 bg-black/60 backdrop-blur-2xl flex items-center justify-between px-4 md:px-8 shrink-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={onToggleMenu}
          className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-3 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
            <Zap size={16} fill="white" />
          </div>
        </div>

        <div className="hidden md:flex flex-col w-64">
          <div className="flex justify-between text-[10px] text-zinc-500 mb-2 uppercase tracking-[0.2em] font-black">
            <span>Progress Core</span>
            <span className="text-purple-500">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-blue-500 transition-all duration-700 ease-out shadow-[0_0_10px_rgba(100,108,255,0.5)]" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center gap-2 px-3 md:px-5 py-2 glass-card border border-white/5 rounded-2xl">
          <Trophy size={14} className="text-yellow-500" />
          <span className="text-xs md:text-sm font-black text-white">{points} <span className="text-zinc-500 ml-1">XP</span></span>
        </div>
        
        <div className="flex items-center gap-2 px-3 md:px-5 py-2 glass-card border border-white/5 rounded-2xl">
          <Star size={14} className="text-purple-400" />
          <span className="text-xs md:text-sm font-black text-white">{completedCount}/{totalCount}</span>
        </div>
        
        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[10px] font-black text-black shadow-xl shadow-white/10 ring-2 ring-purple-500/20">
          PRO
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
