# 🔗 Configuração do Webhook

Este guia explica como configurar o webhook para receber os emails cadastrados no formulário.

## 📋 O que é enviado?

Quando um usuário preenche o formulário, os seguintes dados são enviados via POST para o webhook:

```json
{
  "email": "usuario@exemplo.com",
  "timestamp": "2025-11-22T10:30:00.000Z",
  "page": "https://seu-site.com/",
  "userAgent": "Mozilla/5.0...",
  "source": "pleymus-landing-page",
  "campaign": "renan-sakata"
}
```

## 🛠️ Serviços Recomendados (Gratuitos)

### 1. **Make.com (Integromat)** ⭐ Recomendado
- Acesse: https://www.make.com
- Crie uma conta gratuita
- Crie um novo cenário
- Adicione um módulo "Webhooks" → "Custom webhook"
- Copie a URL gerada
- Cole no arquivo `js/config.js`

**Vantagens:**
- Interface visual
- Integra com Google Sheets, Email, CRM, etc.
- 1.000 operações/mês grátis

### 2. **Zapier**
- Acesse: https://zapier.com
- Crie um Zap
- Trigger: "Webhooks by Zapier" → "Catch Hook"
- Copie a URL do webhook
- Cole no arquivo `js/config.js`

**Vantagens:**
- Fácil de usar
- Muitas integrações
- 100 tarefas/mês grátis

### 3. **n8n** (Self-hosted)
- Acesse: https://n8n.io
- Instale localmente ou use n8n.cloud
- Crie um workflow com "Webhook" node
- Configure e copie a URL

**Vantagens:**
- Open source
- Controle total
- Sem limites (self-hosted)

### 4. **Webhook.site** (Para Testes)
- Acesse: https://webhook.site
- Copie a URL única gerada
- Use para testar o envio

**Vantagens:**
- Instantâneo
- Sem cadastro
- Perfeito para testes

## ⚙️ Como Configurar

### Passo 1: Escolha um serviço
Escolha um dos serviços acima e crie sua conta.

### Passo 2: Obtenha a URL do Webhook
Cada serviço fornecerá uma URL única, algo como:
```
https://hook.us1.make.com/abc123xyz
```

### Passo 3: Configure no projeto
Abra o arquivo `js/config.js` e substitua a URL:

```javascript
const CONFIG = {
    webhookURL: 'https://hook.us1.make.com/abc123xyz', // Cole sua URL aqui
    
    additionalData: {
        source: 'pleymus-landing-page',
        campaign: 'renan-sakata',
    }
};
```

### Passo 4: Teste
1. Abra o site no navegador
2. Preencha o formulário com um email de teste
3. Clique em enviar
4. Verifique se os dados chegaram no seu serviço

## 📊 Exemplos de Integração

### Enviar para Google Sheets (Make.com)

1. No Make.com, após o webhook, adicione:
   - Módulo: "Google Sheets" → "Add a Row"
2. Configure:
   - Spreadsheet: Sua planilha
   - Sheet: Nome da aba
   - Mapeie os campos: email, timestamp, etc.

### Enviar Email de Notificação

1. Adicione módulo de Email após o webhook
2. Configure:
   - Para: seu-email@exemplo.com
   - Assunto: "Novo cadastro: {{email}}"
   - Corpo: Use os dados recebidos

### Adicionar em CRM

1. Adicione módulo do seu CRM (HubSpot, Pipedrive, etc.)
2. Mapeie o email para criar um novo contato

## 🔒 Segurança

### CORS (Cross-Origin Resource Sharing)
Alguns webhooks podem bloquear requisições do navegador. Certifique-se de que o serviço aceita requisições CORS.

**Serviços que funcionam bem:**
- ✅ Make.com
- ✅ Zapier
- ✅ n8n
- ✅ Webhook.site

### Validação
O código já inclui:
- ✅ Validação de email no front-end
- ✅ Timestamp para rastreamento
- ✅ User agent para análise
- ✅ URL da página de origem

## 🐛 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se a URL do webhook está correta
- Confirme que o serviço aceita requisições CORS
- Teste a URL no Postman ou similar

### Erro: "Network error"
- Verifique sua conexão com internet
- Confirme que o serviço está online
- Tente usar webhook.site para testar

### Nenhum dado chega
- Abra o Console do navegador (F12)
- Verifique se há erros
- Confirme que o webhook está ativo no serviço

## 📱 Testando Localmente

Para testar localmente, você pode usar:

1. **Webhook.site** - Mais fácil
2. **ngrok** - Para expor localhost
3. **RequestBin** - Similar ao webhook.site

## 💡 Dicas

1. **Use webhook.site primeiro** para entender o formato dos dados
2. **Salve a URL do webhook** em local seguro
3. **Configure notificações** para saber quando alguém se cadastrar
4. **Faça backup** dos dados regularmente
5. **Monitore o limite** de requisições do plano gratuito

## 📞 Suporte

Se tiver problemas:
1. Verifique o console do navegador (F12)
2. Teste com webhook.site
3. Confirme que o arquivo config.js está carregando
4. Verifique se não há erros de digitação na URL

---

**Pronto!** Agora você pode receber todos os emails cadastrados no seu formulário. 🎉
