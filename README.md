# Matheus Rodrigues · Backend .NET

Landing page em React, Vite, Tailwind CSS v4, Motion e Lucide. Paleta preta com azul elétrico, tipografia DM Sans / Space Grotesk e artes originais geradas por código.

## Executar

Requer Node.js 20.19+ ou 22.12+.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

O resultado de produção é a pasta `dist/`. Pode ser servido por qualquer hospedagem estática.

## Personalizar

### Prévia de compartilhamento

O `index.html` inclui Open Graph e Twitter Card no HTML inicial, com URLs absolutas para `https://matheusfrodrigues.vercel.app/`. A imagem `public/images/social-preview.png` tem 1200 × 630 pixels e acompanha a identidade visual do portfólio. O SVG também fica disponível para edição.

Para recriar a arte, edite `scripts/generate-social-preview.mjs` e execute `npm run assets:social`. Depois execute `npm run build` e publique `dist/` na hospedagem. Se o domínio mudar, atualize as URLs no `index.html` e o endereço na arte. Aplicativos de mensagens podem manter a prévia anterior em cache; a apresentação final depende do aplicativo.

- `src/data.js`: nome, e-mail, GitHub, LinkedIn e conteúdo dos projetos. Para habilitar o LinkedIn no rodapé, substitua `null` pela URL completa.
- `src/App.jsx`: composição da página, com as seções na ordem de apresentação.
- `src/components/layout/`: cabeçalho, navegação e rodapé.
- `src/components/sections/`: apresentação, sobre, projetos, tecnologias, processo e contato. A seção de projetos controla a seleção e a abertura do modal.
- `src/components/projects/`: card de projeto e modal de detalhes.
- `src/components/ui/`: animação de entrada, revelação de palavras e barra de progresso da leitura.
- `src/styles.css`: paleta, tipografia, responsividade e efeitos.
- `scripts/generate-assets.mjs`: gera cinco imagens WebP e um GIF animado em `public/images/`, com `npm run assets`. Os arquivos já estão incluídos; não é necessário regenerá-los para executar ou compilar.

Os projetos Nexus API, Pulse Monitor e Flow Engine são **conceitos demonstrativos**, identificados na interface, e não representam trabalhos reais de Matheus. Substitua-os pelos seus projetos e links quando disponíveis. O contato usa `mailto:` e a cópia do e-mail usa a Clipboard API, com aviso caso o navegador a bloqueie.

## Movimento e acessibilidade

- Abertura com parallax vinculado ao scroll.
- Texto da seção Sobre revelado progressivamente por palavra.
- Galeria sticky em desktop: o scroll vertical movimenta os projetos horizontalmente, sem capturar a roda do mouse.
- Coluna lateral fixa na seção de tecnologias.
- Entrada de conteúdo com Motion e perspectiva 3D com blur progressivo via CSS quando há suporte a `animation-timeline`.
- Menu móvel, link para pular ao conteúdo, foco visível e modal nativo com fechamento por Escape e retorno do foco.
- Em telas abaixo de 900 px e com `prefers-reduced-motion`, os projetos seguem o fluxo vertical. O GIF é substituído por um WebP estático para movimento reduzido.
- As fontes usam Google Fonts com fallback local sans-serif; as imagens são locais.

Referência visual de scroll fornecida pelo usuário: https://freefrontend.com/css-scroll-effects/. A implementação e as artes foram produzidas para este projeto.
