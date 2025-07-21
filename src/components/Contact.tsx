"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin, Send, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "blessingoghie@outlook.com",
    link: "mailto:blessingoghie@outlook.com"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+234 814 444 6306",
    link: "tel:+2348144446306"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Lagos, Nigeria",
    link: "#"
  }
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/bellaoghie/#" },
  { name: "Whatsapp", icon: FaWhatsapp, url: "https://wa.link/yk7qtj" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/blessing-oghie/" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      ".contact-title",
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-title",
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate contact form
    gsap.fromTo(
      ".contact-form",
      { 
        opacity: 0,
        x: -50
      },
      { 
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate contact info
    gsap.fromTo(
      ".contact-info",
      { 
        opacity: 0,
        x: 50
      },
      { 
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 75%",
          end: "bottom 60%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate contact info items
    gsap.fromTo(
      ".contact-info-item",
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 0.5,
        scrollTrigger: {
          trigger: ".contact-info",
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
      id="contact" 
      className="py-20 px-6 md:px-12 bg-secondary/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 contact-title">
          <h2 className="text-sm md:text-base font-medium text-primary mb-2">
            Get In Touch
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold leading-[1.2]">
            Let&apos;s Work Together
          </h3>
          <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
            Ready to elevate your social media presence? Reach out to discuss how we can collaborate to achieve your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="contact-form bg-background rounded-xl p-8 shadow-lg border border-border/50">
            <h4 className="text-xl font-semibold mb-6">Send a Message</h4>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="How can I help you?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Tell me about your project..."
                  required
                ></textarea>
              </div>
              
              <Button type="submit" size="lg" className="w-full sm:w-auto group">
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className="contact-info flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-semibold mb-6">Contact Information</h4>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="contact-info-item flex items-start">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                        <Icon className="text-primary" size={20} />
                      </div>
                      <div>
                        <h5 className="font-medium">{item.title}</h5>
                        <a 
                          href={item.link} 
                          className="text-foreground/70 hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="mt-12">
              <h4 className="text-xl font-semibold mb-6">Follow Me</h4>
              
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary transition-colors"
                      aria-label={social.name}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
              
              <div className="mt-8 p-6 bg-background rounded-xl border border-border/50 shadow-md">
                <h5 className="font-medium mb-2">Working Hours</h5>
                <p className="text-foreground/70">Monday - Friday: 9am - 5pm EST</p>
                <p className="text-foreground/70">Weekend: By appointment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
