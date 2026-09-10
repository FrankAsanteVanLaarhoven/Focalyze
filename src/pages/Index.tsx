
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CtaBanner from "@/components/CtaBanner";
import Research from "@/components/Research";
import Technology from "@/components/Technology";
import Documentation from "@/components/Documentation";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Import only the necessary functions, not the ones causing hook issues
import { useNavbarScrollEffect, useAnimateOnScroll } from "@/utils/scrollEffects";

const Index = () => {
  // Use React's useEffect for initialization instead of the imported function
  React.useEffect(() => {
    // Initialize any necessary functionality here
    // But avoid calling other hooks or hook-containing functions
    const initScrolling = () => {
      // Basic smooth scrolling initialization without hooks
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth'
            });
          }
        });
      });
    };
    
    initScrolling();
  }, []);
  
  // Use navbar scroll effect (assuming this is a proper hook)
  useNavbarScrollEffect();
  
  // Use animate on scroll effect (assuming this is a proper hook)
  useAnimateOnScroll();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <CtaBanner />
      <Research />
      <Technology />
      <Documentation />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
