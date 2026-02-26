"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import {
  Shield,
  Zap,
  Building2,
  Lock,
  Server,
  Users,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Globe,
  Target,
  ShieldCheck,
  ChevronDown,
  ChevronRight,
  Layers,
  Network,
  Timer,
  TrendingUp,
  Crosshair,
  Scale,
  Lightbulb,
  Anchor,
  Landmark,
  ArrowUpRight,
  Handshake,
  Info,
} from "lucide-react";

/* ── Tooltip Component ──────────────────────────────── */
function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <span className="relative inline-flex">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onClick={() => setShow((p) => !p)}
        className="cursor-help"
      >
        {children}
      </span>
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg bg-[#252B3D] border border-[#7ED1CC]/20 text-[#D0D6E3] text-sm leading-snug whitespace-normal w-56 text-center shadow-xl z-50 pointer-events-none">
          {label}
          <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#252B3D]" />
        </span>
      )}
    </span>
  );
}

/* ── Accordion Component ────────────────────────────── */
function Accordion({
  icon: Icon,
  num,
  question,
  title,
  headline,
  body,
  defaultOpen = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  num: string;
  question: string;
  title: string;
  headline: string;
  body: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <button
      onClick={() => setOpen((p) => !p)}
      className="stat-card rounded-2xl p-5 md:p-6 flex items-start gap-4 w-full text-left cursor-pointer group"
    >
      <div className="shrink-0 w-14 h-14 rounded-2xl bg-[#7ED1CC]/8 border border-[#7ED1CC]/15 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Icon className="w-6 h-6 text-[#7ED1CC]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono text-[#7ED1CC] tracking-wider uppercase">{num} &middot; {question}</span>
            <h3 className="text-xl md:text-2xl font-bold text-[#F3F3F3] mt-1">{title}</h3>
            <p className="text-[#D0D6E3] text-base md:text-lg mt-0.5">{headline}</p>
          </div>
          <ChevronDown className={`w-6 h-6 text-[#7ED1CC] shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </div>
        <div
          className="overflow-hidden transition-all duration-400 ease-in-out"
          style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0, marginTop: open ? "12px" : "0px" }}
        >
          <p className="text-[#9498A3] text-base leading-relaxed">{body}</p>
        </div>
      </div>
    </button>
  );
}

/* ── Case Study Expandable Card ─────────────────────── */
function CaseCard({
  icon: Icon,
  name,
  subtitle,
  problem,
  outcome,
  stats,
  accentColor = "#7ED1CC",
}: {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  subtitle: string;
  problem: string;
  outcome: string;
  stats: { value: string; label: string }[];
  accentColor?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`glass rounded-2xl overflow-hidden ${accentColor === "#6AA9F9" ? "border-[#6AA9F9]/15" : "border-[#7ED1CC]/15"}`}>
      {/* Always-visible header + stats */}
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full text-left p-6 md:p-8 cursor-pointer group"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center border" style={{ background: `${accentColor}15`, borderColor: `${accentColor}30` }}>
              <Icon className={`w-6 h-6 ${accentColor === "#6AA9F9" ? "text-[#6AA9F9]" : "text-[#7ED1CC]"}`} />
            </div>
            <div>
              <h3 className="font-bold text-[#F3F3F3] text-2xl">{name}</h3>
              <p className="text-[#9498A3] text-sm">{subtitle}</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 text-sm shrink-0 ${accentColor === "#6AA9F9" ? "text-[#6AA9F9]" : "text-[#7ED1CC]"}`}>
            <span className="hidden sm:inline">{open ? "Less" : "Full Story"}</span>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </div>
        </div>

        {/* Stats — always visible */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className={`bg-[#1A1F2E]/80 rounded-xl p-3 border text-center ${accentColor === "#6AA9F9" ? "border-[#6AA9F9]/10" : "border-[#7ED1CC]/10"}`}>
              <span className={`text-2xl md:text-3xl font-bold ${accentColor === "#6AA9F9" ? "text-[#6AA9F9]" : "text-[#7ED1CC]"}`}>{s.value}</span>
              <p className="text-[#9498A3] text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </button>

      {/* Expandable detail */}
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: open ? "500px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className={`px-6 md:px-8 pb-6 md:pb-8 space-y-4 border-t ${accentColor === "#6AA9F9" ? "border-[#6AA9F9]/10" : "border-[#7ED1CC]/10"}`}>
          <div className="pt-5">
            <p className="text-[#D0D6E3] text-lg font-semibold mb-2">Mission Problem</p>
            <p className="text-[#9498A3] text-base leading-relaxed">{problem}</p>
          </div>
          <div>
            <p className="text-[#D0D6E3] text-lg font-semibold mb-2">Outcome Enabled</p>
            <p className="text-[#9498A3] text-base leading-relaxed">{outcome}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reveal hook ────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const init = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { node.classList.add("visible"); observer.unobserve(node); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return init;
}

/* ── Badge data with tooltips ───────────────────────── */
const badges = [
  { label: "FedRAMP High", tip: "The highest federal security authorization for cloud services, required for the most sensitive unclassified government data." },
  { label: "IL5 / IL6", tip: "Impact Levels 5 and 6 authorize handling of Controlled Unclassified Information (CUI) and classified national security data in the cloud." },
  { label: "SOC 2 Type II", tip: "An independent audit verifying that security controls are effective over time — the gold standard for enterprise trust." },
  { label: "Zero Data Retention", tip: "Your code and data are never stored or used for training. Nothing leaves your environment." },
];

/* ── Main Page ──────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s cubic-bezier(0,0,0.2,1), transform 0.8s cubic-bezier(0,0,0.2,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal(), r4 = useReveal();
  const r5 = useReveal(), r6 = useReveal(), r7 = useReveal(), r8 = useReveal();
  const r9 = useReveal(), r10 = useReveal();

  /* SI accordion state */
  const [siOpen, setSiOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#1A1F2E] text-[#D0D6E3] font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7ED1CC] to-[#14BEB4] flex items-center justify-center">
              <Cpu className="w-4.5 h-4.5 text-[#1A1F2E]" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-[#F3F3F3]">Cognition AI</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm text-[#9498A3]">
            <a href="#why" className="hover:text-[#7ED1CC] transition-colors">Why Now</a>
            <a href="#pillars" className="hover:text-[#7ED1CC] transition-colors">Five Pillars</a>
            <a href="#outcomes" className="hover:text-[#7ED1CC] transition-colors">Outcomes</a>
            <a href="#partners" className="hover:text-[#7ED1CC] transition-colors">For SIs</a>
            <a href="#trust" className="hover:text-[#7ED1CC] transition-colors">Trust</a>
            <a href="#contact" className="hover:text-[#7ED1CC] bg-[#7ED1CC]/10 text-[#7ED1CC] px-5 py-2 rounded-full border border-[#7ED1CC]/25 hover:bg-[#7ED1CC]/15 transition-all">Connect</a>
          </div>
        </div>
      </nav>

      {/* ════════════ HERO ════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(126,209,204,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(126,209,204,0.012)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7ED1CC]/5 rounded-full blur-[140px] pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-[#6AA9F9]/4 rounded-full blur-[100px] pulse-glow" style={{ animationDelay: "2s" }} />

        <div ref={heroRef} className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7ED1CC]/20 bg-[#7ED1CC]/5 text-[#7ED1CC] text-sm mb-8">
            <Globe className="w-4 h-4" />
            GovConEdge AI &middot; Episode 2 &middot; 2026
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="bg-gradient-to-r from-[#F3F3F3] to-[#D0D6E3] bg-clip-text text-transparent">
              Faster Decisions.
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#7ED1CC] to-[#63D4CD] bg-clip-text text-transparent animate-gradient">
              Clearer Outcomes.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-[#9498A3] max-w-3xl mx-auto mb-4 leading-relaxed">
            AI without context builds the wrong thing faster.<br className="hidden md:block" />
            Cognition gives your teams <strong className="text-[#D0D6E3]">mission clarity sooner</strong>.
          </p>
          <p className="text-base md:text-lg text-[#9498A3]/70 max-w-2xl mx-auto leading-relaxed">
            A decision-making platform for federal leaders, system integrators, and the defense industrial base.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-10">
            {badges.map((b) => (
              <Tooltip key={b.label} label={b.tip}>
                <span className="badge-hover px-4 py-2 rounded-full border border-[#7ED1CC]/20 bg-[#7ED1CC]/5 text-[#7ED1CC] text-sm font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  {b.label}
                  <Info className="w-3.5 h-3.5 opacity-40" />
                </span>
              </Tooltip>
            ))}
          </div>

          <a href="#why" className="inline-flex items-center text-[#9498A3] hover:text-[#7ED1CC] transition-colors">
            <ChevronDown className="w-7 h-7 float" />
          </a>
        </div>
      </section>

      {/* ════════════ WHY NOW ════════════ */}
      <section id="why" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={r1} className="reveal text-center mb-14">
            <p className="text-[#7ED1CC] font-mono text-sm mb-4 tracking-wider uppercase">Why &middot; The Case for Change</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight text-[#F3F3F3]">
              The bottleneck isn&apos;t technology.<br />It&apos;s decision speed.
            </h2>
            <p className="text-[#9498A3] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              The real constraint is getting mission leaders the <strong className="text-[#D0D6E3]">context they need to decide correctly</strong>&mdash;before resources go down the wrong path.
            </p>
          </div>

          <div ref={r2} className="reveal stagger-children grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Crosshair,
                title: "Avoid Building the Wrong Thing Faster",
                desc: "AI without mission context accelerates waste. Cognition surfaces the right priorities before a single line ships.",
              },
              {
                icon: Lightbulb,
                title: "Mission Clarity Sooner",
                desc: "Autonomous agents map dependencies and produce actionable plans in hours — giving decision-makers the picture weeks earlier.",
              },
              {
                icon: TrendingUp,
                title: "Compound Every Dollar",
                desc: "Output per dollar has changed by orders of magnitude. Procurement anchored to 2024 benchmarks leaves mission value on the table.",
              },
            ].map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6 md:p-8">
                <item.icon className="w-9 h-9 text-[#7ED1CC] mb-4" />
                <h3 className="text-xl font-bold text-[#F3F3F3] mb-3">{item.title}</h3>
                <p className="text-[#9498A3] text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FIVE PILLARS (Accordion) ════════════ */}
      <section id="pillars" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E2438]/50 to-transparent" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div ref={r3} className="reveal text-center mb-14">
            <p className="text-[#7ED1CC] font-mono text-sm mb-4 tracking-wider uppercase">Five Pillars &middot; Tap to Explore</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#F3F3F3]">
              Mission. Platform. Trust.<br />Acquisition. Workforce.
            </h2>
            <p className="text-[#9498A3] text-lg max-w-2xl mx-auto">
              Click any pillar below to see how Cognition maps to your framework.
            </p>
          </div>

          <div ref={r4} className="reveal space-y-3">
            <Accordion
              icon={Target} num="01" question="Why" title="Mission Alignment"
              headline="Accelerate the mandate — not just the code."
              body="Whether it's national defense readiness or public-benefit delivery, Devin compounds mission output per dollar. Autonomous agents handle the backlog, modernization, and CVE remediation so senior engineers focus on the decisions that move the mission."
              defaultOpen={true}
            />
            <Accordion
              icon={Layers} num="02" question="Where" title="Correct Platform Fit"
              headline="Slots into the environment you already have."
              body="Devin operates inside your existing tools — GitHub, BitBucket, Jira, CI/CD — without a rip-and-replace. From legacy COBOL to cloud-native, it meets agencies and SIs exactly where they are. FedRAMP High authorized, IL5/IL6 ready."
            />
            <Accordion
              icon={Shield} num="03" question="What" title="Trusted Environment"
              headline="Explainable, auditable, human-in-the-loop."
              body="Every output goes through human review, vulnerability scanning, and audit logging. Zero data retention. SOC 2 Type II. Born in the most regulated commercial environments — banks, insurance, FSI — and hardened for federal."
            />
            <Accordion
              icon={Scale} num="04" question="How" title="Acquisition Mapping"
              headline="Fits the way government buys."
              body="Available through GSA contract vehicles and SI partner agreements. Cognition maps AI capabilities to existing contract line items so capture teams can include it in proposals today — not after a new procurement cycle."
            />
            <Accordion
              icon={Users} num="05" question="Who" title="Workforce & Adoption"
              headline="Empower people, don't replace them."
              body="Government employees own more of the development lifecycle. SIs deliver dramatically more for less. Devin backfills capacity for modernization, testing, and DevOps — without new headcount. Adoption is days, not quarters."
            />
          </div>
        </div>
      </section>

      {/* ════════════ OUTCOMES — NAVAIR & Treasury ════════════ */}
      <section id="outcomes" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={r5} className="reveal text-center mb-14">
            <p className="text-[#7ED1CC] font-mono text-sm mb-4 tracking-wider uppercase">Mission Outcomes &middot; Click for Details</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#F3F3F3]">
              Where faster decisions<br />changed the outcome.
            </h2>
            <p className="text-[#9498A3] text-lg max-w-2xl mx-auto">
              One defense, one civilian — real mission problems, measurable results.
            </p>
          </div>

          <div ref={r6} className="reveal stagger-children grid md:grid-cols-2 gap-6 mb-8">
            <CaseCard
              icon={Anchor}
              name="NAVAIR"
              subtitle="Department of Defense · Naval Aviation"
              problem="Fleet-readiness software carried years of technical debt and critical vulnerabilities. Modernization was measured in years. Manual CVE remediation couldn't keep pace with emerging threats."
              outcome="Devin autonomously triaged and remediated backlogged vulnerabilities while modernizing legacy codebases — compressing a multi-year timeline into months. Engineers focused on mission-critical decisions instead of manual patching."
              stats={[
                { value: "10x", label: "Faster CVE remediation" },
                { value: "Months", label: "vs. years to modernize" },
                { value: "24/7", label: "Autonomous coverage" },
              ]}
              accentColor="#7ED1CC"
            />
            <CaseCard
              icon={Landmark}
              name="U.S. Treasury"
              subtitle="Civilian Agency · Financial Services"
              problem="Critical public-facing financial systems needed rapid modernization for evolving regulatory mandates and fraud detection — while maintaining uninterrupted service to hundreds of millions of taxpayers."
              outcome="Cognition accelerated legacy financial system modernization, enabling faster fraud-detection deployment and compliance updates — without service disruption. Decision-makers gained system visibility weeks earlier."
              stats={[
                { value: "8x", label: "Faster delivery cycles" },
                { value: "Zero", label: "Service disruptions" },
                { value: "Weeks", label: "Earlier decision clarity" },
              ]}
              accentColor="#6AA9F9"
            />
          </div>

          <div ref={r7} className="reveal glass-bright rounded-2xl p-6">
            <p className="text-[#7ED1CC] font-mono text-xs mb-4 tracking-wider uppercase text-center">Also Deployed Across</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "U.S. Army", type: "Department of Defense" },
                { name: "NASA", type: "Space & Science" },
                { name: "Federal Reserve", type: "Financial Regulation" },
                { name: "SSA", type: "Civilian Agency" },
              ].map((a) => (
                <div key={a.name} className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1F2E]/60 border border-[#7ED1CC]/8">
                  <Building2 className="w-5 h-5 text-[#7ED1CC] shrink-0" />
                  <div>
                    <p className="font-semibold text-[#F3F3F3] text-sm">{a.name}</p>
                    <p className="text-[#9498A3] text-xs">{a.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SI PARTNERS ════════════ */}
      <section id="partners" className="py-20 md:py-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E2438]/40 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6">
          <div ref={r8} className="reveal text-center mb-14">
            <p className="text-[#7ED1CC] font-mono text-sm mb-4 tracking-wider uppercase">For System Integrators</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#F3F3F3]">
              Where Cognition fits<br />in your solution stack.
            </h2>
            <p className="text-[#9498A3] text-lg max-w-2xl mx-auto">
              We don&apos;t compete with SIs — we make your delivery faster, your proposals stronger, and your margins better.
            </p>
          </div>

          <div ref={r9} className="reveal grid md:grid-cols-2 gap-6 mb-8">
            {/* Solution Stack */}
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="font-bold text-[#F3F3F3] text-xl mb-5 flex items-center gap-3">
                <Layers className="w-6 h-6 text-[#7ED1CC]" />
                The Solution Stack
              </h3>
              <div className="space-y-3">
                {[
                  { layer: "Mission Owner", detail: "Agency leadership defines outcomes", highlight: false },
                  { layer: "System Integrator", detail: "Program delivery, domain expertise, workforce", highlight: false },
                  { layer: "Cognition (Devin + Windsurf)", detail: "Autonomous engineering capacity layer", highlight: true },
                  { layer: "Cloud & Infrastructure", detail: "AWS GovCloud, Azure Gov, on-prem", highlight: false },
                ].map((item, i) => (
                  <div key={item.layer} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${item.highlight ? "border-[#7ED1CC]/30 bg-[#7ED1CC]/8 scale-[1.02]" : "border-[#7ED1CC]/6 bg-[#1A1F2E]/40"}`}>
                    <span className="text-sm font-mono text-[#7ED1CC] w-6 text-center">{i + 1}</span>
                    <div>
                      <p className={`font-semibold text-base ${item.highlight ? "text-[#7ED1CC]" : "text-[#F3F3F3]"}`}>{item.layer}</p>
                      <p className="text-[#9498A3] text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How SIs Operationalize — Accordion items */}
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="font-bold text-[#F3F3F3] text-xl mb-5 flex items-center gap-3">
                <Handshake className="w-6 h-6 text-[#7ED1CC]" />
                How SIs Operationalize
              </h3>
              <div className="space-y-2">
                {[
                  { title: "Embed in Proposals", desc: "Include Devin as an autonomous capacity multiplier in your next capture. Map to existing CLINs." },
                  { title: "Accelerate Delivery", desc: "10+ engineers-worth of parallel output. Compress delivery timelines without growing headcount." },
                  { title: "Modernize at Scale", desc: "Legacy migration, COBOL-to-modern, CVE remediation — Devin handles the volume, your team handles the architecture." },
                  { title: "Strengthen Win Rate", desc: "Differentiate with AI-native delivery. Show the government dramatically more output per dollar." },
                ].map((item, i) => (
                  <button
                    key={item.title}
                    onClick={() => setSiOpen(siOpen === i ? null : i)}
                    className="w-full text-left flex items-start gap-3 p-4 rounded-xl border border-[#7ED1CC]/8 bg-[#1A1F2E]/40 hover:border-[#7ED1CC]/20 transition-all cursor-pointer group"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#7ED1CC] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-[#F3F3F3] text-base">{item.title}</p>
                        <ChevronRight className={`w-4 h-4 text-[#7ED1CC] transition-transform duration-300 ${siOpen === i ? "rotate-90" : ""}`} />
                      </div>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: siOpen === i ? "120px" : "0px", opacity: siOpen === i ? 1 : 0, marginTop: siOpen === i ? "8px" : "0px" }}
                      >
                        <p className="text-[#9498A3] text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-bright rounded-2xl p-5 md:p-6 flex items-start gap-4">
            <Zap className="w-7 h-7 text-[#7ED1CC] shrink-0" />
            <p className="text-[#9498A3] text-base leading-relaxed">
              <strong className="text-[#F3F3F3]">Top defense contractors and SIs are already using or piloting Devin.</strong> We partner with your existing program teams — no competitive overlap, no vendor lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ TRUST & SECURITY ════════════ */}
      <section id="trust" className="py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto px-6">
          <div ref={r10} className="reveal text-center mb-12">
            <p className="text-[#7ED1CC] font-mono text-sm mb-4 tracking-wider uppercase">Trust &middot; Security</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-[#F3F3F3]">
              Built for the most<br />sensitive environments.
            </h2>
            <p className="text-[#9498A3] text-lg max-w-2xl mx-auto">
              Born in banks, insurance, and financial services. Hardened for federal.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: ShieldCheck, title: "FedRAMP High", desc: "Highest-impact secure cloud deployments", tip: "The highest federal security authorization for cloud services." },
              { icon: Lock, title: "IL5 / IL6", desc: "CUI and classified national security workloads", tip: "Impact Levels for handling sensitive defense data in the cloud." },
              { icon: Server, title: "Private Deployment", desc: "Inside your security boundary. Air-gapped options.", tip: "Deployed within your own infrastructure — nothing leaves your network." },
              { icon: Shield, title: "Zero Data Retention", desc: "No training on customer data. Code never leaves.", tip: "Your code is never stored, analyzed, or used to train models." },
            ].map((item) => (
              <Tooltip key={item.title} label={item.tip}>
                <div className="stat-card rounded-2xl p-6 text-center cursor-help group">
                  <item.icon className="w-8 h-8 text-[#7ED1CC] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-[#F3F3F3] text-lg mb-1">{item.title}</h3>
                  <p className="text-[#9498A3] text-sm">{item.desc}</p>
                </div>
              </Tooltip>
            ))}
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-[#F3F3F3] text-lg mb-4 flex items-center gap-2">
              <Network className="w-5 h-5 text-[#7ED1CC]" />
              Works With Your Existing Tools
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "Existing dev & test pipelines",
                "Vulnerability scanning tools",
                "GitHub, BitBucket, GitLab",
                "CI/CD & DevSecOps toolchains",
                "Jira, Slack, Linear",
                "ITAR data handling",
                "SOC 2, HIPAA, CCPA",
                "SSO, RBAC, audit logging",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-[#9498A3] text-sm">
                  <ArrowRight className="w-4 h-4 text-[#7ED1CC] mt-0.5 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ SPEAKER ════════════ */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-3xl mx-auto px-6">
          <div className="glass-bright rounded-3xl p-10 md:p-14 text-center accent-glow">
            <p className="text-[#7ED1CC] font-mono text-sm mb-5 tracking-wider uppercase">Your Speaker</p>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#7ED1CC] to-[#14BEB4] mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-[#1A1F2E]">
              CD
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#F3F3F3] mb-2">Chase Dalton</h3>
            <p className="text-[#7ED1CC] text-lg mb-6">National Security Lead, Cognition AI</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-[#9498A3] mb-5">
              {[
                "Nuclear Engineer, U.S. Navy",
                "Former Palantir (Space Commission)",
                "Leading NatSec Deployments",
              ].map((item) => (
                <span key={item} className="badge-hover px-4 py-2 rounded-full border border-[#7ED1CC]/10 bg-[#1E2438]/80">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-[#9498A3] text-base max-w-lg mx-auto leading-relaxed">
              Works directly with federal agencies, SIs, and defense contractors to deploy across Navy, NAVAIR, Army, NASA, Treasury, and more.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ KEY TAKEAWAY ════════════ */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[#7ED1CC]/3 rounded-3xl blur-xl" />
            <div className="relative glass-bright rounded-3xl p-12 md:p-16 border-[#7ED1CC]/10 accent-glow">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5 leading-tight text-[#F3F3F3]">
                Stop building the wrong thing faster.<br />
                Start making <span className="text-[#7ED1CC]">better decisions sooner.</span>
              </h2>
              <p className="text-[#9498A3] text-lg max-w-2xl mx-auto mb-8">
                Cognition fits your security architecture, acquisition pathways, and partner ecosystem.
              </p>
              <div className="grid sm:grid-cols-3 gap-6 max-w-xl mx-auto">
                <div>
                  <Timer className="w-8 h-8 text-[#7ED1CC] mx-auto mb-2" />
                  <p className="text-[#D0D6E3] text-base font-semibold">Decision Speed</p>
                  <p className="text-[#9498A3] text-sm mt-1">Clarity weeks earlier</p>
                </div>
                <div>
                  <ShieldCheck className="w-8 h-8 text-[#7ED1CC] mx-auto mb-2" />
                  <p className="text-[#D0D6E3] text-base font-semibold">Inside the Perimeter</p>
                  <p className="text-[#9498A3] text-sm mt-1">FedRAMP High, IL5/IL6</p>
                </div>
                <div>
                  <TrendingUp className="w-8 h-8 text-[#7ED1CC] mx-auto mb-2" />
                  <p className="text-[#D0D6E3] text-base font-semibold">Proven at Scale</p>
                  <p className="text-[#9498A3] text-sm mt-1">NAVAIR, Treasury &amp; more</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ CONTACT ════════════ */}
      <section id="contact" className="py-20 md:py-28 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[#7ED1CC] font-mono text-sm mb-4 tracking-wider uppercase">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 text-[#F3F3F3]">
            Ready to see how it works?
          </h2>
          <p className="text-[#9498A3] text-lg mb-10 max-w-xl mx-auto">
            Federal agency, system integrator, or defense contractor — we&apos;ll walk you through it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cognition.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn px-8 py-4 rounded-full bg-gradient-to-r from-[#7ED1CC] to-[#14BEB4] text-[#1A1F2E] font-bold text-base flex items-center gap-2"
            >
              Visit cognition.ai
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href="mailto:chase@cognition.ai"
              className="cta-outline px-8 py-4 rounded-full border border-[#7ED1CC]/20 text-[#D0D6E3] font-bold text-base"
            >
              Contact Chase Directly
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1E2438] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#9498A3]">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-[#7ED1CC] to-[#14BEB4] flex items-center justify-center">
              <Cpu className="w-3 h-3 text-[#1A1F2E]" />
            </div>
            Cognition AI &middot; GovConEdge AI 2026
          </div>
          <p>FedRAMP High &middot; IL5/IL6 &middot; SOC 2 Type II &middot; Zero Trust</p>
        </div>
      </footer>
    </div>
  );
}
