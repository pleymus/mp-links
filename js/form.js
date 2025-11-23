// Form Handler - Nome, Email e Telefone
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
    const emailInput = document.getElementById('emailInput');
    const phoneInputElement = document.getElementById('phoneInput');
    const button = document.getElementById('submitButton');
    
    if (!form || !nameInput || !emailInput || !phoneInputElement || !button) {
        console.error('❌ Elementos do formulário não encontrados');
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
    }
    
    phoneInput = phoneInputElement;
    
    // Remove qualquer listener anterior
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Pega referências atualizadas
    const currentForm = document.getElementById('pleymusForm');
    const currentNameInput = document.getElementById('nameInput');
    const currentEmailInput = document.getElementById('emailInput');
    const currentPhoneInput = document.getElementById('phoneInput');
    const currentButton = document.getElementById('submitButton');
    
    // Reinicializa intl-tel-input
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
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        handleSubmit(currentNameInput, currentEmailInput, currentPhoneInput, currentButton, currentForm);
        return false;
    }, { capture: true });
    
    console.log('✅ Listener adicionado');
}

function handleSubmit(nameInput, emailInput, phoneInputElement, button, form) {
    console.log('🔄 Processando envio...');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInputElement.value.trim();
    
    // Validação do nome
    if (!name || name.length < 3) {
        showMessage('Por favor, insira seu nome completo', 'error', form);
        return;
    }
    
    // Validação do email
    if (!email || !isValidEmail(email)) {
        showMessage('Por favor, insira um email válido', 'error', form);
        return;
    }
    
    // Validação do telefone
    if (!phone) {
        showMessage('Por favor, insira seu telefone', 'error', form);
        return;
    }
    
    if (iti && !iti.isValidNumber()) {
        showMessage('Por favor, insira um telefone válido', 'error', form);
        return;
    }
    
    const fullPhone = iti ? iti.getNumber() : phone;
    const countryData = iti ? iti.getSelectedCountryData() : null;
    
    console.log('✅ Dados válidos:', { name, email, phone: fullPhone });
    
    // Loading state
    button.disabled = true;
    nameInput.disabled = true;
    emailInput.disabled = true;
    phoneInputElement.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Enviando...';
    
    // Verifica CONFIG
    if (typeof CONFIG === 'undefined' || !CONFIG.webhookURL) {
        console.error('❌ CONFIG não definido');
        saveLocally({ name, email, phone: fullPhone });
        showMessage('Dados salvos! Entraremos em contato.', 'success', form);
        resetForm(nameInput, emailInput, phoneInputElement, button, originalText);
        return;
    }
    
    console.log('📡 Enviando para:', CONFIG.webhookURL);
    
    // Prepara dados
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
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
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
    })
    .then(function(response) {
        console.log('📬 Resposta:', response.status);
        if (response.ok || response.status === 200) {
            console.log('✅ Sucesso!');
            showMessage('Dados enviados com sucesso! 🎉', 'success', form);
            nameInput.value = '';
            emailInput.value = '';
            phoneInputElement.value = '';
            if (iti) iti.setNumber('');
        } else {
            throw new Error('Status: ' + response.status);
        }
    })
    .catch(function(error) {
        console.log('⚠️ Erro:', error.message);
        saveLocally({ name, email, phone: fullPhone });
        showMessage('Dados salvos! Entraremos em contato.', 'success', form);
        nameInput.value = '';
        emailInput.value = '';
        phoneInputElement.value = '';
        if (iti) iti.setNumber('');
    })
    .finally(function() {
        resetForm(nameInput, emailInput, phoneInputElement, button, originalText);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function resetForm(nameInput, emailInput, phoneInput, button, originalText) {
    button.disabled = false;
    nameInput.disabled = false;
    emailInput.disabled = false;
    phoneInput.disabled = false;
    button.textContent = originalText;
}

function showMessage(message, type, form) {
    console.log('💬 Mensagem:', message);
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();
    
    const div = document.createElement('div');
    div.className = 'form-message form-message-' + type;
    div.textContent = message;
    div.style.opacity = '0';
    
    form.parentElement.insertBefore(div, form.nextSibling);
    setTimeout(function() { div.style.opacity = '1'; }, 10);
    setTimeout(function() {
        div.style.opacity = '0';
        setTimeout(function() { if (div.parentNode) div.remove(); }, 300);
    }, 5000);
}

function saveLocally(data) {
    try {
        const contacts = JSON.parse(localStorage.getItem('pleymus_contacts') || '[]');
        contacts.push({ ...data, timestamp: new Date().toISOString(), page: window.location.href });
        localStorage.setItem('pleymus_contacts', JSON.stringify(contacts));
        console.log('💾 Dados salvos localmente');
    } catch (e) {
        console.error('Erro ao salvar:', e);
    }
}

console.log('✅ Form.js pronto');
