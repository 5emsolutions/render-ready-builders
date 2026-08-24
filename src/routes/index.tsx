import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BeforeAfter } from "@/components/site/BeforeAfter";
import { Portfolio } from "@/components/site/Portfolio";
import { QuoteForm } from "@/components/site/QuoteForm";
import { heroRenderUrl } from "@/components/site/data";
import { ArrowRight, FileUp, Boxes, Sparkles, Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "5EM Solutions | 2D Blueprints to Photorealistic 3D Renders";
    const description =
      "Architectural visualization for custom home builders and spec developers. PDF plans to 4K photorealistic renders in 5 days. No CAD files required.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});

const steps = [
  {
    icon: FileUp,
    title: "Send PDF Plans & Finish Schedule",
    body: "Two-page plan set is enough — floor plan, front elevation, and your exterior finish selections. No CAD or Revit model needed.",
  },
  {
    icon: Boxes,
    title: "Approve 48-Hour Clay Proof",
    body: "You get an untextured massing proof within 48 hours to confirm rooflines, window placement, and proportions before we texture anything.",
  },
  {
    icon: Sparkles,
    title: "Receive 4K Marketing Renders",
    body: "Final 4K stills delivered day five — sized for MLS, print, signage, and social, with one round of revisions included.",
  },
];

function Index() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const openQuote = () => setQuoteOpen(true);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="font-display text-lg font-bold tracking-tight">
            5EM<span className="text-accent"> Solutions</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#compare">Before / After</a>
            <a className="transition-colors hover:text-foreground" href="#work">Recent Work</a>
            <a className="transition-colors hover:text-foreground" href="#process">Process</a>
            <a className="transition-colors hover:text-foreground" href="#quote">Submit Plans</a>
          </nav>
          <Button onClick={openQuote} className="font-semibold">Get a 24-Hour Quote</Button>
        </div>
      </header>

      <main id="top">
        <section className="hero-glow relative overflow-hidden border-b border-border">
          <div className="section-shell grid gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-28">
            <div>
              <p className="eyebrow">Architectural Visualization · Greenville, NC</p>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                Turn 2D PDF Blueprints Into Photorealistic 3D Renders in 5 Days.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Helping custom home builders pre-sell unbuilt inventory and capture buyer deposits
                before pouring concrete. No CAD files required.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button size="lg" onClick={openQuote} className="font-semibold" style={{ boxShadow: "var(--shadow-glow)" }}>
                  Get a 24-Hour Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
                <Button asChild size="lg" variant="outline" className="font-semibold">
                  <a href="#work">View Recent Work</a>
                </Button>
              </div>
              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
                {[
                  ["5 days", "Plans to final 4K"],
                  ["48 hrs", "Clay proof approval"],
                  ["0", "CAD files required"],
                ].map(([k, v]) => (
                  <div key={v}>
                    <dt className="font-display text-2xl font-semibold">{k}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <img
                src={heroRenderUrl}
                alt="Photorealistic twilight render of a single-story custom home exterior"
                width={1200}
                height={900}
                className="w-full rounded-2xl border border-border object-cover"
                style={{ boxShadow: "var(--shadow-elevated)" }}
              />
              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>Twilight exterior · 4K delivery</span>
                <span>Rendered from a two-page PDF set</span>
              </div>
            </div>
          </div>
        </section>

        <section id="compare" className="border-b border-border py-24">
          <div className="section-shell">
            <p className="eyebrow">Before / After</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
              Drag the handle. Same plan set, five days apart.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Left is the raw black-and-white elevation your architect sent over. Right is the 4K
              twilight render your buyers actually respond to.
            </p>
            <div className="mt-10">
              <BeforeAfter />
            </div>
          </div>
        </section>

        <Portfolio />

        <section id="process" className="border-t border-border py-24">
          <div className="section-shell">
            <p className="eyebrow">The Process</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold sm:text-4xl">
              Three steps, one point of contact.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className="card-surface p-7 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-accent">
                      <s.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="font-display text-4xl font-bold text-border">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="quote" className="border-t border-border py-24">
          <div className="section-shell grid gap-14 lg:grid-cols-[0.85fr_1fr]">
            <div>
              <p className="eyebrow">Submit Plans</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Send the plan set. Get a written quote in 24 hours.
              </h2>
              <p className="mt-5 text-muted-foreground">
                Upload your PDF plans and exterior finish schedule. We scope against the actual
                drawings — angles, elevations, and deadline — and send back fixed pricing with a
                delivery date. No sales call required.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
                {[
                  "Fixed-price quote, no hourly billing",
                  "One revision round included on every package",
                  "Renders delivered print, MLS, and signage ready",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-7 sm:p-9">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-14">
        <div className="section-shell flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-lg font-bold">
              5EM<span className="text-accent"> Solutions</span>
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Architectural visualization for custom home builders and spec developers.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-muted-foreground">
            <a className="flex items-center gap-2 transition-colors hover:text-foreground" href="mailto:hello@5emsolutions.com">
              <Mail className="h-4 w-4" /> hello@5emsolutions.com
            </a>
            <a className="flex items-center gap-2 transition-colors hover:text-foreground" href="tel:+12525550142">
              <Phone className="h-4 w-4" /> (252) 555-0142
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Greenville, North Carolina
            </p>
          </div>
        </div>
        <div className="section-shell mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} 5EM Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="transition-colors hover:text-foreground" href="/privacy">Privacy Policy</a>
            <a className="transition-colors hover:text-foreground" href="mailto:hello@5emsolutions.com">Contact</a>
          </div>
        </div>
      </footer>

      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-border bg-popover sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Get a 24-Hour Quote</DialogTitle>
            <DialogDescription>
              Send your plan set and we'll return fixed pricing and a delivery date within one
              business day.
            </DialogDescription>
          </DialogHeader>
          <QuoteForm onDone={() => setQuoteOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
