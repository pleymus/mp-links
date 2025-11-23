# ⚡ Solução Rápida - Formulário no GitHub Pages

## 🎯 Problema

Você fez upload para o GitHub Pages mas o webhook não funciona.

## ✅ Solução (5 minutos)

### Passo 1: Crie conta no Formspree

1. Acesse: **https://formspree.io**
2. Clique em "Get Started"
3. Crie sua conta (gratuito)

### Passo 2: Crie um Form

1. No dashboard, clique em **"+ New Form"**
2. Nome: "Pleymus Newsletter"
3. Copie o endpoint que aparece
   - Formato: `https://formspree.io/f/xwpejrzk`

### Passo 3: Configure no Projeto

1. Abra o arquivo: **`js/config.js`**

2. Encontre esta linha:
```javascript
webhookURL: 'https://n8n-n8n.nnn58f.easypanel.host/webhook/keep',
```

3. Substitua por:
```javascript
webhookURL: 'https://formspree.io/f/SEU_ID_AQUI',
```

4. Cole o ID que você copiou do Formspree

### Passo 4: Faça Commit e Push

```bash
git add js/config.js
git commit -m "Configurar Formspree para GitHub Pages"
git push
```

### Passo 5: Aguarde Deploy

- GitHub Pages leva 1-2 minutos para atualizar
- Acesse seu site
- Teste o formulário
- ✅ Funciona!

---

## 🎉 Pronto!

Agora o formulário funciona perfeitamente no GitHub Pages!

### Onde ver os emails cadastrados?

1. Acesse https://formspree.io
2. Faça login
3. Clique no seu form
4. Veja todos os envios no dashboard

### Receber notificações por email?

1. No Formspree, vá em Settings
2. Adicione seu email
3. Ative notificações
4. Pronto! Você receberá um email a cada cadastro

---

## 🆘 Ainda não funciona?

### Verifique:

1. **URL está correta?**
   - Deve ser: `https://formspree.io/f/SEU_ID`
   - Não pode ter espaços ou caracteres extras

2. **Fez commit e push?**
   ```bash
   git status  # Verifica se há mudanças
   git push    # Envia para GitHub
   ```

3. **GitHub Pages atualizou?**
   - Vá em Settings → Pages
   - Veja se o deploy foi concluído
   - Aguarde 1-2 minutos

4. **Console tem erros?**
   - Abra o site
   - Pressione F12
   - Veja a aba Console
   - Procure por erros em vermelho

### Teste Rápido

Abra o Console (F12) e digite:

```javascript
console.log(CONFIG.webhookURL);
```

Deve mostrar: `https://formspree.io/f/SEU_ID`

Se mostrar outra coisa, o arquivo não foi atualizado.

---

## 💡 Alternativa: Formsubmit

Se não quiser criar conta, use Formsubmit:

1. Abra `js/config.js`
2. Substitua por:
```javascript
webhookURL: 'https://formsubmit.co/seu-email@exemplo.com',
```
3. Substitua `seu-email@exemplo.com` pelo seu email real
4. Commit e push
5. Faça o primeiro teste
6. Confirme o email que você receberá
7. Pronto!

---

## 📊 Comparação

| Serviço | Cadastro | Limite | Dashboard | Notificações |
|---------|----------|--------|-----------|--------------|
| **Formspree** | Sim | 50/mês | ✅ Sim | ✅ Sim |
| **Formsubmit** | Não | Ilimitado | ❌ Não | ✅ Email |

**Recomendação**: Use Formspree para ter controle total.

---

## ✅ Checklist Final

- [ ] Conta criada no Formspree
- [ ] Form criado
- [ ] Endpoint copiado
- [ ] `js/config.js` atualizado
- [ ] Commit feito
- [ ] Push feito
- [ ] GitHub Pages atualizado
- [ ] Formulário testado
- [ ] ✅ Funciona!

---

**Tempo total: 5 minutos** ⏱️

**Dificuldade: Fácil** 😊

**Resultado: Formulário funcionando!** 🎉
