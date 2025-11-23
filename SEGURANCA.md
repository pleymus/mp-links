# 🔒 Guia de Segurança - Webhook e Formulário

## ✅ Camadas de Segurança Implementadas

### 1. Rate Limiting ⏱️
**O que faz:** Limita tentativas de envio

**Configuração:**
- Máximo: 3 tentativas por minuto
- Bloqueio: 5 minutos após exceder limite
- Armazenamento: localStorage

**Proteção contra:**
- ✅ Spam
- ✅ Ataques de força bruta
- ✅ Bots maliciosos

---

### 2. Honeypot 🍯
**O que faz:** Campo invisível que detecta bots

**Como funciona:**
- Campo oculto adicionado ao formulário
- Humanos não veem/preenchem
- Bots preenchem automaticamente
- Envio bloqueado se preenchido

**Proteção contra:**
- ✅ Bots automatizados
- ✅ Scrapers
- ✅ Spam bots

---

### 3. Timestamp Validation ⏰
**O que faz:** Valida tempo de preenchimento

**Como funciona:**
- Marca tempo de carregamento da página
- Bloqueia se preenchido < 2 segundos
- Previne preenchimento automático

**Proteção contra:**
- ✅ Bots rápidos
- ✅ Scripts automatizados
- ✅ Replay attacks

---

### 4. Input Sanitization 🧹
**O que faz:** Limpa dados de entrada

**Como funciona:**
- Remove tags HTML
- Remove scripts
- Remove caracteres perigosos
- Trim de espaços

**Proteção contra:**
- ✅ XSS (Cross-Site Scripting)
- ✅ Injeção de código
- ✅ HTML injection

---

### 5. Origin Validation 🌐
**O que faz:** Valida origem da requisição

**Origens permitidas:**
- ✅ github.io
- ✅ localhost
- ✅ 127.0.0.1

**Proteção contra:**
- ✅ Requisições de outros sites
- ✅ Hotlinking
- ✅ Uso não autorizado

---

### 6. Security Headers 📋
**O que faz:** Adiciona headers de segurança

**Headers enviados:**
```javascript
{
  'X-Requested-With': 'XMLHttpRequest',
  'X-Form-Token': 'token_unico',
  'X-Timestamp': '1234567890',
  'X-Origin': 'https://seu-site.com'
}
```

**Proteção contra:**
- ✅ CSRF (Cross-Site Request Forgery)
- ✅ Requisições falsas
- ✅ Replay attacks

---

### 7. Token Generation 🎫
**O que faz:** Gera token único por requisição

**Como funciona:**
- Timestamp + Random
- Base64 encoded
- Único por envio

**Proteção contra:**
- ✅ Replay attacks
- ✅ Requisições duplicadas
- ✅ Man-in-the-middle

---

## 🛡️ Proteção do Webhook

### No Lado do Cliente (Implementado)

1. ✅ **Rate Limiting** - Limita tentativas
2. ✅ **Honeypot** - Detecta bots
3. ✅ **Sanitização** - Limpa inputs
4. ✅ **Validação** - Verifica origem
5. ✅ **Headers** - Adiciona segurança

### No Lado do Servidor (Recomendado)

Configure no seu webhook (n8n, Formspree, etc):

#### 1. Validar Headers
```javascript
// No n8n ou webhook
if (!headers['x-form-token']) {
  return { error: 'Token inválido' };
}
```

#### 2. Validar Timestamp
```javascript
const timestamp = parseInt(headers['x-timestamp']);
const now = Date.now();
const diff = now - timestamp;

// Rejeita se > 5 minutos
if (diff > 300000) {
  return { error: 'Requisição expirada' };
}
```

#### 3. Validar Origem
```javascript
const allowedOrigins = ['github.io', 'seu-dominio.com'];
const origin = headers['x-origin'];

if (!allowedOrigins.some(o => origin.includes(o))) {
  return { error: 'Origem não autorizada' };
}
```

#### 4. Rate Limiting no Servidor
```javascript
// Implementar rate limiting por IP
// Máximo 10 requisições por hora por IP
```

---

## 🔐 Proteção do Código no GitHub

### O Que NÃO Fazer ❌

- ❌ Colocar API keys no código
- ❌ Colocar senhas no código
- ❌ Colocar tokens secretos
- ❌ Colocar credenciais

### O Que Fazer ✅

