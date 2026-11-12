import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="px-6 pt-28 pb-24 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        <div className="animate-rise">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Contact
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl">
            Tell us the brief.
          </h1>
          <p className="mt-5 max-w-sm text-lg text-muted">
            Placeholder inquire form — wires to email before October. Or reach
            us directly.
          </p>
          <a
            href="mailto:hello@freshbread.music"
            className="mt-8 inline-block text-sm font-medium tracking-[0.04em] text-accent transition hover:text-ink"
          >
            hello@freshbread.music
          </a>
        </div>

        <div className="animate-fade [animation-delay:0.15s] md:pt-12">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
