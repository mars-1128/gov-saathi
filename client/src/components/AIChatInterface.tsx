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
  Globe,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ChevronRight
} from 'lucide-react';
import { sendAIChatMessage } from '../lib/api';
import { ChatMessage, AISaathiResponse } from '../types';
import { useLocation } from '../context/LocationContext';
import { useLanguage, SUPPORTED_LANGUAGES, LanguageCode } from '../context/LanguageContext';

interface AIChatInterfaceProps {
  initialMessage?: string;
  isSidePanel?: boolean;
}

const WELCOME_MESSAGES: Record<LanguageCode, string> = {
  en: 'Namaste! I am AI Saathi, your official guide to Indian Government Services. Describe any requirement or problem in normal language (you can also speak via microphone in English, Hindi, Telugu, Kannada, Tamil, or any language), and I will identify the correct government authority, explain the steps, and provide official verified links.',
  hi: 'नमस्ते! मैं एआई साथी हूँ, भारतीय सरकारी सेवाओं के लिए आपका आधिकारिक मार्गदर्शक। अपनी समस्या सामान्य भाषा में बताएं (या माइक से हिंदी, अंग्रेजी, तेलुगु, कन्नड़, तमिल आदि में बोलें), मैं सही सरकारी विभाग और आधिकारिक .gov.in पोर्टल की जानकारी दूंगा।',
  te: 'నమస్కారం! నేను ఏఐ సాథిని, భారత ప్రభుత్వ సేవల కోసం మీ అధికారిక మార్గదర్శిని. మీ సమస్యను సాధారణ భాషలో చెప్పండి (లేదా మైక్రోఫోన్ ఉపయోగించి మాట్లాడండి), సరైన ప్రభుత్వ పోర్టల్ మరియు అధికారిక దశలను నేను వివరిస్తాను.',
  kn: 'ನಮಸ್ಕಾರ! ನಾನು ಎಐ ಸಾಥಿ, ಭಾರತೀಯ ಸರ್ಕಾರಿ ಸೇವೆಗಳಿಗೆ ನಿಮ್ಮ ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶಿ. ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಸಾಮಾನ್ಯ ಭಾಷೆಯಲ್ಲಿ ತಿಳಿಸಿ (ಅಥವಾ ಮೈಕ್ರೋಫೋನ್ ಮೂಲಕ ಮಾತನಾಡಿ), ನಾನು ಸರಿಯಾದ ಸರ್ಕಾರಿ ಪ್ರಾಧಿಕಾರ ಮತ್ತು ಅಧಿಕೃತ ಲಿಂಕ್‌ಗಳನ್ನು ಒದಗಿಸುತ್ತೇನೆ.',
  ta: 'வணக்கம்! நான் ஏஐ சாத்தி, இந்திய அரசு சேவைகளுக்கான உங்கள் அதிகாரப்பூர்வ வழிகாட்டி. உங்கள் தேவையை எளிய மொழியில் கூறுங்கள் (அல்லது மைக் மூலம் பேசுங்கள்), சரியான அரசு போர்டல் மற்றும் வழிகாட்டுதல்களை நான் வழங்குகிறேன்.'
};

