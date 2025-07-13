// GSAP Animation Utilities with Debug Support
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Debug mode - set to true to enable markers and console logs
const DEBUG_MODE = false;

// Helper function for debug logging
const debugLog = (message, data = null) => {
  if (DEBUG_MODE) {
    console.log(`[GSAP Debug] ${message}`, data);
  }
};

// Hero animations with proper initial states
export const animateHero = () => {
  debugLog('Starting hero animations');
  
  // Ensure elements exist before animating
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroCta = document.querySelector('.hero-cta');
  const heroImage = document.querySelector('.hero-image');
  
  if (!heroTitle) {
    debugLog('Hero title element not found');
    return;
  }
  
  // Set initial states explicitly
  gsap.set([heroTitle, heroSubtitle, heroCta, heroImage], {
    opacity: 0,
    y: 50,
    clearProps: 'transform'
  });
  
  const tl = gsap.timeline({
    onComplete: () => debugLog('Hero animation complete')
  });
  
  tl.to(heroTitle, {
    duration: 1.2,
    y: 0,
    opacity: 1,
    ease: 'power3.out'
  })
  .to(heroSubtitle, {
    duration: 1,
    y: 0,
    opacity: 1,
    ease: 'power3.out'
  }, '-=0.6')
  .to(heroCta, {
    duration: 0.8,
    y: 0,
    opacity: 1,
    ease: 'power3.out'
  }, '-=0.4')
  .to(heroImage, {
    duration: 1,
    y: 0,
    opacity: 1,
    scale: 1,
    ease: 'power3.out'
  }, '-=0.8');
  
  return tl;
};

// Floating elements animation with better performance
export const animateFloatingElements = () => {
  debugLog('Starting floating elements animation');
  
  const floatingElements = document.querySelectorAll('.floating-element');
  
  if (floatingElements.length === 0) {
    debugLog('No floating elements found');
    return;
  }
  
  // Set initial opacity to prevent flash
  gsap.set(floatingElements, { opacity: 0.1 });
  
  floatingElements.forEach((element, index) => {
    gsap.to(element, {
      y: -20,
      duration: 3 + (index * 0.5),
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
      delay: index * 0.5,
      onStart: () => {
        gsap.to(element, { opacity: 0.1, duration: 0.5 });
      }
    });
  });
};

// Enhanced feature cards animation with proper visibility
export const animateFeatureCards = () => {
  debugLog('Starting feature cards animation');
  
  const featureSection = document.querySelector('.features-section');
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (!featureSection || featureCards.length === 0) {
    debugLog('Feature section or cards not found', {
      section: !!featureSection,
      cards: featureCards.length
    });
    return;
  }
  
  // Set initial states
  gsap.set(featureCards, {
    opacity: 0,
    y: 60,
    scale: 0.9
  });
  
  // Create ScrollTrigger animation
  ScrollTrigger.create({
    trigger: featureSection,
    start: 'top 80%',
    end: 'bottom 20%',
    markers: DEBUG_MODE,
    onEnter: () => {
      debugLog('Feature cards entering viewport');
      gsap.to(featureCards, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        ease: 'power3.out',
        onComplete: () => debugLog('Feature cards animation complete')
      });
    },
    onLeave: () => {
      if (DEBUG_MODE) {
        debugLog('Feature cards leaving viewport');
      }
    }
  });
};

// Stats counter animation with better timing
export const animateStats = () => {
  debugLog('Starting stats animation');
  
  const stats = document.querySelectorAll('.stat-number');
  
  if (stats.length === 0) {
    debugLog('No stat numbers found');
    return;
  }
  
  stats.forEach((stat, index) => {
    const target = parseInt(stat.getAttribute('data-target'));
    
    if (isNaN(target)) {
      debugLog(`Invalid target for stat ${index}:`, stat.getAttribute('data-target'));
      return;
    }
    
    // Set initial value
    stat.textContent = '0';
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      markers: DEBUG_MODE,
      onEnter: () => {
        debugLog(`Animating stat ${index} to ${target}`);
        gsap.to(stat, {
          duration: 2.5,
          textContent: target,
          roundProps: 'textContent',
          ease: 'power2.out',
          onUpdate: function() {
            stat.textContent = Math.round(this.targets()[0].textContent);
          }
        });
      }
    });
  });
};

