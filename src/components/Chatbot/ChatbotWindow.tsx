'use client';

import React from 'react';
import styles from './Chatbot.module.css';

interface ChatbotWindowProps {
  onClose: () => void;
}

export default function ChatbotWindow({ onClose }: ChatbotWindowProps) {
  return (
    <div className={styles.chatWindow} style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
      <div className={styles.header} style={{ padding: '10px 16px', background: '#18181b', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Denis IA
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <a href="/DenisIA/index.html" target="_blank" rel="noopener noreferrer" className={styles.iconBtn} title="Expandir IA para nova aba" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '16px', height: '16px'}}>
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </a>
          <button className={styles.iconBtn} onClick={onClose} title="Fechar">
             <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width: '16px', height: '16px'}}>
               <path d="M18 6 6 18" /><path d="m6 6 12 12" />
             </svg>
          </button>
        </div>
      </div>

      <iframe 
        src="/DenisIA/index.html?widget=true" 
        style={{
          flex: 1,
          width: '100%',
          border: 'none',
          outline: 'none',
          backgroundColor: '#000'
        }}
        title="Denis IA"
        allow="microphone"
      />
    </div>
  );
}
