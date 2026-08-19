"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useTransition } from "./TransitionProvider";

type TransitionLinkProps = ComponentProps<typeof Link> & {
  href: string;
  /** called when the animated navigation starts (e.g. close the menu) */
  onNavigate?: () => void;
};

/**
 * Drop-in replacement for next/link that plays the page transition.
 * Keeps prefetching and native semantics; modified clicks (new tab etc.)
 * fall through to the browser.
 */
export function TransitionLink({
  href,
  onNavigate,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const { navigate } = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onNavigate?.();
    navigate(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
