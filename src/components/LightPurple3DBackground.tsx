import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LightPurple3DBackgroundProps {
  className?: string;
  mouseNormalized?: { x: number; y: number };
}

export const LightPurple3DBackground: React.FC<LightPurple3DBackgroundProps> = ({
  className = "absolute inset-0 pointer-events-none -z-10 overflow-hidden",
  mouseNormalized = { x: 0, y: 0 }
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Group for interactive 3D rotation
    const group = new THREE.Group();
    scene.add(group);

    // 2. 3D Outer Wireframe Icosahedron in lightest purple
    const icosaGeometry = new THREE.IcosahedronGeometry(7.5, 1);
    const icosaMaterial = new THREE.MeshBasicMaterial({
      color: 0xd8b4fe, // Lightest purple / lavender
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
    group.add(icosaMesh);

    // 3. Inner 3D Geometric Torus Ring in soft lilac
    const torusGeometry = new THREE.TorusGeometry(5.2, 0.08, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.28
    });
    const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
    torusMesh.rotation.x = Math.PI / 3;
    group.add(torusMesh);

    // 4. Secondary Counter-Torus Ring
    const torusGeometry2 = new THREE.TorusGeometry(6.4, 0.06, 16, 100);
    const torusMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xe9d5ff,
      transparent: true,
      opacity: 0.18
    });
    const torusMesh2 = new THREE.Mesh(torusGeometry2, torusMaterial2);
    torusMesh2.rotation.y = Math.PI / 4;
    group.add(torusMesh2);

    // 5. Floating 3D Star / Particle Constellation in lightest purple
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 36;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random() * 0.8 + 0.2;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xf3e8ff, // ultra light lilac
      size: 0.25,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle idle orbit
      icosaMesh.rotation.x = elapsedTime * 0.1;
      icosaMesh.rotation.y = elapsedTime * 0.15;
      torusMesh.rotation.z = elapsedTime * 0.2;
      torusMesh2.rotation.x = -elapsedTime * 0.18;
      particles.rotation.y = elapsedTime * 0.04;

      // Mouse parallax easing
      const targetRotX = mouseNormalized.y * 0.4;
      const targetRotY = mouseNormalized.x * 0.4;
      group.rotation.x += (targetRotX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      icosaGeometry.dispose();
      icosaMaterial.dispose();
      torusGeometry.dispose();
      torusMaterial.dispose();
      torusGeometry2.dispose();
      torusMaterial2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [mouseNormalized.x, mouseNormalized.y]);

  return (
    <div
      ref={mountRef}
      className={className}
      aria-hidden="true"
    />
  );
};
