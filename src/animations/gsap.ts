/**
 * Single GSAP registration point. Import gsap/plugins from this module only —
 * never register plugins inside components.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Mobile browser chrome show/hide fires resize; skip expensive refreshes.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
