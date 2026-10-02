import type { CoverChart, CoverTone, Project } from "@/lib/data";
import { cn } from "@/lib/cn";

const tones: Record<CoverTone, string> = {
  sage: "bg-tone-sage",
  clay: "bg-tone-clay",
  sky: "bg-tone-sky",
  sand: "bg-tone-sand",
  lilac: "bg-tone-lilac",
  rose: "bg-tone-rose",
};

const W = 400;
const H = 180;
const PAD = 8;

/** Maps a series of 0–1 values onto the chart box as SVG points. */
function points(values: number[]) {
  const step = (W - PAD * 2) / (values.length - 1);
  return values.map((v, i) => [PAD + i * step, H - PAD - v * (H - PAD * 2)] as const);
}

const path = (pts: readonly (readonly [number, number])[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

function Grid() {
  return (
    <g className="stroke-fg/15" strokeWidth="1" strokeDasharray="2 4">
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={0} x2={W} y1={H * f} y2={H * f} />
      ))}
    </g>
  );
}

function Growth() {
  const pts = points([0.08, 0.1, 0.09, 0.16, 0.2, 0.19, 0.3, 0.38, 0.47, 0.58, 0.74, 0.92]);
  const [lx, ly] = pts[pts.length - 1];
  return (
    <>
      <Grid />
      <path d={`${path(pts)} L${W - PAD} ${H} L${PAD} ${H} Z`} className="fill-fg/[0.06]" />
      <path d={path(pts)} className="fill-none stroke-fg" strokeWidth="2" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="6" className="fill-primary" />
    </>
  );
}

function Decline() {
  const values = [0.92, 0.88, 0.8, 0.74, 0.66, 0.6, 0.56, 0.52];
  const bw = 30;
  const gap = (W - PAD * 2 - bw * values.length) / (values.length - 1);
  return (
    <>
      <Grid />
      {values.map((v, i) => {
        const h = v * (H - PAD);
        return (
          <rect
            key={i}
            x={PAD + i * (bw + gap)}
            y={H - h}
            width={bw}
            height={h}
            rx="2"
            className={i === values.length - 1 ? "fill-primary" : "fill-fg/80"}
          />
        );
      })}
    </>
  );
}

function Rating() {
  const rows = [0.82, 0.12, 0.04, 0.01, 0.01];
  const rh = 20;
  const gap = (H - rh * rows.length) / (rows.length - 1);
  return (
    <>
      {rows.map((v, i) => (
        <g key={i} transform={`translate(0 ${i * (rh + gap)})`}>
          <rect x={0} y={0} width={W} height={rh} rx="2" className="fill-fg/[0.08]" />
          <rect x={0} y={0} width={Math.max(6, v * W)} height={rh} rx="2" className={i === 0 ? "fill-primary" : "fill-fg/80"} />
        </g>
      ))}
    </>
  );
}

function Compare() {
  const ota = [0.78, 0.74, 0.7, 0.64, 0.6, 0.55];
  const direct = [0.3, 0.36, 0.44, 0.52, 0.6, 0.7];
  const groupW = (W - PAD * 2) / ota.length;
  const bw = 16;
  return (
    <>
      <Grid />
      {ota.map((v, i) => {
        const x = PAD + i * groupW + (groupW - bw * 2 - 4) / 2;
        const h1 = v * (H - PAD);
        const h2 = direct[i] * (H - PAD);
        return (
          <g key={i}>
            <rect x={x} y={H - h1} width={bw} height={h1} rx="2" className="fill-fg/25" />
            <rect x={x + bw + 4} y={H - h2} width={bw} height={h2} rx="2" className="fill-primary" />
          </g>
        );
      })}
    </>
  );
}

function Ring() {
  const r = 70;
  const c = 2 * Math.PI * r;
  return (
    <g transform={`translate(${W - r - 24} ${H / 2})`}>
      <circle r={r} className="fill-none stroke-fg/15" strokeWidth="18" />
      <circle
        r={r}
        className="fill-none stroke-primary"
        strokeWidth="18"
        strokeDasharray={`${c * 0.95} ${c}`}
        transform="rotate(-90)"
      />
    </g>
  );
}

function Retention() {
  const before = points([1, 0.72, 0.56, 0.45, 0.38, 0.33, 0.3, 0.28]);
  const after = points([1, 0.86, 0.78, 0.72, 0.68, 0.65, 0.63, 0.62]);
  const [lx, ly] = after[after.length - 1];
  return (
    <>
      <Grid />
      <path d={path(before)} className="fill-none stroke-fg/40" strokeWidth="2" strokeDasharray="5 5" />
      <path d={path(after)} className="fill-none stroke-fg" strokeWidth="2" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r="6" className="fill-primary" />
    </>
  );
}

const charts: Record<CoverChart, () => React.JSX.Element> = {
  growth: Growth,
  decline: Decline,
  rating: Rating,
  compare: Compare,
  ring: Ring,
  retention: Retention,
};

/**
 * A case-study cover drawn from the project's headline result, so every cover
 * is a small, honest data story rather than a stock screenshot.
 */
export default function ProjectCover({ project, size = "md" }: { project: Project; size?: "md" | "lg" }) {
  const Chart = charts[project.cover.chart];
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-lg p-6 md:p-8",
        tones[project.cover.tone],
        size === "lg" ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]",
      )}
    >
      <div>
        <p
          className={cn(
            "tabular font-display font-medium leading-none tracking-[-0.04em]",
            size === "lg" ? "text-[clamp(3rem,2rem+5vw,6.5rem)]" : "text-[clamp(2.75rem,2rem+3vw,4.5rem)]",
          )}
        >
          {project.metric}
        </p>
        <p className="label mt-3 text-fg/70">{project.metricLabel}</p>
      </div>
      <div className="mt-6 min-h-0 flex-1">
        <svg viewBox={`0 0 ${W} ${H}`} aria-hidden className="size-full overflow-visible" preserveAspectRatio="xMidYMax meet">
          <Chart />
        </svg>
      </div>
    </div>
  );
}
