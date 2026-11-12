import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="px-6 pt-28 pb-24 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        <div className="animate-rise">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            About
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl">
            Music with intention.
          </h1>
        </div>

        <div className="animate-fade space-y-8 text-lg leading-relaxed text-muted [animation-delay:0.15s] md:pt-12">
          <p>
            Fresh Bread is a music supervision and development company based in
            New York. Placeholder copy for now — the real story lands before
            launch.
          </p>
          <p>
            We dig for the cue that changes the frame: sync, original
            development, and the quiet work of taste under pressure.
          </p>
          <p className="border-l-2 border-accent pl-5 text-ink">
            Built for brands, film, and anyone who knows the room gets better
            when the music is right.
          </p>
          <Link
            href="/contact"
            className="inline-flex border border-ink bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase transition hover:border-accent hover:bg-accent"
          >
            Start a conversation
          </Link>
        </div>
      </div>
    </div>
  );
}
