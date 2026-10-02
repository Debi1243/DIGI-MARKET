import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80vh] place-items-center px-6 pt-32 text-center">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative">
        <p className="outline-text font-display text-[30vw] font-bold leading-none md:text-[16rem]">404</p>
        <h1 className="font-display text-3xl font-semibold">Lost in orbit</h1>
        <p className="mt-3 text-muted">The page you are looking for drifted off. Let&apos;s get you back.</p>
        <div className="mt-8"><Button href="/">Back to home</Button></div>
      </div>
    </section>
  );
}
