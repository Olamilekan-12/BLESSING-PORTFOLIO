"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Instagram, Linkedin, Heart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Services", path: "/#services" },
  { name: "Portfolio", path: "/#portfolio" },
  { name: "Testimonials", path: "/#testimonials" },
  { name: "Contact", path: "/#contact" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/bellaoghie/#" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/blessing-oghie/" },
  { name: "Whatsapp", icon: FaWhatsapp, url: "https://wa.link/yk7qtj" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Animate footer elements
    gsap.fromTo(
      ".footer-item",
      { 
        y: 20, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, { scope: footerRef });

  return (
    <footer 
      ref={footerRef}
      className="bg-background border-t border-border/50 py-12 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="footer-item">
            <Link href="/" className="text-2xl font-bold mb-4 inline-block">
              Blessing Oghie
            </Link>
            <p className="text-foreground/70 mb-6 max-w-md">
              Elevating brands through strategic social media management and creative content that connects and converts.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-secondary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-item">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path}
                    className="text-foreground/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div className="footer-item">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-foreground/70">
              <li>
                <a href="mailto:blessingoghie@outlook.com" className="hover:text-primary transition-colors">
                  blessingoghie@outlook.com
                </a>
              </li>
              <li>
                <a href="tel:+2348144446306" className="hover:text-primary transition-colors">
                  +234 814 444 6306
                </a>
              </li>
              <li>Lagos, Nigeria</li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center footer-item">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Blessing Oghie. All rights reserved.
          </p>
          <p className="text-foreground/60 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500 animate-pulse" /> by Blessing Oghie
          </p>
        </div>
      </div>
    </footer>
  );
}
