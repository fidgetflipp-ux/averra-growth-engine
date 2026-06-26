import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { PortalStage } from "@/components/site/Portal";
import { Problem } from "@/components/site/Problem";
import { Manifesto } from "@/components/site/Manifesto";
import { Showcase } from "@/components/site/Showcase";
import { SocialProof } from "@/components/site/SocialProof";

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
  return (
    <div className="relative">
      <Nav />
      <main>
        <PortalStage />
        <Problem />
        <Manifesto />
        <Showcase />
        <FeaturedWork />
        <SocialProof />
        <Process />
        <Packages />
        <Booking />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
