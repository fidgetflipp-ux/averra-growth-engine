import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { SocialProof } from "@/components/site/SocialProof";
import { Services } from "@/components/site/Services";
import { FeaturedWork } from "@/components/site/FeaturedWork";
import { Process } from "@/components/site/Process";
import { Results } from "@/components/site/Results";
import { Grader } from "@/components/site/Grader";
import { FinalCta } from "@/components/site/FinalCta";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Averra — Web experiences engineered for growth" },
      {
        name: "description",
        content:
          "Averra is a premium web studio. We design and develop high-performing websites that help ambitious brands attract clients, build trust, and scale.",
      },
      { property: "og:title", content: "Averra — Web experiences engineered for growth" },
      {
        property: "og:description",
        content: "Premium web design, development, and conversion optimization for ambitious brands.",
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
        <Hero />
        <SocialProof />
        <Services />
        <FeaturedWork />
        <Process />
        <Results />
        <Grader />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
