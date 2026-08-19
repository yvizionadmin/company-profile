/** Join conditional class names. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function clamp(min: number, value: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
