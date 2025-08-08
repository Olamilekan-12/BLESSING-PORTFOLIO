'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Palette, Video, PenTool, Search, Eye, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: number;
  title: string;
  type: string;
  image: string;
  description?: string;
  placeholder?: string;
  isVideo?: boolean;
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

const galleryCategories: GalleryCategory[] = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: Palette,
    subtitle: "Creative assets built for conversion and brand storytelling.",
    description: "Instagram carousel designs, promotional banners, logos, campaign mockups, before vs. after designs, and Canva-designed graphics.",
    color: "from-pink-500 to-rose-500",
    items: [
      {
        id: 1,
        title: "Birthday Post Design",
        type: "Social Media Post",
        image: "/images/Graphic Designs-20250803T154244Z-1-001/Graphic Designs/Birthday post.jpg",
        description: "Birthday celebration social media post design"
      },
      {
        id: 2,
        title: "Job Recruitment Flyer",
        type: "Marketing Flyer",
        image: "/images/Graphic Designs-20250803T154244Z-1-001/Graphic Designs/Job Flyer.jpg",
        description: "Professional job recruitment flyer design"
      },
      {
        id: 3,
        title: "New Month Post",
        type: "Social Media Post",
        image: "/images/Graphic Designs-20250803T154244Z-1-001/Graphic Designs/Newmonth Post.jpg",
        description: "New month motivational social media post"
      },
      {
        id: 4,
        title: "Campaign Mockup",
        type: "Poster",
        image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Campaign poster mockup design"
      },
      {
        id: 5,
        title: "Before vs After Design",
        type: "Comparison",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Before and after design comparison"
      },
      {
        id: 6,
        title: "Brand Visual Elements",
        type: "Branding",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Brand visual identity elements"
      }
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: Video,
    subtitle: "Short-form and long-form videos designed for engagement.",
    description: "Edited Instagram Reels & TikToks, brand intro/outro videos, testimonial videos, behind-the-scenes edits, animated story highlights, and split-screen reels.",
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        id: 1,
        title: "Anniversary Video",
        type: "Celebration",
        image: "/Video/Anniversary Video.mp4",
        description: "Anniversary celebration video",
        isVideo: true
      },
      {
        id: 2,
        title: "Beccentials Skincare Launch",
        type: "Product Launch",
        image: "/Video/Beccentials skincare Launch (1).mp4",
        description: "Beccentials skincare product launch video",
        isVideo: true
      },
      {
        id: 3,
        title: "Daily Skincare Routine",
        type: "Tutorial Video",
        image: "/Video/Daily skincare routine_2.mov",
        description: "Skincare routine tutorial video",
        isVideo: true
      },
      {
        id: 4,
        title: "Shea Nature Unboxing",
        type: "Unboxing",
        image: "/Video/Sheasnature unboxing.mov",
        description: "Shea Nature product unboxing experience",
        isVideo: true
      },
      {
        id: 5,
        title: "TFW Ad Creative",
        type: "Advertisement",
        image: "/Video/TFW ad video.mp4",
        description: "TFW brand advertisement video",
        isVideo: true
      },
      {
        id: 6,
        title: "Vision Tea Ad",
        type: "Advertisement",
        image: "/Video/Vision Tea Ad video.mp4",
        description: "Vision Tea brand advertisement video",
        isVideo: true
      }
    ]
  },
  {
    id: "copywriting",
    title: "Copywriting",
    icon: PenTool,
    subtitle: "Compelling copy that converts and engages.",
    description: "Social media captions, email sequences, ad copy, blog posts, product descriptions, and sales page content.",
    color: "from-green-500 to-emerald-500",
    items: [
      {
        id: 1,
        title: "Social Media Captions",
        type: "Social Copy",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Engaging social media captions"
      },
      {
        id: 2,
        title: "Email Marketing Sequences",
        type: "Email Copy",
        image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Email marketing sequences"
      },
      {
        id: 3,
        title: "Ad Copy Variations",
        type: "Advertisement",
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Advertisement copy variations"
      },
      {
        id: 4,
        title: "Blog Content",
        type: "Blog Post",
        image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Blog content writing"
      },
      {
        id: 5,
        title: "Product Descriptions",
        type: "E-commerce",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Product descriptions"
      },
      {
        id: 6,
        title: "Sales Page Copy",
        type: "Sales",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Sales page copy"
      }
    ]
  },
  {
    id: "research-organization",
    title: "Research & Organization",
    icon: Search,
    subtitle: "Data-driven insights and strategic planning.",
    description: "Market research, competitor analysis, content calendars, strategy documents, performance reports, and workflow optimization.",
    color: "from-purple-500 to-indigo-500",
    items: [
      {
        id: 1,
        title: "Market Research Reports",
        type: "Research",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Market research reports"
      },
      {
        id: 2,
        title: "Competitor Analysis",
        type: "Analysis",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Competitor analysis"
      },
      {
        id: 3,
        title: "Content Calendars",
        type: "Planning",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Content calendars"
      },
      {
        id: 4,
        title: "Strategy Documents",
        type: "Strategy",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Strategy documents"
      },
      {
        id: 5,
        title: "Performance Reports",
        type: "Analytics",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Performance reports"
      },
      {
        id: 6,
        title: "Workflow Optimization",
        type: "Process",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Workflow optimization"
      }
    ]
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("graphic-design");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const activeData = galleryCategories.find(cat => cat.id === activeCategory);

  useEffect(() => {
    // Gallery section animations
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection) {
      gsap.fromTo(
        '.gallery-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: gallerySection,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        '.gallery-tabs',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: gallerySection,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        '.gallery-grid .gallery-item',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [activeCategory]);

  const openLightbox = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="gallery" className="py-20 bg-background gallery-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 gallery-header">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Creative Gallery
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Explore my diverse portfolio showcasing expertise across graphic design, video editing, 
            copywriting, and strategic research. Each piece represents a commitment to quality, 
            creativity, and results-driven solutions.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 gallery-tabs">
          {galleryCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                    : 'bg-accent/10 text-foreground/70 hover:bg-accent/20 hover:text-foreground'
                }`}
              >
                <IconComponent size={20} />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Category Description */}
        {activeData && (
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r ${activeData.color} bg-clip-text text-transparent`}>
              {activeData.title}
            </h3>
            <p className="text-foreground/70 mb-2 text-lg font-medium">
              {activeData.subtitle}
            </p>
            <p className="text-foreground/60 leading-relaxed">
              {activeData.description}
            </p>
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
                  {item.isVideo ? (
                    <video
                      src={item.image}
                      alt={item.description || item.placeholder}
                      className="object-cover w-full h-full"
                      muted
                    />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.description || item.placeholder}
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

                  {/* Video Indicator */}
                  {item.isVideo && (
                    <div className="absolute top-3 right-3">
                      <Video className="text-white" size={20} />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-foreground/60">
                    {item.description || item.placeholder}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-background border-b border-border/20 p-4 flex justify-between items-center">
                <h3 className="text-xl font-bold text-foreground">{selectedItem.title}</h3>
                <button
                  onClick={closeLightbox}
                  className="p-2 hover:bg-accent/20 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                  {selectedItem.isVideo ? (
                    <video
                      src={selectedItem.image}
                      alt={selectedItem.description || selectedItem.placeholder}
                      className="object-cover w-full h-full"
                      controls
                    />
                  ) : (
                    <Image
                      src={selectedItem.image}
                      alt={selectedItem.description || selectedItem.placeholder}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="bg-accent/10 rounded-lg p-4">
                  <p className="text-foreground/80">{selectedItem.description || selectedItem.placeholder}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                      {selectedItem.type}
                    </span>
                    {selectedItem.isVideo && (
                      <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                        <Video size={12} />
                        Video
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
