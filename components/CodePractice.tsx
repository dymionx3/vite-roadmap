
import React, { useState, useEffect, useRef } from 'react';
import { PracticeChallenge } from '../types';
import { CheckCircle, RefreshCw, Terminal } from 'lucide-react';

interface CodePracticeProps {
  challenge: PracticeChallenge;
  onFinish: () => void;
}

const CodePractice: React.FC<CodePracticeProps> = ({ challenge, onFinish }) => {
  const [code, setCode] = useState(challenge.initialCode);
  const [isSolved, setIsSolved] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const updatePreview = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    let content = '';
    if (challenge.type === 'css') {
      content = `
        <html>
          <head><style>body { font-family: sans-serif; background: #000; color: #fff; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; } ${code}</style></head>
          <body>
            <h1>Vite Practice Unit</h1>
            <p>Monochromatic Editor active.</p>
          </body>
        </html>
      `;
    } else if (challenge.type === 'js') {
      content = `
        <html>
          <head>
            <style>
              body { font-family: sans-serif; background: #000; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              button { padding: 16px 32px; font-weight: 900; border: none; border-radius: 16px; cursor: pointer; background: #fff; color: #000; text-transform: uppercase; font-size: 12px; letter-spacing: 2px; }
              #status { margin-top: 30px; font-size: 1.5rem; font-weight: 900; color: #71717a; text-transform: uppercase; }
            </style>
          </head>
          <body>
            <button id="btn">Action Toggle</button>
            <div id="status">Ready</div>
            <script>${code}<\/script>
          </body>
        </html>
      `;
    } else {
      content = code;
    }

    doc.open();
    doc.write(content);
    doc.close();
  };

  useEffect(() => {
    updatePreview();
  }, [code]);

  const handleSolve = () => {
    setIsSolved(true);
    onFinish();
  };

  return (
    <div className="space-y-8">
      <div className="bg-zinc-900/50 rounded-[2.5rem] p-10 border border-zinc-800">
        <h3 className="text-2xl font-black mb-3 flex items-center gap-3 text-white uppercase tracking-tighter">
          <Terminal size={24} className="text-zinc-500" />
          {challenge.title}
        </h3>
        <p className="text-zinc-400 text-lg leading-relaxed font-medium">{challenge.description}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[500px]">
        <div className="flex flex-col rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-black shadow-inner">
          <div className="bg-zinc-900/80 px-8 py-4 border-b border-zinc-800 flex justify-between items-center shrink-0">
            <span className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.3em]">Code Editor</span>
            <button 
              onClick={() => setCode(challenge.initialCode)}
              className="text-zinc-600 hover:text-zinc-200 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 w-full bg-transparent p-10 text-base font-mono text-zinc-300 outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col rounded-[2.5rem] overflow-hidden border border-zinc-800 bg-black shadow-inner">
          <div className="bg-zinc-900/80 px-8 py-4 border-b border-zinc-800 flex items-center gap-2 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="text-[10px] uppercase font-black text-zinc-500 ml-4 tracking-[0.3em]">Runtime Preview</span>
          </div>
          <iframe 
            ref={iframeRef}
            title="Practice Preview"
            className="flex-1 w-full border-none invert brightness-110"
          />
        </div>
      </div>

      <div className="flex justify-end pt-6">
        {!isSolved ? (
          <button 
            onClick={handleSolve}
            className="bg-white hover:bg-zinc-200 text-black px-12 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center gap-3 transition-all transform active:scale-95 shadow-2xl"
          >
            <CheckCircle size={20} /> Verify Progress
          </button>
        ) : (
          <div className="text-white font-black uppercase tracking-[0.3em] text-xs flex items-center gap-3 animate-pulse">
            <CheckCircle size={24} /> Skill Verification Logged
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePractice;
