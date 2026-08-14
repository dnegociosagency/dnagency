const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'public/DenisIA/index.html');
const chatPath = path.join(__dirname, 'public/DenisIA/assets/js/chat.js');

let indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Replace titles and texts in index.html with data-i18n tags
indexHtml = indexHtml.replace('<title>Chat de IA - D\'Negócios Agency</title>', '<title data-i18n="title">Chat de IA - D\'Negócios Agency</title>');
indexHtml = indexHtml.replace('<h2>Bem-vindo à DN</h2>', '<h2 data-i18n="login_title">Bem-vindo à DN</h2>');
indexHtml = indexHtml.replace('<p>Faça login com sua conta Google para enviar mensagens e manter seu histórico salvo com segurança.</p>', '<p id="login-desc-text" data-i18n="login_desc">Faça login com sua conta Google para enviar mensagens e manter seu histórico salvo com segurança.</p>');
indexHtml = indexHtml.replace('<button id="btn-continue-guest" class="btn-guest">Continuar como visitante</button>', '<button id="btn-continue-guest" class="btn-guest" data-i18n="login_guest">Continuar como visitante</button>');
indexHtml = indexHtml.replace('Novo Chat', '<span data-i18n="new_chat">Novo Chat</span>');
indexHtml = indexHtml.replace('<h4>Recentes</h4>', '<h4 data-i18n="recent">Recentes</h4>');
indexHtml = indexHtml.replace('<span class="user-name" id="sidebar-user-name">Visitante</span>', '<span class="user-name" id="sidebar-user-name" data-i18n="guest">Visitante</span>');
indexHtml = indexHtml.replace('Login\r\n                        </button>', '<span data-i18n="login">Login</span>\r\n                        </button>');
indexHtml = indexHtml.replace('Login\n                        </button>', '<span data-i18n="login">Login</span>\n                        </button>');
indexHtml = indexHtml.replace('Sair\r\n                        </button>', '<span data-i18n="logout">Sair</span>\r\n                        </button>');
indexHtml = indexHtml.replace('Sair\n                        </button>', '<span data-i18n="logout">Sair</span>\n                        </button>');
indexHtml = indexHtml.replace('Voltar\r\n                    </a>', '<span data-i18n="back">Voltar</span>\r\n                    </a>');
indexHtml = indexHtml.replace('Voltar\n                    </a>', '<span data-i18n="back">Voltar</span>\n                    </a>');

indexHtml = indexHtml.replace('<span class="mode-option-desc">Respostas rápidas para o dia a dia</span>', '<span class="mode-option-desc" data-i18n="turbo_desc">Respostas rápidas para o dia a dia</span>');
indexHtml = indexHtml.replace('<span class="mode-option-desc">Pensamentos mais complexos</span>', '<span class="mode-option-desc" data-i18n="pro_desc">Pensamentos mais complexos</span>');

indexHtml = indexHtml.replace('<span class="toggle-label" id="webhook-label">Produção</span>', '<span class="toggle-label" id="webhook-label" data-i18n="production">Produção</span>');
indexHtml = indexHtml.replace('<h2 class="gradient-text">Como posso te ajudar?</h2>', '<h2 class="gradient-text" data-i18n="how_can_i_help">Como posso te ajudar?</h2>');
indexHtml = indexHtml.replace('<p>Explore o poder do modelo <span id="welcome-mode-label">Turbo</span> para escalar suas vendas e automações.</p>', '<p data-i18n="explore_power">Explore o poder do modelo <span id="welcome-mode-label">Turbo</span> para escalar suas vendas e automações.</p>');

indexHtml = indexHtml.replace('<div class="sugg-text">Estratégias de Tráfego Pago e Anúncios</div>', '<div class="sugg-text" data-i18n="sugg_1">Estratégias de Tráfego Pago e Anúncios</div>');
indexHtml = indexHtml.replace('<div class="sugg-text">Automação de Vendas e CRM</div>', '<div class="sugg-text" data-i18n="sugg_2">Automação de Vendas e CRM</div>');
indexHtml = indexHtml.replace('<div class="sugg-text">SEO e Produção de Conteúdo</div>', '<div class="sugg-text" data-i18n="sugg_3">SEO e Produção de Conteúdo</div>');
indexHtml = indexHtml.replace('<div class="sugg-text">Agendar Reunião Estratégica</div>', '<div class="sugg-text" data-i18n="sugg_4">Agendar Reunião Estratégica</div>');

