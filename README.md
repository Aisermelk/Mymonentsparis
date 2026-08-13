# Moments Paris — Landing Page (Plano de Carreira)

Landing page em HTML5 + CSS3 + JavaScript puro, focada em levar o visitante ao WhatsApp para conhecer o Plano de Carreira.

## Estrutura

```
moments-paris/
├── index.html          → página principal
├── privacidade.html     → política de privacidade (conteúdo neutro, editar)
├── termos.html          → termos de uso (conteúdo neutro, editar)
├── css/style.css        → todo o design (tokens de cor no topo do arquivo)
├── js/script.js         → menu mobile, animações e ano do rodapé
└── assets/
    ├── images/          → pasta reservada para fotos reais da marca
    └── icons/favicon.svg
```

## O que editar antes de publicar

1. **Imagens reais**: não foram inseridas fotos de banco de imagens (evitado por não haver fonte licenciada confirmada). Adicione fotos da marca em `assets/images/` e referencie no `index.html` onde achar melhor complementar o hero.
2. **Redes sociais**: os links do rodapé em `index.html` usam `@aisermelquisedec` como usuário em Instagram, Facebook e TikTok — ajuste as URLs conforme as contas oficiais.
3. **WhatsApp**: número `+55 54 99267-46196` já configurado em todos os CTAs, com mensagens automáticas diferentes por botão (editável direto no `href` de cada link, parâmetro `?text=`).
4. **Textos legais**: `privacidade.html` e `termos.html` têm conteúdo neutro/placeholder — substitua pelo texto oficial da empresa.
5. **Cores e fontes**: tokens de design no topo do `css/style.css` (`:root`), fáceis de ajustar sem tocar no restante do CSS.

## Deploy (GitHub + Cloudflare Pages)

1. Suba esta pasta para um repositório no GitHub.
2. No Cloudflare Pages, conecte o repositório.
3. Build command: (nenhum — site estático)
4. Output directory: `/` (raiz do projeto)
