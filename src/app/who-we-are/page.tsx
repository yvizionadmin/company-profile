import type { Metadata } from "next";
import { WhoHero } from "@/components/sections/who-we-are/WhoHero";
import { WhoExperience } from "@/components/sections/who-we-are/WhoExperience";
import { WhoDna } from "@/components/sections/who-we-are/WhoDna";
import { WhoExpertise } from "@/components/sections/who-we-are/WhoExpertise";
import { WhoJourney } from "@/components/sections/who-we-are/WhoJourney";
import { WhoClosing } from "@/components/sections/who-we-are/WhoClosing";

export const metadata: Metadata = {
  title: "Who we are",
  description:
    "Deep e-commerce experience, brought together with design and technology. We build what comes next.",
};

export default function WhoWeArePage() {
  return (
    <>
      <WhoHero />
      <WhoExperience />
      <WhoDna />
      <WhoExpertise />
      <WhoJourney />
      <WhoClosing />
    </>
  );
}
