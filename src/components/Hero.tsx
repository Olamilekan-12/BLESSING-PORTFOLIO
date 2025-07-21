"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// Dynamically import Three.js component with no SSR
const HeroBackground = dynamic(
  () => import("@/components/three/HeroBackground"),
  { ssr: false }
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Function to split text into spans for animation
  const splitTextIntoSpans = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useGSAP(() => {
    // Create timeline for more coordinated animations
    const tl = gsap.timeline();
    
    // Animate hero title with 3D effect
    tl.fromTo(
      ".hero-title span",
      { 
        y: 100, 
        opacity: 0,
        rotationX: -90,
        transformOrigin: "0% 50% -50",
      },
      { 
        y: 0, 
        opacity: 1,
        rotationX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate hero subtitle with 3D effect
    tl.fromTo(
      ".hero-subtitle",
      { 
        y: 20, 
        opacity: 0,
        rotationY: 30,
        transformOrigin: "0% 50%",
      },
      { 
        y: 0, 
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Animate hero description
    tl.fromTo(
      ".hero-description",
      { 
        y: 20, 
        opacity: 0,
        scale: 0.9,
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Animate hero buttons with staggered 3D effect
    tl.fromTo(
      ".hero-buttons .btn",
      { 
        y: 20, 
        opacity: 0,
        scale: 0.8,
        rotationX: 30,
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        rotationX: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.6"
    );

    // Animate scroll indicator with continuous bounce
    tl.fromTo(
      ".scroll-indicator",
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
    
    // Add continuous bounce animation to scroll indicator
    gsap.to(".scroll-indicator", {
      y: 10,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Animate hero image with 3D rotation
    tl.fromTo(
      ".hero-image-container",
      { 
        scale: 0.8,
        opacity: 0,
        rotationY: -20,
        transformOrigin: "center center",
      },
      { 
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
      },
      "-=1.5"
    );

    // Animate badges with elastic bounce
    tl.fromTo(
      ".hero-badge",
      { 
        scale: 0,
        opacity: 0,
        rotation: -15,
      },
      { 
        scale: 1,
        opacity: 1,
        rotation: 0,
        stagger: 0.2,
        duration: 1,
        ease: "elastic.out(1, 0.3)",
      },
      "-=0.8"
    );
    
    // Add hover animations to buttons
    const buttons = document.querySelectorAll('.hero-buttons .btn');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power1.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power1.out"
        });
      });
    });
    
    // Add subtle floating animation to the hero image
    gsap.to(".hero-image-container", {
      y: 15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });
  }, { scope: heroRef });

  // Split text into words for animation
//   const splitTextIntoSpans = (text: string) => {
//     return text.split(' ').map((word, index) => (
//       <span key={index} className="word inline-block overflow-hidden mr-[0.25em]">
//         {word}
//       </span>
//     ));
//   };

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center py-20 px-6 md:px-12 overflow-hidden">
      {/* Three.js animated background */}
      <HeroBackground />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Hero Text */}
        <div className="order-2 lg:order-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] hero-title">
            {splitTextIntoSpans("Elevate Your Social Media Presence")}
          </h1>
          <p className="text-xl md:text-2xl font-medium mt-4 text-primary hero-subtitle">
            Social Media Management & Strategy
          </p>
          <p className="mt-6 text-foreground/70 hero-description">
            I help brands and individuals create engaging content, build authentic connections, 
            and drive meaningful results through strategic social media management.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 hero-buttons">
            <Button 
              size="lg" 
              className="btn"
              onClick={() => {
                const section = document.getElementById('contact');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="btn"
              onClick={() => {
                const section = document.getElementById('portfolio');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              View My Work
            </Button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="order-1 lg:order-2 relative hero-image-container">
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <Image 
              src="/images/me.jpg" 
              alt="Blessing Oghie" 
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
            
            {/* Experience Badge */}
            <div className="absolute -bottom-5 -left-5 bg-background shadow-lg rounded-full py-2 px-4 flex items-center hero-badge">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <span className="text-sm font-bold text-primary">3+</span>
              </div>
              <div>
                <p className="text-xs font-medium">Experience</p>
                <p className="text-sm font-bold">Years</p>
              </div>
            </div>
            
            {/* Followers Badge */}
            <div className="absolute -top-5 -right-5 bg-background shadow-lg rounded-full py-2 px-4 flex items-center hero-badge">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                <span className="text-sm font-bold text-primary">1.2k</span>
              </div>
              <div>
                <p className="text-xs font-medium">Followers</p>
                <p className="text-sm font-bold">Across Platforms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center scroll-indicator">
        <span className="text-sm font-medium mb-2">Scroll Down</span>
        <ArrowDown className="h-5 w-5" />
      </div>
    </section>
  );
}
