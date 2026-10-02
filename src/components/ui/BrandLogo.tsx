import Image from "next/image";
import clsx from "clsx";
import logo from "@/assets/logo.png";
import logoDark from "@/assets/logo-dark.png";
import { brand } from "@/lib/data";

/** The सृजEX wordmark, swapping to a brighter version in dark mode. */
export default function BrandLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <span className={clsx("relative inline-block", className)}>
      <Image src={logoDark} alt={brand.name} priority={priority} className="logo-on-dark h-full w-auto" />
      <Image src={logo} alt={brand.name} priority={priority} className="logo-on-light h-full w-auto" />
    </span>
  );
}
