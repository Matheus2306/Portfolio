// Substitua pelos seus dados. null evita links e destinatários fictícios.
export const profile = {
  name: "Matheus Felipe Rodrigues",
  email: "math2306.r@gmail.com",
  github: "https://github.com/matheus2306",
  linkedin: "https://www.linkedin.com/in/matheus-felipe-rodrigues-6b4a6a33a/",
  role: "Desenvolvedor de software",
};

export const projects = [
  {
    id: "01",
    name: "Orbis Commerce",
    type: "FULL STACK • E-COMMERCE & MICROSSERVIÇOS",
    image: "/images/Orbis-commerce.webp",

    description:
      "Plataforma de gerenciamento de e-commerce desenvolvida com React, TypeScript e .NET, integrando catálogo de produtos, controle de estoque e processamento assíncrono de pedidos.",

    tags: [
      "React",
      "TypeScript",
      "Vite",
      ".NET",
      "PostgreSQL",
      "RabbitMQ",
      "Redis",
      "Docker",
    ],

    detail:
      "O Orbis Commerce é um projeto Full Stack desenvolvido com uma arquitetura baseada em microsserviços, separando as responsabilidades de catálogo, estoque e pedidos. O backend utiliza .NET e PostgreSQL, com Redis para otimização de consultas e RabbitMQ integrado ao MassTransit para comunicação assíncrona entre serviços. O frontend, desenvolvido com React, TypeScript e Vite, oferece um painel administrativo responsivo para gerenciamento de produtos, acompanhamento de estoque, criação de pedidos e visualização de indicadores operacionais. O projeto explora princípios de arquitetura limpa, desacoplamento, consistência de dados, testes automatizados e organização modular.",

    features: [
      "Arquitetura de microsserviços com .NET e APIs REST",
      "Painel administrativo responsivo com React, TypeScript e Vite",
      "Cadastro, pesquisa, ordenação e paginação de produtos",
      "Gerenciamento de estoque e acompanhamento de reservas",
      "Criação de pedidos com processamento assíncrono via RabbitMQ e MassTransit",
      "Cache distribuído com Redis para otimização de consultas",
      "Persistência de dados com PostgreSQL e Entity Framework Core",
      "Gerenciamento de estado remoto e cache com TanStack Query",
      "Integração entre frontend e múltiplos microsserviços",
      "Testes automatizados e infraestrutura conteinerizada com Docker",
    ],

    links: {
      github: "https://github.com/Matheus2306/Orbis-Commerce-react",
      deploy: "https://orbis-commerce-one.vercel.app/",
    },
  },
  {
    id: "02",
    name: "Blue Sentinel",
    type: "FRONT-END • TECNOLOGIA AMBIENTAL",
    image: "/images/blue-sentinel.webp",
    description:
      "Painel web para cadastrar e acompanhar drones de um projeto de coleta de resíduos em rios.",
    tags: ["React", "JavaScript", "Vite", "Bootstrap", "i18next", "API REST"],
    detail:
      "O Blue Sentinel organiza a gestão dos drones em uma interface web com login, cadastro, listagem por usuário e uma visão administrativa. O painel consome uma API para consultar e vincular dispositivos. A tela de câmera é demonstrativa e usa uma imagem estática, sem transmissão ao vivo.",
    features: [
      "Cadastro e vinculação de drones a usuários",
      "Listagem de drones do usuário autenticado",
      "Painel administrativo com busca de drones por usuário",
      "Internacionalização da interface com i18next",
      "Tela demonstrativa de câmera",
    ],
    links: {
      github: "https://github.com/Matheus2306/BlueSentinelVite",
      deploy: "https://bluesentinel.vercel.app/",
    },
  },
  {
    id: "03",
    name: "Cat Meme AI",
    type: "FRONT-END • VISÃO COMPUTACIONAL",
    image: "/images/cat-meme-ai.webp",
    description:
      "Aplicação que usa a câmera para identificar expressões faciais e associá-las a memes de gato no navegador.",
    tags: ["React", "TypeScript", "Vite", "MediaPipe", "Web APIs"],
    detail:
      "O Cat Meme AI processa quadros da câmera no navegador com o Face Landmarker do MediaPipe. Regras em TypeScript interpretam sinais como sorriso, abertura da boca e movimento das sobrancelhas e selecionam uma imagem de um catálogo de memes. É uma demonstração de visão computacional aplicada a uma interação, sem depender de IA generativa.",
    features: [
      "Captura de vídeo pela API de mídia do navegador",
      "Detecção facial em quadros de vídeo com MediaPipe",
      "Classificação de expressões com regras em TypeScript",
      "Seleção de memes de um catálogo predefinido",
      "Novo teste sem recarregar a página",
    ],
    links: {
      github: "https://github.com/Matheus2306/cat-meme-ai",
      deploy: "https://cat-meme-ai.vercel.app/",
    },
  },
  {
    id: "04",
    name: "Advocacia Brasil para Claude",
    type: "IA APLICADA • AUTOMAÇÃO JURÍDICA",
    image: "/images/advocacia-brasil-claude.webp",
    description:
      "Plugin com dez skills para apoiar pesquisa, redação, revisão e organização de tarefas jurídicas no Claude.",
    tags: ["Claude", "Agent Skills", "Python", "GitHub Actions", "Markdown"],
    detail:
      "O projeto reúne procedimentos estruturados para o cotidiano da advocacia brasileira, como organizar fatos e provas, pesquisar fontes, elaborar minutas e revisar documentos. O repositório inclui manifestos para instalação, guias de uso e uma rotina de CI para validar e empacotar a distribuição. As saídas são apoio ao trabalho e exigem revisão humana.",
    features: [
      "Dez skills especializadas com fluxos e checklists",
      "Pesquisa jurídica, triagem e organização de fatos e provas",
      "Apoio à elaboração e à revisão de minutas",
      "Modelo de organização de prazos e providências",
      "Validação e empacotamento automatizados com Python e GitHub Actions",
    ],
    links: {
      github: "https://github.com/Matheus2306/claude-advocacia-brasil",
      deploy: null,
    },
  },
  {
    id: "05",
    name: "IoT Dashboard",
    type: "FRONT-END • INTERNET DAS COISAS",
    image: "/images/iot-dashboard.webp",
    description:
      "Painel de automação residencial que recebe dados de temperatura e umidade e envia comandos de iluminação via MQTT.",
    tags: ["React", "JavaScript", "Vite", "MQTT", "WebSocket", "Bootstrap"],
    detail:
      "O painel conecta o navegador a um broker MQTT por WebSocket para receber leituras de sensores e publicar comandos de iluminação. A interface organiza os controles por cômodo e atualiza os estados quando recebe mensagens do broker. A demonstração dos dispositivos depende de o broker e os equipamentos estarem disponíveis.",
    features: [
      "Leitura de temperatura e umidade",
      "Interface para sala, quarto e garagem",
      "Envio de comandos de iluminação por tópicos MQTT",
      "Atualização do estado das luzes a partir de mensagens recebidas",
      "Reconexão ao broker após falhas de conexão",
    ],
    links: {
      github: "https://github.com/Matheus2306/IoT-Dashboard",
      deploy: "https://dashboard-liard-zeta.vercel.app/",
    },
  },
  {
    id: "06",
    name: "Oblivio: Ficha de RPG",
    type: "FRONT-END • REFATORAÇÃO E ORGANIZAÇÃO DE CÓDIGO",
    image: "/images/oblivio-ficha-rpg.webp",
    description:
      "Refatoração de uma ficha digital de RPG, com JavaScript modular para combate, inventário, dados e persistência.",
    tags: ["JavaScript", "HTML", "CSS", "LocalStorage"],
    detail:
      "A partir da ficha original FICHA_OBLIVIO, o projeto separa o código por contexto e preserva a navegação da aplicação existente. Personagem, regras, inventário, combate e rolagens passam a ter módulos próprios. As fichas são armazenadas no navegador e podem ser transferidas por backup em JSON. É uma ficha local, não um servidor multiplayer.",
    features: [
      "Refatoração de JavaScript por domínio de responsabilidade",
      "Gestão de personagem, equipamentos e anotações",
      "Rolagem de dados, histórico e macros",
      "Controles de combate e estresse",
      "Salvamento local e backup em JSON",
    ],
    links: {
      github: "https://github.com/Matheus2306/RPG_online",
      deploy: null,
    },
  },
];
