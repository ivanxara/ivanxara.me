import type { Metadata } from "next";
import {
  ActivityMonitor,
  type ChatLogRow,
  type VisitorClickRow,
} from "@/components/pages/logs/activity-monitor";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Activity Logs",
};

async function getInitialRows() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("portfolio_chat_user_prompts")
    .select( 
      "id, created_at, visitor_id, chat_session_id, message_index, user_prompt, system_response, status, error_message",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.log("Failed to load monitor rows:", error.message);
    return [];
  }

  return (data ?? []) as ChatLogRow[];
}

async function getInitialClicks() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("portfolio_visitor_clicks")
    .select(
      "id, created_at, visitor_id, click_id, click_at, source_path, referrer, user_agent",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.log("Failed to load visitor clicks:", error.message);
    return [];
  }

  return (data ?? []) as VisitorClickRow[];
}

export default async function LogsPage() {
  const [initialRows, initialClicks] = await Promise.all([
    getInitialRows(),
    getInitialClicks(),
  ]);

  return (
    <ActivityMonitor initialRows={initialRows} initialClicks={initialClicks} />
  );
}
