"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Palette, 
  Video, 
  PenTool, 
  FileText,
  Play,
  Eye,
  Calendar,
  BarChart3,
  Users,
  Target,
  X,
  ChevronLeft,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// TypeScript interfaces
interface GalleryItem {
  id: number;
  title: string;
  type: string;
  image: string;
  description?: string;
  placeholder?: string;
  isVideo?: boolean;
  details?: any; // For copywriting modal content
}

interface GalleryCategory {
  id: string;
  title: string;
  icon: any;
  subtitle: string;
  description: string;
  color: string;
  items: GalleryItem[];
}

const galleryCategories = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: Palette,
    subtitle: "Creative assets built for conversion and brand storytelling.",
    description: "Instagram carousel designs, promotional banners, logos, and strategic visual content that drives engagement and brand recognition.",
    color: "from-pink-500 to-rose-500",
    items: [
      {
        id: 1,
        title: "Birthday Post Design",
        type: "Social Media Post",
        image: "/images/Graphic Designs-20250803T154244Z-1-001/Graphic Designs/Birthday post.jpg",
        placeholder: "Birthday celebration social media post design"
      },
      {
        id: 2,
        title: "Job Recruitment Flyer",
        type: "Marketing Flyer",
        image: "/images/Graphic Designs-20250803T154244Z-1-001/Graphic Designs/Job Flyer.jpg",
        placeholder: "Professional job recruitment flyer design"
      },
      {
        id: 3,
        title: "New Month Post",
        type: "Social Media Post",
        image: "/images/Graphic Designs-20250803T154244Z-1-001/Graphic Designs/Newmonth Post.jpg",
        placeholder: "New month motivational social media post"
      }
    ],
    hasMoreContent: true,
    moreContentTitle: "More Design Work",
    moreContentButton: "View More Designs",
    moreContentLink: "https://drive.google.com/drive/folders/1nvbuCpGSOTIpFkNWHcSmoo1imDUjFwmx?usp=drive_link"
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: Video,
    subtitle: "Short-form and long-form videos designed for engagement.",
    description: "Professional video content including brand celebrations, product launches, and promotional advertisements optimized for social media platforms.",
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        id: 1,
        title: "Anniversary Video",
        type: "Celebration",
        youtubeId: "NECvYbi7McI",
        description: "Anniversary celebration video showcasing brand milestones and achievements",
        isYouTube: true
      },
      {
        id: 2,
        title: "Skincare Launch",
        type: "YouTube Shorts",
        youtubeId: "qwxwGvh4pSU",
        description: "Skincare product launch presented in engaging short-form content",
        isYouTube: true,
        isShorts: true
      },
      {
        id: 3,
        title: "Vision Tea Ad",
        type: "YouTube Shorts",
        youtubeId: "JJMQ2ajBBOo",
        description: "Vision Tea brand advertisement optimized for short-form engagement",
        isYouTube: true,
        isShorts: true
      }
    ],
    hasMoreContent: true,
    moreContentTitle: "More Video Projects",
    moreContentButton: "View More Videos",
    moreContentLink: "https://drive.google.com/drive/folders/1BdH1oPWFD3P3p0HKuxR885jHp1Ok4qUx?usp=drive_link"
  },
  {
    id: "copywriting",
    title: "Copywriting",
    icon: PenTool,
    subtitle: "High-converting copy across platforms and formats.",
    description: "Strategic copywriting that drives engagement and conversions across digital platforms and marketing campaigns.",
    color: "from-green-500 to-emerald-500",
    items: [
      {
        id: 1,
        title: "Ad Captions That Converted",
        type: "Ad Copy",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "High-performing ad captions with proven conversion metrics.",
        link: "https://drive.google.com/drive/folders/1bgBRwVkJvV38OyX5MeY2GRyZgLTGbvV-?usp=drive_link",
        buttonText: "📊 View Ad Copy",
        details: {
          caption: "Your skin doesn't need filters. It needs this.",
          results: {
            ctr: "4.8%",
            performance: "2x above industry average",
            roi: "150% increase"
          },
          strategy: "Targeted millennials tired of heavy makeup routines. The direct, confident tone resonated with the audience's desire for authenticity over perfection.",
          layout: "Two-column format with ad mockup on left, caption and performance metrics on right. Clean, professional presentation optimized for client review."
        }
      },
      {
        id: 2,
        title: "Blog Post",
        type: "Blog Content",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engaging blog content that drives traffic and builds brand authority through strategic storytelling and SEO optimization.",
        link: "https://drive.google.com/drive/folders/1M94apiv6HUSIF_hsp0snuHMQlFEg89V6?usp=drive_link",
        buttonText: "📝 View Blog"
      },
      {
        id: 3,
        title: "LinkedIn Post",
        type: "Professional Content",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Professional LinkedIn content that builds thought leadership and drives meaningful business connections.",
        link: "https://www.linkedin.com/feed/update/urn:li:activity:7325849244458749953/",
        buttonText: "💼 View LinkedIn Post"
      }
    ],
    hasMoreContent: true,
    moreContentTitle: "More Copywriting Work",
    moreContentButton: "View More Copywriting",
    moreContentLink: "https://drive.google.com/drive/folders/1YgZx95BOMCqC-Jq4ugCDx4EzcboMHfRx?usp=drive_link"
  },
  {
    id: "research-organization",
    title: "Research & Organization",
    icon: FileText,
    subtitle: "Behind-the-scenes genius. Strategic insight meets execution.",
    description: "The strategic foundation that transforms creative ideas into data-driven campaigns with measurable results.",
    color: "from-purple-500 to-indigo-500",
    items: [
      {
        id: 1,
        title: "Content Calendar",
        type: "Strategic Planning",
        icon: "📅",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A structured schedule for what to post, where, and when, tailored for Instagram, TikTok, and YouTube. Includes ideal posting times and a tracker for drafts, approvals, and live posts, all aligned with campaign goals.",
        link: "https://docs.google.com/spreadsheets/d/1K8qVXclM4qLxKMxTGG31jzMrYUEBBZ0ZMOB6N1R77lE/edit?usp=sharing",
        buttonText: "📊 View Content Calendar"
      },
      {
        id: 2,
        title: "Monthly Marketing Report",
        type: "Performance Analytics",
        icon: "📈",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A data-driven summary of social, email, and ad performance. Covers key metrics, platform insights, and ad breakdowns, including spend, audience response, and ROI, to guide next-month strategy and client decisions.",
        link: "https://drive.google.com/drive/folders/1qzlT8tCVSu-FSg8ulqRwLyayXa_Ab13e?usp=sharing",
        buttonText: "📋 View Monthly Marketing Report"
      },
      {
        id: 3,
        title: "Ad Dashboard",
        type: "Campaign Intelligence",
        icon: "🎯",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A focused view of Meta ad performance. Tracks spend, impressions, clicks, CTR, and conversions, organised to highlight key insights, guide optimisations, and maximise ROI.",
        link: "https://drive.google.com/drive/folders/12K9JcIdSYixpGyp4lIzKDVr9IlNLqdGg?usp=drive_link",
        buttonText: "📊 View Ad Dashboard"
      }
    ],
    hasMoreContent: true,
    moreContentTitle: "More Research & Organization Work",
    moreContentButton: "View More Research & Organization",
    moreContentLink: "https://drive.google.com/drive/folders/14_GwIE1EHoU0U7RBmkzoN39MZ5RoRiJ9?usp=drive_link"
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("graphic-design");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  const activeData = galleryCategories.find(cat => cat.id === activeCategory);
  
  const openLightbox = (item: any) => {
    setSelectedItem(item);
  };
  
  const closeLightbox = () => {
    setSelectedItem(null);
  };
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".gallery-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".gallery-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate category tabs
    gsap.fromTo(
      ".category-tab",
      { 
        y: 30, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".category-tabs",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate gallery items
    gsap.fromTo(
      ".gallery-item",
      { 
        y: 50, 
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
          trigger: ".gallery-grid",
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
      id="gallery" 
      className="py-20 px-6 md:px-12 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 gallery-title">
          <h2 className="text-sm md:text-base font-medium text-primary mb-2">
            Gallery
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
            Visual Showcase of Core Skills
          </h3>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A curated collection of my digital marketing work across graphic design, video editing, copywriting, and strategic planning.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 category-tabs">
          {galleryCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-tab flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg` 
                    : 'bg-background hover:bg-background/80 text-foreground/70 border border-border/50'
                }`}
              >
                <Icon size={20} />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Info */}
        {activeData && (
          <div className="text-center mb-12">
            <h4 className="text-2xl font-bold mb-3">{activeData.title}</h4>
            <p className="text-lg text-primary font-medium mb-4">{activeData.subtitle}</p>
            <p className="text-foreground/70 max-w-3xl mx-auto">{activeData.description}</p>
          </div>
        )}

        {/* Gallery Grid */}
        {activeData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gallery-grid">
            {activeData.items.map((item) => (
              <div 
                key={item.id}
                className="gallery-item group relative bg-background rounded-xl overflow-hidden shadow-md border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative aspect-square overflow-hidden">
                  {(item as any).isYouTube ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={`https://img.youtube.com/vi/${(item as any).youtubeId}/hqdefault.jpg`}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          // Fallback to medium quality thumbnail if high quality fails
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('hqdefault')) {
                            target.src = `https://img.youtube.com/vi/${(item as any).youtubeId}/mqdefault.jpg`;
                          } else if (target.src.includes('mqdefault')) {
                            target.src = `https://img.youtube.com/vi/${(item as any).youtubeId}/default.jpg`;
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                  ) : (item as any).isVideo ? (
                    <video
                      src={(item as any).image}
                      className="object-cover w-full h-full"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <Image
                      src={(item as any).image}
                      alt={(item as any).description || (item as any).placeholder || item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Eye className="mx-auto mb-2" size={24} />
                      <p className="text-sm font-medium">View Details</p>
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      {item.type}
                    </span>
                  </div>
                  
                  {/* Video Play Icon for Video Category */}
                  {activeCategory === 'video-editing' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="text-white ml-1" size={24} />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h5 className="font-semibold mb-1">{item.title}</h5>
                  <p className="text-sm text-foreground/60 mb-3">{(item as any).description || (item as any).placeholder || "Creative work"}</p>
                  
                  {/* Interactive Buttons for Research & Organization and Copywriting */}
                  {(activeCategory === 'research-organization' || activeCategory === 'copywriting') && (item as any).link && (
                    <a
                      href={(item as any).link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-medium px-3 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {(item as any).buttonText || "View Resource"}
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* More Content Section */}
        {activeData && (activeData as any).hasMoreContent && (
          <div className="mt-12 pt-8 border-t border-border/20">
            <div className="text-center space-y-6">
              {/* Section Title */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">
                  {(activeData as any).moreContentTitle}
                </h3>
                <p className="text-foreground/60 max-w-2xl mx-auto">
                  Explore additional {activeData.title.toLowerCase()} projects and creative work showcasing strategic thinking and professional execution.
                </p>
              </div>

              {/* Mini Sections */}
              {(activeData as any).miniSections && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {(activeData as any).miniSections.map((section: any) => (
                    <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-border/30 shadow-sm">
                      <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                        {section.title}
                      </h4>
                      <div className="flex justify-center">
                        <a
                          href={section.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 bg-gradient-to-r ${activeData.color} hover:shadow-lg text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md group text-sm`}
                        >
                          {section.buttonText}
                          <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Strategic Action Button */}
              <div className="flex justify-center">
                <a
                  href={(activeData as any).moreContentLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-3 bg-gradient-to-r ${activeData.color} hover:shadow-2xl text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg group`}
                >
                  <span className="text-lg">{(activeData as any).moreContentButton}</span>
                  <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>

              {/* Professional Insight */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-700/50 rounded-xl p-6 max-w-3xl mx-auto border border-border/30">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                    Professional Work
                  </span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Each project represents a strategic approach to {activeData.title.toLowerCase()}, combining creative vision with data-driven insights to deliver measurable results and brand growth.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div>
                <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                <p className="text-primary font-medium">{selectedItem.type}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={closeLightbox}>
                <X size={20} />
              </Button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Copywriting Details */}
              {(selectedItem as any).details ? (
                <div className="space-y-6">
                  {/* Ad Caption Details */}
                  {(selectedItem as any).details.caption && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Target className="text-blue-600" size={20} />
                        High-Converting Caption
                      </h4>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                          "{(selectedItem as any).details.caption}"
                        </p>
                      </div>
                      {(selectedItem as any).details.results && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">{(selectedItem as any).details.results.ctr}</div>
                            <div className="text-sm text-green-700 dark:text-green-400">Click-through Rate</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 text-center">
                            <div className="text-sm font-medium text-purple-700 dark:text-purple-400">{(selectedItem as any).details.results.performance}</div>
                          </div>
                          <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-3 text-center">
                            <div className="text-sm font-medium text-orange-700 dark:text-orange-400">{(selectedItem as any).details.results.roi}</div>
                          </div>
                        </div>
                      )}
                      <p className="text-gray-600 dark:text-gray-400">{(selectedItem as any).details.strategy}</p>
                    </div>
                  )}

                  {/* Social Media Copy Details */}
                  {(selectedItem as any).details.copy && (
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Users className="text-pink-600" size={20} />
                        Social Media Copy
                      </h4>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-gray-900 dark:text-gray-100 mb-2">{(selectedItem as any).details.copy}</p>
                        <div className="text-sm text-gray-600 dark:text-gray-400 italic">
                          Visual: {(selectedItem as any).details.visual}
                        </div>
                      </div>
                      {(selectedItem as any).details.performance && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-blue-600">{(selectedItem as any).details.performance.engagement}</div>
                            <div className="text-sm text-blue-700 dark:text-blue-400">Engagement</div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-green-600">{(selectedItem as any).details.performance.saves}</div>
                            <div className="text-sm text-green-700 dark:text-green-400">Saves</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-purple-600">{(selectedItem as any).details.performance.completion}</div>
                            <div className="text-sm text-purple-700 dark:text-purple-400">Completion</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Blog Content Details */}
                  {(selectedItem as any).details.intro && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <FileText className="text-green-600" size={20} />
                        Blog Content Strategy
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                          <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Hook-Style Intro:</h5>
                          <p className="text-gray-900 dark:text-gray-100">{(selectedItem as any).details.intro}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                          <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">Action-Driven Outro:</h5>
                          <p className="text-gray-900 dark:text-gray-100">{(selectedItem as any).details.outro}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email Marketing Details */}
                  {(selectedItem as any).details.subject && (
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <BarChart3 className="text-yellow-600" size={20} />
                        Email Marketing
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                          <h5 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">Subject Line:</h5>
                          <p className="text-lg font-medium text-gray-900 dark:text-gray-100">{(selectedItem as any).details.subject}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{(selectedItem as any).details.preheader}</p>
                        </div>
                        {(selectedItem as any).details.metrics && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-center">
                              <div className="text-lg font-bold text-blue-600">{(selectedItem as any).details.metrics.openRate}</div>
                              <div className="text-sm text-blue-700 dark:text-blue-400">Open Rate</div>
                            </div>
                            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-center">
                              <div className="text-lg font-bold text-green-600">{(selectedItem as any).details.metrics.clickRate}</div>
                              <div className="text-sm text-green-700 dark:text-green-400">Click Rate</div>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 text-center">
                              <div className="text-lg font-bold text-purple-600">{(selectedItem as any).details.metrics.conversion}</div>
                              <div className="text-sm text-purple-700 dark:text-purple-400">Conversion</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Before/After Examples */}
                  {(selectedItem as any).details.examples && (
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <PenTool className="text-indigo-600" size={20} />
                        Before & After Transformations
                      </h4>
                      <div className="space-y-4">
                        {(selectedItem as any).details.examples.map((example: any, index: number) => (
                          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div className="bg-red-50 dark:bg-red-950/20 rounded p-3">
                                <h6 className="text-sm font-medium text-red-700 dark:text-red-400 mb-1">❌ BEFORE:</h6>
                                <p className="text-gray-900 dark:text-gray-100">{example.before}</p>
                              </div>
                              <div className="bg-green-50 dark:bg-green-950/20 rounded p-3">
                                <h6 className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">✅ AFTER:</h6>
                                <p className="text-gray-900 dark:text-gray-100">{example.after}</p>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">{example.improvement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Caption + Visual Details */}
                  {(selectedItem as any).details.caption && (selectedItem as any).details.visual && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Eye className="text-purple-600" size={20} />
                        Caption + Visual Synergy
                      </h4>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                          "{(selectedItem as any).details.caption}"
                        </p>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p><strong>Visual Concept:</strong> {(selectedItem as any).details.visual.concept}</p>
                          <p><strong>Design Elements:</strong> {(selectedItem as any).details.visual.elements}</p>
                        </div>
                      </div>
                      {(selectedItem as any).details.performance && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-blue-600">{(selectedItem as any).details.performance.engagement}</div>
                            <div className="text-xs text-blue-700 dark:text-blue-400">Engagement</div>
                          </div>
                          <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-green-600">{(selectedItem as any).details.performance.shares}</div>
                            <div className="text-xs text-green-700 dark:text-green-400">Shares</div>
                          </div>
                          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-purple-600">{(selectedItem as any).details.performance.comments}</div>
                            <div className="text-xs text-purple-700 dark:text-purple-400">Comments</div>
                          </div>
                          <div className="bg-pink-50 dark:bg-pink-950/20 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-pink-600">{(selectedItem as any).details.performance.likes}</div>
                            <div className="text-xs text-pink-700 dark:text-pink-400">Likes</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Research & Organization Modal Content */}
                  {activeCategory === 'research-organization' && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-2xl">{(selectedItem as any).icon}</div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                              {selectedItem.title}
                            </h4>
                            <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                              {selectedItem.type}
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                            {(selectedItem as any).description}
                          </p>
                          
                          {/* Strategic Action Button */}
                          <div className="flex justify-center">
                            <a
                              href={(selectedItem as any).link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                              {(selectedItem as any).buttonText}
                              <ExternalLink size={16} />
                            </a>
                          </div>
                        </div>
                        
                        {/* Strategic Insight Badge */}
                        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-4 border-l-4 border-purple-500">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Strategic Intelligence</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Behind every successful campaign lies strategic planning, data-driven insights, and systematic execution.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Regular Gallery Item Display */
                <div>
                  <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                    {(selectedItem as any).isYouTube ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${(selectedItem as any).youtubeId}?autoplay=1&rel=0`}
                        title={selectedItem.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (selectedItem as any).isVideo ? (
                      <video
                        src={(selectedItem as any).image}
                        className="w-full h-full"
                        style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                        controls
                        preload="metadata"
                      />
                    ) : (
                      <Image
                        src={(selectedItem as any).image}
                        alt={(selectedItem as any).description || (selectedItem as any).placeholder || selectedItem.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="bg-accent/10 rounded-lg p-4">
                    <p className="text-foreground/80">
                      {(selectedItem as any).description || (selectedItem as any).placeholder || "Creative work showcasing professional skills and expertise."}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                        {selectedItem.type}
                      </span>
                      {(selectedItem as any).isVideo && (
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Video size={12} />
                          Video Content
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
