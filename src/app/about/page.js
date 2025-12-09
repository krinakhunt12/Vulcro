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
      {/* HERO SECTION */}
      <header
        role="region"
        aria-labelledby="about-hero-heading"
        className="relative overflow-hidden border-b border-gray-200"
      >
        {/* Subtle Grid Texture */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(90deg, #000 1px, transparent 1px),
                             linear-gradient(0deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        
        <div className="container mx-auto px-6 py-20 lg:py-24 grid lg:grid-cols-2 gap-12 items-center relative">
          <div className="space-y-8 animate-fadeInUp">
            <div className="overflow-hidden">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-3 animate-slideUp" 
                style={{animationDelay: "0.1s"}}>
                Est. 2016 • Surat
              </p>
            </div>
            
            <div className="overflow-hidden">
              <h1
                id="about-hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-slideUp"
                style={{animationDelay: "0.2s"}}
              >
                Crafting Tradition
                <span className="block mt-2 text-gray-700">With Modern Sensibility</span>
              </h1>
            </div>

            <div className="overflow-hidden">
              <p 
                className="mt-4 text-gray-600 text-lg leading-relaxed max-w-xl animate-slideUp"
                style={{animationDelay: "0.3s"}}
              >
                VULCRO reimagines traditional Indian kurtis through contemporary design. 
                Each piece is meticulously crafted in our Surat atelier, blending 
                time-honored techniques with modern silhouettes.
              </p>
            </div>

            <div 
              className="mt-8 flex flex-wrap gap-4 animate-fadeIn"
              style={{animationDelay: "0.4s"}}
            >
              <Link href="/shop" className="inline-block">
                <button className="bg-black text-white px-6 py-3.5 rounded-md font-medium 
                               hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300 
                               border border-black">
                  Explore Collection
                </button>
              </Link>

              <Link href="/contact" className="inline-block">
                <button className="bg-transparent text-black px-6 py-3.5 rounded-md font-medium 
                               border-2 border-gray-800 hover:bg-gray-800 hover:text-white 
                               transition-all duration-300">
                  Visit Atelier
                </button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center animate-fadeInRight">
            <div className="relative w-full max-w-xl">
              <div className="aspect-square overflow-hidden rounded-lg shadow-2xl">
                <img
                  src="./factory.png"
                  alt="Artisan hand-stitching a traditional kurti in VULCRO atelier"
                  width={1600}
                  height={800}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 
                           transition-all duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-36 border border-gray-300 rounded-lg bg-white p-4 shadow-lg animate-pulse-slow">
                <div className="text-xs uppercase tracking-widest text-gray-500 mb-2">Since 2016</div>
                <div className="text-2xl font-bold">8+ Years</div>
                <div className="text-sm text-gray-600">of Craft Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <article className="container mx-auto px-6 py-16 space-y-20">
        {/* OUR STORY */}
        <section
          id="our-story"
          role="region"
          aria-labelledby="our-story-heading"
          className="animate-fadeInUp"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-0.5 bg-black"></div>
              <h2 id="our-story-heading" className="text-3xl font-bold tracking-tight">
                Our Story
              </h2>
            </div>

            <div className="bg-gray-50 p-8 md:p-10 rounded-xl border border-gray-200 
                          hover:border-gray-300 transition-all duration-500">
              <div className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">
                  Founded in the textile capital of India, VULCRO emerged from a vision 
                  to preserve traditional craftsmanship while adapting it for the modern 
                  wardrobe. Our journey began in a small Surat workshop with three master 
                  artisans, driven by a commitment to quality and ethical production.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="border-l-4 border-black pl-4 py-2">
                    <div className="text-2xl font-bold mb-1">1500+</div>
                    <div className="text-gray-600 text-sm">Kurtis Handcrafted</div>
                  </div>
                  <div className="border-l-4 border-black pl-4 py-2">
                    <div className="text-2xl font-bold mb-1">12</div>
                    <div className="text-gray-600 text-sm">Master Artisans</div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">
                  Today, we remain a family-run atelier where each garment undergoes 
                  14 stages of quality inspection. Every stitch tells a story of 
                  dedication, from pattern-making to final finishing. We believe in 
                  creating pieces that transcend seasons—timeless designs that become 
                  cherished wardrobe staples.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CRAFTSMANSHIP & PROCESS */}
        <section
          id="craft"
          role="region"
          aria-labelledby="craft-heading"
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Process */}
            <div className="animate-fadeInLeft">
              <div className="flex items-center gap-4 mb-8">
                <h3 id="craft-heading" className="text-2xl font-bold tracking-tight">
                  Our Process
                </h3>
                <div className="flex-1 h-0.5 bg-gray-300"></div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: "01",
                    title: "Design & Pattern Making",
                    desc: "Creating contemporary silhouettes while honoring traditional proportions."
                  },
                  {
                    step: "02",
                    title: "Fabric Selection",
                    desc: "Sourcing premium natural fabrics with emphasis on texture and drape."
                  },
                  {
                    step: "03",
                    title: "Hand Crafting",
                    desc: "Skilled artisans execute intricate details with precision and care."
                  },
                  {
                    step: "04",
                    title: "Quality Assurance",
                    desc: "Each piece undergoes multiple checks before final approval."
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="group relative overflow-hidden bg-white border border-gray-200 
                             rounded-lg p-5 hover:border-black transition-all duration-500 
                             hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl font-bold text-gray-300 group-hover:text-black 
                                   transition-colors duration-500">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-semibold text-lg mb-2 group-hover:text-gray-800">
                          {item.title}
                        </div>
                        <div className="text-gray-600 text-sm leading-relaxed">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full 
                                  transition-all duration-700"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Values */}
            <div className="animate-fadeInRight">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-bold tracking-tight">
                  Our Values
                </h3>
                <div className="flex-1 h-0.5 bg-gray-300"></div>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    icon: "🎯",
                    title: "Precision Craftsmanship",
                    desc: "Every detail matters. We maintain the highest standards in stitching, finishing, and quality control."
                  },
                  {
                    icon: "🤝",
                    title: "Ethical Production",
                    desc: "Fair wages, safe working conditions, and respect for our artisans' skills and time."
                  },
                  {
                    icon: "🌱",
                    title: "Sustainable Practice",
                    desc: "Minimizing waste through efficient pattern-making and using natural, biodegradable materials."
                  },
                  {
                    icon: "💡",
                    title: "Innovation in Tradition",
                    desc: "Reinterpreting classic designs with contemporary fits and functional details."
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-5 
                             hover:border-gray-800 transition-all duration-500 
                             hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-lg mb-2">{item.title}</div>
                        <div className="text-gray-600 text-sm leading-relaxed">{item.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MEET THE MAKERS */}
        {/* <section id="makers" role="region" aria-labelledby="makers-heading" className="animate-fadeInUp">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="w-20 h-0.5 bg-black mx-auto"></div>
              </div>
              <h2 id="makers-heading" className="text-3xl font-bold tracking-tight mb-4">
                The Artisans Behind VULCRO
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our craftspeople bring decades of experience and passion to every stitch
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Master Tailor",
                  experience: "25+ Years",
                  specialty: "Pattern Making & Fit",
                  img: "/placeholders/maker1-300x300.jpg",
                  delay: "0.1s"
                },
                {
                  name: "Meera Patel",
                  role: "Embroidery Specialist",
                  experience: "18+ Years",
                  specialty: "Hand Embroidery",
                  img: "/placeholders/maker2-300x300.jpg",
                  delay: "0.2s"
                },
                {
                  name: "Arun Sharma",
                  role: "Quality Director",
                  experience: "15+ Years",
                  specialty: "Finishing & Detailing",
                  img: "/placeholders/maker3-300x300.jpg",
                  delay: "0.3s"
                }
              ].map((maker, index) => (
                <div 
                  key={index}
                  className="group text-center bg-white border border-gray-200 rounded-xl 
                           p-6 hover:border-gray-800 hover:shadow-xl transition-all duration-500 
                           animate-fadeInUp"
                  style={{animationDelay: maker.delay}}
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 
                                 border-white shadow-lg group-hover:border-gray-800 
                                 transition-all duration-500">
                      <img
                        src={maker.img}
                        alt={`${maker.name}, ${maker.role}`}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 
                                 transition-all duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                                  bg-black text-white text-xs px-3 py-1 rounded-full">
                      {maker.experience}
                    </div>
                  </div>
                  <figcaption className="mt-8">
                    <div className="font-bold text-xl mb-2 group-hover:text-gray-800">
                      {maker.name}
                    </div>
                    <div className="text-gray-600 font-medium mb-3">{maker.role}</div>
                    <div className="text-sm text-gray-500 border-t border-gray-100 pt-3">
                      Specialty: {maker.specialty}
                    </div>
                  </figcaption>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* TIMELINE */}
        <section id="timeline" role="region" aria-labelledby="timeline-heading" 
                className="animate-fadeInUp">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <h2 id="timeline-heading" className="text-3xl font-bold tracking-tight">
                Our Journey
              </h2>
              <div className="flex-1 h-0.5 bg-gray-300"></div>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-12 bottom-12 w-0.5 bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 
                            md:left-1/2 md:-translate-x-1/2"></div>
              
              <ol className="space-y-12">
                {[
                  {
                    year: "2016",
                    title: "Foundation",
                    desc: "VULCRO founded in Surat with three artisans",
                    side: "left"
                  },
                  {
                    year: "2018",
                    title: "First Collection",
                    desc: "Launched debut collection featuring modern kurti silhouettes",
                    side: "right"
                  },
                  {
                    year: "2020",
                    title: "Workshop Expansion",
                    desc: "Opened dedicated atelier with 12 master craftspeople",
                    side: "left"
                  },
                  {
                    year: "2023",
                    title: "Sustainable Focus",
                    desc: "Implemented zero-waste pattern cutting system",
                    side: "right"
                  },
                  {
                    year: "Present",
                    title: "Ongoing Innovation",
                    desc: "Continuing to blend tradition with contemporary design",
                    side: "left"
                  }
                ].map((milestone, index) => (
                  <li 
                    key={index}
                    className={`relative group ${milestone.side === 'left' ? 'md:pr-1/2 md:pr-12' : 'md:pl-1/2 md:pl-12'}`}
                  >
                    <div className={`flex items-center ${milestone.side === 'right' ? 'md:justify-start' : 'md:justify-end'}`}>
                      <div className={`w-full md:w-auto ${milestone.side === 'right' ? 'md:text-left' : 'md:text-right'}`}>
                        <div className={`inline-block p-5 bg-white border-2 border-gray-300 rounded-lg 
                                      hover:border-black hover:shadow-lg transition-all duration-500 
                                      group-hover:-translate-y-1 ${milestone.side === 'right' ? 'md:mr-4' : 'md:ml-4'}`}>
                          <div className="flex items-center gap-4 mb-3">
                            <div className="text-2xl font-bold text-gray-800">{milestone.year}</div>
                            <div className="w-12 h-0.5 bg-gray-400"></div>
                          </div>
                          <div className="font-semibold text-lg mb-2">{milestone.title}</div>
                          <p className="text-gray-600 text-sm">{milestone.desc}</p>
                        </div>
                      </div>
                    </div>
                    {/* Timeline Dot */}
                    <div className="absolute top-6 left-0 w-4 h-4 bg-white border-2 border-gray-800 
                                  rounded-full transform -translate-x-1.5 md:left-1/2 md:-translate-x-1/2 
                                  group-hover:scale-125 group-hover:bg-gray-800 transition-all duration-300"></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY */}
        <section 
          id="sustainability" 
          role="region" 
          aria-labelledby="sustain-heading"
          className="animate-fadeInUp"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 md:p-12 
                          border border-gray-200">
              <div className="flex items-center gap-4 mb-8">
                <h3 id="sustain-heading" className="text-2xl font-bold tracking-tight">
                  Our Commitment to Sustainability
                </h3>
                <div className="flex-1 h-0.5 bg-gray-300"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    We believe luxury and sustainability must coexist. Our approach 
                    focuses on mindful production, material selection, and minimizing 
                    environmental impact at every stage.
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Natural, biodegradable fabrics only",
                      "Zero plastic packaging",
                      "Energy-efficient workshop",
                      "Water conservation in dyeing processes"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-xl p-6 bg-white">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold mb-2">92%</div>
                    <div className="text-gray-600">Fabric Utilization Rate</div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cotton Offcuts</span>
                        <span>8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-black h-2 rounded-full w-[8%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Recycled Materials</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-800 h-2 rounded-full w-[45%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKSHOP VISIT */}
        <section id="workshop" role="region" aria-labelledby="workshop-heading" 
                className="animate-fadeInUp">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h3 id="workshop-heading" className="text-2xl font-bold tracking-tight">
                    Visit Our Atelier
                  </h3>
                  <div className="flex-1 h-0.5 bg-gray-300"></div>
                </div>
                
                <div className="space-y-6">
                  <address className="not-italic text-gray-700 space-y-4">
                    <div>
                      <div className="font-semibold text-lg mb-2">VULCRO Atelier</div>
                      <div className="space-y-1">
                        <div>12 Textile Craft Lane</div>
                        <div>Surat, Gujarat 395003</div>
                        <div>India</div>
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold mb-2">Contact</div>
                      <div className="space-y-1">
                        <div>+91 98765 43210</div>
                        <div>atelier@vulcro.com</div>
                      </div>
                    </div>
                  </address>

                  <div>
                    <div className="font-semibold mb-3">Opening Hours</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-gray-200 pb-2">
                        <span>Monday - Saturday</span>
                        <span className="font-medium">10:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Sunday</span>
                        <span>By Appointment Only</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/book-visit">
                    <button className="bg-black text-white px-8 py-3.5 rounded-md font-medium 
                                    hover:bg-gray-900 hover:scale-[1.02] transition-all duration-300 
                                    border border-black mt-4">
                      Schedule a Visit
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative h-[400px] rounded-xl overflow-hidden border border-gray-200">
                <img
                  src="./shop.png"
                  alt="Interior of VULCRO atelier in Surat"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 
                           transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-sm uppercase tracking-wider">Our Creative Space</div>
                  <div className="text-lg font-semibold">Surat Atelier</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" role="region" aria-labelledby="testimonials-heading" 
                className="animate-fadeInUp">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <div className="w-20 h-0.5 bg-black mx-auto"></div>
              </div>
              <h3 id="testimonials-heading" className="text-3xl font-bold tracking-tight mb-4">
                Client Experiences
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                What our community says about VULCRO craftsmanship
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  text: "The attention to detail is extraordinary. Each kurti feels like a custom piece.",
                  author: "Priya Sharma",
                  location: "Mumbai"
                },
                {
                  text: "Finally found a brand that understands modern fit with traditional aesthetics.",
                  author: "Ananya Patel",
                  location: "Delhi"
                },
                {
                  text: "Sustainable, beautiful, and incredibly comfortable. My go-to for ethnic wear.",
                  author: "Rhea Kapoor",
                  location: "Bangalore"
                }
              ].map((testimonial, index) => (
                <blockquote 
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-6 
                           hover:border-gray-800 hover:shadow-lg transition-all duration-500"
                >
                  <div className="text-gray-800 text-lg leading-relaxed mb-6 relative">
                    <span className="absolute -top-2 -left-2 text-3xl text-gray-300">"</span>
                    {testimonial.text}
                  </div>
                  <cite className="not-italic">
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section 
          id="newsletter" 
          aria-labelledby="newsletter-heading" 
          role="region" 
          className="py-12 animate-fadeInUp"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 
                          rounded-2xl p-8 md:p-10">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                      <span className="text-white text-xl">✉️</span>
                    </div>
                    <h3 id="newsletter-heading" className="text-2xl font-bold tracking-tight">
                      Join Our Journey
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Subscribe to receive updates on new collections, behind-the-scenes 
                    stories, and exclusive offers from our Surat atelier.
                  </p>
                  <div className="text-sm text-gray-500">
                    We respect your privacy. Unsubscribe anytime.
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>

      <Footer />
    </main>
  );
}