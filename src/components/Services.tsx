"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  BarChart3, 
  MessageSquare, 
  Camera, 
  PenTool, 
  TrendingUp, 
  Calendar,
  Palette,
  Video,
  Target
} from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: BarChart3,
    title: "Social Media Strategy",
    description: "Comprehensive social media strategies tailored to your brand's goals, audience, and industry landscape."
  },
  {
    icon: MessageSquare,
    title: "Community Management",
    description: "Engaging with your audience to build relationships, foster loyalty, and create a thriving online community."
  },
  {
    icon: Camera,
    title: "Content Creation",
    description: "Eye-catching, on-brand content that resonates with your audience and drives meaningful engagement."
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Stunning visuals and graphics that capture attention and strengthen your brand identity across social platforms."
  },
  {
    icon: Video,
    title: "Video Editing",
    description: "Professional video content optimized for social media to increase engagement and reach with your audience."
  },
  {
    icon: Target,
    title: "Paid Advertising",
    description: "Strategic paid campaigns that maximize your budget and deliver measurable ROI across social platforms."
  },
  {
    icon: PenTool,
    title: "Copywriting",
    description: "Compelling copy that captures your brand voice and connects with your audience across all platforms."
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reporting",
    description: "Data-driven insights to measure performance, track growth, and optimize your social media strategy."
  },
  {
    icon: Calendar,
    title: "Content Calendar",
    description: "Strategic planning and scheduling of content to maintain consistency and maximize impact."
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".services-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate service cards
    gsap.fromTo(
      ".service-card",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-20 px-6 md:px-12 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 services-title">
          <h2 className="text-sm md:text-base font-medium text-primary mb-2">
            What I Offer
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold leading-tight">
            Social Media & Digital Marketing Services
          </h3>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Comprehensive, results-driven services that combine social media management with digital marketing strategy to elevate your brand&apos;s online presence and connect with your audience in meaningful ways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 services-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className="service-card bg-background rounded-xl p-6 shadow-md border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="text-primary" size={24} />
                </div>
                <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                <p className="text-foreground/70">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
