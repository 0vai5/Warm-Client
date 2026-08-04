import Hero from "@/components/landing/Hero";
import TrustedByMarquee from "@/components/landing/TrustedByMarquee";

const LandingPage = () => {
  return (
     <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <Hero />
      <TrustedByMarquee />
    </div>
  )
}

export default LandingPage