import { MY_EMAIL, URL_GITHUB, URL_LINKEDIN } from "./constants";

export const PORTFOLIO_CONTEXT = `
# PERFIL PROFISSIONAL
- **Nome:** Ivan Xará
- **Idade:** 23 anos
- **Localização:** Oliveira de Azeméis, Portugal
- **Função Atual:** Zoho Developer na Loba (FTE alocado na NIW - Grupo Salvador Caetano)
- **Soft Skills:** Resolução de problemas complexos, pensamento "out of the box", autonomia técnica e visão de produto.

# BIO RESUMIDA
Sou um desenvolvedor focado em transformar desafios de negócio em soluções digitais eficientes. Com mais de 3 anos de especialização no ecossistema Zoho, atuei no desenvolvimento de projetos internos na Loba e, desde outubro de 2024, estou alocado como **Zoho Developer (FTE)** na NIW, empresa de tecnologia do Grupo Salvador Caetano. O meu foco diário está na arquitetura avançada em Zoho CRM e Zoho Creator, complementado por domínio transversal do ecossistema Zoho One e por uma vertente sólida de desenvolvimento Web moderno com Next.js, Supabase e TypeScript.

# TECH STACK
## Ecossistema Zoho (Especialista)
- **Core Daily Stack:** **Zoho CRM** (Automações avançadas, Deluge, Custom Modules) e **Zoho Creator** (Desenvolvimento de aplicações Low-code do zero).
- **Experiência Ecossistema One:** Domínio e desenvolvimento recorrente em Zoho Catalyst (Serverless), Analytics, Campaigns, SalesIQ, Forms, Books, Desk, Recruit, Sites, Writer e Workdrive.
- **Integrações & DevOps:** Automação de versionamento (Zoho to Git), arquitetura end-to-end e fluxos de dados entre múltiplas aplicações Zoho.

## Modern Web & Full Stack
- **Frameworks:** Next.js 14 (React), Nuxt (Vue), Node.js.
- **Backend & Infra:** Supabase (Auth, DB, Storage, Real-time logs), Vercel, MySQL, PostgreSQL, Resend.
- **Libraries & State:** TanStack Query, TanStack Table, Tailwind CSS.
- **Versionamento & Design:** GitHub, Bitbucket, Figma.

# EXPERIÊNCIA PROFISSIONAL
## Loba — Zoho Developer
*Fevereiro de 2023 — Presente*

- **Entrada via CTeSP / Estágio:** A entrada na Loba aconteceu no contexto do CTeSP da Universidade de Aveiro, evoluindo depois para continuidade profissional.
- **Zoho Developer (FTE na NIW - Grupo Salvador Caetano):** Desde outubro de 2024, focado na digitalização e escalabilidade de processos dentro da tech-house de um dos maiores grupos empresariais de Portugal, garantindo soluções robustas em CRM e Creator.
- **Zoho Developer (Projetos Internos):** Responsável pela arquitetura e implementação de soluções complexas com múltiplas ferramentas do ecossistema Zoho One para otimização de workflows, automação interna e integração entre sistemas.
- **Ferramentas Internas:** Desenvolvimento de soluções próprias para a Loba, com destaque para o **zoho2git**, criado para sincronizar e versionar funções e scripts de Zoho CRM, Recruit e Creator em Git.

## Inovar+ — Estágio
*Novembro (durante o período de Covid-19)*

- Estágio realizado integralmente em regime de teletrabalho.
- Desenvolvimento de um jogo 3D em Unity com C# e de um pequeno website de alojamento de casas, desenvolvido apenas na vertente de front-end com HTML, CSS e JavaScript.
- Trabalho acompanhado de perto por elementos da Inovar+ ao longo de todo o estágio.

## Universidade de Aveiro — CTeSP em Desenvolvimento de Software
*2021 — 2023*
- Isto não foi um estágio. Foi o curso CTeSP em Desenvolvimento de Software.
- Base sólida em Python, PHP, MySQL e React.
- O CTeSP serviu de base para oportunidades práticas e estágios posteriores, incluindo a ligação inicial à Loba.

## Asociación Arrabal (Málaga) — Game Developer (Erasmus+)
*Maio de 2021*
- Desenvolvimento integral de um jogo em Unity (C#) focado em impacto social.

# NOTAS DE PRECISÃO
- Não descrever a Universidade de Aveiro como estágio, internship ou experiência profissional. Foi formação académica: CTeSP em Desenvolvimento de Software.
- Os estágios / experiências práticas a considerar foram: Inovar+, Erasmus+ na Asociación Arrabal, e a entrada inicial na Loba a partir do contexto do CTeSP.

# PROJETOS
## Projeto Interno
- **zoho2git (Zoho to Git) — [PROJETO FAVORITO]** (2024):
  - **Contexto:** Ferramenta interna desenvolvida para a Loba.
  - **Descrição:** Aplicação de alta performance para sincronizar e versionar funções e scripts de Zoho CRM, Recruit e Creator para Git (Bitbucket).
  - **Arquitetura:** Next.js 14, TypeScript, Supabase (Real-time logs) e TanStack Query/Table.
  - **Por que é o favorito:** Permitiu-me aplicar práticas rigorosas de Engenharia de Software e DevOps a um ecossistema que nativamente é isolado, unindo a minha experiência como Zoho Developer às stacks web mais modernas.

## Freelance / Client Work
- **relevoai.com** (2024):
  - **Contexto:** Projeto desenvolvido para cliente em regime freelance.
  - **Descrição:** Plataforma de análise técnica para trading com apoio de IA para leitura de gráficos, notificações automáticas por email e checkout com Stripe.
  - **Stack:** Next.js, AI, Stripe.

- **athlt.link** (2024):
  - **Contexto:** Projeto desenvolvido para cliente em regime freelance.
  - **Descrição:** Plataforma de scouting desportivo focada em geolocalização e portfólio digital para atletas, com sistema de subscrições via Stripe e envio de emails com Resend.
  - **Stack:** Nuxt, Vue, Supabase, Stripe, Resend.
  - **Notas de contexto:** O projeto foi iniciado com outro developer, que tinha apenas desenvolvido uma página e o fluxo inicial de sign up. A continuidade em Vue/Nuxt acabou por ser uma oportunidade prática para aprender uma stack que eu ainda não utilizava. A direção visual mudou várias vezes ao longo do projeto, porque o cliente pedia frequentemente novas abordagens de design.

- **reidompipas.com** (2023):
  - **Descrição:** Solução para restauração com backoffice que automatiza a criação de assets visuais (stories) para o Instagram com o menu do dia.
  - **Stack:** Next.js, Supabase.

# LINKS & CONTACTOS
- **LinkedIn:** ${URL_LINKEDIN}
- **GitHub:** ${URL_GITHUB}
- **Email:** ${MY_EMAIL}

# INSTRUÇÕES PARA A IA
- Sempre que mencionares alguma rede social, contacto ou link relevante do Ivan, devolve-o em formato de link direto e clicável.
- Quando fizer sentido mencionar LinkedIn, GitHub ou email, prefere apresentar o link completo em vez de apenas o nome da plataforma.
`;
