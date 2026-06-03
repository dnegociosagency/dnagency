'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';

interface Message {
  html: string;
  sender: 'user' | 'bot';
}

interface Session {
  id: number;
  title: string;
  date: string;
  messages: Message[];
}

interface ChatbotWindowProps {
  onClose: () => void;
}

export default function ChatbotWindow({ onClose }: ChatbotWindowProps) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentModel, setCurrentModel] = useState<'turbo' | 'pro'>('turbo');
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeCommand, setActiveCommand] = useState<{ cmd: string; label: string } | null>(null);

  const chatBoxRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  // Inicialização de estado do LocalStorage
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('dn_chat_sessions') || '[]');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSessions(savedSessions);

    let savedUserId = localStorage.getItem('dn_user_id');
    if (!savedUserId) {
      savedUserId = 'User-' + Date.now() + '-' + Math.random().toString(36).substring(2, 11);
      localStorage.setItem('dn_user_id', savedUserId);
    }
    setUserId(savedUserId);
  }, []);

  // Rolagem automática para o fim
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const saveMessageToSession = (html: string, sender: 'user' | 'bot', sessionIdToUse: number) => {
    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id === sessionIdToUse) {
          return { ...s, messages: [...s.messages, { html, sender }] };
        }
        return s;
      });
      localStorage.setItem('dn_chat_sessions', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSendMessage = async () => {
    let text = input.trim();
    if (activeCommand) {
      text = activeCommand.cmd + (text.length > 0 ? ' ' + text : '');
    }

    if (!text) return;

    if (text.toLowerCase() === '/limpar' || text.toLowerCase() === '/resetar') {
      localStorage.removeItem('dn_chat_sessions');
      localStorage.removeItem('dn_user_id');
      window.location.reload();
      return;
    }

    let activeSessionId = currentSessionId;
    if (!activeSessionId) {
      activeSessionId = Date.now();
      setCurrentSessionId(activeSessionId);
      const newSession: Session = {
        id: activeSessionId,
        title: text.substring(0, 30) + (text.length > 30 ? '...' : ''),
        date: new Date().toLocaleString('pt-BR'),
        messages: [{ html: "Olá! Tudo bem? Eu sou o Denis, assistente virtual da Agência D' Negócios. Como posso ajudar você a impulsionar seu negócio hoje?", sender: 'bot' }]
      };
      setSessions((prev) => {
        const updated = [...prev, newSession];
        localStorage.setItem('dn_chat_sessions', JSON.stringify(updated));
        return updated;
      });
      setMessages(newSession.messages);
    }

    // Adiciona a mensagem do usuário na tela
    const userMsg = text;
    setMessages((prev) => [...prev, { html: userMsg, sender: 'user' }]);
    saveMessageToSession(userMsg, 'user', activeSessionId);

    setInput('');
    setActiveCommand(null);
    setIsTyping(true);

    try {
      const systemPrompt = currentModel === 'turbo' 
        ? "Você é o Denis Turbo. Responda da forma mais RÁPIDA, DIRETA e CURTA possível. Sem enrolação. Foque na eficiência." 
        : "Você é o Denis Pro. Atue como um consultor sênior. Pense passo a passo, forneça detalhes, análises profundas e resolva problemas complexos de forma completa.";
      
      const temperature = currentModel === 'turbo' ? 0.3 : 0.8;

      const response = await fetch('https://n8n.agenciadnegocios.com/webhook/atendimento-site-teste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg,
          phone: userId,
          sessionId: 'Session-' + activeSessionId,
          model: currentModel,
          system_prompt: systemPrompt,
          temperature: temperature
        })
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.text) {
        const cleanText = data.text.replace("HANDOFF_AGORA", "Perfeito! O Denis já foi notificado e entrará em contato com você em breve.");
        const htmlMsg = cleanText.replace(/\n/g, '<br>');
        setMessages((prev) => [...prev, { html: htmlMsg, sender: 'bot' }]);
        saveMessageToSession(htmlMsg, 'bot', activeSessionId);
      }
    } catch {
      setIsTyping(false);
      const errorMsg = 'Ops! Tivemos um problema de conexão. Tente novamente em instantes.';
      setMessages((prev) => [...prev, { html: errorMsg, sender: 'bot' }]);
      saveMessageToSession(errorMsg, 'bot', activeSessionId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
          const recognition = new SpeechRecognition();
          recognition.lang = 'pt-BR';
          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.onstart = () => setIsRecording(true);
          recognition.onend = () => setIsRecording(false);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput((prev) => prev + (prev ? ' ' : '') + transcript);
          };
          recognitionRef.current = recognition;
        } catch (e) {
          console.error("[ChatbotWindow] Erro ao inicializar SpeechRecognition:", e);
          alert("Não foi possível acessar o microfone ou o reconhecimento de voz foi bloqueado pelo navegador.");
          return;
        }
      } else {
        alert("Seu navegador não suporta reconhecimento de voz.");
        return;
      }
    }

    if (recognitionRef.current) {
      if (isRecording) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          console.error("[ChatbotWindow] Erro ao parar SpeechRecognition:", e);
        }
      } else {
        try {
          recognitionRef.current.start();
        } catch (e) {
          console.error("[ChatbotWindow] Erro ao iniciar SpeechRecognition:", e);
          alert("Não foi possível iniciar o reconhecimento de voz. Verifique as permissões de microfone.");
        }
      }
    }
  };

  const startNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setInput('');
    setActiveCommand(null);
  };

  const loadSession = (session: Session) => {
    setCurrentSessionId(session.id);
    setMessages(session.messages);
    setIsHistoryOpen(false);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.backgroundContainer}>
        <div className={`${styles.blob} ${styles.blob1}`}></div>
        <div className={`${styles.blob} ${styles.blob2}`}></div>
      </div>

      <div className={styles.header}>
        <div className={styles.headerActions}>
          <button className={styles.iconBtn} onClick={startNewChat} title="Nova Conversa">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14" /><path d="M5 12h14" />
            </svg>
          </button>
          <button className={styles.iconBtn} onClick={() => setIsHistoryOpen(true)} title="Histórico">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" /><path d="M12 7v5l4 2" />
            </svg>
          </button>
        </div>
        <button className={styles.iconBtn} onClick={onClose} title="Fechar">
           <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <path d="M18 6 6 18" /><path d="m6 6 12 12" />
           </svg>
        </button>
      </div>

      {messages.length === 0 ? (
        <div className={styles.heroSection}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://agenciadnegocios.com/wp-content/uploads/2025/12/logodn-1-scaled.png" alt="Logo Agência D' Negócios" className={styles.logo} />
          <h1 className={styles.heroTitle}>Como posso ajudar você a impulsionar seu negócio hoje?</h1>
          <p className={styles.heroSubtitle}>Escreva uma mensagem ou escolha uma opção abaixo</p>
          <div className={styles.suggestionsContainer}>
            {[
              { cmd: '/consultoria', label: 'Consultoria' },
              { cmd: '/marketing', label: 'Marketing' },
              { cmd: '/vendas', label: 'Vendas' },
              { cmd: '/suporte', label: 'Suporte' }
            ].map(s => (
              <button key={s.cmd} className={styles.suggestionBtn} onClick={() => setActiveCommand(s)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.chatBox} ref={chatBoxRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`${styles.msg} ${msg.sender === 'user' ? styles.msgUser : styles.msgBot}`} dangerouslySetInnerHTML={{ __html: msg.html }}></div>
          ))}
          {isTyping && (
            <div className={styles.typingIndicator}>
              <div className={styles.typingAvatar}>DN</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-soft)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                Denis está digitando
                <div className={styles.dots}>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                  <div className={styles.dot}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.inputWrapper}>
        <div className={styles.inputContainer}>
          {activeCommand && (
            <div className={styles.commandChipContainer}>
              <div className={styles.commandChip}>
                {activeCommand.label}
                <button className={styles.chipClose} onClick={() => setActiveCommand(null)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
          )}
          
          <div className={styles.textareaWrapper}>
            <textarea 
              className={styles.textarea} 
              placeholder="Escreva aqui..." 
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className={styles.inputActions}>
            <div className={styles.actionsLeft}>
              <button className={`${styles.micBtn} ${isRecording ? styles.recording : ''}`} onClick={toggleMic} title="Gravar áudio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </button>

              <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.1)', margin: '0 4px' }}></div>

              <div className={styles.modelSelector}>
                <button className={styles.modelToggle} onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}>
                  {currentModel === 'turbo' ? 'Denis Turbo' : 'Denis Pro'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '12px', height: '12px', transform: isModelMenuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                <div className={`${styles.modelMenu} ${isModelMenuOpen ? styles.open : ''}`}>
                  <div className={`${styles.modelOption} ${currentModel === 'turbo' ? styles.active : ''}`} onClick={() => { setCurrentModel('turbo'); setIsModelMenuOpen(false); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    Denis Turbo
                  </div>
                  <div className={`${styles.modelOption} ${currentModel === 'pro' ? styles.active : ''}`} onClick={() => { setCurrentModel('pro'); setIsModelMenuOpen(false); }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '16px', height: '16px' }}>
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                    Denis Pro
                  </div>
                </div>
              </div>
            </div>

            <button className={`${styles.sendBtn} ${input.trim() || activeCommand ? styles.active : ''}`} onClick={handleSendMessage} disabled={!input.trim() && !activeCommand}>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
               </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.modalOverlay} ${isHistoryOpen ? styles.active : ''}`} onClick={() => setIsHistoryOpen(false)}>
        <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h2>Histórico de Conversas</h2>
            <button className={styles.iconBtn} onClick={() => setIsHistoryOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className={styles.historyList}>
            {sessions.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '24px 0' }}>Nenhum histórico encontrado.</div>
            ) : (
              [...sessions].sort((a, b) => b.id - a.id).map(s => (
                <div key={s.id} className={styles.historyItem} onClick={() => loadSession(s)}>
                  <div className={styles.historyTitle}>{s.title}</div>
                  <div className={styles.historyDate}>{s.date}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
