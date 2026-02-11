"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, MessageCircle, Share2, Copy, Check } from "lucide-react";

export function SelectAndShare() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [selectedText, setSelectedText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();

    if (text && text.length > 5) {
      const range = selection?.getRangeAt(0);
      const rect = range?.getBoundingClientRect();

      if (rect) {
        setSelectedText(text);
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top + window.scrollY - 50,
        });
      }
    } else {
      setPosition(null);
      setSelectedText("");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mouseup", handleSelection);
    return () => document.removeEventListener("mouseup", handleSelection);
  }, [handleSelection]);

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${selectedText}"`)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, "_blank");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selectedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {position && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="fixed z-[9999] flex items-center gap-1 bg-white dark:bg-[#1b1c1e] text-gray-800 dark:text-white p-1 rounded-full shadow-2xl border border-gray-100 dark:border-white/10 pointer-events-auto"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            transform: "translateX(-50%)"
          }}
        >
          <button 
            onClick={shareOnTwitter}
            className="p-2 hover:bg-[#1da1f2]/10 hover:text-[#1da1f2] rounded-full transition-colors"
            title="Compartir en Twitter"
          >
            <Twitter size={16} />
          </button>
          
          <button 
            onClick={copyToClipboard}
            className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
            title="Copiar texto"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>

          <div className="w-[1px] h-4 bg-gray-100 dark:bg-white/10 mx-1"></div>

          <button 
            className="p-2 hover:bg-[#f14d5d]/10 hover:text-[#f14d5d] rounded-full transition-colors"
            title="Más opciones"
          >
            <Share2 size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
