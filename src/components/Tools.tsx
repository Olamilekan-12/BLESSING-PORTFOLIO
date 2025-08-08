"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Mail,
    MessageSquare,
    Video,
    Zap
} from "lucide-react";
import { useRef } from "react";
import {
    SiAdobepremierepro,
    SiAsana,
    SiCanva,
    SiHootsuite,
    SiHubspot,
    SiMeta,
    SiOpenai,
    SiWordpress
} from "react-icons/si";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const tools = [
  {
    name: "WordPress",
    icon: SiWordpress,
    category: "CMS",
    color: "#21759B"
  },
  {
    name: "Meta Business Suite",
    icon: SiMeta,
    category: "Social Media",
    color: "#1877F2"
  },
  {
    name: "HubSpot",
    icon: SiHubspot,
    category: "CRM",
    color: "#FF7A59"
  },
  {
    name: "Hootsuite",
    icon: SiHootsuite,
    category: "Social Media",
    color: "#000000"
  },
  {
    name: "ChatGPT",
    icon: SiOpenai,
    category: "AI",
    color: "#10A37F"
  },
  {
    name: "Adobe Premiere Pro",
    icon: SiAdobepremierepro,
    category: "Video Editing",
    color: "#9999FF"
  },
  {
    name: "Notion",
    icon: Zap,
    category: "Organization",
    color: "#6366F1"
  },
  {
    name: "ManyChat",
    icon: MessageSquare,
    category: "Chatbot",
    color: "#00D2FF"
  },
  {
    name: "Asana",
    icon: SiAsana,
    category: "Project Management",
    color: "#F06A6A"
  },
  {
    name: "Canva",
    icon: SiCanva,
    category: "Design",
    color: "#00C4CC"
  },
  {
    name: "CapCut",
    icon: Video,
    category: "Video Editing",
    color: "#000000"
  },
  {
    name: "MailerLite",
    icon: Mail,
    category: "Email Marketing",
    color: "#09C269"
  }
];

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".tools-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".tools-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate tools grid
    gsap.fromTo(
      ".tool-card",
      { 
        y: 30, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tools-grid",
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section 
      id="tools"
      ref={sectionRef} 
      className="py-20 bg-background/50"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tools-title">
            Tools I Work With
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto tools-title">
            Leveraging the best tools and technologies to deliver exceptional results for your social media presence
          </p>
        </div>
        
        <div className="tools-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.name}
                className="tool-card group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card/80 hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div 
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${tool.color}15` }}
                  >
                    <Icon 
                      size={32} 
                      style={{ color: tool.color }}
                      className="transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-foreground/60">
                      {tool.category}
                    </p>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-foreground/60 text-sm">
            And many more tools to ensure your project&apos;s success
          </p>
        </div>
      </div>
    </section>
  );
}
