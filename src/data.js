// Substitua pelos seus dados. null evita links e destinatários fictícios.
export const profile = {
  name: 'Matheus Felipe Rodrigues',
  email: 'math2306.r@gmail.com',
  github: 'https://github.com/matheus2306',
  linkedin: null,
  role: 'Desenvolvedor de software',
};

export const projects = [
  {
    id: '01', name: 'Nexus API', type: 'COMMERCE & INTEGRAÇÕES', image: '/images/nexus.webp',
    description: 'O motor por trás de uma experiência de compra fluida.',
    tags: ['.NET', 'PostgreSQL', 'Redis'],
    detail: 'Conceito de uma API de e-commerce com catálogo, carrinho e processamento de pedidos. A proposta organiza o domínio em módulos e usa cache para acelerar consultas frequentes.',
    features: ['API REST com documentação OpenAPI', 'Arquitetura modular orientada ao domínio', 'Cache de catálogo e processamento assíncrono'],
  },
  {
    id: '02', name: 'Pulse Monitor', type: 'OBSERVABILIDADE & DADOS', image: '/images/pulse.webp',
    description: 'Sistemas saudáveis começam com visibilidade.',
    tags: ['ASP.NET Core', 'SignalR', 'Docker'],
    detail: 'Conceito de uma plataforma de monitoramento de serviços. Um painel recebe atualizações em tempo real e organiza métricas, verificações de disponibilidade e eventos.',
    features: ['Atualizações em tempo real com SignalR', 'Health checks de serviços', 'Ambiente reproduzível com Docker'],
  },
  {
    id: '03', name: 'Flow Engine', type: 'ARQUITETURA & AUTOMAÇÃO', image: '/images/flow.webp',
    description: 'Conectando serviços. Simplificando processos.',
    tags: ['C#', 'RabbitMQ', 'Clean Architecture'],
    detail: 'Conceito de um orquestrador de tarefas orientado a eventos. A proposta desacopla serviços por mensageria e organiza regras de negócio em camadas independentes.',
    features: ['Mensageria assíncrona com RabbitMQ', 'Políticas de retry e idempotência', 'Separação de domínio e infraestrutura'],
  },
];
