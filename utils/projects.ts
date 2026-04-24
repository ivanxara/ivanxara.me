import { IProject } from "@/types/projects";
import relevoai from "@/assets/img/relevoai.com_(1920x1080)_dark.png";
import relevoAiLanding from "@/assets/img/relevoai.com_(1500x802).png";
import relevo1 from "@/assets/img/relevoai.com_dashboard_crypto(1500x802).png";
import relevo4 from "@/assets/img/relevoai.com_(1500x802) (1).png";
import relevo5 from "@/assets/img/relevoai.com_(1500x802) (2).png";
import relevo6 from "@/assets/img/relevoai.com_(1500x802) (3).png";
import relevo2 from "@/assets/img/relevoai.com_dashboard_crypto(1500x802) (1).png";
import relevo3 from "@/assets/img/relevoai.com_dashboard(1500x802) (1).png";

import zoho2git1 from "@/assets/img/localhost_3001_(1500x802)_dashboard.png";
import zoho2git2 from "@/assets/img/lobaadmin-zohofunctionstogit.vercel.app_logs(1500x802) (1).png";
import zoho2git3 from "@/assets/img/lobaadmin-zohofunctionstogit.vercel.app_logs(1500x802) (2).png";
import zoho2git4 from "@/assets/img/localhost_3001_projects_demo7_crm_function=544491000002569001(1500x802)_creator.png";
import zoho2git5 from "@/assets/img/lobaadmin-zohofunctionstogit.vercel.app_logs(1500x802) (4).png";
import zoho2git6 from "@/assets/img/lobaadmin-zohofunctionstogit.vercel.app_logs(1500x802) (5).png";
import zoho2git7 from "@/assets/img/lobaadmin-zohofunctionstogit.vercel.app_logs(1500x802).png";

import rei1 from "@/assets/img/reidompipas.com_(1500x802)_landing.png";
import rei2 from "@/assets/img/reidompipas.com_(1500x802)_carta.png";
import rei3 from "@/assets/img/reidompipas.com_(1500x802)_evnet.png";
import rei4 from "@/assets/img/reidompipas.com_(1500x802)_menuex.png";
import rei5 from "@/assets/img/reidompipas.com_(1500x802)_reserva2.png";
import rei6 from "@/assets/img/localhost_3001_(1500x802)_admin_landing.png";
import rei7 from "@/assets/img/localhost_3001_(1500x802)_admin_2.png";

import ath1 from "@/assets/img/ath2024 Athlete Page.png";
import ath0 from "@/assets/img/Shot.png";
import ath2 from "@/assets/img/athAffiliate Dashboard.png";
import ath3 from "@/assets/img/athConnect to the team.png";
import ath4 from "@/assets/img/athDashboard + TeamLink.png";
import ath5 from "@/assets/img/athDashboard - Premium.png";
import ath6 from "@/assets/img/athHomepage.png";
import ath7 from "@/assets/img/athPrem.png";
import ath8 from "@/assets/img/athPremium Block.png";
import ath9 from "@/assets/img/athSave.png";
import ath10 from "@/assets/img/athContact.png";
import ath11 from "@/assets/img/athTeam Page + Unlock.png";
import mygame1 from "@/assets/img/mygame_1.png";
import mygameChar from "@/assets/img/mygame_char.png";
import mygameCheats from "@/assets/img/mygame_cheats.png";
import mygameHelp from "@/assets/img/mygame_help.png";
import mygameNave from "@/assets/img/mygame_nave.png";
import mygameRelva from "@/assets/img/mygame_relva.png";
import mygameShop from "@/assets/img/mygame_shop.png";

type ProjectName =
  | "zoho2git"
  | "relevoai"
  | "athlt-link"
  | "rei-dom-pipas"
  | "my-game";

