"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { DemandeButton } from "@/components/DemandeModal";

// Reuses the same Canela italic font already used in Hero.tsx.
const canela = localFont({
  src: "../app/fonts/Canela-RegularItalic.ttf",
  weight: "400",
  style: "italic",
});

// New: dedicated font for the giant footer wordmark. Drop the .otf
// file at app/fonts/QTOptimum-Bold.otf (same folder as the Canela
// file) — adjust the path below if you put it somewhere else.
const qtOptimum = localFont({
  src: "../app/fonts/QTOptimum-Bold.otf",
  weight: "700",
  style: "normal",
});

// TODO: replace with your real number/email — placeholders for now.
const WHATSAPP_NUMBER = "212600000000"; // country code + number, no + or spaces
const CONTACT_EMAIL = "contact@myista.com";

const EXPLORE_LINKS = [
  { label: "Accueil", href: "/" },
  { label: "Départements", href: "/departments" },
  { label: "Ressources", href: "/resources" },
  { label: "Vidéos", href: "/playlists" },
  { label: "À propos", href: "/about" },
];

const SUPPORT_LINKS = [
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "Conditions d'utilisation", href: "/conditions-utilisation" },
];

// The wordmark, split into one span per letter. A flex row with
// justify-between spreads the letters so the first letter's left edge
// and the last letter's right edge sit exactly at the container's
// edges — a single text node can't do this (text-align: justify does
// nothing to one word), so per-letter flex is the standard trick.
const WORDMARK = "MYISTA";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-16"
      style={{ backgroundColor: "var(--color-footer, #FF4D26)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col justify-between gap-12 pb-16 sm:flex-row">
          {/* Tagline, left side */}
          <div className="max-w-xs">
            <p className={`${canela.className} text-3xl italic leading-tight text-black sm:text-4xl`}>
              Toutes les ressources au même endroit.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                Explorer
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {EXPLORE_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/70 transition-colors hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                Contact
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                   <a
                    href="mailto:myista@zohomail.com"
                    className="text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Email
                  </a>
                </li>
                <li>
                    <a
                    href="https://wa.me/212711279414"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/70 transition-colors hover:text-black"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100064145287128"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/70 transition-colors hover:text-black"
                  >
                    Facebook
                  </a>
                </li>

                <li>
                  <a
                    href="https://linkedin.com/company/myista"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/70 transition-colors hover:text-black"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-black">
                Support
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                <li>
                  <DemandeButton />
                </li>
                {SUPPORT_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/70 transition-colors hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between border-t border-black/10 py-4 text-xs text-black/60">
          <span>FR</span>
          <span>© {new Date().getFullYear()} MYISTA. Tous droits réservés.</span>
        </div>
      </div>

      {/* Giant edge-to-edge wordmark, glued to the very bottom of the
          footer. `leading-[0.7]` pulls the line box tight around the
          glyphs, and the negative `mb-[-2vw]` trims the font's own
          descender padding so there's no gap below the letters before
          the footer ends. Tune that negative value by eye once you
          see the real QTOptimum metrics — different fonts leave
          different amounts of bottom padding inside their line box. */}
      <div
        aria-hidden="true"
        className={`${qtOptimum.className} -mb-[2vw] flex w-full select-none justify-between px-4 text-[24vw] leading-[0.7] text-black sm:px-6 sm:text-[19vw]`}
      >
        {WORDMARK.split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </footer>
  );
}