indexHtml = indexHtml.replace('placeholder="Pergunte algo..."', 'placeholder="Pergunte algo..." data-i18n-placeholder="ask_something"');
indexHtml = indexHtml.replace('Denis é uma IA e pode cometer erros.', '<span data-i18n="ai_warning">Denis é uma IA e pode cometer erros.</span>');

indexHtml = indexHtml.replace('<h2 id="voice-mode-title">Assistente Turbo</h2>', '<h2 id="voice-mode-title" data-i18n="voice_assistant">Assistente Turbo</h2>');
indexHtml = indexHtml.replace('<span class="call-status">Conectado via Voz</span>', '<span class="call-status" data-i18n="voice_connected">Conectado via Voz</span>');
indexHtml = indexHtml.replace('<h3 id="voice-status-text" class="status-indicator-text">Ouvindo...</h3>', '<h3 id="voice-status-text" class="status-indicator-text" data-i18n="voice_listening">Ouvindo...</h3>');

fs.writeFileSync(indexPath, indexHtml);


let chatJs = fs.readFileSync(chatPath, 'utf-8');

// Insert i18n object and logic
const i18nCode = `
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
`;

// Insert the i18n code at the beginning of document.addEventListener('DOMContentLoaded', ...)
chatJs = chatJs.replace(
    "document.addEventListener('DOMContentLoaded', () => {", 
    "document.addEventListener('DOMContentLoaded', () => {\n" + i18nCode
);

// Replace hardcoded JS texts with dynamic i18n calls
chatJs = chatJs.replace(/'Para uma melhor experiência com base em chats salvos, entre numa conta.'/g, "i18n[state.currentLang].login_req_msg");
chatJs = chatJs.replace(/'Para utilizar a chamada de voz, você precisa fazer login com sua conta Google.'/g, "i18n[state.currentLang].login_req_voice");
chatJs = chatJs.replace(/'Faça login com sua conta Google para enviar mensagens e manter seu histórico salvo com segurança.'/g, "i18n[state.currentLang].login_req_menu");
chatJs = chatJs.replace(/'Você saiu\. Faça login para continuar\.'/g, "i18n[state.currentLang].logout_msg");

chatJs = chatJs.replace(/"Seu navegador não suporta reconhecimento de voz\. Use o Google Chrome ou Edge\."/g, "i18n[state.currentLang].voice_not_supported");
chatJs = chatJs.replace(/"Ouvindo\.\.\."/g, "i18n[state.currentLang].voice_listening");
chatJs = chatJs.replace(/"Pensando\.\.\."/g, "i18n[state.currentLang].voice_thinking");
chatJs = chatJs.replace(/"Carregando voz\.\.\."/g, "i18n[state.currentLang].voice_loading");
chatJs = chatJs.replace(/"Falando\.\.\."/g, "i18n[state.currentLang].voice_speaking");
chatJs = chatJs.replace(/"Erro no microfone"/g, "i18n[state.currentLang].voice_mic_error");

chatJs = chatJs.replace(/"Pergunte algo\.\.\."/g, "i18n[state.currentLang].ask_something");

