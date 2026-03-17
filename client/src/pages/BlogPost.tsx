// ============================================================
// Verum Cursos — Página de Artigo do Blog
// Design: Prestige Academy Refinado
// ============================================================

import { useParams, Link } from "wouter";
import { ArrowLeft, Clock, User, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/data";

// Full content for each post
const postContents: Record<string, string> = {
  "como-escolher-curso-online": `
## Por que a escolha certa importa tanto?

Investir em educação é uma das decisões mais impactantes que um profissional pode tomar. No entanto, com a explosão de cursos online disponíveis, a escolha pode ser paralisante. Um curso mal escolhido representa não apenas dinheiro perdido, mas também tempo — o recurso mais precioso de qualquer pessoa.

## Os 5 critérios essenciais para avaliar um curso

**1. Reputação do instrutor e da plataforma**

Antes de qualquer coisa, pesquise quem está por trás do curso. Um instrutor com histórico comprovado no mercado, avaliações positivas e presença ativa na área é um indicador forte de qualidade. Plataformas como Hotmart, Udemy e Coursera possuem sistemas de avaliação transparentes que facilitam essa análise.

**2. Currículo alinhado com seus objetivos**

Leia o currículo completo do curso antes de comprar. Pergunte-se: "Este conteúdo vai me ajudar a alcançar meu objetivo específico?" Um curso de Python para análise de dados é muito diferente de um curso de Python para desenvolvimento web — ambos ensinam a mesma linguagem, mas com focos completamente distintos.

**3. Avaliações e depoimentos reais**

Avaliações acima de 4.5 estrelas com mais de 500 avaliações são um bom sinal. Leia os comentários negativos também — eles frequentemente revelam limitações que os comentários positivos omitem.

**4. Suporte e comunidade**

Cursos com comunidades ativas (grupos no Discord, fóruns, sessões ao vivo) oferecem uma experiência de aprendizado muito superior. O aprendizado isolado tem taxas de conclusão muito menores do que o aprendizado social.

**5. Política de garantia**

A maioria das plataformas sérias oferece garantia de 7 a 30 dias. Isso é um sinal de confiança do produtor no próprio produto.

## A armadilha do "curso perfeito"

Muitas pessoas ficam em paralisia por análise, esperando encontrar o curso perfeito antes de começar. A verdade é que o melhor curso é aquele que você vai realmente concluir. Um curso bom que você termina vale infinitamente mais do que um curso excelente que você abandona na terceira aula.

## Conclusão

Escolher um curso online com critério é uma habilidade em si. Use os critérios acima como guia, mas não deixe a busca pelo perfeito ser inimiga do bom. Comece, aprenda, e ajuste o caminho conforme avança.
  `,
  "habilidades-mais-valorizadas-2026": `
## O mercado em transformação acelerada

O mercado de trabalho de 2026 é fundamentalmente diferente do que existia cinco anos atrás. A inteligência artificial, a automação e a globalização digital estão redesenhando quais habilidades têm valor — e quais estão se tornando obsoletas.

## As 10 habilidades mais demandadas

**1. Inteligência Artificial e Prompt Engineering**
Saber trabalhar com ferramentas de IA não é mais diferencial — é requisito básico. Profissionais que dominam o uso estratégico de IA são significativamente mais produtivos.

**2. Análise de Dados**
A capacidade de interpretar dados e transformá-los em decisões é valorizada em todas as áreas, não apenas em TI.

**3. Comunicação Assíncrona**
Com equipes distribuídas globalmente, saber comunicar-se com clareza por escrito tornou-se uma competência crítica.

**4. Inglês Profissional**
O inglês continua sendo a língua dos negócios globais. Profissionais fluentes têm acesso a oportunidades 3x maiores.

**5. Pensamento Crítico**
Em um mundo de excesso de informação, a capacidade de avaliar fontes e raciocinar com rigor é cada vez mais rara e valiosa.

**6. Gestão de Projetos Ágeis**
Metodologias como Scrum e Kanban são adotadas por empresas de todos os setores, não apenas de tecnologia.

**7. Liderança Adaptativa**
Liderar em ambientes de incerteza e mudança constante requer um conjunto de habilidades diferente da liderança tradicional.

**8. Programação Básica**
Mesmo profissionais de áreas não técnicas se beneficiam enormemente de saber automatizar tarefas simples com Python ou JavaScript.

**9. Inteligência Emocional**
À medida que as máquinas assumem tarefas cognitivas, as habilidades humanas — empatia, autoconhecimento, gestão de emoções — se tornam ainda mais valiosas.

**10. Aprendizado Contínuo (Learning Agility)**
A habilidade de aprender rapidamente e se adaptar a novas ferramentas e contextos é, talvez, a meta-habilidade mais importante do século XXI.

## Como desenvolver essas habilidades?

A boa notícia é que todas essas habilidades podem ser desenvolvidas intencionalmente. Cursos online de qualidade, prática deliberada e exposição a projetos reais são os caminhos mais eficientes.
  `,
};

const defaultContent = `
## Introdução

Este artigo explora um tema fundamental para o desenvolvimento profissional moderno. Com o crescimento acelerado da educação online e as transformações constantes no mercado de trabalho, entender este assunto pode fazer uma diferença significativa na sua trajetória.

## Desenvolvimento

O aprendizado contínuo deixou de ser um diferencial para se tornar uma necessidade. Profissionais que investem regularmente em sua formação têm, em média, salários 40% maiores e são promovidos com maior frequência do que aqueles que não o fazem.

A chave está em escolher os investimentos certos em educação — aqueles que se alinham com as demandas reais do mercado e com seus objetivos de carreira específicos.

## Conclusão

Independentemente da sua área de atuação, o investimento em conhecimento é sempre o de maior retorno. A questão não é se você deve aprender, mas o que e como aprender de forma mais eficiente.

Explore nossa curadoria de cursos para encontrar as melhores opções para o seu momento de carreira.
`;

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Artigo não encontrado
            </h2>
            <Link href="/blog">
              <button
                className="px-6 py-3 rounded-full text-sm font-bold"
                style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
              >
                Voltar ao Blog
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const content = postContents[post.id] || defaultContent;
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  // Simple markdown-to-html renderer
  const renderContent = (md: string) => {
    return md
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-2xl font-bold mt-8 mb-4"
              style={{ color: "#0D2B55", fontFamily: "'Playfair Display', serif" }}
            >
              {line.replace("## ", "")}
            </h2>
          );
        }
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="font-bold text-gray-800 mt-4 mb-2">
              {line.replace(/\*\*/g, "")}
            </p>
          );
        }
        if (line.trim() === "") return <br key={i} />;
        return (
          <p key={i} className="text-gray-700 leading-relaxed mb-3">
            {line.replace(/\*\*(.*?)\*\*/g, "$1")}
          </p>
        );
      });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F5F0E8" }}>
      <Navbar />

      {/* Header */}
      <div className="pt-20 pb-10" style={{ backgroundColor: "#0D2B55" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <Link href="/blog">
            <button className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Voltar ao Blog
            </button>
          </Link>

          <div className="max-w-3xl">
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "#C9A227", fontFamily: "'Raleway', sans-serif" }}
            >
              {post.category}
            </span>
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-3 mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} de leitura
              </span>
              <span>{post.date}</span>
            </div>
          </div>
        </div>
        <div className="verum-gold-line mt-8" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2">
            {/* Hero image */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Excerpt */}
            <div
              className="rounded-xl p-5 mb-8 border-l-4"
              style={{
                background: "#C9A22715",
                borderColor: "#C9A227",
              }}
            >
              <p className="text-gray-700 italic leading-relaxed">{post.excerpt}</p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {renderContent(content)}
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: "#0D2B5510", color: "#0D2B55" }}
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA */}
            <div
              className="rounded-2xl p-6 text-center"
              style={{ background: "linear-gradient(135deg, #0D2B55, #1A3A6B)" }}
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(201,162,39,0.2)" }}>
                <svg className="w-6 h-6" fill="none" stroke="#C9A227" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <h3
                className="font-bold text-white text-lg mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Pronto para aprender?
              </h3>
              <p className="text-white/70 text-sm mb-5">
                Explore cursos selecionados para impulsionar sua carreira.
              </p>
              <Link href="/cursos">
                <button
                  className="w-full py-3 rounded-xl text-sm font-bold"
                  style={{ background: "#C9A227", color: "#0D2B55", fontFamily: "'Raleway', sans-serif" }}
                >
                  Ver Cursos →
                </button>
              </Link>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-white rounded-2xl p-5 shadow-sm">
                <h3
                  className="font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Raleway', sans-serif" }}
                >
                  Artigos Relacionados
                </h3>
                <div className="space-y-4">
                  {related.map((p) => (
                    <Link key={p.id} href={`/blog/${p.id}`}>
                      <div className="flex gap-3 group cursor-pointer">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p
                            className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-900 transition-colors"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{p.readTime} de leitura</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All posts link */}
            <Link href="/blog">
              <button
                className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 bg-white shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Ver todos os artigos
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
