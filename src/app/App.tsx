import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import "../styles/fonts.css";
import "../styles/global.css";

const GLOBAL_CSS = `
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    background: #000;
    color: #fff;
    font-family: 'Google Sans', 'Noto Sans KR', sans-serif;
    font-weight: 400;
    overflow-x: hidden;
  }
  @keyframes spin    { to { transform: rotate(360deg); } }
  @keyframes fadeUp  { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
  @keyframes pulse   {
    0%,100% { box-shadow: 0 0 0 0 #4D9FFF66; }
    50%     { box-shadow: 0 0 0 8px #4D9FFF00; }
  }
  @keyframes dotBlink {
    0%, 100% { color: #FFFFFF2E; }
    50%      { color: #4D9FFF; }
  }

  /* ── 엄격한 반응형 줄바꿈 유틸리티 ── */
  .br-pc { display: block; }
  .br-mo { display: none; }
  .keep-all { word-break: keep-all; }

  .aios-hero-text-mobile { display: none; }
  .aios-hero-mob-grad    { display: none; pointer-events: none; }
  .aios-video-desktop    { display: block; }
  .aios-video-mobile     { display: none; }

  .aios-orbit-1   { animation: spin 20s linear infinite; }
  .aios-orbit-2   { animation: spin 30s linear infinite reverse; }
  .aios-pulse     { animation: pulse 2s infinite; }
  .aios-eyebrow   { opacity:0; animation: fadeUp 0.8s 0.2s forwards; }
  .aios-hero-h1   { opacity:0; animation: fadeUp 0.8s 0.4s forwards; }
  .aios-hero-sub  { opacity:0; animation: fadeUp 0.8s 0.6s forwards; }
  .aios-cs-d1     { animation: dotBlink 1.4s ease 0.0s  infinite; }
  .aios-cs-d2     { animation: dotBlink 1.4s ease 0.35s infinite; }
  .aios-cs-d3     { animation: dotBlink 1.4s ease 0.70s infinite; }
  .aios-btn-pri:hover { opacity:0.85; }
  .aios-btn-sec:hover { border-color:#4D9FFF !important; color:#4D9FFF !important; }
  .aios-nav-cta:hover { opacity:0.85; }
  .aios-signal:hover  { border-color:#4D9FFF4D !important; transform:translateX(6px); }
  .aios-ip-row:hover  { background:#1a1a1a !important; }
  .aios-link-icon     { color: #FFFFFF33; transition: color 0.2s; }
  .aios-ip-row:hover .aios-link-icon { color: #4D9FFF99; }
  .aios-grid3 { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:#222; margin:40px 0; }
  
  /* =========================================
     [엄격한 뷰포트 관리] 1440, 1024, 768, 425, 375, 320
     ========================================= */

  .aios-hero-h1 { font-size: 82px; line-height: 1.05; }
  .aios-hero-sub { font-size: 20px; line-height: 1.6; }
  .aios-hero-desc { font-size: 14px; line-height: 1.6; }

  @media (max-width: 1024px) {
    .aios-hero { gap: 24px !important; padding: 120px 40px 80px !important; }
    .aios-inner { padding: 0 40px !important; }
    .aios-hero-h1 { font-size: 64px; }
    .aios-hero-sub { font-size: 18px; }
  }

  @media (max-width: 768px) {
    .br-pc { display: none; }
    .br-mo { display: block; }
    
    .aios-nav    { padding: 20px 24px !important; }
    .aios-nav-btns { gap: 8px !important; }
    .aios-nav-btns a { padding: 6px 14px !important; font-size: 13px !important; }
    .aios-hero   { grid-template-columns: 1fr !important; padding: 100px 24px 60px !important; gap: 40px !important; }
    .aios-hero-r { width: 100% !important; margin-top: 0; }
    
    .aios-hero-left { text-align: center !important; display: flex; flex-direction: column; align-items: center; }
    .aios-eyebrow   { justify-content: center !important; margin-bottom: 40px !important; }
    
    .aios-hero-h1   { text-align: center !important; font-size: 52px; line-height: 1.15; }
    .aios-hero-sub  { text-align: center !important; font-size: 18px; margin-left: auto !important; margin-right: auto !important; }
    .aios-hero-desc { text-align: center !important; font-size: 14px; margin-left: auto !important; margin-right: auto !important; }

    .aios-hero-text-desktop { display: none !important; }
    .aios-hero-text-mobile  { display: block !important; text-align: center; padding: 0 4px; }
    .aios-hero-h1           { display: none !important; }

    .aios-inner  { padding: 0 24px !important; }
    .aios-cta    { padding: 100px 24px !important; }
    .aios-footer { flex-direction: column !important; gap: 20px !important; text-align: center !important; }
    .aios-tl     { flex-direction: column !important; gap: 32px !important; }
    .aios-tl-line{ display: none !important; }
    .aios-section{ padding: 80px 0 !important; }
    .aios-grid3  { grid-template-columns: 1fr !important; }
    .aios-flow5  { grid-template-columns: 1fr !important; }

    .aios-hero-mob-grad {
      display: block;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40vh;
      background: linear-gradient(to bottom, transparent 0%, #000000 100%);
      z-index: 5;
      pointer-events: none;
      transition: opacity 0.25s ease;
    }
    .aios-video-desktop { display: none; }
    .aios-video-mobile  { display: block; }
  }

  @media (max-width: 425px) {
    .aios-hero-h1 { font-size: 42px; }
    .aios-hero-sub { font-size: 16px; }
    .aios-cta { padding: 80px 20px !important; }
    .aios-ip-row { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; padding: 24px 20px !important; }
    .aios-ip-badges { justify-content: flex-start !important; width: 100% !important; }
  }

  @media (max-width: 375px) {
    .aios-hero-h1 { font-size: 38px; }
    .aios-hero-sub { font-size: 15px; }
    .aios-nav { padding: 16px 20px !important; }
    .aios-nav-btns a { padding: 6px 12px !important; font-size: 12px !important; }
    .aios-section { padding: 60px 0 !important; }
    .aios-hero-desc { font-size: 13px; }
  }

  @media (max-width: 320px) {
    .aios-hero { padding: 80px 16px 40px !important; }
    .aios-hero-h1 { font-size: 32px; }
    .aios-hero-sub { font-size: 14px; }
    .aios-inner { padding: 0 16px !important; }
  }
  /* ── 띠배너 반응형 ── */
  .strip-banner-content-mo { display: none !important; }
  .strip-banner-btn-mo { display: none !important; }
  
  @media (max-width: 768px) {
    .strip-banner { flex-direction: column !important; gap: 20px !important; padding: 20px !important; align-items: flex-start !important; }
    .strip-banner-content-web { display: none !important; }
    .strip-banner-content-mo { display: flex !important; }
    .strip-banner-btn-web { display: none !important; }
    .strip-banner-btn-mo { display: flex !important; }
  }

  @media (max-width: 375px) {
    .strip-banner-content-mo > div:first-child { font-size: 24px !important; line-height: 30px !important; }
  }
`;

