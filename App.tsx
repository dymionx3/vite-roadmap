
import React, { useState, useEffect } from 'react';
import { LESSONS } from './data/lessons';
import { UserProgress } from './types';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';

const STORAGE_KEY = 'vite_roadmap_progress_v2';

const App: React.FC = () => {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      completedLessons: [],
      currentLessonId: LESSONS[0].id,
      points: 0
    };
  });

  const [view, setView] = useState<'roadmap' | 'lesson'>('roadmap');
  const [activeLessonId, setActiveLessonId] = useState<string>(progress.currentLessonId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Scroll to top when view or active lesson changes
  useEffect(() => {
    const main = document.querySelector('main');
    if (main) main.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }, [view, activeLessonId]);

  const activeLesson = LESSONS.find(l => l.id === activeLessonId) || LESSONS[0];

  const handleLessonSelect = (id: string) => {
    setActiveLessonId(id);
    setView('lesson');
    setIsSidebarOpen(false);
    setProgress(prev => ({ ...prev, currentLessonId: id }));
  };

  const handleComplete = (lessonId: string, earnedPoints: number) => {
    setProgress(prev => {
      const isNew = !prev.completedLessons.includes(lessonId);
      return {
        ...prev,
        completedLessons: isNew ? [...prev.completedLessons, lessonId] : prev.completedLessons,
        points: isNew ? prev.points + earnedPoints : prev.points
      };
    });
  };

  const nextLesson = () => {
    const idx = LESSONS.findIndex(l => l.id === activeLessonId);
    if (idx < LESSONS.length - 1) {
      handleLessonSelect(LESSONS[idx + 1].id);
    } else {
      setView('roadmap');
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-black text-zinc-100 selection:bg-white selection:text-black">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Component */}
      <div className={`
        fixed inset-y-0 left-0 z-50 lg:static transform transition-transform duration-300 lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          lessons={LESSONS} 
          activeId={activeLessonId} 
          completedIds={progress.completedLessons} 
          onSelect={handleLessonSelect} 
          onGoHome={() => { setView('roadmap'); setIsSidebarOpen(false); }}
        />
      </div>
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar 
          points={progress.points} 
          completedCount={progress.completedLessons.length} 
          totalCount={LESSONS.length} 
          onToggleMenu={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {view === 'roadmap' ? (
            <Dashboard 
              lessons={LESSONS} 
              progress={progress} 
              onSelect={handleLessonSelect} 
            />
          ) : (
            <div className="max-w-4xl mx-auto">
              <LessonView 
                lesson={activeLesson} 
                onComplete={(p) => handleComplete(activeLesson.id, p)}
                onNext={nextLesson}
                isCompleted={progress.completedLessons.includes(activeLesson.id)}
                onBack={() => setView('roadmap')}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
