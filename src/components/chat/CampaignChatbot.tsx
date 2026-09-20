import React, { useState, useRef, useEffect } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ChatMessage } from '../../types';
import {
  MessageSquare,
  X,
  Send,
  User,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  CornerDownLeft,
  Loader2,
  Headphones
} from 'lucide-react';

const STARTER_PROMPTS = [
  "What is Engr. Daniel's 5-point legislative agenda?",
  "How can I volunteer in Khana or Gokana wards?",
  "What is the plan for clean water and Bori infrastructure?",
  "How can I donate to support the campaign?"
];

export const CampaignChatbot: React.FC = () => {
  const { config } = useCampaign();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: `Hello! Welcome to the official campaign desk for **${config.candidateName}**, candidate for the Federal House of Representatives representing **Khana/Gokana Federal Constituency, Rivers State (NNPP)**.\n\nHow can we help you today? You can ask about our legislative priorities, community projects in Bori and Gokana, volunteering, or campaign events!`,
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Call server-side Gemini API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map((m) => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const modelReply: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.text || "Thank you for your message. Together, let's build as one!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, modelReply]);
    } catch (error) {
      console.error('Chat error:', error);
      // Helpful fallback message
      const fallbackReply: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: `Thank you for your inquiry about **${config.candidateName}'s** campaign. Under our banner *"Let's Build As One"*, our top priorities are clean water remediation, agricultural cold storage in Bori, 24/7 solar healthcare, and youth innovation hubs across Khana and Gokana.\n\nPlease feel free to explore our Vision & Priorities section or reach out to our Bori Secretariat!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `Chat reset. Greetings! How can our campaign desk assist you regarding **${config.candidateName}'s** vision for Khana/Gokana Federal Constituency?`,
        timestamp: 'Just now'
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            id="campaign-helpdesk-launcher"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-emerald-500/50 hover:scale-105 active:scale-95"
            aria-label="Open Campaign Helpdesk"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-400/60 flex items-center justify-center text-white overflow-hidden">
                {config.partyLogoUrl ? (
                  <img src={config.partyLogoUrl} alt="NNPP" className="w-full h-full object-contain p-0.5 bg-white" referrerPolicy="no-referrer" />
                ) : (
                  <MessageSquare className="w-4 h-4 text-emerald-200" />
                )}
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-stone-900 animate-pulse" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">
                Campaign Helpdesk
              </span>
              <span className="text-[10px] text-emerald-100 font-medium leading-none">
                Constituency Support
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Chat Drawer / Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Campaign Helpdesk"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[85vh] bg-stone-900 rounded-2xl shadow-2xl border border-stone-700/80 flex flex-col overflow-hidden text-stone-100 animate-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-emerald-950 via-stone-900 to-stone-900 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white border border-emerald-500 p-0.5 shrink-0 shadow">
                <img
                  src={config.partyLogoUrl || '/engr-buradum-portrait.svg'}
                  alt="NNPP"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-900" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-white tracking-tight">
                    Campaign Helpdesk
                  </h3>
                </div>
                <p className="text-[11px] text-stone-400 line-clamp-1">
                  Constituency Engagement Desk • NNPP 2027
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                id="beacon-chat-reset"
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                id="beacon-chat-close"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Subheader Notice */}
          <div className="px-4 py-1.5 bg-emerald-950/40 border-b border-emerald-900/30 flex items-center justify-between text-[10px] text-emerald-300 font-medium">
            <span>Official Citizen & Voter Information Desk</span>
            <span className="text-stone-400">Khana & Gokana 2027</span>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs scrollbar-thin scrollbar-thumb-stone-700">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-emerald-900 border border-emerald-600/60 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <MessageSquare className="w-3 h-3 text-emerald-300" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-emerald-700 text-white rounded-br-none'
                        : 'bg-stone-800/90 text-stone-200 border border-stone-700/70 rounded-bl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.text}</p>
                    <span
                      className={`block mt-1 text-[9px] text-right ${
                        isUser ? 'text-emerald-200' : 'text-stone-500'
                      }`}
                    >
                      {m.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-stone-700 border border-stone-600 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-stone-300" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-emerald-900 border border-emerald-600/60 flex items-center justify-center text-white shrink-0">
                  <MessageSquare className="w-3 h-3 text-emerald-300" />
                </div>
                <div className="bg-stone-800/90 border border-stone-700/70 rounded-2xl rounded-bl-none p-3 text-stone-300 flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span className="text-[11px]">Campaign Desk is preparing response...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips (Visible when thread is short) */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-stone-800/60 bg-stone-900/60">
              <p className="text-[10px] text-stone-400 font-semibold mb-1.5 uppercase tracking-wider">
                Frequently Asked:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="text-[10px] text-left px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700/70 transition"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-stone-950 border-t border-stone-800 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              id="beacon-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about agenda, wards, volunteering..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition"
              disabled={isLoading}
            />

            <button
              id="beacon-chat-send-btn"
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-800 disabled:text-stone-600 text-white transition flex items-center justify-center shrink-0 shadow"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
