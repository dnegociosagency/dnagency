// Initialize Lucide Icons
lucide.createIcons();

// --- STATE MANAGEMENT ---
const state = {
    name: "Atendente Turbo",
    role: "Especialista em Vendas",
    welcomeMessage: "Olá! Sou o assistente de IA Turbo. 🚀\n\nEstou aqui para tirar suas dúvidas e te ajudar a escalar seu negócio. Como posso ajudar você hoje?",
    color: "#2b6f65",
    audioEnabled: true,
    sessionId: generateSessionId(),
    theme: "dark",
    webhookUrl: "https://n8n.agenciadnegocios.com/webhook/atendimento-site-denis",
    aiMode: "turbo"
};

// Audio files (Using beautiful, lightweight synthesizers via Web Audio API to prevent broken external assets!)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!state.audioEnabled) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        if (type === 'send') {
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(850, audioCtx.currentTime + 0.15);
            gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.15);
        } else if (type === 'receive') {
            osc.frequency.setValueAtTime(800, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(650, audioCtx.currentTime + 0.2);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.2);
        }
    } catch (e) {
        console.warn("Audio synthesis error:", e);
    }
}

// Generate unique session ID for n8n thread memory
function generateSessionId() {
    let id = localStorage.getItem('ia_turbo_session_id');
    if (!id) {
        id = 'sess_' + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('ia_turbo_session_id', id);
    }
    return id;
}

// --- DOM ELEMENTS ---
const el = {
    // Inputs / Config
    inputName: document.getElementById('widget-name'),
    inputRole: document.getElementById('widget-role'),
    inputWelcome: document.getElementById('widget-welcome'),
    inputMode: document.getElementById('widget-mode'),
    colorDots: document.querySelectorAll('.color-dot'),
    checkboxAudio: document.getElementById('widget-audio'),
    embedCodeBox: document.getElementById('embed-code-box'),
    btnCopyEmbed: document.getElementById('btn-copy-embed'),
    btnCopyWebhook: document.getElementById('btn-copy-webhook'),
    
    // Live Displays
    liveAgentName: document.getElementById('live-agent-name'),
    liveAgentRole: document.getElementById('live-agent-role'),
    floatAgentName: document.getElementById('float-agent-name'),
    liveWelcomeBubble: document.getElementById('live-welcome-bubble'),
    floatWelcomeBubble: document.getElementById('float-welcome-bubble'),
    headerBg: document.getElementById('widget-header-bg'),
    avatarBg: document.getElementById('widget-avatar-bg'),
    
    // Chat containers
    chatMessages: document.getElementById('chat-messages-container'),
    chatForm: document.getElementById('chat-form'),
    chatInput: document.getElementById('chat-input'),
    btnClearChat: document.getElementById('btn-clear-chat'),
    
    // Console Logs
    consoleLogs: document.getElementById('console-logs'),
    btnClearLogs: document.getElementById('btn-clear-logs'),
    
    // Scenario Buttons
    scenarioBtns: document.querySelectorAll('.scenario-btn'),
    
    // Floating Widget
    floatingTrigger: document.getElementById('floating-trigger'),
    floatingWindow: document.getElementById('floating-chat-window'),
    floatChatMessages: document.getElementById('float-chat-messages'),
    floatChatForm: document.getElementById('float-chat-form'),
    floatChatInput: document.getElementById('float-chat-input'),
    btnCloseFloat: document.getElementById('btn-close-float'),
    floatingBadge: document.getElementById('floating-badge'),
    
    // A11y Theme Widget
    a11yBtn: document.getElementById('a11y-btn'),
    sunIcon: document.querySelector('.sun-icon'),
    moonIcon: document.querySelector('.moon-icon')
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    updateEmbedCode();
    setupEventListeners();
    logConsole('system', 'Ecosistema inicializado com sucesso.');
    logConsole('system', `ID de Sessão Ativo: ${state.sessionId}`);
});

// --- HELPER FUNCTIONS ---

