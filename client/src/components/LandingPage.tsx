
import  HeroSection  from "./landing/Hero-section";
import { FeaturesSection } from "./landing/features-section";
//import { AnalyticsSection } from "./landing/analytics-section";
import { QualitySection } from "./landing/quality-section";
import Navbar from "./Navbar";
import { useEffect } from "react";
import MinimalFooter from "./landing/Footer";

const LandingPage = () => {
  useEffect(() => {


     window.history.pushState(null, '', '/');
  window.history.replaceState(null, '', '/');


  

 
  
}, []);
  return (
   <div className="max-w-8xl">
    <Navbar />
    <HeroSection />
    
      <FeaturesSection />
      {/* <AnalyticsSection /> */}
      <QualitySection />
      <MinimalFooter/>
   </div>
  );
};

export default LandingPage;