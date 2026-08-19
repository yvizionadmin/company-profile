import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceBlocks } from "@/components/sections/ServiceBlocks";
import { LineMarquee } from "@/components/sections/LineMarquee";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTA } from "@/components/sections/CTA";
import { techStack } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Eight disciplines, one ecosystem partner: websites, apps, SEO, marketing, paid ads, email, branding and UI/UX.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            Everything you need to <span className="text-lime">grow online.</span>
          </>
        }
        copy="Eight disciplines, one accountable partner. We plug into your business and own the outcomes — from first pixel to compounding results."
      />
      <LineMarquee
        items={techStack}
        mono
        className="border-y border-line py-4"
        itemClassName="text-white/50"
      />
      <ServiceBlocks />
      <Testimonial />
      <CTA
        label="Not sure where to start?"
        title="Let's find your fastest path to growth."
        copy="Book a free, no-pressure consultation. We'll show you exactly where the biggest growth opportunities are."
      />
    </>
  );
}
