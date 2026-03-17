# Brainstorm de Design — Verum Cursos

## Contexto
Portal de curadoria de cursos online nas áreas de Tecnologia, Idiomas e Habilidades Corporativas. Identidade visual já estabelecida: azul marinho profundo (#0D2B55) + dourado (#C9A227) + creme (#F5F0E8).

---

<response>
<text>

## Opção A — Prestige Academy (Probabilidade: 0.08)

**Design Movement:** Editorial Acadêmico Premium — inspirado em revistas de negócios de alto padrão e portais de universidades de elite.

**Core Principles:**
- Contraste forte entre fundo escuro (azul marinho) e elementos dourados
- Tipografia com serifa para títulos, sans-serif para corpo
- Assimetria controlada: colunas de larguras distintas, não grid uniforme
- Hierarquia visual clara: o dourado guia o olhar para CTAs e destaques

**Color Philosophy:**
- `#0D2B55` (Azul Marinho) — autoridade, confiança, profissionalismo
- `#C9A227` (Dourado) — excelência, curadoria, valor premium
- `#F5F0E8` (Creme) — leveza, contraste suave nas seções claras
- `#1A3A6B` (Azul Médio) — cards e superfícies elevadas

**Layout Paradigm:**
- Hero com fundo azul marinho e texto alinhado à esquerda, imagem à direita
- Seções alternando fundo escuro e creme para ritmo visual
- Cards de cursos com borda dourada sutil no hover
- Sidebar de filtros à esquerda na página de listagem

**Signature Elements:**
- Linha dourada horizontal como separador de seções
- Badge "Recomendado" com ícone de estrela dourada
- Gradiente azul marinho → azul médio nos cards de categoria

**Interaction Philosophy:**
- Hover nos cards: elevação com sombra dourada sutil
- Botões dourados com efeito de brilho no hover
- Transições suaves de 200ms em todos os estados

**Animation:**
- Fade-in de baixo para cima nas seções ao rolar (stagger de 100ms entre cards)
- Barra de progresso dourada no topo durante carregamento
- Pulse suave no badge "Recomendado"

**Typography System:**
- Títulos: `Playfair Display` (serifa elegante) — peso 700
- Subtítulos: `Raleway` (sans-serif geométrico) — peso 600
- Corpo: `Source Sans 3` — peso 400/500
- Hierarquia: 48px hero / 32px seção / 20px card / 16px corpo

</text>
<probability>0.08</probability>
</response>

<response>
<text>

## Opção B — Modern Professional (Probabilidade: 0.07)

**Design Movement:** Neobrutalism Corporativo — bold, direto, com personalidade forte mas mantendo profissionalismo.

**Core Principles:**
- Bordas visíveis e sombras offset para profundidade sem gradientes
- Tipografia extra-bold com tracking negativo nos títulos
- Cores sólidas sem gradientes, apenas blocos de cor
- Layouts quebrados e inesperados que surpreendem sem confundir

**Color Philosophy:**
- Azul marinho como base sólida
- Dourado como acento agressivo em botões e bordas
- Branco puro para contraste máximo
- Preto para sombras offset características do neobrutalism

**Layout Paradigm:**
- Cards com borda preta 2px e sombra offset preta
- Hero com texto gigante que "vaza" para fora do container
- Filtros como tags com borda sólida, não dropdowns

**Signature Elements:**
- Sombra offset preta em todos os cards e botões
- Números grandes como decoração de fundo nas seções
- Underline animado nos links de navegação

**Interaction Philosophy:**
- Clique nos cards: sombra offset reduz (efeito de pressão)
- Hover nos botões: translação de 2px com sombra reduzida

**Animation:**
- Transições rápidas (150ms) com easing linear
- Sem fade — apenas translate e scale

**Typography System:**
- Títulos: `Space Grotesk` — peso 800
- Corpo: `DM Sans` — peso 400/500
- Monospace para badges: `JetBrains Mono`

</text>
<probability>0.07</probability>
</response>

<response>
<text>

## Opção C — Prestige Academy Refinado ✅ ESCOLHIDO

**Design Movement:** Editorial Acadêmico Premium com toques de Luxury EdTech — a paleta já definida (azul marinho + dourado + creme) executada com máxima sofisticação.

**Core Principles:**
- Fidelidade à identidade visual do mockup (azul marinho + dourado)
- Tipografia mista: serifa display + sans-serif funcional
- Espaçamento generoso que transmite confiança e clareza
- Hierarquia visual guiada pelo dourado como cor de ação

**Color Philosophy:**
- `#0D2B55` — fundo primário, navbar, hero, footer
- `#1A3A6B` — superfícies elevadas, cards em fundo escuro
- `#C9A227` — CTAs, badges, destaques, ícones ativos
- `#F5F0E8` — fundo das seções de conteúdo (creme quente)
- `#FFFFFF` — texto sobre fundos escuros
- `#1E293B` — texto sobre fundos claros

**Layout Paradigm:**
- Navbar fixa com logo + busca central + links à direita
- Hero full-width com fundo azul marinho, texto centralizado, 3 botões de categoria
- Seções alternando creme e branco para ritmo
- Grid de cards 3 colunas no desktop, 2 no tablet, 1 no mobile
- Sidebar de filtros colapsável na página de listagem

**Signature Elements:**
- Linha dourada como separador e acento decorativo
- Badge "⭐ Recomendado" com fundo dourado
- Cards com borda inferior dourada no hover

**Interaction Philosophy:**
- Hover nos cards: translateY(-4px) + sombra azul marinho
- Botões dourados: brilho interno no hover
- Filtros: toggle visual imediato sem reload

**Animation:**
- Entrada das seções: fade-in + translateY(20px) → 0 com Intersection Observer
- Stagger de 80ms entre cards na grid
- Transições de 200ms cubic-bezier(0.4, 0, 0.2, 1)

**Typography System:**
- Títulos H1/H2: `Playfair Display` — peso 700, cor branca sobre escuro / azul marinho sobre claro
- Títulos H3/H4: `Raleway` — peso 600
- Corpo e UI: `Inter` — peso 400/500 (exceção justificada pela legibilidade em UI)
- Badges/Labels: `Raleway` — peso 700, uppercase, letter-spacing 0.05em

</text>
<probability>0.09</probability>
</response>

---

## Decisão Final: **Opção C — Prestige Academy Refinado**

Fidelidade ao mockup com execução premium. Azul marinho profundo + dourado + creme como sistema cromático. Tipografia Playfair Display para títulos + Raleway para subtítulos + Inter para UI.