const B = "#4D9FFF";
const GRAY_LINE = "#222222";
const TEXT_MUTED = "#666666";

/* ── Hooks & Core Components ── */
function useInView<T extends HTMLElement = HTMLElement>(
  threshold = 0.08,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function SectionReveal({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      className="aios-section"
      style={{
        padding: "120px 0",
        borderBottom: "1px solid #222",
        background: dark ? "#111" : "#000",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </section>
  );
}

function Inner({ children }: { children: ReactNode }) {
  return (
    <div
      className="aios-inner"
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: "0 60px",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
}

function SecNum({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: 13,
        letterSpacing: "0.2em",
        color: B,
        marginBottom: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          display: "block",
          width: 24,
          height: 1,
          background: B,
          flexShrink: 0,
        }}
      />
      {children}
      <span
        style={{
          display: "block",
          width: 24,
          height: 1,
          background: B,
          flexShrink: 0,
        }}
      />
    </div>
  );
}

function Title({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      className="keep-all"
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 400,
        fontSize: "clamp(32px, 4vw, 48px)",
        lineHeight: 1.3,
        letterSpacing: "-0.02em",
        marginBottom: 32,
        color: "#fff",
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function Message({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <p
      className="keep-all"
      style={{
        fontFamily: "'Google Sans', sans-serif",
        fontSize: 18,
        fontWeight: 400,
        lineHeight: 1.8,
        color: "#FFFFFFBF",
        textAlign: "center",
        maxWidth: 700,
        margin: "0 auto 48px",
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function Body({
  children,
  style,
}: {
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="keep-all"
      style={{
        fontFamily: "'Google Sans', sans-serif",
        fontSize: 16,
        fontWeight: 300,
        lineHeight: 1.9,
        color: "#FFFFFF80",
        textAlign: "center",
        maxWidth: 760,
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return <span style={{ color: B }}>{children}</span>;
}

function Divider({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: 48,
        height: 1,
        background: "#222",
        margin: "48px auto",
        ...style,
      }}
    />
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        borderTop: `2px solid ${B}`,
        borderBottom: "1px solid #4D9FFF26",
        padding: "28px 36px",
        background: "#4D9FFF0A",
        margin: "40px auto",
        maxWidth: 580,
      }}
    >
      <div
        className="keep-all"
        style={{
          fontFamily: "'Google Sans', sans-serif",
          fontSize: 16,
          lineHeight: 1.7,
          color: "#FFFFFFB3",
          textAlign: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ── Grids & Diagrams ── */
interface GridItem {
  title: string;
  desc?: string;
}
function ThreeGrid({
  items,
  dark = false,
}: {
  items: GridItem[];
  dark?: boolean;
}) {
  return (
    <div className="aios-grid3">
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: dark ? "#000" : "#111",
            padding: "36px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              color: B,
              marginBottom: 6,
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div
            className="keep-all"
            style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: 15,
              fontWeight: 400,
              color: "#FFFFFFE6",
              lineHeight: 1.6,
            }}
          >
            {item.title}
          </div>
          {item.desc && (
            <div
              style={{
                fontFamily: "'Google Sans', sans-serif",
                fontSize: 13,
                color: "#FFFFFFA6",
                lineHeight: 1.5,
              }}
            >
              {item.desc}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

interface FlowStep {
  icon: ReactNode;
  label: string;
  num: number;
}
function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div
      className="aios-flow5"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
        gap: 1,
        background: "#222",
        margin: "40px 0",
      }}
    >
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            background: "#0a0a0a",
            padding: "28px 16px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.18em",
              color: "#FFFFFF4D",
            }}
          >
            {String(step.num).padStart(2, "0")}
          </div>
          <div style={{ color: "#FFFFFF4D" }}>{step.icon}</div>
          <div
            className="keep-all"
            style={{
              fontFamily: "'Google Sans', sans-serif",
              fontSize: 13,
              color: "#FFFFFF80",
              lineHeight: 1.5,
            }}
          >
            {step.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── SVG Icons ── */
const IconDownload = () => (
  <svg
    viewBox="0 0 24 24"
    width={22}
    height={22}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconLogin = () => (
  <svg
    viewBox="0 0 24 24"
    width={22}
    height={22}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
    <polyline points="10 17 15 12 10 7" />
    <line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);
const IconKey = () => (
  <svg
    viewBox="0 0 24 24"
    width={22}
    height={22}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    width={22}
    height={22}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconCard = () => (
  <svg
    viewBox="0 0 24 24"
    width={22}
    height={22}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

/* ── STRIP BANNER ── */
function StripBanner() {
  return (
    <a
      href="https://conference-page-inky.vercel.app/"
      className="strip-banner"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        gap: 80,
        background: "#00A4FF",
        textDecoration: "none",
        cursor: "pointer",
      }}
    >
      {/* ── 텍스트 영역 (Web) ── */}
      <div className="strip-banner-content-web" style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div
          style={{
            fontFamily: "'Google Sans', sans-serif",
            fontWeight: 400,
            fontSize: 48,
            lineHeight: "48px",
            color: "#000",
          }}
        >
          2026 Exploring the Path to Native AI at Stanford
        </div>
        <div style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 400, fontSize: 28, lineHeight: "35px", color: "#000", textTransform: "uppercase" as const }}>
          MAY 18, 2026  4:30 PM – 6:30 PM  STANFORD SIMONYI CONFERENCE CENTER
        </div>
      </div>

      {/* ── 텍스트 영역 (Mobile) ── */}
      <div className="strip-banner-content-mo" style={{ display: "none", flexDirection: "column", gap: 8, width: "100%" }}>
        <div
          style={{
            fontFamily: "'Google Sans', sans-serif",
            fontWeight: 500,
            fontSize: 30,
            lineHeight: "37.2px",
            color: "#000",
            textAlign: "center",
          }}
        >
          2026 Exploring the Path to Native AI at Stanford
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 400, fontSize: 20, lineHeight: "25px", color: "#000", textTransform: "uppercase" as const }}>
            MAY 18, 2026  4:30 PM – 6:30 PM
          </div>
          <div style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 400, fontSize: 16, lineHeight: "20px", color: "#000", textTransform: "uppercase" as const }}>
            STANFORD SIMONYI CONFERENCE CENTER
          </div>
        </div>
      </div>

      {/* ── 버튼 (Web: 2줄) ── */}
      <div
        className="strip-banner-btn-web"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: 20,
          background: "#000",
          color: "#fff",
          fontFamily: "'Google Sans', sans-serif",
          fontSize: 24,
          fontWeight: 400,
          lineHeight: "30px",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        DETAILS OF<br />CONFERENCE
        <svg width="48" height="48" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.05298 0.923096H48.653V40.5231" stroke="white" strokeWidth="1.84615"/>
          <path d="M48.6528 0.923096L0.652832 48.9231" stroke="white" strokeWidth="1.84615"/>
        </svg>
      </div>

      {/* ── 버튼 (Mobile: 1줄, SPACE_BETWEEN, padding 16) ── */}
      <div
        className="strip-banner-btn-mo"
        style={{
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: 16,
          background: "#000",
          color: "#fff",
          fontFamily: "'Google Sans', sans-serif",
          fontSize: 22,
          fontWeight: 400,
          lineHeight: "27.5px",
        }}
      >
        DETAILS OF CONFERENCE
        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.05298 0.923096H48.653V40.5231" stroke="white" strokeWidth="1.84615"/>
          <path d="M48.6528 0.923096L0.652832 48.9231" stroke="white" strokeWidth="1.84615"/>
        </svg>
      </div>
    </a>
  );
}

/* ── NAV ── */
function Nav() {
  return (
    <nav
      className="aios-nav"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 60px",
        borderBottom: "1px solid #FFFFFF0D",
        background: "#000000D9",
        backdropFilter: "blur(16px)",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 400,
          fontSize: 20,
          letterSpacing: "0.15em",
          color: "#fff",
          textTransform: "uppercase",
        }}
      >
        Newnal
      </div>

      <div className="aios-nav-btns" style={{ display: "flex", gap: 12 }}>
        <a
          href="https://keynote.newnal.com/v/4sGbG7ZxfBJRnfJbBPa8P?_b=1"
          target="_blank"
          rel="noopener noreferrer"
          className="aios-btn-pri"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            padding: "6px 14px",
            borderRadius: 4,
            border: "none",
            background: "#00A4FF",
            color: "#000",
            fontFamily: "'Google Sans', sans-serif",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1,
            textTransform: "uppercase" as const,
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          Keynote</a>
        <a
          href="https://column.newnal.com/kr/column-1.html"
          target="_blank"
          rel="noopener noreferrer"
          className="aios-btn-pri"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            padding: "6px 14px",
            borderRadius: 4,
            border: "none",
            background: "#00A4FF",
            color: "#000",
            fontFamily: "'Google Sans', sans-serif",
            fontSize: 14,
            fontWeight: 400,
            lineHeight: 1,
            textTransform: "uppercase" as const,
            textDecoration: "none",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          Founder Column
        </a>
      </div>
    </nav>
  );
}

/* ── HERO ── */
function HeroVideo() {
  const videoStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    position: "relative",
    zIndex: 1,
    backgroundColor: "transparent",
  };
  return (
    <>
      {/* Desktop only: MyAI.mp4 */}
      <video
        className="aios-video-desktop"
        src="https://newnal-com-asset.s3.ap-northeast-2.amazonaws.com/MyAI.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={videoStyle}
      />
      {/* Mobile only: hero phone video */}
      <video
        className="aios-video-mobile"
        src="https://newnal-com-asset.s3.ap-northeast-2.amazonaws.com/hero_3.1.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={videoStyle}
      />
    </>
  );
}

function Hero() {
  const B = "#4d9fff";
  const [gradOpacity, setGradOpacity] = useState(1);

  useEffect(() => {
    const onScroll = () => {
      // 0px 에서 완전 불투명, 160px 스크롤 후 완전 투명
      setGradOpacity(Math.max(0, 1 - window.scrollY / 160));
    };
    window.addEventListener("scroll", onScroll, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="aios-hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        alignItems: "center",
        gap: 40,
        padding: "120px 60px",
        maxWidth: 1300,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="aios-hero-left" style={{ zIndex: 2 }}>
        <h1
          className="aios-hero-h1 keep-all"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            marginBottom: 48,
            color: "#fff",
          }}
        >
          This is not <br className="br-pc" />
          a phone <br className="br-pc" />
          with&nbsp;AI. <br className="br-mo" />
          <em
            style={{
              fontStyle: "normal",
              color: B,
              display: "block",
              marginTop: 8,
            }}
          >
            It is a phone <br className="br-pc" />
            built <br className="br-pc" />
            around&nbsp;AI.
          </em>
        </h1>

        {/* Desktop only: shown alongside h1 in left column */}
        <div className="aios-hero-text-desktop">
          <p
            className="aios-hero-sub keep-all"
            style={{
              fontFamily: "'Google Sans', sans-serif",
              fontWeight: 400,
              color: "#FFFFFFB3",
              maxWidth: 500,
              marginBottom: 40,
            }}
          >
            We did not build another smartphone. <br />
            We built a new operating system for the AI era.
          </p>

          <div
            className="aios-hero-desc keep-all"
            style={{
              fontFamily: "'Google Sans', sans-serif",
              color: "#FFFFFF66",
              maxWidth: 400,
            }}
          >
            And the device that delivers the most complete
            experience <br className="br-pc" />
            of that OS — that is the Newnal AIOS&nbsp;Phone.
          </div>
        </div>
      </div>

      <div
        className="aios-hero-r"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "120%",
            height: "100%",
            background:
              "radial-gradient(circle, #4D9FFF26 0%, transparent 0%)",
            zIndex: 0,
          }}
        />
        <div
          style={{
            width: "100%",
            maxWidth: "380px",
            aspectRatio: "1 / 2",
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "drop-shadow(0 0 50px #00000080)",
          }}
        >
          <HeroVideo />
        </div>
      </div>

      {/* Mobile-only bottom gradient — fades out on scroll */}
      <div
        className="aios-hero-mob-grad"
        style={{ opacity: gradOpacity }}
      />

      {/* Mobile only: shown below the phone video */}
      <div className="aios-hero-text-mobile">
        <p
          className="aios-hero-sub keep-all"
          style={{
            fontFamily: "'Google Sans', sans-serif",
            fontWeight: 400,
            color: "#FFFFFFB3",
            maxWidth: 500,
            marginBottom: 40,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          We did not build another&nbsp;smartphone. <br /> We
          built a new operating system for the&nbsp;AI&nbsp;era.
        </p>
        <div
          className="aios-hero-desc keep-all"
          style={{
            fontFamily: "'Google Sans', sans-serif",
            color: "#FFFFFF66",
            maxWidth: 400,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          And the device that delivers the most complete
          experience of that OS — that is the Newnal
          AIOS&nbsp;Phone.
        </div>
      </div>
    </div>
  );
}

/* ── SECTION 01 ── */
function Section01() {
  return (
    <SectionReveal>
      <Inner>
        <Title>Why Does AI Still Feel Inconvenient?</Title>
        <Message>AI is intelligent.</Message>
        <Callout>
          But AI relies on you to manually define all context
          and intent through input. You're asked to repeatedly
          re-enter intentions, context, data etc. every time to
          achieve optimal results.
        </Callout>
        <Divider />
        <Body style={{ marginBottom: 40 }}>
          AI has learned the world. <br />
          But it has not learned&nbsp;you. <br />
          So we changed the question. <br />
          Not, “How do we make AI&nbsp;smarter?” <br />
          <Accent>
            But, “How do we build AI that understands&nbsp;me?”
          </Accent>
        </Body>
      </Inner>
    </SectionReveal>
  );
}

/* ── SECTION 02 ── */
const gridItems02: GridItem[] = [
  { title: "Your data is controlled by you" },
  { title: "No one can access your data without permission" },
  {
    title:
      "You can see exactly what data was used, when, and how",
  },
];
function Section02() {
  return (
    <SectionReveal dark>
      <Inner>
        <Title>MY AI — AI Built From You</Title>
        <Message>
          Newnal AIOS begins with one fundamental&nbsp;question:{" "}
          <br />
          <Accent>Where is my&nbsp;data?</Accent>
        </Message>
        <Body>
          Today, your data is scattered across servers:{" "}
          <br className="br-pc" />
          Google, Meta, shopping platforms, delivery apps,
          coffee apps, financial institutions, and more.{" "}
          <br className="br-pc" />
          Yet you cannot properly use your own data. Newnal
          designed things differently. <br /> The Newnal AIOS is
          built on data architecture where:
        </Body>
        <ThreeGrid items={gridItems02} dark />
        <Body style={{ marginTop: 40 }}>
          From this foundation, <Accent>My AI</Accent>{" "}
          is&nbsp;created. <br />
          You are no longer just a user of AI.{" "}
          <br className="br-mo" />
          You become the creator of{" "}
          <Accent>your own&nbsp;AI</Accent>.
        </Body>
      </Inner>
    </SectionReveal>
  );
}

/* ── SECTION 03 ── */
const SIGNALS = [
  {
    text: "Looks like you could use some new glasses, I found some that match your style.",
    sub: "MY AI · Just now",
  },
  {
    text: "The running shoes you've been considering — price comparison done",
    sub: "MY AI · 5 min ago",
  },
  {
    text: "Want me to draft a letter for your parents' upcoming anniversary?",
    sub: "MY AI · 1 hr ago",
  },
  {
    text: "You've got an upcoming payment — want me to take care of that transfer for you?",
    sub: "MY AI · Today",
  },
  {
    text: "Long day today, want to listen to a relaxing song?",
    sub: "MY AI · Today",
  },
];
function Section03() {
  return (
    <SectionReveal>
      <Inner>
        <Title>AI That Doesn’t Require Constant Input</Title>
        <Message>
          Today’s AI is input-driven. But think about&nbsp;this:{" "}
          <br className="br-pc" />
          If AI truly understands you, why should you have to
          explain yourself every&nbsp;time?
        </Message>
        <Callout>
          <div style={{ marginBottom: 24 }}>
            Newnal AIOS is not a UI (User Interface). It is an{" "}
            <Accent>AI&nbsp;Interface</Accent>.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "flex-start",
              margin: "0 auto",
              maxWidth: 420,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: B,
                  flexShrink: 0,
                }}
              />
              <div
                className="keep-all"
                style={{
                  fontFamily: "'Google Sans', sans-serif",
                  fontSize: 15,
                  color: "#FFFFFFE6",
                }}
              >
                Silent by default
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: B,
                  flexShrink: 0,
                }}
              />
              <div
                className="keep-all"
                style={{
                  fontFamily: "'Google Sans', sans-serif",
                  fontSize: 15,
                  color: "#FFFFFFE6",
                }}
              >
                Proactive when it matters
              </div>
            </div>
          </div>
        </Callout>
        <Message style={{ marginTop: 40 }}>
          A single signal appears on your screen. It is not just
          a&nbsp;notification. <br />
          It means: “My AI has a suggestion for&nbsp;me.”
        </Message>
        <Message>One principle is&nbsp;critical:</Message>
        <Callout>
          <div>
            AI makes suggestions first —{" "}
            <br className="br-mo" />
            It never makes decisions <br className="br-mo" />{" "}
            for you.
          </div>
        </Callout>
        <Body style={{ marginTop: 24 }}>
          Control always remains with&nbsp;you.
        </Body>
      </Inner>
    </SectionReveal>
  );
}

