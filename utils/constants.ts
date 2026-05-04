import { FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { INavbarItem } from "@/types/global";
import { IExperienceItem } from "@/types/experience";

export const MY_EMAIL = "ivanmxara@gmail.com";

export const URL_LINKEDIN = "https://www.linkedin.com/in/ivanxara/";

export const URL_GITHUB = "https://github.com/ivanxara";

export const MY_SOCIALS = [
  { icon: SiGithub, label: "Github", href: URL_GITHUB },
  { icon: FaLinkedin, label: "LinkedIn", href: URL_LINKEDIN },
];

export const MY_EXPERIENCE: IExperienceItem[] = [
  {
    organization: "loba",
    role: "zoho developer",
    period: "2023 to present",
    description:
      "At Loba, I work across different client setups, mostly around Zoho CRM and Creator, but often touching the wider Zoho ecosystem when the process needs it.",
    highlights: [
      "Adapt modules, layouts, automations, Deluge logic, Creator apps, and workflows around each client process.",
      "Build integrations, custom widgets, internal tools, and connections between Zoho apps and external systems.",
      "Dedicated full time employee for NIW inside Grupo Salvador Caetano since 2024.",
    ],
  },
  {
    organization: "client work",
    role: "full stack development",
    period: "2023 to present",
    description:
      "A mix of client websites, public platforms, admin areas, paid flows, and product features.",
    highlights: [
      "Built with React, Next.js, TypeScript, Supabase, and Stripe.",
      "Handled product decisions, database structure, integrations, and delivery.",
    ],
  },
  {
    organization: "univ. of aveiro",
    role: "software development",
    period: "2021 to 2023",
    description:
      "CTeSP in Software Development, focused on practical programming, databases, and web development.",
    highlights: [
      "Python, PHP, MySQL, React, backend logic, and frontend interfaces.",
      "Practical assignments that helped build the base for my current work.",
    ],
  },
];

export const EARLY_EXPERIENCE_NOTE =
  "Earlier technical work started through school, including a remote internship at Inovar+ and an Erasmus+ project, both around Unity, C#, and small frontend work.";

export const NAVBAR_ITEMS: INavbarItem[] = [
  { label: "Skills", href: "#capabilities" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