// Log message to the virtual console
function logConsole(type, text) {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    
    let prefix = '[SYSTEM]';
    if (type === 'request') prefix = '[→ REQUEST]';
    if (type === 'response') prefix = '[← RESPONSE]';
    if (type === 'error') prefix = '[⚠ ERROR]';
    
    line.textContent = `${time} ${prefix} ${text}`;
    el.consoleLogs.appendChild(line);
    el.consoleLogs.scrollTop = el.consoleLogs.scrollHeight;
}

// Convert markdown-like breaks to HTML breaks
function parseMessageText(text) {
    return text
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>');
}

// Re-generate embed code snippet
function updateEmbedCode() {
    const code = `<!-- Carregar Agente de IA Turbo -->
<script src="https://unpkg.com/lucide@latest"></script>
<script>
  window.IATurboConfig = {
    webhookUrl: "${state.webhookUrl}",
    name: "${state.name}",
    role: "${state.role}",
    color: "${state.color}",
    aiMode: "${state.aiMode}"
  };
</script>
<script src="https://dnturboteste.pages.dev/widget.js" defer></script>`;

    el.embedCodeBox.textContent = code;
}

// Update primary colors in stylesheet dynamically
function updatePrimaryColor(colorHex) {
    state.color = colorHex;
    document.documentElement.style.setProperty('--primary-color', colorHex);
    
    // Build transparent glow colors
    const r = parseInt(colorHex.substring(1,3), 16);
    const g = parseInt(colorHex.substring(3,5), 16);
    const b = parseInt(colorHex.substring(5,7), 16);
    document.documentElement.style.setProperty('--primary-glow', `rgba(${r}, ${g}, ${b}, 0.15)`);
    
    updateEmbedCode();
}