/* ── SECTION 04 ── */
const flowSteps04: FlowStep[] = [
  { icon: <IconDownload />, label: "Download the app", num: 1 },
  { icon: <IconLogin />, label: "Log in", num: 2 },
  { icon: <IconKey />, label: "Create passwords", num: 3 },
  { icon: <IconCheck />, label: "Verify identity", num: 4 },
  { icon: <IconCard />, label: "Register payment", num: 5 },
];
const gridItems04: GridItem[] = [
  {
    title:
      "You no longer log into services, but instead services log into you.",
  },
  {
    title: "Services request access to your data from your AI",
  },
  { title: "Only when you grant permission does data connect" },
];
function Section04() {
  return (
    <SectionReveal dark>
      <Inner>
        <Title>
          A World Where Services Connect{" "}
          <br className="br-pc" /> Without Apps
        </Title>
        <Message>Today, to use a service, we must:</Message>
        <FlowDiagram steps={flowSteps04} />
        <Message style={{ marginTop: 48 }}>
          Newnal reverses this structure through{" "}
          <Accent>Reverse Login</Accent>
        </Message>
        <ThreeGrid items={gridItems04} dark />
        <Divider />
        <Body>
          We call this ecosystem{" "}
          <Accent>Agent&nbsp;Place</Accent>. <br />
          In the future, specialized AI agents will work for you
          — only with your&nbsp;permission.
        </Body>
        <Divider />
        <Callout>
          Data is more vulnerable the harder you try to protect
          it; counterintuitively, it is protected the more you
          open it.
        </Callout>
      </Inner>
    </SectionReveal>
  );
}

