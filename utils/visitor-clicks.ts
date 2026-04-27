import { getOrCreateVisitorId } from "@/utils/visitor";
import { trackVisitorClickOnServer } from "@/utils/visitor-clicks.server";

export type VisitorClickPayload = {
  clickId: string;
};

export function trackVisitorClick(payload: VisitorClickPayload) {
  if (typeof window === "undefined") {
    return;
  }

  void trackVisitorClickOnServer({
    clickId: payload.clickId,
    visitorId: getOrCreateVisitorId(),
    clickedAt: new Date().toISOString(),
    sourcePath: window.location.pathname,
    referrer: document.referrer || null,
  });
}
