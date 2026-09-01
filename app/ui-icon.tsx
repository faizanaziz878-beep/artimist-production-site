import type { SVGProps } from "react";

export type UiIconName = "arrow" | "menu" | "sun" | "moon" | "close" | "upload" | "check" | "external" | "chevron" | "search";

type Props = SVGProps<SVGSVGElement> & { name: UiIconName; size?: number };

export function UiIcon({ name, size = 18, className = "ui-icon", ...props }: Props) {
  const common: SVGProps<SVGSVGElement> = {
    className,
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.55,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    focusable: false,
    "aria-hidden": true,
    ...props,
  };

  if (name === "menu") return <svg {...common}><path d="M3 5.5h14M3 10h14M3 14.5h14" /></svg>;
  if (name === "sun") return <svg {...common}><circle cx="10" cy="10" r="3.25" /><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.45 1.45M14.55 14.55 16 16M16 4l-1.45 1.45M5.45 14.55 4 16" /></svg>;
  if (name === "moon") return <svg {...common}><path d="M15.8 13.1A6.9 6.9 0 0 1 6.9 4.2 6.45 6.45 0 1 0 15.8 13.1Z" /></svg>;
  if (name === "close") return <svg {...common}><path d="M4.5 4.5 15.5 15.5M15.5 4.5 4.5 15.5" /></svg>;
  if (name === "upload") return <svg {...common}><path d="M10 13V3M6.5 6.5 10 3l3.5 3.5M4 11.5v3.75A1.75 1.75 0 0 0 5.75 17h8.5A1.75 1.75 0 0 0 16 15.25V11.5" /></svg>;
  if (name === "check") return <svg {...common}><path d="m4.2 10.1 3.5 3.5 8.1-8.2" /></svg>;
  if (name === "chevron") return <svg {...common}><path d="m7.5 4.5 5.5 5.5-5.5 5.5" /></svg>;
  if (name === "external") return <svg {...common}><path d="M7 5h8v8M15 5 6 14M14 11v4H5V6h4" /></svg>;
  if (name === "search") return <svg {...common}><circle cx="8.6" cy="8.6" r="5.1" /><path d="m12.4 12.4 4.1 4.1" /></svg>;
  return <svg {...common}><path d="M5 15 15 5M7 5h8v8" /></svg>;
}
