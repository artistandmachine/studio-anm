import type { Metadata } from "next";
import localFont from "next/font/local";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

// Satoshi — the studio's single type family per the Figma source of
// truth, used for both UI copy and editorial headlines.
const satoshi = localFont({
  src: [
    { path: "../public/fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Studio A&M — Artist & Machine",
  description:
    "Artist & Machine is a freelance design company based in Beaverton, OR. Equal parts creative and technical, working closely with clients to build well designed products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
