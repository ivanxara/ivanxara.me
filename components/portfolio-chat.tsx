import { Send, Sparkles } from "lucide-react";

const starterPrompts = [
  "Who is Ivan?",
  "What is his current work?",
  "Tell me about his projects",
  "Why is he a good hire?",
];

export function PortfolioChat() {
  return (
    <section className="flex h-full w-full min-w-0 flex-col overflow-hidden bg-[var(--chat-panel)] text-[var(--chat-paper)]">
      <div className="border-b border-white/8 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="micro-copy text-white/45">AI chat</p>
            <h2 className="mt-1.5 text-[clamp(1.6rem,3.4vw,3rem)] font-extrabold tracking-[-0.08em] text-white">
              Ask directly.
            </h2>
          </div>
        </div>

        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/58 sm:text-sm">
          A guided conversation instead of a long scroll. Ask about Ivan, his
          current Zoho work, past projects, or why he might be a fit.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-5 lg:px-6">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {starterPrompts.map((prompt) => (
            <button key={prompt} type="button" className="chat-chip">
              {prompt}
            </button>
          ))}
        </div>

        <div className="chat-scroll flex min-h-[18rem] flex-1 flex-col gap-3 overflow-y-auto pr-1">
          <div className="max-w-[34rem] rounded-[1.15rem] bg-[var(--chat-bubble)] px-3.5 py-2.5 text-[13px] leading-relaxed text-[var(--chat-paper)] sm:px-4 sm:py-3 sm:text-sm">
            Hi. I&apos;m Ivan&apos;s portfolio assistant. Ask about his
            background, Zoho work, projects, skills, or whether he&apos;s a fit
            for your team.
          </div>
        </div>

        <div className="mt-4">
          <div className="rounded-[1.15rem] border border-white/10 bg-white/4 p-1.5">
            <div className="flex flex-col gap-2">
              <textarea
                placeholder="Ask anything about Ivan..."
                rows={2}
                className="min-h-[72px] w-full resize-none bg-transparent px-2.5 py-2 text-[13px] text-white placeholder:text-white/38 focus:outline-none sm:text-sm"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-white/38">Portfolio context only.</p>
                <button
                  type="submit"
                  disabled
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-[0.9rem] bg-[var(--paper)] px-4 text-[13px] font-medium text-[var(--ink)] transition-transform hover:translate-y-[-1px] disabled:opacity-40"
                >
                  Send
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
