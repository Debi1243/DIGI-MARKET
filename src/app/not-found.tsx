import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page grid min-h-[60vh] content-center gap-y-8 py-24 lg:grid-cols-12 lg:gap-x-10">
      <p className="label text-muted lg:col-span-3 lg:pt-4">Error 404</p>
      <div className="lg:col-span-9">
        <h1 className="max-w-[16ch] font-display text-h1 font-medium">This page has drifted out of orbit.</h1>
        <p className="mt-6 max-w-[48ch] text-lead text-muted">
          The link may be old or mistyped. Head back home, or browse everything we do.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">Back to home</ButtonLink>
          <ButtonLink href="/services" size="lg" variant="secondary" arrow={false}>Browse services</ButtonLink>
        </div>
      </div>
    </section>
  );
}
