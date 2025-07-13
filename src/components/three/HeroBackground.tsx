"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useGSAP(() => {
    // Initialize Three.js scene
    const initThree = () => {
      if (!containerRef.current) return;

      // Create scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 20;
      cameraRef.current = camera;

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Create particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500;
      const posArray = new Float32Array(particlesCount * 3);
      const colorsArray = new Float32Array(particlesCount * 3);
      
      // Secondary colors
      const colors = [
        new THREE.Color("#8b5cf6"), // purple
        new THREE.Color("#3b82f6"), // blue
        new THREE.Color("#ec4899"), // pink
      ];

      for (let i = 0; i < particlesCount * 3; i += 3) {
        // Position
        posArray[i] = (Math.random() - 0.5) * 50;
        posArray[i + 1] = (Math.random() - 0.5) * 50;
        posArray[i + 2] = (Math.random() - 0.5) * 50;
        
        // Color
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        colorsArray[i] = color.r;
        colorsArray[i + 1] = color.g;
        colorsArray[i + 2] = color.b;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      
      particlesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(colorsArray, 3)
      );

      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      particlesRef.current = particles;

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // Handle window resize
      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      // Handle mouse movement
      const handleMouseMove = (event: MouseEvent) => {
        mousePosition.current = {
          x: (event.clientX / window.innerWidth) * 2 - 1,
          y: -(event.clientY / window.innerHeight) * 2 + 1,
        };
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Animation
      const animate = () => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesRef.current) return;
        
        // Rotate particles
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.0005;
        
        // Move particles based on mouse position
        particlesRef.current.rotation.x += mousePosition.current.y * 0.0005;
        particlesRef.current.rotation.y += mousePosition.current.x * 0.0005;

        // Render
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        
        // Continue animation loop
        rafId.current = requestAnimationFrame(animate);
      };

      // Start animation
      animate();

      // Cleanup function
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("mousemove", handleMouseMove);
        
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        
        if (particlesRef.current) {
          particlesRef.current.geometry.dispose();
          (particlesRef.current.material as THREE.Material).dispose();
        }
      };
    };

    const cleanup = initThree();
    return cleanup;
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 opacity-70"
      aria-hidden="true"
    />
  );
}
