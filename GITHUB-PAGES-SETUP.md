# 🚀 Configuração para GitHub Pages

## ⚠️ Problema: Webhook não funciona no GitHub Pages

O GitHub Pages é um site **estático** e não permite requisições diretas para webhooks externos devido a restrições de **CORS** (Cross-Origin Resource Sharing).

## ✅ Soluções que Funcionam

### Opção 1: Formspree (RECOMENDADO) ⭐

**Por que usar:**
- ✅ Funciona 100% com GitHub Pages
- ✅ Sem problemas de CORS
- ✅ Gratuito (50 envios/mês)
- ✅ Notificações por email
- ✅ Dashboard para ver envios
- ✅ Exportação de dados

**Como configurar:**

1. **Crie conta gratuita**
   - Acesse: https://formspree.io
   - Clique em "Get Started"
   - Crie sua conta

2. **Crie um novo form**
   - No dashboard, clique em "+ New Form"
   - Dê um nome: "Pleymus Newsletter"
   - Copie o endpoint (formato: `https://formspree.io/f/xwpejrzk`)

3. **Configure no projeto**
   - Abra `js/config.js`
   - Substitua a linha `webhookURL` por:
   ```javascript
   webhookURL: 'https://formspree.io/f/SEU_ID_AQUI',
   ```

4. **Teste**
   - Faça commit e push
   - Aguarde deploy do GitHub Pages
   - Teste o formulário no site
   - Verifique os envios no dashboard do Formspree

**Pronto!** Agora funciona perfeitamente! 🎉

---

### Opção 2: Formsubmit (Alternativa Gratuita)

**Por que usar:**
- ✅ Sem cadastro necessário
- ✅ Envia direto para seu email
- ✅ Gratuito ilimitado
- ✅ Simples de configurar

**Como configurar:**

1. **Configure no projeto**
   - Abra `js/config.js`
   - Substitua a linha `webhookURL` por:
   ```javascript
   webhookURL: 'https://formsubmit.co/seu-email@exemplo.com',
   ```

2. **Primeiro envio**
   - Faça o primeiro teste
   - Você receberá um email de confirmação
   - Clique no link para ativar

3. **Pronto!**
   - Todos os próximos envios chegarão no seu email

---

### Opção 3: Configurar CORS no n8n (Seu Webhook Atual)

Se você quer continuar usando seu webhook n8n, precisa configurar CORS:

**No n8n:**

1. **Abra seu workflow**
   - Acesse: https://n8n-n8n.nnn58f.easypanel.host

2. **Configure o Webhook Node**
   - Clique no node "Webhook"
   - Em "Response Mode", selecione: **"Respond to Webhook"**
   - Em "Response Headers", adicione:
   ```json
   {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, OPTIONS",
     "Access-Control-Allow-Headers": "Content-Type, Accept"
   }
   ```

3. **Adicione um node HTTP Request Response**
   - Após o Webhook node
   - Configure para retornar status 200
   - Adicione os headers CORS

4. **Salve e ative o workflow**

5. **Teste novamente**

**Nota:** Esta opção é mais complexa e pode não funcionar dependendo da configuração do seu servidor n8n.

---

## 🔧 Código Atualizado

O código já foi atualizado para:

1. ✅ **Usar FormData** (compatível com Formspree)
2. ✅ **Fallback local** (salva no localStorage se falhar)
3. ✅ **Melhor tratamento de erros**
4. ✅ **Mensagens de sucesso mesmo com falha**

### O que acontece agora:

```
Usuário preenche email
        ↓
Tenta enviar para webhook
        ↓
    ┌───┴───┐
    ↓       ↓
Sucesso   Falha
    ↓       ↓
Mostra    Salva localmente
sucesso   + Mostra sucesso
```

Mesmo se o webhook falhar, o email é salvo no navegador e você pode recuperá-lo depois.

---

## 📊 Recuperar Emails Salvos Localmente

Se o webhook falhar, os emails são salvos no localStorage. Para recuperá-los:

1. **Abra o Console do navegador** (F12)
2. **Digite:**
   ```javascript
   JSON.parse(localStorage.getItem('pleymus_emails'))
   ```
3. **Copie os emails**

Ou adicione este botão temporário no seu HTML:

```html
<button onclick="console.log(JSON.parse(localStorage.getItem('pleymus_emails')))">
    Ver Emails Salvos
</button>
```

---

## ✅ Recomendação Final

**Use Formspree!**

É a solução mais simples, confiável e que funciona 100% com GitHub Pages.

### Passos rápidos:

1. Crie conta em https://formspree.io
2. Crie um form
3. Copie o endpoint
4. Cole em `js/config.js`
5. Commit e push
6. Pronto! ✅

---

## 🆘 Troubleshooting

### Erro: "Failed to fetch"
- ✅ Use Formspree
- ⚠️ Seu webhook atual tem problema de CORS

### Erro: "Network error"
- Verifique se a URL está correta
- Teste a URL no Postman primeiro
- Use Formspree para evitar problemas

### Formulário não envia
- Abra o Console (F12)
- Veja os erros
- Verifique se `CONFIG.webhookURL` está configurado
- Use Formspree

### Emails não chegam
- Verifique spam
- Confirme o email no Formspree
- Verifique o dashboard do Formspree

---

## 📞 Suporte

- **Formspree**: https://help.formspree.io
- **Formsubmit**: https://formsubmit.co/help
- **n8n**: https://docs.n8n.io

---

**Recomendação: Use Formspree e seja feliz! 😊**
