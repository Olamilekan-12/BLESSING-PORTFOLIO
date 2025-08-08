"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ExternalLink, 
  X, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  TrendingUp,
  Target,
  Palette,
  MessageSquare,
  Globe,
  Smartphone,
  Eye,
  MousePointer,
  ShoppingBag,
  LayoutGrid,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Portfolio projects data
const projects = [
  {
    id: 1,
    title: "Friska Life",
    category: "Full-Service Digital Marketing",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    icon: Globe,
    overview: "Friska Life is a Nigerian wellness brand known for its herbal teas and natural health products. As their digital marketing lead, I managed all aspects of their online presence, from social media to ad campaigns and e-commerce optimisation, with a strong focus on brand awareness, community growth, and conversions.",
    whatIDid: [
      "Managed and scheduled daily content across Instagram & Facebook",
      "Designed branded visuals and edited videos using Canva and CapCut",
      "Created and ran Facebook/Instagram ad campaigns targeting health-conscious users",
      "Built a high-converting sales funnel for Wellness Box and Arabian Tea",
      "Handled daily community engagement (DMs, comments, WhatsApp orders)",
      "Optimised e-commerce landing pages to increase conversion",
      "Tracked campaign performance and made real-time adjustments for better ROI"
    ],
    results: [
      "49,000+ ad reach in one campaign",
      "5.4% CTR on Wellness Box (industry average is 0.9–1.5%)",
      "32% increase in conversion rate",
      "70% boost in organic post engagement in one quarter",
      "More consistent community interaction and order inquiries"
    ],
    tools: "Meta Business Suite, Canva, CapCut, WhatsApp Business, Notion, WordPress",
    visuals: "Carousel mockups, Reel screenshots, Meta Ads Manager screenshot, WhatsApp automation flow, Analytics dashboard, Landing page mockup",
    socialLinks: [
      {
        platform: "Website",
        url: "https://friskatea.com/",
        icon: "globe"
      },
      {
        platform: "Facebook",
        url: "https://web.facebook.com/friskalifenigeria/",
        icon: "facebook"
      },
      {
        platform: "Instagram",
        url: "https://www.instagram.com/friskalife?igshid=YmMyMTA2M2Y=",
        icon: "instagram"
      }
    ]
  },
  {
    id: 2,
    title: "Rebrand Daily",
    category: "Social Media & Digital Content",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    icon: Palette,
    overview: "Rebrand Daily is a digital marketing agency brand I developed from the ground up. I created and managed its social media presence across Instagram, TikTok, LinkedIn, and YouTube, positioning it as a forward-thinking digital solution for businesses in Nigeria and beyond.",
    whatIDid: [
      "Designed and launched the Rebrand Daily Instagram page to showcase our creative capabilities",
      "Created multi-platform content calendars (Instagram, TikTok, LinkedIn, YouTube)",
      "Produced engaging graphics, carousels, and short-form videos using Canva, CapCut, InShot, and Adobe Premiere Pro",
      "Grew audience engagement by leveraging storytelling, viral trends, and audio formats",
      "Scheduled and optimized content via Buffer, Meta Business Suite, and Hootsuite",
      "Contributed to brand messaging, audience targeting, and reporting for internal clients"
    ],
    results: [
      "80% increase in engagement within 6 weeks",
      "Increased reach on Reels and TikToks by over 150% using trend-based video editing",
      "Achieved consistent content publishing across 4 platforms",
      "Developed a replicable content system used in client campaigns"
    ],
    tools: "Canva, CapCut, Premiere Pro, InShot, Hootsuite, Buffer, Meta Business Suite",
    visuals: "Instagram page screenshots, Carousel content samples, Reel/TikTok video clips, Content calendar screenshots, Platform engagement analytics",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/rebranddaily?igsh=dWNma3NzdzBkeXk%3D&utm_source=qr",
        icon: "instagram"
      }
    ]
  },
  {
    id: 3,
    title: "PubCity Stationery",
    category: "Social Media Branding",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    icon: Palette,
    overview: "Created a vibrant Instagram identity for a stationery brand targeting students and young professionals shopping for affordable and cute office/school supplies. Built a bright, minimal Instagram identity that appeals to students, stationery lovers, and young professionals.",
    whatIDid: [
      "Created a moodboard and visual identity (pastel tones, playful fonts)",
      "Designed IG post samples featuring products like planners, pens, sticky notes",
      "Wrote value-based captions with CTAs for shopping or DMs",
      "Developed content categories: Product Spotlights, Study Tips, Desk Goals, Relatable Reels"
    ],
    results: [
      "Designed a scroll-stopping Instagram aesthetic",
      "Gave the brand a visual language that speaks to fun and productivity"
    ],
    tools: "Canva",
    visuals: "IG feed mockup (soft pastel theme), Product carousel samples, Caption examples with emojis and CTAs, Story highlight covers",
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://www.instagram.com/pubcity_stationery?igsh=MTcycDk1czJ3ODRxcQ==",
        icon: "instagram"
      }
    ]
  },
  {
    id: 4,
    title: "Meta Ad Campaigns + Funnels",
    category: "4 Organic Brands",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    icon: Target,
    overview: "I executed four result-driven Meta ad campaigns for brands in the wellness and organic space: Sorghud, Greenbaskit, Aneeyah's Peanut Butter, and Shea Nature. Each campaign was tailored with unique funnel strategies to increase visibility, inquiries, and direct sales across Instagram and Facebook.",
    whatIDid: [
      "Sorghud: Created Meta image + video ads promoting their gluten-free cereal alternatives, targeted Nigerian moms and fitness-conscious users",
      "Greenbaskit: Ran Meta carousel and story ads for fresh produce delivery, highlighted weekly bundle deals with urgency-based copy",
      "Aneeyah's Peanut Butter: Developed high-converting Meta story ads using UGC + testimonials, implemented 3-step funnel for customer acquisition",
      "Shea Nature: Focused on pain-point-driven skincare ads, crafted video ads showcasing before-and-after results"
    ],
    results: [
      "3,000+ combined link clicks across campaigns",
      "45% increase in WhatsApp orders within the first month",
      "4 high-converting Meta ad sets (carousel, story, video)",
      "Optimized funnels for maximum conversion at each stage"
    ],
    tools: "Meta Ads Manager, Canva, CapCut, WhatsApp",
    visuals: "Ad previews (Story, Carousel, Feed), Campaign performance dashboards, Ad creative samples, Audience targeting setups",
    driveLink: "https://drive.google.com/drive/folders/12K9JcIdSYixpGyp4lIzKDVr9IlNLqdGg?usp=drive_link"
  },
  {
    id: 5,
    title: "High-Converting Landing Pages",
    category: "Web Design & Development",
    image: "/images/landing-pages/sheanature-combo.jpg",
    icon: LayoutGrid,
    overview: "A collection of high-converting WordPress landing pages I've designed and developed for various clients. Each page is built with WordPress, focusing on user experience, performance, and conversion optimization.",
    items: [
      {
        title: "SheaNature Combo",
        description: "E-commerce landing page for SheaNature's product combo, designed to maximize conversions and provide an excellent mobile shopping experience.",
        image: "/images/landing-pages/sheanature-combo.jpg",
        liveUrl: "https://www.sheasnature.com/sheanature-combo",
        features: [
          "Responsive WordPress landing page optimized for conversions",
          "Customized theme and plugins for seamless user experience",
          "Product showcase with high-quality visuals and clear CTAs",
          "Mobile-responsive design for all device types"
        ]
      },
      {
        title: "Sorghud Peanut Reseller",
        description: "Lead generation landing page for Sorghud's peanut reseller program, designed to generate quality leads at a low cost per acquisition.",
        image: "/images/sorghud-landing-page.jpg",
        liveUrl: "https://sorghud.xyz/peanut-reseller/",
        features: [
          "Lead generation focused landing page in WordPress",
          "Clear value propositions and social proof elements",
          "Optimized forms and CTAs for maximum conversion",
          "Email marketing integration for lead capture"
        ]
      }
    ],
    whatIDid: [
      "Designed and developed high-converting WordPress landing pages",
      "Implemented responsive designs that work across all devices",
      "Optimized user experience and conversion funnels in WordPress",
      "Ensured fast loading times and SEO best practices"
    ],
    results: [
      "Improved conversion rates with strategic layouts and clear CTAs",
      "Enhanced mobile experience leading to increased engagement",
      "Generated quality leads at a low cost per acquisition"
    ],
    tools: "WordPress, Elementor, WooCommerce",
    liveUrl: "#"
  }
];

