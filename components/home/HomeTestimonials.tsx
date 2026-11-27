import { homeTestimonials } from "@/features/home/home";

// Figma "Testimonials" 2:15. The copy is a Figma placeholder until the client
// supplies and approves real testimonials (see features/home/home.ts).
export default function HomeTestimonials() {
  return (
    <section aria-labelledby="home-testimonials-heading" className="bg-background py-11">
      <div className="fps-container flex flex-col gap-6">
        <h2
          id="home-testimonials-heading"
          className="text-[32px]/[40px] font-bold text-foreground min-[900px]:text-[40px]/[48px]"
        >
          Client Feedback
        </h2>
        <ul className="grid gap-x-10 gap-y-6 min-[600px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1024px]:pb-5">
          {homeTestimonials.map((testimonial, index) => (
            <li key={index} className="flex">
              <figure className="flex w-full flex-col gap-[22px] rounded-fps-medium border border-border bg-surface p-7 shadow-[0_6px_18px_rgba(15,36,56,0.1)] min-[600px]:min-h-[250px]">
                <blockquote className="text-base/[26px] text-foreground">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="text-sm/5 font-semibold text-muted">
                  {testimonial.client}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
