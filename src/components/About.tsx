"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Social Media Strategy",
  "Content Creation",
  "Community Management",
  "Influencer Partnerships",
  "Analytics & Reporting",
  "Paid Social Campaigns",
  "Brand Voice Development",
  "Crisis Management"
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".about-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate content
    gsap.fromTo(
      ".about-content",
      { 
        opacity: 0,
        x: -50
      },
      { 
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate image
    gsap.fromTo(
      ".about-image",
      { 
        opacity: 0,
        scale: 0.9,
        x: 50
      },
      { 
        opacity: 1,
        scale: 1,
        x: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate skills
    gsap.fromTo(
      ".skill-item",
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".skills-list",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 about-title">
          <h2 className="text-sm md:text-base font-medium text-primary mb-2">
            About Me
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold leading-[1.2]">
            Social Media Expert & Content Strategist
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="about-content">
            <p className="text-lg mb-6 text-foreground/80">
              Hello! I&apos;m Blessing Oghie, a passionate Social Media Manager with over 3 years of experience helping brands build meaningful connections with their audiences through strategic social media management.
            </p>
            
            <p className="text-lg mb-6 text-foreground/80">
              My approach combines creative content creation, data-driven strategy, and authentic community engagement to help brands stand out in today&apos;s crowded digital landscape. I believe that successful social media isn&apos;t just about posting content—it&apos;s about creating conversations that convert.
            </p>
            
            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">My Expertise</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 skills-list">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 skill-item">
                    <CheckCircle2 className="text-primary" size={18} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Button size="lg" className="group">
              <a href="/cv.pdf" download>
                Download Resume
              </a>
            </Button>
          </div>
          
          <div className="about-image relative">
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl -z-10"></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-border/50 shadow-lg">
                <Image
                  src="/images/me2.jpg"
                  alt="Blessing Oghie - Social Media Manager"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Experience badge */}
              <div className="absolute -top-4 -right-4 bg-background rounded-full p-4 shadow-lg border border-border/50">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary">3+</span>
                  <span className="text-xs">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
