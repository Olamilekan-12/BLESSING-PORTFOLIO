"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: "Fashion Brand Campaign",
    category: "Social Media Strategy",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    platform: "Instagram",
    icon: Instagram,
    description: "Developed and executed a comprehensive social media strategy for a fashion brand's seasonal campaign, resulting in a 45% increase in engagement.",
  },
  {
    id: 2,
    title: "Restaurant Rebranding",
    category: "Content Creation",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    platform: "Facebook",
    icon: Facebook,
    description: "Created a new visual identity and content strategy for a restaurant chain's social media presence, boosting followers by 30%.",
  },
  {
    id: 3,
    title: "Tech Startup Launch",
    category: "Campaign Management",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    platform: "Twitter",
    icon: Twitter,
    description: "Managed the social media launch campaign for a tech startup, achieving 10,000+ followers within the first month.",
  },
  {
    id: 4,
    title: "Influencer Partnership",
    category: "Influencer Marketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    platform: "Instagram",
    icon: Instagram,
    description: "Coordinated partnerships with key industry influencers to promote a beauty brand, generating over 500,000 impressions.",
  },
  {
    id: 5,
    title: "E-commerce Growth",
    category: "Social Media Strategy",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    platform: "Facebook",
    icon: Facebook,
    description: "Developed a targeted social media strategy for an e-commerce brand, increasing traffic by 65% and sales by 40%.",
  },
  {
    id: 6,
    title: "Nonprofit Awareness",
    category: "Campaign Management",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    platform: "Twitter",
    icon: Twitter,
    description: "Created and managed a viral awareness campaign for a nonprofit organization, raising $100,000 in donations.",
  },
];

// Filter categories
const categories = ["All", "Social Media Strategy", "Content Creation", "Campaign Management", "Influencer Marketing", "Content Strategy", "Community Management"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);
    
  // Simple category change without animations
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  useGSAP(() => {
    // Very simple fade-in animation for the section
    gsap.from(".portfolio-title", {
      opacity: 0,
      y: 20,
      duration: 0.5
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="py-20 px-6 md:px-12 relative overflow-hidden bg-secondary/10"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-12 portfolio-title">
          <h2 className="text-sm md:text-base font-medium text-primary mb-2">
            My Work
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold leading-[1.2]">
            Featured Projects
          </h3>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            A selection of my recent social media projects and campaigns that showcase my expertise and approach.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 filter-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-background/80 text-foreground/70'}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 portfolio-grid">
          {filteredProjects.map((project) => {
            const Icon = project.icon;
            return (
              <div 
                key={project.id} 
                className="portfolio-item group relative bg-background rounded-xl overflow-hidden shadow-md border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.03]"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm mb-2">{project.description}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                      >
                        View Details
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                      {project.category}
                    </span>
                    <div className="flex items-center text-foreground/60">
                      <Icon size={14} className="mr-1" />
                      <span className="text-xs">{project.platform}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* View more button */}
        <div className="mt-12 text-center">
          <Button size="lg" variant="outline" className="group">
            View All Projects
            <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}
