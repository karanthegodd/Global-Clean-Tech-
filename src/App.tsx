import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import WelcomeCard from './components/WelcomeCard';
import BotToggleButton from './components/BotToggleButton';

function App() {
  const [showWidget, setShowWidget] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Function to go back to welcome screen
  const goBackToWelcome = () => setShowChatbot(false);

  return (
    <>
      {/* Floating Bot Button */}
      {!showWidget && (
        <BotToggleButton onClick={() => { setShowWidget(true); setShowChatbot(false); }} />
      )}
      {/* Floating Chatbot Widget */}
      {showWidget && (
        <div
          style={{
            position: 'fixed',
            bottom: 100,
            right: 32,
            width: 400,
            maxWidth: '95vw',
            zIndex: 2000,
            borderRadius: 24,
            boxShadow: '0 8px 32px rgba(20, 93, 160, 0.18)',
            background: '#fff',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setShowWidget(false)}
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: 'rgba(92,111,129,0.08)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
            }}
            aria-label="Close chatbot"
          >
            <span style={{ fontSize: 20, color: '#5C6F81' }}>&times;</span>
          </button>
          {/* Widget Content */}
          <div style={{ padding: '32px 0 0 0', minHeight: 500 }}>
            {!showChatbot ? (
              <WelcomeCard onStart={() => setShowChatbot(true)} />
            ) : (
              <Chatbot onBackToWelcome={goBackToWelcome} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
