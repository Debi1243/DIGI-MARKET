import { Star, MapPin, Bike, Check, CalendarDays, Users, Dumbbell, Flame, Search, ShoppingBag, Bell } from "lucide-react";

// Hand-built UI mockups for the sample projects. Colours are fixed hex values
// so the screens look the same in light and dark themes.

function Browser({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl bg-[#fff] text-[#111] shadow-2xl shadow-black/40">
      <div className="flex items-center gap-1.5 border-b border-[#0001] bg-[#f3f3f5] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 flex-1 truncate rounded bg-[#fff] px-2 py-0.5 text-[9px] text-[#666]">{url}</span>
      </div>
      {children}
    </div>
  );
}

function Phone({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className="mx-auto w-[46%] rounded-[1.6rem] bg-[#0b0b0f] p-1.5 shadow-2xl shadow-black/50">
      <div className={`relative overflow-hidden rounded-[1.25rem] ${dark ? "bg-[#111114] text-[#fff]" : "bg-[#fff] text-[#111]"}`}>
        <div className="flex items-center justify-between px-3 pt-2 text-[8px] font-semibold">
          <span>9:41</span>
          <span className="h-3 w-12 rounded-full bg-[#0b0b0f]" />
          <span>100%</span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Store() {
  const items = [
    { n: "Pasapali Silk Saree", p: "₹8,450", c: "from-[#7f1d1d] to-[#b45309]" },
    { n: "Bomkai Cotton", p: "₹3,200", c: "from-[#1e3a8a] to-[#0f766e]" },
    { n: "Ikat Dupatta", p: "₹1,150", c: "from-[#581c87] to-[#be185d]" },
  ];
  return (
    <Browser url="kalingaweaves.in">
      <div className="flex items-center justify-between px-4 py-2 text-[9px]">
        <span className="font-serif text-[12px] font-bold tracking-wide text-[#7f1d1d]">Kalinga Weaves</span>
        <span className="hidden gap-3 text-[#555] sm:flex"><span>Sarees</span><span>Dupattas</span><span>Our weavers</span></span>
        <span className="flex gap-2 text-[#333]"><Search className="h-3 w-3" /><ShoppingBag className="h-3 w-3" /></span>
      </div>
      <div className="mx-3 flex items-center justify-between rounded-lg bg-gradient-to-r from-[#7f1d1d] to-[#b45309] px-4 py-3 text-[#fff]">
        <div>
          <p className="text-[8px] uppercase tracking-widest opacity-80">Woven in Bargarh</p>
          <p className="font-serif text-[14px] font-bold leading-tight">The Festive Ikat Edit</p>
          <span className="mt-1.5 inline-block rounded-full bg-[#fff] px-2 py-0.5 text-[8px] font-semibold text-[#7f1d1d]">Shop now</span>
        </div>
        <div className="h-12 w-10 rotate-6 rounded bg-[repeating-linear-gradient(45deg,#fde68a_0_4px,#7f1d1d_4px_8px)] opacity-90" />
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {items.map((it) => (
          <div key={it.n}>
            <div className={`h-14 rounded-md bg-gradient-to-br ${it.c} [background-size:auto] relative overflow-hidden`}>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-45deg,#ffffff22_0_3px,transparent_3px_9px)]" />
            </div>
            <p className="mt-1 truncate text-[8px] font-medium">{it.n}</p>
            <p className="text-[8px] font-bold text-[#7f1d1d]">{it.p}</p>
          </div>
        ))}
      </div>
    </Browser>
  );
}

function Clinic() {
  const rows = [
    { t: "A-14", n: "Priya Mohanty", d: "Dr. Sahoo", s: "In consult", c: "bg-[#dbeafe] text-[#1d4ed8]" },
    { t: "A-15", n: "Rakesh Behera", d: "Dr. Sahoo", s: "Waiting", c: "bg-[#fef3c7] text-[#b45309]" },
    { t: "B-07", n: "Ananya Das", d: "Dr. Mishra", s: "Lab", c: "bg-[#ede9fe] text-[#6d28d9]" },
    { t: "B-08", n: "Suresh Nayak", d: "Dr. Mishra", s: "Billed", c: "bg-[#dcfce7] text-[#15803d]" },
  ];
  return (
    <Browser url="app.carewellclinics.in/opd">
      <div className="flex text-[8px]">
        <div className="w-16 space-y-1.5 bg-[#0f172a] p-2 text-[#cbd5e1]">
          <p className="text-[9px] font-bold text-[#fff]">CareWell</p>
          {["OPD queue", "Patients", "Pharmacy", "Billing", "Reports"].map((m, k) => (
            <p key={m} className={k === 0 ? "rounded bg-[#2563eb] px-1 py-0.5 text-[#fff]" : "px-1"}>{m}</p>
          ))}
        </div>
        <div className="flex-1 p-2.5">
          <div className="grid grid-cols-3 gap-1.5">
            {[["Today", "42"], ["Waiting", "6"], ["Revenue", "₹18.2k"]].map(([l, v]) => (
              <div key={l} className="rounded-md border border-[#e5e7eb] p-1.5">
                <p className="text-[#6b7280]">{l}</p>
                <p className="text-[12px] font-bold">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-2 divide-y divide-[#f1f5f9] rounded-md border border-[#e5e7eb]">
            {rows.map((r) => (
              <div key={r.t} className="flex items-center gap-2 px-1.5 py-1">
                <span className="w-7 font-mono font-bold text-[#2563eb]">{r.t}</span>
                <span className="flex-1 truncate">{r.n}</span>
                <span className="hidden text-[#6b7280] sm:inline">{r.d}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-[7px] font-semibold ${r.c}`}>{r.s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

function Delivery() {
  return (
    <Phone>
      <div className="relative mt-1 h-24 overflow-hidden bg-[#e8f5e9]">
        <div className="absolute inset-0 bg-[linear-gradient(#cfe8d2_1px,transparent_1px),linear-gradient(90deg,#cfe8d2_1px,transparent_1px)] bg-[size:14px_14px]" />
        <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
          <path d="M10 50 C 30 45, 30 20, 55 25 S 80 10, 90 8" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeDasharray="4 3" />
        </svg>
        <span className="absolute left-[50%] top-[36%] grid h-5 w-5 place-items-center rounded-full bg-[#16a34a] text-[#fff] shadow"><Bike className="h-3 w-3" /></span>
        <MapPin className="absolute right-[6%] top-[4%] h-4 w-4 fill-[#ef4444] text-[#fff]" />
      </div>
      <div className="space-y-1.5 p-2.5 text-[8px]">
        <p className="text-[10px] font-bold">Arriving in 12 min</p>
        <div className="h-1 rounded-full bg-[#e5e7eb]"><div className="h-1 w-2/3 rounded-full bg-[#16a34a]" /></div>
        <div className="flex items-center gap-2 rounded-lg bg-[#f6f6f6] p-1.5">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#fde68a] text-[9px] font-bold">RK</span>
          <div className="flex-1"><p className="font-semibold">Ramesh · Rider</p><p className="text-[#777]">Veg thali × 2</p></div>
          <span className="font-bold">₹180</span>
        </div>
        <div className="rounded-lg bg-[#16a34a] py-1.5 text-center font-semibold text-[#fff]">Reorder tomorrow&apos;s tiffin</div>
      </div>
    </Phone>
  );
}

function Hotel() {
  return (
    <Browser url="chilikabayresort.com/book">
      <div className="relative h-20 overflow-hidden bg-gradient-to-b from-[#7dd3fc] via-[#38bdf8] to-[#0e7490]">
        <div className="absolute bottom-0 h-6 w-full bg-[#155e75]" />
        <div className="absolute bottom-5 right-8 h-6 w-6 rounded-full bg-[#fde047] blur-[1px]" />
        <p className="absolute left-4 top-3 font-serif text-[14px] font-bold text-[#fff] drop-shadow">Wake up on the lagoon</p>
        <p className="absolute left-4 top-8 text-[8px] text-[#e0f2fe]">Dolphin cruises · Lake-view cottages</p>
      </div>
      <div className="mx-3 -mt-4 relative grid grid-cols-4 gap-1 rounded-lg bg-[#fff] p-1.5 text-[8px] shadow-lg">
        {[["Check-in", "14 Nov"], ["Check-out", "16 Nov"], ["Guests", "2 adults"]].map(([l, v]) => (
          <div key={l} className="rounded border border-[#e5e7eb] px-1.5 py-1">
            <p className="text-[#6b7280]">{l}</p><p className="font-semibold">{v}</p>
          </div>
        ))}
        <span className="grid place-items-center rounded bg-[#0e7490] font-semibold text-[#fff]">Search</span>
      </div>
      <div className="grid grid-cols-2 gap-2 p-3 text-[8px]">
        {[["Lake-view Cottage", "₹5,800", "from-[#0e7490] to-[#14b8a6]"], ["Garden Room", "₹3,900", "from-[#15803d] to-[#84cc16]"]].map(([n, p, c]) => (
          <div key={n} className="overflow-hidden rounded-md border border-[#e5e7eb]">
            <div className={`h-9 bg-gradient-to-br ${c}`} />
            <div className="flex items-center justify-between p-1.5">
              <div><p className="font-semibold">{n}</p><p className="flex items-center gap-0.5 text-[#f59e0b]"><Star className="h-2 w-2 fill-current" /> 4.8</p></div>
              <p className="font-bold">{p}<span className="font-normal text-[#6b7280]">/night</span></p>
            </div>
          </div>
        ))}
      </div>
    </Browser>
  );
}

function School() {
  const bars = [62, 78, 54, 88, 71, 94, 83];
  return (
    <Browser url="erp.sunrisepublicschool.in">
      <div className="p-3 text-[8px]">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold">Fee collection · Term 2</p>
          <span className="flex items-center gap-1 text-[#6b7280]"><Bell className="h-3 w-3" /> Principal</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[["Collected", "₹14.6L", "text-[#15803d]"], ["Pending", "₹2.1L", "text-[#b45309]"], ["Attendance", "93%", "text-[#1d4ed8]"]].map(([l, v, c]) => (
            <div key={l} className="rounded-md bg-[#f8fafc] p-1.5">
              <p className="text-[#6b7280]">{l}</p><p className={`text-[12px] font-bold ${c}`}>{v}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <div className="flex h-16 flex-1 items-end gap-1 rounded-md border border-[#e5e7eb] p-1.5">
            {bars.map((h, k) => (
              <div key={k} className="flex-1 rounded-t bg-gradient-to-t from-[#f59e0b] to-[#fcd34d]" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="w-[40%] space-y-1">
            {[["Class 8-A", "Paid"], ["Class 6-B", "Due"], ["Class 10-C", "Paid"]].map(([c, s]) => (
              <div key={c} className="flex items-center justify-between rounded border border-[#e5e7eb] px-1.5 py-0.5">
                <span>{c}</span>
                <span className={s === "Paid" ? "font-semibold text-[#15803d]" : "font-semibold text-[#b45309]"}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Browser>
  );
}

function Gym() {
  return (
    <Phone dark>
      <div className="space-y-2 p-2.5 text-[8px]">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-black italic tracking-tight">IRON<span className="text-[#ef4444]">PULSE</span></p>
          <Dumbbell className="h-3 w-3 text-[#ef4444]" />
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#1c1c22] p-2">
          <svg viewBox="0 0 36 36" className="h-10 w-10 -rotate-90">
            <circle cx="18" cy="18" r="15" stroke="#2a2a33" strokeWidth="4" fill="none" />
            <circle cx="18" cy="18" r="15" stroke="#ef4444" strokeWidth="4" fill="none" strokeDasharray="94" strokeDashoffset="26" strokeLinecap="round" />
          </svg>
          <div>
            <p className="text-[#a1a1aa]">This week</p>
            <p className="text-[11px] font-bold">4 / 5 sessions</p>
            <p className="flex items-center gap-0.5 text-[#f97316]"><Flame className="h-2.5 w-2.5" /> 12-day streak</p>
          </div>
        </div>
        <p className="font-semibold text-[#a1a1aa]">Today&apos;s classes</p>
        {[["6:30 AM", "HIIT Burn", "3 spots"], ["7:30 PM", "Strength 101", "Booked"]].map(([t, n, s]) => (
          <div key={n} className="flex items-center justify-between rounded-lg bg-[#1c1c22] px-2 py-1.5">
            <div><p className="font-semibold">{n}</p><p className="text-[#a1a1aa]">{t}</p></div>
            <span className={s === "Booked" ? "flex items-center gap-0.5 text-[#22c55e]" : "rounded-full bg-[#ef4444] px-1.5 py-0.5 font-semibold"}>
              {s === "Booked" && <Check className="h-2.5 w-2.5" />} {s}
            </span>
          </div>
        ))}
        <div className="flex justify-around pt-1 text-[#71717a]">
          <CalendarDays className="h-3 w-3 text-[#ef4444]" /><Dumbbell className="h-3 w-3" /><Users className="h-3 w-3" />
        </div>
      </div>
    </Phone>
  );
}

const mockups = { store: Store, clinic: Clinic, delivery: Delivery, hotel: Hotel, school: School, gym: Gym };

export default function ProjectMockup({ kind }: { kind: keyof typeof mockups }) {
  const M = mockups[kind];
  return <M />;
}
