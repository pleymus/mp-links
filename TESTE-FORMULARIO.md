# 🧪 Teste do Formulário - Diagnóstico

## 🔍 Como Testar

### Passo 1: Abra o Console do Navegador

1. Abra seu site no navegador
2. Pressione **F12** (ou Ctrl+Shift+I)
3. Clique na aba **Console**

### Passo 2: Verifique se há Erros

Procure por mensagens em **vermelho**. Se houver, copie e me envie.

### Passo 3: Teste Manualmente

Cole estes comandos no console (um de cada vez):

#### Teste 1: Verificar se CONFIG existe
```javascript
console.log('CONFIG:', CONFIG);
```

**Resultado esperado:**
```
CONFIG: {webhookURL: "https://...", additionalData: {...}}
```

Se aparecer `undefined`, o arquivo `config.js` não está carregando.

---

#### Teste 2: Verificar se o formulário existe
```javascript
console.log('Form:', document.getElementById('pleymusForm'));
```

**Resultado esperado:**
```
Form: <form id="pleymusForm">...</form>
```

Se aparecer `null`, o ID do formulário está errado.

---

#### Teste 3: Verificar se o input existe
```javascript
console.log('Input:', document.getElementById('emailInput'));
```

**Resultado esperado:**
```
Input: <input type="email" id="emailInput">
```

---

#### Teste 4: Verificar se o botão existe
```javascript
console.log('Button:', document.getElementById('submitButton'));
```

**Resultado esperado:**
```
Button: <button type="submit" id="submitButton">
```

---

#### Teste 5: Testar envio manual
```javascript
// Cole este código completo no console
const testEmail = 'teste@exemplo.com';
const formData = new FormData();
formData.append('email', testEmail);

fetch(CONFIG.webhookURL, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
})
.then(response => {
    console.log('Status:', response.status);
    return response.json();
})
.then(data => console.log('Resposta:', data))
.catch(error => console.error('Erro:', error));
```

**Resultado esperado:**
- Status: 200 (sucesso)
- Ou erro de CORS (se o webhook não aceitar)

---

## 🐛 Problemas Comuns

### Problema 1: "CONFIG is not defined"

**Causa:** Arquivo `config.js` não está carregando

**Solução:**
1. Verifique se o arquivo existe em `js/config.js`
2. Verifique se está sendo carregado no HTML:
```html
<script src="js/config.js"></script>
```
3. Limpe o cache (Ctrl+Shift+R)

---

### Problema 2: "Form is null"

**Causa:** ID do formulário está errado ou formulário não existe

**Solução:**
1. Verifique se o formulário tem `id="pleymusForm"`
2. Verifique se o JavaScript está carregando após o HTML

---

### Problema 3: "CORS error" ou "Failed to fetch"

**Causa:** Webhook não aceita requisições do navegador

**Solução:**
1. Use Formspree (recomendado)
2. Ou configure CORS no seu webhook
3. Veja: `GITHUB-PAGES-SETUP.md`

---

### Problema 4: Página rola para o topo

**Causa:** JavaScript não está prevenindo o comportamento padrão

**Solução:**
1. Verifique se `form.js` está carregando
2. Verifique se não há erros no console
3. Limpe o cache do navegador

---

## ✅ Checklist de Verificação

Execute no console:

```javascript
// Cole tudo de uma vez
console.log('=== DIAGNÓSTICO COMPLETO ===');
console.log('1. CONFIG existe?', typeof CONFIG !== 'undefined');
console.log('2. CONFIG.webhookURL:', CONFIG?.webhookURL);
console.log('3. Form existe?', document.getElementById('pleymusForm') !== null);
console.log('4. Input existe?', document.getElementById('emailInput') !== null);
console.log('5. Button existe?', document.getElementById('submitButton') !== null);
console.log('6. Scripts carregados:', {
    config: typeof CONFIG !== 'undefined',
    form: typeof FormHandler !== 'undefined' || document.getElementById('pleymusForm')?.onsubmit !== null
});
console.log('=== FIM DO DIAGNÓSTICO ===');
```

**Copie o resultado e me envie!**

---

## 🔧 Solução Rápida

Se nada funcionar, tente isto:

### Opção 1: Usar Formspree Diretamente no HTML

Substitua o formulário no `index.html` por:

```html
<form action="https://formspree.io/f/SEU_ID" method="POST" class="pleymus-input-wrapper">
    <input 
        type="email" 
        name="email"
        class="pleymus-input" 
        placeholder="Digite seu email"
        required>
    <button type="submit" class="pleymus-submit">→</button>
</form>
```

Isso funciona sem JavaScript!

---

### Opção 2: Verificar Ordem dos Scripts

No `index.html`, certifique-se que os scripts estão nesta ordem:

```html
<script src="js/config.js"></script>
<script src="js/slider.js"></script>
<script src="js/form.js"></script>
```

`config.js` DEVE vir primeiro!

---

## 📊 Resultado do Teste

Após executar os testes, você deve ter:

```
✅ CONFIG existe
✅ CONFIG.webhookURL está definido
✅ Form existe
✅ Input existe
✅ Button existe
✅ Sem erros no console
```

Se todos estiverem ✅, o problema é no webhook (CORS).
Se algum estiver ❌, me envie qual está faltando.

---

## 🆘 Ainda Não Funciona?

Me envie:
1. Print do console (F12)
2. Resultado do diagnóstico completo
3. URL do seu site no GitHub Pages

Vou te ajudar a resolver! 🚀
