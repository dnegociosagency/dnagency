/**
 * AGENTE DE IA TURBO - EMBED WIDGET CODE
 * Fully self-contained embeddable website chatbot bubble.
 * Integrates directly with n8n webhooks.
 */
(function() {
    // 1. Fetch user configuration
    const config = window.IATurboConfig || {
        webhookUrl: "https://n8n.agenciadnegocios.com/webhook/atendimento-site-denis",
        name: "Atendente Turbo",
        role: "Especialista em Vendas",
        color: "#2b6f65",
        aiMode: "turbo"
    };

    // 2. Generate a unique session ID for conversation memory
    function getSessionId() {
        let id = localStorage.getItem('ia_turbo_widget_session');
        if (!id) {
            id = 'sess_w_' + Math.random().toString(36).substring(2, 15);
            localStorage.setItem('ia_turbo_widget_session', id);
        }
        return id;
    }
    const sessionId = getSessionId();

    // 3. Inject CSS Styles directly to avoid separate stylesheet downloads
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --ia-primary: ${config.color};
            --ia-primary-rgb: ${hexToRgb(config.color)};
        }
        
        .ia-widget-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        .ia-widget-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #ef4444;
            color: white;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            font-size: 10px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
            z-index: 2;
        }

        .ia-widget-trigger {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: var(--ia-primary);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ia-widget-trigger:hover {
            transform: scale(1.08);
            filter: brightness(1.1);
        }

        .ia-widget-trigger:active {
            transform: scale(0.95);
        }

        .ia-widget-window {
            position: absolute;
            bottom: 74px;
            right: 0;
            width: 360px;
            height: 480px;
            background: #18181b;
            color: #f4f4f5;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: scale(0.85) translateY(30px);
            opacity: 0;
            pointer-events: none;
            transform-origin: bottom right;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ia-widget-window.show {
            transform: scale(1) translateY(0);
            opacity: 1;
            pointer-events: auto;
        }

        .ia-widget-header {
            background: #09090b;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding: 14px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .ia-widget-agent {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .ia-widget-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: var(--ia-primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
        }

        .ia-widget-online {
            position: absolute;
            width: 8px;
            height: 8px;
            background: #10b981;
            border-radius: 50%;
            border: 2px solid #09090b;
            bottom: 0;
            right: 0;
        }

        .ia-widget-meta h4 {
            margin: 0;
            font-size: 14px;
            font-weight: 700;
        }

        .ia-widget-meta span {
            font-size: 10px;
            color: #10b981;
            font-weight: 500;
            display: block;
            margin-top: 1px;
        }

        .ia-widget-close {
            background: none;
            border: none;
            color: #71717a;
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .ia-widget-close:hover {
            color: #f4f4f5;
        }

        .ia-widget-body {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 14px;
            background: rgba(0, 0, 0, 0.15);
        }

        .ia-msg-row {
            display: flex;
            gap: 10px;
            max-width: 85%;
            animation: iaSlideIn 0.3s ease-out;
        }

        .ia-msg-row.assistant {
            align-self: flex-start;
        }

        .ia-msg-row.user {
            align-self: flex-end;
            flex-direction: row-reverse;
        }

        .ia-msg-bubble {
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 13px;
            line-height: 1.5;
            word-break: break-word;
        }

        .ia-msg-row.assistant .ia-msg-bubble {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top-left-radius: 2px;
        }

        .ia-msg-row.user .ia-msg-bubble {
            background: var(--ia-primary);
            color: white;
            border-top-right-radius: 2px;
            box-shadow: 0 4px 10px rgba(var(--ia-primary-rgb), 0.2);
        }

        .ia-widget-footer {
            padding: 12px 16px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            background: #09090b;
            display: flex;
            gap: 10px;
            align-items: center;
        }

        .ia-widget-footer input {
            flex: 1;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 100px;
            padding: 8px 14px;
            color: #f4f4f5;
            font-size: 13px;
            transition: all 0.2s ease;
        }

        .ia-widget-footer input:focus {
            outline: none;
            border-color: var(--ia-primary);
        }

        .ia-widget-send {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: var(--ia-primary);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .ia-widget-send:hover {
            transform: scale(1.05);
        }

        .ia-typing-dot {
            width: 5px;
            height: 5px;
            background: #a1a1aa;
            border-radius: 50%;
            display: inline-block;
            margin: 0 2px;
            animation: iaBounce 1.4s infinite ease-in-out both;
        }
        
        .ia-typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .ia-typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes iaBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }

        @keyframes iaSlideIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
            .ia-widget-container {
                bottom: 16px;
                right: 16px;
            }
            .ia-widget-window {
                width: calc(100vw - 32px);
                height: 440px;
            }
        }
    `;
    document.head.appendChild(style);

    // 4. Create DOM elements
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'ia-widget-container';

    widgetContainer.innerHTML = `
        <span class="ia-widget-badge" id="ia-badge">1</span>
        <button class="ia-widget-trigger" id="ia-trigger" aria-label="Abrir Chat">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ia-open-svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ia-close-svg" style="display:none;"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        <div class="ia-widget-window" id="ia-window">
            <div class="ia-widget-header">
                <div class="ia-widget-agent">
                    <div class="ia-widget-avatar">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                        <span class="ia-widget-online"></span>
                    </div>
                    <div class="ia-widget-meta">
                        <h4>${config.name}</h4>
                        <span>${config.role} • Online</span>
                    </div>
                </div>
                <button class="ia-widget-close" id="ia-close" aria-label="Minimizar">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
            
            <div class="ia-widget-body" id="ia-messages">
                <div class="ia-msg-row assistant">
                    <div class="ia-msg-bubble">
                        Olá! Sou o assistente de IA. Como posso ajudar você hoje? 🚀
                    </div>
                </div>
            </div>

            <form class="ia-widget-footer" id="ia-form">
                <input type="text" id="ia-input" placeholder="Digite sua dúvida..." autocomplete="off" required>
                <button type="submit" class="ia-widget-send" aria-label="Enviar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
            </form>
        </div>
    `;

    document.body.appendChild(widgetContainer);

    // 5. Setup interaction event handlers
    const elTrigger = document.getElementById('ia-trigger');
    const elBadge = document.getElementById('ia-badge');
    const elWindow = document.getElementById('ia-window');
    const elClose = document.getElementById('ia-close');
    const elMessages = document.getElementById('ia-messages');
    const elForm = document.getElementById('ia-form');
    const elInput = document.getElementById('ia-input');
    
    const svgOpen = elTrigger.querySelector('.ia-open-svg');
    const svgClose = elTrigger.querySelector('.ia-close-svg');

    elTrigger.addEventListener('click', () => {
        const isShow = elWindow.classList.toggle('show');
        if (isShow) {
            elBadge.style.display = 'none';
            svgOpen.style.display = 'none';
            svgClose.style.display = 'block';
            elInput.focus();
        } else {
            svgOpen.style.display = 'block';
            svgClose.style.display = 'none';
        }
    });

    elClose.addEventListener('click', () => {
        elWindow.classList.remove('show');
        svgOpen.style.display = 'block';
        svgClose.style.display = 'none';
    });

    elForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = elInput.value.trim();
        if (!msg) return;

        elInput.value = '';
        
        // Add User Bubble
        appendBubble('user', msg);
        
        // Add Typing Indicator
        const typingIndicator = appendTypingIndicator();
        
        try {
            const response = await fetch(config.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: msg,
                    chatInput: msg,
                    sessionId: sessionId,
                    sender: 'user',
                    timestamp: new Date().toISOString(),
                    aiMode: config.aiMode,
                    mode: config.aiMode,
                    metadata: {
                        aiMode: config.aiMode
                    }
                })
            });

            typingIndicator.remove();

            if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
            
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
                botReply = "Entendi. Desculpe-me, o fluxo n8n não retornou texto.";
            }

            appendBubble('assistant', botReply);

            // Verifica se a IA solicitou os dados do lead
            const lowerReply = botReply.toLowerCase();
            const asksForName = lowerReply.includes('nome');
            const asksForEmail = lowerReply.includes('email') || lowerReply.includes('e-mail') || lowerReply.includes('gmail');
            const asksForPhone = lowerReply.includes('whatsapp') || lowerReply.includes('whats') || lowerReply.includes('telefone') || lowerReply.includes('celular') || lowerReply.includes('contato');
            
            if (asksForName && asksForEmail && asksForPhone) {
                setTimeout(appendWidgetLeadForm, 600);
            }

        } catch (err) {
            typingIndicator.remove();
            appendBubble('assistant', `⚠️ **Erro na conexão:** ${err.message}. Certifique-se de que o webhook da n8n esteja configurado corretamente.`);
        }
    });

    function appendBubble(role, text) {
        const row = document.createElement('div');
        row.className = `ia-msg-row ${role}`;
        
        // Format basic markdown elements
        const formatted = text
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
            
        row.innerHTML = `<div class="ia-msg-bubble">${formatted}</div>`;
        elMessages.appendChild(row);
        elMessages.scrollTop = elMessages.scrollHeight;
    }

    function appendWidgetLeadForm() {
        const row = document.createElement('div');
        row.className = 'ia-msg-row assistant';
        
        row.innerHTML = `
            <div class="ia-msg-bubble" style="padding: 14px; width: 100%; border: 1px solid rgba(255, 255, 255, 0.1);">
                <div style="font-weight: 600; font-size: 13px; margin-bottom: 10px; color: #f4f4f5;">📝 Preencha seus dados</div>
                <form id="ia-lead-form" style="display: flex; flex-direction: column; gap: 8px;">
                    <input type="text" id="ia-lead-nome" placeholder="Seu Nome Completo" required style="padding: 8px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: #fff; font-size: 13px; outline: none;">
                    <input type="email" id="ia-lead-email" placeholder="Seu E-mail (Ex: gmail)" required style="padding: 8px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: #fff; font-size: 13px; outline: none;">
                    <input type="tel" id="ia-lead-whatsapp" placeholder="Seu WhatsApp com DDD" required style="padding: 8px 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.2); color: #fff; font-size: 13px; outline: none;">
                    <button type="submit" style="background: var(--ia-primary); color: white; border: none; padding: 8px; border-radius: 6px; font-weight: 600; cursor: pointer; margin-top: 4px; font-size: 13px; transition: 0.2s;">Enviar Dados</button>
                </form>
            </div>
        `;
        elMessages.appendChild(row);
        elMessages.scrollTop = elMessages.scrollHeight;

        const form = row.querySelector('#ia-lead-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = row.querySelector('#ia-lead-nome').value;
            const email = row.querySelector('#ia-lead-email').value;
            const whatsapp = row.querySelector('#ia-lead-whatsapp').value;
            
            const formattedData = `Nome: ${nome}\nEmail: ${email}\nWhatsApp: ${whatsapp}`;
            
            row.remove();
            
            elInput.value = formattedData;
            elForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        });
    }

    function appendTypingIndicator() {
        const row = document.createElement('div');
        row.className = 'ia-msg-row assistant';
        row.innerHTML = `
            <div class="ia-msg-bubble" style="padding: 10px 18px;">
                <span class="ia-typing-dot"></span>
                <span class="ia-typing-dot"></span>
                <span class="ia-typing-dot"></span>
            </div>
        `;
        elMessages.appendChild(row);
        elMessages.scrollTop = elMessages.scrollHeight;
        return row;
    }

    // 7. Utility function: HEX to RGB converter
    function hexToRgb(hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
    }
})();
