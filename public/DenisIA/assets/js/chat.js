// Google Login Callback
window.handleCredentialResponse = function(response) {
    function parseJwt(token) {
        return JSON.parse(atob(token.split('.')[1]));
    }
    
    const dadosUsuario = parseJwt(response.credential);
    
    window.usuarioAtual = {
        nome: dadosUsuario.name,
        email: dadosUsuario.email,
        foto: dadosUsuario.picture
    };

    console.log('Usuário logado:', window.usuarioAtual);
    
    // Hide login screen
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.classList.add('hidden');
        // Opcional: remover do DOM após a transição para não atrapalhar cliques
        setTimeout(() => loginScreen.remove(), 500);
    }
    
    // Update Sidebar Profile
    const userNameEl = document.querySelector('.user-name');
    const userAvatarEl = document.querySelector('.user-profile .avatar');
    
    if (userNameEl) {
        // Obter o primeiro nome
        userNameEl.textContent = dadosUsuario.name.split(' ')[0];
    }
    
    if (userAvatarEl) {
        userAvatarEl.innerHTML = `<img src="${dadosUsuario.picture}" alt="${dadosUsuario.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        userAvatarEl.style.background = 'transparent';
        userAvatarEl.style.border = 'none';
    }
    
    const btnLoginMenu = document.getElementById('btn-login-menu');
    const btnLogout = document.getElementById('btn-logout');
    if (btnLoginMenu) btnLoginMenu.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'flex';
    
    window.continueAsGuest = false;
    
    // Notify the app that the user logged in
    window.dispatchEvent(new Event('userLoginStateChanged'));
};

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const state = {
        webhookProdUrl: "https://n8n.agenciadnegocios.com/webhook/agente-gemini",
        webhookTestUrl: "https://n8n.agenciadnegocios.com/webhook-test/agente-gemini",
        currentWebhookUrl: "https://n8n.agenciadnegocios.com/webhook/agente-gemini",
        sessionId: generateSessionId(),
        isWaiting: false,
        isAiSpeaking: false
    };

    const el = {
        btnMobileMenu: document.getElementById('btn-mobile-menu'),
        sidebarOverlay: document.getElementById('sidebar-overlay'),
        sidebar: document.querySelector('.sidebar'),
        chatContainer: document.getElementById('chat-container'),
        messagesWrapper: document.getElementById('messages-wrapper'),
        emptyState: document.getElementById('empty-state'),
        chatInput: document.getElementById('chat-input'),
        btnSend: document.getElementById('btn-send'),
        btnCallAi: document.getElementById('btn-call-ai'),
        btnDictate: document.getElementById('btn-dictate'),
        voiceOverlay: document.getElementById('voice-overlay'),
        voiceIconWrapper: document.getElementById('voice-icon-wrapper'),
        voiceStatusText: document.getElementById('voice-status-text'),
        voiceTranscriptText: document.getElementById('voice-transcript-text'),
        btnCloseVoice: document.getElementById('btn-close-voice'),
        modeSwitch: document.getElementById('mode-switch'),
        modeBtns: document.querySelectorAll('.mode-btn'),
        modeLabel: document.getElementById('current-mode-label'),
        webhookSwitch: document.getElementById('webhook-switch'),
        webhookLabel: document.getElementById('webhook-label'),
        btnClearContext: document.getElementById('btn-clear-context'),
        suggestions: document.querySelectorAll('.suggestion-card'),
        btnNewChat: document.getElementById('btn-new-chat'),
        btnToggleSidebar: document.getElementById('btn-toggle-sidebar'),
        appContainer: document.querySelector('.app-container'),
        // Custom Modal
        modalOverlay: document.getElementById('custom-modal-overlay'),
        modalTitle: document.getElementById('custom-modal-title'),
        modalBody: document.getElementById('custom-modal-body'),
        modalFooter: document.getElementById('custom-modal-footer'),
        btnCloseModal: document.getElementById('btn-close-modal'),
        voiceModeTitle: document.getElementById('voice-mode-title')
    };
    
    window.continueAsGuest = false;
    
    const btnContinueGuest = document.getElementById('btn-continue-guest');
    if (btnContinueGuest) {
        btnContinueGuest.addEventListener('click', () => {
            window.continueAsGuest = true;
            const loginScreen = document.getElementById('login-screen');
            if (loginScreen) {
                loginScreen.classList.add('hidden');
            }
        });
    }

    // Google Login requirements
    function requireLogin() {
        if (!window.usuarioAtual && !window.continueAsGuest) {
            const loginScreen = document.getElementById('login-screen');
            if (loginScreen) {
                const textEl = loginScreen.querySelector('p');
                if (textEl) {
                    textEl.textContent = 'Para uma melhor experiência com base em chats salvos, entre numa conta.';
                }
                loginScreen.classList.remove('hidden');
            }
            return false;
        }
        return true;
    }

    // Custom Modal Function
    function showCustomModal(title, bodyHTML, footerHTML, onReady) {
        if (!el.modalOverlay) return;
        
        el.modalTitle.textContent = title;
        el.modalBody.innerHTML = bodyHTML;
        el.modalFooter.innerHTML = footerHTML;
        
        el.modalOverlay.classList.add('show');
        
        const closeModal = () => {
            el.modalOverlay.classList.remove('show');
        };
        
        el.btnCloseModal.onclick = closeModal;
        el.modalOverlay.onclick = (e) => {
            if (e.target === el.modalOverlay) closeModal();
        };
        
        if (onReady) {
            onReady(closeModal, el.modalBody, el.modalFooter);
        }
        
        const cancelBtn = el.modalFooter.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.onclick = closeModal;
        }
        
        lucide.createIcons({ node: el.modalOverlay });
    }

    // Voice State
    let recognition;
    let synth = window.speechSynthesis;
    let isVoiceModeActive = false;
    let currentVoiceMode = null; // 'call' or 'dictation'
    let silenceTimer = null;
    let processedResultsCount = 0;

    // Initialize Speech Recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false; // default for dictation
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        recognition.interimResults = !isMobile;

        recognition.onstart = () => {
            processedResultsCount = 0;
            if (currentVoiceMode === 'call') {
                el.voiceStatusText.textContent = "Listening...";
                el.voiceIconWrapper.className = 'voice-status-icon listening';
                el.voiceIconWrapper.innerHTML = '<i data-lucide="mic"></i>';
                lucide.createIcons({ node: el.voiceIconWrapper });
            } else if (currentVoiceMode === 'dictation') {
                el.btnDictate.style.color = '#ef4444'; // Red to indicate recording
                el.chatInput.placeholder = "Listening...";
            }
        };

        recognition.onresult = (event) => {
            if (currentVoiceMode === 'call' && (state.isWaiting || state.isAiSpeaking)) {
                // Ignora o que for ouvido enquanto a IA fala ou pensa
                processedResultsCount = event.results.length;
                return;
            }

            let interimTranscript = '';
            let finalTranscript = '';
            
            if (event.results.length < processedResultsCount) {
                processedResultsCount = 0;
            }
            
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (i >= processedResultsCount) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                        processedResultsCount = i + 1;
                    } else {
                        interimTranscript += event.results[i][0].transcript;
                    }
                }
            }
            
            if (currentVoiceMode === 'call') {
                const currentFinal = el.chatInput.value;
                const newTotal = (currentFinal + ' ' + finalTranscript).trim();
                
                el.voiceTranscriptText.textContent = (newTotal + ' ' + interimTranscript).trim();
                
                if (finalTranscript) {
                    el.chatInput.value = newTotal;
                    
                    clearTimeout(silenceTimer);
                    silenceTimer = setTimeout(() => {
                        if (el.chatInput.value.trim()) {
                            el.voiceStatusText.textContent = "Thinking...";
                            el.voiceIconWrapper.className = 'voice-status-icon';
                            sendMessage();
                        }
                    }, 1500);
                }
            } else if (currentVoiceMode === 'dictation' && finalTranscript) {
                el.chatInput.value += (el.chatInput.value ? ' ' : '') + finalTranscript;
                toggleSendButton();
            }
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            if (currentVoiceMode === 'call') {
                if (event.error !== 'no-speech') {
                    el.voiceStatusText.textContent = "Microphone error";
                    setTimeout(stopVoiceMode, 2000);
                }
            } else {
                el.btnDictate.style.color = '';
                el.chatInput.placeholder = "Ask something...";
                currentVoiceMode = null;
            }
        };

        recognition.onend = () => {
                if (currentVoiceMode === 'call' && isVoiceModeActive && !state.isAiSpeaking) {
                    // Keep it running continuously in call mode if it drops
                    try { recognition.start(); } catch(e) {}
                } else if (currentVoiceMode === 'dictation') {
                    el.btnDictate.style.color = '';
                    el.chatInput.placeholder = "Pergunte qualquer coisa...";
                    currentVoiceMode = null;
                }
        };
    }

    function startCallMode() {
        if (!window.usuarioAtual) {
            const loginScreen = document.getElementById('login-screen');
            if (loginScreen) {
                const textEl = loginScreen.querySelector('p');
                if (textEl) {
                    textEl.textContent = 'Para utilizar a chamada de voz, você precisa fazer login com sua conta Google.';
                }
                loginScreen.classList.remove('hidden');
            }
            return;
        }
        if (!recognition) {
            alert("Seu navegador não suporta reconhecimento de voz. Use o Google Chrome ou Edge.");
            return;
        }
        currentVoiceMode = 'call';
        isVoiceModeActive = true;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        recognition.continuous = !isMobile; // Use continuous mode on PC, false on mobile to prevent bug
        el.voiceOverlay.classList.remove('hidden');
        el.voiceTranscriptText.textContent = '';
        recognition.start();
    }

    function startDictationMode() {
        if (!requireLogin()) return;
        if (!recognition) {
            alert("Seu navegador não suporta reconhecimento de voz. Use o Google Chrome ou Edge.");
            return;
        }
        if (currentVoiceMode === 'dictation') {
            recognition.stop();
            return;
        }
        currentVoiceMode = 'dictation';
        recognition.continuous = false;
        el.chatInput.value = '';
        recognition.start();
    }

    function stopVoiceMode() {
        isVoiceModeActive = false;
        currentVoiceMode = null;
        state.isAiSpeaking = false;
        el.voiceOverlay.classList.add('hidden');
        if (recognition) recognition.stop();
        if (synth) synth.cancel();
        if (window.currentElevenLabsAudio) {
            window.currentElevenLabsAudio.pause();
            window.currentElevenLabsAudio.currentTime = 0;
            window.currentElevenLabsAudio = null;
        }
    }

    async function speakText(text) {
        if (!isVoiceModeActive) return;
        
        const plainText = text.replace(/[*_#`]/g, '').replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');

        const VOICE_ID = "Qrdut83w0Cr152Yb4Xn3";
        const API_KEY = "sk_795daa1a9535508cada76c20876672137d267f0082e08386";
        
        state.isAiSpeaking = true;
        if (recognition && currentVoiceMode === 'call') {
            try { recognition.stop(); } catch(e) {}
        }
        
        if (isVoiceModeActive) {
            el.voiceStatusText.textContent = "Loading voice...";
        }

        try {
            const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
                method: 'POST',
                headers: {
                    'xi-api-key': API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: plainText,
                    model_id: 'eleven_multilingual_v2',
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                })
            });

            if (!response.ok) throw new Error("ElevenLabs API Error");

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            window.currentElevenLabsAudio = audio;

            audio.onplay = () => {
                if (isVoiceModeActive) {
                    el.voiceStatusText.textContent = "Speaking...";
                    el.voiceIconWrapper.className = 'voice-status-icon speaking';
                    el.voiceIconWrapper.innerHTML = '<i data-lucide="volume-2"></i>';
                    lucide.createIcons({ node: el.voiceIconWrapper });
                }
            };

            audio.onended = () => {
                state.isAiSpeaking = false;
                window.currentElevenLabsAudio = null;
                if (isVoiceModeActive) {
                    el.voiceTranscriptText.textContent = '';
                    
                    el.voiceStatusText.textContent = "Listening...";
                    el.voiceIconWrapper.className = 'voice-status-icon listening';
                    el.voiceIconWrapper.innerHTML = '<i data-lucide="mic"></i>';
                    lucide.createIcons({ node: el.voiceIconWrapper });
                    
                    if (recognition && currentVoiceMode === 'call') {
                        try { recognition.start(); } catch(e) {}
                    }
                }
            };
            
            audio.onerror = () => {
                state.isAiSpeaking = false;
                window.currentElevenLabsAudio = null;
                fallbackSpeakText(plainText);
            };

            await audio.play();
        } catch (error) {
            console.error(error);
            state.isAiSpeaking = false;
            fallbackSpeakText(plainText);
        }
    }

    function fallbackSpeakText(plainText) {
        if (!synth || !isVoiceModeActive) return;
        
        const utterance = new SpeechSynthesisUtterance(plainText);
        utterance.lang = 'en-US';
        
        const voices = synth.getVoices();
        
        let enVoice = voices.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && v.name.includes('Natural'));
        if (!enVoice) enVoice = voices.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && (v.name.includes('David') || v.name.includes('Mark') || v.name.includes('Zira') || v.name.includes('Male')));
        if (!enVoice) enVoice = voices.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && (v.name.includes('Google') || v.name.includes('Premium')));
        if (!enVoice) enVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en_US' || v.lang.startsWith('en'));
        
        if (enVoice) utterance.voice = enVoice;
        utterance.rate = 1.08;
        utterance.pitch = 1.05;

        utterance.onstart = () => {
            if (isVoiceModeActive) {
                el.voiceStatusText.textContent = "Speaking...";
                el.voiceIconWrapper.className = 'voice-status-icon speaking';
                el.voiceIconWrapper.innerHTML = '<i data-lucide="volume-2"></i>';
                lucide.createIcons({ node: el.voiceIconWrapper });
            }
        };

        utterance.onend = () => {
            state.isAiSpeaking = false;
            if (isVoiceModeActive) {
                el.voiceTranscriptText.textContent = '';
                el.voiceStatusText.textContent = "Listening...";
                el.voiceIconWrapper.className = 'voice-status-icon listening';
                el.voiceIconWrapper.innerHTML = '<i data-lucide="mic"></i>';
                lucide.createIcons({ node: el.voiceIconWrapper });
                
                if (recognition && currentVoiceMode === 'call') {
                    try { recognition.start(); } catch(e) {}
                }
            }
        };

        state.isAiSpeaking = true;
        if (recognition && currentVoiceMode === 'call') {
            try { recognition.stop(); } catch(e) {}
        }
        synth.speak(utterance);
    }

    if (el.btnCallAi) el.btnCallAi.addEventListener('click', startCallMode);
    if (el.btnDictate) el.btnDictate.addEventListener('click', startDictationMode);
    if (el.btnCloseVoice) el.btnCloseVoice.addEventListener('click', stopVoiceMode);

    // Mobile Sidebar Toggle
    function toggleMobileMenu() {
        if (!el.sidebar || !el.sidebarOverlay) return;
        el.sidebar.classList.toggle('open');
        el.sidebarOverlay.classList.toggle('active');
    }

    if (el.btnMobileMenu) {
        el.btnMobileMenu.addEventListener('click', toggleMobileMenu);
    }
    


    // Auto-resize textarea
    el.chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight < 200 ? this.scrollHeight : 200) + 'px';
        toggleSendButton();
    });

    el.chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    el.btnSend.addEventListener('click', sendMessage);

    el.suggestions.forEach(card => {
        card.addEventListener('click', () => {
            const text = card.querySelector('.sugg-text').textContent;
            
            if (card.dataset.action === 'schedule') {
                if (!requireLogin()) return;
                el.chatInput.value = '';
                toggleSendButton();
                addMessage('user', text);
                
                const scheduleMsg = "Excelente! Escolha o melhor horário para conversarmos acessando minha agenda pelo botão abaixo:\n\n<a href='https://calendar.google.com/calendar/u/0/appointments/AcZssZ3xY_Wfb4A0_JcnGBHbskKmNYcezRdHepXlQCQ=' target='_blank' class='calendar-link-btn'><i data-lucide='calendar'></i> Acessar Agenda</a>";
                
                state.isWaiting = true;
                
                setTimeout(() => {
                    const typingBlock = addTypingIndicator();
                    
                    setTimeout(() => {
                        addMessage('ai', scheduleMsg, true, typingBlock, true);
                        state.isWaiting = false;
                    }, 1000);
                }, 600);
            } else {
                if (!requireLogin()) return;
                el.chatInput.value = text;
                sendMessage();
            }
        });
    });

    // Handle Mode Dropdown
    const modeDropdownBtn = document.getElementById('mode-dropdown-btn');
    const modeDropdownMenu = document.getElementById('mode-dropdown-menu');
    const modeDropdownLabel = document.getElementById('current-mode-label');
    const welcomeModeLabel = document.getElementById('welcome-mode-label');
    const modeOptions = document.querySelectorAll('.mode-option');

    if (modeDropdownBtn && modeDropdownMenu) {
        modeDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            modeDropdownMenu.classList.toggle('show');
            modeDropdownBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!modeDropdownBtn.contains(e.target) && !modeDropdownMenu.contains(e.target)) {
                modeDropdownMenu.classList.remove('show');
                modeDropdownBtn.classList.remove('active');
            }
            
            // Close history options if clicked outside
            if (!e.target.closest('.chat-item-actions') && !e.target.closest('.history-options-menu')) {
                document.querySelectorAll('.history-options-menu.show').forEach(m => {
                    m.classList.remove('show');
                    const parentItem = m.closest('.chat-item');
                    if (parentItem) parentItem.classList.remove('menu-open');
                });
            }
        });

        modeOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                modeOptions.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                
                const mode = opt.getAttribute('data-mode');
                const displayName = mode === 'pro' ? 'Pro' : 'Turbo';
                if (modeDropdownLabel) modeDropdownLabel.textContent = displayName;
                if (welcomeModeLabel) welcomeModeLabel.textContent = displayName;
                if (el.voiceModeTitle) el.voiceModeTitle.textContent = `Atendente ${displayName}`;
                
                modeDropdownMenu.classList.remove('show');
                modeDropdownBtn.classList.remove('active');
            });
        });
    }

    // Handle History Context Menus
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-history-options');
        if (btn) {
            e.stopPropagation();
            const parent = btn.closest('.chat-item');
            const menu = parent.querySelector('.history-options-menu');
            
            // Close others
            document.querySelectorAll('.history-options-menu.show').forEach(m => {
                if (m !== menu) {
                    m.classList.remove('show');
                    const parentItem = m.closest('.chat-item');
                    if (parentItem) parentItem.classList.remove('menu-open');
                }
            });
            
            // Toggle current
            if (menu) {
                menu.classList.toggle('show');
                parent.classList.toggle('menu-open', menu.classList.contains('show'));
            }
        }
    });

    // Handle User Profile Menu
    const userProfileBtn = document.getElementById('user-profile-btn');
    const userProfileMenu = document.getElementById('user-profile-menu');
    const btnLogout = document.getElementById('btn-logout');
    const btnLoginMenu = document.getElementById('btn-login-menu');

    if (userProfileBtn && userProfileMenu) {
        userProfileBtn.addEventListener('click', (e) => {
            if (e.target.closest('#btn-logout') || e.target.closest('#btn-login-menu')) return; // handled separately
            e.stopPropagation();
            userProfileMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!userProfileBtn.contains(e.target) && !userProfileMenu.contains(e.target)) {
                userProfileMenu.classList.remove('show');
            }
        });
    }

    if (btnLoginMenu) {
        btnLoginMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            userProfileMenu.classList.remove('show');
            const loginScreen = document.getElementById('login-screen');
            if (loginScreen) {
                const textEl = loginScreen.querySelector('p');
                if (textEl) {
                    textEl.textContent = 'Faça login com sua conta Google para enviar mensagens e manter seu histórico salvo com segurança.';
                }
                loginScreen.classList.remove('hidden');
            }
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.stopPropagation();
            // Logout logic
            window.usuarioAtual = null;
            window.continueAsGuest = false;
            if (window.google && google.accounts && google.accounts.id) {
                google.accounts.id.disableAutoSelect();
            }
            
            // Revert UI
            const userNameEl = document.getElementById('sidebar-user-name');
            const userAvatarEl = document.getElementById('sidebar-avatar');
            
            if (userNameEl) userNameEl.textContent = 'Guest';
            if (userAvatarEl) {
                userAvatarEl.innerHTML = '<i data-lucide="user"></i>';
                userAvatarEl.style.background = '';
                userAvatarEl.style.border = '';
                lucide.createIcons({ node: userAvatarEl });
            }
            
            if (btnLoginMenu) btnLoginMenu.style.display = 'flex';
            if (btnLogout) btnLogout.style.display = 'none';
            
            userProfileMenu.classList.remove('show');
            
            // Show login screen
            const loginScreen = document.getElementById('login-screen');
            if (loginScreen) {
                const textEl = loginScreen.querySelector('p');
                if (textEl) {
                    textEl.textContent = 'You logged out. Log in to continue.';
                }
                loginScreen.classList.remove('hidden');
            }
            
            // Notify the app that the user logged out
            window.dispatchEvent(new Event('userLoginStateChanged'));
        });
    }

    // Handle Webhook Toggle
    if (el.webhookSwitch) {
        el.webhookSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                state.currentWebhookUrl = state.webhookTestUrl;
                el.webhookLabel.textContent = "Test";
                el.webhookLabel.style.color = "#f59e0b"; // Amber color
            } else {
                state.currentWebhookUrl = state.webhookProdUrl;
                el.webhookLabel.textContent = "Production";
                el.webhookLabel.style.color = "var(--text-secondary)";
            }
        });
    }

    el.btnClearContext.addEventListener('click', () => {
        state.sessionId = generateSessionId();
        el.messagesWrapper.innerHTML = '';
        el.emptyState.style.display = 'flex';
        document.body.classList.remove('chat-active');
    });
    
    el.btnNewChat.addEventListener('click', () => {
        state.sessionId = generateSessionId();
        el.messagesWrapper.innerHTML = '';
        el.emptyState.style.display = 'flex';
        document.body.classList.remove('chat-active');
        renderSidebarHistory();
    });

    function toggleSendButton() {
        el.btnSend.disabled = el.chatInput.value.trim() === '' || state.isWaiting;
    }

    function generateSessionId() {
        return 'sess_chat_' + Math.random().toString(36).substring(2, 15);
    }

    function parseMarkdown(text) {
        return text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:2px 4px;border-radius:4px;font-family:monospace;">$1</code>');
    }

    async function typeWriterEffect(element, htmlContent) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        
        element.innerHTML = '';
        element.style.animation = 'none';

        async function typeNode(node, parent) {
            if (node.nodeType === Node.TEXT_NODE) {
                const words = node.textContent.split(/(\s+)/);
                for (const word of words) {
                    parent.appendChild(document.createTextNode(word));
                    if (word.trim() !== '') {
                        await new Promise(r => setTimeout(r, 25));
                    }
                    scrollToBottom();
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const clone = node.cloneNode(false);
                parent.appendChild(clone);
                for (const child of Array.from(node.childNodes)) {
                    await typeNode(child, clone);
                }
            }
        }
        
        for (const child of Array.from(tempDiv.childNodes)) {
            await typeNode(child, element);
        }
    }

    // History Management
    function getHistoryKey() {
        if (window.usuarioAtual && window.usuarioAtual.email) {
            return 'chatHistory_' + window.usuarioAtual.email;
        }
        return 'chatHistory_guest';
    }

    function loadHistoryFromStorage() {
        if (!window.usuarioAtual || !window.usuarioAtual.email) return [];
        return JSON.parse(localStorage.getItem(getHistoryKey()) || '[]');
    }

    function saveToStorage(history) {
        if (!window.usuarioAtual || !window.usuarioAtual.email) return;
        localStorage.setItem(getHistoryKey(), JSON.stringify(history));
    }

    function saveMessageToHistory(role, text) {
        const history = loadHistoryFromStorage();
        let session = history.find(s => s.id === state.sessionId);
        
        if (!session) {
            session = {
                id: state.sessionId,
                title: text.substring(0, 30) + (text.length > 30 ? '...' : ''),
                timestamp: Date.now(),
                messages: []
            };
            history.unshift(session);
        }
        
        session.messages.push({ role, text });
        session.timestamp = Date.now();
        history.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return b.timestamp - a.timestamp;
        });
        
        saveToStorage(history);
        renderSidebarHistory();
    }

    function renderSidebarHistory() {
        const list = document.getElementById('chat-history-list');
        if (!list) return;
        
        // Setup listener for login state changes
        if (!window._loginStateListenerAdded) {
            window.addEventListener('userLoginStateChanged', () => {
                // Generate a new session for the new user state
                state.sessionId = generateSessionId();
                el.messagesWrapper.innerHTML = '';
                el.emptyState.style.display = 'flex';
                document.body.classList.remove('chat-active');
                renderSidebarHistory();
            });
            window._loginStateListenerAdded = true;
        }
        
        const history = loadHistoryFromStorage();
        list.innerHTML = '';
        
        history.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return b.timestamp - a.timestamp;
        });

        history.forEach(session => {
            const li = document.createElement('li');
            li.className = `chat-item ${session.id === state.sessionId ? 'active' : ''}`;
            const pinIcon = session.pinned ? '<i data-lucide="pin" style="width:12px;height:12px;opacity:0.7;margin-right:4px;"></i>' : '';
            li.innerHTML = `
                <i data-lucide="message-square"></i>
                <span class="chat-title" style="flex: 1;">${pinIcon}${session.title}</span>
                <div class="chat-item-actions">
                    <button class="btn-history-options" title="Options"><i data-lucide="more-vertical"></i></button>
                    <div class="history-options-menu">
                        <button class="history-opt-btn btn-share">
                            <div class="history-opt-btn-left"><i data-lucide="share-2"></i> Share chat</div>
                        </button>
                        <button class="history-opt-btn btn-pin">
                            <div class="history-opt-btn-left"><i data-lucide="pin"></i> ${session.pinned ? 'Unpin' : 'Pin'}</div>
                        </button>
                        <button class="history-opt-btn btn-rename">
                            <div class="history-opt-btn-left"><i data-lucide="edit-2"></i> Rename</div>
                        </button>
                        <div class="history-opt-divider"></div>
                        <button class="history-opt-btn delete btn-delete">
                            <div class="history-opt-btn-left"><i data-lucide="trash-2"></i> Delete</div>
                        </button>
                    </div>
                </div>
            `;
            
            // Item click (load session)
            li.addEventListener('click', (e) => {
                if (!e.target.closest('.chat-item-actions') && !e.target.closest('.history-options-menu')) {
                    loadSession(session.id);
                }
            });

            // Menu toggle logic
            const btnOptions = li.querySelector('.btn-history-options');
            const menu = li.querySelector('.history-options-menu');
            
            btnOptions.addEventListener('click', (e) => {
                e.stopPropagation();
                // Fecha outros menus abertos
                document.querySelectorAll('.history-options-menu.show').forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('show');
                        const parentLi = m.closest('.chat-item');
                        if (parentLi) parentLi.classList.remove('menu-open');
                    }
                });
                
                const isShowing = menu.classList.toggle('show');
                if (isShowing) {
                    li.classList.add('menu-open');
                } else {
                    li.classList.remove('menu-open');
                }
            });

            // Action logic
            const btnShare = li.querySelector('.btn-share');
            btnShare.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.remove('show'); // close menu
                li.classList.remove('menu-open');
                
                const chatText = session.messages.map(m => `${m.role === 'user' ? 'You' : 'AI'}: ${m.text}`).join('\n\n');
                showCustomModal(
                    'Share chat',
                    `<p style="margin: 0 0 10px 0;">Copy the chat text below:</p>
                     <textarea id="share-text-input" style="width: 100%; height: 150px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: var(--radius-sm); padding: 10px; font-family: inherit; font-size: 14px; resize: none; margin-top: 5px;" readonly>${chatText}</textarea>`,
                    `<button class="btn-cancel">Cancel</button>
                     <button class="btn-confirm" id="btn-copy-link">Copy Text</button>`,
                    (closeModal, bodyEl, footerEl) => {
                        const input = bodyEl.querySelector('#share-text-input');
                        input.select();
                        const copyBtn = footerEl.querySelector('#btn-copy-link');
                        copyBtn.onclick = () => {
                            navigator.clipboard.writeText(chatText).then(() => {
                                copyBtn.textContent = 'Copied!';
                                copyBtn.style.background = '#10b981'; // Green
                                setTimeout(closeModal, 1000);
                            }).catch(() => {
                                alert('Error copying');
                            });
                        };
                    }
                );
            });

            const btnPin = li.querySelector('.btn-pin');
            btnPin.addEventListener('click', (e) => {
                e.stopPropagation();
                session.pinned = !session.pinned;
                saveToStorage(history);
                renderSidebarHistory();
            });

            const btnRename = li.querySelector('.btn-rename');
            btnRename.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.remove('show'); // close menu
                li.classList.remove('menu-open');
                
                showCustomModal(
                    'Rename chat',
                    `<input type="text" id="rename-input" value="${session.title}" placeholder="New chat name">`,
                    `<button class="btn-cancel">Cancel</button>
                     <button class="btn-confirm" id="btn-save-rename">Save</button>`,
                    (closeModal, bodyEl, footerEl) => {
                        const input = bodyEl.querySelector('#rename-input');
                        input.focus();
                        input.select();
                        
                        const saveRename = () => {
                            const newTitle = input.value;
                            if (newTitle && newTitle.trim()) {
                                session.title = newTitle.trim();
                                saveToStorage(history);
                                renderSidebarHistory();
                            }
                            closeModal();
                        };
                        
                        footerEl.querySelector('#btn-save-rename').onclick = saveRename;
                        input.onkeydown = (ev) => {
                            if (ev.key === 'Enter') saveRename();
                        };
                    }
                );
            });

            const btnDelete = li.querySelector('.btn-delete');
            btnDelete.addEventListener('click', (e) => {
                e.stopPropagation();
                menu.classList.remove('show'); // close menu
                li.classList.remove('menu-open');
                
                showCustomModal(
                    'Delete chat?',
                    `<p style="margin:0;">This will delete the chat <strong>${session.title}</strong>.</p>
                     <p style="margin-top:10px; font-size:13px; color:var(--text-muted);">This action cannot be undone and you won't be able to recover this chat.</p>`,
                    `<button class="btn-cancel">Cancel</button>
                     <button class="btn-confirm danger" id="btn-confirm-delete">Delete</button>`,
                    (closeModal, bodyEl, footerEl) => {
                        footerEl.querySelector('#btn-confirm-delete').onclick = () => {
                            const newHistory = history.filter(s => s.id !== session.id);
                            saveToStorage(newHistory);
                            if (state.sessionId === session.id) {
                                el.btnNewChat.click();
                            } else {
                                renderSidebarHistory();
                            }
                            closeModal();
                        };
                    }
                );
            });

            list.appendChild(li);
        });
        lucide.createIcons({ node: list });
    }

    function loadSession(sessionId) {
        if (state.sessionId === sessionId) return;
        
        const history = loadHistoryFromStorage();
        const session = history.find(s => s.id === sessionId);
        if (!session) return;
        
        state.sessionId = sessionId;
        el.messagesWrapper.innerHTML = '';
        
        if (session.messages.length === 0) {
            el.emptyState.style.display = 'flex';
            document.body.classList.remove('chat-active');
        } else {
            el.emptyState.style.display = 'none';
            document.body.classList.add('chat-active');
            session.messages.forEach(msg => {
                addMessage(msg.role, msg.text, false);
            });
        }
        renderSidebarHistory();
        
        if (window.innerWidth <= 768 && el.sidebar && el.sidebar.classList.contains('open')) {
            toggleMobileMenu();
        }
    }

    function addMessage(role, text, save = true, existingBlock = null, typewriter = false) {
        el.emptyState.style.display = 'none';
        document.body.classList.add('chat-active');
        
        let block = existingBlock;
        if (!block) {
            block = document.createElement('div');
            block.className = `message-block ${role}`;
            
            const isAI = role === 'ai';
            const icon = isAI ? 'zap' : 'user';
            const avatarHtml = isAI 
                ? `<img src="logodn%202.png" alt="DN" style="width:20px;height:20px;object-fit:contain;background:transparent;">`
                : `<i data-lucide="${icon}"></i>`;
            
            let actionButtons = '';
            if (isAI) {
                actionButtons = `
                    <div class="msg-actions">
                        <button class="msg-action-btn" title="Gostei"><i data-lucide="thumbs-up"></i></button>
                        <button class="msg-action-btn" title="Não gostei"><i data-lucide="thumbs-down"></i></button>
                        <button class="msg-action-btn" title="Copiar"><i data-lucide="copy"></i></button>
                        <button class="msg-action-btn" title="Refazer"><i data-lucide="refresh-cw"></i></button>
                    </div>
                `;
            }
            
            block.innerHTML = `
                <div class="msg-avatar ${role}">
                    ${avatarHtml}
                </div>
                <div class="${isAI ? 'msg-content-wrapper' : 'msg-content'}">
                    ${isAI ? `<div class="msg-content">${typewriter ? '' : parseMarkdown(text)}</div>` : (typewriter ? '' : parseMarkdown(text))}
                    ${actionButtons}
                </div>
            `;
            el.messagesWrapper.appendChild(block);
            
            if (typewriter) {
                const contentDiv = block.querySelector('.msg-content');
                typeWriterEffect(contentDiv, parseMarkdown(text));
            }
        } else {
            const contentDiv = block.querySelector('.msg-content');
            if (contentDiv) {
                block.classList.remove('typing-indicator-block');
                contentDiv.style.animation = 'none';
                contentDiv.offsetHeight; // force reflow
                
                if (typewriter) {
                    contentDiv.innerHTML = '';
                    typeWriterEffect(contentDiv, parseMarkdown(text));
                } else {
                    contentDiv.innerHTML = parseMarkdown(text);
                    contentDiv.style.animation = null;
                }
            }
        }
        
        lucide.createIcons({ node: block });
        scrollToBottom();

        if (save) {
            saveMessageToHistory(role, text);
        }
        
        return block;
    }

    function addTypingIndicator() {
        const block = document.createElement('div');
        block.className = `message-block ai typing-indicator-block`;
        block.innerHTML = `
            <div class="msg-avatar ai">
                <img src="logodn%202.png" alt="DN" style="width:20px;height:20px;object-fit:contain;background:transparent;">
            </div>
            <div class="msg-content">
                <div class="typing-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `;
        el.messagesWrapper.appendChild(block);
        lucide.createIcons({ node: block });
        scrollToBottom();
        return block;
    }

    function addLeadForm() {
        if (isVoiceModeActive) {
            stopVoiceMode();
        }
        
        const block = document.createElement('div');
        block.className = `message-block ai lead-form-block`;
        block.innerHTML = `
            <div class="msg-avatar ai">
                <img src="logodn%202.png" alt="DN" style="width:20px;height:20px;object-fit:contain;background:transparent;">
            </div>
            <div class="msg-content">
                <div class="lead-form-container">
                    <h4>📝 Fill in your details to continue</h4>
                    <form id="chat-lead-form">
                        <input type="text" id="lead-nome" placeholder="Your Full Name" required>
                        <input type="email" id="lead-email" placeholder="Your Email (Ex: gmail)" required>
                        <input type="tel" id="lead-whatsapp" placeholder="Your WhatsApp with code" required>
                        <button type="submit" class="lead-submit-btn">Send Details</button>
                    </form>
                </div>
            </div>
        `;
        el.messagesWrapper.appendChild(block);
        lucide.createIcons({ node: block });
        scrollToBottom();

        const form = block.querySelector('#chat-lead-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = form.querySelector('#lead-nome').value;
            const email = form.querySelector('#lead-email').value;
            const whatsapp = form.querySelector('#lead-whatsapp').value;
            
            const formattedData = `Name: ${nome}\nEmail: ${email}\nWhatsApp: ${whatsapp}`;
            
            // Remove the form visually
            block.remove();
            
            // Send the formatted data
            el.chatInput.value = formattedData;
            sendMessage();
        });
    }

    function scrollToBottom() {
        el.chatContainer.scrollTo({
            top: el.chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    async function sendMessage() {
        if (!requireLogin()) return;
        const text = el.chatInput.value.trim();
        if (!text || state.isWaiting) return;

        // Reset input
        el.chatInput.value = '';
        el.chatInput.style.height = 'auto';
        toggleSendButton();

        // Add user message
        addMessage('user', text);
        
        state.isWaiting = true;

        // Delay to allow user message animation to complete first
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Add typing indicator
        const typingBlock = addTypingIndicator();

        try {
            const activeModeOpt = document.querySelector('.mode-option.active');
            const aiMode = activeModeOpt ? activeModeOpt.getAttribute('data-mode') : 'turbo';
            
            const response = await fetch(state.currentWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    chatInput: text,
                    sessionId: state.sessionId,
                    sender: 'user',
                    timestamp: new Date().toISOString(),
                    aiMode: aiMode,
                    mode: aiMode,
                    metadata: {
                        aiMode: aiMode,
                        interface: "full-chat"
                    }
                })
            });

            if (!response.ok) {
                typingBlock.remove();
                throw new Error(`HTTP Error ${response.status}`);
            }
            
            const rawText = await response.text();
            let botReply = '';
            
            try {
                const parsed = JSON.parse(rawText);
                if (typeof parsed === 'string') {
                    botReply = parsed;
                } else if (Array.isArray(parsed) && parsed.length > 0) {
                    botReply = parsed[0].output || parsed[0].response || parsed[0].text || parsed[0].message || JSON.stringify(parsed[0]);
                } else if (parsed) {
                    botReply = parsed.output || parsed.response || parsed.text || parsed.message || JSON.stringify(parsed);
                }
            } catch (jsonErr) {
                botReply = rawText;
            }

            if (!botReply || botReply.trim() === '') {
                botReply = "Entendi. Desculpe-me, o fluxo não retornou texto.";
            }

            addMessage('ai', botReply, true, typingBlock, true);

            if (isVoiceModeActive) {
                speakText(botReply);
            }

            // Verifica se a IA solicitou os dados do lead
            const lowerReply = botReply.toLowerCase();
            const asksForName = lowerReply.includes('nome');
            const asksForEmail = lowerReply.includes('email') || lowerReply.includes('e-mail') || lowerReply.includes('gmail');
            const asksForPhone = lowerReply.includes('whatsapp') || lowerReply.includes('whats') || lowerReply.includes('telefone') || lowerReply.includes('celular') || lowerReply.includes('contato');
            
            if (asksForName && asksForEmail && asksForPhone) {
                setTimeout(addLeadForm, 600);
            }

        } catch (err) {
            // Only remove if it wasn't already updated by a successful request
            if (typingBlock.parentNode) {
                addMessage('ai', `⚠️ **Erro na conexão:** ${err.message}.`, true, typingBlock, true);
            }
        } finally {
            state.isWaiting = false;
        }
    }
    
    // Global click listener to close history menus
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.chat-item-actions')) {
            document.querySelectorAll('.history-options-menu.show').forEach(m => {
                m.classList.remove('show');
                const parentLi = m.closest('.chat-item');
                if (parentLi) parentLi.classList.remove('menu-open');
            });
        }
    });
    
    // Sidebar Toggle Logic
    if (el.btnToggleSidebar) {
        el.btnToggleSidebar.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                el.sidebar.classList.toggle('open');
                el.sidebarOverlay.classList.toggle('active');
            } else {
                el.appContainer.classList.toggle('sidebar-collapsed');
            }
        });
    }

    if (el.sidebarOverlay) {
        el.sidebarOverlay.addEventListener('click', () => {
            el.sidebar.classList.remove('open');
            el.sidebarOverlay.classList.remove('active');
        });
    }
    
    toggleSendButton();
    renderSidebarHistory();
});
