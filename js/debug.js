// Script de Debug - Adicione temporariamente ao index.html
// <script src="js/debug.js"></script>

(function() {
    console.log('%c=== DEBUG PLEYMUS ===', 'color: #ff006e; font-size: 20px; font-weight: bold;');
    
    // Verifica CONFIG
    console.log('1. CONFIG existe?', typeof CONFIG !== 'undefined');
    if (typeof CONFIG !== 'undefined') {
        console.log('   - webhookURL:', CONFIG.webhookURL);
        console.log('   - additionalData:', CONFIG.additionalData);
    } else {
        console.error('❌ CONFIG não está definido! Verifique se config.js está carregando.');
    }
    
    // Verifica elementos do DOM
    document.addEventListener('DOMContentLoaded', function() {
        console.log('2. DOM carregado');
        
        const form = document.getElementById('pleymusForm');
        const input = document.getElementById('emailInput');
        const button = document.getElementById('submitButton');
        
        console.log('3. Elementos encontrados:');
        console.log('   - Form:', form !== null);
        console.log('   - Input:', input !== null);
        console.log('   - Button:', button !== null);
        
        if (!form) {
            console.error('❌ Formulário não encontrado! ID: pleymusForm');
        }
        if (!input) {
            console.error('❌ Input não encontrado! ID: emailInput');
        }
        if (!button) {
            console.error('❌ Botão não encontrado! ID: submitButton');
        }
        
        // Verifica event listeners
        if (form) {
            console.log('4. Form tem event listener?', form.onsubmit !== null);
            
            // Adiciona listener de teste
            form.addEventListener('submit', function(e) {
                console.log('🎯 SUBMIT DETECTADO!');
                console.log('   - Prevented?', e.defaultPrevented);
                console.log('   - Email:', input?.value);
            }, true); // true = capture phase (antes de outros listeners)
        }
        
        // Testa webhook
        if (typeof CONFIG !== 'undefined' && CONFIG.webhookURL) {
            console.log('5. Testando webhook...');
            fetch(CONFIG.webhookURL, {
                method: 'OPTIONS',
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                console.log('   ✅ Webhook acessível! Status:', response.status);
            })
            .catch(error => {
                console.warn('   ⚠️ Webhook pode ter problema de CORS:', error.message);
            });
        }
        
        console.log('%c=== FIM DEBUG ===', 'color: #ff006e; font-size: 16px;');
        console.log('Se tudo estiver ✅, o formulário deve funcionar!');
        console.log('Se houver ❌, corrija o problema indicado.');
    });
})();
