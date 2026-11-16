import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { WorkReel } from "@/components/WorkReel";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected music supervision and development work from Fresh Bread — advertising, film, television, and sonic branding.",
};

export default function WorkPage() {
  return (
    <div className="pb-24">
      <div className="mx-auto max-w-6xl px-6 pt-28 md:px-10">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
          Work
        </p>
        <h1 className="font-display mt-4 max-w-2xl text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl">
          Recent work.
        </h1>
      </div>

      <WorkReel projects={projects} />

      <div className="mx-auto mt-14 max-w-6xl px-6 md:px-10">
        <Link
          href="/contact"
          className="inline-flex border border-ink bg-ink px-6 py-3 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase transition hover:border-accent hover:bg-accent"
        >
          Discuss a project
        </Link>
      </div>
    </div>
  );
}
