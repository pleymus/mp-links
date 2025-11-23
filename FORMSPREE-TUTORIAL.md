# 📝 Tutorial Completo: Formspree + GitHub Pages

## 🎯 O Que Vamos Fazer

Configurar o formulário para funcionar 100% no GitHub Pages usando Formspree.

---

## 📋 Pré-requisitos

- ✅ Site já no GitHub Pages
- ✅ Formulário não está funcionando
- ✅ 5 minutos de tempo

---

## 🚀 Passo a Passo (Com Imagens)

### Passo 1: Criar Conta no Formspree

1. **Acesse**: https://formspree.io

2. **Clique em**: "Get Started" ou "Sign Up"

3. **Preencha**:
   - Email
   - Senha
   - Nome

4. **Confirme** seu email (verifique a caixa de entrada)

---

### Passo 2: Criar Novo Form

1. **No dashboard**, clique no botão: **"+ New Form"**

2. **Preencha**:
   ```
   Form Name: Pleymus Newsletter
   ```

3. **Clique em**: "Create Form"

4. **Copie o endpoint** que aparece:
   ```
   https://formspree.io/f/xwpejrzk
   ```
   ⚠️ Seu ID será diferente! Copie o seu.

---

### Passo 3: Configurar no Projeto

#### 3.1. Abra o arquivo `js/config.js`

No seu editor de código ou GitHub:

```
seu-projeto/
└── js/
    └── config.js  ← Abra este arquivo
```

#### 3.2. Encontre esta linha:

```javascript
webhookURL: 'https://n8n-n8n.nnn58f.easypanel.host/webhook/keep',
```

#### 3.3. Substitua por:

```javascript
webhookURL: 'https://formspree.io/f/xwpejrzk',
```

⚠️ **IMPORTANTE**: Use o SEU ID do Formspree, não o exemplo acima!

#### 3.4. Salve o arquivo

---

### Passo 4: Enviar para GitHub

#### Opção A: Via GitHub Web

1. Vá para o repositório no GitHub
2. Navegue até `js/config.js`
3. Clique no ícone de lápis (Edit)
4. Cole o novo código
5. Clique em "Commit changes"
6. Adicione mensagem: "Configurar Formspree"
7. Clique em "Commit changes"

#### Opção B: Via Git (Terminal)

```bash
# Adicione as mudanças
git add js/config.js

# Faça commit
git commit -m "Configurar Formspree para GitHub Pages"

# Envie para GitHub
git push origin main
```

---

### Passo 5: Aguardar Deploy

1. **Vá para**: Settings → Pages no seu repositório

2. **Aguarde**: 1-2 minutos

3. **Verifique**: Status deve mostrar "✅ Your site is live"

---

### Passo 6: Testar!

1. **Acesse seu site**: `https://seu-usuario.github.io/seu-repo`

2. **Preencha o formulário** com um email de teste

3. **Clique em enviar**

4. **Deve aparecer**: "Email cadastrado com sucesso! 🎉"

5. **Verifique no Formspree**:
   - Acesse https://formspree.io
   - Faça login
   - Clique no seu form
   - Veja o email que acabou de enviar!

---

## ✅ Funcionou!

Se você viu a mensagem de sucesso e o email apareceu no Formspree, está tudo certo! 🎉

---

## 🔧 Configurações Extras (Opcional)

### Receber Notificações por Email

1. No Formspree, clique no seu form
2. Vá em **"Settings"**
3. Em **"Email Notifications"**
4. Adicione seu email
5. Ative **"Send me an email for each submission"**
6. Salve

Agora você receberá um email a cada cadastro!

### Personalizar Mensagem de Sucesso

No Formspree:
1. Settings → After Submit
2. Escolha "Show a custom message"
3. Digite sua mensagem
4. Salve

### Adicionar Campos Extras

Se quiser capturar mais informações além do email:

1. Edite `js/form.js`
2. Adicione mais campos no FormData:
```javascript
formData.append('nome', nome);
formData.append('telefone', telefone);
```

### Exportar Dados

1. No Formspree, clique no seu form
2. Clique em **"Export"**
3. Escolha formato (CSV, JSON)
4. Download!

---

## 🆘 Problemas Comuns

### "Failed to fetch"

**Causa**: URL do Formspree incorreta

**Solução**:
1. Verifique se copiou o ID correto
2. Deve ser: `https://formspree.io/f/SEU_ID`
3. Não pode ter espaços ou caracteres extras

### Formulário envia mas não aparece no Formspree

**Causa**: Usando ID errado

**Solução**:
1. Faça login no Formspree
2. Copie o ID correto do seu form
3. Atualize `js/config.js`
4. Commit e push novamente

### "Email salvo! Entraremos em contato"

**Causa**: Webhook falhou, mas email foi salvo localmente

**Solução**:
1. Isso é um fallback (backup)
2. Verifique a URL do Formspree
3. Teste novamente após corrigir

Para recuperar emails salvos localmente:
```javascript
// No console do navegador (F12)
JSON.parse(localStorage.getItem('pleymus_emails'))
```

### GitHub Pages não atualizou

**Solução**:
1. Aguarde 2-3 minutos
2. Limpe cache do navegador (Ctrl+Shift+R)
3. Tente em aba anônima
4. Verifique se o commit foi feito

---

## 📊 Verificação Final

Execute este checklist:

```
✅ Conta criada no Formspree
✅ Form criado no Formspree
✅ Endpoint copiado corretamente
✅ js/config.js atualizado
✅ Commit feito
✅ Push enviado para GitHub
✅ GitHub Pages atualizou (aguardou 2 min)
✅ Site acessado
✅ Formulário testado
✅ Mensagem de sucesso apareceu
✅ Email apareceu no dashboard do Formspree
```

Se todos os itens estão ✅, parabéns! Está funcionando perfeitamente! 🎉

---

## 💡 Dicas

1. **Teste sempre** após fazer mudanças
2. **Aguarde** o deploy do GitHub Pages (1-2 min)
3. **Limpe cache** se não ver mudanças
4. **Use aba anônima** para testar sem cache
5. **Verifique console** (F12) se houver erros

---

## 📞 Suporte

- **Formspree**: https://help.formspree.io
- **GitHub Pages**: https://docs.github.com/pages
- **Este projeto**: Veja `GITHUB-PAGES-SETUP.md`

---

## 🎓 Aprendizado

Agora você sabe:
- ✅ Como usar Formspree
- ✅ Como configurar formulários em sites estáticos
- ✅ Como resolver problemas de CORS
- ✅ Como fazer deploy no GitHub Pages

---

**Parabéns! Seu formulário está funcionando!** 🎉

**Tempo gasto**: ~5 minutos  
**Dificuldade**: Fácil  
**Resultado**: Profissional ✨
