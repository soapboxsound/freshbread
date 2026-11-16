"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Fresh Bread inquiry — ${name}`);
    const body = encodeURIComponent(
      `${message}\n\n—\n${name}\n${email}`,
    );
    window.location.href = `mailto:hello@freshbread.music?subject=${subject}&body=${body}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-accent/25 bg-accent/[0.04] px-6 py-10">
        <p className="font-display text-2xl font-bold text-ink">Opening mail…</p>
        <p className="mt-3 text-muted">
          If nothing opened, write us directly at{" "}
          <a
            href="mailto:hello@freshbread.music"
            className="text-accent underline-offset-2 hover:underline"
          >
            hello@freshbread.music
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <label className="block text-left">
        <span className="text-[11px] tracking-[0.2em] text-faint uppercase">
          Name
        </span>
        <input
          required
          name="name"
          autoComplete="name"
          className="mt-2 w-full border-0 border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition focus:border-accent"
        />
      </label>
      <label className="block text-left">
        <span className="text-[11px] tracking-[0.2em] text-faint uppercase">
          Email
        </span>
        <input
          required
          type="email"
          name="email"
          autoComplete="email"
          className="mt-2 w-full border-0 border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition focus:border-accent"
        />
      </label>
      <label className="block text-left">
        <span className="text-[11px] tracking-[0.2em] text-faint uppercase">
          Project
        </span>
        <textarea
          required
          name="message"
          rows={4}
          className="mt-2 w-full resize-y border-0 border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition focus:border-accent"
        />
      </label>
      <button
        type="submit"
        className="border border-ink bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase transition hover:border-accent hover:bg-accent"
      >
        Send
      </button>
    </form>
  );
}
