import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import darkBgVideo from "@/assets/dark-canvas-bg.mp4.asset.json";
import { Nav } from "@/components/site/Nav";
import { PortalStage } from "@/components/site/Portal";
import { FutureState } from "@/components/site/FutureState";
import { Showcase } from "@/components/site/Showcase";
import { SocialProof } from "@/components/site/SocialProof";
import { Collage } from "@/components/site/Collage";
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
  const [mode, setMode] = useState<"light" | "dark" | "lime">("light");

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const services = document.getElementById("services");
        const packages = document.getElementById("packages");
        const footer = document.querySelector("footer");
        if (!services) return;
        const servicesTop = services.getBoundingClientRect().top;
        const packagesTop = packages ? packages.getBoundingClientRect().top : Infinity;
        const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
        const reachedFooter = footerTop <= window.innerHeight * 0.15;
        const enteredPackages = packagesTop <= window.innerHeight * 0.5;
        const enteredServices = servicesTop <= 0;
        if (reachedFooter) setMode("light");
        else if (enteredPackages) setMode("lime");
        else if (enteredServices) setMode("dark");
        else setMode("light");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-canvas", mode === "dark");
    document.body.classList.toggle("lime-canvas", mode === "lime");
    return () => {
      document.body.classList.remove("dark-canvas");
      document.body.classList.remove("lime-canvas");
    };
  }, [mode]);

  return (
    <div className="relative">
      <Nav />
      {/* Fixed looping video backdrop — visible only while dark canvas is active */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-black transition-opacity duration-700"
        style={{ opacity: mode === "dark" ? 1 : 0 }}
      >
        <video
          src={darkBgVideo.url}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* subtle darkening wash for legibility */}
        <div className="absolute inset-0 bg-black/45" />
      </div>
      <main className={`relative z-10 ${mode === "dark" ? "is-dark" : mode === "lime" ? "is-lime" : ""}`}>
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


