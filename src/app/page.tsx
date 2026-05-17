import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingProblems from "@/components/landing/LandingProblems";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingFree from "@/components/landing/LandingFree";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="bg-cream min-h-[100dvh] overflow-x-hidden">
      <LandingNav />
      <LandingHero />
      <LandingProblems />
      <LandingHowItWorks />
      <LandingFree />
      <LandingTestimonials />
      <LandingFAQ />
      <LandingFooter />
    </div>
  );
}
