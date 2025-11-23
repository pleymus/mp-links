// Configurações do projeto
const CONFIG = {
    // ⚠️ IMPORTANTE: Para GitHub Pages, escolha uma das opções abaixo
    
    // OPÇÃO 1: Formspree (RECOMENDADO para GitHub Pages) ✅
    // - Funciona 100% com GitHub Pages (sem problemas de CORS)
    // - Gratuito até 50 envios/mês
    // - Setup: https://formspree.io → Criar form → Copiar endpoint
    // webhookURL: 'https://formspree.io/f/SEU_ID',
    
    // OPÇÃO 2: n8n (seu webhook atual)
    // ⚠️ Requer configuração CORS no n8n
    // No n8n, adicione no webhook node:
    // - Response Mode: "Respond to Webhook"
    // - Response Headers: {"Access-Control-Allow-Origin": "*"}
    webhookURL: 'https://n8n-n8n.nnn58f.easypanel.host/webhook/keep',
    
    // OPÇÃO 3: Formsubmit (alternativa gratuita)
    // - Sem cadastro necessário
    // - Envia direto para seu email
    // webhookURL: 'https://formsubmit.co/seu-email@exemplo.com',
    
    // Dados adicionais que serão enviados junto com o email
    additionalData: {
        source: 'pleymus-landing-page',
        campaign: 'renan-sakata',
    }
};