// Replace texts in history generation
chatJs = chatJs.replace(/<div class="history-opt-btn-left"><i data-lucide="share-2"><\/i> Share chat<\/div>/g, '<div class="history-opt-btn-left"><i data-lucide="share-2"></i> ${i18n[state.currentLang].share_chat}</div>');
chatJs = chatJs.replace(/<div class="history-opt-btn-left"><i data-lucide="pin"><\/i> \$\{session\.pinned \? 'Unpin' : 'Pin'\}<\/div>/g, '<div class="history-opt-btn-left"><i data-lucide="pin"></i> ${session.pinned ? i18n[state.currentLang].unpin : i18n[state.currentLang].pin}</div>');
chatJs = chatJs.replace(/<div class="history-opt-btn-left"><i data-lucide="edit-2"><\/i> Rename<\/div>/g, '<div class="history-opt-btn-left"><i data-lucide="edit-2"></i> ${i18n[state.currentLang].rename}</div>');
chatJs = chatJs.replace(/<div class="history-opt-btn-left"><i data-lucide="trash-2"><\/i> Delete<\/div>/g, '<div class="history-opt-btn-left"><i data-lucide="trash-2"></i> ${i18n[state.currentLang].delete}</div>');

chatJs = chatJs.replace(/'Compartilhar chat'/g, "i18n[state.currentLang].share_chat_title");
chatJs = chatJs.replace(/<p style="margin: 0 0 10px 0;">Copie o texto do chat abaixo:<\/p>/g, '<p style="margin: 0 0 10px 0;">${i18n[state.currentLang].share_chat_desc}</p>');
chatJs = chatJs.replace(/<button class="btn-cancel">Cancelar<\/button>/g, '<button class="btn-cancel">${i18n[state.currentLang].cancel}</button>');
chatJs = chatJs.replace(/<button class="btn-confirm" id="btn-copy-link">Copiar Texto<\/button>/g, '<button class="btn-confirm" id="btn-copy-link">${i18n[state.currentLang].copy_text}</button>');
chatJs = chatJs.replace(/'Copiado!'/g, "i18n[state.currentLang].copied");
chatJs = chatJs.replace(/'Erro ao copiar'/g, "i18n[state.currentLang].copy_error");

chatJs = chatJs.replace(/'Renomear chat'/g, "i18n[state.currentLang].rename_chat_title");
chatJs = chatJs.replace(/placeholder="Novo nome do chat"/g, 'placeholder="${i18n[state.currentLang].rename_chat_placeholder}"');
chatJs = chatJs.replace(/<button class="btn-confirm" id="btn-save-rename">Salvar<\/button>/g, '<button class="btn-confirm" id="btn-save-rename">${i18n[state.currentLang].save}</button>');

chatJs = chatJs.replace(/'Excluir chat\?'/g, "i18n[state.currentLang].delete_chat_title");
chatJs = chatJs.replace(/<p style="margin:0;">Isso excluirá o chat <strong>\$\{session\.title\}<\/strong>\.<\/p>/g, '<p style="margin:0;">${i18n[state.currentLang].delete_chat_desc} <strong>${session.title}</strong>.</p>');
chatJs = chatJs.replace(/Esta ação não pode ser desfeita e você não poderá recuperar este chat\./g, '${i18n[state.currentLang].delete_chat_warn}');
chatJs = chatJs.replace(/<button class="btn-confirm danger" id="btn-confirm-delete">Excluir<\/button>/g, '<button class="btn-confirm danger" id="btn-confirm-delete">${i18n[state.currentLang].delete}</button>');

chatJs = chatJs.replace(/"Entendi\. Desculpe-me, o fluxo não retornou texto\."/g, "i18n[state.currentLang].empty_bot_reply");
chatJs = chatJs.replace(/⚠️ \*\*Erro na conexão:\*\*/g, '⚠️ **${i18n[state.currentLang].conn_error}**');
chatJs = chatJs.replace(/state\.currentLang = lang;/g, 'state.currentLang = lang;\n                    updateLanguageUI(lang);\n                    renderSidebarHistory();');
chatJs = chatJs.replace(/renderSidebarHistory\(\);\n\}\);/g, 'renderSidebarHistory();\n    updateLanguageUI(state.currentLang);\n});');

chatJs = chatJs.replace(/el\.webhookLabel\.textContent = "Teste";/g, 'el.webhookLabel.textContent = i18n[state.currentLang].test;');
chatJs = chatJs.replace(/el\.webhookLabel\.textContent = "Produção";/g, 'el.webhookLabel.textContent = i18n[state.currentLang].production;');

fs.writeFileSync(chatPath, chatJs);
console.log('Done!');
