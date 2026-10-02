import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";
import { brand } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["500", "700"], variable: "--font-devanagari" });

export const metadata: Metadata = {
  title: { default: `${brand.name} (${brand.latin}) | Digital Marketing & IT Services`, template: `%s | ${brand.name}` },
  description:
    `${brand.name} (${brand.latin}) is a full-service digital studio: websites, SEO & digital marketing, mobile apps and business software for ambitious brands.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Apply the saved or system theme before paint to avoid a flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="light"||(!t&&matchMedia("(prefers-color-scheme: light)").matches))document.documentElement.classList.add("light")}catch(e){}`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${grotesk.variable} ${devanagari.variable} noise antialiased`}>
        <Preloader />
        <SmoothScroll>
          <ScrollProgress />
          <Cursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
