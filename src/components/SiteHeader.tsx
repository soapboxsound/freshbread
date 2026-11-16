"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const showMark = pathname !== "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (showMark) {
      setScrolled(false);
      return;
    }

    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [showMark]);

  const solidBar = showMark || scrolled;

  return (
    <header className="fixed top-0 right-0 left-0 z-[90] pt-1.5">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 origin-top border-b bg-paper/95 backdrop-blur-md transition-[transform,border-color,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          solidBar
            ? "scale-y-100 border-ink/8 opacity-100"
            : "scale-y-0 border-transparent opacity-0"
        }`}
      />

      <div
        className={`relative mx-auto flex h-14 max-w-6xl items-center px-5 md:h-16 md:px-10 ${
          showMark ? "justify-between" : "justify-end"
        }`}
      >
        {showMark ? (
          <Link
            href="/"
            className="relative block shrink-0"
            aria-label="Fresh Bread home"
          >
            <Image
              src="/assets/fresh-bread-wordmark-clean.png"
              alt="Fresh Bread NYC"
              width={1024}
              height={515}
              className="h-8 w-auto md:h-9"
              priority
            />
          </Link>
        ) : null}

        <nav
          className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 md:gap-8"
          aria-label="Primary"
        >
          {links
            .filter((link) => !(pathname === "/" && link.href === "/"))
            .map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[10px] tracking-[0.18em] uppercase transition-colors md:text-[11px] md:tracking-[0.22em] ${
                    active
                      ? "font-bold text-accent"
                      : "font-medium text-muted hover:text-ink"
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
