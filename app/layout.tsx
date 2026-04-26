import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FloatingShapes } from "@/components/ui/floating-shapes";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Jalal | Junior MERN Stack Developer",
  description: "Premium portfolio of Muhammad Jalal, Junior MERN Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakarta.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full bg-background">
        <ThemeProvider>
          {/* <AuroraBackground /> */}
          <FloatingShapes />
          <CustomCursor />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1 pt-24 pb-14">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
