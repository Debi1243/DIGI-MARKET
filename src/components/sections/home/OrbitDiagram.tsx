import Link from "next/link";
import { categories, services, servicesIn } from "@/lib/data";

const SIZE = 480;
const C = SIZE / 2;
const INNER = 124;
const OUTER = 200;
/** Angle (deg) of each discipline on the outer orbit, clockwise from 3 o'clock. */
const ANGLES = [-115, -25, 65, 155];

const toPct = (n: number) => `${(n / SIZE) * 100}%`;
const polar = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
};

/**
 * Hero visual: the business at the centre, four disciplines on the outer orbit and
 * one dot per service on the inner orbit. Everything is drawn from the real data.
 */
export default function OrbitDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-[calc(100%-3rem)] max-w-[30rem] sm:w-full">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} aria-hidden className="absolute inset-0 size-full overflow-visible">
        <circle cx={C} cy={C} r={OUTER} className="fill-none stroke-border-strong" strokeWidth="1" />
        <circle cx={C} cy={C} r={INNER} className="fill-none stroke-border" strokeWidth="1" strokeDasharray="2 6" />
        {ANGLES.map((a) => {
          const p = polar(OUTER, a);
          return <line key={a} x1={C} y1={C} x2={p.x} y2={p.y} className="stroke-border" strokeWidth="1" />;
        })}
        <g className="origin-center motion-safe:animate-orbit" style={{ transformBox: "view-box" }}>
          {services.map((s, i) => {
            const p = polar(INNER, (360 / services.length) * i - 90);
            return <circle key={s.slug} cx={p.x} cy={p.y} r={3} className="fill-fg" />;
          })}
        </g>
        <circle cx={C} cy={C} r={62} className="fill-fg" />
      </svg>

      <p
        aria-hidden
        className="absolute left-1/2 top-1/2 w-[22%] -translate-x-1/2 -translate-y-1/2 text-center font-display text-[clamp(0.75rem,2.6vw,0.95rem)] font-medium leading-tight text-bg"
      >
        Your business
      </p>

      <ul aria-label="Disciplines">
        {categories.map((c, i) => {
          const p = polar(OUTER, ANGLES[i]);
          return (
            <li
              key={c.slug}
              className="absolute"
              style={{
                left: toPct(p.x),
                top: toPct(p.y),
                transform: "translate(-50%, -50%)",
              }}
            >
              <Link
                href={`/services#${c.slug}`}
                className="group block rounded-md border border-border bg-bg px-2.5 py-1.5 text-center shadow-sm transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-fg sm:px-3 sm:py-2"
              >
                <span className="block whitespace-nowrap font-display text-sm font-medium sm:text-[0.9375rem] leading-tight tracking-[-0.01em]">
                  {c.name}
                </span>
                <span className="label mt-0.5 block whitespace-nowrap text-[0.625rem] sm:text-[0.6875rem] text-muted group-hover:text-fg">
                  {servicesIn(c.name).length} services
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
