"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Instagram, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { gsap } from "gsap";

const navLinks = [
  { name: "Home", path: "#home", sectionId: "home" },
  { name: "About", path: "#about", sectionId: "about" },
  { name: "Services", path: "#services", sectionId: "services" },
  { name: "Portfolio", path: "#portfolio", sectionId: "portfolio" },
  { name: "Blog", path: "#blog", sectionId: "blog" },
  { name: "Contact", path: "#contact", sectionId: "contact" },
];

const socialLinks = [
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/bellaoghie/#" },
  { name: "Whatsapp", icon: FaWhatsapp, url: "https://wa.link/yk7qtj" },
  { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/blessing-oghie/" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Check which section is currently in view
      const sections = navLinks.map(link => link.sectionId);
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    
    // Animation for navbar elements
    gsap.fromTo(
      ".nav-item",
      { y: -50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      ".social-icon",
      { y: -30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        delay: 0.5,
        ease: "back.out(1.7)"
      }
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    
    if (!isOpen) {
      // Animation for mobile menu opening
      gsap.fromTo(
        ".mobile-nav-item",
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  };

  return (
    <header 
      className={cn(
        "fixed w-full z-50 transition-all duration-300 py-4 px-6 md:px-12",
        scrolled ? "bg-background/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold nav-item">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent-foreground">
            Blessing Oghie
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.path} className="nav-item">
                <a
                  href={link.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-2 cursor-pointer",
                    activeSection === link.sectionId
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                      : "text-foreground/70 hover:text-foreground"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById(link.sectionId);
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon text-foreground/70 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg py-6 px-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={cn(
                  "mobile-nav-item text-base font-medium py-2 transition-colors cursor-pointer",
                  activeSection === link.sectionId
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                )}
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  const section = document.getElementById(link.sectionId);
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-6 mt-6 pt-4 border-t border-border">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-item text-foreground/70 hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
