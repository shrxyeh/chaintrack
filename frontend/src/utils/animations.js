import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero animations
export const animateHero = () => {
  const tl = gsap.timeline();
  
  tl.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  })
  .from('.hero-subtitle', {
    duration: 0.8,
    y: 30,
    opacity: 0,
    ease: 'power3.out'
  }, '-=0.5')
  .from('.hero-cta', {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: 'power3.out'
  }, '-=0.3')
  .from('.hero-image', {
    duration: 1,
    scale: 0.8,
    opacity: 0,
    ease: 'power3.out'
  }, '-=0.8');
  
  return tl;
};

// Floating elements animation
export const animateFloatingElements = () => {
  gsap.to('.floating-element', {
    y: -20,
    duration: 3,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.5
  });
};

// Feature cards animation
export const animateFeatureCards = () => {
  gsap.from('.feature-card', {
    scrollTrigger: {
      trigger: '.features-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
  });
};

// Stats counter animation
export const animateStats = () => {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    
    gsap.to(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      duration: 2,
      textContent: target,
      roundProps: 'textContent',
      ease: 'power2.out'
    });
  });
};

// How it works animation
export const animateHowItWorks = () => {
  gsap.from('.step-card', {
    scrollTrigger: {
      trigger: '.how-it-works-section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    x: -50,
    opacity: 0,
    stagger: 0.3,
    ease: 'power3.out'
  });
  
  gsap.from('.step-connector', {
    scrollTrigger: {
      trigger: '.how-it-works-section',
      start: 'top 60%',
      end: 'bottom 40%',
      toggleActions: 'play none none reverse'
    },
    duration: 1,
    scaleX: 0,
    transformOrigin: 'left center',
    stagger: 0.3,
    ease: 'power2.out'
  });
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: 'easeInOut' }
};

// Loading animation
export const animateLoading = () => {
  gsap.to('.loading-dot', {
    y: -10,
    duration: 0.6,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.2
  });
};

// Success animation
export const animateSuccess = (element) => {
  gsap.from(element, {
    duration: 0.5,
    scale: 0.8,
    opacity: 0,
    ease: 'back.out(1.7)'
  });
};

// Card hover animations
export const setupCardHovers = () => {
  const cards = document.querySelectorAll('.walmart-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 76, 145, 0.15), 0 10px 10px -5px rgba(0, 76, 145, 0.08)',
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        boxShadow: '0 4px 6px -1px rgba(0, 76, 145, 0.1), 0 2px 4px -1px rgba(0, 76, 145, 0.06)',
        ease: 'power2.out'
      });
    });
  });
};

// Form validation animations
export const animateFormError = (element) => {
  gsap.to(element, {
    duration: 0.1,
    x: 10,
    yoyo: true,
    repeat: 5,
    ease: 'power2.inOut'
  });
};

// Scroll reveal animation
export const scrollReveal = (selector, options = {}) => {
  const defaultOptions = {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    stagger: 0.2
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  gsap.from(selector, {
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    ...finalOptions
  });
}