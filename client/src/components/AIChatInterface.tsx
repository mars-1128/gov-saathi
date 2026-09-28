import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  ExternalLink,
  Phone,
  FileText,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { sendAIChatMessage } from '../lib/api';
import { ChatMessage, AISaathiResponse } from '../types';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';

interface AIChatInterfaceProps {
  initialMessage?: string;
  isSidePanel?: boolean;
}

const SUGGESTED_QUERIES = [
  'There is a pothole near my house',
  'Someone scammed me online through UPI',
  'I need to download my 10th & 12th marksheets',
  'How do I apply for a new passport?',
  'I have an unfair bill from an e-commerce company',
  'How do I update address in Aadhaar?'
];

export const AIChatInterface: React.FC<AIChatInterfaceProps> = ({ initialMessage = '', isSidePanel = false }) => {
  const { state: userState, district: userDistrict } = useLocation();
  const { language } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Namaste! I am AI Saathi, your official guide to Indian Government Services. Describe any requirement or problem in normal language (e.g., "pothole on my road", "scammed online", "lost documents"), and I will identify the correct government authority, explain the steps, and provide official verified links.',
      created_at: new Date().toISOString()
    }
  ]);

  const [input, setInput] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await sendAIChatMessage({
        message: textToSend,
        history,
        state: userState,
        district: userDistrict,
        language
      });

      if (response && response.data) {
        const assistantMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: response.data.answer || response.raw_text || 'Here is the verified guidance for your request:',
          structured_data: response.data,
          created_at: new Date().toISOString()
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error('AI chat error:', error);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'AI Saathi is temporarily experiencing high traffic. However, you can browse all verified government services directly from the directory.',
        created_at: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full bg-slate-50 dark:bg-slate-950 ${isSidePanel ? 'text-xs' : 'text-sm'}`}>
      
      {/* Jurisdiction Bar */}
      <div className="px-4 py-2 bg-blue-50/70 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-xs text-blue-900 dark:text-blue-300">
        <div className="flex items-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Active Jurisdiction: <strong>{userState}</strong></span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
          Strictly Fact Grounded
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm mt-1">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
            )}

            <div className={`max-w-[88%] space-y-3 ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm p-3.5 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-2xl rounded-tl-sm p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm'
            }`}>
              
              <p className="leading-relaxed whitespace-pre-line font-normal">
                {msg.content}
              </p>

              {/* Structured AI Guidance Card */}
              {msg.structured_data?.service && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  
                  {/* Verified Service Banner */}
                  <div className="rounded-xl p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {msg.structured_data.jurisdiction} Authority
                      </span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> Verified .gov.in
                      </span>
                    </div>

                    <h4 className="mt-2 font-bold text-sm text-blue-950 dark:text-blue-100">
                      {msg.structured_data.service.name}
                    </h4>

                    <p className="mt-1 text-xs text-blue-900/80 dark:text-blue-200/80">
                      {msg.structured_data.service.reason}
                    </p>

                    {msg.structured_data.service.official_helpline && (
                      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-800 dark:text-blue-300">
                        <Phone className="w-3 h-3" />
                        <span>Helpline: {msg.structured_data.service.official_helpline}</span>
                      </div>
                    )}
                  </div>

                  {/* Required Documents */}
                  {msg.structured_data.documents && msg.structured_data.documents.length > 0 && (
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1.5">
                        <FileText className="w-3.5 h-3.5" /> Documents You May Need
                      </h5>
                      <ul className="space-y-1">
                        {msg.structured_data.documents.map((doc, idx) => (
                          <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Step-by-Step Instructions */}
                  {msg.structured_data.steps && msg.structured_data.steps.length > 0 && (
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-2">
                        Step-by-Step Instructions
                      </h5>
                      <div className="space-y-2">
                        {msg.structured_data.steps.map((st) => (
                          <div key={st.step_number} className="flex gap-2 text-xs">
                            <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                              {st.step_number}
                            </span>
                            <div>
                              <div className="font-semibold text-slate-900 dark:text-slate-100">{st.title}</div>
                              <div className="text-slate-600 dark:text-slate-400">{st.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Official Portal External Link Button */}
                  <div className="pt-2">
                    <a
                      href={msg.structured_data.service.official_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs shadow-md transition-all"
                    >
                      <span>Open Official Verified Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="mt-1.5 text-[10px] text-center text-slate-400">
                      Gov Saathi does not take your password or submit forms. Complete on the official government site.
                    </div>
                  </div>

                </div>
              )}

            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 flex-shrink-0 shadow-sm mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-xs text-slate-500 dark:text-slate-400">
            <div className="w-8 h-8 rounded-xl bg-blue-700 flex items-center justify-center text-white flex-shrink-0 animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 shadow-sm">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Analyzing citizen query against verified government database...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts (Only if 1-2 messages) */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> Suggested Questions:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-300 text-left transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your issue (e.g. pothole on my street, online financial fraud)..."
            disabled={loading}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white shadow-md transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
