import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { works, filters, type Category, type Work } from "./data";
import { Maximize2 } from "lucide-react";

export function Portfolio() {
  const [active, setActive] = useState<Category | "all">("all");
  const [zoom, setZoom] = useState<Work | null>(null);
  const shown = active === "all" ? works.slice(0, 6) : works.filter((w) => w.category === active);

  return (
    <section id="work" className="border-t border-border py-24">
      <div className="section-shell">
        <p className="eyebrow">Recent Work</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl text-3xl font-semibold sm:text-4xl">
            Renders builders put straight on the listing.
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active === f.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
          {shown.map((w) => (
            <button
              key={w.url}
              onClick={() => setZoom(w)}
              className={`group relative overflow-hidden rounded-2xl border border-border row-span-2 ${w.span}`}
            >
              <img
                src={w.url}
                alt={w.title}
                loading="lazy"
                width={1200}
                height={900}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-left">
                <div>
                  <p className="text-sm font-semibold">{w.title}</p>
                  <p className="text-xs text-muted-foreground">{w.meta}</p>
                </div>
                <Maximize2 className="h-4 w-4 shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!zoom} onOpenChange={(o) => !o && setZoom(null)}>
        <DialogContent className="max-w-[95vw] border-border bg-background p-2 sm:max-w-5xl">
          <DialogTitle className="sr-only">{zoom?.title ?? "Render preview"}</DialogTitle>
          {zoom && (
            <img
              src={zoom.url}
              alt={zoom.title}
              className="h-auto max-h-[85vh] w-full rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
