# Renan Sakata - Landing Page

Landing page profissional com slider de catálogo funcional.

## 📁 Estrutura do Projeto

```
.
├── index.html              # Página principal
├── css/
│   └── style.css          # Estilos da página
├── js/
│   ├── config.js          # Configurações (webhook URL)
│   ├── slider.js          # Funcionalidade do slider
│   └── form.js            # Envio de formulário via webhook
├── img/
│   └── README.md          # Instruções para imagens
├── README.md              # Este arquivo
└── WEBHOOK-SETUP.md       # Guia de configuração do webhook
```

## 🚀 Funcionalidades

- ✅ Layout responsivo
- ✅ Slider de catálogo funcional com navegação por setas
- ✅ Formulário com envio via webhook (100% front-end)
- ✅ Validação de email
- ✅ Mensagens de sucesso/erro
- ✅ Design moderno e clean
- ✅ Otimizado para performance
- ✅ Código organizado e modular
- ✅ Compatível com hospedagem estática

## 🎨 Características do Slider

- Navegação suave com animações
- Botões de navegação (anterior/próximo)
- Desabilita botões automaticamente nos limites
- Responsivo para mobile e desktop
- Suporta múltiplos cards

## 📱 Responsividade

- Desktop: Mostra 2 cards por vez
- Mobile: Mostra 1 card por vez
- Adaptação automática ao redimensionar a janela

## 🛠️ Como Usar

### Configuração Inicial

1. **Configure o Webhook (IMPORTANTE para GitHub Pages):**
   - ⚠️ Se usar GitHub Pages, leia: `GITHUB-PAGES-SETUP.md`
   - ✅ Recomendado: Use Formspree (https://formspree.io)
   - Abra o arquivo `js/config.js`
   - Substitua a URL do webhook
   - Veja o guia completo em `WEBHOOK-SETUP.md`

2. **Adicione suas imagens:**
   - Coloque a foto de perfil em `img/profile.png`

3. **Abra o site:**
   - Abra o arquivo `index.html` em um navegador
   - Ou faça deploy em qualquer hospedagem estática

### ⚠️ GitHub Pages

Se você hospedou no GitHub Pages e o formulário não funciona:

1. **Leia**: `GITHUB-PAGES-SETUP.md`
2. **Use Formspree**: Solução recomendada
3. **Ou configure CORS** no seu webhook

### Testando o Formulário

1. Configure Formspree (recomendado)
2. Ou use https://webhook.site para testes
3. Preencha o formulário no site
4. Verifique os envios

## 📝 Personalização

### Adicionar mais cards ao slider:

Edite o `index.html` e adicione novos cards dentro da `<div class="catalog-grid">`:

```html
<div class="catalog-card">
    <svg class="catalog-icon"><!-- seu ícone --></svg>
    <h3>Título do Card</h3>
    <p>Descrição do card</p>
    <a href="#" class="catalog-link">Link</a>
</div>
```

### Modificar cores:

Edite o arquivo `css/style.css` e altere as variáveis de cor:
- Cor principal: `#181A20`
- Cor de destaque: `#4A9EFF`
- Fundo: `#FFFFFF`

## 📦 Dependências

- Google Fonts (Inter e Poppins)
- Nenhuma biblioteca JavaScript externa necessária

## 🌐 Navegadores Suportados

- Chrome (recomendado)
- Firefox
- Safari
- Edge
- Opera

## 📄 Licença

Projeto desenvolvido para Renan Sakata.
