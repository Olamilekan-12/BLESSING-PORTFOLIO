"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Search, 
  Target, 
  PenTool, 
  Megaphone, 
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Users,
  TrendingUp,
  Globe,
  Eye,
  MessageCircle
} from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const strategySteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Audit",
    subtitle: "I begin by diving deep into your current digital presence.",
    description: "What's working? What's not? Who's engaging? Why are they converting (or not)?",
    deliverables: [
      "Social Media Audit",
      "Website Traffic Analysis", 
      "Audience Profiling",
      "Competitor Benchmarking"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  {
    number: "02",
    icon: Target,
    title: "Goal Mapping & Funnel Design",
    subtitle: "Whether your goal is brand awareness, community building, lead generation, or sales, I create a clear customer journey that maps content to business goals.",
    description: "",
    deliverables: [
      "Campaign Objectives & KPIs",
      "Funnel Blueprint (Awareness → Consideration → Conversion → Loyalty)",
      "Offer Positioning & Messaging Themes"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    number: "03",
    icon: PenTool,
    title: "Content Strategy",
    subtitle: "Content that's beautiful and intentional. Every post has a purpose, to educate, convert, or connect.",
    description: "",
    deliverables: [
      "Monthly/Weekly Content Calendars",
      "Platform-Specific Formats (Instagram, TikTok, LinkedIn, YouTube)",
      "Brand Voice & Storytelling Framework",
      "Engagement Triggers (CTAs, polls, trends, UGC)"
    ],
    color: "from-green-500 to-emerald-500"
  },
  {
    number: "04",
    icon: Megaphone,
    title: "Ad Strategy & Targeting",
    subtitle: "I don't just \"boost\" posts. I build strategic ad campaigns that move the needle.",
    description: "From awareness ads to conversion funnels, your campaigns will have the right target, format, budget, and offer.",
    deliverables: [
      "Ad Creative Briefs (videos, carousels, copy)",
      "Custom Audiences & Retargeting Segments",
      "Budget Allocation Plans",
      "A/B Testing Frameworks"
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Analytics & Optimization",
    subtitle: "Growth is measured and managed. I constantly track your KPIs and tweak the strategy for better results.",
    description: "",
    deliverables: [
      "Weekly/Monthly Analytics Dashboards",
      "Content & Campaign Performance Reports",
      "Insights → Action Recommendations",
      "ROI & Conversion Benchmarks"
    ],
    color: "from-indigo-500 to-purple-500"
  }
];

export default function Strategy() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".strategy-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".strategy-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate intro text
    gsap.fromTo(
      ".strategy-intro",
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: ".strategy-intro",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate strategy cards
    gsap.fromTo(
      ".strategy-card",
      { 
        y: 60, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".strategy-grid",
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
      id="strategy" 
      className="py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 strategy-title">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Strategy That Delivers Results
          </h2>
          <p className="text-xl md:text-2xl text-primary font-medium mb-4">
            Not just content. Not just ads. A full-circle strategy that works.
          </p>
        </div>

        {/* Intro Text */}
        <div className="strategy-intro max-w-4xl mx-auto text-center mb-16">
          <p className="text-lg text-foreground/80 leading-relaxed">
            Before I design content, launch campaigns, or post on social media, I build a strategy rooted in data, brand goals, and audience psychology.
          </p>
          <p className="text-lg font-semibold mt-6 text-foreground">
            Here's how I approach every project:
          </p>
        </div>

        {/* Strategy Steps */}
        <div className="strategy-grid space-y-12">
          {strategySteps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div 
                key={index}
                className={`strategy-card grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {step.number}
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} bg-opacity-10 flex items-center justify-center`}>
                      <Icon className={`text-2xl bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} size={24} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-foreground/80 mb-4 leading-relaxed">
                    {step.subtitle}
                  </p>
                  
                  {step.description && (
                    <p className="text-foreground/70 mb-6">
                      {step.description}
                    </p>
                  )}
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`}></span>
                      {index === 1 ? "Strategy Outputs:" : index === 2 ? "I create:" : index === 3 ? "What I include:" : index === 4 ? "Reports include:" : "Deliverables may include:"}
                    </h4>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliverable, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-foreground/80">
                          <CheckCircle2 className={`text-green-500 mt-1 flex-shrink-0`} size={16} />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual Element */}
                <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'} relative`}>
                  <div className={`relative w-full aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br ${step.color} p-8 shadow-2xl`}>
                    <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm"></div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
                      <Icon size={80} className="mb-6 opacity-80" />
                      <div className="text-6xl font-bold opacity-20 absolute top-4 right-6">
                        {step.number}
                      </div>
                      <h4 className="text-xl font-bold text-center">
                        {step.title}
                      </h4>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm"></div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm"></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 strategy-cta">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Build Your Strategy?
            </h3>
            <p className="text-foreground/80 mb-6 max-w-2xl mx-auto">
              Let's create a data-driven strategy that turns your social media presence into a powerful business asset.
            </p>
            <button 
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              onClick={() => {
                const section = document.getElementById('contact');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start Your Strategy
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
