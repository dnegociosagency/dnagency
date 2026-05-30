'use client';

import React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

// Auxiliar para junção de classes
function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

// ─── Divisor dinâmico ─────────────────────────────────────────────────────────
function Divider({ className }: { className?: string }) {
  return <hr className={cx("my-[2vw] border-t border-brand-white/15", className)} />;
}

// ─── Bloco de stat dinâmico ───────────────────────────────────────────────────
function Stat({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="min-w-[160px] flex-1">
      <p className="mb-2 text-sm font-bold uppercase tracking-wider opacity-90">{label}</p>
      <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
        {desc}
      </p>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function ManifestoScrollSection() {
  return (
    <section data-theme="dark" id="manifesto-scroll" aria-label="DN Manifesto" className="w-full">
      <FlowArt aria-label="DN Agency Manifesto">

        {/* ── 01 Who We Are (Sempre verde, excelente contraste) ──────────────── */}
        <FlowSection
          aria-label="Who we are"
          className="bg-brand-primary text-white"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
            01 — Who We Are
          </p>

          <Divider className="border-white/20" />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Growth
            <br />
            Through
            <br />
            Method
          </h2>

          <Divider className="border-white/20" />

          <p className="mt-auto max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-90">
            We are not a typical agency. We are growth engineers — combining data 
            intelligence, conversion-focused design, and paid media to scale businesses 
            predictably and sustainably.
          </p>
        </FlowSection>

        {/* ── 02 Our Mission (Dinâmico: Branco no Light / Escuro no Dark) ─────── */}
        <FlowSection
          aria-label="Our mission"
          className="bg-brand-dark text-brand-white transition-colors duration-300"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
            02 — Our Mission
          </p>

          <Divider />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Revenue
            <br />
            Above
            <br />
            All
          </h2>

          <Divider />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-85">
            Every dollar spent on paid media must yield a measurable return. We work 
            to drive down customer acquisition costs (CAC) and increase lifetime value (LTV) 
            — month after month.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="Paid Media"
              desc="High-intent search and social campaigns optimized daily for maximum return on investment."
            />
            <Stat
              label="Strategic Creative"
              desc="Scroll-stopping creatives and high-impact messaging — backed by continuous A/B testing."
            />
            <Stat
              label="CRO & UX Design"
              desc="Landing pages engineered to convert. Every element is structured to prompt visitor action."
            />
          </div>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="Advanced Analytics"
              desc="Real-time dashboards, multi-touch attribution, and clear reporting on metrics that matter."
            />
            <Stat
              label="Marketing Automation"
              desc="Automated email, SMS, and remarketing workflows that nurture leads and reactivate customers."
            />
            <Stat
              label="Competitor Intelligence"
              desc="We monitor your competitors and uncover untapped opportunities before the market reacts."
            />
          </div>

          <Divider />

          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-85">
            Every decision we make starts with a simple question: Will this drive client revenue?
          </p>
        </FlowSection>

        {/* ── 03 How It Works (Dinâmico: Creme no Light / Preto no Dark) ──────── */}
        <FlowSection
          aria-label="How it works"
          className="bg-brand-darker text-brand-white transition-colors duration-300"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
            03 — How It Works
          </p>

          <Divider />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Diagnose.
            <br />
            Launch.
            <br />
            Scale.
          </h2>

          <Divider />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-80">
            Four streamlined phases. Zero wasted spend. Watch your pipeline expand 
            from month one.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="01 — Audit & Blueprint"
              desc="Deep-dive audit of your current digital setup, competition, and opportunities. Setting real KPIs."
            />
            <Stat
              label="02 — Funnel Building"
              desc="We set up tracking, pixels, high-converting landing pages, and creatives before spending a single dollar."
            />
            <Stat
              label="03 — Launch & Scale"
              desc="Campaigns go live with daily optimization. Precise bidding and budget control to maintain efficiency."
            />
          </div>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="04 — Optimization"
              desc="We cut underperforming ads, double down on winning campaigns, and deliver weekly performance reports."
            />
            <Stat
              label="05 — Expansion"
              desc="Testing new acquisition channels, audiences, and creative angles to sustain rapid growth."
            />
            <Stat
              label="06 — Automation"
              desc="Integrating CRMs, scheduling systems, and automated email flows so your business captures leads 24/7."
            />
          </div>
        </FlowSection>

        {/* ── 04 By the Numbers (Dinâmico: Branco no Light / Escuro no Dark) ───── */}
        <FlowSection
          aria-label="Our metrics"
          className="bg-brand-dark text-brand-white transition-colors duration-300"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
            04 — By the Numbers
          </p>

          <Divider />

          <h2 className="text-[clamp(3.5rem,12vw,13rem)] font-black leading-[0.85] uppercase tracking-tight">
            Metrics
            <br />
            That
            <br />
            Prove
          </h2>

          <Divider />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-85">
            Don't take our word for it. Let the metrics do the talking.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="+340%"
              desc="average ROAS generated for our client accounts within the first 90 days."
            />
            <Stat
              label="-62%"
              desc="reduction in Customer Acquisition Cost (CAC) after our first 60 days of optimization."
            />
            <Stat
              label="6+ Years"
              desc="of collective expertise in paid advertising, web engineering, and product strategy."
            />
          </div>

          <Divider />

          <p className="max-w-[52ch] text-[clamp(1rem,2.5vw,1.8rem)] font-light leading-relaxed opacity-85">
            The landscape has evolved. Relying on gut feeling or vanity metrics is costing 
            you revenue. Data wins.
          </p>

          <Divider />

          <div className="flex flex-wrap gap-[3vw]">
            <Stat
              label="100% Transparent"
              desc="Real-time access to all campaign data, dashboards, and assets. No hidden agency black boxes."
            />
            <Stat
              label="Flexible Terms"
              desc="We retain clients through exceptional performance, not rigid, long-term contracts."
            />
            <Stat
              label="Dedicated Squad"
              desc="Every client gets a dedicated growth squad. You are never treated as just a ticket."
            />
          </div>
        </FlowSection>

      </FlowArt>
    </section>
  );
}

