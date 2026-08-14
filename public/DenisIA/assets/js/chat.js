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

const i18n = {
    en: {
        title: "AI Chat - D'Negócios Agency",
        login_title: "Welcome to DN",
        login_desc: "Sign in with your Google account to send messages and keep your history securely saved.",
        login_req_voice: "To use voice call, you must sign in with your Google account.",
        login_req_msg: "For a better experience based on saved chats, sign in to an account.",
        login_req_menu: "Sign in with your Google account to send messages and keep your history securely saved.",
        login_guest: "Continue as guest",
        new_chat: "New Chat",
        recent: "Recent",
        guest: "Guest",
        login: "Login",
        logout: "Logout",
        back: "Back",
        turbo_desc: "Fast responses for daily use",
        pro_desc: "More complex thoughts",
        production: "Production",
        test: "Test",
        how_can_i_help: "How can I help you?",
        explore_power: "Explore the power of the <span id='welcome-mode-label'>Turbo</span> model to scale your sales and automations.",
        sugg_1: "Paid Traffic Strategies and Ads",
        sugg_2: "Sales Automation and CRM",
        sugg_3: "SEO and Content Production",
        sugg_4: "Schedule Strategic Meeting",
        ask_something: "Ask something...",
        ai_warning: "Denis is an AI and can make mistakes.",
        voice_assistant: "Turbo Assistant",
        voice_connected: "Connected via Voice",
        voice_listening: "Listening...",
        voice_thinking: "Thinking...",
        voice_loading: "Loading voice...",
        voice_speaking: "Speaking...",
        voice_mic_error: "Microphone error",
        clear_context: "Clear Context",
        attach_file: "Attach file",
        dictate: "Dictate",
        start_voice: "Start Voice",
        end_call: "End Call",
        logout_msg: "You have signed out. Please sign in to continue.",
        share_chat: "Share chat",
        pin: "Pin",
        unpin: "Unpin",
        rename: "Rename",
        delete: "Delete",
        share_chat_title: "Share chat",
        share_chat_desc: "Copy the chat text below:",
        cancel: "Cancel",
        copy_text: "Copy Text",
        copied: "Copied!",
        copy_error: "Error copying",
        rename_chat_title: "Rename chat",
        rename_chat_placeholder: "New chat name",
        save: "Save",
        delete_chat_title: "Delete chat?",
        delete_chat_desc: "This will delete the chat",
        delete_chat_warn: "This action cannot be undone and you will not be able to recover this chat.",
        voice_not_supported: "Your browser does not support voice recognition. Use Google Chrome or Edge.",
        empty_bot_reply: "I understand. I'm sorry, the flow did not return text.",
        conn_error: "Connection error:"
    },
    pt: {
        title: "Chat de IA - D'Negócios Agency",
        login_title: "Bem-vindo à DN",
        login_desc: "Faça login com sua conta Google para enviar mensagens e manter seu histórico salvo com segurança.",
        login_req_voice: "Para utilizar a chamada de voz, você precisa fazer login com sua conta Google.",
        login_req_msg: "Para uma melhor experiência com base em chats salvos, entre numa conta.",
        login_req_menu: "Faça login com sua conta Google para enviar mensagens e manter seu histórico salvo com segurança.",
        login_guest: "Continuar como visitante",
        new_chat: "Novo Chat",
        recent: "Recentes",
        guest: "Visitante",
        login: "Login",
        logout: "Sair",
        back: "Voltar",
        turbo_desc: "Respostas rápidas para o dia a dia",
        pro_desc: "Pensamentos mais complexos",
        production: "Produção",
        test: "Teste",
        how_can_i_help: "Como posso te ajudar?",
        explore_power: "Explore o poder do modelo <span id='welcome-mode-label'>Turbo</span> para escalar suas vendas e automações.",
        sugg_1: "Estratégias de Tráfego Pago e Anúncios",
        sugg_2: "Automação de Vendas e CRM",
        sugg_3: "SEO e Produção de Conteúdo",
        sugg_4: "Agendar Reunião Estratégica",
        ask_something: "Pergunte algo...",
        ai_warning: "Denis é uma IA e pode cometer erros.",
        voice_assistant: "Assistente Turbo",
        voice_connected: "Conectado via Voz",
        voice_listening: "Ouvindo...",
        voice_thinking: "Pensando...",
        voice_loading: "Carregando voz...",
        voice_speaking: "Falando...",
        voice_mic_error: "Erro no microfone",
        clear_context: "Limpar Contexto",
        attach_file: "Anexar arquivo",
        dictate: "Ditar",
        start_voice: "Iniciar Voz",
        end_call: "Encerrar Chamada",
        logout_msg: "Você saiu. Faça login para continuar.",
        share_chat: "Compartilhar chat",
        pin: "Fixar",
        unpin: "Desafixar",
        rename: "Renomear",
        delete: "Excluir",
        share_chat_title: "Compartilhar chat",
        share_chat_desc: "Copie o texto do chat abaixo:",
        cancel: "Cancelar",
        copy_text: "Copiar Texto",
        copied: "Copiado!",
        copy_error: "Erro ao copiar",
        rename_chat_title: "Renomear chat",
        rename_chat_placeholder: "Novo nome do chat",
        save: "Salvar",
        delete_chat_title: "Excluir chat?",
        delete_chat_desc: "Isso excluirá o chat",
        delete_chat_warn: "Esta ação não pode ser desfeita e você não poderá recuperar este chat.",
        voice_not_supported: "Seu navegador não suporta reconhecimento de voz. Use o Google Chrome ou Edge.",
        empty_bot_reply: "Entendi. Desculpe-me, o fluxo não retornou texto.",
        conn_error: "Erro na conexão:"
    },
    es: {
        title: "Chat de IA - D'Negócios Agency",
        login_title: "Bienvenido a DN",
        login_desc: "Inicia sesión con tu cuenta de Google para enviar mensajes y mantener tu historial guardado de forma segura.",
        login_req_voice: "Para usar la llamada de voz, debes iniciar sesión con tu cuenta de Google.",
        login_req_msg: "Para una mejor experiencia basada en chats guardados, inicia sesión en una cuenta.",
        login_req_menu: "Inicia sesión con tu cuenta de Google para enviar mensajes y mantener tu historial guardado de forma segura.",
        login_guest: "Continuar como invitado",
        new_chat: "Nuevo Chat",
        recent: "Recientes",
        guest: "Invitado",
        login: "Iniciar sesión",
        logout: "Cerrar sesión",
        back: "Volver",
        turbo_desc: "Respuestas rápidas para el día a día",
        pro_desc: "Pensamientos más complejos",
        production: "Producción",
        test: "Prueba",
        how_can_i_help: "¿Cómo puedo ayudarte?",
        explore_power: "Explora el poder del modelo <span id='welcome-mode-label'>Turbo</span> para escalar tus ventas y automatizaciones.",
        sugg_1: "Estrategias de Tráfico Pago y Anuncios",
        sugg_2: "Automatización de Ventas y CRM",
        sugg_3: "SEO y Producción de Contenido",
        sugg_4: "Programar Reunión Estratégica",
        ask_something: "Pregunta algo...",
        ai_warning: "Denis es una IA y puede cometer errores.",
        voice_assistant: "Asistente Turbo",
        voice_connected: "Conectado por Voz",
        voice_listening: "Escuchando...",
        voice_thinking: "Pensando...",
        voice_loading: "Cargando voz...",
        voice_speaking: "Hablando...",
        voice_mic_error: "Error de micrófono",
        clear_context: "Limpiar Contexto",
        attach_file: "Adjuntar archivo",
        dictate: "Dictar",
        start_voice: "Iniciar Voz",
        end_call: "Finalizar Llamada",
        logout_msg: "Has cerrado sesión. Inicia sesión para continuar.",
        share_chat: "Compartir chat",
        pin: "Fijar",
        unpin: "Desfijar",
        rename: "Renombrar",
        delete: "Eliminar",
        share_chat_title: "Compartir chat",
        share_chat_desc: "Copia el texto del chat a continuación:",
        cancel: "Cancelar",
        copy_text: "Copiar Texto",
        copied: "¡Copiado!",
        copy_error: "Error al copiar",
        rename_chat_title: "Renombrar chat",
        rename_chat_placeholder: "Nuevo nombre del chat",
        save: "Guardar",
        delete_chat_title: "¿Eliminar chat?",
        delete_chat_desc: "Esto eliminará el chat",
        delete_chat_warn: "Esta acción no se puede deshacer y no podrás recuperar este chat.",
        voice_not_supported: "Tu navegador no admite el reconocimiento de voz. Usa Google Chrome o Edge.",
        empty_bot_reply: "Entendido. Lo siento, el flujo no devolvió texto.",
        conn_error: "Error en la conexión:"
    }
};