/* ── SECTION 05 ── */
function Section05() {
  return (
    <SectionReveal>
      <Inner>
        <Title>Full Android Compatibility</Title>
        <Message>
          “So can I still use my existing&nbsp;apps?”{" "}
          <br className="br-mo" /> Yes.
        </Message>
        <Body>
          Newnal AIOS runs alongside&nbsp;Android.{" "}
          <br className="br-mo" />
          Use your existing apps when needed.{" "}
          <br className="br-pc" />
          When you need AI, switch to AI mode.
        </Body>
        <Divider />
        <Body style={{ marginTop: 0 }}>
          This is why we are fundamentally different from
          previous AI devices. <br className="br-pc" />
          We are not a break from the current systems, but a
          connection.
        </Body>
      </Inner>
    </SectionReveal>
  );
}

/* ── SECTION 06 ── */
const gridItems06: GridItem[] = [
  { title: "10-minute onboarding" },
  { title: "Define your ideal self" },
  { title: "My AI is created immediately" },
];

function Section06() {
  return (
    <SectionReveal dark>
      <Inner>
        <Title>Onboarding — It Just Takes 10 Minutes</Title>
        <Message>
          Does My AI need to be used for a long time to learn
          about me?
        </Message>
        <Body>
          We discovered an important insight.
          <br className="br-mo" /> People don’t just want AI
          that reflects who they are&nbsp;currently.{" "}
          <br className="br-pc" />
          They want AI that reflects who they want
          to&nbsp;become.
        </Body>

        {/* 💡 위쪽 간격은 늘리고, 아래쪽 간격은 좁혀서 배치 수정 */}
        <Message
          style={{ marginTop: "28px", marginBottom: "16px" }}
        >
          Our process is simple:
        </Message>

        <ThreeGrid items={gridItems06} dark />
        <Divider />
        <Body>
          From there My AI revolves through real-world data.
        </Body>
      </Inner>
    </SectionReveal>
  );
}

