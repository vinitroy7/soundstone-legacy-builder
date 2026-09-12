import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  ChevronRight,
  Church,
  Factory,
  GraduationCap,
  Headphones,
  Mail,
  MapPin,
  Menu,
  Mic2,
  Phone,
  Radio,
  ShieldCheck,
  Train,
  Users,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

import heroImage from "@/assets/royal-industries-hero.jpg";
import manufacturingImage from "@/assets/royal-manufacturing.jpg";
import productsImage from "@/assets/royal-products.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  ["Home", "#home"],
  ["About Us", "#about"],
  ["Our Legacy", "#legacy"],
  ["Products", "#products"],
  ["OEM Excellence", "#oem"],
  ["Contact Us", "#contact"],
] as const;

const products = [
  { icon: Radio, title: "Public Address Amplifiers", text: "Powerful, dependable amplification engineered for professional audio applications." },
  { icon: Volume2, title: "Horn Speakers", text: "Durable, high-performance speakers designed for clear, far-reaching sound projection." },
  { icon: Mic2, title: "Microphones", text: "Professional microphones engineered for natural clarity and dependable performance." },
  { icon: Zap, title: "Megaphones", text: "Portable, powerful communication systems for announcements wherever they are needed." },
  { icon: Headphones, title: "Integrated PA Systems", text: "Complete public address solutions for commercial and professional environments." },
  { icon: Factory, title: "Custom OEM Manufacturing", text: "Production partnerships backed by generations of engineering and manufacturing expertise." },
];

const industries = [
  { icon: GraduationCap, label: "Education", detail: "Schools & Universities" },
  { icon: Building2, label: "Government", detail: "Public Institutions" },
  { icon: Church, label: "Religious Places", detail: "Places of Worship" },
  { icon: Users, label: "Commercial", detail: "Offices & Businesses" },
  { icon: Mic2, label: "Events", detail: "Public Gatherings" },
  { icon: Factory, label: "Industrial", detail: "Factories & Facilities" },
  { icon: Train, label: "Transportation", detail: "Stations & Public Areas" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Royal Industries | PA System Manufacturer Noida" },
      { name: "description", content: "Royal Industries is a trusted public address system manufacturer in Noida with 65+ years of expertise and original OEM manufacturing for Ahuja Radios." },
      { property: "og:title", content: "Royal Industries | 65+ Years of Sound Engineering" },
      { property: "og:description", content: "Trusted public address systems, professional audio equipment and OEM manufacturing expertise since the 1960s." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Royal Industries",
          description: "Manufacturer of public address systems and professional audio equipment.",
          telephone: "+918347560001",
          email: "info@royalindustry.co",
          address: {
            "@type": "PostalAddress",
            streetAddress: "B-14, Block, Sector 58",
            addressLocality: "Noida",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: RoyalIndustriesPage,
});

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="group inline-flex items-center gap-3" aria-label="Royal Industries home">
      <span className="grid size-11 place-items-center border border-primary bg-primary text-lg font-bold text-primary-foreground transition-transform group-hover:-translate-y-0.5">R</span>
      <span className="leading-none">
        <span className={`block font-display text-lg font-bold tracking-normal ${light ? "text-hero-foreground" : "text-foreground"}`}>ROYAL INDUSTRIES</span>
        <span className={`mt-1 block text-[0.62rem] font-semibold tracking-[0.16em] ${light ? "text-hero-muted" : "text-muted-foreground"}`}>PUBLIC ADDRESS SYSTEMS</span>
      </span>
    </a>
  );
}

function SectionHeading({ eyebrow, title, description, inverse = false }: { eyebrow: string; title: string; description?: string; inverse?: boolean }) {
  return (
    <div className="max-w-3xl reveal">
      <p className="section-eyebrow"><span />{eyebrow}</p>
      <h2 className={`mt-5 font-display text-4xl font-bold leading-[1.05] tracking-normal md:text-6xl ${inverse ? "text-hero-foreground" : "text-foreground"}`}>{title}</h2>
      {description ? <p className={`mt-5 max-w-2xl text-base leading-7 md:text-lg ${inverse ? "text-hero-muted" : "text-muted-foreground"}`}>{description}</p> : null}
    </div>
  );
}

function RoyalIndustriesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const mapKey = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    const { error } = await supabase.from("contact_enquiries").insert({
      full_name: String(data.get("fullName") ?? "").trim(),
      company_name: String(data.get("companyName") ?? "").trim() || null,
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    });
    setSubmitting(false);
    if (error) {
      toast.error("We couldn't send your enquiry. Please call us instead.");
      return;
    }
    form.reset();
    toast.success("Thank you! Our team will get back to you shortly.");
  }

  return (
    <main className="overflow-x-hidden bg-background">
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || menuOpen ? "border-b border-border bg-background/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Brand light={!scrolled && !menuOpen} />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} className={`text-sm font-medium transition-colors hover:text-primary ${scrolled ? "text-foreground" : "text-hero-foreground"}`}>{label}</a>)}
          </nav>
          <Button asChild variant="industrial" className="hidden lg:inline-flex"><a href="#contact">Contact Us <ArrowRight /></a></Button>
          <Button variant="ghost" size="icon" className={scrolled || menuOpen ? "lg:hidden" : "text-hero-foreground hover:text-primary lg:hidden"} onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen ? (
          <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block border-b border-border py-3 text-sm font-semibold text-foreground">{label}</a>)}
          </nav>
        ) : null}
      </header>

      <section id="home" className="relative min-h-[760px] bg-industrial pt-20 text-hero-foreground md:min-h-[850px]">
        <img src={heroImage} alt="Professional public address equipment inside the Royal Industries manufacturing facility" width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover object-[64%_center]" />
        <div className="hero-shade absolute inset-0" />
        <div className="sound-lines absolute bottom-0 left-0 right-0 h-32 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-24 lg:px-8">
          <div className="max-w-3xl animate-enter">
            <p className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-hero-foreground"><span className="h-px w-10 bg-primary" />Original OEM for Ahuja Radios</p>
            <h1 className="font-display text-5xl font-bold leading-[0.98] tracking-normal sm:text-6xl md:text-8xl">65+ Years of Sound Engineering <span className="text-primary">Excellence.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-hero-muted md:text-xl md:leading-8">Royal Industries is a trusted name in Public Address Systems, built on generations of manufacturing expertise and reliable performance.</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild variant="industrial" size="xl"><a href="#legacy">Explore Our Legacy <ArrowRight /></a></Button>
              <Button asChild variant="heroOutline" size="xl"><a href="#contact">Contact Us</a></Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 border-t border-hero-line bg-industrial/85 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 lg:grid-cols-4 lg:px-8">
            {[['65+', 'Years of Experience'], ['Trusted', 'Manufacturing Excellence'], ['OEM', 'Original OEM for Ahuja'], ['PAN India', 'Serving Across India']].map(([value, label]) => <div key={value} className="border-hero-line px-4 py-5 first:border-l lg:border-r lg:py-6"><strong className="block font-display text-2xl text-hero-foreground md:text-3xl">{value}</strong><span className="mt-1 block text-xs text-hero-muted">{label}</span></div>)}
          </div>
        </div>
      </section>

      <section id="about" className="section-space">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_0.82fr] lg:items-center lg:px-8">
          <div>
            <SectionHeading eyebrow="About Royal Industries" title="A Legacy Built on Sound & Trust" />
            <div className="reveal mt-8 space-y-5 text-base leading-7 text-muted-foreground">
              <p>For over <strong className="text-foreground">65 years</strong>, Royal Industries has been associated with quality, reliability and excellence in Public Address Systems.</p>
              <p>Our commitment to precision manufacturing and customer satisfaction has helped us build lasting relationships across the professional audio industry.</p>
            </div>
            <div className="reveal mt-9 grid gap-px bg-border sm:grid-cols-2">
              <div className="bg-secondary p-6"><span className="font-display text-3xl font-bold text-primary">65+</span><p className="mt-2 text-sm font-semibold text-foreground">Years of Manufacturing Excellence</p></div>
              <div className="bg-secondary p-6"><ShieldCheck className="size-8 text-primary" /><p className="mt-2 text-sm font-semibold text-foreground">Original OEM for Ahuja Radios</p></div>
            </div>
          </div>
          <div className="reveal relative">
            <img src={manufacturingImage} alt="Experienced engineer testing a public address amplifier" loading="lazy" width={1400} height={900} className="aspect-[4/3] w-full object-cover" />
            <div className="absolute -bottom-6 -left-3 bg-primary p-6 text-primary-foreground shadow-industrial md:-left-8"><strong className="block font-display text-4xl">Since</strong><span className="text-sm font-bold uppercase tracking-[0.14em]">The 1960s</span></div>
          </div>
        </div>
      </section>

      <section id="legacy" className="section-space bg-secondary">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Our Legacy" title="65+ Years of Trust. One Legacy." description="A journey shaped by craftsmanship, enduring partnerships and an unwavering commitment to dependable sound." />
          <div className="mt-14 grid gap-0 border-y border-border md:grid-cols-4">
            {[
              ["1960s", "The Beginning", "Royal Industries begins its journey in the Public Address Systems industry."],
              ["Generations", "Growing with Purpose", "Manufacturing capabilities and technical expertise expand over time."],
              ["OEM", "Manufacturing Excellence", "A trusted original OEM association built on quality audio manufacturing."],
              ["Today", "The Legacy Continues", "Reliability, innovation and engineering excellence carry forward."],
            ].map(([year, title, text], index) => <article key={year} className="reveal relative border-border px-6 py-10 md:border-r md:last:border-r-0"><span className="mb-7 grid size-10 place-items-center border border-primary font-mono text-sm font-bold text-primary">0{index + 1}</span><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{year}</p><h3 className="mt-3 font-display text-2xl font-bold text-foreground">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="products" className="section-space">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <SectionHeading eyebrow="Product Expertise" title="Engineered for Every Voice to Be Heard." description="Professional audio equipment designed for consistent performance, clear communication and demanding environments." />
            <img src={productsImage} alt="Range of public address amplifiers, speakers, microphones and megaphones" loading="lazy" width={1400} height={900} className="reveal aspect-[16/8] w-full object-cover" />
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => <article key={product.title} className="group reveal bg-background p-7 transition-colors hover:bg-secondary"><div className="flex items-start justify-between"><product.icon className="size-9 text-primary" strokeWidth={1.5} /><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span></div><h3 className="mt-8 font-display text-xl font-bold uppercase text-foreground">{product.title}</h3><p className="mt-3 min-h-18 text-sm leading-6 text-muted-foreground">{product.text}</p><a href="#contact" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Explore More <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" /></a></article>)}
          </div>
        </div>
      </section>

      <section id="oem" className="section-space bg-industrial text-hero-foreground">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <SectionHeading inverse eyebrow="OEM Excellence" title="Original OEM Manufacturing Excellence" description="Decades of engineering, production and quality-focused manufacturing have established Royal Industries as a trusted name in professional audio equipment." />
            <blockquote className="reveal mt-10 border-l-2 border-primary pl-6 font-display text-2xl font-semibold leading-snug text-hero-foreground md:text-3xl">Proud Legacy. Trusted Manufacturing. Reliable Sound.</blockquote>
          </div>
          <div className="reveal grid gap-px bg-hero-line sm:grid-cols-2">
            {["65+ Years of Experience", "Experienced Manufacturing", "Quality-Focused Production", "Reliable Engineering", "Professional Audio Solutions", "OEM Capabilities"].map((item) => <div key={item} className="flex min-h-24 items-center gap-3 bg-industrial p-5"><span className="grid size-7 shrink-0 place-items-center bg-primary text-primary-foreground"><Check className="size-4" /></span><span className="text-sm font-semibold text-hero-foreground">{item}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Why Royal Industries" title="Experience You Can Hear. Quality You Can Trust." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["65+ Years Experience", "Generations of industry knowledge and manufacturing expertise."], ["Trusted Quality", "A lasting commitment to reliable and durable products."], ["OEM Expertise", "Professional manufacturing capabilities proven over decades."], ["Engineering Excellence", "Precision-focused design, testing and production."], ["Customer Trust", "Long-standing relationships built through dependable service."], ["Industry Knowledge", "Deep understanding of professional public address equipment."],
            ].map(([title, text], index) => <article key={title} className="reveal border-t-2 border-primary pt-6"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="mt-4 font-display text-xl font-bold text-foreground">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="section-eyebrow reveal"><span />Industries We Serve</p>
          <div className="mt-9 grid grid-cols-2 gap-px bg-border md:grid-cols-4 lg:grid-cols-7">
            {industries.map((industry) => <div key={industry.label} className="reveal bg-secondary p-5 text-center"><industry.icon className="mx-auto size-7 text-primary" strokeWidth={1.5} /><strong className="mt-4 block text-sm text-foreground">{industry.label}</strong><span className="mt-1 block text-xs leading-5 text-muted-foreground">{industry.detail}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.9fr_1fr] lg:items-center lg:px-8">
          <img src={manufacturingImage} alt="Precision testing and quality inspection at Royal Industries" loading="lazy" width={1400} height={900} className="reveal aspect-[4/3] w-full object-cover" />
          <div>
            <SectionHeading eyebrow="Manufacturing & Quality" title="Built with Experience. Tested for Reliability." description="From product development to production and final quality checks, every stage is focused on delivering professional Public Address solutions that perform consistently." />
            <div className="reveal mt-8 grid grid-cols-2 gap-4">
              {["Precision Manufacturing", "Experienced Team", "Quality Inspection", "Reliable Components", "Consistent Performance", "Professional Standards"].map((item) => <div key={item} className="flex items-center gap-2 text-sm font-semibold text-foreground"><Check className="size-4 shrink-0 text-primary" />{item}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
        <div className="sound-lines absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-[0.16em]">Work With Royal Industries</p><h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-normal md:text-5xl">Looking for Reliable Public Address Solutions?</h2></div>
          <div className="flex shrink-0 flex-wrap gap-3"><Button asChild variant="light" size="xl"><a href="tel:+918347560001"><Phone />Call Us Now</a></Button><Button asChild variant="lightOutline" size="xl"><a href="#contact"><Mail />Send Enquiry</a></Button></div>
        </div>
      </section>

      <section id="contact" className="section-space bg-secondary">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading eyebrow="Contact Us" title="Let’s Build Better Sound Together." description="Tell us about your requirement. Our team will respond with the right public address or OEM manufacturing solution." />
          <div className="mt-12 grid gap-0 border border-border bg-background lg:grid-cols-[0.7fr_1fr]">
            <aside className="bg-industrial p-7 text-hero-foreground md:p-10">
              <Brand light />
              <div className="mt-12 space-y-8">
                <div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-primary" /><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-hero-muted">Address</p><p className="mt-2 text-sm leading-6">B-14, Block, Sector 58<br />Noida, Uttar Pradesh, India</p></div></div>
                <div className="flex gap-4"><Phone className="mt-1 size-5 shrink-0 text-primary" /><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-hero-muted">Contact</p><a className="mt-2 block text-sm hover:text-primary" href="tel:+918347560001">083475 60001</a></div></div>
                <div className="flex gap-4"><Mail className="mt-1 size-5 shrink-0 text-primary" /><div><p className="text-xs font-bold uppercase tracking-[0.15em] text-hero-muted">Email</p><a className="mt-2 block text-sm hover:text-primary" href="mailto:info@royalindustry.co">info@royalindustry.co</a></div></div>
              </div>
            </aside>
            <form onSubmit={handleSubmit} className="grid gap-5 p-7 md:grid-cols-2 md:p-10">
              <div className="space-y-2"><Label htmlFor="fullName">Full Name *</Label><Input id="fullName" name="fullName" required minLength={2} placeholder="Your full name" /></div>
              <div className="space-y-2"><Label htmlFor="companyName">Company Name</Label><Input id="companyName" name="companyName" placeholder="Your company" /></div>
              <div className="space-y-2"><Label htmlFor="phone">Phone Number *</Label><Input id="phone" name="phone" type="tel" required minLength={7} placeholder="+91" /></div>
              <div className="space-y-2"><Label htmlFor="email">Email Address *</Label><Input id="email" name="email" type="email" required placeholder="you@company.com" /></div>
              <div className="space-y-2 md:col-span-2"><Label htmlFor="subject">Subject *</Label><Input id="subject" name="subject" required minLength={2} placeholder="How can we help?" /></div>
              <div className="space-y-2 md:col-span-2"><Label htmlFor="message">Message *</Label><Textarea id="message" name="message" required minLength={10} rows={5} placeholder="Tell us about your requirement" /></div>
              <div className="md:col-span-2"><Button type="submit" variant="industrial" size="xl" disabled={submitting}>{submitting ? "Sending…" : "Send Enquiry"}<ArrowRight /></Button></div>
            </form>
          </div>
        </div>
      </section>

      <section aria-label="Royal Industries location" className="h-[420px] bg-muted">
        {mapKey ? <iframe title="Royal Industries, Sector 58, Noida" src={`https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=${encodeURIComponent("Royal Industries B-14 Block Sector 58 Noida Uttar Pradesh")}&zoom=15`} className="h-full w-full border-0 grayscale" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" /> : <div className="grid h-full place-items-center text-center"><div><MapPin className="mx-auto size-8 text-primary" /><p className="mt-3 font-semibold">B-14, Block, Sector 58, Noida</p></div></div>}
      </section>

      <footer className="bg-industrial py-12 text-hero-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
          <div><Brand light /><p className="mt-5 max-w-md text-sm leading-6 text-hero-muted">65+ years of manufacturing excellence in professional public address systems.</p></div>
          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Footer navigation">{navItems.map(([label, href]) => <a key={href} href={href} className="text-hero-muted hover:text-primary">{label}</a>)}</nav>
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-hero-line px-5 pt-6 text-xs text-hero-muted md:flex-row md:justify-between lg:px-8"><p>© 2026 Royal Industries. All Rights Reserved.</p><p>Engineering Sound. Building Trust.</p></div>
      </footer>

      <a href="https://wa.me/918347560001" target="_blank" rel="noreferrer" aria-label="Contact Royal Industries on WhatsApp" className="fixed bottom-5 right-5 z-40 grid size-13 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-industrial transition-transform hover:-translate-y-1"><Phone className="size-5" /></a>
    </main>
  );
}