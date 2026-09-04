import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import "./globals.css";
import { ContributePromo } from "@/components/ContributePromo";

export const metadata: Metadata = {
  title: "MYISTA — Business & Management Study Resources",
  description:
    "PDFs, slide decks, videos, and articles for Business & Management students, organized by module.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ContributePromo />
        <Footer />
      </body>
    </html>
  );
}