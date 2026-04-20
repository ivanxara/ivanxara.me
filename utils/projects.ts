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
import ath2 from "@/assets/img/athAffiliate Dashboard.png";
import ath3 from "@/assets/img/athConnect to the team.png";
import ath4 from "@/assets/img/athDashboard + TeamLink.png";
import ath5 from "@/assets/img/athDashboard - Premium.png";
import ath6 from "@/assets/img/athHomepage.png";
import ath7 from "@/assets/img/athPrem.png";

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
      "This project was built as an internal platform to sync, inspect, version, and push Zoho code into Git with a cleaner engineering workflow. It brings structure to code that normally lives inside isolated Zoho products.",
      "The platform connects Zoho CRM, Creator, and Recruit, adds repository automation through Bitbucket, and gives teams a clearer operational surface for reviewing changes, tracking sync status, and managing code safely.",
    ],
    repository: "https://github.com/ivanxaraloba/zoho-functions-to-git",
    featureIntro:
      "Selective sync, version history, Git automation, and realtime observability were combined into one internal product for technical teams.",
    featureCards: [
      {
        title: "Selective refresh and sync control",
        copy: "Implemented refresh logic that compares remote metadata and timestamps against database state so only changed resources are updated, reducing unnecessary sync work across Zoho surfaces.",
      },
      {
        title: "Automatic version snapshots",
        copy: "Built a versioning layer that stores the previous function state before overwrite whenever relevant code or metadata changes, making rollback and historical inspection part of the normal workflow.",
      },
      {
        title: "Bitbucket repository automation",
        copy: "Connected the platform to Bitbucket so repositories can be created on demand and Zoho resources can be pushed with structured paths based on application, app name, and resource type.",
      },
      {
        title: "Realtime logs and project observability",
        copy: "Added realtime log streaming, searchable project logs, and status surfaces that help teams monitor sync activity, inspect failures, and understand what changed without leaving the product.",
      },
      {
        title: "Multi-product Zoho integration",
        copy: "Unified CRM, Creator, and Recruit into one dashboard, including detailed function retrieval, client scripts, widgets, and application structure, so teams can work across multiple Zoho systems from a single interface.",
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
      "This project was designed and built as a complete AI SaaS product. It combines a premium landing page, authenticated dashboard, chart ingestion pipeline, structured AI analysis, and subscription-based access.",
      "The platform connects product design, AI features, payments, analytics, and conversion tracking in one focused user experience.",
    ],
    repository: "https://github.com/ivanxara/trading-ai",
    featureIntro:
      "AI analysis, premium UX, subscriptions, and campaign tracking were combined into one focused product flow.",
    featureCards: [
      {
        title: "AI analysis pipeline",
        copy: "Built a full analysis flow where users select an asset, capture TradingView charts across multiple timeframes, and generate structured trade plans from real visual market context.",
      },
      {
        title: "Structured Gemini output",
        copy: "Configured Gemini with a strict JSON schema to return reliable trading data including signal, entry, stop loss, take-profit levels, confidence, and setup tags.",
      },
      {
        title: "Authentication and subscriptions",
        copy: "Implemented Supabase authentication, protected dashboard access, Stripe checkout, and webhook-driven subscription updates for a clean premium SaaS flow.",
      },
      {
        title: "End-to-end product execution",
        copy: "Shipped the full product surface from landing page and onboarding to protected dashboard, persisted analysis history, and monetized access flow.",
      },
    ],
    gallery: [relevo4, relevo5, relevo6, relevo1, relevo2, relevo3],
  },
  "athlt-link": {
    slug: "athlt-link",
    title: "athlt.link",
    role: "Design & Development",
    technologies: ["nuxt", "vue", "typescript", "supabase", "stripe"],
    image: ath1,
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
      "This project combines the public-facing restaurant website with an internal admin panel used to manage menus, products, daily offers, and operational publishing workflows. It was built as one connected system rather than a standalone marketing site.",
      "The platform connects dynamic menu data from Supabase, reservation requests through WhatsApp, event-specific landing pages, local SEO surfaces, and an internal backoffice for content management, campaign publishing, and AI-assisted daily menu operations.",
    ],
    repository: "",
    featureIntro:
      "Public website delivery and internal restaurant operations were combined into one product system built for a real hospitality business.",
    featureCards: [
      {
        title: "Dynamic menu and product delivery",
        copy: "Built menu pages that fetch live content from Supabase, group products by category, preserve ordering rules, and present pricing and tags in a format optimized for fast browsing.",
      },
      {
        title: "Restaurant admin and content management",
        copy: "Created an internal dashboard for managing products, menu entries, tags, categories, and daily offers, giving the business a cleaner operational workflow for keeping website content current.",
      },
      {
        title: "Reservation flow through WhatsApp",
        copy: "Implemented a guided reservation flow with date, time, and guest selection that generates a ready-to-send WhatsApp booking message, reducing friction without requiring a complex backend booking system.",
      },
      {
        title: "Event and PDF-based campaign pages",
        copy: "Created dedicated event pages and downloadable menu experiences for seasonal campaigns, group offers, and ceremony packages, giving the business a clean way to publish time-sensitive offers.",
      },
      {
        title: "SEO architecture for local reach",
        copy: "Added sitemap generation, structured data, FAQ schema, breadcrumb markup, and multiple location-targeted landing pages to strengthen search visibility around nearby cities and restaurant-intent queries.",
      },
      {
        title: "AI-assisted daily publishing workflows",
        copy: "Built admin tools for generating Instagram story assets, drafting daily promotional messages with Groq, and matching dishes from photographed menus with Gemini OCR, reducing manual work around recurring restaurant communication.",
      },
      {
        title: "Hospitality-focused product UX",
        copy: "Designed the site around the actions that matter most for this business: checking the menu, viewing the executive lunch, booking a table, finding event options, and navigating to delivery channels quickly.",
      },
    ],
    gallery: [rei1, rei2, rei3, rei4, rei5, rei6, rei7],
  },
};

export const PROJECT_LIST: IProject[] = Object.values(PROJECTS);
