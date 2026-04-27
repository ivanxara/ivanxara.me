"use server";

import { headers } from "next/headers";
import { createAdminClient } from "@/lib/supabase/admin";

type VisitorClickServerPayload = {
  visitorId: string;
  clickId: string;
  clickedAt?: string;
  sourcePath?: string;
  referrer?: string | null;
};

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function trackVisitorClickOnServer(
  payload: VisitorClickServerPayload,
) {
  const visitorId = optionalString(payload.visitorId);
  const clickId = optionalString(payload.clickId);

  if (!visitorId || !clickId) {
    return;
  }

  const requestHeaders = await headers();
  const supabase = createAdminClient();
  const { error } = await supabase.from("portfolio_visitor_clicks").insert({
    visitor_id: visitorId,
    click_id: clickId,
    click_at: optionalString(payload.clickedAt) ?? new Date().toISOString(),
    source_path: optionalString(payload.sourcePath),
    referrer: optionalString(payload.referrer),
    user_agent: optionalString(requestHeaders.get("user-agent")),
  });

  if (error) {
    console.log("Failed to track visitor click:", error.message);
  }
}
