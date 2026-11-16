import Image from "next/image";
import Link from "next/link";
import { Sequencer } from "@/components/Sequencer";
import { Reveal } from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      <Sequencer />

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
        {/* Soft blue atmosphere behind the mark */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] h-[min(70vw,28rem)] w-[min(90vw,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(11,59,131,0.14)_0%,rgba(11,59,131,0.05)_42%,transparent_70%)]"
        />

        <div className="animate-rise relative w-[min(32rem,58vw)]">
          <Image
            id="logo-mark"
            src="/assets/fresh-bread-wordmark.png"
            alt="Fresh Bread NYC"
            width={1024}
            height={515}
            priority
            className="h-auto w-full transition-transform duration-100"
          />
        </div>

        <div className="animate-divider mt-7 h-1 w-14 rounded-sm bg-accent" />

        <p className="animate-fade mt-5 text-[0.8rem] font-semibold tracking-[0.28em] text-accent uppercase [animation-delay:0.3s]">
          Music Supervision &amp; Development
        </p>
      </section>

      <div
        aria-hidden
        className="relative z-10 h-2 w-full bg-accent md:h-2.5"
      />

      <section className="relative z-10 bg-ink">
        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-16 md:px-10 md:py-24 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Reveal className="w-full max-w-md lg:max-w-lg lg:order-2">
            <Image
              src="/assets/vinyl-guy.png"
              alt="Fresh Bread — vinyl-headed figure in a suit"
              width={682}
              height={1024}
              className="mx-auto h-auto w-full object-contain"
              priority={false}
            />
          </Reveal>
          <Reveal
            delay={140}
            className="mt-10 max-w-md text-center lg:order-1 lg:mt-0 lg:text-left"
          >
            <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
              Fresh Bread Music
            </p>
            <h2 className="font-display mt-4 text-3xl leading-[1.08] font-bold tracking-tight text-paper md:text-5xl">
              Sound with intention.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-paper/55 md:text-lg">
              Supervision, licensing, and original development for advertising,
              film, and television — cues that change the frame.
            </p>
            <p className="mt-10 text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
              Services
            </p>
            <ul className="mt-5 space-y-3 text-left">
              {[
                "Music Department Consulting",
                "Music Supervision",
                "Licensing & Negotiation",
                "Sonic Branding",
                "Music Production",
                "Music Strategy",
                "Sound Design",
                "Music Editing",
                "Original Music Development",
              ].map((item) => (
                <li
                  key={item}
                  className="border-t border-paper/10 pt-3 text-sm tracking-[0.04em] text-paper/70"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="mt-10 inline-block text-[11px] font-semibold tracking-[0.2em] text-accent uppercase transition hover:text-paper"
            >
              More about us →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
