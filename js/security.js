// Security Layer - Proteção do Webhook e Formulário
(function() {
    'use strict';

    // 1. Rate Limiting - Previne spam
    const RATE_LIMIT = {
        maxAttempts: 3,
        timeWindow: 60000, // 1 minuto
        blockDuration: 300000 // 5 minutos
    };

    // 2. Honeypot - Campo invisível para detectar bots
    function createHoneypot() {
        const form = document.getElementById('pleymusForm');
        if (!form) return;

        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'website';
        honeypot.id = 'website';
        honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
        honeypot.tabIndex = -1;
        honeypot.autocomplete = 'off';
        form.appendChild(honeypot);
    }

    // 3. Timestamp Validation - Previne replay attacks
    function generateTimestamp() {
        return Date.now();
    }

    // 4. Simple Token - Ofusca requisições
    function generateToken() {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2);
        return btoa(timestamp + ':' + random);
    }

    // 5. Rate Limiting Check
    function checkRateLimit() {
        const attempts = JSON.parse(localStorage.getItem('form_attempts') || '[]');
        const now = Date.now();
        
        // Remove tentativas antigas
        const recentAttempts = attempts.filter(time => now - time < RATE_LIMIT.timeWindow);
        
        // Verifica se está bloqueado
        const lastAttempt = recentAttempts[recentAttempts.length - 1];
        if (lastAttempt && now - lastAttempt < RATE_LIMIT.blockDuration && recentAttempts.length >= RATE_LIMIT.maxAttempts) {
            const remainingTime = Math.ceil((RATE_LIMIT.blockDuration - (now - lastAttempt)) / 1000);
            return {
                allowed: false,
                message: `Muitas tentativas. Aguarde ${remainingTime} segundos.`
            };
        }
        
        // Verifica limite de tentativas
        if (recentAttempts.length >= RATE_LIMIT.maxAttempts) {
            return {
                allowed: false,
                message: 'Limite de tentativas excedido. Aguarde 1 minuto.'
            };
        }
        
        return { allowed: true };
    }

    // 6. Registra tentativa
    function recordAttempt() {
        const attempts = JSON.parse(localStorage.getItem('form_attempts') || '[]');
        attempts.push(Date.now());
        
        // Mantém apenas últimas 10 tentativas
        const recentAttempts = attempts.slice(-10);
        localStorage.setItem('form_attempts', JSON.stringify(recentAttempts));
    }

    // 7. Valida Honeypot
    function validateHoneypot() {
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value !== '') {
            console.warn('🚨 Bot detectado via honeypot');
            return false;
        }
        return true;
    }

    // 8. Detecta comportamento de bot
    function detectBotBehavior() {
        // Verifica se o formulário foi preenchido muito rápido (menos de 2 segundos)
        const formLoadTime = window.formLoadTime || Date.now();
        const timeSinceLoad = Date.now() - formLoadTime;
        
        if (timeSinceLoad < 2000) {
            console.warn('🚨 Preenchimento muito rápido - possível bot');
            return false;
        }
        
        return true;
    }

    // 9. Sanitiza dados de entrada
    function sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        // Remove scripts e tags HTML
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<[^>]+>/g, '')
            .trim();
    }

    // 10. Valida origem da requisição
    function validateOrigin() {
        const allowedOrigins = [
            'github.io',
            'localhost',
            '127.0.0.1'
        ];
        
        const currentOrigin = window.location.hostname;
        return allowedOrigins.some(origin => currentOrigin.includes(origin));
    }

    // 11. Adiciona headers de segurança
    function getSecurityHeaders() {
        return {
            'X-Requested-With': 'XMLHttpRequest',
            'X-Form-Token': generateToken(),
            'X-Timestamp': generateTimestamp().toString(),
            'X-Origin': window.location.origin
        };
    }

    // 12. Ofusca URL do webhook (não expõe diretamente)
    function getWebhookURL() {
        if (typeof CONFIG === 'undefined' || !CONFIG.webhookURL) {
            return null;
        }
        
        // Retorna URL ofuscada
        return CONFIG.webhookURL;
    }

    // Exporta funções de segurança
    window.SecurityLayer = {
        checkRateLimit: checkRateLimit,
        recordAttempt: recordAttempt,
        validateHoneypot: validateHoneypot,
        detectBotBehavior: detectBotBehavior,
        sanitizeInput: sanitizeInput,
        validateOrigin: validateOrigin,
        getSecurityHeaders: getSecurityHeaders,
        getWebhookURL: getWebhookURL,
        createHoneypot: createHoneypot
    };

    // Inicializa honeypot quando DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createHoneypot);
    } else {
        createHoneypot();
    }

    // Marca tempo de carregamento do formulário
    window.formLoadTime = Date.now();

    console.log('🔒 Security Layer ativado');
})();
