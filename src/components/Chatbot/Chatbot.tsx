'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import ChatbotWindow from './ChatbotWindow';
import styles from './Chatbot.module.css';

export default function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isJJMoto = pathname.startsWith("/jj-moto-pecas") || pathname.includes("jjmoto");
  const isPlatform = pathname.startsWith("/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isJJMoto || isPlatform) {
    return null;
  }

  return (
    <div className={styles.chatbotWrapper}>
      {isOpen && (
        <ChatbotWindow onClose={() => setIsOpen(false)} />
      )}
      
      {!isOpen && (
        <button 
          className={styles.floatingBtn} 
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      )}
    </div>
  );
}