/* ── SECTION 07 ── */
const TL_ITEMS = [
  {
    dot: "1995",
    dotSub: "Windows 95",
    year: "Personal Computing Era",
    now: false,
  },
  {
    dot: "2007",
    dotSub: "iOS",
    year: "Mobile Computing Era",
    now: false,
  },
  {
    dot: "NOW",
    dotSub: "Newnal AIOS",
    year: "AI Computing Era",
    now: true,
  },
];
function Section07() {
  return (
    <SectionReveal>
      <Inner>
        <Title>We Are Not Competing in Hardware</Title>
        <Message>
          Better camera. <br /> Thinner body. <br />{" "}
          Stronger&nbsp;materials. <br />
          We did not enter that&nbsp;race.
        </Message>
        <Body style={{ marginBottom: 48 }}>
          What we built is not hardware.{" "}
          <br className="br-mo" />
          <Accent>It is the OS for the AI era.</Accent>
        </Body>
        <div
          className="aios-tl"
          style={{
            display: "flex",
            gap: 0,
            marginTop: 48,
            position: "relative",
          }}
        >
          <div
            className="aios-tl-line"
            style={{
              position: "absolute",
              top: 60,
              left: "10%",
              right: "10%",
              height: 1,
              background: "#444",
            }}
          />
          {TL_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: "0 16px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "#000",
                  border: `1px solid ${item.now ? B : "#888"}`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: item.now
                    ? `0 0 20px ${B}66`
                    : "none",
                  gap: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10,
                    color: item.now ? B : "#aaa",
                    lineHeight: 1,
                  }}
                >
                  {item.dot}
                </div>
                <div
                  style={{
                    fontFamily: "'Google Sans', sans-serif",
                    fontSize: 14,
                    color: item.now ? B : "#FFFFFFBF",
                    lineHeight: 1,
                    textAlign: "center",
                    padding: "0 4px",
                    fontWeight: 500,
                  }}
                >
                  {item.dotSub}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 400,
                  fontSize: 20,
                  marginBottom: 10,
                  color: item.now ? B : "#fff",
                }}
              >
                {item.year}
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <Body>
          Newnal AIOS will open the{" "}
          <Accent>AI Computing Era</Accent>.
        </Body>
      </Inner>
    </SectionReveal>
  );
}

/* ── SECTION 08 ── */
function Section08() {
  return (
    <SectionReveal dark>
      <Inner>
        <Title>And One More Thing</Title>
        <Message>
          We did not just redefine the phone.{" "}
          <br className="br-mo" />
          We also redefined <Accent>the phone number.</Accent>
        </Message>
        <Body>
          For over 100 years, the one-number-system for each
          individual has been the&nbsp;norm.{" "}
          <br className="br-pc" />
          Having one number linked across all your relationships
          leaves you exposed to spam and unwanted ads.
        </Body>
        <Callout>
          Newnal Private Communication generates a unique number
          for every connection you make. Your conversations stay
          private by design, accessible only to the people
          they’re meant for. Newnal is preparing a new
          communication architecture designed for the
          AI&nbsp;era.
        </Callout>
      </Inner>
    </SectionReveal>
  );
}

