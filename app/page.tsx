import { PortfolioScreen } from "@/components/website/portfolio-screen";
import { PortfolioShell } from "@/components/website/portfolio-shell";

export default function Page() {
  return <PortfolioShell screen={<PortfolioScreen />} />;
}
