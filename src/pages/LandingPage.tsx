import Hero from "@/components/landing/Hero";
import TrustedByMarquee from "@/components/landing/TrustedByMarquee";
import Steps from "@/components/landing/Steps";

const LandingPage = () => {
  return (
     <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <Hero />
      <TrustedByMarquee />
      <Steps />
    </div>
  )
}

export default LandingPage