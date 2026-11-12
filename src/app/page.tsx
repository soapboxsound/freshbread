import Image from "next/image";
import Link from "next/link";
import { Sequencer } from "@/components/Sequencer";
import { VinylGrooves } from "@/components/VinylGrooves";

export default function HomePage() {
  return (
    <>
      <VinylGrooves />
      <Sequencer />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-28 text-center">
        <div className="animate-rise relative w-[min(32rem,58vw)]">
          <Image
            id="logo-mark"
            src="/assets/fresh-bread-wordmark.png"
            alt="Fresh Bread NYC"
            width={1215}
            height={596}
            priority
            className="h-auto w-full transition-transform duration-100"
          />
        </div>

        <div className="animate-divider mt-7 h-1 w-14 rounded-sm bg-accent" />

        <p className="animate-fade mt-5 text-[0.8rem] font-semibold tracking-[0.28em] text-accent uppercase [animation-delay:0.35s]">
          Music Supervision &amp; Development
        </p>
        <p className="animate-fade mt-3 max-w-[28ch] text-base font-medium text-muted md:text-lg [animation-delay:0.45s]">
          The right cue for the moment. Built in New York.
        </p>

        <div className="animate-fade mt-10 flex flex-wrap items-center justify-center gap-4 [animation-delay:0.55s]">
          <Link
            href="/work"
            className="border border-ink bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase transition hover:bg-accent hover:border-accent"
          >
            See Work
          </Link>
          <Link
            href="/contact"
            className="border border-ink/25 px-6 py-3 text-[11px] font-semibold tracking-[0.2em] text-ink uppercase transition hover:border-accent hover:text-accent"
          >
            Inquire
          </Link>
        </div>
      </section>
    </>
  );
}
