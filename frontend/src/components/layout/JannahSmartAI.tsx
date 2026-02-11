"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, Send, Loader2 } from "lucide-react";

export function JannahSmartAI() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAIQuery = async () => {
    if (!input) return;
    setIsLoading(true);
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json",
          "HTTP-Referer": "https://publicityvisualmedia.web.app",
          "X-Title": "Publicity Visual AI"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-lite-001",
          messages: [
            { role: "system", content: "Eres el Asistente AI de Publicity Visual, un Media Hub de élite. Responde de forma experta, tecnológica y profesional en español. Mantén respuestas concisas." },
            { role: "user", content: input }
          ]
        })
      });
      const data = await res.json();
      setResponse(data.choices[0].message.content);
    } catch (error) {
      setResponse("Lo sentimos, el motor PV-AI está saturado. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#1b1c1e] to-[#101214] p-6 rounded-[4px] border border-white/5 relative overflow-hidden group shadow-2xl">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
        <Brain size={80} className="text-[#f14d5d]" />
      </div>

      <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-6 pb-2 border-b border-white/5 flex items-center gap-3 text-white">
        <Sparkles size={14} className="text-[#f14d5d]" />
        PV Intelligence
      </h4>

      <div className="space-y-4 relative z-10">
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Pregunta al Media Hub AI:</p>
        
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAIQuery()}
            placeholder="Tendencias 2026..."
            className="w-full bg-white/5 border border-white/10 rounded-sm py-4 px-4 text-xs text-white focus:outline-none focus:border-[#f14d5d] transition-colors pr-12"
          />
          <button 
            onClick={handleAIQuery}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#f14d5d] hover:bg-white/5 rounded-full transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-white/5 rounded-sm border-l-2 border-[#f14d5d]"
            >
              <p className="text-[11px] text-gray-200 leading-relaxed font-medium">
                {response}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
