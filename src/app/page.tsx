import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Strategy from "@/components/Strategy";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Gallery from "@/components/Gallery";
import Tools from "@/components/Tools";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Strategy />
      <Portfolio />
      <Gallery />
      <Tools />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