// --- CORE WEBHOOK FETCH ACTION ---
async function sendToWebhook(messageText, containerEl) {
    // 1. Create User bubble
    addUserBubble(messageText, containerEl);
    playSound('send');
    
    // 2. Setup typing indicator
    const typingIndicator = addTypingIndicator(containerEl);
    
    // 3. Log request
    const payload = {
        message: messageText,
        chatInput: messageText,
        sessionId: state.sessionId,
        sender: "user",
        timestamp: new Date().toISOString(),
        aiMode: state.aiMode,
        mode: state.aiMode,
        metadata: {
            widgetName: state.name,
            role: state.role,
            aiMode: state.aiMode
        }
    };
    
    logConsole('request', `POST -> ${state.webhookUrl}\nPayload: ${JSON.stringify(payload, null, 2)}`);
    
    try {
        const response = await fetch(state.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        // Remove typing indicator
        typingIndicator.remove();
        
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
        
        const responseData = await response.text();
        logConsole('response', `Status: ${response.status} OK\nResponse: ${responseData}`);
        
        // Parse the n8n response elegantly
        let botReply = '';
        try {
            const json = JSON.parse(responseData);
            // Flexible extraction pattern matching any standard n8n output structures
            if (typeof json === 'string') {
                botReply = json;
            } else if (Array.isArray(json) && json.length > 0) {
                // If it returns an array of objects
                const first = json[0];
                botReply = first.output || first.response || first.text || first.message || JSON.stringify(first);
            } else if (json) {
                botReply = json.output || json.response || json.text || json.message || JSON.stringify(json);
            }
        } catch (e) {
            // Not a JSON, treat as raw text
            botReply = responseData;
        }
        
        if (!botReply || botReply.trim() === '') {
            botReply = "Recebi sua mensagem, mas o fluxo n8n não retornou nenhuma mensagem textual. Por favor, verifique se o fluxo retorna um texto ou um JSON com os campos 'output' ou 'response'.";
        }
        
        addAssistantBubble(botReply, containerEl);
        playSound('receive');
        
    } catch (err) {
        typingIndicator.remove();
        logConsole('error', err.message);
        addAssistantBubble(`⚠️ **Erro ao conectar ao Webhook:** Não consegui contatar o fluxo n8n. Verifique se o seu webhook de teste está ativo no painel da n8n.\n\n*Detalhes do erro:* \`${err.message}\``, containerEl);
        playSound('receive');
    }
}

// --- DOM BUBBLE CREATORS ---

function addUserBubble(text, containerEl) {
    const row = document.createElement('div');
    row.className = 'message-row user';
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    row.innerHTML = `
        <div class="message-avatar">
            <i data-lucide="user"></i>
        </div>
        <div class="message-bubble-wrapper">
            <div class="message-bubble">${parseMessageText(text)}</div>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    containerEl.appendChild(row);
    lucide.createIcons({ node: row });
    containerEl.scrollTop = containerEl.scrollHeight;
}

function addAssistantBubble(text, containerEl) {
    const row = document.createElement('div');
    row.className = 'message-row assistant';
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    row.innerHTML = `
        <div class="message-avatar" style="background-color: var(--primary-color); color: #ffffff;">
            <i data-lucide="bot"></i>
        </div>
        <div class="message-bubble-wrapper">
            <div class="message-bubble">${parseMessageText(text)}</div>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    containerEl.appendChild(row);
    lucide.createIcons({ node: row });
    containerEl.scrollTop = containerEl.scrollHeight;
}

function addTypingIndicator(containerEl) {
    const row = document.createElement('div');
    row.className = 'message-row assistant typing-indicator-row';
    
    row.innerHTML = `
        <div class="message-avatar" style="background-color: var(--primary-color); color: #ffffff;">
            <i data-lucide="bot"></i>
        </div>
        <div class="message-bubble-wrapper">
            <div class="message-bubble typing-bubble">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        </div>
    `;
    
    containerEl.appendChild(row);
    lucide.createIcons({ node: row });
    containerEl.scrollTop = containerEl.scrollHeight;
    return row;
}

// --- EVENTS BINDING ---
function setupEventListeners() {
    // 1. Live Inputs updates
    el.inputName.addEventListener('input', (e) => {
        const val = e.target.value.trim() || 'Atendente Turbo';
        state.name = val;
        el.liveAgentName.textContent = val;
        el.floatAgentName.textContent = val;
        updateEmbedCode();
    });

    el.inputRole.addEventListener('input', (e) => {
        const val = e.target.value.trim() || 'Especialista em Vendas';
        state.role = val;
        el.liveAgentRole.textContent = val;
        updateEmbedCode();
    });

    el.inputWelcome.addEventListener('input', (e) => {
        const val = e.target.value || '';
        state.welcomeMessage = val;
        el.liveWelcomeBubble.innerHTML = parseMessageText(val);
        el.floatWelcomeBubble.innerHTML = parseMessageText(val);
    });

    if (el.inputMode) {
        el.inputMode.addEventListener('change', (e) => {
            state.aiMode = e.target.value;
            updateEmbedCode();
            logConsole('system', `Modo da IA alterado para: ${state.aiMode.toUpperCase()}`);
        });
    }

    // Color Pickers
    el.colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            el.colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            const color = dot.getAttribute('data-color');
            updatePrimaryColor(color);
        });
    });

    // Sound toggle
    el.checkboxAudio.addEventListener('change', (e) => {
        state.audioEnabled = e.target.checked;
        logConsole('system', `Efeitos sonoros ${state.audioEnabled ? 'ativados' : 'desativados'}.`);
    });

    // Copy Webhook
    el.btnCopyWebhook.addEventListener('click', () => {
        navigator.clipboard.writeText(state.webhookUrl).then(() => {
            logConsole('system', 'URL do webhook copiada para a área de transferência.');
            
            // Visual feedback on icon
            const icon = el.btnCopyWebhook.querySelector('i');
            icon.setAttribute('data-lucide', 'check');
            lucide.createIcons({ node: el.btnCopyWebhook });
            setTimeout(() => {
                icon.setAttribute('data-lucide', 'copy');
                lucide.createIcons({ node: el.btnCopyWebhook });
            }, 1500);
        });
    });

    // Copy Embed Code
    el.btnCopyEmbed.addEventListener('click', () => {
        navigator.clipboard.writeText(el.embedCodeBox.textContent).then(() => {
            logConsole('system', 'Código de incorporação HTML copiado para o seu site.');
            
            const btnSpan = el.btnCopyEmbed.querySelector('span');
            const btnIcon = el.btnCopyEmbed.querySelector('i');
            
            btnSpan.textContent = 'Copiado com Sucesso!';
            btnIcon.setAttribute('data-lucide', 'check');
            lucide.createIcons({ node: el.btnCopyEmbed });
            
            setTimeout(() => {
                btnSpan.textContent = 'Copiar Código HTML';
                btnIcon.setAttribute('data-lucide', 'clipboard');
                lucide.createIcons({ node: el.btnCopyEmbed });
            }, 2000);
        });
    });

    // Clear logs
    el.btnClearLogs.addEventListener('click', () => {
        el.consoleLogs.innerHTML = '';
        logConsole('system', 'Console limpo.');
    });

    // Clear simulator chat
    el.btnClearChat.addEventListener('click', () => {
        // Reset to original welcome message
        el.chatMessages.innerHTML = `
            <div class="message-row assistant">
                <div class="message-avatar" style="background-color: var(--primary-color); color: #ffffff;">
                    <i data-lucide="bot"></i>
                </div>
                <div class="message-bubble-wrapper">
                    <div class="message-bubble" id="live-welcome-bubble">
                        ${parseMessageText(state.welcomeMessage)}
                    </div>
                    <span class="message-time">Agora mesmo</span>
                </div>
            </div>
            
            <div class="message-row assistant">
                <div class="message-avatar">
                    <i data-lucide="bot"></i>
                </div>
                <div class="message-bubble-wrapper">
                    <div class="message-bubble info-bubble">
                        <i data-lucide="info" class="inline-icon"></i>
                        <span><strong>Dica de Desenvolvedor:</strong> Este chat está conectado em tempo real com seu webhook de teste da n8n. Toda mensagem enviada gerará uma requisição real.</span>
                    </div>
                    <span class="message-time">Dica do Sistema</span>
                </div>
            </div>
        `;
        lucide.createIcons({ node: el.chatMessages });
        logConsole('system', 'Chat limpado.');
    });

    // Scenario Triggers
    el.scenarioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const message = btn.getAttribute('data-message');
            el.chatInput.value = message;
            // Focus and trigger submit
            el.chatInput.focus();
            el.chatForm.dispatchEvent(new Event('submit'));
        });
    });

    // Embedded Chat Submission
    el.chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = el.chatInput.value.trim();
        if (!text) return;
        
        el.chatInput.value = '';
        sendToWebhook(text, el.chatMessages);
    });

    // Floating Chat Toggle
    el.floatingTrigger.addEventListener('click', () => {
        const isOpen = el.floatingWindow.classList.toggle('show');
        
        // Hide badge if opening
        if (isOpen) {
            el.floatingBadge.style.display = 'none';
            // Show close icon
            el.floatingTrigger.querySelector('.chat-open-icon').style.display = 'none';
            el.floatingTrigger.querySelector('.chat-close-icon').style.display = 'block';
            el.floatChatInput.focus();
        } else {
            // Show open icon
            el.floatingTrigger.querySelector('.chat-open-icon').style.display = 'block';
            el.floatingTrigger.querySelector('.chat-close-icon').style.display = 'none';
        }
    });

    el.btnCloseFloat.addEventListener('click', () => {
        el.floatingWindow.classList.remove('show');
        el.floatingTrigger.querySelector('.chat-open-icon').style.display = 'block';
        el.floatingTrigger.querySelector('.chat-close-icon').style.display = 'none';
    });

    // Floating Chat Submit
    el.floatChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = el.floatChatInput.value.trim();
        if (!text) return;
        
        el.floatChatInput.value = '';
        sendToWebhook(text, el.floatChatMessages);
    });

    // Accessibility Theme Toggler
    el.a11yBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', nextTheme);
        state.theme = nextTheme;
        
        if (nextTheme === 'light') {
            el.sunIcon.style.display = 'none';
            el.moonIcon.style.display = 'block';
            logConsole('system', 'Tema claro ativado.');
        } else {
            el.sunIcon.style.display = 'block';
            el.moonIcon.style.display = 'none';
            logConsole('system', 'Tema escuro ativado.');
        }
    });
}
