import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, Github, Linkedin, Mail, Instagram, Download, ArrowRight, ArrowUp,
  Shield, Cloud, Code2, Server, Database, ChevronLeft, ChevronRight,
  ExternalLink, MapPin, Phone, Send, Award, GraduationCap, Briefcase,
  GitBranch, CheckCircle2, Sparkles, Terminal,
} from "lucide-react";
import heroImg from "./assets/hero.jpg";


/* ------------------------------ DATA ------------------------------ */

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const ROLES = ["Cloud Security Engineer", "Cybersecurity Enthusiast", "Full Stack Developer"];

const INTERESTS = [
  "Cloud Computing", "Cloud Security", "Cybersecurity", "Network Security",
  "DevOps", "Artificial Intelligence", "Software Development",
];

const SKILL_GROUPS = [
  {
    title: "Programming",
    icon: Code2,
    accent: "from-emerald-500 to-emerald-400",
    items: ["C++", "Python"],
  },
  {
    title: "Web Development",
    icon: Server,
    accent: "from-green-500 to-emerald-400",
    items: ["HTML", "CSS"],
  },
  {
    title: "Databases",
    icon: Database,
    accent: "from-emerald-400 to-emerald-500",
    items: ["MySQL"],
  },
  
  {
    title: "Cybersecurity",
    icon: Shield,
    accent: "from-green-500 to-emerald-400",
    items: ["Wireshark", "Nmap", "Burp Suite", "Metasploit"],
  },
  {
    title: "Tools & Networking",
    icon: GitBranch,
    accent: "from-emerald-400 to-green-500",
    items: ["Git", "GitHub", "Networking","linux"],
  },
];

const PROJECTS = [
  
  {
    title: "Portfolio Website",
    desc: "This site — a performance-tuned personal portfolio with motion design, glassmorphism, and a fully responsive component system.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
  },
 
  {
    title: "Network Scanner",
    desc: "A CLI-based host and port discovery tool built for internal reconnaissance labs, with service fingerprinting and export to CSV.",
    stack: ["Python", "Nmap", "Scapy", "Sockets"],
  },
 
 
];

const EDUCATION = [
  {
    title: "Higher Secondary Education (Class XII)",
    place: "Science Stream — Physics, Chemistry, Mathematics, Biology",
    time: "Completed",
    points: ["Built foundation in mathematics and computing", "Introduced to programming fundamentals"],
  },
  {
    title: "B.Tech — Computer Science Engineering",
    place: "Current Semester in progress",
    time: "In Progress",
    points: [
      "Relevant coursework: Data Structures, Computer Networks, Operating Systems, Database Management System, Cybersecurity Fundamentals",
      "Achievements: SOC Analyst & AI Security training completion, hands-on incident response capstone",
    ],
  },
];

const EXPERIENCE = [
  {
    type: "Training",
    title: "SOC Analyst & AI Security Intensive",
    org: "Self-directed / Guided Program",
    time: "Recent",
    points: ["Alert triage, Splunk SPL queries, MITRE ATT&CK mapping", "AI/ML attack vectors: prompt injection, OWASP LLM Top 10", "Simulated incident-response capstone exercise"],
  },
  {
    type: "Internship",
    title: "SOC Level 1 Analyst Intern",
    org: "Applications in progress",
    time: "Target Role",
    points: ["Actively applying to security-operations internships", "Focused on alert triage and log analysis workflows"],
  },
  
  {
    type: "Workshop",
    title: "Cloud & Network Security Workshop",
    org: "Community / Peer-led Session",
    time: "Past Season",
    points: ["Covered Bluetooth attack vectors and network defense basics", "Hands-on labs with Wireshark and Nmap"],
  },
 
];

const CERTIFICATES = [
  { title: "Introduction to Ethical Hacking", issuer: "Great learning Academy", year: "2024" },
  { title: "Advance Cybersecurity Theats and governace", issuer: "Great learning Academy", year: "2024" },
  { title: "C++ Programming", issuer: "Great learning Academy", year: "2024" },
  { title: "Network Security Fundamentals", issuer: "Learnvern Academy", year: "2024" },
  
];

