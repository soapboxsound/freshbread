"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="border border-accent/30 bg-accent/5 px-6 py-10">
        <p className="font-display text-2xl font-bold text-ink">Got it.</p>
        <p className="mt-3 text-muted">
          Placeholder confirmation — real delivery comes next.
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
        Send inquire
      </button>
    </form>
  );
}
