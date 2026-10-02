import Link from "next/link";
import { brand } from "@/lib/data";
import BrandLogo from "./BrandLogo";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center" aria-label={`${brand.name} home`}>
      <BrandLogo priority className="h-10 transition-transform duration-500 group-hover:scale-105 md:h-11" />
    </Link>
  );
}
