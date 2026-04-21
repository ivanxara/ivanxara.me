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

export const PROJECTS: Record<string, IProject> = {
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
      "Internal platform to sync, version, inspect, and push Zoho code into Git.",
      "It connects Zoho CRM, Creator, and Recruit with Bitbucket automation, sync controls, and operational visibility for technical teams.",
    ],
    repository: "https://github.com/ivanxaraloba/zoho-functions-to-git",
    featureIntro:
      "Selective sync, versioning, Git automation, and observability in one internal platform.",
    featureCards: [
      {
        title: "Selective refresh and sync control",
        copy: "Refresh logic compares remote metadata against stored state so only changed resources are updated.",
      },
      {
        title: "Automatic version snapshots",
        copy: "Previous versions are stored before overwrite, making rollback and history inspection part of the workflow.",
      },
      {
        title: "Bitbucket repository automation",
        copy: "Bitbucket integration creates repositories on demand and pushes Zoho resources using structured paths.",
      },
      {
        title: "Realtime logs and project observability",
        copy: "Realtime logs, searchable history, and status surfaces make sync activity and failures easy to inspect.",
      },
      {
        title: "Multi-product Zoho integration",
        copy: "CRM, Creator, and Recruit are managed from one interface, including functions, scripts, widgets, and app structure.",
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
      "AI SaaS for trader decision support, from landing page to authenticated product.",
      "It combines chart ingestion, structured AI analysis, subscriptions, and conversion-focused product design.",
    ],
    repository: "https://github.com/ivanxara/trading-ai",
    featureIntro:
      "AI analysis, subscriptions, and premium product UX in one SaaS flow.",
    featureCards: [
      {
        title: "AI analysis pipeline",
        copy: "Users select an asset, capture TradingView charts across timeframes, and generate structured trade plans from real market context.",
      },
      {
        title: "Structured Gemini output",
        copy: "Gemini is constrained with a strict JSON schema for consistent signals, levels, confidence, and setup tags.",
      },
      {
        title: "Authentication and subscriptions",
        copy: "Supabase auth, protected dashboard access, Stripe checkout, and webhook-driven subscription state.",
      },
      {
        title: "End-to-end product execution",
        copy: "End-to-end product execution across landing, onboarding, dashboard, analysis history, and monetized access.",
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
      "Profile platform for athletes, teams, and clubs, built around identity, recruiting, and profile sharing.",
      "It includes public profiles, athlete dashboard flows, premium subscriptions, verification, team connection, and affiliate mechanics.",
      "The product was also packaged through a WebView approach for Play Store and App Store distribution.",
    ],
    repository: "https://github.com/ivanxara/athlt.link",
    featureIntro:
      "Profiles, subscriptions, verification, and team workflows in one sports product.",
    featureCards: [
      {
        title: "Structured athlete profile builder",
        copy: "Multi-step onboarding and dashboard flows for managing athlete data, media, recruiting links, achievements, and profile content.",
      },
      {
        title: "Public athlete, team, and club pages",
        copy: "Dynamic public pages resolve usernames into athlete, team, or club profiles with roster, verification, and premium-aware data.",
      },
      {
        title: "Premium subscriptions and monetization",
        copy: "Stripe subscriptions support monthly and yearly plans, trials, webhooks, and affiliate-aware revenue routing.",
      },
      {
        title: "Identity verification workflow",
        copy: "Stripe Identity verification flow with session handling, webhook updates, duplicate checks, expiry tracking, and verified badges.",
      },
      {
        title: "TeamLink and paid team-join flows",
        copy: "Athletes can join teams through invite codes, manage role data, and complete paid team-join flows when required.",
      },
      {
        title: "Discovery, location, and affiliate growth features",
        copy: "Includes nearby discovery, club and athlete search, QR-ready profile sharing, and affiliate flows with Stripe Connect payouts.",
      },
      {
        title: "WebView-based mobile app delivery",
        copy: "The web product was wrapped in WebView for Play Store and App Store delivery without a full native rebuild.",
      },
    ],
    gallery: [
      ath6,
      ath1,
      ath11,
      ath5,
      ath3,
      ath2,
      ath7,
      ath9,
      ath10,
    ],
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
      "Restaurant platform combining the public website with an internal admin panel.",
      "It covers menus, reservations, campaign pages, local SEO, and operational publishing workflows.",
    ],
    repository: "",
    featureIntro:
      "Public website delivery and internal restaurant operations in one connected system.",
    featureCards: [
      {
        title: "Dynamic menu and product delivery",
        copy: "Menu pages fetch live content from Supabase, preserve ordering, and present categories, prices, and tags clearly.",
      },
      {
        title: "Restaurant admin and content management",
        copy: "Internal dashboard for managing products, categories, tags, menu entries, and daily offers.",
      },
      {
        title: "Reservation flow through WhatsApp",
        copy: "Guided reservation flow generates a ready-to-send WhatsApp booking message without a heavy booking backend.",
      },
      {
        title: "Event and PDF-based campaign pages",
        copy: "Dedicated event pages and PDF-based menu experiences support seasonal campaigns and group offers.",
      },
      {
        title: "SEO architecture for local reach",
        copy: "SEO work included sitemap generation, structured data, FAQ schema, breadcrumbs, and location-targeted landing pages.",
      },
      {
        title: "AI-assisted daily publishing workflows",
        copy: "Admin tools generate Instagram story assets, draft daily promo copy, and process menu photos with OCR.",
      },
      {
        title: "Hospitality-focused product UX",
        copy: "UX is built around the core actions: checking the menu, viewing daily offers, booking, and finding event options fast.",
      },
    ],
    gallery: [rei1, rei2, rei3, rei4, rei5, rei6, rei7],
  },
};

export const PROJECT_LIST: IProject[] = Object.values(PROJECTS);
