
import { useEffect } from 'react';

// Smooth scrolling function for anchor links
export const initSmoothScrolling = () => {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId as string);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
};

// Navbar scroll effect
export const useNavbarScrollEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.fixed');
      if (!navbar) return;
      
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-md');
        navbar.classList.add('bg-white');
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('py-2');
        navbar.classList.remove('py-4');
      } else {
        navbar.classList.remove('shadow-md');
        navbar.classList.remove('bg-white');
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('py-2');
        navbar.classList.add('py-4');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
};

// Animate elements on scroll
export const useAnimateOnScroll = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        '.feature-card, .research-item, .tech-item, .doc-card, .info-item'
      );
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animate-fade-in');
        }
      });
    };
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial run
    setTimeout(animateOnScroll, 100);
    
    return () => {
      window.removeEventListener('load', animateOnScroll);
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);
};