// How it works animation with improved visibility
export const animateHowItWorks = () => {
  debugLog('Starting how it works animation');
  
  const section = document.querySelector('.how-it-works-section');
  const stepCards = document.querySelectorAll('.step-card');
  const connectors = document.querySelectorAll('.step-connector');
  
  if (!section) {
    debugLog('How it works section not found');
    return;
  }
  
  // Set initial states
  gsap.set(stepCards, {
    opacity: 0,
    x: -60,
    scale: 0.9
  });
  
  gsap.set(connectors, {
    scaleX: 0,
    transformOrigin: 'left center'
  });
  
  ScrollTrigger.create({
    trigger: section,
    start: 'top 75%',
    end: 'bottom 25%',
    markers: DEBUG_MODE,
    onEnter: () => {
      debugLog('How it works section entering');
      
      // Animate step cards
      gsap.to(stepCards, {
        duration: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      // Animate connectors with delay
      gsap.to(connectors, {
        duration: 1.2,
        scaleX: 1,
        stagger: 0.3,
        ease: 'power2.out',
        delay: 0.5
      });
    }
  });
};

// Enhanced success animation
export const animateSuccess = (element) => {
  if (!element) {
    debugLog('Success animation: element not provided');
    return;
  }
  
  debugLog('Playing success animation');
  
  gsap.fromTo(element, 
    {
      scale: 0.8,
      opacity: 0,
      y: 20
    },
    {
      duration: 0.6,
      scale: 1,
      opacity: 1,
      y: 0,
      ease: 'back.out(1.7)',
      onComplete: () => debugLog('Success animation complete')
    }
  );
};

// Improved card hover animations
export const setupCardHovers = () => {
  debugLog('Setting up card hover animations');
  
  const cards = document.querySelectorAll('.walmart-card');
  
  if (cards.length === 0) {
    debugLog('No walmart cards found for hover setup');
    return;
  }
  
  cards.forEach((card, index) => {
    // Set initial state
    gsap.set(card, {
      y: 0,
      boxShadow: '0 4px 6px -1px rgba(0, 76, 145, 0.1), 0 2px 4px -1px rgba(0, 76, 145, 0.06)'
    });
    
    card.addEventListener('mouseenter', () => {
      debugLog(`Card ${index} hover enter`);
      gsap.to(card, {
        duration: 0.3,
        y: -8,
        boxShadow: '0 20px 25px -5px rgba(0, 76, 145, 0.15), 0 10px 10px -5px rgba(0, 76, 145, 0.08)',
        ease: 'power2.out'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      debugLog(`Card ${index} hover leave`);
      gsap.to(card, {
        duration: 0.3,
        y: 0,
        boxShadow: '0 4px 6px -1px rgba(0, 76, 145, 0.1), 0 2px 4px -1px rgba(0, 76, 145, 0.06)',
        ease: 'power2.out'
      });
    });
  });
  
  debugLog(`Set up hover animations for ${cards.length} cards`);
};

// Form validation animations
export const animateFormError = (element) => {
  if (!element) {
    debugLog('Form error animation: element not provided');
    return;
  }
  
  debugLog('Playing form error animation');
  
  gsap.to(element, {
    duration: 0.1,
    x: 10,
    yoyo: true,
    repeat: 5,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.set(element, { x: 0 });
      debugLog('Form error animation complete');
    }
  });
};

// Enhanced scroll reveal animation
export const scrollReveal = (selector, options = {}) => {
  debugLog(`Setting up scroll reveal for: ${selector}`);
  
  const elements = document.querySelectorAll(selector);
  
  if (elements.length === 0) {
    debugLog(`No elements found for selector: ${selector}`);
    return;
  }
  
  const defaultOptions = {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out',
    stagger: 0.15,
    start: 'top 80%'
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  
  // Set initial states
  gsap.set(elements, {
    opacity: finalOptions.opacity,
    y: finalOptions.y
  });
  
  ScrollTrigger.create({
    trigger: elements[0],
    start: finalOptions.start,
    markers: DEBUG_MODE,
    onEnter: () => {
      debugLog(`Scroll reveal triggered for: ${selector}`);
      gsap.to(elements, {
        duration: finalOptions.duration,
        y: 0,
        opacity: 1,
        stagger: finalOptions.stagger,
        ease: finalOptions.ease,
        onComplete: () => debugLog(`Scroll reveal complete for: ${selector}`)
      });
    }
  });
  
  debugLog(`Scroll reveal setup complete for ${elements.length} elements`);
};

// Page transition animations
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeInOut' }
};

// Loading animation
export const animateLoading = () => {
  debugLog('Starting loading animation');
  
  const loadingDots = document.querySelectorAll('.loading-dot');
  
  if (loadingDots.length === 0) {
    debugLog('No loading dots found');
    return;
  }
  
  gsap.to(loadingDots, {
    y: -10,
    duration: 0.6,
    ease: 'power2.inOut',
    yoyo: true,
    repeat: -1,
    stagger: 0.2
  });
};

// Utility function to refresh ScrollTrigger
export const refreshScrollTrigger = () => {
  debugLog('Refreshing ScrollTrigger');
  ScrollTrigger.refresh();
};

// Utility function to kill all animations
export const killAllAnimations = () => {
  debugLog('Killing all animations');
  gsap.killTweensOf('*');
  ScrollTrigger.killAll();
};

// Initialize all animations with proper error handling
export const initializeAnimations = () => {
  debugLog('Initializing all animations');
  
  try {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          setupCardHovers();
          refreshScrollTrigger();
        }, 100);
      });
    } else {
      setTimeout(() => {
        setupCardHovers();
        refreshScrollTrigger();
      }, 100);
    }
  } catch (error) {
    console.error('Error initializing animations:', error);
  }
};

// Export debug utilities
export const debugUtils = {
  enableDebug: () => {
    DEBUG_MODE = true;
    ScrollTrigger.refresh();
  },
  disableDebug: () => {
    DEBUG_MODE = false;
    ScrollTrigger.refresh();
  },
  logScrollTriggers: () => {
    console.log('Active ScrollTriggers:', ScrollTrigger.getAll());
  }
};