# 🐛 Como Debugar o Formulário

## 🎯 Objetivo

Descobrir exatamente por que o formulário não funciona no GitHub Pages.

## 🚀 Passo a Passo

### Passo 1: Adicionar Script de Debug

Abra `index.html` e adicione esta linha **ANTES** do `</body>`:

```html
    <script src="js/config.js"></script>
    <script src="js/slider.js"></script>
    <script src="js/form.js"></script>
    <script src="js/debug.js"></script>  <!-- ADICIONE ESTA LINHA -->
</body>
```

### Passo 2: Commit e Push

```bash
git add index.html js/debug.js
git commit -m "Adicionar debug"
git push
```

### Passo 3: Aguardar Deploy

Aguarde 1-2 minutos para o GitHub Pages atualizar.

### Passo 4: Abrir Console

1. Acesse seu site no GitHub Pages
2. Pressione **F12**
3. Clique na aba **Console**
4. Recarregue a página (**F5**)

### Passo 5: Ver Resultado

Você verá algo assim:

```
=== DEBUG PLEYMUS ===
1. CONFIG existe? true
   - webhookURL: https://...
   - additionalData: {...}
2. DOM carregado
3. Elementos encontrados:
   - Form: true
   - Input: true
   - Button: true
4. Form tem event listener? true
5. Testando webhook...
   ✅ Webhook acessível! Status: 200
=== FIM DEBUG ===
```

### Passo 6: Testar Formulário

1. Preencha o formulário
2. Clique em enviar
3. Veja no console se aparece: **"🎯 SUBMIT DETECTADO!"**

## 📊 Interpretando os Resultados

### ✅ Tudo OK

Se você vê:
```
1. CONFIG existe? true
3. Elementos encontrados: Form: true, Input: true, Button: true
4. Form tem event listener? true
🎯 SUBMIT DETECTADO!
```

**Significa:** O código está funcionando! O problema é no webhook (CORS).

**Solução:** Use Formspree (veja `SOLUCAO-RAPIDA.md`)

---

### ❌ CONFIG não existe

Se você vê:
```
❌ CONFIG não está definido!
```

**Significa:** `config.js` não está carregando

**Solução:**
1. Verifique se `js/config.js` existe
2. Verifique se está sendo carregado no HTML
3. Limpe o cache (Ctrl+Shift+R)
4. Verifique se fez commit e push

---

### ❌ Elementos não encontrados

Se você vê:
```
❌ Formulário não encontrado!
```

**Significa:** IDs do HTML estão errados

**Solução:**
1. Verifique se o formulário tem `id="pleymusForm"`
2. Verifique se o input tem `id="emailInput"`
3. Verifique se o botão tem `id="submitButton"`

---

### ❌ Form não tem event listener

Se você vê:
```
4. Form tem event listener? false
```

**Significa:** `form.js` não está funcionando

**Solução:**
1. Verifique se `js/form.js` existe
2. Verifique se está sendo carregado no HTML
3. Verifique se não há erros de JavaScript no console
4. Limpe o cache

---

### ⚠️ Webhook com problema de CORS

Se você vê:
```
⚠️ Webhook pode ter problema de CORS
```

**Significa:** Seu webhook não aceita requisições do navegador

**Solução:**
1. Use Formspree (recomendado)
2. Ou configure CORS no seu webhook
3. Veja: `GITHUB-PAGES-SETUP.md`

---

## 🎯 Cenários Comuns

### Cenário 1: Tudo ✅ mas não envia

**Diagnóstico:**
```
✅ CONFIG existe
✅ Elementos encontrados
✅ Form tem listener
🎯 SUBMIT DETECTADO!
❌ Erro ao enviar: CORS
```

**Problema:** Webhook não aceita CORS

**Solução:** Use Formspree

---

### Cenário 2: CONFIG não existe

**Diagnóstico:**
```
❌ CONFIG não está definido!
```

**Problema:** `config.js` não carregou

**Solução:**
1. Verifique se arquivo existe
2. Limpe cache
3. Verifique ordem dos scripts

---

### Cenário 3: Form não encontrado

**Diagnóstico:**
```
❌ Formulário não encontrado!
```

**Problema:** ID errado ou script carregando antes do HTML

**Solução:**
1. Verifique IDs no HTML
2. Mova scripts para antes do `</body>`

---

### Cenário 4: Nenhum log aparece

**Diagnóstico:**
```
(console vazio)
```

**Problema:** Scripts não estão carregando

**Solução:**
1. Verifique se fez commit e push
2. Aguarde deploy do GitHub Pages
3. Limpe cache (Ctrl+Shift+R)
4. Teste em aba anônima

---

## 🔧 Ações Corretivas

### Se CONFIG não existe:

```bash
# Verifique se arquivo existe
ls js/config.js

# Se não existir, crie novamente
# (copie o conteúdo do config.js)

# Commit e push
git add js/config.js
git commit -m "Adicionar config.js"
git push
```

### Se elementos não encontrados:

Verifique o HTML:
```html
<form id="pleymusForm" class="pleymus-input-wrapper">
    <input id="emailInput" type="email" ...>
    <button id="submitButton" type="submit" ...>
</form>
```

Todos os IDs devem estar corretos!

### Se webhook tem CORS:

Use Formspree:
1. Crie conta em https://formspree.io
2. Crie um form
3. Copie o endpoint
4. Cole em `js/config.js`:
```javascript
webhookURL: 'https://formspree.io/f/SEU_ID',
```

---

## 📸 Me Envie

Após executar o debug, me envie:

1. **Print do console** (F12 → Console)
2. **URL do seu site** no GitHub Pages
3. **Resultado do teste** (o que apareceu)

Com isso, posso te ajudar exatamente! 🚀

---

## 🧹 Remover Debug (Depois)

Quando tudo funcionar, remova o debug:

1. Abra `index.html`
2. Remova a linha:
```html
<script src="js/debug.js"></script>
```
3. Commit e push

---

## ✅ Checklist

- [ ] Adicionei `debug.js` ao HTML
- [ ] Fiz commit e push
- [ ] Aguardei 2 minutos
- [ ] Limpei cache (Ctrl+Shift+R)
- [ ] Abri console (F12)
- [ ] Vi os logs de debug
- [ ] Testei o formulário
- [ ] Vi "SUBMIT DETECTADO"
- [ ] Identifiquei o problema
- [ ] Apliquei a solução

---

**Com o debug, vamos descobrir exatamente o que está errado!** 🔍
