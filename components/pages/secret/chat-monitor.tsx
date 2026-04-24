"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export type ChatMonitorRow = {
  id: number;
  created_at: string;
  visitor_id: string | null;
  chat_session_id: string | null;
  message_index: number | null;
  user_prompt: string | null;
  system_response: string | null;
  status: "success" | "error" | string | null;
  error_message: string | null;
};

type ChatMonitorProps = {
  initialRows: ChatMonitorRow[];
};

type VisitorSummary = {
  visitorId: string;
  rows: ChatMonitorRow[];
  latestAt: string;
};

type SessionGroup = {
  chatSessionId: string;
  rows: ChatMonitorRow[];
  latestAt: string;
};

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getVisitorId(row: ChatMonitorRow) {
  return row.visitor_id ?? "unknown-visitor";
}

function getSessionId(row: ChatMonitorRow) {
  return row.chat_session_id ?? "unknown-session";
}

function sortRows(rows: ChatMonitorRow[]) {
  return [...rows].sort((left, right) => {
    const leftTime = new Date(left.created_at).getTime();
    const rightTime = new Date(right.created_at).getTime();

    if (leftTime !== rightTime) {
      return leftTime - rightTime;
    }

    return (left.message_index ?? 0) - (right.message_index ?? 0);
  });
}

function upsertRow(rows: ChatMonitorRow[], nextRow: ChatMonitorRow) {
  const existingIndex = rows.findIndex((row) => row.id === nextRow.id);

  if (existingIndex === -1) {
    return sortRows([...rows, nextRow]);
  }

  const nextRows = [...rows];
  nextRows[existingIndex] = nextRow;
  return sortRows(nextRows);
}

function removeRow(rows: ChatMonitorRow[], rowId: number) {
  return rows.filter((row) => row.id !== rowId);
}

function groupVisitors(rows: ChatMonitorRow[]) {
  const map = new Map<string, ChatMonitorRow[]>();

  rows.forEach((row) => {
    const visitorId = getVisitorId(row);
    const visitorRows = map.get(visitorId) ?? [];
    visitorRows.push(row);
    map.set(visitorId, visitorRows);
  });

  return [...map.entries()]
    .map(([visitorId, visitorRows]) => {
      const sortedRows = sortRows(visitorRows);
      return {
        visitorId,
        rows: sortedRows,
        latestAt: sortedRows.at(-1)?.created_at ?? "",
      } satisfies VisitorSummary;
    })
    .sort(
      (left, right) =>
        new Date(right.latestAt).getTime() - new Date(left.latestAt).getTime(),
    );
}

function groupSessions(rows: ChatMonitorRow[]) {
  const map = new Map<string, ChatMonitorRow[]>();

  rows.forEach((row) => {
    const chatSessionId = getSessionId(row);
    const sessionRows = map.get(chatSessionId) ?? [];
    sessionRows.push(row);
    map.set(chatSessionId, sessionRows);
  });

  return [...map.entries()]
    .map(([chatSessionId, sessionRows]) => {
      const sortedRows = sortRows(sessionRows);
      return {
        chatSessionId,
        rows: sortedRows,
        latestAt: sortedRows.at(-1)?.created_at ?? "",
      } satisfies SessionGroup;
    })
    .sort(
      (left, right) =>
        new Date(right.latestAt).getTime() - new Date(left.latestAt).getTime(),
    );
}

