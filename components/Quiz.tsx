
import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Check, X, ArrowRight, RefreshCw, Lightbulb } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onFinish: () => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const question = questions[currentIdx];

  const handleSelect = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);
    if (opt === question.correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsDone(true);
      onFinish();
    }
  };

  if (isDone) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-zinc-100 text-black rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Check size={48} strokeWidth={4} />
        </div>
        <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Assessment Complete</h3>
        <p className="text-zinc-500 mb-10 font-bold uppercase tracking-widest text-sm">Proficiency: {Math.round((score/questions.length)*100)}%</p>
        <button 
          onClick={() => {
            setCurrentIdx(0);
            setIsAnswered(false);
            setSelectedOption(null);
            setIsDone(false);
            setScore(0);
          }}
          className="flex items-center gap-3 mx-auto px-8 py-3 bg-zinc-900 text-zinc-100 rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all"
        >
          <RefreshCw size={18} /> Retry Unit
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">
          CHALLENGE {currentIdx + 1} OF {questions.length}
        </span>
        <div className="h-1 flex-1 mx-8 bg-zinc-900 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-500 ease-out" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-3xl font-black mb-12 text-white tracking-tight leading-tight">{question.question}</h3>

      <div className="space-y-4">
        {question.options.map(opt => {
          const isCorrect = opt === question.correctAnswer;
          const isSelected = opt === selectedOption;
          
          let styles = "bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-500 hover:bg-zinc-900 hover:text-white";
          if (isAnswered) {
            if (isCorrect) styles = "bg-zinc-100 border-white text-black font-black";
            else if (isSelected) styles = "bg-zinc-900 border-zinc-700 text-zinc-700";
            else styles = "bg-black border-zinc-900 text-zinc-800 opacity-50";
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={isAnswered}
              className={`w-full p-6 rounded-2xl border flex items-center justify-between text-left transition-all duration-300 group ${styles}`}
            >
              <span className="text-lg font-bold">{opt}</span>
              {isAnswered && isCorrect && <Check size={24} strokeWidth={3} className="shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <X size={24} strokeWidth={3} className="shrink-0" />}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-12 animate-in slide-in-from-top-4 duration-500">
          <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-800 mb-8">
            <h4 className="text-[10px] font-black mb-4 flex items-center gap-2 text-zinc-500 uppercase tracking-[0.3em]">
              <Lightbulb size={18} /> Logic Insight
            </h4>
            <p className="text-zinc-300 text-lg leading-relaxed font-medium">{question.explanation}</p>
          </div>
          <button 
            onClick={nextQuestion}
            className="w-full bg-zinc-100 hover:bg-white py-6 rounded-3xl font-black text-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 transition-all shadow-2xl"
          >
            {currentIdx < questions.length - 1 ? 'Next Sequence' : 'Finalize Module'}
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
