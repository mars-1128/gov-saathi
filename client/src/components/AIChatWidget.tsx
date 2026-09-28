import React, { useState } from 'react';
import { Sparkles, X, MessageSquare, Maximize2 } from 'lucide-react';
import { AIChatInterface } from './AIChatInterface';
import { Link } from 'react-router-dom';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 text-white shadow-xl shadow-blue-600/30 hover:shadow-blue-600/40 hover:scale-105 transition-all duration-300 border border-blue-400/30 animate-subtle-pulse"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span className="font-bold text-sm tracking-tight pr-1">Ask AI Saathi</span>
        </button>
      )}

      {/* Expandable Chat Popup */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600/50 border border-blue-400/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  AI Saathi
                  <span className="text-[10px] font-normal px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </h3>
                <p className="text-[10px] text-blue-200">Official Government Services Guide</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Link
                to="/ai-saathi"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
                title="Open Fullscreen AI Saathi"
              >
                <Maximize2 className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Conversation Interface */}
          <div className="flex-1 overflow-hidden">
            <AIChatInterface isSidePanel={true} />
          </div>

        </div>
      )}

    </div>
  );
};
