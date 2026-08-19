"use client";

import { useState, type FormEvent } from "react";
import { Reveal } from "@/components/animation/Reveal";
import { Magnetic } from "@/components/animation/Magnetic";
import { site } from "@/lib/data";

const INPUT_CLASS =
  "w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors duration-300 focus:border-lime/70";

/** Contact info cards + project enquiry form. */
export function ContactSection() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // No backend yet — hand off to the visitor's mail client with the details.
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "-"}`,
      `Company: ${data.get("company") || "-"}`,
      "",
      String(data.get("details")),
    ].join("\n");
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      "Project enquiry"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section className="container-x grid gap-10 pb-24 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
      {/* info column */}
      <div className="space-y-4">
        {[
          { label: "Email", value: site.email, href: `mailto:${site.email}` },
          { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
          { label: "Location", value: site.location },
        ].map((item, i) => (
          <Reveal key={item.label} delay={i * 0.08} distance={30}>
            <div className="rounded-2xl border border-line bg-ink-2 p-6">
              <p className="label-mono text-lime">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  data-cursor="link"
                  className="link-sweep mt-2 inline-block font-semibold"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 font-semibold">{item.value}</p>
              )}
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.3} distance={30}>
          <div className="rounded-2xl border border-lime/30 bg-lime/5 p-6">
            <p className="label-mono text-lime">Book a consultation</p>
            <p className="mt-3 text-xl font-bold">Prefer to grab a time?</p>
            <p className="mt-1 text-sm text-white/55">Free 30-minute strategy call</p>
            <Magnetic className="mt-5">
              <a href={`mailto:${site.email}`} data-cursor="link" className="btn btn-lime">
                Open calendar ↗
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* form column */}
      <Reveal delay={0.15} distance={40}>
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-line bg-ink-2/60 p-6 sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="label-mono text-white/50">Name *</span>
              <input name="name" required placeholder="Name" className={`${INPUT_CLASS} mt-2`} />
            </label>
            <label className="block">
              <span className="label-mono text-white/50">Email *</span>
              <input name="email" type="email" required placeholder="Email" className={`${INPUT_CLASS} mt-2`} />
            </label>
            <label className="block">
              <span className="label-mono text-white/50">Phone</span>
              <input name="phone" type="tel" placeholder="Phone" className={`${INPUT_CLASS} mt-2`} />
            </label>
            <label className="block">
              <span className="label-mono text-white/50">Company</span>
              <input name="company" placeholder="Company" className={`${INPUT_CLASS} mt-2`} />
            </label>
          </div>
          <label className="mt-6 block">
            <span className="label-mono text-white/50">Project details *</span>
            <textarea
              name="details"
              required
              rows={5}
              placeholder="Tell us about your goals, timeline and budget…"
              className={`${INPUT_CLASS} mt-2 resize-none`}
            />
          </label>

          <button
            type="submit"
            data-cursor="link"
            className="btn btn-lime mt-8 w-full justify-center"
          >
            {sent ? "Opening your mail app…" : "Send message"}
          </button>
          <p className="mt-4 text-center text-xs text-white/35">
            By submitting you agree to our privacy policy. We never share your data.
          </p>
        </form>
      </Reveal>
    </section>
  );
}
