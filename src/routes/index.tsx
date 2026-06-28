import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { PortalStage } from "@/components/site/Portal";
import { FutureState } from "@/components/site/FutureState";
import { Showcase } from "@/components/site/Showcase";
import { SocialProof } from "@/components/site/SocialProof";
import { Services } from "@/components/site/Services";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { Process } from "@/components/site/Process";
import { Packages } from "@/components/site/Packages";
import { Booking } from "@/components/site/Booking";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Averra — Premium websites, delivered in days." },
      {
        name: "description",
        content:
          "Averra is a senior design and engineering studio. Choose a package, reserve a slot, and we ship a premium website in 7–14 days. No sales calls required.",
      },
      { property: "og:title", content: "Averra — Premium websites, delivered in days." },
      {
        property: "og:description",
        content: "Choose a package, reserve a slot, and ship a premium website in 7–14 days.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = document.getElementById("services");
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        // Enter dark when Services top has scrolled past 55% of viewport height.
        // Reverse symmetrically on scroll up.
        setIsDark(top < window.innerHeight * 0.55);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative">
      <div className={`dark-canvas-bg${isDark ? " is-dark" : ""}`} aria-hidden />
      <Nav />
      <main className={isDark ? "is-dark" : ""}>
        <PortalStage />
        <FutureState />
        <Showcase />
        <SocialProof />
        <Services />
        <FeaturedWork />
        <Process />
        <Packages />
        <Booking />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
