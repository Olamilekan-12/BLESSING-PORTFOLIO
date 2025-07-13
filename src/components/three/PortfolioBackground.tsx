"use client";

import { useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";

// Define type for our custom cube properties
type CubeProps = {
  originalPosition: {
    x: number;
    y: number;
    z: number;
  };
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
};

// Extend THREE.Mesh with our custom properties
type CubeMesh = THREE.Mesh & CubeProps;

export default function PortfolioBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubesRef = useRef<THREE.Group | null>(null);
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

      // Create a group for cubes
      const cubesGroup = new THREE.Group();
      scene.add(cubesGroup);
      cubesRef.current = cubesGroup;

      // Create floating cubes
      const cubeCount = 30;
      const colors = [
        new THREE.Color("#8b5cf6"), // purple
        new THREE.Color("#3b82f6"), // blue
        new THREE.Color("#ec4899"), // pink
      ];

      for (let i = 0; i < cubeCount; i++) {
        const size = Math.random() * 0.5 + 0.1;
        const geometry = new THREE.BoxGeometry(size, size, size);
        
        // Use different materials for variety
        let material;
        const materialType = Math.floor(Math.random() * 3);
        const colorIndex = Math.floor(Math.random() * colors.length);
        const color = colors[colorIndex];
        
        if (materialType === 0) {
          material = new THREE.MeshBasicMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.3 + Math.random() * 0.2,
            wireframe: Math.random() > 0.7
          });
        } else if (materialType === 1) {
          material = new THREE.MeshPhongMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.3 + Math.random() * 0.2,
            shininess: 30,
            specular: 0x555555
          });
        } else {
          material = new THREE.MeshStandardMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.3 + Math.random() * 0.2,
            roughness: 0.5,
            metalness: 0.5
          });
        }
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Position cubes randomly in a spherical distribution
        const radius = Math.random() * 15 + 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        cube.position.x = radius * Math.sin(phi) * Math.cos(theta);
        cube.position.y = radius * Math.sin(phi) * Math.sin(theta);
        cube.position.z = radius * Math.cos(phi);
        
        // Random rotation
        cube.rotation.x = Math.random() * Math.PI;
        cube.rotation.y = Math.random() * Math.PI;
        cube.rotation.z = Math.random() * Math.PI;
        
        // Store original position for animation
        const typedCube = cube as unknown as CubeMesh;
        typedCube.originalPosition = {
          x: cube.position.x,
          y: cube.position.y,
          z: cube.position.z
        };
        
        // Random rotation speed
        typedCube.rotationSpeed = {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        };
        
        cubesGroup.add(cube);
      }

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Handle window resize
      const handleResize = () => {
        if (!cameraRef.current || !rendererRef.current) return;
        
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      };

      window.addEventListener("resize", handleResize);

      // Animation
      const animate = () => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !cubesRef.current) return;
        
        // Rotate the entire group
        cubesRef.current.rotation.y += 0.001;
        
        // Animate individual cubes
        cubesRef.current.children.forEach((cube) => {
          const typedCube = cube as unknown as CubeMesh;
          
          // Rotate each cube
          cube.rotation.x += typedCube.rotationSpeed.x;
          cube.rotation.y += typedCube.rotationSpeed.y;
          cube.rotation.z += typedCube.rotationSpeed.z;
          
          // Subtle position animation
          const time = Date.now() * 0.001;
          const originalPos = typedCube.originalPosition;
          
          cube.position.x = originalPos.x + Math.sin(time * 0.5) * 0.3;
          cube.position.y = originalPos.y + Math.cos(time * 0.7) * 0.3;
          cube.position.z = originalPos.z + Math.sin(time * 0.3) * 0.3;
        });

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
        
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
        }
        
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        
        // Dispose geometries and materials
        if (cubesRef.current) {
          cubesRef.current.children.forEach((cube) => {
            (cube as THREE.Mesh).geometry.dispose();
            ((cube as THREE.Mesh).material as THREE.Material).dispose();
          });
        }
      };
    };

    const cleanup = initThree();
    return cleanup;
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-10 opacity-0 pointer-events-none hidden"
      style={{ zIndex: -100, display: 'none' }}
      aria-hidden="true"
    />
  );
}