1. **Use Serviços de Terceiros**
   - Formspree (recomendado)
   - n8n com autenticação
   - Zapier
   - Make.com

2. **Webhook Público é OK**
   - URL do webhook pode ser pública
   - Proteção está nas validações
   - Servidor deve validar requisições

3. **Ofusque Informações Sensíveis**
   - Use variáveis de ambiente (se possível)
   - Não exponha lógica de negócio crítica
   - Mantenha validações no servidor

---

## 📊 Monitoramento

### Logs de Segurança

O sistema registra no console:

```javascript
🔒 Security Layer ativado
🚨 Bot detectado via honeypot
🚨 Comportamento suspeito detectado
🚨 Origem não autorizada
⚠️ Limite de tentativas excedido
```

### Verificar Tentativas Bloqueadas

No console do navegador (F12):

```javascript
// Ver tentativas registradas
JSON.parse(localStorage.getItem('form_attempts'))

// Limpar tentativas (para testes)
localStorage.removeItem('form_attempts')
```

---

## 🧪 Testar Segurança

### Teste 1: Rate Limiting

1. Envie formulário 3 vezes rapidamente
2. Na 4ª tentativa deve bloquear
3. Aguarde 1 minuto
4. Deve permitir novamente

### Teste 2: Honeypot

1. Abra console (F12)
2. Digite:
```javascript
document.getElementById('website').value = 'bot';
```
3. Envie formulário
4. Deve bloquear

### Teste 3: Timestamp

1. Abra página
2. Preencha e envie em < 2 segundos
3. Deve bloquear

### Teste 4: Sanitização

1. Digite no nome: `<script>alert('xss')</script>`
2. Envie formulário
3. Script deve ser removido

---

## 🔧 Configuração Avançada

### Ajustar Rate Limiting

Em `js/security.js`, linha 7:

```javascript
const RATE_LIMIT = {
    maxAttempts: 3,        // Mude para 5, 10, etc
    timeWindow: 60000,     // 1 minuto (em ms)
    blockDuration: 300000  // 5 minutos (em ms)
};
```

### Adicionar Mais Origens Permitidas

Em `js/security.js`, linha 107:

```javascript
const allowedOrigins = [
    'github.io',
    'localhost',
    '127.0.0.1',
    'seu-dominio.com'  // Adicione aqui
];
```

### Ajustar Tempo Mínimo de Preenchimento

Em `js/security.js`, linha 85:

```javascript
if (timeSinceLoad < 2000) {  // Mude para 3000, 5000, etc
```

---

## 📈 Níveis de Segurança

### Nível 1: Básico (Atual) ✅
- Rate limiting
- Honeypot
- Sanitização
- Validação de origem

### Nível 2: Intermediário (Recomendado)
- Tudo do Nível 1 +
- Validação no servidor
- Rate limiting por IP
- Logs de tentativas

### Nível 3: Avançado
- Tudo do Nível 2 +
- reCAPTCHA
- 2FA para ações críticas
- WAF (Web Application Firewall)
- Monitoramento em tempo real

---

## ⚠️ Limitações

### O Que Esta Segurança NÃO Protege

- ❌ Ataques DDoS massivos
- ❌ Bots muito sofisticados
- ❌ Ataques coordenados
- ❌ Vulnerabilidades do servidor

### Recomendações Adicionais

1. **Use Formspree ou similar**
   - Já tem proteção integrada
   - Rate limiting no servidor
   - Spam protection

2. **Configure CORS no webhook**
   - Limite origens permitidas
   - Valide headers

3. **Monitore regularmente**
   - Verifique logs
   - Analise tentativas bloqueadas
   - Ajuste configurações

---

## 🎯 Checklist de Segurança

- [x] Rate limiting implementado
- [x] Honeypot adicionado
- [x] Sanitização de inputs
- [x] Validação de origem
- [x] Security headers
- [x] Token generation
- [x] Timestamp validation
- [ ] Validação no servidor (configure no webhook)
- [ ] Rate limiting por IP (configure no webhook)
- [ ] Logs de segurança (configure no webhook)

---

## 🆘 Suporte

Se detectar tentativas de ataque:

1. Verifique logs no console
2. Analise localStorage
3. Ajuste configurações de rate limiting
4. Configure validações no servidor
5. Considere adicionar reCAPTCHA

---

**Segurança é um processo contínuo. Monitore e ajuste conforme necessário!** 🔒
