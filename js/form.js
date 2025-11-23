// Form Handler - Nome e Telefone com máscara internacional
console.log('📧 Form.js carregado');

let phoneInput;
let iti;

// Aguarda DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
} else {
    initForm();
}

function initForm() {
    console.log('🚀 Inicializando formulário...');
    
    const form = document.getElementById('pleymusForm');
    const nameInput = document.getElementById('nameInput');
    const phoneInputElement = document.getElementById('phoneInput');
    const button = document.getElementById('submitButton');
    
    if (!form) {
        console.error('❌ Formulário não encontrado');
        return;
    }
    
    if (!nameInput) {
        console.error('❌ Input de nome não encontrado');
        return;
    }
    
    if (!phoneInputElement) {
        console.error('❌ Input de telefone não encontrado');
        return;
    }
    
    if (!button) {
        console.error('❌ Botão não encontrado');
        return;
    }
    
    console.log('✅ Elementos encontrados');
    
    // Inicializa intl-tel-input
    if (typeof intlTelInput !== 'undefined') {
        iti = intlTelInput(phoneInputElement, {
            initialCountry: "br",
            preferredCountries: ["br", "us", "pt", "es"],
            separateDialCode: true,
            autoPlaceholder: "aggressive",
            formatOnDisplay: true,
            nationalMode: false,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js"
        });
        console.log('✅ Máscara de telefone inicializada');
    } else {
        console.warn('⚠️ intl-tel-input não carregado');
    }
    
    phoneInput = phoneInputElement;
    
    // Remove qualquer listener anterior
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Pega referências atualizadas
    const currentForm = document.getElementById('pleymusForm');
    const currentNameInput = document.getElementById('nameInput');
    const currentPhoneInput = document.getElementById('phoneInput');
    const currentButton = document.getElementById('submitButton');
    
    // Reinicializa intl-tel-input no novo elemento
    if (typeof intlTelInput !== 'undefined') {
        iti = intlTelInput(currentPhoneInput, {
            initialCountry: "br",
            preferredCountries: ["br", "us", "pt", "es"],
            separateDialCode: true,
            autoPlaceholder: "aggressive",
            formatOnDisplay: true,
            nationalMode: false,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.5.6/build/js/utils.js"
        });
    }
    
    phoneInput = currentPhoneInput;
    
    // Adiciona listener
    currentForm.addEventListener('submit', function(event) {
        console.log('📨 Submit detectado!');
        
        // PREVINE comportamento padrão
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        
        // Processa o envio
        handleSubmit(currentNameInput, currentPhoneInput, currentButton, currentForm);
        
        return false;
    }, { capture: true });
    
    console.log('✅ Listener adicionado');
}

function handleSubmit(nameInput, phoneInputElement, button, form) {
    console.log('🔄 Processando envio...');
    
    const name = nameInput.value.trim();
    const phone = phoneInputElement.value.trim();
    
    // Validação do nome
    if (!name || name.length < 3) {
        console.log('❌ Nome inválido');
        showMessage('Por favor, insira seu nome completo', 'error', form);
        return;
    }
    
    // Validação do telefone
    if (!phone) {
        console.log('❌ Telefone vazio');
        showMessage('Por favor, insira seu telefone', 'error', form);
        return;
    }
    
    // Valida com intl-tel-input se disponível
    if (iti && !iti.isValidNumber()) {
        console.log('❌ Telefone inválido');
        showMessage('Por favor, insira um telefone válido', 'error', form);
        return;
    }
    
    // Pega o telefone completo com código do país
    const fullPhone = iti ? iti.getNumber() : phone;
    const countryData = iti ? iti.getSelectedCountryData() : null;
    
    console.log('✅ Dados válidos:', { name, phone: fullPhone });
    
    // Loading state
    button.disabled = true;
    nameInput.disabled = true;
    phoneInputElement.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    
    // Verifica CONFIG
    if (typeof CONFIG === 'undefined' || !CONFIG.webhookURL) {
        console.error('❌ CONFIG não definido');
        saveLocally({ name, phone: fullPhone });
        showMessage('Dados salvos! Entraremos em contato.', 'success', form);
        resetForm(nameInput, phoneInputElement, button, originalText);
        return;
    }
    
    console.log('📡 Enviando para:', CONFIG.webhookURL);
    
    // Prepara dados
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', fullPhone);
    formData.append('country', countryData ? countryData.name : 'Unknown');
    formData.append('countryCode', countryData ? countryData.iso2.toUpperCase() : 'XX');
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
            showMessage('Dados enviados com sucesso! 🎉', 'success', form);
            nameInput.value = '';
            phoneInputElement.value = '';
            if (iti) iti.setNumber('');
        } else {
            throw new Error('Status: ' + response.status);
        }
    })
    .catch(function(error) {
        console.log('⚠️ Erro:', error.message);
        // Salva localmente como fallback
        saveLocally({ name, phone: fullPhone });
        showMessage('Dados salvos! Entraremos em contato.', 'success', form);
        nameInput.value = '';
        phoneInputElement.value = '';
        if (iti) iti.setNumber('');
    })
    .finally(function() {
        resetForm(nameInput, phoneInputElement, button, originalText);
    });
}

function resetForm(nameInput, phoneInput, button, originalText) {
    button.disabled = false;
    nameInput.disabled = false;
    phoneInput.disabled = false;
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

function saveLocally(data) {
    try {
        const contacts = JSON.parse(localStorage.getItem('pleymus_contacts') || '[]');
        contacts.push({
            ...data,
            timestamp: new Date().toISOString(),
            page: window.location.href
        });
        localStorage.setItem('pleymus_contacts', JSON.stringify(contacts));
        console.log('💾 Dados salvos localmente');
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }
}

console.log('✅ Form.js pronto');
