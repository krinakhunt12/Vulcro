// This export should be in a separate file or moved to layout.tsx
export const metadata = {
  title: "About VULCRO — Surat Kurti Atelier",
  description:
    "VULCRO crafts premium traditional kurti sets in Surat — hand-finished fabrics, ethical sourcing, and modern silhouettes inspired by local craft.",
};

import Link from "next/link";
import NewsletterForm from '@/components/NewsletterForm';
import Footer from "@/components/Footer";
export default function AboutPage() {
  return (
    <main role="main" className="bg-white text-black overflow-hidden">
      {/* HERO */}
      <header
        role="region"
        aria-labelledby="about-hero-heading"
        className="relative overflow-hidden"
      >
        {/* Background Texture */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-8 items-center relative">
          <div className="space-y-6 animate-fadeIn">
            <div className="overflow-hidden">
              <p className="text-sm text-[--muted] mb-2 animate-slideUp" style={{animationDelay: "0.1s"}}>
                Our Atelier — Surat
              </p>
            </div>
            
            <div className="overflow-hidden">
              <h1
                id="about-hero-heading"
                className="text-3xl md:text-4xl font-extrabold leading-tight animate-slideUp"
                style={{animationDelay: "0.2s"}}
              >
                Designed with Tradition.<br/>
                <span className="text-[--primary]">Crafted with Love.</span>
              </h1>
            </div>

            <div className="overflow-hidden">
              <p 
                className="mt-4 text-[--muted] max-w-xl animate-slideUp"
                style={{animationDelay: "0.3s"}}
              >
                VULCRO blends time-honoured Surat craft with considered
                contemporary design. Each kurti pair is hand-checked, tailored
                locally, and finished to feel both familiar and exceptional.
              </p>
            </div>

            <div 
              className="mt-6 flex gap-3 animate-fadeIn"
              style={{animationDelay: "0.4s"}}
            >
              <Link href="/shop" className="inline-block">
                <button className="btn btn-primary px-5 py-3 rounded-md hover-lift transition-all duration-300 hover:shadow-lg">
                  Shop Collection
                </button>
              </Link>

              <Link href="/contact" className="inline-block">
                <button className="btn btn-outline px-4 py-3 rounded-md border-2 hover:border-[--primary] hover:text-[--primary] transition-all duration-300">
                  Visit Our Workshop
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center animate-slideInRight">
            <div className="w-full max-w-xl rounded-2xl overflow-hidden card hover-scale transition-transform duration-500">
              <img
                src="/placeholders/artisan-1600x800.jpg"
                alt="Vulcro artisan stitching a kurti"
                width={1600}
                height={800}
                className="w-full h-64 md:h-80 object-cover hover-zoom transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <article className="container mx-auto px-6 py-12 space-y-16">
        {/* OUR STORY */}
        <section
          id="our-story"
          role="region"
          aria-labelledby="our-story-heading"
          className="animate-fadeIn"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-[--primary]"></div>
            <h2 id="our-story-heading" className="text-2xl font-bold text-gray-800">
              Our Story
            </h2>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 hover-shadow transition-all duration-300">
            <p className="text-gray-700 leading-relaxed text-lg">
              VULCRO began in Surat, where rivers of cotton and generations of
              craft meet. Our founder grew up watching skilled hands fold, stitch
              and breathe life into simple fabrics — and wanted to bring that
              poetry into modern wardrobes. From a small atelier with three
              seamstresses, we learned how to balance tradition and ease: hand
              techniques that honour pattern and finish, and design decisions
              shaped by everyday movement.
            </p>
            
            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-200 rounded-r">
              <p className="text-gray-700 italic">
                Each kurti pair is imagined in our studio, pattern-tested on real bodies, 
                and finished with detailed checks before reaching you.
              </p>
            </div>
            
            <p className="mt-6 text-gray-700 leading-relaxed">
              Our timeline is modest but meaningful — one collection led to collaborations 
              with local weavers, which then made room for a dedicated workshop. Today, 
              we remain rooted in Surat: a small team, a big heart, and a belief that 
              elegance is the quiet work of craft and care.
            </p>
          </div>
        </section>

        {/* CRAFTSMANSHIP & PROCESS */}
        <section
          id="craft"
          role="region"
          aria-labelledby="craft-heading"
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="animate-fadeIn" style={{animationDelay: "0.1s"}}>
            <div className="flex items-center gap-3 mb-6">
              <h3 id="craft-heading" className="text-xl font-semibold text-gray-800">
                Craftsmanship & Process
              </h3>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: "🧵",
                  title: "Natural & premium fabrics",
                  desc: "We source cotton, silk-blends and breathable linens selected for drape and comfort."
                },
                {
                  icon: "✂️",
                  title: "Handwork & detailing",
                  desc: "Embroidery and mirror work are done by trained artisans, one motif at a time."
                },
                {
                  icon: "🔍",
                  title: "Quality checks",
                  desc: "Every garment is inspected at multiple stages to ensure fit and finish."
                },
                {
                  icon: "🏘️",
                  title: "Local craftspeople",
                  desc: "Production supports Surat's artisan community and small ateliers."
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-200"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 group-hover:text-[--primary] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Values / Mission */}
          <div className="animate-fadeIn" style={{animationDelay: "0.2s"}}>
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Values & Mission
              </h3>
              <div className="flex-1 h-0.5 bg-gray-200"></div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50/50 to-white p-6 rounded-2xl border border-amber-100">
              <div className="space-y-6">
                {[
                  {
                    title: "Ethical sourcing",
                    desc: "We choose partners who meet fair work and wage practices.",
                    color: "from-green-50 to-emerald-50"
                  },
                  {
                    title: "Timeless design",
                    desc: "Pieces designed to be worn season after season — gentle and enduring.",
                    color: "from-blue-50 to-cyan-50"
                  },
                  {
                    title: "Community-first",
                    desc: "We invest in training and long-term partnerships with local makers.",
                    color: "from-purple-50 to-violet-50"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`w-8 h-1 rounded-full bg-gradient-to-r ${item.color} mb-3`}></div>
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MEET THE MAKERS */}
        <section id="makers" role="region" aria-labelledby="makers-heading" className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-[--primary]"></div>
            <h3 id="makers-heading" className="text-2xl font-bold text-gray-800">
              Meet the Makers
            </h3>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
            {[
              {
                name: "Asha Patel",
                role: "Head Artisan",
                desc: "Brings 18 years of embroidery craft to each design.",
                img: "/placeholders/maker1-300x300.jpg"
              },
              {
                name: "Rajesh Rao",
                role: "Pattern Specialist",
                desc: "Ensuring comfort and perfect fit across all sizes.",
                img: "/placeholders/maker2-300x300.jpg"
              },
              {
                name: "Meera Shah",
                role: "Founder & Designer",
                desc: "Inspired by family craft traditions from Surat.",
                img: "/placeholders/maker3-300x300.jpg"
              }
            ].map((maker, index) => (
              <div 
                key={index}
                className="group text-center p-6 rounded-2xl bg-gradient-to-b from-white to-gray-50 border border-gray-100 hover:border-[--primary]/20 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative mx-auto w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
                  <img
                    src={maker.img}
                    alt={`Photo of ${maker.name}, ${maker.role}`}
                    width={300}
                    height={300}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <figcaption className="mt-4">
                  <div className="font-bold text-lg text-gray-800 group-hover:text-[--primary] transition-colors">
                    {maker.name}
                  </div>
                  <div className="text-sm text-[--primary] font-medium mt-1">
                    {maker.role}
                  </div>
                  <div className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {maker.desc}
                  </div>
                </figcaption>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section id="timeline" role="region" aria-labelledby="timeline-heading" className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-8">
            <h3 id="timeline-heading" className="text-xl font-semibold text-gray-800">
              Our Journey
            </h3>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-6 h-0.5 bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 md:relative md:top-12"></div>
            
            <ol className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-4 relative z-10">
              {[
                { year: "2016", desc: "Founding year — first atelier in Surat" },
                { year: "2018", desc: "First curated collection launched" },
                { year: "2020", desc: "Workshop opened; direct artisan partnerships" },
                { year: "Today", desc: "Small-batch collections with a sustainable focus" }
              ].map((milestone, index) => (
                <li key={index} className="flex-1 group">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-white border-4 border-[--primary] rounded-full flex items-center justify-center font-bold text-gray-800 mb-3 group-hover:scale-110 group-hover:bg-[--primary] group-hover:text-white transition-all duration-300 shadow-lg">
                      {milestone.year}
                    </div>
                    <div className="px-4 py-3 bg-white rounded-xl border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-300">
                      <div className="text-sm text-gray-600 leading-relaxed">
                        {milestone.desc}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* SUSTAINABILITY & MATERIALS */}
        <section 
          id="sustainability" 
          role="region" 
          aria-labelledby="sustain-heading"
          className="animate-fadeIn"
        >
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-100">
            <div className="flex items-center gap-3 mb-6">
              <h3 id="sustain-heading" className="text-xl font-semibold text-gray-800">
                Sustainability & Materials
              </h3>
              <div className="flex-1 h-0.5 bg-emerald-200"></div>
            </div>

            <p className="text-gray-700 text-lg mb-6">
              We prioritise natural fibres and low-waste processes. Our aim is to
              reduce environmental impact while maintaining the quality and
              hand-feel of each kurti set.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                "Natural dyes where possible — softer on skin and land.",
                "Low-waste cutting patterns to reduce offcut volume.",
                "Local sourcing of trims and supporting nearby suppliers."
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white/80 p-4 rounded-xl border border-emerald-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      ✓
                    </div>
                    <div className="text-sm text-gray-700">{item}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STORE & WORKSHOP */}
        <section id="store" role="region" aria-labelledby="store-heading" className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-6">
            <h3 id="store-heading" className="text-xl font-semibold text-gray-800">
              Store & Workshop
            </h3>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
          </div>

          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    📍
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800">Visit Us</h4>
                </div>
                
                <address className="not-italic text-gray-700 space-y-2">
                  <div className="font-semibold text-lg">VULCRO Atelier</div>
                  <div>12 Surat Textile Lane</div>
                  <div>Surat, Gujarat 395003</div>
                  <div>India</div>
                </address>

                <div className="mt-8 space-y-3">
                  <div className="font-medium text-gray-800">Opening Hours</div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Mon – Sat</span>
                      <span className="font-medium">10:00 — 18:00</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/book-visit">
                      <button className="btn btn-primary px-6 py-3 rounded-lg hover-lift transition-all duration-300 hover:shadow-lg">
                        Book a Visit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative min-h-[300px] bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Map placeholder with improved styling */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      📍
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Surat, Gujarat
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Map integration available
                    </div>
                  </div>
                </div>
                {/* Decorative grid overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                                   linear-gradient(to bottom, #000 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" role="region" aria-labelledby="testimonials-heading" className="animate-fadeIn">
          <div className="flex items-center gap-3 mb-8">
            <h3 id="testimonials-heading" className="text-xl font-semibold text-gray-800">
              What Our Community Says
            </h3>
            <div className="flex-1 h-0.5 bg-gray-200"></div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                rating: 5,
                text: "The kurti fits like a dream — delicate work and surprisingly comfortable for daily wear.",
                author: "Aisha R.",
                color: "from-amber-50 to-orange-50"
              },
              {
                rating: 5,
                text: "Loved the texture and the care in finishing. Packaging felt like a boutique experience.",
                author: "Meena K.",
                color: "from-rose-50 to-pink-50"
              },
              {
                rating: 5,
                text: "Quick delivery and the team helped me choose the right size. Highly recommend VULCRO for ethnic staples.",
                author: "Priya S.",
                color: "from-blue-50 to-cyan-50"
              }
            ].map((testimonial, index) => (
              <blockquote 
                key={index}
                className={`p-6 rounded-2xl bg-gradient-to-br ${testimonial.color} border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}
              >
                <div className="flex text-amber-500 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic relative">
                  <span className="absolute -top-2 -left-2 text-3xl text-gray-300">"</span>
                  {testimonial.text}
                </p>
                <cite className="block mt-6 pt-4 border-t border-gray-200 text-sm font-medium text-gray-600 not-italic">
                  — {testimonial.author}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section 
          id="newsletter" 
          aria-labelledby="newsletter-heading" 
          role="region" 
          className="py-8 animate-fadeIn"
        >
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    ✉️
                  </div>
                  <h3 id="newsletter-heading" className="text-lg font-semibold text-gray-800">
                    Stay in the loop
                  </h3>
                </div>
                <p className="text-gray-700 max-w-xl">
                  Sign up for new arrivals, exclusive previews, and behind-the-scenes 
                  stories from our Surat atelier. Be the first to know about our latest 
                  collections and craft stories.
                </p>
                <div className="mt-3 text-xs text-gray-500">
                  We respect your privacy. Unsubscribe anytime. By subscribing you agree to our privacy policy.
                </div>
              </div>

              <div className="w-full md:w-auto">
                <NewsletterForm />
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* FOOTER MICROCOPY */}
   <Footer />

      {/* Animations & utilities moved to global CSS (src/app/globals.css) */}
    </main>
  );
}