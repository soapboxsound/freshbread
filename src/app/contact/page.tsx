import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Fresh Bread for music supervision, licensing, original development, and sonic branding.",
};

export default function ContactPage() {
  return (
    <div className="px-6 pt-28 pb-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Contact
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl">
            Tell us the brief.
          </h1>
        </Reveal>

        <div className="mt-12 grid items-start gap-10 md:mt-16 md:grid-cols-[22rem_minmax(0,1fr)] md:items-stretch md:gap-14 lg:grid-cols-[26rem_minmax(0,1fr)] lg:gap-16">
          <Reveal className="h-full min-h-[18rem] md:min-h-0">
            <div className="relative h-full min-h-[18rem] overflow-hidden rounded-2xl md:min-h-full">
              <Image
                src="/assets/office-desk.jpg"
                alt="Fresh Bread NYC — vinyl-headed executive at the desk"
                fill
                sizes="(max-width: 768px) 100vw, 26rem"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

          <div className="space-y-8 md:pt-1">
            <Reveal delay={80}>
              <a
                href="mailto:hello@freshbread.music"
                className="inline-block text-sm font-medium tracking-[0.04em] text-accent transition hover:text-ink"
              >
                hello@freshbread.music
              </a>
            </Reveal>

            <Reveal delay={120}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
