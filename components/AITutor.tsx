
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BrainCircuit, Sparkles, Loader2, PlayCircle } from 'lucide-react';

interface AITutorProps {
  topic: string;
}

const AITutor: React.FC<AITutorProps> = ({ topic }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const getDeepInsight = async () => {
    setLoading(true);
    setInsight('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain the technical significance of "${topic}" in the Vite ecosystem. Keep it advanced, professional, and slightly futuristic in tone. Use a brief bulleted list for key technical benefits. No markdown formatting like bolding, just plain professional text.`,
      });
      
      setInsight(response.text || 'No technical data available at this time.');
    } catch (err) {
      setInsight('Connection to the Neural Engine failed. Please verify system status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 bg-zinc-900 border border-purple-500/20 rounded-[3rem] p-10 shadow-2xl overflow-hidden relative group">
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-purple-500">
        <BrainCircuit size={120} className="animate-pulse" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-purple-600 text-white rounded-2xl shadow-xl shadow-purple-600/20">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm">Neural Intelligence</h4>
            <p className="text-purple-400 text-[10px] uppercase font-black tracking-[0.2em]">Gemini AI Assistant</p>
          </div>
        </div>

        <button 
          onClick={getDeepInsight}
          disabled={loading}
          className="bg-white hover:bg-zinc-100 text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 disabled:opacity-50 shadow-xl"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <PlayCircle size={16} />}
          {loading ? 'Processing...' : 'Deep Dive Analysis'}
        </button>
      </div>

      {(insight || loading) && (
        <div className="mt-10 border-t border-zinc-800 pt-10 animate-in fade-in slide-in-from-top-4">
          <div className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line font-medium italic">
            {loading ? (
              <div className="flex flex-col gap-3">
                <div className="h-4 bg-purple-500/20 rounded-full w-3/4 animate-pulse" />
                <div className="h-4 bg-purple-500/10 rounded-full w-full animate-pulse" />
                <div className="h-4 bg-purple-500/5 rounded-full w-1/2 animate-pulse" />
              </div>
            ) : insight}
          </div>
        </div>
      )}
    </div>
  );
};

export default AITutor;
