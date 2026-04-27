"use server";

import { createAdminClient } from "@/lib/supabase/admin";

export async function deleteChatMessage(messageId: number) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("portfolio_chat_user_prompts")
    .delete()
    .eq("id", messageId);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteChatSession(chatSessionId: string) {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("portfolio_chat_user_prompts")
    .delete()
    .eq("chat_session_id", chatSessionId);

  if (error) {
    throw new Error(error.message);
  }
}
