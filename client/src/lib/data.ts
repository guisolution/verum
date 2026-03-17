// ============================================================
// Verum Cursos — Dados de Cursos e Blog
// Design: Prestige Academy Refinado
// Paleta: #0D2B55 (azul marinho) + #C9A227 (dourado) + #F5F0E8 (creme)
// ============================================================

export type Category = "tecnologia" | "idiomas" | "corporativo";
export type Level = "Iniciante" | "Intermediário" | "Avançado";
export type Niche =
  | "programacao"
  | "dados"
  | "web"
  | "ingles"
  | "espanhol"
  | "lideranca"
  | "produtividade"
  | "comunicacao"
  | "gestao";

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Category;
  niche: Niche;
  level: Level;
  duration: string;
  rating: number;
  students: number;
  price: number;
  originalPrice: number;
  instructor: string;
  platform: "Hotmart" | "Udemy" | "Coursera" | "Alura";
  affiliateUrl: string;
  image: string;
  tags: string[];
  benefits: string[];
  recommended: boolean;
  featured: boolean;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export const courses: Course[] = [
  // ─── TECNOLOGIA — PROGRAMAÇÃO ───────────────────────────────
  {
    id: "python-do-zero",
    title: "Python do Zero ao Avançado",
    description:
      "Aprenda Python do absoluto zero e domine a linguagem mais popular do mundo para automação, dados e IA.",
    longDescription:
      "Este curso completo de Python cobre desde a instalação do ambiente até conceitos avançados como programação orientada a objetos, manipulação de arquivos, APIs REST e introdução ao machine learning. Ideal para quem quer entrar no mercado de tecnologia ou ampliar suas habilidades de programação.",
    category: "tecnologia",
    niche: "programacao",
    level: "Iniciante",
    duration: "42h",
    rating: 4.9,
    students: 18420,
    price: 197,
    originalPrice: 497,
    instructor: "Carlos Mendes",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/python-zero-avancado",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&q=80",
    tags: ["Python", "Programação", "Automação", "Back-end"],
    benefits: [
      "Certificado de conclusão",
      "Acesso vitalício",
      "Projetos práticos reais",
      "Suporte da comunidade",
      "Atualizações gratuitas",
    ],
    recommended: true,
    featured: true,
    badge: "Mais Vendido",
  },
  {
    id: "javascript-moderno",
    title: "JavaScript Moderno: ES6 ao React",
    description:
      "Domine o JavaScript moderno e construa aplicações web profissionais com React, Hooks e APIs.",
    longDescription:
      "Curso completo que vai do JavaScript moderno (ES6+) ao desenvolvimento de aplicações React completas. Você aprenderá sobre promises, async/await, módulos, componentes funcionais, hooks, gerenciamento de estado e integração com APIs REST.",
    category: "tecnologia",
    niche: "web",
    level: "Intermediário",
    duration: "56h",
    rating: 4.8,
    students: 22100,
    price: 247,
    originalPrice: 597,
    instructor: "Ana Paula Ferreira",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/javascript-moderno-react",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80",
    tags: ["JavaScript", "React", "Front-end", "Web"],
    benefits: [
      "Certificado de conclusão",
      "Projetos para portfólio",
      "Mentoria em grupo",
      "Acesso vitalício",
    ],
    recommended: true,
    featured: true,
    badge: "Destaque",
  },
  {
    id: "analise-dados-python",
    title: "Análise de Dados com Python e Power BI",
    description:
      "Transforme dados brutos em insights poderosos usando Python, Pandas, NumPy e Power BI.",
    longDescription:
      "Aprenda a coletar, limpar, analisar e visualizar dados usando as ferramentas mais demandadas pelo mercado. O curso cobre Python com Pandas e NumPy, visualizações com Matplotlib e Seaborn, e criação de dashboards profissionais no Power BI.",
    category: "tecnologia",
    niche: "dados",
    level: "Intermediário",
    duration: "38h",
    rating: 4.7,
    students: 9850,
    price: 297,
    originalPrice: 697,
    instructor: "Rafael Costa",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/analise-dados-python-powerbi",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    tags: ["Python", "Power BI", "Dados", "Analytics"],
    benefits: [
      "Datasets reais para praticar",
      "Certificado reconhecido",
      "Acesso vitalício",
      "Projetos de portfólio",
    ],
    recommended: true,
    featured: false,
    badge: "Novo",
  },
  {
    id: "dev-web-fullstack",
    title: "Desenvolvimento Web Full Stack",
    description:
      "Torne-se um desenvolvedor Full Stack dominando HTML, CSS, Node.js, React e banco de dados.",
    longDescription:
      "Curso completo de desenvolvimento web que cobre todo o stack: HTML5, CSS3, JavaScript, Node.js, Express, React, PostgreSQL e deploy em produção. Ao final, você terá um portfólio completo com projetos reais.",
    category: "tecnologia",
    niche: "web",
    level: "Iniciante",
    duration: "120h",
    rating: 4.8,
    students: 31200,
    price: 397,
    originalPrice: 997,
    instructor: "Marcos Oliveira",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/dev-web-fullstack",
    image:
      "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=600&q=80",
    tags: ["Full Stack", "React", "Node.js", "Web"],
    benefits: [
      "Certificado de conclusão",
      "Acesso vitalício",
      "Projetos reais",
      "Comunidade exclusiva",
      "Mentoria ao vivo",
    ],
    recommended: false,
    featured: true,
  },
  {
    id: "sql-banco-dados",
    title: "SQL e Banco de Dados do Zero",
    description:
      "Aprenda SQL e banco de dados relacionais do zero e seja um profissional de dados completo.",
    longDescription:
      "Curso completo de SQL cobrindo desde os fundamentos até consultas avançadas, otimização de queries, modelagem de dados e administração de bancos de dados MySQL e PostgreSQL.",
    category: "tecnologia",
    niche: "dados",
    level: "Iniciante",
    duration: "28h",
    rating: 4.6,
    students: 7300,
    price: 147,
    originalPrice: 397,
    instructor: "Juliana Santos",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/sql-banco-dados",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
    tags: ["SQL", "MySQL", "PostgreSQL", "Dados"],
    benefits: [
      "Certificado de conclusão",
      "Exercícios práticos",
      "Acesso vitalício",
    ],
    recommended: false,
    featured: false,
  },

  // ─── IDIOMAS ────────────────────────────────────────────────
  {
    id: "ingles-fluente",
    title: "Inglês Fluente para Profissionais",
    description:
      "Alcance a fluência no inglês com método comprovado focado em comunicação profissional e negócios.",
    longDescription:
      "Método exclusivo para profissionais que precisam usar o inglês no trabalho. Foco em conversação, e-mails corporativos, reuniões, apresentações e vocabulário técnico. Inclui aulas ao vivo semanais e prática com nativos.",
    category: "idiomas",
    niche: "ingles",
    level: "Intermediário",
    duration: "80h",
    rating: 4.9,
    students: 45600,
    price: 297,
    originalPrice: 797,
    instructor: "Sarah Johnson",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/ingles-fluente-profissionais",
    image:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
    tags: ["Inglês", "Fluência", "Negócios", "Conversação"],
    benefits: [
      "Aulas ao vivo semanais",
      "Prática com nativos",
      "Certificado internacional",
      "Acesso vitalício",
      "Material exclusivo",
    ],
    recommended: true,
    featured: true,
    badge: "Mais Vendido",
  },
  {
    id: "ingles-iniciante",
    title: "Inglês do Zero: Método Acelerado",
    description:
      "Aprenda inglês do zero em tempo recorde com o método mais eficiente do mercado.",
    longDescription:
      "Curso estruturado para quem nunca estudou inglês ou tem conhecimento básico. O método acelerado usa técnicas de memorização, imersão e prática constante para acelerar seu aprendizado.",
    category: "idiomas",
    niche: "ingles",
    level: "Iniciante",
    duration: "60h",
    rating: 4.7,
    students: 28900,
    price: 197,
    originalPrice: 497,
    instructor: "Michael Brown",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/ingles-zero-acelerado",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    tags: ["Inglês", "Iniciante", "Método", "Acelerado"],
    benefits: [
      "Método exclusivo",
      "Acesso vitalício",
      "Suporte diário",
      "Certificado de conclusão",
    ],
    recommended: false,
    featured: false,
  },
  {
    id: "espanhol-completo",
    title: "Espanhol Completo: do Zero à Fluência",
    description:
      "Aprenda espanhol de forma rápida e eficiente com foco em comunicação real e cultura hispânica.",
    longDescription:
      "Curso completo de espanhol que vai do nível básico ao avançado. Inclui gramática, vocabulário, conversação, compreensão auditiva e escrita. Foco especial no espanhol para negócios e viagens.",
    category: "idiomas",
    niche: "espanhol",
    level: "Iniciante",
    duration: "70h",
    rating: 4.8,
    students: 19400,
    price: 247,
    originalPrice: 597,
    instructor: "María García",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/espanhol-completo-fluencia",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&q=80",
    tags: ["Espanhol", "Fluência", "Cultura", "Negócios"],
    benefits: [
      "Aulas com nativos",
      "Material de apoio",
      "Certificado de conclusão",
      "Acesso vitalício",
    ],
    recommended: true,
    featured: true,
    badge: "Destaque",
  },
  {
    id: "espanhol-negocios",
    title: "Espanhol para Negócios",
    description:
      "Domine o espanhol corporativo e expanda seus negócios para o mercado latino-americano.",
    longDescription:
      "Curso focado no espanhol para o ambiente corporativo. Aprenda a conduzir reuniões, negociar contratos, escrever e-mails formais e fazer apresentações em espanhol com confiança.",
    category: "idiomas",
    niche: "espanhol",
    level: "Intermediário",
    duration: "40h",
    rating: 4.6,
    students: 8200,
    price: 197,
    originalPrice: 447,
    instructor: "Carlos Rodríguez",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/espanhol-negocios",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    tags: ["Espanhol", "Negócios", "Corporativo", "Mercado"],
    benefits: [
      "Simulações de reuniões",
      "Material corporativo",
      "Certificado de conclusão",
    ],
    recommended: false,
    featured: false,
  },

  // ─── HABILIDADES CORPORATIVAS ───────────────────────────────
  {
    id: "lideranca-alta-performance",
    title: "Liderança de Alta Performance",
    description:
      "Desenvolva as competências essenciais para liderar equipes de alta performance e alcançar resultados extraordinários.",
    longDescription:
      "Curso completo de liderança que aborda inteligência emocional, comunicação assertiva, gestão de conflitos, delegação eficaz, feedback construtivo e como inspirar equipes a alcançarem seu máximo potencial.",
    category: "corporativo",
    niche: "lideranca",
    level: "Intermediário",
    duration: "32h",
    rating: 4.9,
    students: 12800,
    price: 347,
    originalPrice: 797,
    instructor: "Roberto Alves",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/lideranca-alta-performance",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    tags: ["Liderança", "Gestão", "Equipes", "Performance"],
    benefits: [
      "Ferramentas práticas de liderança",
      "Estudos de caso reais",
      "Certificado de conclusão",
      "Acesso vitalício",
      "Comunidade de líderes",
    ],
    recommended: true,
    featured: true,
    badge: "Mais Vendido",
  },
  {
    id: "comunicacao-assertiva",
    title: "Comunicação Assertiva e Oratória",
    description:
      "Desenvolva sua capacidade de comunicação, fale em público com confiança e influencie pessoas.",
    longDescription:
      "Aprenda técnicas de oratória, comunicação não-verbal, escuta ativa, persuasão ética e como estruturar mensagens claras e impactantes. Ideal para profissionais que precisam apresentar ideias, liderar reuniões ou falar em público.",
    category: "corporativo",
    niche: "comunicacao",
    level: "Iniciante",
    duration: "24h",
    rating: 4.8,
    students: 21500,
    price: 247,
    originalPrice: 597,
    instructor: "Fernanda Lima",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/comunicacao-assertiva-oratoria",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&q=80",
    tags: ["Comunicação", "Oratória", "Persuasão", "Apresentação"],
    benefits: [
      "Exercícios práticos gravados",
      "Feedback personalizado",
      "Certificado de conclusão",
      "Acesso vitalício",
    ],
    recommended: true,
    featured: true,
    badge: "Destaque",
  },
  {
    id: "produtividade-maxima",
    title: "Produtividade Máxima: GTD e Deep Work",
    description:
      "Multiplique sua produtividade com os métodos GTD, Deep Work, Pomodoro e gestão de tempo avançada.",
    longDescription:
      "Curso prático que ensina os melhores sistemas de produtividade do mundo: Getting Things Done (GTD), Deep Work de Cal Newport, técnica Pomodoro, Eisenhower Matrix e como criar um sistema pessoal de organização e foco.",
    category: "corporativo",
    niche: "produtividade",
    level: "Iniciante",
    duration: "18h",
    rating: 4.7,
    students: 16700,
    price: 147,
    originalPrice: 347,
    instructor: "Thiago Mendonça",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/produtividade-maxima-gtd",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&q=80",
    tags: ["Produtividade", "GTD", "Foco", "Gestão do Tempo"],
    benefits: [
      "Templates e planilhas",
      "Checklist de implementação",
      "Certificado de conclusão",
      "Acesso vitalício",
    ],
    recommended: false,
    featured: false,
  },
  {
    id: "gestao-projetos-agil",
    title: "Gestão de Projetos Ágeis com Scrum",
    description:
      "Domine o Scrum e as metodologias ágeis para gerenciar projetos com eficiência e entregar mais valor.",
    longDescription:
      "Curso completo de gestão de projetos ágeis cobrindo Scrum, Kanban, OKRs e ferramentas como Jira e Trello. Prepare-se para a certificação PSM I e aprenda a aplicar metodologias ágeis em qualquer contexto organizacional.",
    category: "corporativo",
    niche: "gestao",
    level: "Intermediário",
    duration: "36h",
    rating: 4.8,
    students: 9600,
    price: 297,
    originalPrice: 697,
    instructor: "Paulo Rodrigues",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/gestao-projetos-ageis-scrum",
    image:
      "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    tags: ["Scrum", "Ágil", "Gestão", "Projetos"],
    benefits: [
      "Preparação para certificação",
      "Simulados inclusos",
      "Certificado de conclusão",
      "Acesso vitalício",
    ],
    recommended: true,
    featured: false,
    badge: "Novo",
  },
  {
    id: "inteligencia-emocional",
    title: "Inteligência Emocional no Trabalho",
    description:
      "Desenvolva sua inteligência emocional e transforme suas relações profissionais e resultados.",
    longDescription:
      "Baseado nas pesquisas de Daniel Goleman, este curso ensina como identificar e gerenciar emoções, desenvolver empatia, melhorar relacionamentos interpessoais e usar a inteligência emocional para tomar melhores decisões no trabalho.",
    category: "corporativo",
    niche: "lideranca",
    level: "Iniciante",
    duration: "20h",
    rating: 4.9,
    students: 14200,
    price: 197,
    originalPrice: 447,
    instructor: "Camila Nunes",
    platform: "Hotmart",
    affiliateUrl: "https://hotmart.com/product/inteligencia-emocional-trabalho",
    image:
      "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&q=80",
    tags: ["IE", "Emoções", "Relacionamentos", "Autoconhecimento"],
    benefits: [
      "Avaliação de IE incluída",
      "Exercícios de autoconhecimento",
      "Certificado de conclusão",
      "Acesso vitalício",
    ],
    recommended: false,
    featured: false,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "como-escolher-curso-online",
    title: "Como Escolher o Curso Online Certo para Sua Carreira",
    excerpt:
      "Descubra os critérios essenciais para avaliar cursos online e investir no que realmente vai impulsionar sua carreira profissional.",
    content: "",
    category: "Carreira",
    author: "Equipe Verum",
    date: "2026-03-05",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
    tags: ["Carreira", "Educação Online", "Dicas"],
  },
  {
    id: "habilidades-mais-valorizadas-2026",
    title: "As 10 Habilidades Mais Valorizadas pelo Mercado em 2026",
    excerpt:
      "O mercado de trabalho está em constante transformação. Conheça as competências que mais se destacam e como desenvolvê-las.",
    content: "",
    category: "Mercado",
    author: "Equipe Verum",
    date: "2026-02-28",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
    tags: ["Mercado", "Habilidades", "Tendências"],
  },
  {
    id: "aprender-ingles-adulto",
    title: "É Possível Aprender Inglês Sendo Adulto? A Ciência Responde",
    excerpt:
      "Muitos adultos acreditam que perderam a janela para aprender idiomas. A neurociência moderna prova o contrário.",
    content: "",
    category: "Idiomas",
    author: "Equipe Verum",
    date: "2026-02-20",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80",
    tags: ["Inglês", "Neurociência", "Aprendizado"],
  },
  {
    id: "programacao-sem-experiencia",
    title: "Como Entrar na Área de Tecnologia Sem Experiência Prévia",
    excerpt:
      "O caminho para se tornar um desenvolvedor ou analista de dados mesmo partindo do zero absoluto.",
    content: "",
    category: "Tecnologia",
    author: "Equipe Verum",
    date: "2026-02-15",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80",
    tags: ["Tecnologia", "Carreira", "Programação"],
  },
  {
    id: "lideranca-remota",
    title: "Liderança Remota: Como Engajar Equipes à Distância",
    excerpt:
      "Estratégias práticas para líderes que gerenciam equipes remotas e híbridas com eficiência e humanidade.",
    content: "",
    category: "Liderança",
    author: "Equipe Verum",
    date: "2026-02-10",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
    tags: ["Liderança", "Remoto", "Gestão"],
  },
  {
    id: "roi-cursos-online",
    title: "Calculando o ROI dos Seus Investimentos em Educação",
    excerpt:
      "Como mensurar o retorno financeiro e profissional dos cursos que você faz e tomar decisões mais inteligentes.",
    content: "",
    category: "Carreira",
    author: "Equipe Verum",
    date: "2026-02-05",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    tags: ["Investimento", "Carreira", "Finanças"],
  },
];

