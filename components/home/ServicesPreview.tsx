
type Service = {
  title: string;
  description: string;
  href: string;
};

type ServicesPreviewProps = {
  services: Service[];
};

export default function ServicesPreview({
  services,
}: ServicesPreviewProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold">
          Our Services
        </h2>
        <p className="mt-4 text-gray-500">
          Explore how The Future Path Studio can support you.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <article
            key={service.href}
            className="rounded-xl border p-6"
          >
            <h3 className="text-xl font-semibold">
              {service.title}
            </h3>

            <p className="mt-3 text-gray-500">
              {service.description}
            </p>

            <a
              href={service.href}
              className="mt-5 inline-block font-medium underline"
            >
              Learn more
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