// Filter categories
const categories = ["All", "Full-Service Digital Marketing", "Social Media & Digital Content", "Social Media Branding", "4 Organic Brands", "E-commerce Landing Page"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Group landing page projects together
  const groupedProjects = [...projects].map(project => ({
    ...project,
    // For sorting: landing pages should be grouped together at the end
    sortKey: project.category.includes('Landing Page') ? `1-${project.id}` : `0-${project.id}`
  }));

  // Filter projects by category for the tabs
  const filteredProjects = groupedProjects
    .filter(project => {
      if (activeCategory === 'All') return true;
      return project.category.toLowerCase().includes(activeCategory.toLowerCase());
    })
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey));  
  // Simple category change without animations
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
  };
  
  const closeModal = () => {
    setSelectedProject(null);
  };
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".portfolio-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".portfolio-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate portfolio cards
    gsap.fromTo(
      ".portfolio-card",
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
          trigger: ".portfolio-grid",
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
            A selection of my recent digital marketing projects and campaigns that showcase my expertise and approach.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 filter-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background hover:bg-background/80 text-foreground/70'
              }`}
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
                className="portfolio-card group relative bg-background rounded-xl overflow-hidden shadow-md border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                onClick={() => openModal(project)}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={project.image || '/images/landing-page-showcase.svg'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // If the image fails to load, replace with landing page showcase
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = '/images/landing-page-showcase.svg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Target size={16} />
                          <span className="text-sm">Strategy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 size={16} />
                          <span className="text-sm">Results</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone size={16} />
                          <span className="text-sm">Tools</span>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                      >
                        View Details
                        <Eye className="ml-2 h-4 w-4" />
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
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold">{project.title}</h4>
                  <p className="text-sm text-foreground/70 mt-2 line-clamp-2">
                    {project.overview.substring(0, 100)}...
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border/50 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <selectedProject.icon className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <p className="text-primary font-medium">{selectedProject.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selectedProject.socialLinks?.map((social) => (
                  <Button
                    key={social.platform}
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(social.url, '_blank', 'noopener,noreferrer');
                    }}
                    title={social.platform}
                    aria-label={social.platform}
                  >
                    {social.icon === 'facebook' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                      </svg>
                    ) : social.icon === 'globe' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    )}
                  </Button>
                ))}
                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(selectedProject.liveUrl, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <ExternalLink size={16} />
                    View {selectedProject.category.includes('Landing Page') ? 'Landing Page' : 'Project'}
                  </Button>
                )}
                {selectedProject.driveLink && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(selectedProject.driveLink, '_blank', 'noopener,noreferrer');
                    }}
                  >
                    <Layers size={16} />
                    View Files
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={closeModal}>
                  <X size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Overview */}
              <div>
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Globe size={20} className="text-primary" />
                  Overview
                </h4>
                <p className="text-foreground/80 leading-relaxed">{selectedProject.overview}</p>
              </div>
              
              {/* What I Did */}
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target size={20} className="text-primary" />
                  What I Did
                </h4>
                <ul className="space-y-3">
                  {selectedProject.whatIDid.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Results */}
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 size={20} className="text-primary" />
                  Results
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.results.map((result, index) => (
                    <div key={index} className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-green-500" size={16} />
                        <span className="font-medium text-foreground">{result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tools */}
              <div>
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Smartphone size={20} className="text-primary" />
                  Tools Used
                </h4>
                <p className="text-foreground/80 bg-secondary/30 rounded-lg p-4">{selectedProject.tools}</p>
              </div>
              
              {/* Visuals */}
              <div>
                <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Eye size={20} className="text-primary" />
                  Visuals & Deliverables
                </h4>
                <p className="text-foreground/80 bg-accent/10 rounded-lg p-4 mb-6">{selectedProject.visuals}</p>
                
                {/* Landing Page Items */}
                {'items' in selectedProject && selectedProject.items && (
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <LayoutGrid size={20} className="text-primary" />
                      Featured Landing Pages
                    </h4>
                    <div className="grid gap-6 md:grid-cols-2">
                      {selectedProject.items.map((item, i: number) => (
                        <div key={i} className="border rounded-lg overflow-hidden bg-card">
                          <div className="relative h-64 w-full">
                            <Image 
                              src={item.image} 
                              alt={item.title}
                              fill
                              className="object-contain bg-white p-2"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                              onError={(e) => {
                                // If the image fails to load, use a fallback
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = '/images/landing-page-showcase.svg';
                              }}
                            />
                          </div>
                          <div className="p-4 space-y-3">
                            <div className="flex justify-between items-start">
                              <h5 className="font-semibold">{item.title}</h5>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(item.liveUrl, '_blank', 'noopener,noreferrer');
                                }}
                              >
                                <ExternalLink size={14} />
                                View
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            <ul className="space-y-1 text-sm">
                              {item.features.map((feature: string, j: number) => (
                                <li key={j} className="flex items-start gap-2">
                                  <span className="text-primary mt-1 text-xs">•</span>
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