/* ── CTA SECTION ── */
function CTASection() {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      className="aios-cta"
      style={{
        padding: "160px 60px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        borderBottom: "1px solid #222",
        background: "#000",
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translateY(0)"
          : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 700,
          height: 700,
          pointerEvents: "none",
          background:
            "radial-gradient(circle, #4D9FFF0F 0%, transparent 65%)",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2
          className="keep-all"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 500,
            fontSize: "clamp(44px, 6vw, 88px)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 48,
            color: "#4D9FFF",
          }}
        >
          Newnal AIOS Phone
        </h2>
        <SecNum>2026 Roadmap</SecNum>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            margin: "40px auto",
            maxWidth: 560,
            textAlign: "left",
          }}
        >
          {[
            {
              month: "January",
              desc: "Production Completion of Newnal AIOS Phone V1",
            },
            {
              month: "April",
              desc: "Launch of Newnal AIOS and Newnal AIOS Phone V1",
            },
            {
              month: "July",
              desc: "Pre-order Open for Newnal AIOS Phone V2 Models",
            },
            {
              month: "December",
              desc: "Delivery Start for Newnal AIOS Phone V2",
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 24,
                padding: "24px 0",
                borderBottom: i < 3 ? "1px solid #222" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "#4D9FFF",
                  textTransform: "uppercase",
                  minWidth: 90,
                  paddingTop: 3,
                }}
              >
                {item.month}
              </div>
              <div
                style={{
                  fontFamily: "'Google Sans', sans-serif",
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: "#FFFFFFD9",
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <Message style={{ margin: "40px auto", maxWidth: 680 }}>
          This is not the era where AI becomes the center of
          the&nbsp;world. <br className="br-pc" />
          <Accent>
            This is the era where you become the center
            of&nbsp;AI.
          </Accent>{" "}
          <br /> <br />
          Newnal begins&nbsp;here.
        </Message>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer
      className="aios-footer"
      style={{
        borderTop: "1px solid #222",
        padding: "48px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 400,
          fontSize: 16,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#fff",
        }}
      >
        Newnal
      </div>
      <div
        style={{
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11,
          color: "#666",
        }}
      >
        © 2026 Newnal. All rights reserved.
      </div>
    </footer>
  );
}

/* ── IP SECTION ── */
function getBadgeType(label: string) {
  const l = label.toUpperCase();
  if (l.includes("US")) return "uspto";
  if (l.includes("KR")) return "kipo";
  if (l.includes("EP") || l.includes("EU")) return "epo";
  if (l.includes("WIPO") || l.includes("WO")) return "wipo";
  if (l.includes("CN")) return "cnipa";
  return "default";
}

function getBadgeWidth(type: string) {
  const t = type.toUpperCase();
  if (t === "WIPO") return 64;
  return 52;
}

const badgeStyles: any = {
  uspto: {
    color: "#4D9FFF",
    bg: "#4D9FFF12",
    border: "#4D9FFF4D",
  },
  kipo: {
    color: "#aaaaaa",
    bg: "#FFFFFF0A",
    border: "#FFFFFF26",
  },
  epo: {
    color: "#ffcc55",
    bg: "#FFCC5512",
    border: "#FFCC554D",
  },
  wipo: {
    color: "#88ccff",
    bg: "#88CCFF12",
    border: "#88CCFF4D",
  },
  cnipa: {
    color: "#ff6432",
    bg: "#FF643226",
    border: "#FF64324D",
  },
  default: {
    color: "#666666",
    bg: "#FFFFFF05",
    border: "#FFFFFF14",
  },
};

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={12}
      height={12}
      fill="none"
      strokeWidth={2}
      style={{
        stroke: "currentColor",
        flexShrink: 0,
        display: "block",
      }}
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ActiveBadge({
  type,
  url,
}: {
  type: string;
  url: string;
}) {
  const style = badgeStyles[getBadgeType(type)];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        width: getBadgeWidth(type),
        height: 27,
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: style.color,
        textDecoration: "none",
        fontSize: 10,
        fontWeight: 600,
        fontFamily: "'Geist Mono', monospace",
        textTransform: "uppercase",
        flexShrink: 0,
        transition: "opacity 0.2s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.opacity = "0.8")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.opacity = "1")
      }
    >
      {type} <ExternalLinkIcon />
    </a>
  );
}

function IPRow({ title, desc, num, url, links }: any) {
  const hasLinks = links && links.length > 0;
  return (
    <div
      className="aios-ip-row"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "24px 28px",
        background: "#000000",
        transition: "background 0.2s",
        gap: 32,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 6,
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          className="keep-all"
          style={{
            fontFamily: "'Google Sans', sans-serif",
            fontSize: 14,
            lineHeight: 1.5,
            color: "#FFFFFFE6",
          }}
        >
          {title}
        </div>
        {desc && (
          <div
            className="keep-all"
            style={{
              fontSize: 12,
              color: TEXT_MUTED,
              fontFamily: "'Google Sans', sans-serif",
            }}
          >
            {desc}
          </div>
        )}
        {num && (
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 10,
              color: "#FFFFFF33",
            }}
          >
            {num}
          </div>
        )}
      </div>
      <div
        className="aios-ip-badges"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        {url && !hasLinks && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              background: "#FFFFFF08",
              border: "1px solid #FFFFFF14",
              color: "#FFFFFF66",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#FFFFFF4D";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#FFFFFF14";
              e.currentTarget.style.color = "#FFFFFF66";
            }}
          >
            <ExternalLinkIcon />
          </a>
        )}
        {hasLinks &&
          links.map((lnk: any, idx: number) => (
            <ActiveBadge
              key={`badge-${idx}`}
              type={lnk.type}
              url={lnk.url}
            />
          ))}
      </div>
    </div>
  );
}

function CategoryHeader({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: B,
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <span
        style={{
          display: "block",
          width: 20,
          height: 1,
          background: B,
        }}
      />
      {children}
    </div>
  );
}