export const PROJECTS: Record<ProjectName, IProject> = {
  zoho2git: {
    slug: "zoho2git",
    title: "zoho2git",
    role: "Design & Development",
    technologies: ["nextjs", "typescript", "supabase", "tailwind"],
    image: zoho2git1,
    eyebrow: "project case study - internal devops platform",
    overviewTitle: "Internal platform for",
    overviewAccent: "Zoho-to-Git workflows",
    overview: [
      "Internal platform built to bring Zoho development into a reliable Git-based workflow, making it easier for technical teams to sync, inspect, version, and push code with confidence.",
      "It connects Zoho CRM, Creator, and Recruit in one place, combining selective sync controls, Bitbucket automation, and clear operational visibility across projects and resources.",
    ],
    repository: {
      private: true,
    },
    featureIntro:
      "A DevOps layer for moving Zoho code into a safer, more manageable Git workflow.",
    featureCards: [
      {
        title: "Multi-product Zoho workspace",
        copy: "CRM, Creator, and Recruit are managed from a single interface, covering functions, scripts, widgets, and app structure without splitting the workflow across tools.",
      },
      {
        title: "Selective sync and safe versioning",
        copy: "Refresh logic compares remote metadata against stored state so only changed resources are updated, while previous versions are saved before overwrite for rollback and history inspection.",
      },
      {
        title: "Bitbucket repository automation",
        copy: "Bitbucket integration creates repositories on demand and pushes Zoho resources into structured paths, reducing manual setup and keeping delivery consistent.",
      },
      {
        title: "Operational visibility and debugging",
        copy: "Realtime logs, searchable history, and status tracking make sync activity, failures, and project state easier to inspect and troubleshoot.",
      },
    ],
    gallery: [zoho2git5, zoho2git7, zoho2git2, zoho2git3, zoho2git6, zoho2git4],
  },
  relevoai: {
    slug: "relevoai",
    title: "relevo.ai",
    role: "Design & Development",
    technologies: ["nextjs", "typescript", "supabase", "gemini", "stripe"],
    image: relevoAiLanding,
    eyebrow: "project case study - ai trading platform",
    overviewTitle: "AI SaaS for",
    overviewAccent: "trader decision support",
    overview: [
      "AI SaaS built to support trader decision-making, taking the product from conversion-focused landing page through onboarding into an authenticated premium experience.",
      "It combines chart ingestion, structured AI analysis, subscription billing, and product UX designed to turn analysis into a usable paid workflow.",
    ],
    repository: {
      url: "https://github.com/ivanxara/trading-ai",
      private: false,
    },
    featureIntro:
      "A premium trading product that connects analysis generation, access control, and monetization.",
    featureCards: [
      {
        title: "Chart-to-analysis workflow",
        copy: "Users select an asset, capture TradingView charts across multiple timeframes, and turn real market context into structured trade plans inside the product flow.",
      },
      {
        title: "Structured AI output",
        copy: "Gemini is constrained with a strict JSON schema so every response returns consistent signals, levels, confidence scoring, and setup tags the product can reliably use.",
      },
      {
        title: "Authenticated premium access",
        copy: "Supabase auth, protected dashboards, Stripe checkout, and webhook-driven subscription state work together to control paid access cleanly.",
      },
      {
        title: "End-to-end SaaS product execution",
        copy: "The product experience was designed across landing, onboarding, dashboard usage, analysis history, and monetized access to feel like one connected system.",
      },
    ],
    gallery: [relevo4, relevo5, relevo6, relevo1, relevo2, relevo3],
  },
  "athlt-link": {
    slug: "athlt-link",
    title: "athlt.link",
    role: "Design & Development",
    technologies: ["nuxt", "vue", "typescript", "supabase", "stripe"],
    image: ath0,
    galleryLayout: "mobile",
    eyebrow: "project case study - athlete profile and recruiting platform",
    overviewTitle: "Platform for",
    overviewAccent: "athlete identity, sharing, and team connection",
    overview: [
      "Profile platform for athletes, teams, and clubs, built to strengthen identity, recruiting, and profile sharing in a single sports-focused product.",
      "It includes public profiles, athlete dashboard flows, premium subscriptions, verification, team connection, discovery, and affiliate mechanics that support both growth and monetization.",
      "The product was also packaged through a WebView approach for Play Store and App Store distribution, extending the same experience to mobile without a full native rebuild.",
    ],
    repository: {
      url: "https://github.com/ivanxara/athlt.link",
      private: false,
    },
    featureIntro:
      "A sports platform that combines athlete presentation, team workflows, and monetized product features.",
    featureCards: [
      {
        title: "Athlete profile creation and management",
        copy: "Multi-step onboarding and dashboard flows help athletes manage media, recruiting links, achievements, and profile content with a structure designed for sharing and discovery.",
      },
      {
        title: "Public profiles for athletes, teams, and clubs",
        copy: "Dynamic public pages resolve usernames into athlete, team, or club profiles with roster data, verification signals, and premium-aware content presentation.",
      },
      {
        title: "Subscriptions, verification, and trust signals",
        copy: "Stripe subscriptions support premium plans and trials, while verification flows handle identity checks, webhook updates, expiry tracking, and verified badges.",
      },
      {
        title: "Team connection and recruiting flows",
        copy: "Athletes can connect with teams through invite codes, role-based team data, and paid join flows when required, supporting recruiting and membership workflows.",
      },
      {
        title: "Growth and distribution layers",
        copy: "Discovery features, athlete and club search, QR-ready sharing, affiliate flows with Stripe Connect payouts, and WebView-based mobile delivery expand reach beyond the core profile experience.",
      },
    ],
    gallery: [ath6, ath1, ath11, ath5, ath3, ath2, ath7, ath9, ath10],
  },
  "rei-dom-pipas": {
    slug: "rei-dom-pipas",
    title: "reidompipas.com",
    role: "Design & Development",
    technologies: ["nextjs", "typescript", "supabase", "gemini", "tailwind"],
    image: rei1,
    eyebrow: "project case study - restaurant platform and admin",
    overviewTitle: "Restaurant platform built for",
    overviewAccent: "operations and discoverability",
    overview: [
      "Restaurant platform built to support both customer-facing discovery and day-to-day restaurant operations through one connected system.",
      "It combines the public website with an internal admin panel for menus, reservations, campaign pages, local SEO, and publishing workflows used by the team.",
    ],
    repository: {
      url: "https://github.com/ivanxara/reidompipas.com",
      private: false,
    },
    featureIntro:
      "A hospitality product that handles customer conversion and internal publishing from the same platform.",
    featureCards: [
      {
        title: "Dynamic menus and content operations",
        copy: "Menu pages fetch live content from Supabase and preserve ordering, while the internal dashboard manages products, categories, tags, menu entries, and daily offers.",
      },
      {
        title: "Fast reservation and campaign flows",
        copy: "Guests can move quickly from browsing to action through WhatsApp booking flows, event pages, and PDF-based menu or group-offer experiences.",
      },
      {
        title: "Local SEO and discoverability",
        copy: "SEO work included sitemap generation, structured data, FAQ schema, breadcrumbs, and location-targeted landing pages to strengthen local reach.",
      },
      {
        title: "Hospitality-focused product UX",
        copy: "The UX is designed around the actions that matter most for a restaurant: checking the menu, viewing daily offers, booking fast, and finding event options without friction.",
      },
      {
        title: "AI-assisted publishing tools",
        copy: "Admin workflows generate Instagram story assets, draft daily promo copy, and process menu photos with OCR to speed up daily content production.",
      },
    ],
    gallery: [rei1, rei2, rei3, rei4, rei5, rei6, rei7],
  },
  "my-game": {
    slug: "my-game",
    title: "my game",
    role: "Game Design & Development",
    technologies: ["unity", "csharp", "photoshop"],
    image: mygame1,
    eyebrow: "project case study - final high school project",
    overviewTitle: "Game created as my",
    overviewAccent: "final 12th grade project",
    overview: [
      "This game was created in 2021 as my final 12th grade project, with the goal of taking a complete playable experience from idea through implementation.",
      "It was developed in Unity with C#, while Photoshop was used to define the visual direction and produce supporting design assets.",
      "For the portfolio, I adapted the project into a WebGL build and embedded it directly into the case study so visitors can play it before reaching the gallery.",
    ],
    featureIntro:
      "A final school project presented as a playable portfolio piece.",
    featureCards: [
      {
        title: "Built as a complete final project",
        copy: "The project was planned and developed as a full final-year piece, combining gameplay logic, technical implementation, and visual presentation into one complete deliverable.",
      },
      {
        title: "Unity development and game logic",
        copy: "Unity provided the runtime and project structure, while C# powered the core mechanics, interactions, and progression systems.",
      },
      {
        title: "Visual direction and presentation",
        copy: "Photoshop was used to shape the look of the game and create supporting visual assets for the interface and overall presentation.",
      },
      {
        title: "Playable directly inside the portfolio",
        copy: "Instead of relying only on screenshots, the WebGL build lets visitors try the game directly on the project page before the gallery section.",
      },
    ],
    playSection: true,
    gallery: [
      mygameChar,
      mygameCheats,
      mygameHelp,
      mygameNave,
      mygameRelva,
      mygameShop,
    ],
  },
};

export const PROJECT_LIST: IProject[] = Object.values(PROJECTS);