export function ChatMonitor({ initialRows }: ChatMonitorProps) {
  const router = useRouter();
  const [rows, setRows] = useState(() => sortRows(initialRows));
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(
    () => groupVisitors(initialRows)[0]?.visitorId ?? null,
  );
  const [search, setSearch] = useState("");
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("portfolio-chat-monitor")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "portfolio_chat_user_prompts",
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const deletedRow = payload.old as ChatMonitorRow;
            setRows((currentRows) => removeRow(currentRows, deletedRow.id));
            return;
          }

          const nextRow = payload.new as ChatMonitorRow;
          setRows((currentRows) => upsertRow(currentRows, nextRow));
        },
      )
      .subscribe((status) => {
        setIsRealtimeConnected(status === "SUBSCRIBED");
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const visitors = groupVisitors(rows).filter((visitor) => {
    if (!normalizedSearch) {
      return true;
    }

    return visitor.rows.some((row) => {
      const haystack = [
        visitor.visitorId,
        row.chat_session_id ?? "",
        row.user_prompt ?? "",
        row.system_response ?? "",
        row.error_message ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedSearch);
    });
  });

  useEffect(() => {
    if (!visitors.length) {
      setSelectedVisitorId(null);
      return;
    }

    if (
      !selectedVisitorId ||
      !visitors.some((item) => item.visitorId === selectedVisitorId)
    ) {
      setSelectedVisitorId(visitors[0].visitorId);
    }
  }, [selectedVisitorId, visitors]);

  const selectedVisitor =
    visitors.find((visitor) => visitor.visitorId === selectedVisitorId) ?? null;
  const selectedSessions = selectedVisitor
    ? groupSessions(selectedVisitor.rows)
    : [];
  const totalSessions = selectedVisitor
    ? new Set(selectedVisitor.rows.map((row) => getSessionId(row))).size
    : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="flex items-start gap-3">
              <Link
                href="/"
                className="mt-0.5 shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/70">
                  Private Monitor
                </p>
                <h1 className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-extrabold leading-[0.96] tracking-[-0.05em] text-foreground">
                  Live Portfolio Chats
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                  Grouped by visitor first, then by session.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="border border-white/[0.08] px-3 py-2 text-xs text-muted-foreground">
                {rows.length} rows
              </div>
              <div className="border border-white/[0.08] px-3 py-2 text-xs text-muted-foreground">
                {visitors.length} visitors
              </div>
              <div
                className={`border px-3 py-2 text-xs ${
                  isRealtimeConnected
                    ? "border-emerald-400/20 text-emerald-200"
                    : "border-amber-400/20 text-amber-200"
                }`}
              >
                {isRealtimeConnected ? "Realtime on" : "Connecting"}
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={() => window.location.reload()}
                className="rounded-none border border-white/[0.08] bg-transparent hover:bg-white/[0.04]"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          <label className="flex items-center gap-3 border border-white/[0.07] bg-white/[0.02] px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search visitor, session, prompt, response, error..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-b border-white/[0.06] lg:border-r lg:border-b-0">
          <div className="portfolio-scroll h-full overflow-y-auto">
            <div className="space-y-px">
              {visitors.map((visitor) => {
                const isActive = visitor.visitorId === selectedVisitorId;
                const sessionCount = new Set(
                  visitor.rows.map((row) => getSessionId(row)),
                ).size;

                return (
                  <button
                    key={visitor.visitorId}
                    type="button"
                    onClick={() => setSelectedVisitorId(visitor.visitorId)}
                    className={`w-full border-b border-white/[0.06] px-5 py-4 text-left transition-colors ${
                      isActive
                        ? "bg-white/[0.05]"
                        : "bg-transparent hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="min-w-0 truncate text-sm font-semibold text-foreground">
                        {visitor.visitorId}
                      </p>
                      <span className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                        {visitor.rows.length}
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {sessionCount} sessions
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatTimestamp(visitor.latestAt)}
                    </p>
                  </button>
                );
              })}

              {!visitors.length && (
                <div className="px-5 py-8 text-sm text-muted-foreground">
                  No visitors match the current search.
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="min-h-0">
          <div className="portfolio-scroll h-full overflow-y-auto">
            {selectedVisitor ? (
              <div>
                <div className="border-b border-white/[0.06] px-5 py-5 sm:px-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-primary/70">
                    Visitor
                  </p>
                  <h2 className="mt-2 break-all text-lg font-bold tracking-[-0.04em] text-foreground sm:text-xl">
                    {selectedVisitor.visitorId}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <span>{selectedVisitor.rows.length} rows</span>
                    <span>{totalSessions} sessions</span>
                    <span>
                      Latest {formatTimestamp(selectedVisitor.latestAt)}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-white/[0.06]">
                  {selectedSessions.map((session) => (
                    <div
                      key={session.chatSessionId}
                      className="px-5 py-5 sm:px-6 sm:py-6"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70">
                            Session
                          </p>
                          <p className="mt-2 break-all text-sm font-semibold text-foreground">
                            {session.chatSessionId}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Last activity {formatTimestamp(session.latestAt)}
                        </p>
                      </div>

                      <div className="mt-5 space-y-5">
                        {session.rows.map((row) => (
                          <div key={row.id} className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                              <span>Message {row.message_index ?? "-"}</span>
                              <span>•</span>
                              <span>{formatTimestamp(row.created_at)}</span>
                              <span>•</span>
                              <span
                                className={
                                  row.status === "error"
                                    ? "text-red-200"
                                    : "text-emerald-200"
                                }
                              >
                                {row.status ?? "unknown"}
                              </span>
                            </div>

                            <div className="grid gap-px overflow-hidden border border-white/[0.06] bg-white/[0.06] xl:grid-cols-2">
                              <div className="bg-transparent px-4 py-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70">
                                  User Prompt
                                </p>
                                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-foreground">
                                  {row.user_prompt || "No prompt saved"}
                                </p>
                              </div>

                              <div className="bg-white/[0.02] px-4 py-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-primary/70">
                                  Assistant Response
                                </p>
                                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-sidebar-foreground">
                                  {row.system_response || "No response saved"}
                                </p>
                              </div>
                            </div>

                            {row.error_message && (
                              <div className="border border-red-400/20 bg-red-500/10 px-4 py-4">
                                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-red-200">
                                  Error
                                </p>
                                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-red-100">
                                  {row.error_message}
                                </p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[40vh] items-center justify-center px-6 text-sm text-muted-foreground">
                Select a visitor to inspect the chat history.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