/* --------------------------- UTIL HOOKS ---------------------------- */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------ RIPPLE ------------------------------ */

function useRipple() {
  const onClick = useCallback((e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const circle = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${e.clientX - rect.left - size / 2}px`;
    circle.style.top = `${e.clientY - rect.top - size / 2}px`;
    circle.className = "sp-ripple";
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 650);
  }, []);
  return onClick;
}

/* ------------------------------- APP ------------------------------- */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [typed, setTyped] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const glowRef = useRef(null);
  const heroRef = useRef(null);
  const blobRef = useRef(null);
  const certScrollRef = useRef(null);
  const ripple = useRipple();

  /* navbar scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* active section observer */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* typing effect */
  useEffect(() => {
    const current = ROLES[roleIdx];
    let i = 0;
    let deleting = false;
    let timeout;

    const tick = () => {
      if (!deleting) {
        i++;
        setTyped(current.slice(0, i));
        if (i === current.length) {
          timeout = setTimeout(() => {
            deleting = true;
            tick();
          }, 1400);
          return;
        }
        timeout = setTimeout(tick, 65);
      } else {
        i--;
        setTyped(current.slice(0, i));
        if (i === 0) {
          setRoleIdx((r) => (r + 1) % ROLES.length);
          return;
        }
        timeout = setTimeout(tick, 30);
      }
    };
    timeout = setTimeout(tick, 200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleIdx]);

  /* cursor glow + hero parallax (direct DOM writes, no re-render) */
  useEffect(() => {
    const onMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
      if (heroRef.current && blobRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        blobRef.current.style.transform = `translate(${relX * 24}px, ${relY * 24}px)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3200);
  };

  const scrollCerts = (dir) => {
    if (!certScrollRef.current) return;
    certScrollRef.current.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#030402] text-white font-sans antialiased overflow-x-hidden" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <GlobalStyles />

      {/* cursor glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-[5] hidden md:block"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, rgba(34,197,94,0.06) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />

      <Nav
        scrolled={scrolled}
        active={active}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <Hero heroRef={heroRef} blobRef={blobRef} typed={typed} scrollTo={scrollTo} ripple={ripple} />

      <About />

      <Skills />

      <Projects />

      <Experience />

      <Certificates certScrollRef={certScrollRef} scrollCerts={scrollCerts} />

      <Education />

      <Contact formState={formState} setFormState={setFormState} submitForm={submitForm} sent={sent} ripple={ripple} />

      <Footer scrollTo={scrollTo} />
    </div>
  );
}

/* ------------------------------ STYLES ------------------------------ */

function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@500;600;700;800&display=swap');
      html, body, #root { background-color: #030402 !important; margin: 0; padding: 0; min-height: 100%; }
      body { background: #030402; }
      * { scroll-behavior: smooth; }
      ::selection { background: rgba(16,185,129,0.35); color: #fff; }
      ::-webkit-scrollbar { width: 8px; height: 8px; }
      ::-webkit-scrollbar-track { background: #030402; }
      ::-webkit-scrollbar-thumb { background: linear-gradient(180deg,#10B981,#22C55E); border-radius: 8px; }
      .font-display { font-family: 'Poppins', 'Inter', sans-serif; }

      @keyframes floatY { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(-18px);} }
      @keyframes floatY2 { 0%,100% { transform: translateY(0px);} 50% { transform: translateY(14px);} }
      .sp-float { animation: floatY 7s ease-in-out infinite; }
      .sp-float-slow { animation: floatY2 11s ease-in-out infinite; }

      @keyframes blobPulse { 0%,100% { opacity: 0.55; transform: scale(1);} 50% { opacity: 0.85; transform: scale(1.08);} }
      .sp-blob { animation: blobPulse 8s ease-in-out infinite; }

      @keyframes gridMove { 0% { background-position: 0 0; } 100% { background-position: 48px 48px; } }
      .sp-grid {
        background-image: linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px);
        background-size: 48px 48px;
        animation: gridMove 14s linear infinite;
      }

      @keyframes blink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
      .sp-caret { animation: blink 0.9s step-start infinite; }

      @keyframes dash { to { stroke-dashoffset: 0; } }
      .sp-line { stroke-dasharray: 6 8; animation: dash 3.5s linear infinite; }

      @keyframes particleDrift { 0% { transform: translate(0,0); opacity:0; } 10% { opacity:1; } 90% { opacity:1; } 100% { transform: translate(var(--dx), var(--dy)); opacity:0; } }
      .sp-particle { animation: particleDrift linear infinite; }

      @keyframes gradShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      .sp-gradient-text {
        background: linear-gradient(90deg,#10B981,#22C55E,#34D399,#10B981);
        background-size: 300% 100%;
        -webkit-background-clip: text; background-clip: text; color: transparent;
        animation: gradShift 6s ease infinite;
      }

      .sp-ripple {
        position: absolute; border-radius: 9999px; transform: scale(0);
        background: rgba(255,255,255,0.45); pointer-events: none;
        animation: sp-ripple-anim 650ms ease-out;
      }
      @keyframes sp-ripple-anim { to { transform: scale(2.6); opacity: 0; } }

      .sp-card { position: relative; overflow: hidden; }
      .sp-card::before {
        content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1px;
        background: linear-gradient(135deg, rgba(16,185,129,0.35), rgba(34,197,94,0.15), transparent 60%);
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor; mask-composite: exclude;
        opacity: 0; transition: opacity .35s ease;
      }
      .sp-card:hover::before { opacity: 1; }
      .sp-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px -20px rgba(16,185,129,0.35); }

      .sp-nav-underline { position: relative; }
      .sp-nav-underline::after {
        content: ""; position: absolute; left: 0; bottom: -4px; height: 2px; width: 0%;
        background: linear-gradient(90deg,#10B981,#22C55E); transition: width .3s ease;
      }
      .sp-nav-underline.active::after, .sp-nav-underline:hover::after { width: 100%; }

      .sp-scroll-x::-webkit-scrollbar { height: 6px; }

      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
      }

      /* hacker hero extras */
      .sp-scanlines {
        background: repeating-linear-gradient(
          0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px,
          rgba(74,222,128,0.025) 3px, rgba(0,0,0,0) 4px
        );
      }
      .sp-scanlines-tight {
        background: repeating-linear-gradient(
          0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 1px,
          rgba(0,0,0,0.35) 2px, rgba(0,0,0,0) 3px
        );
      }
      .sp-glitch {
        position: relative;
        color: #fff;
        display: inline-block;
      }
      .sp-glitch::before, .sp-glitch::after {
        content: attr(data-text);
        position: absolute; left: 0; top: 0; width: 100%; height: 100%;
        background: transparent; overflow: hidden; opacity: 0;
      }
      .sp-glitch:hover::before {
        opacity: 0.8; color: #4ADE80; left: 2px;
        clip-path: inset(0 0 55% 0);
        animation: glitchTop 0.5s infinite linear alternate-reverse;
      }
      .sp-glitch:hover::after {
        opacity: 0.8; color: #34D399; left: -2px;
        clip-path: inset(55% 0 0 0);
        animation: glitchBottom 0.5s infinite linear alternate-reverse;
      }
      @keyframes glitchTop { 0% { transform: translateX(0); } 100% { transform: translateX(-2px); } }
      @keyframes glitchBottom { 0% { transform: translateX(0); } 100% { transform: translateX(2px); } }
    `}</style>
  );
}

/* ------------------------------- NAV -------------------------------- */

function Nav({ scrolled, active, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-6xl px-5 flex items-center justify-between rounded-2xl transition-all duration-500 ${
          scrolled ? "bg-[#081208]/70 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/30 py-2.5 px-6" : "py-1"
        }`}
      >
        <button onClick={() => scrollTo("home")} className="font-display font-extrabold text-xl tracking-tight flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#10B981] via-[#22C55E] to-[#34D399] flex items-center justify-center font-display font-extrabold text-sm text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            SP
          </span>
          <span className="hidden sm:inline text-slate-200 font-semibold">Sujeet Paswan</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`sp-nav-underline ${active === l.id ? "active text-white" : "text-slate-400 hover:text-slate-100"} transition-colors font-medium`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-emerald-400/50 hover:bg-white/10 transition-all"
        >
          Let's talk <ArrowRight size={14} />
        </button>

        <button className="lg:hidden text-slate-200" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile menu */}
      <div
        className={`lg:hidden mx-4 mt-2 rounded-2xl bg-[#081208]/95 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col p-4 gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active === l.id ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

/* ------------------------------- HERO -------------------------------- */

function Hero({ heroRef, blobRef, typed, scrollTo, ripple }) {
  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-black">
      {/* background layers — hacker terminal look */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050b06] to-black" />
      <MatrixRain />
      <div className="absolute inset-0 sp-grid opacity-[0.15]" />
      <div className="absolute inset-0 sp-scanlines pointer-events-none" />
      <div ref={blobRef} className="absolute inset-0 pointer-events-none" style={{ transition: "transform 0.2s ease-out" }}>
        <div className="sp-blob absolute -top-24 left-[8%] w-[420px] h-[420px] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="sp-blob absolute top-[35%] right-[6%] w-[460px] h-[460px] rounded-full bg-green-400/15 blur-[130px]" style={{ animationDelay: "2s" }} />
        <div className="sp-blob absolute bottom-[-10%] left-[30%] w-[380px] h-[380px] rounded-full bg-emerald-400/10 blur-[120px]" style={{ animationDelay: "4s" }} />
      </div>

      <NetworkNodes />
      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col lg:grid lg:grid-cols-[0.9fr_1fr] gap-10 lg:gap-12 items-center w-full">
        {/* image — shown first on all breakpoints */}
        <Reveal className="order-1 w-full">
          <div className="relative mx-auto lg:mx-0 lg:ml-auto max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-emerald-500/25 via-green-400/10 to-transparent blur-2xl sp-float-slow" />
            <div className="absolute -inset-px rounded-[1.75rem] border border-emerald-400/30 pointer-events-none z-20" />
            <div
              className="relative rounded-[1.75rem] overflow-hidden"
              style={{
                boxShadow: "0 0 0 1px rgba(74,222,128,0.15), 0 0 45px rgba(34,197,94,0.28), 0 0 100px rgba(6,182,212,0.12)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  boxShadow: "inset 0 0 40px 8px rgba(34,197,94,0.18)",
                  maskImage: "radial-gradient(ellipse at center, transparent 55%, black 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse at center, transparent 55%, black 100%)",
                }}
              />
              <div className="absolute inset-0 sp-scanlines-tight opacity-30 pointer-events-none z-10" />
              <img
                src={heroImg}
                alt="Sujeet Paswan"
                className="w-full h-auto object-cover"
                style={{
                  maskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 78%, transparent 100%)",
                  filter: "contrast(1.05) saturate(0.95)",
                }}
              />
              {/* clearance badge — top */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 border border-emerald-400/25 backdrop-blur-sm">
                <Shield size={11} className="text-emerald-400" />
                <span className="font-mono text-[9px] tracking-widest text-emerald-400">ACCESS_GRANTED</span>
              </div>
              <div className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-black/60 border border-emerald-400/25 backdrop-blur-sm">
                <span className="font-mono text-[9px] tracking-widest text-slate-300">ID: SP-2026</span>
              </div>

              {/* motivational note */}
              <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20 max-w-[42%] text-left">
                <p className="font-mono text-[10px] sm:text-[11px] text-emerald-300/90 leading-relaxed italic">
                  "Every system has a weakness.<br />I find it before someone else does."
                </p>
              </div>

              {/* professional ID plate */}
              <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3.5 bg-gradient-to-t from-black via-black/85 to-transparent">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="font-display font-extrabold text-sm sm:text-base text-white tracking-wide leading-tight">
                      SUJEET PASWAN
                    </div>
                    <div className="font-mono text-[10px] text-emerald-400 mt-0.5">
                      Cloud Security Engineer
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-slate-400">online</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* terminal text block */}
        <Reveal delay={100} className="order-2 w-full">
          <div className="rounded-2xl border border-emerald-500/20 bg-black/60 backdrop-blur-md overflow-hidden shadow-[0_0_60px_-15px_rgba(34,197,94,0.25)]">
            {/* terminal titlebar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-emerald-500/15 bg-white/[0.02]">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-mono text-[11px] text-slate-500">sujeetpaswan0144@gmail.com</span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col gap-5 font-mono">
              <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-medium text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                access_status: open_to_SOC_L1_internships
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl xl:text-5xl leading-[1.1] tracking-tight text-white">
                <span className="text-emerald-400">&gt;</span> Hi, I'm{" "}
                <span className="sp-glitch font-display font-black" data-text="Sujeet Paswan">
                  Sujeet Paswan
                </span>
              </h1>

              <div className="h-7 flex items-center text-base sm:text-lg text-emerald-300">
                <span className="text-slate-600 mr-2">$</span>
                <span>{typed}</span>
                <span className="sp-caret w-[9px] h-5 bg-emerald-400 ml-1" />
              </div>

              <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed font-sans">
                Computer Science Engineering student building at the intersection of cloud infrastructure, security operations, and full-stack development.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <button onClick={ripple} className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500 text-black font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:bg-emerald-400 hover:-translate-y-0.5 transition-all">
                  <Download size={15} /> Download Resume
                </button>
                <button onClick={(e) => { ripple(e); scrollTo("projects"); }} className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/5 text-emerald-300 font-semibold text-sm hover:border-emerald-400/60 hover:bg-emerald-500/10 hover:-translate-y-0.5 transition-all">
                  View Projects <ArrowRight size={15} />
                </button>
                <button onClick={(e) => { ripple(e); scrollTo("contact"); }} className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-400 hover:text-emerald-300 transition-all">
                  Contact Me
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: Linkedin, href: "https://www.linkedin.com/in/sujeet-paswan-586a69211", label: "LinkedIn" },
                  { icon: Github, href: "https://github.com/solocoder-01", label: "GitHub" },
                  { icon: Mail, href: "sujeetpaswan0144@gmail.com", label: "Email" },
                  { icon: Instagram, href: "https://www.instagram.com/solocoder_01?igsh=ZmN5bDZiaGZ2bmx6", label: "Instagram" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-400/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MatrixRain() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, columns, drops, raf;
    const chars = "01アイウエオカキクケコサシスセソ";

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      const fontSize = 15;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -100);
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 15;
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < columns; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillStyle = "rgba(52, 211, 153, 0.5)";
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-[0.22] pointer-events-none"
      aria-hidden="true"
    />
  );
}

function NetworkNodes() {
  const nodes = [
    [40, 90], [140, 40], [230, 120], [90, 190], [300, 60], [340, 190], [200, 220],
  ];
  const edges = [[0,1],[1,2],[0,3],[2,4],[2,6],[4,5],[3,6],[5,6]];
  return (
    <svg className="absolute right-[2%] top-[8%] w-[380px] h-[260px] opacity-[0.18] hidden xl:block pointer-events-none" viewBox="0 0 380 260">
      {edges.map(([a,b], i) => (
        <line key={i} className="sp-line" x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#22C55E" strokeWidth="1" />
      ))}
      {nodes.map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#4ADE80" />
      ))}
    </svg>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2,
    dur: 14 + Math.random() * 16,
    dx: (Math.random() - 0.5) * 60,
    dy: -40 - Math.random() * 80,
    delay: Math.random() * 10,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="sp-particle absolute rounded-full bg-emerald-300/50"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------- SECTION WRAPPER -------------------------------- */

function SectionHeading({ eyebrow, title, sub }) {
  return (
    <Reveal className="text-center mb-14 max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-3">
        <span className="w-6 h-px bg-emerald-400" /> {eyebrow} <span className="w-6 h-px bg-emerald-400" />
      </div>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-3">{title}</h2>
      {sub && <p className="text-slate-400 text-sm sm:text-base leading-relaxed">{sub}</p>}
    </Reveal>
  );
}

/* ------------------------------- ABOUT -------------------------------- */

function About() {
  return (
    <section id="about" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="About" title="Who I am" />
        <Reveal delay={100}>
          <div className="sp-card rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm p-8 sm:p-10 grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                I'm a <span className="text-white font-semibold">Computer Science Engineering student</span> who
                builds toward one goal: making systems both usable and defensible. My work spans cloud
                infrastructure, security operations, and full-stack products — currently focused on breaking into
                security operations as a <span className="text-emerald-400 font-semibold">SOC Level 1 Analyst</span>.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                I care about the details most people skip: least-privilege access, clean incident timelines, and
                interfaces that don't get in the way. Currently deep in Splunk queries, MITRE ATT&CK mapping, and
                the security implications of AI systems.
              </p>
            </div>
            <div className="flex flex-col gap-3 min-w-[180px]">
              {[
                { label: "Focus", value: "Cloud Security" },
                { label: "Target Role", value: "SOC L1 Analyst" },
                { label: "Status", value: "Actively Learning" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">{s.label}</div>
                  <div className="text-sm font-semibold text-white">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {INTERESTS.map((it, i) => (
            <Reveal key={it} delay={i * 60}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-slate-300 hover:border-emerald-400/50 hover:text-white hover:bg-white/10 transition-all cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#10B981] to-[#22C55E]" />
                {it}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- SKILLS -------------------------------- */

function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#081208]/50 to-transparent">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Skills" title="What I work with" sub="Tools and technologies across development, cloud, and security." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 90}>
              <div className="sp-card group rounded-2xl bg-white/[0.03] border border-white/10 p-6 h-full transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.accent} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <g.icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg mb-4 text-white">{g.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- PROJECTS -------------------------------- */

function Projects() {
  return (
  /*  <section id="projects" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Projects" title="Selected work" sub="A mix of security tooling and full-stack builds." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <div className="sp-card group rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden h-full flex flex-col transition-all duration-300">
                <div className="h-36 relative overflow-hidden bg-gradient-to-br from-[#0C1A12] to-[#081208] flex items-center justify-center">
                  <div className="absolute inset-0 sp-grid opacity-20" />
                  <span className="font-display font-extrabold text-3xl sp-gradient-text relative z-10">
                    {p.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display font-bold text-base text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.stack.map((t) => (
                      <span key={t} className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <a href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors">
                      <Github size={14} /> GitHub
                    </a>
                    <a href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section> 
    */
  );
}

/* ------------------------------- EXPERIENCE -------------------------------- */

function Experience() {
  return (
    <section id="experience" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#081208]/50 to-transparent">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Experience" title="Internships, training & more" />
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/60 via-green-500/40 to-transparent" />
          {EXPERIENCE.map((e, i) => (
            <Reveal key={e.title} delay={i * 100}>
              <div className="relative pb-10 last:pb-0">
                <div className="absolute -left-[26px] top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#10B981] to-[#22C55E] shadow-lg shadow-emerald-500/40 ring-4 ring-[#030402]" />
                <div className="sp-card rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-emerald-400/30 transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-green-500/15 text-green-300 border border-green-500/25">
                      {e.type}
                    </span>
                    <span className="text-[11px] text-slate-500">{e.time}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-0.5">{e.title}</h3>
                  <div className="text-sm text-slate-500 mb-3">{e.org}</div>
                  <ul className="space-y-1.5">
                    {e.points.map((pt) => (
                      <li key={pt} className="text-sm text-slate-400 flex gap-2">
                        <ChevronRight size={14} className="mt-0.5 text-emerald-400 shrink-0" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CERTIFICATES -------------------------------- */

function Certificates({ certScrollRef, scrollCerts }) {
  return (
    <section id="certificates" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Certificates" title="Training & credentials" />
        <div className="relative">
          <div ref={certScrollRef} className="sp-scroll-x flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-pl-6">
            {CERTIFICATES.map((c, i) => (
              <Reveal key={c.title} delay={i * 70} className="shrink-0 w-[270px] snap-start">
                <div className="sp-card rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm p-6 h-full flex flex-col">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-white/10 flex items-center justify-center mb-4">
                    <Award size={20} className="text-emerald-400" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mb-1.5 leading-snug">{c.title}</h3>
                  <p className="text-xs text-slate-500 mb-1">{c.issuer}</p>
                  <p className="text-[11px] text-slate-600 mt-auto pt-3">{c.year}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="hidden sm:flex justify-end gap-2 mt-4">
            <button onClick={() => scrollCerts(-1)} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-emerald-400/50 transition-all">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scrollCerts(1)} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 hover:border-emerald-400/50 transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- EDUCATION -------------------------------- */

function Education() {
  return (
    <section id="education" className="relative py-28 px-6 bg-gradient-to-b from-transparent via-[#081208]/50 to-transparent">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Education" title="Academic timeline" />
        <div className="relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-400/60 via-emerald-500/40 to-transparent" />
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.title} delay={i * 120}>
              <div className="relative pb-10 last:pb-0">
                <div className="absolute -left-[26px] top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-lg shadow-emerald-500/40 ring-4 ring-[#030402] flex items-center justify-center">
                </div>
                <div className="sp-card rounded-2xl bg-white/[0.03] border border-white/10 p-6 hover:border-emerald-400/30 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap size={16} className="text-emerald-400" />
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-widest">{ed.time}</span>
                  </div>
                  <h3 className="font-display font-bold text-white text-base mb-1">{ed.title}</h3>
                  <div className="text-sm text-slate-500 mb-3">{ed.place}</div>
                  <ul className="space-y-1.5">
                    {ed.points.map((pt) => (
                      <li key={pt} className="text-sm text-slate-400 flex gap-2">
                        <CheckCircle2 size={14} className="mt-0.5 text-emerald-400 shrink-0" /> {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CONTACT -------------------------------- */

function Contact({ formState, setFormState, submitForm, sent, ripple }) {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow="Contact" title="Let's build something secure" sub="Open to SOC Analyst internships, collaborations, and interesting problems." />
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <Reveal>
            <div className="flex flex-col gap-4">
              {[
                { icon: Mail, label: "Email", value: "sujeetpaswan0144@example.com" },
                { icon: Phone, label: "Phone", value: "+91 XXXXX XXXXX" },
                { icon: MapPin, label: "Location", value: "India" },
              ].map((c) => (
                <div key={c.label} className="sp-card rounded-2xl bg-white/[0.03] border border-white/10 p-5 flex items-center gap-4">
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-white/10 flex items-center justify-center">
                    <c.icon size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-slate-500">{c.label}</div>
                    <div className="text-sm font-medium text-slate-200">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form onSubmit={submitForm} className="sp-card rounded-2xl bg-white/[0.03] border border-white/10 p-7 sm:p-8 flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400">Name</label>
                  <input
                    value={formState.name}
                    onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                    type="text"
                    placeholder="Your name"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.07] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-slate-400">Email</label>
                  <input
                    value={formState.email}
                    onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                    type="email"
                    placeholder="you@example.com"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.07] transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-slate-400">Message</label>
                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  rows={5}
                  placeholder="Tell me about the opportunity or idea..."
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-400/60 focus:bg-white/[0.07] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                onClick={ripple}
                className="relative overflow-hidden self-start inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#22C55E] font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
              >
                <Send size={16} /> {sent ? "Message Sent!" : "Send Message"}
              </button>
              {sent && <p className="text-xs text-emerald-400 flex items-center gap-1.5"><CheckCircle2 size={13} /> Thanks — I'll get back to you soon.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- FOOTER -------------------------------- */

function Footer({ scrollTo }) {
  return (
    <footer className="relative border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Sparkles size={14} className="text-emerald-400" />
          © {new Date().getFullYear()} Sujeet Paswan. All rights reserved.
        </div>
        <div className="flex items-center gap-4">
          {[
            { icon: Linkedin, href: "#" },
            { icon: Github, href: "#" },
            { icon: Mail, href: "#" },
            { icon: Instagram, href: "#" },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:border-emerald-400/50 transition-all">
              <Icon size={15} />
            </a>
          ))}
        </div>
        <button
          onClick={() => scrollTo("home")}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#22C55E] flex items-center justify-center shadow-lg shadow-emerald-500/25 hover:-translate-y-1 transition-transform"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