function updateLanguageUI(lang) {
    if (!i18n[lang]) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) {
            el.innerHTML = i18n[lang][key]; 
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[lang][key]) {
            el.setAttribute('placeholder', i18n[lang][key]);
        }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (i18n[lang][key]) {
            el.setAttribute('title', i18n[lang][key]);
        }
    });
    
    // Update active voice/mode labels
    const modeLabelEl = document.getElementById('welcome-mode-label');
    const currModeBtn = document.querySelector('.mode-option.active');
    if (modeLabelEl && currModeBtn) {
        const mode = currModeBtn.getAttribute('data-mode');
        modeLabelEl.textContent = mode === 'pro' ? 'Pro' : 'Turbo';
    }
}

    lucide.createIcons();

    const webhookUrls = {
        en: {
            prod: "https://n8n.agenciadnegocios.com/webhook/agente-gemini-inglish",
            test: "https://n8n.agenciadnegocios.com/webhook-test/agente-gemini-inglish"
        },
        pt: {
            prod: "https://n8n.agenciadnegocios.com/webhook/agente-gemini-ptbr",
            test: "https://n8n.agenciadnegocios.com/webhook-test/agente-gemini-ptbr"
        },
        es: {
            prod: "https://n8n.agenciadnegocios.com/webhook/agente-gemini-espanhol",
            test: "https://n8n.agenciadnegocios.com/webhook-test/agente-gemini-espanhol"
        }
    };

    const state = {
        isTestMode: false,
        get currentWebhookUrl() {
            return this.isTestMode ? webhookUrls[this.currentLang].test : webhookUrls[this.currentLang].prod;
        },
        sessionId: generateSessionId(),
        isWaiting: false,
        isAiSpeaking: false,
        currentLang: 'en'
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
        langDropdownBtn: document.getElementById('lang-dropdown-btn'),
        langDropdownMenu: document.getElementById('lang-dropdown-menu'),
        langLabel: document.getElementById('current-lang-label'),
        langOptions: document.querySelectorAll('#lang-dropdown-menu .mode-option'),
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
                    textEl.textContent = i18n[state.currentLang].login_req_msg;
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
        recognition.lang = state.currentLang === 'en' ? 'en-US' : (state.currentLang === 'es' ? 'es-ES' : 'pt-BR');
        recognition.continuous = false; // default for dictation
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        recognition.interimResults = !isMobile;

        recognition.onstart = () => {
            processedResultsCount = 0;
            if (currentVoiceMode === 'call') {
                el.voiceStatusText.textContent = i18n[state.currentLang].voice_listening;
                el.voiceIconWrapper.className = 'voice-status-icon listening';
                el.voiceIconWrapper.innerHTML = '<i data-lucide="mic"></i>';
                lucide.createIcons({ node: el.voiceIconWrapper });
            } else if (currentVoiceMode === 'dictation') {
                el.btnDictate.style.color = '#ef4444'; // Red to indicate recording
                el.chatInput.placeholder = i18n[state.currentLang].voice_listening;
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
                            el.voiceStatusText.textContent = i18n[state.currentLang].voice_thinking;
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
                    el.voiceStatusText.textContent = i18n[state.currentLang].voice_mic_error;
                    setTimeout(stopVoiceMode, 2000);
                }
            } else {
                el.btnDictate.style.color = '';
                el.chatInput.placeholder = i18n[state.currentLang].ask_something;
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
                    textEl.textContent = i18n[state.currentLang].login_req_voice;
                }
                loginScreen.classList.remove('hidden');
            }
            return;
        }
        if (!recognition) {
            alert(i18n[state.currentLang].voice_not_supported);
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
            alert(i18n[state.currentLang].voice_not_supported);
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
            el.voiceStatusText.textContent = i18n[state.currentLang].voice_loading;
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
                    el.voiceStatusText.textContent = i18n[state.currentLang].voice_speaking;
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
                    
                    el.voiceStatusText.textContent = i18n[state.currentLang].voice_listening;
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
        utterance.lang = state.currentLang === 'en' ? 'en-US' : (state.currentLang === 'es' ? 'es-ES' : 'pt-BR');
        
        const voices = synth.getVoices();
        
        let targetLangVoice = voices.find(v => (v.lang === utterance.lang || v.lang.startsWith(state.currentLang)) && v.name.includes('Natural'));
        if (!targetLangVoice) targetLangVoice = voices.find(v => (v.lang === utterance.lang || v.lang.startsWith(state.currentLang)) && (v.name.includes('Google') || v.name.includes('Premium')));
        if (!targetLangVoice) targetLangVoice = voices.find(v => v.lang === utterance.lang || v.lang.startsWith(state.currentLang));
        
        if (targetLangVoice) utterance.voice = targetLangVoice;
        utterance.rate = 1.08;
        utterance.pitch = 1.05;

        utterance.onstart = () => {
            if (isVoiceModeActive) {
                el.voiceStatusText.textContent = i18n[state.currentLang].voice_speaking;
                el.voiceIconWrapper.className = 'voice-status-icon speaking';
                el.voiceIconWrapper.innerHTML = '<i data-lucide="volume-2"></i>';
                lucide.createIcons({ node: el.voiceIconWrapper });
            }
        };

        utterance.onend = () => {
            state.isAiSpeaking = false;
            if (isVoiceModeActive) {
                el.voiceTranscriptText.textContent = '';
                el.voiceStatusText.textContent = i18n[state.currentLang].voice_listening;
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

    // Handle Lang Dropdown
    if (el.langDropdownBtn && el.langDropdownMenu) {
        el.langDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            el.langDropdownMenu.classList.toggle('show');
            el.langDropdownBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!el.langDropdownBtn.contains(e.target) && !el.langDropdownMenu.contains(e.target)) {
                el.langDropdownMenu.classList.remove('show');
                el.langDropdownBtn.classList.remove('active');
            }
        });

        if (el.langOptions) {
            el.langOptions.forEach(opt => {
                opt.addEventListener('click', () => {
                    el.langOptions.forEach(o => o.classList.remove('active'));
                    opt.classList.add('active');
                    
                    const lang = opt.getAttribute('data-lang');
                    state.currentLang = lang;
                    updateLanguageUI(lang);
                    renderSidebarHistory();
                    
                    let displayLang = 'EN';
                    if (lang === 'pt') displayLang = 'PT';
                    else if (lang === 'es') displayLang = 'ES';
                    
                    if (el.langLabel) el.langLabel.textContent = displayLang;
                    
                    if (recognition) {
                        recognition.lang = lang === 'en' ? 'en-US' : (lang === 'es' ? 'es-ES' : 'pt-BR');
                    }
                    
                    el.langDropdownMenu.classList.remove('show');
                    el.langDropdownBtn.classList.remove('active');
                });
            });
        }
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
                    textEl.textContent = i18n[state.currentLang].login_req_menu;
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
            
            if (userNameEl) userNameEl.textContent = 'Visitante';
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
                    textEl.textContent = i18n[state.currentLang].logout_msg;
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
                state.isTestMode = true;
                el.webhookLabel.textContent = i18n[state.currentLang].test;
                el.webhookLabel.style.color = "#f59e0b"; // Amber color
            } else {
                state.isTestMode = false;
                el.webhookLabel.textContent = i18n[state.currentLang].production;
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
                            <div class="history-opt-btn-left"><i data-lucide="share-2"></i> ${i18n[state.currentLang].share_chat}</div>
                        </button>
                        <button class="history-opt-btn btn-pin">
                            <div class="history-opt-btn-left"><i data-lucide="pin"></i> ${session.pinned ? i18n[state.currentLang].unpin : i18n[state.currentLang].pin}</div>
                        </button>
                        <button class="history-opt-btn btn-rename">
                            <div class="history-opt-btn-left"><i data-lucide="edit-2"></i> ${i18n[state.currentLang].rename}</div>
                        </button>
                        <div class="history-opt-divider"></div>
                        <button class="history-opt-btn delete btn-delete">
                            <div class="history-opt-btn-left"><i data-lucide="trash-2"></i> ${i18n[state.currentLang].delete}</div>
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
                    i18n[state.currentLang].share_chat_title,
                    `<p style="margin: 0 0 10px 0;">${i18n[state.currentLang].share_chat_desc}</p>
                     <textarea id="share-text-input" style="width: 100%; height: 150px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: var(--radius-sm); padding: 10px; font-family: inherit; font-size: 14px; resize: none; margin-top: 5px;" readonly>${chatText}</textarea>`,
                    `<button class="btn-cancel">${i18n[state.currentLang].cancel}</button>
                     <button class="btn-confirm" id="btn-copy-link">${i18n[state.currentLang].copy_text}</button>`,
                    (closeModal, bodyEl, footerEl) => {
                        const input = bodyEl.querySelector('#share-text-input');
                        input.select();
                        const copyBtn = footerEl.querySelector('#btn-copy-link');
                        copyBtn.onclick = () => {
                            navigator.clipboard.writeText(chatText).then(() => {
                                copyBtn.textContent = i18n[state.currentLang].copied;
                                copyBtn.style.background = '#10b981'; // Green
                                setTimeout(closeModal, 1000);
                            }).catch(() => {
                                alert(i18n[state.currentLang].copy_error);
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
                    i18n[state.currentLang].rename_chat_title,
                    `<input type="text" id="rename-input" value="${session.title}" placeholder="${i18n[state.currentLang].rename_chat_placeholder}">`,
                    `<button class="btn-cancel">${i18n[state.currentLang].cancel}</button>
                     <button class="btn-confirm" id="btn-save-rename">${i18n[state.currentLang].save}</button>`,
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
                    i18n[state.currentLang].delete_chat_title,
                    `<p style="margin:0;">${i18n[state.currentLang].delete_chat_desc} <strong>${session.title}</strong>.</p>
                     <p style="margin-top:10px; font-size:13px; color:var(--text-muted);">${i18n[state.currentLang].delete_chat_warn}</p>`,
                    `<button class="btn-cancel">${i18n[state.currentLang].cancel}</button>
                     <button class="btn-confirm danger" id="btn-confirm-delete">${i18n[state.currentLang].delete}</button>`,
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
            
            let systemPrompt = "";
            if (state.currentLang === 'en') systemPrompt = "Please reply in English. ";
            else if (state.currentLang === 'es') systemPrompt = "Por favor, responde en Español. ";
            else if (state.currentLang === 'pt') systemPrompt = "Por favor, responda em Português do Brasil. ";
            
            const response = await fetch(state.currentWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    chatInput: systemPrompt + text,
                    sessionId: state.sessionId,
                    sender: 'user',
                    timestamp: new Date().toISOString(),
                    aiMode: aiMode,
                    mode: aiMode,
                    language: state.currentLang,
                    metadata: {
                        aiMode: aiMode,
                        language: state.currentLang,
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
                botReply = i18n[state.currentLang].empty_bot_reply;
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
                addMessage('ai', `⚠️ **${i18n[state.currentLang].conn_error}** ${err.message}.`, true, typingBlock, true);
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
    updateLanguageUI(state.currentLang);
});
