"use client";

import { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  LayoutGrid,
  FileText,
  Presentation,
  Video,
  Info,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const RESOURCE_SUBLINKS = [
  { href: "/resources?type=pdf", label: "PDF", icon: FileText },
  { href: "/resources?type=slides", label: "Slides", icon: Presentation },
  { href: "/resources?type=examens", label: "Examens", icon: FileText },
];

const NAV_LINKS = [
  { href: "/", label: "Accueil", icon: null, children: null },
  { href: "/departments", label: "Départements", icon: LayoutGrid, children: null },
  { href: "/resources", label: "Ressources", icon: FileText, children: RESOURCE_SUBLINKS },
  { href: "/playlists", label: "Vidéos", icon: Video, children: null },
  { href: "/a-propos", label: "À propos", icon: Info, children: null },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-[--color-border] bg-[--color-background]/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold text-[--color-foreground]"
        >
          <GraduationCap className="h-6 w-6 text-[--color-primary]" aria-hidden="true" />
          MYISTA
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-[--color-muted-foreground] lg:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon, children }) =>
            children ? (
              <div
                key={href}
                className="relative"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <Link
                  href={href}
                  className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[--color-foreground]"
                >
                  {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                  {label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      isResourcesOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </Link>

                {isResourcesOpen && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="flex w-44 flex-col overflow-hidden rounded-xl border border-[--color-border] bg-[--color-card] py-1.5 shadow-lg">
                      {children.map(({ href: subHref, label: subLabel, icon: SubIcon }) => (
                        <Link
                          key={subHref}
                          href={subHref}
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-[--color-card-foreground] transition-colors hover:bg-[--color-muted]"
                        >
                          <SubIcon className="h-4 w-4" aria-hidden="true" />
                          {subLabel}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[--color-foreground]"
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Right side: hamburger (mobile) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-[--color-foreground] transition-colors hover:bg-[--color-muted] lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-[--color-border] bg-[--color-background] px-4 py-3 lg:hidden">
          {NAV_LINKS.map(({ href, label, icon: Icon, children }) =>
            children ? (
              <div key={href}>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMobileSubmenu((cur) => (cur === href ? null : href))
                  }
                  aria-expanded={openMobileSubmenu === href}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[--color-foreground] transition-colors hover:bg-[--color-muted]"
                >
                  <span className="flex items-center gap-2">
                    {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                    {label}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      openMobileSubmenu === href ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {openMobileSubmenu === href && (
                  <div className="ml-4 flex flex-col gap-1 border-l border-[--color-border] pl-3">
                    {children.map(({ href: subHref, label: subLabel, icon: SubIcon }) => (
                      <Link
                        key={subHref}
                        href={subHref}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setOpenMobileSubmenu(null);
                        }}
                        className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-[--color-muted-foreground] transition-colors hover:bg-[--color-muted] hover:text-[--color-foreground]"
                      >
                        <SubIcon className="h-4 w-4" aria-hidden="true" />
                        {subLabel}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[--color-foreground] transition-colors hover:bg-[--color-muted]"
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                {label}
              </Link>
            )
          )}
        </nav>
      )}
    </header>
  );
}