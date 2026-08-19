import { TransitionLink } from "@/components/transition/TransitionLink";
import { nav, services, site } from "@/lib/data";

const FOOTER_SERVICES = services.slice(0, 6);

/** Global footer. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2/60">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
            <span className="inline-block size-2.5 bg-lime" aria-hidden="true" />
            {site.wordmark}
          </p>
          <p className="mt-3 text-sm text-white/50">{site.tagline}</p>
        </div>

        <nav aria-label="Pages">
          <p className="label-mono text-lime">Pages</p>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.pages.map((page) => (
              <li key={page.href}>
                <TransitionLink
                  href={page.href}
                  data-cursor="link"
                  className="link-sweep text-white/70 hover:text-white"
                >
                  {page.label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <p className="label-mono text-lime">Services</p>
          <ul className="mt-5 space-y-3 text-sm">
            {FOOTER_SERVICES.map((service) => (
              <li key={service.num}>
                <TransitionLink
                  href="/services"
                  data-cursor="link"
                  className="link-sweep text-white/70 hover:text-white"
                >
                  {service.title}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label-mono text-lime">Get in touch</p>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li>
              <a href={`mailto:${site.email}`} data-cursor="link" className="link-sweep">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} data-cursor="link" className="link-sweep">
                {site.phone}
              </a>
            </li>
            <li className="text-white/45">{site.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-white/40">
          <p>© 2026 {site.name} Digital. All rights reserved.</p>
          <div className="flex gap-6">
            {["Instagram", "LinkedIn", "X"].map((social) => (
              <a
                key={social}
                href="#"
                data-cursor="link"
                className="link-sweep hover:text-white"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
