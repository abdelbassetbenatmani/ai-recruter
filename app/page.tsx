import CTA from "@/components/Home/CTA";
import FAQ from "@/components/Home/FAQ";
import Features from "@/components/Home/Features";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Navbar from "@/components/Home/Navbar";
import Testimonials from "@/components/Home/Testimonials";
import SectionHeader from "@/components/Home/ui/SectionHeader";
import WhyUs from "@/components/Home/WhyUs";


export default function Home() {
  return (
    <div className="min-h-screen bg-GREY_10">
      <div className="mx-auto max-w-[1900px] px-4 md:px-6 lg:px-[162px]">
        <Navbar />
        <Hero />
        <SectionHeader
          title="Our Features"
          description="Leverage our cutting-edge AI technology to transform your recruitment process"
        />
        <Features />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      
      </div>
    </div>
  );
}