const SUGGESTED_QUERIES_BY_LANG: Record<LanguageCode, string[]> = {
  en: [
    'There is a pothole near my house',
    'Someone scammed me online through UPI',
    'I need to download my 10th & 12th marksheets',
    'How do I apply for a new passport?',
    'How do I update address in Aadhaar?'
  ],
  hi: [
    'सड़क पर गड्ढे की शिकायत कैसे करें?',
    'यूपीआई से ऑनलाइन फ्रॉड हो गया',
    '10वीं-12वीं की मार्कशीट डिजीलॉकर से कैसे निकालें?',
    'नया पासपोर्ट कैसे बनवाएं?',
    'आधार कार्ड में पता कैसे बदलें?'
  ],
  te: [
    'రోడ్డుపై గుంత గురించి ఫిర్యాదు ఎలా చేయాలి?',
    'యూపీఐ ఆన్‌లైన్ మోసం జరిగింది (1930)',
    '10వ తరగతి మార్కుల జాబితా డౌన్‌లోడ్ చేసుకోవాలి',
    'కొత్త పాస్‌పోర్ట్ ఎలా దరఖాస్తు చేయాలి?',
    'ఆధార్‌లో చిరునామా ఎలా మార్చాలి?'
  ],
  kn: [
    'ರಸ್ತೆಯಲ್ಲಿ ಗುಂಡಿ ಬಿದ್ದಿರುವ ಬಗ್ಗೆ ದೂರು ನೀಡುವುದು ಹೇಗೆ?',
    'ಯುಪಿಐ ಆನ್‌ಲೈನ್ ವಂಚನೆ ನಡೆದಿದೆ (1930)',
    '10 ಮತ್ತು 12 ನೇ ತರಗತಿ ಅಂಕಪಟ್ಟಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಕು',
    'ಹೊಸ ಪಾಸ್‌ಪೋರ್ಟ್‌ಗೆ ಹೇಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು?',
    'ಆಧಾರ್ ಕಾರ್ಡ್‌ನಲ್ಲಿ ವಿಳಾಸ ಬದಲಾಯಿಸುವುದು ಹೇಗೆ?'
  ],
  ta: [
    'சாலையில் குழி உள்ளதை புகார் செய்வது எப்படி?',
    'யுபிஐ மூலம் இணையதள பண மோசடி நடந்தது (1930)',
    '10 மற்றும் 12 ஆம் வகுப்பு மதிப்பெண் சான்றிதழ் பெற வேண்டும்',
    'புதிய பாஸ்போர்ட்டுக்கு விண்ணப்பிப்பது எப்படி?',
    'ஆதார் அட்டையில் முகவரி மாற்றுவது எப்படி?'
  ]
};

