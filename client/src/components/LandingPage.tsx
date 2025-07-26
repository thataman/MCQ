
import  HeroSection  from "./landing/Hero-section";
import { FeaturesSection } from "./landing/features-section";
import { AnalyticsSection } from "./landing/analytics-section";
import { QualitySection } from "./landing/quality-section";
import Navbar from "./Navbar";

const LandingPage = () => {
  return (
   <>
    <Navbar />
    <HeroSection />
      <FeaturesSection />
      <AnalyticsSection />
      <QualitySection />
   </>
  );
};

export default LandingPage;