"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

// Fraunces + Sora via Google Fonts — add to layout.tsx <head> for best perf:
// <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,100..900&family=Sora:wght@300;400&display=swap" rel="stylesheet"/>

const FIRST = "ivan";
const LAST  = "xará"; // á is index 3 → warm accent

const TAGS = [
  { id: "t0", label: "fullstack",    dx: -0.31, dy: -0.30, period: 3800, amp: 7,  phase: 0.0 },
  { id: "t1", label: "zoho systems", dx:  0.30, dy: -0.24, period: 4300, amp: 6,  phase: 0.6 },
  { id: "t2", label: "custom saas",  dx: -0.28, dy:  0.28, period: 3500, amp: 8,  phase: 1.2 },
  { id: "t3", label: "lisboa · pt",  dx:  0.30, dy:  0.28, period: 4600, amp: 5,  phase: 2.0 },
];

export function Hero() {
  const curDotRef   = useRef<HTMLDivElement>(null);
  const curRingRef  = useRef<HTMLDivElement>(null);
  const mainRef     = useRef<HTMLElement>(null);
  const charsRef    = useRef<HTMLSpanElement[]>([]);
  const btnRefs     = useRef<HTMLAnchorElement[]>([]);
  const tagRefs     = useRef<{ el: HTMLDivElement; bx: number; by: number }[]>([]);
  const mouseRef    = useRef({ x: 0, y: 0, nx: 0, ny: 0 });

  // ── Register char refs ────────────────────────────
  const addChar = (el: HTMLSpanElement | null) => {
    if (el && !charsRef.current.includes(el)) charsRef.current.push(el);
  };
  const addBtn = (el: HTMLAnchorElement | null) => {
    if (el && !btnRefs.current.includes(el)) btnRefs.current.push(el);
  };

  useEffect(() => {
    const body = document.body;
    let rafId: number;
    let rx = innerWidth / 2, ry = innerHeight / 2;

    // ── Mouse tracking ──────────────────────────────
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x  = e.clientX;
      mouseRef.current.y  = e.clientY;
      mouseRef.current.nx = (e.clientX - innerWidth  / 2) / innerWidth;
      mouseRef.current.ny = (e.clientY - innerHeight / 2) / innerHeight;
    };
    addEventListener("mousemove", onMove);

    // ── Set tag base positions ──────────────────────
    const setTagBases = () => {
      const m = mainRef.current;
      if (!m) return;
      const mr = m.getBoundingClientRect();
      TAGS.forEach((cfg, i) => {
        const ref = tagRefs.current[i];
        if (!ref) return;
        const er = ref.el.getBoundingClientRect();
        ref.bx = mr.width  / 2 + cfg.dx * mr.width  - er.width  / 2;
        ref.by = mr.height / 2 + cfg.dy * mr.height - er.height / 2;
      });
    };
    setTimeout(setTagBases, 50);
    addEventListener("resize", setTagBases);

    // ── RAF loop ────────────────────────────────────
    const tick = () => {
      const { x: mx, y: my, nx, ny } = mouseRef.current;

      // Cursor lerp
      if (curDotRef.current) {
        curDotRef.current.style.left = mx + "px";
        curDotRef.current.style.top  = my + "px";
      }
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (curRingRef.current) {
        curRingRef.current.style.left = rx + "px";
        curRingRef.current.style.top  = ry + "px";
      }

      // Letter repel
      const REPEL_R = 120, REPEL_F = 24;
      charsRef.current.forEach(ch => {
        const r  = ch.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = cx - mx, dy = cy - my;
        const d  = Math.hypot(dx, dy);
        if (d < REPEL_R && d > 0) {
          const f = (1 - d / REPEL_R) * REPEL_F;
          ch.style.transform = `translate(${(dx / d) * f}px,${(dy / d) * f}px)`;
        } else {
          ch.style.transform = "translate(0,0)";
        }
      });

      // Magnetic buttons
      const MAG_R = 95, MAG_S = 0.4;
      btnRefs.current.forEach(btn => {
        const r  = btn.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = mx - cx, dy = my - cy;
        const d  = Math.hypot(dx, dy);
        if (d < MAG_R) {
          const t = (1 - d / MAG_R) * MAG_S;
          btn.style.transform = `translate(${dx * t}px,${dy * t}px)`;
        } else {
          btn.style.transform = "translate(0,0)";
        }
      });

      // Tag float + parallax
      const now = performance.now();
      tagRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const cfg = TAGS[i];
        const fy  = Math.sin((now / cfg.period) * Math.PI * 2 + cfg.phase) * cfg.amp;
        const px  = nx * (8 + i * 2.5);
        const py  = ny * (8 + i * 2.5);
        ref.el.style.left = (ref.bx + px) + "px";
        ref.el.style.top  = (ref.by + fy + py) + "px";
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // ── Cursor class helpers ────────────────────────
    const setClass = (cls: string) => () => body.className = cls;
    const clearCls = () => body.className = "";

    document.querySelectorAll<HTMLElement>("[data-cur='link']").forEach(el => {
      el.addEventListener("mouseenter", setClass("cur-link"));
      el.addEventListener("mouseleave", clearCls);
    });
    document.querySelectorAll<HTMLElement>("[data-cur='btn']").forEach(el => {
      el.addEventListener("mouseenter", setClass("cur-btn"));
      el.addEventListener("mouseleave", clearCls);
    });
    mainRef.current?.addEventListener("mouseenter", setClass("cur-text"));
    mainRef.current?.addEventListener("mouseleave", clearCls);

    return () => {
      cancelAnimationFrame(rafId);
      removeEventListener("mousemove", onMove);
      removeEventListener("resize", setTagBases);
    };
  }, []);

  // ── Helpers to render letter spans ───────────────
  const renderWord = (word: string, accentIdx = -1) =>
    [...word].map((ch, i) => (
      <span
        key={i}
        ref={addChar}
        style={{
          display:              "inline-block",
          fontFamily:           "'Fraunces', serif",
          fontStyle:            "italic",
          fontVariationSettings:"'opsz' 144, 'WONK' 1",
          fontWeight:           300,
          fontSize:             "clamp(70px, 13vw, 220px)",
          lineHeight:           1,
          letterSpacing:        "-0.03em",
          color:                i === accentIdx ? "#c4834a" : "#1a1714",
          willChange:           "transform",
          transition:           "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {ch}
      </span>
    ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;1,9..144,100..900&family=Sora:wght@300;400&display=swap');

        body { cursor: none !important; }

        #c-dot  { position:fixed; border-radius:50%; pointer-events:none; z-index:9999; translate:-50% -50%; transition: width .25s, height .25s, background .25s; }
        #c-ring { position:fixed; border-radius:50%; pointer-events:none; z-index:9998; translate:-50% -50%; transition: width .4s cubic-bezier(.16,1,.3,1), height .4s cubic-bezier(.16,1,.3,1), border-color .3s, background .3s; }

        body.cur-link  #c-dot  { width:9px!important; height:9px!important; background:#7a8c72!important; }
        body.cur-link  #c-ring { width:64px!important; height:64px!important; border-color:#7a8c72!important; background:rgba(122,140,114,.07)!important; }
        body.cur-btn   #c-ring { width:72px!important; height:72px!important; border-color:rgba(26,23,20,.5)!important; background:rgba(26,23,20,.04)!important; }
        body.cur-text  #c-dot  { opacity:0!important; }
        body.cur-text  #c-ring { width:52px!important; height:52px!important; background:rgba(26,23,20,.06)!important; border-color:transparent!important; }

        .pill-dot { animation: blink-dot 2.8s ease infinite; }
        @keyframes blink-dot { 0%,100%{opacity:1;} 50%{opacity:.3;} }

        .scan-line { position:relative; overflow:hidden; }
        .scan-line::after { content:''; position:absolute; inset:0; background:rgba(26,23,20,.5); animation: scan 2s ease infinite; }
        @keyframes scan { from{transform:translateX(-100%)} to{transform:translateX(200%)} }

        .hero-tag { position:absolute; pointer-events:none; will-change:transform; }
        .hero-nav-link:hover { color:#1a1714 !important; background:rgba(26,23,20,.05) !important; }
        .hero-btn:hover { color:#1a1714 !important; background:rgba(26,23,20,.07) !important; border-color:rgba(26,23,20,.3) !important; }
      `}</style>

      {/* ── Cursor ── */}
      <div
        id="c-dot"
        ref={curDotRef}
        style={{ width: 7, height: 7, background: "#1a1714", left: 0, top: 0 }}
      />
      <div
        id="c-ring"
        ref={curRingRef}
        style={{ width: 38, height: 38, border: "1.5px solid rgba(26,23,20,.3)", left: 0, top: 0 }}
      />

      <section
        className="relative overflow-hidden"
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          background: "#f0ece5",
          color: "#1a1714",
        }}
      >

        {/* ── Nav ── */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-between"
          style={{ padding: "30px 52px 0" }}
        >
          <span
            style={{
              fontFamily:           "'Fraunces', serif",
              fontStyle:            "italic",
              fontVariationSettings:"'opsz' 12, 'WONK' 1",
              fontWeight:           400,
              fontSize:             14,
              letterSpacing:        ".02em",
              color:                "rgba(26,23,20,.5)",
            }}
          >
            ivan xará
          </span>
          <div className="flex items-center gap-1.5">
            {["work", "about"].map(l => (
              <a
                key={l}
                href={`#${l}`}
                data-cur="link"
                className="hero-nav-link"
                style={{
                  fontFamily:     "'Sora', sans-serif",
                  fontSize:       10,
                  fontWeight:     300,
                  letterSpacing:  ".2em",
                  textTransform:  "lowercase",
                  color:          "rgba(26,23,20,.38)",
                  textDecoration: "none",
                  padding:        "7px 14px",
                  borderRadius:   100,
                  transition:     "color .2s, background .2s",
                }}
              >
                {l}
              </a>
            ))}
            <div
              className="flex items-center gap-1.5"
              style={{
                background:   "rgba(26,23,20,.05)",
                border:       "1px solid rgba(26,23,20,.1)",
                borderRadius: 100,
                padding:      "6px 14px 6px 11px",
              }}
            >
              <div
                className="pill-dot rounded-full"
                style={{ width: 5, height: 5, background: "#7a8c72" }}
              />
              <span
                style={{
                  fontFamily:    "'Sora', sans-serif",
                  fontSize:      9,
                  fontWeight:    300,
                  letterSpacing: ".2em",
                  textTransform: "lowercase",
                  color:         "rgba(26,23,20,.4)",
                }}
              >
                available
              </span>
            </div>
          </div>
        </motion.nav>

        {/* ── Main ── */}
        <main
          ref={mainRef}
          className="flex flex-col items-center justify-center relative"
          style={{ padding: "0 52px", overflow: "hidden" }}
        >

          {/* Floating tags */}
          {TAGS.map((cfg, i) => (
            <motion.div
              key={cfg.id}
              ref={el => { if (el) tagRefs.current[i] = { el, bx: 0, by: 0 }; }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.85 + i * 0.1 }}
              className="hero-tag"
              style={{
                fontFamily:    "'Sora', sans-serif",
                fontSize:      9,
                fontWeight:    300,
                letterSpacing: ".22em",
                textTransform: "lowercase",
                color:         "rgba(26,23,20,.3)",
                border:        "1px solid rgba(26,23,20,.12)",
                background:    "rgba(240,236,229,.8)",
                backdropFilter:"blur(4px)",
                borderRadius:  100,
                padding:       "6px 14px",
                whiteSpace:    "nowrap",
              }}
            >
              {cfg.label}
            </motion.div>
          ))}

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.22 }}
            className="flex flex-col items-center"
            style={{ lineHeight: 1 }}
          >
            <div className="flex items-baseline">{renderWord(FIRST)}</div>
            <div className="flex items-baseline">{renderWord(LAST, 3)}</div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            style={{
              marginTop:     24,
              fontFamily:    "'Sora', sans-serif",
              fontSize:      "clamp(9px, .9vw, 12px)",
              fontWeight:    300,
              letterSpacing: ".22em",
              textTransform: "lowercase",
              color:         "rgba(26,23,20,.35)",
              textAlign:     "center",
            }}
          >
            <strong style={{ fontWeight: 400, color: "rgba(26,23,20,.58)" }}>zoho</strong>
            &ensp;·&ensp;
            <strong style={{ fontWeight: 400, color: "rgba(26,23,20,.58)" }}>custom saas</strong>
            &ensp;·&ensp;architecture &amp; deployment
          </motion.p>
        </main>

        {/* ── Footer ── */}
        <motion.footer
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex items-center justify-between"
          style={{
            padding:    "18px 52px",
            borderTop:  "1px solid rgba(26,23,20,.1)",
          }}
        >
          <span
            style={{
              fontFamily:    "'Sora', sans-serif",
              fontSize:      9,
              fontWeight:    300,
              letterSpacing: ".26em",
              textTransform: "lowercase",
              color:         "rgba(26,23,20,.28)",
            }}
          >
            lisboa, portugal &ensp;·&ensp; 2025
          </span>

          <div className="flex gap-1.5">
            {[
              { label: "view work", primary: true },
              { label: "get in touch", primary: false },
            ].map(({ label, primary }, i) => (
              <a
                key={label}
                href={`#${label.replace(" ", "-")}`}
                ref={addBtn}
                data-cur="btn"
                className="hero-btn"
                style={{
                  fontFamily:     "'Sora', sans-serif",
                  fontSize:       10,
                  fontWeight:     300,
                  letterSpacing:  ".2em",
                  textTransform:  "lowercase",
                  color:          primary ? "rgba(26,23,20,.7)" : "rgba(26,23,20,.5)",
                  textDecoration: "none",
                  padding:        "10px 22px",
                  borderRadius:   100,
                  border:         `1px solid ${primary ? "rgba(26,23,20,.22)" : "rgba(26,23,20,.14)"}`,
                  background:     primary ? "rgba(26,23,20,.07)" : "transparent",
                  transition:     "color .25s, background .25s, border-color .25s, transform .35s cubic-bezier(.16,1,.3,1)",
                  willChange:     "transform",
                  display:        "inline-flex",
                  alignItems:     "center",
                  cursor:         "none",
                }}
              >
                {label}
              </a>
            ))}
          </div>

          <div
            className="flex items-center gap-2"
            style={{
              fontFamily:    "'Sora', sans-serif",
              fontSize:      9,
              fontWeight:    300,
              letterSpacing: ".22em",
              textTransform: "lowercase",
              color:         "rgba(26,23,20,.22)",
            }}
          >
            <div
              className="scan-line"
              style={{ width: 22, height: 1, background: "rgba(26,23,20,.12)" }}
            />
            scroll
          </div>
        </motion.footer>
      </section>
    </>
  );
}