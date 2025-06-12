import React from 'react';

interface WelcomeCardProps {
  onStart: () => void;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ onStart }) => {
  return (
    <div className="welcome-card" style={{
      maxWidth: 420,
      margin: '48px auto 0 auto',
      background: '#fff',
      borderRadius: 32,
      boxShadow: '0 8px 32px rgba(20, 93, 160, 0.08)',
      padding: '40px 32px 32px 32px',
      position: 'relative',
      textAlign: 'center',
    }}>
      <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', gap: 16 }}>
        <button className="icon-btn mic-btn" style={{ background: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, boxShadow: '0 2px 8px rgba(20, 93, 160, 0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#4ABB2D', cursor: 'pointer' }}>
          <i className="fas fa-microphone"></i>
        </button>
        <button className="icon-btn globe-btn" style={{ background: '#fff', border: 'none', borderRadius: '50%', width: 44, height: 44, boxShadow: '0 2px 8px rgba(20, 93, 160, 0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#145DA0', cursor: 'pointer' }}>
          <i className="fas fa-globe"></i>
        </button>
      </div>
      <div className="welcome-logo" style={{ margin: '0 auto 18px auto', width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Mascot SVG */}
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <circle cx="45" cy="45" r="45" fill="#4ABB2D"/>
          <ellipse cx="45" cy="55" rx="28" ry="22" fill="#43A726"/>
          <ellipse cx="45" cy="40" rx="22" ry="20" fill="#6EE07A"/>
          <ellipse cx="45" cy="40" rx="16" ry="14" fill="#B6F7C1"/>
          <ellipse cx="45" cy="40" rx="10" ry="9" fill="#E6FEEB"/>
          <ellipse cx="35" cy="38" rx="3" ry="3.5" fill="#222"/>
          <ellipse cx="55" cy="38" rx="3" ry="3.5" fill="#222"/>
          <path d="M40 48 Q45 52 50 48" stroke="#222" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <rect x="60" y="18" width="10" height="18" rx="5" transform="rotate(-20 60 18)" fill="#4ABB2D"/>
          <ellipse cx="65" cy="18" rx="5" ry="8" transform="rotate(-20 65 18)" fill="#6EE07A"/>
          {/* Logo on chest */}
          <circle cx="45" cy="60" r="12" fill="#fff"/>
          <text x="45" y="66" textAnchor="middle" fontSize="12" fontFamily="Inter, Arial" fill="#145DA0" fontWeight="bold">G</text>
        </svg>
      </div>
      <div className="welcome-title-main" style={{ fontSize: '2.4rem', fontWeight: 700, color: '#145DA0', marginBottom: 10, lineHeight: 1.1 }}>
        Hello,<br/>Cleantech Friend!
      </div>
      <div className="welcome-subtitle-main" style={{ fontSize: '1.1rem', color: '#5C6F81', marginBottom: 28 }}>
        Choose your path to proceed
      </div>
      <div className="welcome-buttons" style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 10 }}>
        <button className="welcome-btn business-btn" style={{ fontSize: '1.15rem', fontWeight: 600, border: 'none', borderRadius: 16, padding: '18px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', background: '#145DA0', color: '#fff', boxShadow: '0 2px 8px rgba(20, 93, 160, 0.08)' }} onClick={onStart}>
          <i className="fas fa-briefcase"></i> I'm a Business Owner
        </button>
        <button className="welcome-btn explore-btn" style={{ fontSize: '1.15rem', fontWeight: 600, border: 'none', borderRadius: 16, padding: '18px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', background: '#4ABB2D', color: '#fff', boxShadow: '0 2px 8px rgba(20, 93, 160, 0.08)' }} onClick={onStart}>
          <i className="fas fa-seedling"></i> I'm Here to Explore
        </button>
      </div>
    </div>
  );
};

export default WelcomeCard; 