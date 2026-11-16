import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-ink/8 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[11px] tracking-[0.18em] text-faint uppercase">
          © {new Date().getFullYear()} Fresh Bread · NYC
        </p>
        <div className="flex gap-6">
          <Link
            href="/contact"
            className="text-[11px] tracking-[0.18em] text-muted uppercase transition-colors hover:text-accent"
          >
            Inquire
          </Link>
          <a
            href="mailto:hello@freshbread.music"
            className="text-[11px] tracking-[0.18em] text-muted uppercase transition-colors hover:text-accent"
          >
            hello@freshbread.music
          </a>
        </div>
      </div>
    </footer>
  );
}
