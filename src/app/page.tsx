import LandingNav from "@/components/landing/LandingNav";
import LandingHero from "@/components/landing/LandingHero";
import LandingValues from "@/components/landing/LandingValues";
import LandingProblems from "@/components/landing/LandingProblems";
import LandingScreens from "@/components/landing/LandingScreens";
import LandingHowItWorks from "@/components/landing/LandingHowItWorks";
import LandingFree from "@/components/landing/LandingFree";
import LandingTestimonials from "@/components/landing/LandingTestimonials";
import LandingFAQ from "@/components/landing/LandingFAQ";
import LandingFooter from "@/components/landing/LandingFooter";

export default function HomePage() {
  return (
    <div className="bg-white min-h-[100dvh] overflow-x-hidden">
      <LandingNav />
      <LandingHero />
      <LandingValues />
      <LandingProblems />
      <LandingScreens />
      <LandingHowItWorks />
      <LandingFree />
      <LandingTestimonials />
      <LandingFAQ />
      <LandingFooter />
    </div>
  );
}
