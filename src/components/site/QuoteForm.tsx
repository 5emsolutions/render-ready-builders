import { useRef, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, FileText, X } from "lucide-react";

// Make.com custom webhook (Webhooks > Custom webhook > Copy address).
// The scenario editor link is NOT a submit endpoint.
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/l2u9aj3n3imr5w394hb8you4lv31ucj6";

const schema = z.object({
  builder: z.string().trim().min(2, "Enter your builder or company name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  location: z.string().trim().min(2, "Enter the project location").max(120),
  notes: z.string().trim().max(1000).optional(),
});

export function QuoteForm({ onDone }: { onDone?: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)].slice(0, 8));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      builder: form.get("builder"),
      email: form.get("email"),
      phone: form.get("phone"),
      location: form.get("location"),
      notes: form.get("notes") ?? "",
    });

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      if (!MAKE_WEBHOOK_URL) {
        // Never tell a builder their plans arrived when nothing was sent.
        throw new Error("Webhook not configured");
      }

      const payload = new FormData();
      Object.entries(parsed.data).forEach(([k, v]) => payload.append(k, String(v ?? "")));

      // Legacy keys so the existing Make -> Google Sheets mapping keeps filling.
      payload.append("name", parsed.data.builder);
      payload.append("company", parsed.data.builder);
      payload.append("message", parsed.data.notes ?? "");
      payload.append("submitted_at", new Date().toISOString());
      payload.append("source", "website");
      payload.append("file_count", String(files.length));

      files.forEach((f, i) => payload.append(`plan_${i + 1}`, f, f.name));

      const res = await fetch(MAKE_WEBHOOK_URL, { method: "POST", body: payload });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      toast.success("Plans received", {
        description: "You'll have a written quote back within 24 hours.",
      });
      (e.target as HTMLFormElement).reset();
      setFiles([]);
      onDone?.();
    } catch {
      toast.error("Something went wrong", {
        description: "Email plans directly to paul@5emsolutions.com and we'll pick it up.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Builder / Company" name="builder" error={errors["builder"]} />
        <Field label="Email" name="email" type="email" error={errors["email"]} />
        <Field label="Phone" name="phone" type="tel" error={errors["phone"]} />
        <Field label="Project location" name="location" error={errors["location"]} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-sm text-muted-foreground">
          Scope notes (optional)
        </Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          maxLength={1000}
          placeholder="Number of elevations, angles needed, deadline…"
          className="resize-none bg-background/60"
        />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center transition-colors ${
          dragging ? "border-primary bg-primary/10" : "border-border bg-background/40 hover:border-primary/60"
        }`}
      >
        <UploadCloud className="mb-3 h-6 w-6 text-accent" aria-hidden />
        <p className="text-sm font-semibold">Drop PDF plan sets & finish schedules</p>
        <p className="mt-1 text-xs text-muted-foreground">
          PDF, DWG, JPG or PNG — up to 8 files. No CAD model required.
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.dwg,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center gap-3 rounded-lg border border-border bg-background/50 px-3 py-2 text-sm"
            >
              <FileText className="h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span className="truncate">{f.name}</span>
              <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                {(f.size / 1024 / 1024).toFixed(1)} MB
              </span>
              <button
                type="button"
                aria-label={`Remove ${f.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles((prev) => prev.filter((_, idx) => idx !== i));
                }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Button type="submit" size="lg" disabled={submitting} className="w-full font-semibold">
        {submitting ? "Sending…" : "Get a 24-Hour Quote"}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Plans stay confidential. We never share or publish work without written approval.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm text-muted-foreground">
        {label}
      </Label>
      <Input id={name} name={name} type={type} maxLength={255} className="bg-background/60" />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
