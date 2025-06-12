import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperAirplaneIcon, ArrowLeftIcon, FaceSmileIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

interface Message {
  id: number;
  text?: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  avatar?: string;
  imageUrl?: string;
  fileName?: string;
}

const CATEGORY_TAGS = [
  { icon: '🔆', label: 'Solar Solutions' },
  { icon: '💧', label: 'Water Tech' },
  { icon: '🏗️', label: 'Green Infrastructure' },
  { icon: '📋', label: 'List Company' },
];

const BOT_AVATAR = (
  <div style={{
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#22c55e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(34,197,94,0.10)',
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#fff"/>
      <ellipse cx="12" cy="15" rx="7" ry="5" fill="#B6F7C1"/>
      <ellipse cx="12" cy="9" rx="6" ry="5" fill="#22c55e"/>
      <ellipse cx="12" cy="9" rx="3.5" ry="3" fill="#fff"/>
      <ellipse cx="10" cy="9" rx="0.7" ry="0.9" fill="#222"/>
      <ellipse cx="14" cy="9" rx="0.7" ry="0.9" fill="#222"/>
      <path d="M11 12 Q12 13 13 12" stroke="#222" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
    </svg>
  </div>
);

// Message types
interface WelcomeMessage {
  id: number;
  type: 'welcome';
}
interface BotMessage {
  id: number;
  type: 'bot';
  text: string;
  timestamp: Date;
}
interface UserMessage {
  id: number;
  type: 'user';
  text: string;
  timestamp: Date;
}
type ChatMessage = WelcomeMessage | BotMessage | UserMessage;

interface ChatbotProps {
  onBackToWelcome?: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onBackToWelcome }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, type: 'welcome' },
    {
      id: 2,
      type: 'bot',
      text: "Hi there! 👋 I'm your AI assistant for the Global Cleantech Directory. I can help you discover sustainable technologies, find the right cleantech solutions, and connect with innovative companies.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: UserMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        message: input,
      });

      const botMessage: BotMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: response.data.response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: BotMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: "I'm sorry, I'm having trouble connecting to the server. Please try again later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIconClick = (iconName: string) => {
    console.log(`${iconName} icon clicked`);
    // Add more specific functionality here later
  };

  const handleCategoryClick = (label: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: 'user',
        text: label,
        timestamp: new Date(),
      },
      {
        id: prev.length + 2,
        type: 'bot',
        text: `You selected "${label}". (This is a placeholder response.)`,
        timestamp: new Date(),
      },
    ]);
  };

  // Show back button if the first message is not the welcome message
  const isWelcome = messages.length > 0 && messages[0].type === 'welcome';

  return (
    <div style={{
      width: '100%',
      minHeight: 500,
      display: 'flex',
      flexDirection: 'column',
      background: '#fff',
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(20, 93, 160, 0.10)',
    }}>
      {/* Header */}
      <div style={{
        background: '#22c55e',
        padding: '20px 24px 16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'relative',
      }}>
        {/* Back Button */}
        {onBackToWelcome && !isWelcome && (
          <button
            onClick={onBackToWelcome}
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.7)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 1px 4px rgba(20,93,160,0.08)',
            }}
            aria-label="Back to welcome"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L8 10.5L12.5 6" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: onBackToWelcome && !isWelcome ? 40 : 0 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#fff"/>
            <ellipse cx="12" cy="15" rx="7" ry="5" fill="#B6F7C1"/>
            <ellipse cx="12" cy="9" rx="6" ry="5" fill="#22c55e"/>
            <ellipse cx="12" cy="9" rx="3.5" ry="3" fill="#fff"/>
            <ellipse cx="10" cy="9" rx="0.7" ry="0.9" fill="#222"/>
            <ellipse cx="14" cy="9" rx="0.7" ry="0.9" fill="#222"/>
            <path d="M11 12 Q12 13 13 12" stroke="#222" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ color: '#fff', marginLeft: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 20, letterSpacing: 0.2 }}>Cleantech AI Assistant</div>
          <div style={{ fontSize: 14, opacity: 0.95, marginTop: 2 }}>Online - Ready to help</div>
        </div>
      </div>
      {/* Chat Area */}
      <div style={{ flex: 1, padding: '0 0 0 0', background: '#fff', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        {messages.map((msg) => {
          if (msg.type === 'welcome') {
            return (
              <div key={msg.id} style={{ textAlign: 'center', padding: '32px 24px 12px 24px' }}>
                <div style={{ fontWeight: 700, fontSize: 22, color: '#22c55e', marginBottom: 8 }}>Welcome to Global Cleantech Directory!</div>
                <div style={{ color: '#5C6F81', fontSize: 16, marginBottom: 20 }}>
                  I'm here to help you discover cleantech solutions, connect with innovative companies, and explore sustainable technologies worldwide.
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
                  {CATEGORY_TAGS.map((tag) => (
                    <button
                      key={tag.label}
                      onClick={() => handleCategoryClick(tag.label)}
                      style={{
                        background: '#F0F6FA',
                        color: '#145DA0',
                        border: 'none',
                        borderRadius: 20,
                        padding: '8px 18px',
                        fontWeight: 600,
                        fontSize: 15,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: '0 1px 4px rgba(20,93,160,0.04)',
                        cursor: 'pointer',
                        marginBottom: 4,
                      }}
                    >
                      <span>{tag.icon}</span> {tag.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          }
          if (msg.type === 'bot') {
            return (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, margin: '12px 24px' }}>
                {BOT_AVATAR}
                <div style={{ background: '#F0F6FA', borderRadius: 16, padding: '14px 18px', color: '#222', fontSize: 15, maxWidth: 260, boxShadow: '0 1px 4px rgba(20,93,160,0.04)' }}>
                  {msg.text}
                </div>
              </div>
            );
          }
          if (msg.type === 'user') {
            return (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, margin: '12px 24px', justifyContent: 'flex-end' }}>
                <div style={{ background: '#22c55e', color: '#fff', borderRadius: 16, padding: '14px 18px', fontSize: 15, maxWidth: 260, boxShadow: '0 1px 4px rgba(34,197,94,0.10)' }}>
                  {msg.text}
                </div>
                <div style={{ width: 40, height: 40 }} />
              </div>
            );
          }
          return null;
        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <div style={{ padding: 18, background: '#fff', borderTop: '1px solid #F0F6FA', display: 'flex', alignItems: 'center', gap: 10 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about cleantech solutions, companies, or listing your business"
          style={{
            flex: 1,
            border: '1.5px solid #22c55e',
            borderRadius: 14,
            padding: '12px 16px',
            fontSize: 15,
            outline: 'none',
            background: '#F8FFF8',
            color: '#222',
            boxShadow: '0 1px 4px rgba(34,197,94,0.04)',
          }}
          onKeyDown={e => { if (e.key === 'Enter') handleSend(e); }}
        />
        <button
          onClick={handleSend}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: '#22c55e',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(34,197,94,0.10)',
            transition: 'background 0.2s',
          }}
          aria-label="Send"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" fill="#fff" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbot; 