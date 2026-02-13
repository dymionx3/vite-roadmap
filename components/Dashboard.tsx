
import React, { useEffect } from 'react';
import { Lesson, Difficulty, UserProgress } from '../types';
import { Lock, CheckCircle2, PlayCircle, Star, Target, Compass } from 'lucide-react';

interface DashboardProps {
  lessons: Lesson[];
  progress: UserProgress;
  onSelect: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ lessons, progress, onSelect }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [lessons]); // Re-run if lessons change (unlikely but safe)

  const getDiffStyles = (d: Difficulty) => {
    switch (d) {
      case Difficulty.Beginner: 
        return { 
          badge: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
          node: 'bg-emerald-500',
          glow: 'node-glow-beginner',
          accent: 'text-emerald-500'
        };
      case Difficulty.Intermediate: 
        return { 
          badge: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
          node: 'bg-blue-500',
          glow: 'node-glow-intermediate',
          accent: 'text-blue-500'
        };
      case Difficulty.Advanced: 
        return { 
          badge: 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5',
          node: 'bg-fuchsia-500',
          glow: 'node-glow-advanced',
          accent: 'text-fuchsia-500'
        };
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-6xl mx-auto pb-48 relative">
      {/* Background Decorative Elements with Images */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {/* Parallax-style background image - Network/Tech */}
        <div 
          className="absolute inset-0 opacity-[0.08] grayscale mix-blend-screen"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[100px] rounded-full" />
      </div>

      <div className="text-center mb-32 space-y-6 pt-16">
        <div className="inline-flex items-center gap-2 px-6 py-2 glass-card rounded-full text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
          <Compass size={14} className="animate-spin-slow text-purple-500" />
          SYSTEM CORE V2.0
        </div>
        <h1 className="text-7xl md:text-9xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-600 tracking-tighter leading-none">
          Vite Mastery <br /> <span className="text-purple-500">Odyssey</span>
        </h1>
        <p className="text-zinc-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          The elite curriculum for modern toolchain engineers. Master the pulse of the web.
        </p>
      </div>

      <div className="relative px-4">
        {/* Main Vertical Stem with Pulsing Gradient */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 hidden xl:block overflow-hidden">
          <div className="absolute inset-0 bg-zinc-800" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500 to-transparent h-[200px] w-full animate-shimmer-vertical" 
               style={{ animation: 'shimmerVertical 4s linear infinite' }} />
        </div>
        <style>{`
          @keyframes shimmerVertical {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
        `}</style>

        <div className="space-y-24 relative">
          {lessons.map((lesson, index) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isNext = !isCompleted && (index === 0 || progress.completedLessons.includes(lessons[index - 1].id));
            const isLocked = !isCompleted && !isNext;
            const isEven = index % 2 === 0;
            const styles = getDiffStyles(lesson.difficulty);

            return (
              <div 
                key={lesson.id}
                className={`flex flex-col xl:flex-row items-center gap-12 group reveal ${isEven ? 'xl:flex-row-reverse' : ''}`}
              >
                {/* Node Junction */}
                <div className="hidden xl:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl border-2 border-zinc-900 bg-zinc-950 z-20 items-center justify-center transition-all duration-700 group-hover:scale-125 group-hover:border-zinc-100 shadow-xl">
                   <div className={`w-4 h-4 rounded-full transition-all duration-500 ${
                     isCompleted ? 'bg-zinc-600' : isLocked ? 'bg-zinc-800' : `${styles.node} animate-pulse shadow-[0_0_20px_rgba(255,255,255,0.3)]`
                   }`} />
                </div>

                {/* Content Card */}
                <div className="w-full xl:w-[46%]">
                  <div 
                    onClick={() => !isLocked && onSelect(lesson.id)}
                    className={`hover-spin-card relative p-12 rounded-[4rem] border transition-all duration-700 overflow-hidden ${
                      isLocked 
                        ? 'bg-zinc-950/50 border-zinc-900 grayscale opacity-40 cursor-not-allowed scale-[0.98]' 
                        : isNext 
                          ? `bg-zinc-950 border-purple-500/30 ${styles.glow} scale-105 z-30 ring-1 ring-purple-500/10`
                          : 'bg-zinc-950/80 border-zinc-800 cursor-pointer hover:border-zinc-600 hover:shadow-[0_0_80px_rgba(100,108,255,0.05)]'
                    }`}
                  >
                    {/* Shimmer for next node */}
                    {isNext && <div className="absolute inset-0 shimmer pointer-events-none" />}

                    <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                       <Target size={200} className={styles.accent} />
                    </div>

                    <div className="flex justify-between items-center mb-10 relative z-10">
                      <span className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] border ${styles.badge}`}>
                        {lesson.difficulty}
                      </span>
                      {isCompleted ? (
                        <div className="p-4 glass-card rounded-2xl text-emerald-400 shadow-inner"><CheckCircle2 size={28} /></div>
                      ) : isLocked ? (
                        <div className="p-4 bg-zinc-900/50 rounded-2xl text-zinc-700"><Lock size={28} /></div>
                      ) : (
                        <div className="p-4 bg-white rounded-2xl text-black shadow-2xl animate-bounce-subtle"><PlayCircle size={28} /></div>
                      )}
                    </div>

                    <h3 className="text-4xl font-black mb-6 relative z-10 text-white group-hover:text-white transition-colors tracking-tight">
                      {lesson.title}
                    </h3>
                    
                    <div className="flex items-center gap-6 relative z-10 mb-10">
                      <div className="flex items-center gap-3 px-5 py-2.5 bg-black border border-zinc-900 rounded-2xl text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        <Target size={16} className={styles.accent} />
                        <span>MODULE {index + 1}</span>
                      </div>
                      <div className="flex items-center gap-3 px-5 py-2.5 bg-black border border-zinc-900 rounded-2xl text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        <Star size={16} className="text-yellow-500" />
                        <span>250 XP</span>
                      </div>
                    </div>

                    <div className={`mt-10 pt-10 border-t border-zinc-900 flex items-center justify-between relative z-10 ${isLocked ? 'hidden' : 'flex'}`}>
                      <div className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.4em]">
                        {isCompleted ? 'REVISIT PROTOCOL' : 'INITIATE TRANSMISSION'}
                      </div>
                      <div className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:rotate-12 ${isNext ? 'bg-purple-600 text-white' : 'bg-zinc-100 text-black'} shadow-2xl`}>
                        <PlayCircle size={32} fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden xl:block xl:w-[46%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
