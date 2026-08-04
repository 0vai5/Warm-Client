import Comparison from "@/components/landing/Comparision";
import Hero from "@/components/landing/Hero";
import Steps from "@/components/landing/Steps";
import TrustedByMarquee from "@/components/landing/TrustedByMarquee";
import CTA from "@/components/landing/CTA";

const LandingPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <Hero />
      <TrustedByMarquee />
      <Steps />
      <Comparison />
      <CTA />
    </div>
  );
};

export default LandingPage;
