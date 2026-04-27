"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  MessageSquare,
  MousePointerClick,
  RefreshCcw,
  Search,
  Users,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export type ChatLogRow = {
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

export type VisitorClickRow = {
  id: number;
  created_at: string;
  visitor_id: string | null;
  click_id: string | null;
  click_at: string | null;
  source_path: string | null;
  referrer: string | null;
  user_agent: string | null;
};

type ActivityMonitorProps = {
  initialRows: ChatLogRow[];
  initialClicks: VisitorClickRow[];
};

type VisitorSummary = {
  visitorId: string;
  rows: ChatLogRow[];
  clicks: VisitorClickRow[];
  latestAt: string;
};

type SessionGroup = {
  chatSessionId: string;
  rows: ChatLogRow[];
  latestAt: string;
};

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatCompactTimestamp(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getVisitorId(row: ChatLogRow) {
  return row.visitor_id ?? "unknown-visitor";
}

function getSessionId(row: ChatLogRow) {
  return row.chat_session_id ?? "unknown-session";
}

function sortRows(rows: ChatLogRow[]) {
  return [...rows].sort((left, right) => {
    const leftTime = new Date(left.created_at).getTime();
    const rightTime = new Date(right.created_at).getTime();

    if (leftTime !== rightTime) {
      return leftTime - rightTime;
    }

    return (left.message_index ?? 0) - (right.message_index ?? 0);
  });
}

function upsertRow(rows: ChatLogRow[], nextRow: ChatLogRow) {
  const existingIndex = rows.findIndex((row) => row.id === nextRow.id);

  if (existingIndex === -1) {
    return sortRows([...rows, nextRow]);
  }

  const nextRows = [...rows];
  nextRows[existingIndex] = nextRow;
  return sortRows(nextRows);
}

function removeRow(rows: ChatLogRow[], rowId: number) {
  return rows.filter((row) => row.id !== rowId);
}

function sortClicks(clicks: VisitorClickRow[]) {
  return [...clicks].sort(
    (left, right) =>
      new Date(left.click_at ?? left.created_at).getTime() -
      new Date(right.click_at ?? right.created_at).getTime(),
  );
}

function upsertClick(
  clicks: VisitorClickRow[],
  nextClick: VisitorClickRow,
) {
  const existingIndex = clicks.findIndex((click) => click.id === nextClick.id);

  if (existingIndex === -1) {
    return sortClicks([...clicks, nextClick]);
  }

  const nextClicks = [...clicks];
  nextClicks[existingIndex] = nextClick;
  return sortClicks(nextClicks);
}

function removeClick(clicks: VisitorClickRow[], clickId: number) {
  return clicks.filter((click) => click.id !== clickId);
}

function getClickVisitorId(click: VisitorClickRow) {
  return click.visitor_id ?? "unknown-visitor";
}

function getRowPreview(row: ChatLogRow | undefined) {
  if (!row) {
    return "No messages yet";
  }

  return (
    row.user_prompt ??
    row.system_response ??
    row.error_message ??
    "No message saved"
  );
}

function getClickPreview(click: VisitorClickRow | undefined) {
  if (!click) {
    return "No click activity";
  }

  return click.click_id ?? "Unknown click";
}

function getLatestTimestamp(values: string[]) {
  return values.sort(
    (left, right) => new Date(left).getTime() - new Date(right).getTime(),
  ).at(-1);
}

function groupVisitors(rows: ChatLogRow[], clicks: VisitorClickRow[]) {
  const map = new Map<string, ChatLogRow[]>();
  const clickMap = new Map<string, VisitorClickRow[]>();

  rows.forEach((row) => {
    const visitorId = getVisitorId(row);
    const visitorRows = map.get(visitorId) ?? [];
    visitorRows.push(row);
    map.set(visitorId, visitorRows);
  });

  clicks.forEach((click) => {
    const visitorId = getClickVisitorId(click);
    const visitorClicks = clickMap.get(visitorId) ?? [];
    visitorClicks.push(click);
    clickMap.set(visitorId, visitorClicks);
  });

  const visitorIds = new Set([...map.keys(), ...clickMap.keys()]);

  return [...visitorIds]
    .map((visitorId) => {
      const sortedRows = sortRows(map.get(visitorId) ?? []);
      const sortedClicks = sortClicks(clickMap.get(visitorId) ?? []);
      const latestAt =
        getLatestTimestamp([
          sortedRows.at(-1)?.created_at ?? "",
          sortedClicks.at(-1)?.click_at ?? sortedClicks.at(-1)?.created_at ?? "",
        ].filter(Boolean)) ?? "";

      return {
        visitorId,
        rows: sortedRows,
        clicks: sortedClicks,
        latestAt,
      } satisfies VisitorSummary;
    })
    .sort(
      (left, right) =>
        new Date(right.latestAt).getTime() - new Date(left.latestAt).getTime(),
    );
}

function groupSessions(rows: ChatLogRow[]) {
  const map = new Map<string, ChatLogRow[]>();

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

export function ActivityMonitor({
  initialRows,
  initialClicks,
}: ActivityMonitorProps) {
  const [rows, setRows] = useState(() => sortRows(initialRows));
  const [clicks, setClicks] = useState(() => sortClicks(initialClicks));
  const [selectedVisitorId, setSelectedVisitorId] = useState<string | null>(
    () => groupVisitors(initialRows, initialClicks)[0]?.visitorId ?? null,
  );
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [search, setSearch] = useState("");
  const [isChatRealtimeConnected, setIsChatRealtimeConnected] = useState(false);
  const [isClickRealtimeConnected, setIsClickRealtimeConnected] =
    useState(false);

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
            const deletedRow = payload.old as ChatLogRow;
            setRows((currentRows) => removeRow(currentRows, deletedRow.id));
            return;
          }

          const nextRow = payload.new as ChatLogRow;
          setRows((currentRows) => upsertRow(currentRows, nextRow));
        },
      )
      .subscribe((status) => {
        setIsChatRealtimeConnected(status === "SUBSCRIBED");
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel("portfolio-visitor-click-monitor")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "portfolio_visitor_clicks",
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            const deletedClick = payload.old as VisitorClickRow;
            setClicks((currentClicks) =>
              removeClick(currentClicks, deletedClick.id),
            );
            return;
          }

          const nextClick = payload.new as VisitorClickRow;
          setClicks((currentClicks) => upsertClick(currentClicks, nextClick));
        },
      )
      .subscribe((status) => {
        setIsClickRealtimeConnected(status === "SUBSCRIBED");
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

  const normalizedSearch = search.trim().toLowerCase();
  const visitors = groupVisitors(rows, clicks).filter((visitor) => {
    if (!normalizedSearch) {
      return true;
    }

    const chatHaystack = visitor.rows
      .map((row) =>
        [
          visitor.visitorId,
          row.chat_session_id ?? "",
          row.user_prompt ?? "",
          row.system_response ?? "",
          row.error_message ?? "",
        ].join(" "),
      )
      .join(" ");
    const clickHaystack = visitor.clicks
      .map((click) =>
        [
          click.click_id ?? "",
          click.click_at ?? "",
          click.source_path ?? "",
          click.referrer ?? "",
        ].join(" "),
      )
      .join(" ");

    return `${chatHaystack} ${clickHaystack}`
      .toLowerCase()
      .includes(normalizedSearch);
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
  const selectedSession =
    selectedSessions.find(
      (session) => session.chatSessionId === selectedSessionId,
    ) ??
    selectedSessions[0] ??
    null;

  useEffect(() => {
    if (!selectedSessions.length) {
      setSelectedSessionId(null);
      return;
    }

    if (
      !selectedSessionId ||
      !selectedSessions.some(
        (session) => session.chatSessionId === selectedSessionId,
      )
    ) {
      setSelectedSessionId(selectedSessions[0].chatSessionId);
    }
  }, [selectedSessionId, selectedSessions]);

  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden bg-[#09090b] text-foreground">
      <header className="shrink-0 border-b border-white/[0.07] bg-sidebar/95 px-3 py-2.5 backdrop-blur-sm sm:px-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="icon-sm"
              className="rounded-md border border-white/[0.08] bg-white/[0.03]"
            >
              <Link href="/" aria-label="Back to home">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold tracking-tight">
                Activity Logs
              </h1>
              <p className="text-[11px] text-muted-foreground">
                {visitors.length} visitors / {rows.length} chats /{" "}
                {clicks.length} clicks
              </p>
            </div>
          </div>

          <label className="flex h-8 min-w-0 flex-1 items-center gap-2 border border-white/[0.07] bg-white/[0.025] px-2.5 lg:mx-3">
            <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search visitors, sessions, clicks, prompts..."
              className="min-w-0 flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </label>

          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "inline-flex h-8 items-center gap-1.5 border px-2 text-[11px]",
                isChatRealtimeConnected
                  ? "border-emerald-400/20 text-emerald-200"
                  : "border-amber-400/20 text-amber-200",
              )}
            >
              {isChatRealtimeConnected ? (
                <Wifi className="h-3.5 w-3.5" />
              ) : (
                <WifiOff className="h-3.5 w-3.5" />
              )}
              {isChatRealtimeConnected ? "Chats live" : "Chats connecting"}
            </div>
            <div
              className={cn(
                "inline-flex h-8 items-center gap-1.5 border px-2 text-[11px]",
                isClickRealtimeConnected
                  ? "border-emerald-400/20 text-emerald-200"
                  : "border-amber-400/20 text-amber-200",
              )}
            >
              {isClickRealtimeConnected ? (
                <Wifi className="h-3.5 w-3.5" />
              ) : (
                <WifiOff className="h-3.5 w-3.5" />
              )}
              {isClickRealtimeConnected ? "Clicks live" : "Clicks connecting"}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              className="h-8 rounded-none border border-white/[0.08] bg-transparent px-2 text-xs hover:bg-white/[0.04]"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[minmax(9rem,30vh)_minmax(8rem,24vh)_minmax(0,1fr)] lg:grid-cols-[280px_240px_minmax(0,1fr)] lg:grid-rows-1">
        <aside className="min-h-0 border-b border-white/[0.07] bg-sidebar/70 lg:border-r lg:border-b-0">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.07] px-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                Visitors
              </div>
              <span className="text-[11px] text-muted-foreground">
                {visitors.length}
              </span>
            </div>
            <div className="portfolio-scroll min-h-0 flex-1 overflow-y-auto">
              {visitors.map((visitor) => {
                const isActive = visitor.visitorId === selectedVisitorId;
                const sessionCount = new Set(
                  visitor.rows.map((row) => getSessionId(row)),
                ).size;
                const latestRow = visitor.rows.at(-1);
                const latestClick = visitor.clicks.at(-1);
                const latestChatTime = latestRow
                  ? new Date(latestRow.created_at).getTime()
                  : 0;
                const latestClickTime = latestClick
                  ? new Date(
                      latestClick.click_at ?? latestClick.created_at,
                    ).getTime()
                  : 0;
                const preview =
                  latestClickTime > latestChatTime
                    ? getClickPreview(latestClick)
                    : getRowPreview(latestRow);

                return (
                  <button
                    key={visitor.visitorId}
                    type="button"
                    onClick={() => setSelectedVisitorId(visitor.visitorId)}
                    className={cn(
                      "grid w-full gap-1 border-b border-white/[0.06] px-3 py-2.5 text-left transition-colors",
                      isActive
                        ? "bg-white/[0.055]"
                        : "bg-transparent hover:bg-white/[0.03]",
                    )}
                  >
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-xs font-medium text-foreground">
                        {visitor.visitorId}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {visitor.rows.length + visitor.clicks.length}
                      </span>
                    </div>
                    <p className="line-clamp-1 text-[11px] leading-4 text-muted-foreground">
                      {preview}
                    </p>
                    <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                      <span>
                        {sessionCount} sessions / {visitor.clicks.length} clicks
                      </span>
                      <span>{formatCompactTimestamp(visitor.latestAt)}</span>
                    </div>
                  </button>
                );
              })}

              {!visitors.length && (
                <div className="px-3 py-6 text-xs text-muted-foreground">
                  No visitors match this search.
                </div>
              )}
            </div>
          </div>
        </aside>

        <aside className="min-h-0 border-b border-white/[0.07] bg-sidebar/45 lg:border-r lg:border-b-0">
          <div className="flex h-full min-h-0 flex-col">
            <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.07] px-3">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                <MessageSquare className="h-3.5 w-3.5" />
                Sessions
              </div>
              <span className="text-[11px] text-muted-foreground">
                {totalSessions}
              </span>
            </div>
            <div className="portfolio-scroll min-h-0 flex-1 overflow-y-auto">
              {selectedSessions.map((session) => {
                const isActive =
                  session.chatSessionId === selectedSession?.chatSessionId;
                const latestRow = session.rows.at(-1);

                return (
                  <button
                    key={session.chatSessionId}
                    type="button"
                    onClick={() => setSelectedSessionId(session.chatSessionId)}
                    className={cn(
                      "w-full border-b border-white/[0.06] px-3 py-2.5 text-left transition-colors",
                      isActive
                        ? "bg-primary/[0.08]"
                        : "bg-transparent hover:bg-white/[0.03]",
                    )}
                  >
                    <div className="flex min-w-0 items-center justify-between gap-2">
                      <span className="min-w-0 truncate text-xs font-medium text-foreground">
                        {session.chatSessionId}
                      </span>
                      <span className="shrink-0 text-[11px] text-muted-foreground">
                        {session.rows.length}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-muted-foreground">
                      {getRowPreview(latestRow)}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Clock3 className="h-3 w-3" />
                      {formatCompactTimestamp(session.latestAt)}
                    </div>
                  </button>
                );
              })}

              {selectedVisitor && !selectedSessions.length && (
                <div className="px-3 py-6 text-xs text-muted-foreground">
                  No sessions for this visitor.
                </div>
              )}

              {!selectedVisitor && (
                <div className="px-3 py-6 text-xs text-muted-foreground">
                  Select a visitor.
                </div>
              )}
            </div>
          </div>
        </aside>

        <section className="min-h-0 bg-[#0d0d10]">
          <div className="flex h-full min-h-0 flex-col">
            {selectedVisitor ? (
              <>
                <div className="shrink-0 border-b border-white/[0.07] px-3 py-2.5 sm:px-4">
                  <div className="flex flex-col gap-2 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/75">
                        Visitor
                      </p>
                      <h2 className="mt-1 truncate text-sm font-semibold">
                        {selectedVisitor.visitorId}
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{selectedVisitor.rows.length} rows</span>
                      <span>{selectedVisitor.clicks.length} clicks</span>
                      <span>{totalSessions} sessions</span>
                      <span>
                        Latest {formatCompactTimestamp(selectedVisitor.latestAt)}
                      </span>
                    </div>
                  </div>
                  {selectedSession ? (
                    <div className="mt-2 min-w-0 border-t border-white/[0.06] pt-2">
                      <p className="truncate text-xs font-medium text-foreground">
                        {selectedSession.chatSessionId}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {selectedSession.rows.length} messages / Last activity{" "}
                        {formatTimestamp(selectedSession.latestAt)}
                      </p>
                    </div>
                  ) : null}
                </div>

                <div className="portfolio-scroll min-h-0 flex-1 overflow-y-auto">
                  <div className="border-b border-white/[0.06] px-3 py-3 sm:px-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75">
                        <MousePointerClick className="h-3.5 w-3.5" />
                        Click logs
                      </p>
                      <span className="text-[11px] text-muted-foreground">
                        {selectedVisitor.clicks.length}
                      </span>
                    </div>
                    {selectedVisitor.clicks.length ? (
                      <div className="grid gap-1.5 md:grid-cols-2 xl:grid-cols-3">
                        {sortClicks(selectedVisitor.clicks)
                          .slice(-12)
                          .reverse()
                          .map((click) => (
                            <div
                              key={click.id}
                              className="min-w-0 border border-white/[0.06] bg-white/[0.018] px-2.5 py-2"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="truncate text-[11px] font-medium text-foreground">
                                  {click.click_id ?? "Unknown click"}
                                </span>
                                <span className="shrink-0 text-[10px] text-muted-foreground">
                                  click
                                </span>
                              </div>
                              <p className="mt-1 truncate text-[11px] text-muted-foreground">
                                {click.source_path ?? "Unknown source"}
                              </p>
                              <p className="mt-1 text-[10px] text-muted-foreground">
                                {formatCompactTimestamp(
                                  click.click_at ?? click.created_at,
                                )}
                              </p>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        No clicks recorded for this visitor.
                      </p>
                    )}
                  </div>

                  {selectedSession ? (
                    <div className="divide-y divide-white/[0.06]">
                      {selectedSession.rows.map((row) => (
                        <article key={row.id} className="px-3 py-3 sm:px-4">
                          <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="font-medium text-foreground">
                              Message {row.message_index ?? "-"}
                            </span>
                            <span>{formatTimestamp(row.created_at)}</span>
                            <span
                              className={cn(
                                "ml-auto border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.12em]",
                                row.status === "error"
                                  ? "border-red-400/20 text-red-200"
                                  : "border-emerald-400/20 text-emerald-200",
                              )}
                            >
                              {row.status ?? "unknown"}
                            </span>
                          </div>

                          <div className="grid overflow-hidden border border-white/[0.06] xl:grid-cols-2">
                            <div className="border-b border-white/[0.06] bg-white/[0.015] px-3 py-3 xl:border-r xl:border-b-0">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75">
                                Prompt
                              </p>
                              <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-foreground">
                                {row.user_prompt || "No prompt saved"}
                              </p>
                            </div>

                            <div className="bg-white/[0.025] px-3 py-3">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary/75">
                                Response
                              </p>
                              <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-sidebar-foreground">
                                {row.system_response || "No response saved"}
                              </p>
                            </div>
                          </div>

                          {row.error_message && (
                            <div className="mt-2 border border-red-400/20 bg-red-500/10 px-3 py-2">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-200">
                                Error
                              </p>
                              <p className="mt-1 whitespace-pre-wrap text-xs leading-5 text-red-100">
                                {row.error_message}
                              </p>
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="border-b border-white/[0.06] px-3 py-3 sm:px-4">
                      <p className="text-xs text-muted-foreground">
                        No chat sessions recorded for this visitor.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[40vh] items-center justify-center px-6 text-xs text-muted-foreground">
                Select a visitor to inspect activity.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
