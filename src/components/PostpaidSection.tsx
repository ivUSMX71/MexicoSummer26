import { CalendarClock, Bell } from "lucide-react";
import { useState } from "react";

export default function PostpaidSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-8"
      style={{ backgroundColor: "#0d1e35", borderColor: "#1e3a5f", borderStyle: "dashed" }}
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl" style={{ backgroundColor: "#22d3ee11" }} />
      <div className="relative">
        <div
          className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
          style={{ backgroundColor: "#0a1628", color: "#22d3ee", border: "1px solid #1e3a5f" }}
        >
          <CalendarClock size={13} /> Próximamente
        </div>
        <h2 className="text-xl font-bold" style={{ color: "#e2e8f0" }}>Planes de renta (pospago)</h2>
        <p className="mt-1.5 max-w-md text-sm" style={{ color: "#64748b" }}>
          Estamos recopilando los planes pospago de AT&T, Telcel, Movistar y resellers de Altan.
          Avísanos cuando quieras ser de los primeros en compararlos.
        </p>

        {submitted ? (
          <div
            className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium"
            style={{ backgroundColor: "#0e2a4a", color: "#22d3ee" }}
          >
            <Bell size={15} /> ¡Gracias! Te avisaremos cuando esté listo.
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
              placeholder="tu@correo.com"
              className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{ backgroundColor: "#0a1628", border: "1px solid #1e3a5f", color: "#e2e8f0" }}
            />
            <button
              type="submit"
              className="rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              style={{ backgroundColor: "#22d3ee22", color: "#22d3ee", border: "1px solid #22d3ee44" }}
            >
              Avísame
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
