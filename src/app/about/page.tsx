import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fresh Bread is a New York music company offering music supervision, licensing, original development, and sonic branding for advertising, film, and TV.",
};

export default function AboutPage() {
  return (
    <div className="px-6 pt-28 pb-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            About
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl">
            The right music for the right moment.
          </h1>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 md:mt-16 md:grid-cols-[minmax(0,22rem)_1fr] md:gap-14 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
          <Reveal>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/assets/about-kitchen.jpg"
                alt="Fresh Bread — vinyl-headed baker in the kitchen"
                width={1024}
                height={1024}
                className="aspect-square h-auto w-full object-cover"
                priority
              />
            </div>
          </Reveal>

          <div className="space-y-8 md:pt-1">
            <Reveal delay={80} className="space-y-5 text-lg leading-relaxed text-muted">
              <p>
                Fresh Bread is a New York based music company working across
                advertising, film, and TV. From major broadcast moments to
                podcasts and every category in between, we handle music
                supervision, licensing and negotiation, original music
                development, sonic branding, and music department consulting.
              </p>
              <p>
                More than twenty years of experience creating and placing music
                for brands and award-winning campaigns. From early strategy
                through production, sound design, and final mix — so clients can
                stay focused on the work.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <p className="border-l-2 border-accent pl-5 text-xl leading-snug text-ink md:text-2xl">
                Taste under pressure. Cues that land. Process that holds from
                first listen to final mix.
              </p>
              <div className="mt-8 flex md:justify-end">
                <Link
                  href="/contact"
                  className="inline-flex border border-ink bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase transition hover:border-accent hover:bg-accent"
                >
                  Start a conversation
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={80} className="mt-24">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Capabilities
          </p>
          <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
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
                className="border-t border-ink/10 pt-4 text-sm tracking-[0.04em] text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
