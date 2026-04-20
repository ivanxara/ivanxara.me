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
    period: "2023 — present",
    description:
      "architecting end-to-end zoho solutions, scripting, and system integrations.",
  },
  {
    organization: "univ. of aveiro",
    role: "student, software development",
    period: "2021 — 2023",
    description:
      "deep dive into software development fundamentals, databases, and hands-on projects.",
  },
];

export const NAVBAR_ITEMS: INavbarItem[] = [
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
