import { CalendarClock, Bell } from "lucide-react";
import { useState } from "react";
import { useLang } from "../lib/context";

export default function PostpaidSection() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-8"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)", borderStyle: "dashed" }}
    >
      <div className="relative">
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          style={{ backgroundColor: "var(--surface-2)", color: "var(--accent)", border: "1px solid var(--border)" }}
        >
          <CalendarClock size={13} /> {t.postSoon}
        </div>
        <h2 className="text-xl font-bold" style={{ color: "var(--text)" }}>{t.postTitle}</h2>
        <p className="mt-1.5 max-w-md text-sm" style={{ color: "var(--text-muted)" }}>
          {t.postDesc}
        </p>

        {submitted ? (
          <div
            className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
            style={{ backgroundColor: "var(--surface-3)", color: "var(--accent)" }}
          >
            <Bell size={15} /> {t.notifyOk}
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubmitted(true); }}
            className="mt-5 flex max-w-md gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{ backgroundColor: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }}
            />
            <button
              type="submit"
              className="rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)", border: "1px solid var(--border)" }}
            >
              {t.notifyMe}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
