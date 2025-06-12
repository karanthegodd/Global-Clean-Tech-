import React from 'react';

interface BotToggleButtonProps {
  onClick: () => void;
}

const BotToggleButton: React.FC<BotToggleButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: 32,
      right: 32,
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: '#4ABB2D',
      boxShadow: '0 4px 16px rgba(20,93,160,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: 'none',
      zIndex: 2000,
      cursor: 'pointer',
      transition: 'background 0.2s',
    }}
    className="bot-toggle-btn"
    aria-label="Open chatbot"
  >
    {/* Bot SVG icon */}
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="#fff"/>
      <ellipse cx="16" cy="19" rx="10" ry="8" fill="#B6F7C1"/>
      <ellipse cx="16" cy="13" rx="8" ry="7" fill="#4ABB2D"/>
      <ellipse cx="16" cy="13" rx="5" ry="4" fill="#fff"/>
      <ellipse cx="13" cy="13" rx="1" ry="1.2" fill="#222"/>
      <ellipse cx="19" cy="13" rx="1" ry="1.2" fill="#222"/>
      <path d="M14 16 Q16 18 18 16" stroke="#222" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  </button>
);

export default BotToggleButton; 