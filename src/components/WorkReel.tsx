"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/projects";

type WorkReelProps = {
  projects: Project[];
};

export function WorkReel({ projects }: WorkReelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closingRef = useRef(false);

  const active = index == null ? null : projects[index] ?? null;
  const count = projects.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  function goTo(next: number) {
    if (!count) return;
    setIndex(((next % count) + count) % count);
  }

  function goNext() {
    if (index == null) return;
    goTo(index + 1);
  }

  function goPrev() {
    if (index == null) return;
    goTo(index - 1);
  }

  function closeModal() {
    if (closingRef.current) return;
    closingRef.current = true;
    setOpen(false);
    window.setTimeout(() => {
      setIndex(null);
      closingRef.current = false;
      const vid = videoRef.current;
      if (vid) {
        vid.pause();
        vid.removeAttribute("src");
        vid.load();
      }
    }, 420);
  }

  useEffect(() => {
    if (index == null) {
      setOpen(false);
      return;
    }

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const enter = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setOpen(true));
    });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeModal();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(index + 1);
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);

    const playId = window.requestAnimationFrame(() => {
      const vid = videoRef.current;
      const piece = projects[index];
      if (!vid || !piece) return;
      if (vid.dataset.slug !== piece.slug) {
        vid.dataset.slug = piece.slug;
        vid.src = piece.src;
        vid.load();
      }
      const play = vid.play();
      if (play) play.catch(() => {});
    });

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(enter);
      window.cancelAnimationFrame(playId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, projects]);

  const modal =
    mounted && active && index != null
      ? createPortal(
          <div
            className={`fixed inset-x-0 bottom-0 top-14 z-[80] flex items-center justify-center p-4 md:top-16 sm:p-6 transition-[opacity,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              open
                ? "bg-ink/85 opacity-100 backdrop-blur-sm"
                : "bg-ink/0 opacity-0 backdrop-blur-none"
            }`}
            onClick={closeModal}
            role="presentation"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} — ${active.client}`}
              className={`relative flex w-full max-w-5xl max-h-[min(calc(100dvh-6.5rem),900px)] flex-col overflow-hidden rounded-2xl bg-ink shadow-[0_24px_80px_rgba(0,0,0,0.45)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                open
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={closeModal}
                className="absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center text-2xl font-light text-paper/70 transition hover:text-paper"
              >
                ×
              </button>

              <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
                <video
                  ref={videoRef}
                  className="max-h-[min(calc(100dvh-14rem),720px)] w-full object-contain"
                  controls
                  playsInline
                  autoPlay
                  onEnded={goNext}
                />
              </div>

              <div className="flex shrink-0 flex-wrap items-end justify-between gap-4 border-t border-paper/10 px-5 py-3 md:px-6">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-accent uppercase">
                    {active.client}
                  </p>
                  <h2 className="font-display mt-0.5 text-xl font-bold tracking-tight text-paper md:text-2xl">
                    {active.title}
                  </h2>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-paper/40 uppercase">
                    {index + 1} / {count}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous"
                    onClick={goPrev}
                    className="flex h-10 w-10 items-center justify-center border border-paper/15 text-paper/70 transition hover:border-accent hover:text-accent"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next"
                    onClick={goNext}
                    className="flex h-10 min-w-[5.5rem] items-center justify-center border border-accent bg-accent px-4 text-[11px] font-semibold tracking-[0.2em] text-paper uppercase transition hover:bg-paper hover:text-ink"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <ul className="mt-10 grid list-none grid-cols-1 p-0 sm:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.slug} className="relative m-0 aspect-[16/10] min-w-0 p-0">
            <button
              type="button"
              onClick={() => {
                closingRef.current = false;
                setIndex(i);
              }}
              className="group absolute inset-0 block overflow-hidden text-left"
              aria-label={`Play ${project.title} — ${project.client}`}
            >
              <Image
                src={project.poster}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent transition duration-500 group-hover:from-ink/90 group-hover:via-ink/45" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="text-[11px] font-semibold tracking-[0.28em] text-accent uppercase">
                  {project.client}
                </p>
                <h2 className="font-display mt-1.5 text-2xl font-bold tracking-tight text-paper md:text-3xl">
                  {project.title}
                </h2>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {modal}
    </>
  );
}
