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
      <div className="border-b border-white/8 px-5 py-5 sm:px-7 sm:py-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="micro-copy text-white/45">AI chat</p>
            <h2 className="mt-2 text-[clamp(1.9rem,4vw,3.7rem)] font-extrabold tracking-[-0.08em] text-white">
              Ask directly.
            </h2>
          </div>
        </div>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/58 sm:text-base">
          A guided conversation instead of a long scroll. Ask about Ivan, his
          current Zoho work, past projects, or why he might be a fit.
        </p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-5 py-5 sm:px-7 lg:px-8">
        <div className="mb-5 flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button key={prompt} type="button" className="chat-chip">
              {prompt}
            </button>
          ))}
        </div>

        <div className="chat-scroll flex min-h-[22rem] flex-1 flex-col gap-3 overflow-y-auto pr-1 sm:gap-4">
          <div className="max-w-[38rem] rounded-[1.4rem] bg-[var(--chat-bubble)] px-4 py-3 text-sm leading-relaxed text-[var(--chat-paper)] sm:px-5 sm:py-4 sm:text-[15px]">
            Hi. I&apos;m Ivan&apos;s portfolio assistant. Ask about his
            background, Zoho work, projects, skills, or whether he&apos;s a fit
            for your team.
          </div>
        </div>

        <div className="mt-5">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/4 p-2">
            <div className="flex flex-col gap-3">
              <textarea
                placeholder="Ask anything about Ivan..."
                rows={3}
                className="min-h-[92px] w-full resize-none bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/38 focus:outline-none sm:text-base"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] text-white/38">Portfolio context only.</p>
                <button
                  type="submit"
                  disabled
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[1rem] bg-[var(--paper)] px-5 text-sm font-medium text-[var(--ink)] transition-transform hover:translate-y-[-1px] disabled:opacity-40"
                >
                  Send
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
