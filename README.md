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
- `src/styles/projects-motion.css`: galeria cinematográfica e visualização expandida dos projetos.
- `src/data/stack.js`: tecnologias, conexões, descrições e princípios exibidos na seção de stack.
- `src/components/stack/connection-path.js`: traçado das conexões no desktop e no fluxo vertical.
- `src/styles/stack-connections.css`: diagrama interativo, detalhes e responsividade da stack.
- `src/components/sections/Process.jsx`: conteúdo das três etapas e progresso da linha de processo.
- `src/styles/process-story.css`: apresentação da linha de processo, marcadores e comportamento responsivo.
- `scripts/generate-assets.mjs`: gera cinco imagens WebP e um GIF animado em `public/images/`, com `npm run assets`. Os arquivos já estão incluídos; não é necessário regenerá-los para executar ou compilar.

Os projetos exibidos são definidos em `src/data.js`, com descrições, tecnologias, funcionalidades e links próprios. O contato usa `mailto:` e a cópia do e-mail usa a Clipboard API, com aviso caso o navegador a bloqueie.

## Movimento e acessibilidade

- Abertura com parallax vinculado ao scroll.
- Texto da seção Sobre revelado progressivamente por palavra.
- Galeria sticky em desktop: o scroll vertical movimenta os projetos horizontalmente, sem capturar a roda do mouse. As imagens têm revelação por recorte e parallax interno; títulos, iluminação ambiente e indicadores individuais acompanham a posição da galeria.
- Detalhes dos projetos em diálogo nativo ampliado, com transição visual entre a imagem do card e a imagem do diálogo, retorno ao card ao fechar e navegação por teclado.
- Stack em diagrama interativo: React/TypeScript, API .NET, Entity Framework, banco relacional e Redis. As linhas se revelam na entrada da seção; hover e foco destacam as conexões imediatas. A seleção por clique, Enter ou espaço exibe o papel da tecnologia e exemplos dos projetos.
- Em telas de até 760 px, a stack segue um fluxo vertical com detalhes junto ao item selecionado. Os traçados são recalculados quando o layout, as fontes ou a seleção alteram a geometria. Docker, Git, Clean Architecture e SOLID aparecem como base da entrega.
- Os pulsos das conexões são curtos, acionados pela interação e pausados fora da tela. Com movimento reduzido, o diagrama permanece estático e todas as informações continuam disponíveis.
- Seção "Como eu penso" em uma lista vertical: a linha azul avança com a rolagem e os marcadores ganham destaque ao passar por 60% da altura da tela. Cada trecho acompanha a altura real da etapa, incluindo quebras de texto.
- O título do processo acompanha a leitura apenas em telas a partir de 1000 px de largura e 760 px de altura. Em telas menores, baixas ou com movimento reduzido, segue o fluxo normal. Os textos ficam sempre visíveis; a linha e os marcadores são estáticos para movimento reduzido.
- Entrada de conteúdo com Motion, respeitando a preferência de movimento reduzido.
- Menu móvel, link para pular ao conteúdo, foco visível e modal nativo com fechamento por Escape e retorno do foco.
- Em telas abaixo de 900 px, com altura inferior a 700 px ou com `prefers-reduced-motion`, os projetos seguem o fluxo normal da página. A transição do diálogo é desativada para movimento reduzido.
- As fontes usam Google Fonts com fallback local sans-serif; as imagens são locais.

Referência visual de scroll fornecida pelo usuário: https://freefrontend.com/css-scroll-effects/. A implementação e as artes foram produzidas para este projeto.

