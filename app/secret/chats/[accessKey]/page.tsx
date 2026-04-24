import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChatMonitor, type ChatMonitorRow } from "@/components/pages/secret/chat-monitor";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Chat Monitor",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  params: Promise<{
    accessKey: string;
  }>;
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
    console.error("Failed to load monitor rows:", error.message);
    return [];
  }

  return (data ?? []) as ChatMonitorRow[];
}

export default async function SecretChatsPage({ params }: PageProps) {
  const { accessKey } = await params;
  const expectedAccessKey = process.env.CHAT_MONITOR_SECRET;

  if (!expectedAccessKey || accessKey !== expectedAccessKey) {
    notFound();
  }

  const initialRows = await getInitialRows();

  return <ChatMonitor initialRows={initialRows} />;
}