function ItemList({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        background: GRAY_LINE,
      }}
    >
      {children}
    </div>
  );
}

export function IPSection() {
  return (
    <section
      style={{
        padding: "120px 0",
        borderBottom: `1px solid ${GRAY_LINE}`,
        background: "#111",
      }}
    >
      <div
        className="aios-inner"
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 60px",
        }}
      >
        <h2
          className="keep-all"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 3vw, 42px)",
            color: "#fff",
            textAlign: "center",
            marginBottom: 56,
          }}
        >
          Intellectual Property Portfolio
        </h2>

        <div style={{ marginBottom: 64 }}>
          <CategoryHeader>Technical Whitepapers</CategoryHeader>
          <ItemList>
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-1-Web3-ai.pdf"
              title="Newnal Web3 ai Technical Whitepaper"
              desc="'My own ai' (another-i) model that learns from personal data"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-2-Web3-ai-OS.pdf"
              title="Newnal Web3 ai OS Technical Whitepaper"
              desc="Blockchain-based 'Appless OS' architecture for personal AI agents having Web3 ai-ID and Web3 ai-Contract"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-3-Web3-Telecom.pdf"
              title="Newnal Web3 Telecom Technical Whitepaper"
              desc="Next-generation decentralized and secure communication protocol including AI-involved calls"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-4-Newnal-ai-Agent-Place.pdf"
              title="Newnal ai Agent Place Technical Whitepaper"
              desc="Marketplace for personal data and ai(another-i) agent service exchange"
            />
            <IPRow
              url="https://infrablockchain.net/documents/web3ai-newnal/Web3ai-Newnal-Tech-5-InfraBlockchain.pdf"
              title="Newnal InfraBlockchain Technical Whitepaper"
              desc="Stablecoin-native public federated multi-blockchain network and verifiable web data infrastructure"
            />
            <IPRow
              url="https://infrablockchain.net/documents/Universal_Resource_Auth_Technical_Whitepaper_v0.7c.pdf"
              title="Universal Resource Auth (UR-Auth) Protocol and System Architecture Technical Whitepaper"
              desc="Blockchain-based Web-scale Data Ownership Management Technology"
            />
            <IPRow
              url="https://infrablockchain.net/documents/InfraBlockchain_Technical_White_Paper_Version_2_4_ENG_202008.pdf"
              title="InfraBlockchain Technical Whitepaper"
              desc="Stablecoin as system tx fee token, Transaction-as-a-Vote, Proof-of-Transaction(PoT) consensus algorithm"
            />
            <IPRow
              url="https://infrablockchain.net/documents/YOSEMITE_Hybrid_Exchange_Technical_White_Paper_20170731a.pdf"
              title="ON/OFF-Chain Hybrid Token Exchange System Technical Whitepaper"
              desc="Blockchain-based large-scale high frequency trading system technology"
            />
            <IPRow
              url="https://docs.infrablockchain.net/infrablockchain-docs/infrablockchain/learn/architecture/architecture"
              title="InfraBlockchain-Substrate Multi-Blockchain Developer Documentation"
            />
            <IPRow
              url="https://docs.infrablockchain.net/infrablockchain-antelope"
              title="InfraBlockchain-Antelope Developer Documentation"
            />
            <IPRow
              url="https://github.com/InfraBlockchain/infra-did-method-specs/blob/main/docs/Infra-DID-method-spec.md"
              title="InfraDID Method Specification"
            />
            <IPRow
              url="https://www.w3.org/TR/did-extensions-methods/"
              title="InfraDID W3C DID Spec. Registry (did:infra)"
            />
            <IPRow
              url="https://github.com/infrablockchain"
              title="InfraBlockchain Open-Source Technology"
            />
          </ItemList>
        </div>

        <div style={{ marginBottom: 64 }}>
          <CategoryHeader>Utility Patents</CategoryHeader>
          <ItemList>
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=US448394725",
                },
                {
                  type: "EP",
                  url: "https://worldwide.espacenet.com/patent/search/family/087933602/publication/EP4507248A1?q=23195338.1",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230103842",
                },
              ]}
              title="Blockchain-Based Web Data Ownership and Data Access Management Method and System for Tracking AI Data Collection"
              num="US-20250055712-A1 / EP-23195338.1 / 10-2023-0103842"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/1K4kjA9sv-IQKnzz9rA_Skes7DHTXnt80/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1v2jF65mgN7cztVWpMjhEAUsJiCrcQhUo/view",
                },
              ]}
              title="Personalized AI Action Graph Generation Model Based AI Inference Device"
              num="US-18/779899 / 10-2024-0090806"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/1gIN7EaB8WVD0-U6jtHKVgv-muMzunapp/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/17aJpJPQfQ7UQm9L8psnMZj9G1l54Ss6l/view",
                },
              ]}
              title="A Device and Method for Owning and Trading Verifiable Personal Data Through Blockchain Based Personal Web Nodes"
              num="US-19/038309 / 10-2025-0019132"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=US444092601",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230073929",
                },
              ]}
              title="Device for Providing Blockchain DID-Based Multi Cloud Service and Its Operating Method"
              num="US-20240414014-A1 / 10-2023-0073929"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/1Zm0dULHUoKix4MI4XDuXUcVPYZa0rBpe/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1Hy_F5pxuBbsxIQtYjFwTkKKCYXcgo3DY/view",
                },
              ]}
              title="Mobile Device for Operating Personalized On-Device AI Agent Based on Personal Data"
              num="US-19/059568 / 10-2025-0019132"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/138fP9gKDgIkga-ee5k4S3Jt0fnnIL0Q8/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1qV7EJjz0GQ308mcdIXqfH7p7FUsLWhiC/view",
                },
              ]}
              title="User Interface for Running a Personalized AI-Dedicated Operating System on Various Types of User Devices"
              num="US-19/277871 / 10-2025-0098140"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-63-884059-P-1.pdf",
                },
              ]}
              title="Blockchain-Based AI Computing Mobile Operating System for Secure Decentralized Personal Data and Personalized AI Agent Services"
              num="US-63/884059"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/10r1XigF6h6GejNC2cIi5QHBP3CGeMutb/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1BKJMC00WWMzBXVps0-q8AFC-xrtVjpZy/view",
                },
              ]}
              title="Decentralized AI Agent Network System Built Upon Blockchain-Based Web3 AI-ID and Web3 AI-Contract for Verifiable Confidential AI Agent Computing"
              num="US-19/303959, US-63/764594 / 10-2025-0107438"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-63-865619-P-1.pdf",
                },
              ]}
              title="Blockchain-Based AI Agent Service Marketplace System Involving Personal AI Agents and Service AI Agents Utilizing Personal Data"
              num="US-63/865619"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://drive.google.com/file/d/13RyE757n5GoGMqk8RVvgLvFQo6_NItKn/view",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1YaglpOjWKW5cW3Gl-diGtu-yIFBG3ovU/view",
                },
              ]}
              title="A Device and Method for Extracting and Structuring Verifiable Personal Data from User Input and Output Data Captured on a Device Based on a Multi-Modal and Language AI Model"
              num="US-19/041098 / 10-2024-0014525"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1cMYzHNjKoPkHk5GskGRoQzHA68wnVxO5/view",
                },
              ]}
              title="Method and Device for Configuring and Operating Self-Evolving Personal AI Agent Based on Personal Data"
              num="10-2026-0012833"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1l4XWH1ZSgCWtfcrEsBtMyMRnn1PeJlOc/view",
                },
              ]}
              title="Blockchain-Based Home Node Device and Server-Based Operating System for Providing Personal Data Services and Personal AI Agent Services"
              num="10-2026-0013613"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-19-104055-2.pdf",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2024048838",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220108948",
                },
              ]}
              title="Electronic Device and Method Providing Secret Messenger Function Through End to End Encryption Based on Blockchain DID Technology"
              num="US-19/104055 / WO/2024/048838 / 10-2773087"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-19-059751.pdf",
                },
                {
                  type: "KR",
                  url: "https://drive.google.com/file/d/1OacAVR4WUz7i7fe9fyZ56jMgVAEjkUYK/view",
                },
              ]}
              title="Method and Device for Building Decentralized Secure Communication Infrastructure Network Based on Blockchain and DID Technology"
              num="US-19/059751 / 10-2025-0017836"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patents.google.com/patent/US11636450B2/en?oq=US-11636450-B2",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2019182202",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020180064925",
                },
              ]}
              title="Blockchain System to Which Proof-of-Transaction Consensus Algorithm is Applied, and Method Therefor"
              num="US-11636450-B2 / WO/2019/182202 / 10-225081"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patents.google.com/patent/US20240330915A1/en?oq=US-20240330915-A1",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230042651",
                },
              ]}
              title="Multi Blockchain Network System Without Native Cryptocurrency Based on Aggregated Proof-of-Transaction Consensus"
              num="US-20240330915-A1 / 1020230042651"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020190102905",
                },
              ]}
              title="Server and Method for Credit Transaction Using Blockchain Network"
              num="10-2249864"
            />
            <IPRow
              links={[
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2019035573",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020200146111",
                },
              ]}
              title="The Trading System and the Method Based on a Blockchain"
              num="WO/2019/035573 / 10-2309819"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://infrablockchain.net/documents/patent/US-18-709142-2.pdf",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2023085802",
                },
              ]}
              title="DID Authentication Method Using Smart Card and Smart Card Device"
              num="US-18/709142 / WO/2023/085802"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230165942",
                },
              ]}
              title="High-Performance Consensus Algorithm Simulator"
              num="10-2023-0165942"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210138662",
                },
              ]}
              title="The System and the Method for Managing Distribution History Using Non-Fungible Token"
              num="10-2700653"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220130057",
                },
              ]}
              title="System and Method for Trading Based on Blockchain Technologies"
              num="10-2022-0130057"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210090319",
                },
              ]}
              title="AI Model Training Apparatus and Method for Reading Test Results of a Diagnostic Kit"
              num="10-2613633"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210033409",
                },
              ]}
              title="A System and Method for Issuing and Verifying Digital Vaccination Certificates"
              num="10-2478963"
            />
            <IPRow
              links={[
                {
                  type: "US",
                  url: "https://patents.google.com/patent/US20240185994A1/en?oq=US-20240185994-A1",
                },
                {
                  type: "WIPO",
                  url: "https://patentscope.wipo.int/search/en/detail.jsf?docId=WO2022196851",
                },
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210033413",
                },
              ]}
              title="Method and System for Providing Certification of Vaccine Inoculation and Post-Inoculation Management"
              num="US-20240185994-A1 / WO/2022/196851 / 10-2488139"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210033415",
                },
              ]}
              title="Electronic Device and Method for Proving Private Information Between Individuals Based on Blockchain Technology"
              num="10-2490640"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020210120508",
                },
              ]}
              title="Method and System for Certificating COVID-19 Antibody"
              num="10-2591773"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220100263",
                },
              ]}
              title="Identity Management Systems and Methods Using DID Based on Blockchain Technology"
              num="10-2022-0100263"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220100264",
                },
              ]}
              title="AI-Based Identity Recognition Method and Electronic Device Thereof"
              num="10-2022-0100264"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020220108933",
                },
              ]}
              title="Blockchain DID-Based Real-Time Real Estate Registration Management System"
              num="10-2022-0108933"
            />
            <IPRow
              links={[
                {
                  type: "KR",
                  url: "https://doi.org/10.8080/1020230051359",
                },
              ]}
              title="Vehicle Remote Control and Vehicle Information Management Method Using Vehicle-DID Based on Blockchain Networks and the Vehicle Device Thereof"
              num="10-2023-0051359"
            />
          </ItemList>
        </div>
      </div>
    </section>
  );
}

/* ── APP MAIN ── */
export default function App() {
  if (window.location.pathname === "/hackathon") {
    window.location.replace(
      "https://hackathon.newnal.com//",
    );
  }
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <>
      <div
        style={{
          background: "#000",
          color: "#fff",
          minHeight: "100vh",
        }}
      >
        <StripBanner />
        <Nav />
        <Hero />
        <Section01 />
        <Section02 />
        <Section03 />
        <Section04 />
        <Section05 />
        <Section06 />
        <Section07 />
        <Section08 />
        <CTASection />
        <IPSection />
        <Footer />
      </div>
    </>
  );
}

