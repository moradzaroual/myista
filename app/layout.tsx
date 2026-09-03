import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import "./globals.css";

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
        <Footer />
      </body>
    </html>
  );
}