export const categoryInfo = {
  tecnologia: {
    label: "Tecnologia",
    description: "Programação, dados, web e TI",
    color: "from-blue-900 to-blue-700",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/cat-technology-di6iBEpW5fXuAwc59dCADm.webp",
  },
  idiomas: {
    label: "Idiomas",
    description: "Inglês, espanhol e mais",
    color: "from-indigo-900 to-indigo-700",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/cat-idiomas-HtLzgqf224Ytw3S6rqiGsW.webp",
  },
  corporativo: {
    label: "Habilidades Corporativas",
    description: "Liderança, gestão e comunicação",
    color: "from-slate-900 to-slate-700",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663421867902/Lbc3RZpBMUKcmuDppL7dB4/cat-corporativo-8mCnaTM7tjDrj3Bwk4yhM3.webp",
  },
};

export const nicheLabels: Record<Niche, string> = {
  programacao: "Programação",
  dados: "Análise de Dados",
  web: "Desenvolvimento Web",
  ingles: "Inglês",
  espanhol: "Espanhol",
  lideranca: "Liderança",
  produtividade: "Produtividade",
  comunicacao: "Comunicação",
  gestao: "Gestão",
};

export const getRecommendedCourses = () =>
  courses.filter((c) => c.recommended).slice(0, 6);

export const getFeaturedCourses = () =>
  courses.filter((c) => c.featured).slice(0, 6);

export const getCoursesByCategory = (category: Category) =>
  courses.filter((c) => c.category === category);

export const getCoursesByNiche = (niche: Niche) =>
  courses.filter((c) => c.niche === niche);

export const getCourseById = (id: string) =>
  courses.find((c) => c.id === id);

export const searchCourses = (query: string) => {
  const q = query.toLowerCase();
  return courses.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.tags.some((t) => t.toLowerCase().includes(q)) ||
      c.instructor.toLowerCase().includes(q)
  );
};
