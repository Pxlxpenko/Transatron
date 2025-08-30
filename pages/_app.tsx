import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import "@/index.css";
import { useScrollToHash } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showToaster, setShowToaster] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowToaster(true), 300);
    return () => clearTimeout(t);
  }, []);

  useScrollToHash();

  return (
    <div className="w-full">
      <Script
        src="https://plausible.io/js/script.js"
        data-domain="agger-labs.com"
        strategy="afterInteractive"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <div className="flex flex-col bg-primary min-h-screen">
        <Header />
        <main className="z-[1] flex flex-col grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
      <SpeedInsights />
      {showToaster && <Toaster />}
    </div>
  );
}
