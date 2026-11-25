// Repertório do portfólio. As conexões ilustram os papéis das ferramentas,
// não uma arquitetura obrigatória para todos os projetos.
export const stackNodes = [
  {
    id: "interface",
    name: "React",
    subtitle: "TypeScript · Interface",
    category: "FRONTEND",
    heading: "A interface conversa com a API.",
    description: "Interfaces em React e TypeScript que transformam dados em telas e interações. As APIs REST conectam a experiência do usuário às regras da aplicação.",
    example: "Nos projetos: Orbis Commerce e Cat Meme AI usam React e TypeScript.",
  },
  {
    id: "backend",
    name: ".NET",
    subtitle: "C# · ASP.NET Core",
    category: "BACKEND",
    heading: "Backend é meu território.",
    description: "Regras de negócio em C# e APIs com ASP.NET Core. Uma camada que recebe as requisições, coordena o acesso aos dados e integra os serviços da aplicação.",
    example: "No Orbis Commerce: APIs REST e serviços organizados por responsabilidade.",
  },
  {
    id: "mapping",
    name: "Entity Framework",
    subtitle: "Acesso a dados · ORM",
    category: "PERSISTÊNCIA",
    heading: "Do modelo ao banco de dados.",
    description: "O Entity Framework Core conecta os modelos em C# à persistência relacional. Mapeamento, consultas e migrations acompanham a evolução da aplicação.",
    example: "No Orbis Commerce: persistência com Entity Framework Core e PostgreSQL.",
  },
  {
    id: "database",
    name: "PostgreSQL",
    subtitle: "ou SQL Server",
    category: "DADOS",
    heading: "Dados com estrutura e sentido.",
    description: "Modelagem relacional, consultas e integridade dos dados. PostgreSQL e SQL Server fazem parte do meu repertório; a escolha acompanha as necessidades de cada projeto.",
    example: "No Orbis Commerce: PostgreSQL para a persistência dos serviços.",
  },
  {
    id: "cache",
    name: "Redis",
    subtitle: "Cache conectado à API",
    category: "CACHE",
    heading: "A informação, no momento certo.",
    description: "Uma camada de cache para dados acessados com frequência. Redis se conecta à API e complementa o banco relacional conforme a estratégia da aplicação.",
    example: "No Orbis Commerce: cache distribuído com Redis para otimizar consultas.",
  },
];

export const stackConnections = [
  { id: "interface-api", from: "interface", to: "backend", label: "APIs REST" },
  { id: "api-mapping", from: "backend", to: "mapping", label: "Modelos e consultas" },
  { id: "mapping-database", from: "mapping", to: "database", label: "Persistência relacional" },
  { id: "api-cache", from: "backend", to: "cache", label: "Cache da aplicação" },
];

export const stackFoundations = [
  { name: "Clean Architecture", role: "Responsabilidades claras" },
  { name: "SOLID", role: "Código organizado" },
  { name: "Docker", role: "Ambientes consistentes" },
  { name: "Git", role: "Evolução versionada" },
];
