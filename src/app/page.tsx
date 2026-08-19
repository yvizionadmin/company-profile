import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Stats } from "@/components/sections/Stats";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Approach } from "@/components/sections/Approach";
import { Work } from "@/components/sections/Work";
import { LineMarquee } from "@/components/sections/LineMarquee";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTA } from "@/components/sections/CTA";
import { disciplines } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Stats />
      <ServicesGrid />
      <Approach />
      <Work />
      <LineMarquee
        items={disciplines}
        className="border-y border-line py-5"
        itemClassName="text-white/60"
      />
      <Testimonial />
      <CTA
        label="Start the conversation"
        title="Let's build your digital future."
        copy="Book a free, no-pressure consultation. We'll show you exactly where the biggest growth opportunities are."
      />
    </>
  );
}
