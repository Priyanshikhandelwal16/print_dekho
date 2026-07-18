import { Hero } from "@/components/home/Hero";
import { TrustedBy } from "@/components/home/TrustedBy";
import { WhyPrintDekho } from "@/components/home/WhyPrintDekho";
import { Categories } from "@/components/home/Categories";
import { CorporateKits } from "@/components/home/CorporateKits";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Industries } from "@/components/home/Industries";
import { BrandingProcess } from "@/components/home/BrandingProcess";
import { Portfolio } from "@/components/home/Portfolio";
import { Testimonials } from "@/components/home/Testimonials";
import { Statistics } from "@/components/home/Statistics";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <WhyPrintDekho />
      <Categories />
      <CorporateKits />
      <BeforeAfter />
      <FeaturedProducts />
      <Industries />
      <BrandingProcess />
      <Portfolio />
      <Testimonials />
      <Statistics />
      <FAQ />
      <CTASection />
    </>
  );
}
