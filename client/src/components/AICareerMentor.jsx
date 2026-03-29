import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AICareerMentor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { role: 'assistant', content: "Hi! I'm your AutoIntern Mentor. How can I help you accelerate your career today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isOpen]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/ai/mentor-chat`, {
        message: message,
        history: chatHistory.slice(-5) // Send last 5 messages for context
      });

      const botMessage = { role: 'assistant', content: response.data.response };
      setChatHistory(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, I'm having trouble connecting right now. Please try again later." 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-brand text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold">Career Mentor</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-wider">AI Assistant</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
            >
              {chatHistory.map((chat, i) => (
                <div 
                  key={i} 
                  className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${chat.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      chat.role === 'user' ? 'bg-indigo-100 text-brand' : 'bg-brand text-white shadow-sm'
                    }`}>
                      {chat.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      chat.role === 'user' 
                        ? 'bg-brand text-white rounded-tr-none' 
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                    }`}>
                      {chat.content}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[85%]">
                    <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-3 bg-white border border-gray-100 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-brand" />
                      <span className="text-xs text-gray-400 font-medium">Mentor is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  placeholder="Ask about internships, resumes..."
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border-gray-200 rounded-2xl focus:ring-brand focus:border-brand text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={!message.trim() || loading}
                  className="absolute right-2 p-2 bg-brand text-white rounded-xl hover:bg-brand-dark transition-all disabled:opacity-50 disabled:hover:bg-brand"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 text-center mt-2 flex items-center justify-center gap-1">
                Powered by Gemini AI <Sparkles className="h-2.5 w-2.5" />
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand text-white rounded-2xl shadow-xl shadow-brand/30 flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-brand opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? <X className="h-6 w-6 relative z-10" /> : <MessageSquare className="h-6 w-6 relative z-10" />}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
        )}
      </motion.button>
    </div>
  );
};

export default AICareerMentor;
