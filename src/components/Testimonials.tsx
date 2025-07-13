"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Fashion Boutique Owner",
    company: "Style Elegance",
    image: "/images/me.jpg", // Using placeholder image
    content: "Blessing transformed our brand's visual identity with her graphic design skills. Our social media presence has never looked more professional and cohesive. Her eye for design and understanding of our brand voice resulted in visuals that truly represent who we are.",
    rating: 5,
    service: "Graphic Design"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Tech Startup Founder",
    company: "InnovateTech",
    image: "/images/me.jpg", // Using placeholder image
    content: "The video content Blessing created for our product launch generated more engagement than all our previous campaigns combined. Her editing skills are top-notch! She took our raw footage and transformed it into compelling stories that resonated with our audience.",
    rating: 5,
    service: "Video Editing"
  },
  {
    id: 3,
    name: "Jessica Rodriguez",
    position: "E-commerce Director",
    company: "Urban Market",
    image: "/images/me.jpg", // Using placeholder image
    content: "Blessing's paid advertising strategy doubled our conversion rate while actually reducing our ad spend. The ROI has been incredible and we couldn't be happier. Her data-driven approach to targeting and optimization made all the difference.",
    rating: 5,
    service: "Paid Advertising"
  },
  {
    id: 4,
    name: "David Williams",
    position: "Marketing Manager",
    company: "Wellness Collective",
    image: "/images/me.jpg", // Using placeholder image
    content: "Blessing is a true professional who goes above and beyond. Her strategic insights and creative approach to our social media campaigns have helped us reach new audiences and grow our community significantly. I highly recommend her services.",
    rating: 5,
    service: "Social Media Strategy"
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".testimonials-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".testimonials-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate testimonial content
    gsap.fromTo(
      ".testimonial-content",
      { 
        opacity: 0,
        y: 30
      },
      { 
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".testimonial-slider",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate quote icon
    gsap.fromTo(
      ".quote-icon",
      { 
        opacity: 0,
        scale: 0.5,
        rotation: -20
      },
      { 
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: ".testimonial-slider",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
  }, { scope: sectionRef, dependencies: [activeIndex] });

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 testimonials-title">
          <h2 className="text-sm md:text-base font-medium text-primary mb-2">
            Client Feedback
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold leading-[1.2]">
            What My Clients Say
          </h3>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Don&apos;t just take my word for it—hear what clients have to say about working with me.
          </p>
        </div>

        <div className="relative testimonial-slider">
          {/* Quote icon */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-primary/20 quote-icon">
            <Quote size={80} />
          </div>
          
          {/* Testimonial content */}
          <div className="bg-background rounded-2xl p-8 md:p-12 shadow-lg border border-border/50 max-w-4xl mx-auto relative z-10">
            <div className="testimonial-content">
              <p className="text-lg md:text-xl italic mb-8 text-foreground/80">
                &ldquo;{testimonials[activeIndex].content}&rdquo;
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 mr-4">
                    <Image
                      src={testimonials[activeIndex].image}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-foreground/70">
                      {testimonials[activeIndex].position}, {testimonials[activeIndex].company}
                    </p>
                    <span className="inline-block mt-1 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {testimonials[activeIndex].service}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={cn(
                        "fill-current",
                        i < testimonials[activeIndex].rating ? "text-yellow-400" : "text-gray-300"
                      )} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    activeIndex === index 
                      ? "bg-primary w-6" 
                      : "bg-foreground/30 hover:bg-foreground/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
