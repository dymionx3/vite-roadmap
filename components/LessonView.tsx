
import React, { useState, useEffect } from 'react';
import { Lesson } from '../types';
import Quiz from './Quiz';
import CodePractice from './CodePractice';
import VisualConcept from './VisualConcept';
import AITutor from './AITutor';
import { ArrowRight, ArrowLeft, Book, CheckCircle, Code, Lightbulb, GraduationCap, Star, Zap } from 'lucide-react';

interface LessonViewProps {
  lesson: Lesson;
  onComplete: (points: number) => void;
  onNext: () => void;
  onBack: () => void;
  isCompleted: boolean;
}

const LessonView: React.FC<LessonViewProps> = ({ lesson, onComplete, onNext, onBack, isCompleted }) => {
  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'practice'>(
    lesson.quiz ? 'quiz' : lesson.practice ? 'practice' : 'content'
  );
  
  useEffect(() => {
    setActiveTab(lesson.quiz ? 'quiz' : lesson.practice ? 'practice' : 'content');
  }, [lesson.id]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [lesson.id, activeTab]);

  const handleFinish = () => {
    onComplete(250);
  };

  return (
    <div className="space-y-10 pb-32 animate-in fade-in slide-in-from-right-8 duration-500 pt-6">
      <div className="relative group overflow-hidden rounded-[3rem] p-1 md:p-1.5 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-emerald-500/20 mb-12">
        {/* Header Hero Background Image - Cyberpunk/Code */}
        <div 
          className="absolute inset-0 opacity-20 grayscale scale-110 group-hover:scale-100 transition-transform duration-1000"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative bg-zinc-950/90 backdrop-blur-xl flex flex-col justify-between gap-8 p-12 rounded-[2.8rem] border border-zinc-900/50">
          <button 
            onClick={onBack}
            className="self-start flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest mb-4"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="relative">
              <div className="flex items-center gap-2 text-purple-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                <GraduationCap size={16} />
                DIFFICULTY: {lesson.difficulty}
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                {lesson.title}
              </h2>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-3 text-emerald-400 font-black glass-card px-8 py-4 rounded-3xl border border-emerald-500/20 shadow-2xl shrink-0 uppercase tracking-widest text-xs">
                <CheckCircle size={24} className="text-emerald-500" />
                Module Mastered
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-8 space-y-10 reveal">
          <div className="bg-zinc-950/80 backdrop-blur-md p-10 md:p-14 rounded-[4rem] border border-zinc-900 shadow-2xl relative overflow-hidden">
            {/* Decorative background pulse */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px]" />
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="p-3 bg-purple-600 rounded-2xl text-white shadow-lg shadow-purple-600/20">
                <Book size={28} />
              </div>
              <h4 className="m-0 font-black uppercase tracking-[0.3em] text-[10px] text-zinc-500">Mastery Content</h4>
            </div>
            
            <div className="prose prose-invert max-w-none relative z-10">
              {lesson.content.split('\n').map((para, i) => (
                <p key={i} className="text-zinc-300 text-xl leading-relaxed whitespace-pre-line mb-8 font-medium">
                  {para}
                </p>
              ))}
            </div>

            {lesson.visual && <VisualConcept type={lesson.visual} />}

            {lesson.codeSnippet && (
              <div className="mt-14 rounded-[2.5rem] overflow-hidden border border-zinc-900 bg-black shadow-2xl group">
                <div className="bg-zinc-900/80 px-8 py-4 border-b border-zinc-900 flex justify-between items-center">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase font-black tracking-[0.3em]">Module Snippet</span>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                  </div>
                </div>
                <pre className="p-10 text-zinc-300 font-mono text-base overflow-x-auto m-0 leading-relaxed scrollbar-hide">
                  <code>{lesson.codeSnippet}</code>
                </pre>
              </div>
            )}

            <AITutor topic={`${lesson.title}: ${lesson.content.substring(0, 50)}...`} />
          </div>

          {(lesson.quiz || lesson.practice) && (
            <div className="bg-zinc-950/80 backdrop-blur-md rounded-[4rem] border border-zinc-900 shadow-2xl overflow-hidden reveal">
              <div className="flex bg-zinc-900/30">
                {lesson.quiz && (
                  <button 
                    onClick={() => setActiveTab('quiz')}
                    className={`flex-1 py-8 text-xs font-black flex items-center justify-center gap-3 transition-all tracking-[0.2em] uppercase ${
                      activeTab === 'quiz' 
                        ? 'bg-purple-600 text-white shadow-2xl relative z-10' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                    }`}
                  >
                    <Lightbulb size={20} /> Knowledge
                  </button>
                )}
                {lesson.practice && (
                  <button 
                    onClick={() => setActiveTab('practice')}
                    className={`flex-1 py-8 text-xs font-black flex items-center justify-center gap-3 transition-all tracking-[0.2em] uppercase ${
                      activeTab === 'practice' 
                        ? 'bg-blue-600 text-white shadow-2xl relative z-10' 
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                    }`}
                  >
                    <Code size={20} /> Practice
                  </button>
                )}
              </div>
              
              <div className="p-10 md:p-16">
                {activeTab === 'quiz' && lesson.quiz && (
                  <Quiz 
                    questions={lesson.quiz} 
                    onFinish={handleFinish} 
                  />
                )}
                {activeTab === 'practice' && lesson.practice && (
                  <CodePractice 
                    challenge={lesson.practice} 
                    onFinish={handleFinish}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-10 sticky top-10 reveal">
          <div className="bg-white p-10 rounded-[3.5rem] text-black shadow-2xl shadow-purple-500/10">
            <h4 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
              <div className="p-2 bg-purple-600 rounded-xl text-white">
                <Zap size={22} fill="white" />
              </div>
              Objectives
            </h4>
            <ul className="space-y-6 text-zinc-700 text-sm font-bold uppercase tracking-wider">
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-purple-600 shrink-0" />
                Master core Vite logic
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                Build production apps
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                Unlock Node XP
              </li>
            </ul>
            
            <button 
              onClick={onNext}
              className="mt-12 w-full bg-purple-600 text-white py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-purple-700 transition-all active:scale-95 shadow-xl shadow-purple-600/20"
            >
              Next Module <ArrowRight size={20} />
            </button>
          </div>

          <div className="glass-card p-10 rounded-[3rem] text-center">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4">Module Rewards</div>
            <div className="text-4xl font-black text-white flex items-center justify-center gap-3">
              <Star size={28} className="text-yellow-500" fill="currentColor" />
              250 XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
