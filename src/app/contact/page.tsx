import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { LineMarquee } from "@/components/sections/LineMarquee";
import { Testimonial } from "@/components/sections/Testimonial";
import { disciplines } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where you want to go and we'll show you how to get there. Every great project starts with a conversation.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact us"
        title={
          <>
            Let&apos;s build something <span className="text-lime">amazing together.</span>
          </>
        }
        copy="Tell us where you want to go and we'll show you how to get there. Every great project starts with a conversation."
      />
      <ContactSection />
      <LineMarquee
        items={disciplines}
        className="border-y border-line py-5"
        itemClassName="text-white/60"
      />
      <Testimonial />
    </>
  );
}
