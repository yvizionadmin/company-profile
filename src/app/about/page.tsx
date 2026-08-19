import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Stats } from "@/components/sections/Stats";
import { ValuesGrid } from "@/components/sections/ValuesGrid";
import { Timeline } from "@/components/sections/Timeline";
import { LineMarquee } from "@/components/sections/LineMarquee";
import { Testimonial } from "@/components/sections/Testimonial";
import { CTA } from "@/components/sections/CTA";
import { disciplines } from "@/lib/data";

export const metadata: Metadata = {
  title: "About us",
  description:
    "We're a Middle East agency obsessed with one thing: turning digital into measurable growth.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title={
          <>
            Build digital solutions that <span className="text-lime">drive growth.</span>
          </>
        }
        copy="Y-Vision helps businesses build websites, mobile apps, and digital marketing systems that create measurable business growth."
      />
      <Stats statement="We're a Middle East agency obsessed with one thing: turning digital into measurable growth for the businesses we partner with." />
      <ValuesGrid />
      <Timeline />
      <LineMarquee
        items={disciplines}
        className="border-y border-line py-5"
        itemClassName="text-white/60"
      />
      <Testimonial />
      <CTA />
    </>
  );
}
