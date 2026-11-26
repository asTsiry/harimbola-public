import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";

import Categories from "@/components/sections/Categories";
import Catalog from "@/components/sections/Catalog";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Categories />
      <Catalog />
      <Testimonials />
      <About />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}