"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 left-0 z-40 pt-7">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="font-display text-sm font-semibold tracking-[0.04em] text-ink lowercase"
          aria-label="Fresh Bread home"
        >
          fresh bread
        </Link>
        <nav className="flex items-center gap-5 md:gap-8" aria-label="Primary">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] font-medium tracking-[0.22em] uppercase transition-colors ${
                  active ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