export const AIChatInterface: React.FC<AIChatInterfaceProps> = ({ initialMessage = '', isSidePanel = false }) => {
  const { state: userState, district: userDistrict } = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const getJurisdictionLabel = (jurisdiction?: string) => {
    if (!jurisdiction) return t('jurisdiction_central');
    const jur = jurisdiction.toUpperCase();
    if (jur.includes('CENTRAL')) return t('jurisdiction_central');
    if (jur.includes('STATE')) return t('jurisdiction_state');
    if (jur.includes('MUNICIPAL') || jur.includes('LOCAL')) return t('jurisdiction_municipal');
    if (jur.includes('DISTRICT')) return t('jurisdiction_district');
    if (jur.includes('PANCHAYAT')) return t('jurisdiction_panchayat');
    return `${jurisdiction} Authority`;
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en,
      created_at: new Date().toISOString()
    }
  ]);

  const [input, setInput] = useState(initialMessage);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Update welcome message if user changes language and no conversation started yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: WELCOME_MESSAGES[language] || WELCOME_MESSAGES.en,
          created_at: new Date().toISOString()
        }
      ]);
    }
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Clean up speech recognition on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Voice Input (Speech-to-Text)
  const toggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      setTimeout(() => setSpeechError(null), 6000);
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const localeMap: Record<LanguageCode, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        ta: 'ta-IN'
      };

      recognition.lang = localeMap[language] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Voice input error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission blocked. Please allow microphone access in browser settings.');
        } else if (event.error === 'no-speech') {
          setSpeechError('No speech detected. Please try speaking into your microphone.');
        } else {
          setSpeechError(`Voice error: ${event.error}`);
        }
        setIsListening(false);
        setTimeout(() => setSpeechError(null), 5000);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setSpeechError('Could not start microphone. Please check browser permissions.');
      setTimeout(() => setSpeechError(null), 5000);
    }
  };

  // Text-to-Speech (Read Aloud)
  const handleToggleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis audio is not supported in your current browser.');
      return;
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);

    const localeMap: Record<LanguageCode, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      ta: 'ta-IN'
    };

    utterance.lang = localeMap[language] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    // Stop listening if user was talking
    if (isListening) {
      try {
        recognitionRef.current?.stop();
      } catch (e) {
        // ignore
      }
      setIsListening(false);
    }

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

  const activeLangMeta = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];
  const suggestedQueries = SUGGESTED_QUERIES_BY_LANG[language] || SUGGESTED_QUERIES_BY_LANG.en;

  return (
    <div className={`flex flex-col h-full bg-[#F8F9FA] dark:bg-slate-950 ${isSidePanel ? 'text-xs' : 'text-sm'}`}>
      
      {/* Jurisdiction Bar */}
      <div className="px-4 py-2 bg-blue-50/90 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/40 flex items-center justify-between text-xs text-[#1B365D] dark:text-blue-300">
        <div className="flex items-center gap-1.5 font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#1B365D] dark:text-blue-400" />
          <span>{t('active_jurisdiction')}: <strong>{userState}</strong></span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800">
          Strictly Fact Grounded
        </span>
      </div>

      {/* Multilingual Quick Selector Bar */}
      <div className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2 overflow-x-auto text-xs">
        <div className="flex items-center gap-1.5 text-[#1B365D] dark:text-slate-300 font-bold flex-shrink-0">
          <Globe className="w-3.5 h-3.5 text-[#1B365D] dark:text-indigo-400" />
          <span className="hidden sm:inline">AI Language:</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                language === lang.code
                  ? 'bg-[#1B365D] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>

        <span className="hidden md:inline-block text-[11px] text-slate-400 dark:text-slate-500 italic whitespace-nowrap">
          {t('responds_in_any_language')}
        </span>
      </div>

      {/* Speech Error Banner */}
      {speechError && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
          <span>{speechError}</span>
        </div>
      )}

      {/* Voice Listening Active Banner */}
      {isListening && (
        <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 border-b border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
            <span className="font-semibold">
              {t('listening_voice')} ({activeLangMeta.nativeName})...
            </span>
          </div>
          <button
            onClick={toggleVoiceInput}
            className="text-[11px] font-bold px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-800 text-rose-900 dark:text-rose-100"
          >
            {t('stop')}
          </button>
        </div>
      )}

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
              
              <div className="flex items-start justify-between gap-2">
                <p className="leading-relaxed whitespace-pre-line font-normal flex-1">
                  {msg.content}
                </p>

                {/* Read Aloud Audio Button for Assistant Messages */}
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => handleToggleSpeak(msg.content, msg.id)}
                    className={`p-1.5 rounded-lg border transition-all flex-shrink-0 ml-1 ${
                      speakingId === msg.id
                        ? 'bg-blue-100 dark:bg-blue-900 border-blue-400 text-blue-700 dark:text-blue-300 animate-pulse'
                        : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    title={speakingId === msg.id ? 'Stop listening' : 'Listen to answer (Read Aloud)'}
                  >
                    {speakingId === msg.id ? (
                      <VolumeX className="w-4 h-4 text-rose-500" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>

              {/* Structured AI Guidance Card */}
              {msg.structured_data?.service && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  
                  {/* Verified Service Banner */}
                  <div className="rounded-xl p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        {getJurisdictionLabel(msg.structured_data.jurisdiction)}
                      </span>
                      <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> {t('verified_gov')}
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
                        <span>{t('helpline_label')}: {msg.structured_data.service.official_helpline}</span>
                      </div>
                    )}
                  </div>

                  {/* Required Documents */}
                  {msg.structured_data.documents && msg.structured_data.documents.length > 0 && (
                    <div>
                      <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-1.5">
                        <FileText className="w-3.5 h-3.5" /> {t('documents_you_need')}
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
                        {t('step_by_step')}
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
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1B365D] hover:bg-[#0A2540] text-white font-bold text-xs shadow-sm transition-all"
                    >
                      <span>{t('open_official_portal')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="mt-1.5 text-[10px] text-center text-slate-400">
                      {t('safety_disclaimer')}
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
              <span>{t('consulting_db')}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts (Only if 1-2 messages) */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 border-t border-slate-200/80 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-500" /> {t('suggested_questions')} ({activeLangMeta.nativeName}):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestedQueries.map((q) => (
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

      {/* Input Form with Voice Button */}
      <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Voice Input Button */}
          <button
            type="button"
            onClick={toggleVoiceInput}
            title={isListening ? 'Stop listening' : `Speak in ${activeLangMeta.nativeName} (${activeLangMeta.label})`}
            className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
              isListening
                ? 'bg-rose-600 text-white border-rose-700 ring-4 ring-rose-500/20 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-600 dark:text-slate-300 hover:text-blue-600 border-slate-200 dark:border-slate-700'
            }`}
          >
            {isListening ? (
              <MicOff className="w-4 h-4 animate-bounce" />
            ) : (
              <Mic className="w-4 h-4" />
            )}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isListening
                ? t('listening_voice')
                : t('type_message_placeholder')
            }
            disabled={loading}
            className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-lg bg-[#1B365D] hover:bg-[#0A2540] disabled:opacity-50 text-white shadow-sm transition-colors"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
