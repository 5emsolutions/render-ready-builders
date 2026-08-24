import { useCallback, useEffect, useRef, useState } from "react";
import { blueprintUrl, heroRenderUrl } from "./data";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [setFromClientX]);

  return (
    <div
      ref={ref}
      onPointerDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl border border-border md:aspect-[16/10]"
      style={{ boxShadow: "var(--shadow-elevated)" }}
    >
      <img
        src={heroRenderUrl}
        alt="Finished 4K twilight render of the completed home exterior"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        width={1200}
        height={900}
      />
      <div
        className="absolute inset-0 overflow-hidden bg-white"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={blueprintUrl}
          alt="Original black and white 2D PDF blueprint front elevation"
          className="absolute inset-0 h-full w-full object-contain"
          loading="lazy"
          width={1200}
          height={900}
        />
      </div>

      <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
        2D PDF
      </span>
      <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
        4K Render
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-primary"
        style={{ left: `${pos}%` }}
      >
        <div
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-background text-primary"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <span aria-hidden className="text-sm font-bold tracking-tighter">
            &lt;&nbsp;&gt;
          </span>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        aria-label="Compare blueprint and finished render"
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute bottom-0 left-0 h-10 w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
