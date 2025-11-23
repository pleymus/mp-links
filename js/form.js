// Form Handler - Versão GitHub Pages
console.log('📧 Form.js carregado');

// Aguarda DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}

function initForm() {
    console.log('🚀 Inicializando formulário...');
    
    const form = document.getElementById('pleymusForm');
    const input = document.getElementById('emailInput');
    const button = document.getElementById('submitButton');
    
    if (!form) {
        console.error('❌ Formulário não encontrado');
        return;
    }
    
    if (!input) {
        console.error('❌ Input não encontrado');
        return;
    }
    
    if (!button) {
        console.error('❌ Botão não encontrado');
        return;
    }
    
    console.log('✅ Elementos encontrados');
    
    // Remove qualquer listener anterior
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Pega referências atualizadas
    const currentForm = document.getElementById('pleymusForm');
    const currentInput = document.getElementById('emailInput');
    const currentButton = document.getElementById('submitButton');
    
    // Adiciona listener
    currentForm.addEventListener('submit', function(event) {
        console.log('📨 Submit detectado!');
        
        // PREVINE comportamento padrão
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        // Processa o envio
        handleSubmit(currentInput, currentButton, currentForm);
        
        return false;
    }, { capture: true });
    
    console.log('✅ Listener adicionado');
}

function handleSubmit(input, button, form) {
    console.log('🔄 Processando envio...');
    
    const email = input.value.trim();
    
    // Validação
    if (!email || !isValidEmail(email)) {
        console.log('❌ Email inválido');
        showMessage('Por favor, insira um email válido', 'error', form);
        return;
    }
    
    console.log('✅ Email válido:', email);
    
    // Loading state
    button.disabled = true;
    input.disabled = true;
    const originalText = button.textContent;
    button.textContent = '...';
    
    // Verifica CONFIG
    if (typeof CONFIG === 'undefined' || !CONFIG.webhookURL) {
        console.error('❌ CONFIG não definido');
        saveLocally(email);
        showMessage('Email salvo! Entraremos em contato.', 'success', form);
        resetForm(input, button, originalText);
        return;
    }
    
    console.log('📡 Enviando para:', CONFIG.webhookURL);
    
    // Prepara dados
    const formData = new FormData();
    formData.append('email', email);
    formData.append('timestamp', new Date().toISOString());
    formData.append('page', window.location.href);
    formData.append('source', CONFIG.additionalData?.source || 'pleymus');
    formData.append('campaign', CONFIG.additionalData?.campaign || 'default');
    
    // Envia
    fetch(CONFIG.webhookURL, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        },
        mode: 'cors'
    })
    .then(function(response) {
        console.log('📬 Resposta recebida:', response.status);
        
        if (response.ok || response.status === 200) {
            console.log('✅ Sucesso!');
            showMessage('Email cadastrado com sucesso! 🎉', 'success', form);
            input.value = '';
        } else {
            throw new Error('Status: ' + response.status);
        }
    })
    .catch(function(error) {
        console.log('⚠️ Erro:', error.message);
        // Salva localmente como fallback
        saveLocally(email);
        showMessage('Email salvo! Entraremos em contato.', 'success', form);
        input.value = '';
    })
    .finally(function() {
        resetForm(input, button, originalText);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resetForm(input, button, originalText) {
    button.disabled = false;
    input.disabled = false;
    button.textContent = originalText;
}

function showMessage(message, type, form) {
    console.log('💬 Mostrando mensagem:', message);
    
    // Remove mensagem anterior
    const existing = document.querySelector('.form-message');
    if (existing) {
        existing.remove();
    }
    
    // Cria mensagem
    const div = document.createElement('div');
    div.className = 'form-message form-message-' + type;
    div.textContent = message;
    div.style.opacity = '0';
    
    // Insere
    form.parentElement.insertBefore(div, form.nextSibling);
    
    // Anima entrada
    setTimeout(function() {
        div.style.opacity = '1';
    }, 10);
    
    // Remove após 5s
    setTimeout(function() {
        div.style.opacity = '0';
        setTimeout(function() {
            if (div.parentNode) {
                div.remove();
            }
        }, 300);
    }, 5000);
}

function saveLocally(email) {
    try {
        const emails = JSON.parse(localStorage.getItem('pleymus_emails') || '[]');
        emails.push({
            email: email,
            timestamp: new Date().toISOString(),
            page: window.location.href
        });
        localStorage.setItem('pleymus_emails', JSON.stringify(emails));
        console.log('💾 Email salvo localmente');
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }
}

console.log('✅ Form.js pronto');
