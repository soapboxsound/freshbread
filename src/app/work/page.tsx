import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <div className="px-6 pt-28 pb-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-xl animate-rise">
          <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
            Work
          </p>
          <h1 className="font-display mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-ink md:text-6xl">
            Selected moments.
          </h1>
          <p className="mt-5 text-lg text-muted">
            Placeholder projects for now — real credits land before October.
          </p>
        </header>

        <ul className="divide-y divide-ink/10 border-y border-ink/10">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Link
                href={`/work#${project.slug}`}
                id={project.slug}
                className="group grid grid-cols-1 items-end gap-6 py-10 transition md:grid-cols-[1fr_1.2fr_auto] md:gap-10"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="aspect-[16/10] w-full bg-gradient-to-br from-ink/10 via-accent/15 to-ink/5 transition duration-500 group-hover:from-ink/15 group-hover:via-accent/25" />
                <div className="text-left">
                  <p className="text-[11px] tracking-[0.2em] text-faint uppercase">
                    {project.category} · {project.year}
                  </p>
                  <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-ink md:text-4xl">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{project.client}</p>
                  <p className="mt-4 max-w-md text-base text-muted">
                    {project.summary}
                  </p>
                </div>
                <span className="hidden text-[11px] tracking-[0.2em] text-accent uppercase md:block">
                  View
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
