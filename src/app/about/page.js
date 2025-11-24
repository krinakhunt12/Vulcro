export const metadata = {
  title: "About VULCRO — Surat Kurti Atelier",
  description:
    "VULCRO crafts premium traditional kurti sets in Surat — hand-finished fabrics, ethical sourcing, and modern silhouettes inspired by local craft.",
};

import Link from "next/link";
import NewsletterForm from '@/components/NewsletterForm';

export default function AboutPage() {
  return (
    <main role="main" className="bg-white text-black">
      {/* HERO */}
      <header
        role="region"
        aria-labelledby="about-hero-heading"
        className="relative overflow-hidden"
      >
        <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-sm text-gray-600 mb-2">Our Atelier — Surat</p>

            <h1
              id="about-hero-heading"
              className="text-3xl md:text-4xl font-extrabold leading-tight"
            >
              Designed with Tradition. Crafted with Love.
            </h1>

            <p className="mt-4 text-gray-700 max-w-xl">
              VULCRO blends time-honoured Surat craft with considered
              contemporary design. Each kurti pair is hand-checked, tailored
              locally, and finished to feel both familiar and exceptional.
            </p>

            <div className="mt-6 flex gap-3">
              <Link href="/shop" className="inline-block">
                <button className="btn-primary px-5 py-3 rounded-md">
                  Shop Collection
                </button>
              </Link>

              <Link href="/contact" className="inline-block">
                <button className="btn-outline px-4 py-3 rounded-md">
                  Visit Our Workshop
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Hero image placeholder: artisan stitching a kurti — 1600×800 */}
            <div className="w-full max-w-xl rounded-lg overflow-hidden card">
              <img
                src="/placeholders/artisan-1600x800.jpg"
                alt="Vulcro artisan stitching a kurti"
                width={1600}
                height={800}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>

        {/* subtle textile texture overlay (CSS background image or SVG) */}
      </header>

      {/* MAIN CONTENT */}
      <article className="container mx-auto px-6 py-12 space-y-12">
        {/* OUR STORY */}
        <section
          id="our-story"
          role="region"
          aria-labelledby="our-story-heading"
          className="prose max-w-none"
        >
          <h2 id="our-story-heading" className="text-2xl font-bold">
            Our Story
          </h2>

          <p className="text-gray-700">
            VULCRO began in Surat, where rivers of cotton and generations of
            craft meet. Our founder grew up watching skilled hands fold, stitch
            and breathe life into simple fabrics — and wanted to bring that
            poetry into modern wardrobes. From a small atelier with three
            seamstresses, we learned how to balance tradition and ease: hand
            techniques that honour pattern and finish, and design decisions
            shaped by everyday movement. Each kurti pair is imagined in our
            studio, pattern-tested on real bodies, and finished with detailed
            checks before reaching you. Our timeline is modest but meaningful —
            one collection led to collaborations with local weavers, which then
            made room for a dedicated workshop. Today, we remain rooted in
            Surat: a small team, a big heart, and a belief that elegance is the
            quiet work of craft and care.
          </p>
        </section>

        {/* CRAFTSMANSHIP & PROCESS */}
        <section
          id="craft"
          role="region"
          aria-labelledby="craft-heading"
          className="grid md:grid-cols-2 gap-8"
        >
          <div>
            <h3 id="craft-heading" className="text-xl font-semibold">
              Craftsmanship & Process
            </h3>

            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                {/* icon placeholder (use inline SVG or <img>) */}
                <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-sm">🧵</span>
                <div>
                  <div className="font-medium">Natural & premium fabrics</div>
                  <div className="text-sm text-gray-600">
                    We source cotton, silk-blends and breathable linens selected
                    for drape and comfort.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">✂️</span>
                <div>
                  <div className="font-medium">Handwork & detailing</div>
                  <div className="text-sm text-gray-600">
                    Embroidery and mirror work are done by trained artisans,
                    one motif at a time.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">🔍</span>
                <div>
                  <div className="font-medium">Quality checks</div>
                  <div className="text-sm text-gray-600">
                    Every garment is inspected at multiple stages to ensure fit
                    and finish.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">🏘️</span>
                <div>
                  <div className="font-medium">Local craftspeople</div>
                  <div className="text-sm text-gray-600">
                    Production supports Surat’s artisan community and small
                    ateliers.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Values / Mission */}
          <div>
            <h3 className="text-xl font-semibold">Values & Mission</h3>
            <div className="mt-4 grid gap-4">
              <div>
                <div className="font-medium">Ethical sourcing</div>
                <div className="text-sm text-gray-600">
                  We choose partners who meet fair work and wage practices.
                </div>
              </div>

              <div>
                <div className="font-medium">Timeless design</div>
                <div className="text-sm text-gray-600">
                  Pieces designed to be worn season after season — gentle and
                  enduring.
                </div>
              </div>

              <div>
                <div className="font-medium">Community-first</div>
                <div className="text-sm text-gray-600">
                  We invest in training and long-term partnerships with local
                  makers.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEET THE MAKERS */}
        <section id="makers" role="region" aria-labelledby="makers-heading">
          <h3 id="makers-heading" className="text-xl font-semibold">
            Meet the Makers
          </h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
            {/* team 1 */}
            <figure className="text-center">
              <img
                src="/placeholders/maker1-300x300.jpg"
                alt="Photo of Asha, head artisan"
                width={300}
                height={300}
                className="w-28 h-28 rounded-full mx-auto object-cover"
              />
              <figcaption className="mt-3">
                <div className="font-semibold">Asha Patel</div>
                <div className="text-sm text-gray-600">Head Artisan — brings 18 years of embroidery craft to each design.</div>
              </figcaption>
            </figure>

            {/* team 2 */}
            <figure className="text-center">
              <img
                src="/placeholders/maker2-300x300.jpg"
                alt="Photo of Raj, pattern maker"
                width={300}
                height={300}
                className="w-28 h-28 rounded-full mx-auto object-cover"
              />
              <figcaption className="mt-3">
                <div className="font-semibold">Rajesh Rao</div>
                <div className="text-sm text-gray-600">Pattern & fit specialist ensuring comfort across sizes.</div>
              </figcaption>
            </figure>

            {/* team 3 */}
            <figure className="text-center">
              <img
                src="/placeholders/maker3-300x300.jpg"
                alt="Photo of Meera, founder"
                width={300}
                height={300}
                className="w-28 h-28 rounded-full mx-auto object-cover"
              />
              <figcaption className="mt-3">
                <div className="font-semibold">Meera Shah</div>
                <div className="text-sm text-gray-600">Founder — a designer from Surat inspired by family craft traditions.</div>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" role="region" aria-labelledby="timeline-heading">
          <h3 id="timeline-heading" className="text-xl font-semibold mb-4">
            Our Journey
          </h3>

          <ol className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <li className="flex-1">
              <div className="font-semibold">2016</div>
              <div className="text-sm text-gray-600">Founding year — first atelier in Surat</div>
            </li>
            <li className="flex-1">
              <div className="font-semibold">2018</div>
              <div className="text-sm text-gray-600">First curated collection launched</div>
            </li>
            <li className="flex-1">
              <div className="font-semibold">2020</div>
              <div className="text-sm text-gray-600">Workshop opened; direct artisan partnerships</div>
            </li>
            <li className="flex-1">
              <div className="font-semibold">Today</div>
              <div className="text-sm text-gray-600">Small-batch collections with a sustainable focus</div>
            </li>
          </ol>
        </section>

        {/* SUSTAINABILITY & MATERIALS */}
        <section id="sustainability" role="region" aria-labelledby="sustain-heading">
          <h3 id="sustain-heading" className="text-xl font-semibold">Sustainability & Materials</h3>

          <p className="mt-3 text-gray-700">
            We prioritise natural fibres and low-waste processes. Our aim is to
            reduce environmental impact while maintaining the quality and
            hand-feel of each kurti set.
          </p>

          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <li>Natural dyes where possible — softer on skin and land.</li>
            <li>Low-waste cutting patterns to reduce offcut volume.</li>
            <li>Local sourcing of trims and supporting nearby suppliers.</li>
          </ul>
        </section>

        {/* STORE & WORKSHOP */}
        <section id="store" role="region" aria-labelledby="store-heading">
          <h3 id="store-heading" className="text-xl font-semibold">Store & Workshop</h3>

          <div className="mt-4 grid md:grid-cols-2 gap-6 items-start">
            <div>
              <address className="not-italic text-sm text-gray-700">
                VULCRO Atelier<br />
                12 Surat Textile Lane<br />
                Surat, Gujarat 395003<br />
                India
              </address>

              <div className="mt-3 text-sm text-gray-700">
                <div><strong>Opening hours</strong></div>
                <div>Mon – Sat: 10:00 — 18:00</div>
                <div>Sunday: Closed</div>

                <div className="mt-4">
                  <Link href="/book-visit">
                    <button className="btn-outline px-4 py-2 rounded-md">Book a Visit</button>
                  </Link>
                </div>
              </div>
            </div>

            <div>
              {/* Map placeholder: replace with real embed / iframe */}
              <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-500">
                Map embed placeholder (replace with Google Maps iframe)
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" role="region" aria-labelledby="testimonials-heading">
          <h3 id="testimonials-heading" className="text-xl font-semibold">What customers say</h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <blockquote className="p-4 border rounded-md text-sm bg-white">
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <p>"The kurti fits like a dream — delicate work and surprisingly comfortable for daily wear."</p>
              <cite className="block mt-3 text-xs text-gray-600">— Aisha R.</cite>
            </blockquote>

            <blockquote className="p-4 border rounded-md text-sm bg-white">
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <p>"Loved the texture and the care in finishing. Packaging felt like a boutique experience."</p>
              <cite className="block mt-3 text-xs text-gray-600">— Meena K.</cite>
            </blockquote>

            <blockquote className="p-4 border rounded-md text-sm bg-white">
              <div className="text-yellow-500 mb-2">★★★★★</div>
              <p>"Quick delivery and the team helped me choose the right size. Highly recommend VULCRO for ethnic staples."</p>
              <cite className="block mt-3 text-xs text-gray-600">— Priya S.</cite>
            </blockquote>
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section id="newsletter" aria-labelledby="newsletter-heading" role="region" className="py-6">
          <h3 id="newsletter-heading" className="text-lg font-semibold">Stay in the loop</h3>

          <div className="mt-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <p className="text-sm text-gray-700 max-w-xl">
              Sign up for new arrivals and behind-the-scenes from our atelier.
            </p>

            {/* Client newsletter form to handle submit without blocking server components */}
            <NewsletterForm />
          </div>

          <div className="mt-2 text-xs text-gray-500">
            We respect your privacy. Unsubscribe anytime. By subscribing you agree to our privacy policy.
          </div>
        </section>
      </article>

      {/* FOOTER MICROCOPY */}
      <footer className="border-t border-gray-100 mt-12">
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <div className="font-semibold">VULCRO</div>
            <div className="text-sm text-gray-600">Traditional kurti pairs — Surat made.</div>
          </div>

          <div className="text-sm text-gray-500">© {new Date().getFullYear()} VULCRO. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
