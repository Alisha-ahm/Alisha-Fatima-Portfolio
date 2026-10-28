import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Sparkles, RotateCw, Layers, Sliders, Zap, Orbit, Compass, Cpu, Check } from 'lucide-react';

interface ThreeHeroSceneProps {
  className?: string;
}

interface SkillNodeConfig {
  id: string;
  name: string;
  badge: string;
  category: string;
  level: string;
  color: string;
  hexColor: number;
  orbitIndex: number; // 1, 2, or 3
  radius: number;
  speed: number;
  phase: number;
  tilt: [number, number, number]; // Euler angles [x, y, z]
  iconType: 'react' | 'typescript' | 'node' | 'docker' | 'aws' | 'ai' | 'gsap' | 'threejs' | 'mongodb' | 'sockets';
}

const SKILL_NODES: SkillNodeConfig[] = [
  // Orbit 1: Inner horizontal orbit (Radius 1.78, plane tilt 0)
  {
    id: 'react',
    name: 'React.js',
    badge: 'v19 Architecture',
    category: 'Frontend Engineering',
    level: '95%',
    color: '#00d8ff',
    hexColor: 0x00d8ff,
    orbitIndex: 1,
    radius: 1.78,
    speed: 0.52,
    phase: 0,
    tilt: [0, 0, 0],
    iconType: 'react'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    badge: 'Type-Safe Core',
    category: 'Languages & Logic',
    level: '92%',
    color: '#38bdf8',
    hexColor: 0x38bdf8,
    orbitIndex: 1,
    radius: 1.78,
    speed: 0.52,
    phase: (2 * Math.PI) / 3,
    tilt: [0, 0, 0],
    iconType: 'typescript'
  },
  {
    id: 'node',
    name: 'Node.js',
    badge: 'Backend Runtime',
    category: 'APIs & Services',
    level: '88%',
    color: '#22c55e',
    hexColor: 0x22c55e,
    orbitIndex: 1,
    radius: 1.78,
    speed: 0.52,
    phase: (4 * Math.PI) / 3,
    tilt: [0, 0, 0],
    iconType: 'node'
  },

  // Orbit 2: Inclined Gyroscopic Orbit (Radius 2.12, tilt Math.PI / 3)
  {
    id: 'docker',
    name: 'Docker',
    badge: 'Containers / CI',
    category: 'Cloud & DevOps',
    level: '86%',
    color: '#0ea5e9',
    hexColor: 0x0ea5e9,
    orbitIndex: 2,
    radius: 2.12,
    speed: -0.42,
    phase: 0,
    tilt: [Math.PI / 3, 0, 0],
    iconType: 'docker'
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    badge: 'ECS / EC2 / ECR',
    category: 'Cloud Infrastructure',
    level: '84%',
    color: '#f59e0b',
    hexColor: 0xf59e0b,
    orbitIndex: 2,
    radius: 2.12,
    speed: -0.42,
    phase: Math.PI / 2,
    tilt: [Math.PI / 3, 0, 0],
    iconType: 'aws'
  },
  {
    id: 'ai',
    name: 'LangChain AI',
    badge: 'RAG & Vectors',
    category: 'AI & LLM Solutions',
    level: '90%',
    color: '#c084fc',
    hexColor: 0xc084fc,
    orbitIndex: 2,
    radius: 2.12,
    speed: -0.42,
    phase: Math.PI,
    tilt: [Math.PI / 3, 0, 0],
    iconType: 'ai'
  },
  {
    id: 'gsap',
    name: 'GSAP 3D',
    badge: 'Interactive Motion',
    category: 'Frontend & Kinetics',
    level: '90%',
    color: '#84cc16',
    hexColor: 0x84cc16,
    orbitIndex: 2,
    radius: 2.12,
    speed: -0.42,
    phase: (3 * Math.PI) / 2,
    tilt: [Math.PI / 3, 0, 0],
    iconType: 'gsap'
  },

  // Orbit 3: Diagonal Outer Orbit (Radius 2.48, tilt [Math.PI / 6, Math.PI / 4, 0])
  {
    id: 'threejs',
    name: 'Three.js 3D',
    badge: 'WebGL Matrix',
    category: '3D Graphics',
    level: '90%',
    color: '#06b6d4',
    hexColor: 0x06b6d4,
    orbitIndex: 3,
    radius: 2.48,
    speed: 0.34,
    phase: 0,
    tilt: [Math.PI / 6, Math.PI / 4, 0],
    iconType: 'threejs'
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    badge: 'Document DB',
    category: 'Data Persistence',
    level: '85%',
    color: '#10b981',
    hexColor: 0x10b981,
    orbitIndex: 3,
    radius: 2.48,
    speed: 0.34,
    phase: (2 * Math.PI) / 3,
    tilt: [Math.PI / 6, Math.PI / 4, 0],
    iconType: 'mongodb'
  },
  {
    id: 'sockets',
    name: 'Socket.IO',
    badge: 'Real-Time Sync',
    category: 'WebSockets Latency',
    level: '90%',
    color: '#f43f5e',
    hexColor: 0xf43f5e,
    orbitIndex: 3,
    radius: 2.48,
    speed: 0.34,
    phase: (4 * Math.PI) / 3,
    tilt: [Math.PI / 6, Math.PI / 4, 0],
    iconType: 'sockets'
  }
];

/**
 * Procedurally draws crisp vector skill icon badges on an offscreen canvas
 * Returning a high-DPI THREE.CanvasTexture for Three.js billboard sprites.
 */
function generateSkillIconTexture(skill: SkillNodeConfig): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const cx = size / 2;
  const cy = 92; // Icon center
  const radius = 64;

  // 1. Outer Glow Aura & Glass Background Disc
  ctx.save();
  const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius + 20);
  grad.addColorStop(0, `${skill.color}25`);
  grad.addColorStop(0.7, `${skill.color}0a`);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius + 20, 0, Math.PI * 2);
  ctx.fill();

  // Dark obsidian badge circular background
  ctx.fillStyle = 'rgba(3, 7, 18, 0.92)';
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // Glowing holographic rim border
  ctx.lineWidth = 4;
  ctx.strokeStyle = skill.color;
  ctx.shadowColor = skill.color;
  ctx.shadowBlur = 14;
  ctx.stroke();

  // Subtle inner geometric ring
  ctx.lineWidth = 1;
  ctx.strokeStyle = `${skill.color}55`;
  ctx.shadowBlur = 0;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 2. Draw Vector Skill Emblem
  ctx.save();
  ctx.translate(cx, cy);

  if (skill.iconType === 'react') {
    // React 3 rotated ellipses + nucleus
    ctx.strokeStyle = '#00d8ff';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#00d8ff';
    ctx.shadowBlur = 10;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.ellipse(0, 0, 38, 14, (i * Math.PI) / 3, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.fillStyle = '#00d8ff';
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();
  } else if (skill.iconType === 'typescript') {
    // TypeScript crisp TS badge
    ctx.fillStyle = '#2563eb';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(-26, -26, 52, 52, 10);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 30px "JetBrains Mono", monospace, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TS', 0, 2);
  } else if (skill.iconType === 'node') {
    // Node.js emerald hexagon with NODE label
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#22c55e';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 6;
      const x = Math.cos(angle) * 32;
      const y = Math.sin(angle) * 32;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NODE', 0, 1);
  } else if (skill.iconType === 'docker') {
    // Docker container blocks + hull
    ctx.fillStyle = '#0ea5e9';
    ctx.strokeStyle = '#38bdf8';
    ctx.shadowColor = '#0ea5e9';
    ctx.shadowBlur = 8;
    const s = 9;
    ctx.fillRect(-5, -20, s, s);
    ctx.fillRect(-17, -8, s, s);
    ctx.fillRect(-5, -8, s, s);
    ctx.fillRect(7, -8, s, s);
    ctx.fillRect(-23, 4, s, s);
    ctx.fillRect(-11, 4, s, s);
    ctx.fillRect(1, 4, s, s);
    ctx.fillRect(13, 4, s, s);
    // Hull
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-28, 17);
    ctx.bezierCurveTo(-22, 28, 22, 28, 30, 17);
    ctx.stroke();
  } else if (skill.iconType === 'aws') {
    // AWS Cloud + orange smile
    ctx.strokeStyle = '#f59e0b';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.arc(-11, 2, 14, Math.PI * 0.45, Math.PI * 1.5);
    ctx.arc(3, -10, 15, Math.PI * 0.95, Math.PI * 2.05);
    ctx.arc(18, 2, 12, Math.PI * 1.45, Math.PI * 0.55);
    ctx.closePath();
    ctx.stroke();
    // Smile curve
    ctx.beginPath();
    ctx.arc(0, 8, 22, Math.PI * 0.28, Math.PI * 0.72);
    ctx.stroke();
  } else if (skill.iconType === 'ai') {
    // LangChain AI neural synapse nodes
    ctx.strokeStyle = '#c084fc';
    ctx.fillStyle = '#e879f9';
    ctx.shadowColor = '#c084fc';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2.5;
    const pts = [
      { x: 0, y: 0, r: 8 },
      { x: -20, y: -16, r: 5 },
      { x: 20, y: -16, r: 5 },
      { x: -22, y: 15, r: 5 },
      { x: 22, y: 15, r: 5 },
      { x: 0, y: -24, r: 4 }
    ];
    pts.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    pts.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (skill.iconType === 'gsap') {
    // GSAP kinetic flash lightning
    ctx.fillStyle = '#84cc16';
    ctx.strokeStyle = '#bef264';
    ctx.shadowColor = '#84cc16';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(3, -26);
    ctx.lineTo(-16, 1);
    ctx.lineTo(-2, 1);
    ctx.lineTo(-9, 27);
    ctx.lineTo(16, -1);
    ctx.lineTo(2, -1);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else if (skill.iconType === 'threejs') {
    // Three.js isometric 3D crystal cube
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.8;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 10;
    const r = 26;
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.lineTo(r * 0.86, -r * 0.5);
    ctx.lineTo(0, 0);
    ctx.lineTo(-r * 0.86, -r * 0.5);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-r * 0.86, -r * 0.5);
    ctx.lineTo(-r * 0.86, r * 0.5);
    ctx.lineTo(0, r);
    ctx.lineTo(0, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(r * 0.86, -r * 0.5);
    ctx.lineTo(r * 0.86, r * 0.5);
    ctx.lineTo(0, r);
    ctx.stroke();
  } else if (skill.iconType === 'mongodb') {
    // MongoDB tiered database cylinder discs
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#10b981';
    ctx.shadowBlur = 10;
    [-14, 0, 14].forEach(y => {
      ctx.beginPath();
      ctx.ellipse(0, y - 4, 25, 8, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-25, y - 4);
      ctx.lineTo(-25, y + 4);
      ctx.ellipse(0, y + 4, 25, 8, 0, 0, Math.PI);
      ctx.lineTo(25, y - 4);
      ctx.stroke();
    });
  } else if (skill.iconType === 'sockets') {
    // Socket.IO radar waves + pulse
    ctx.strokeStyle = '#f43f5e';
    ctx.fillStyle = '#f43f5e';
    ctx.shadowColor = '#f43f5e';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 2, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(0, 2, 16, Math.PI * 0.7, Math.PI * 1.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 2, 26, Math.PI * 0.7, Math.PI * 1.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 2, 16, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 2, 26, -Math.PI * 0.3, Math.PI * 0.3);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Clear Typography Tag Pill Beneath Icon
  ctx.save();
  // Name Tag
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px "JetBrains Mono", system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
  ctx.shadowBlur = 6;
  ctx.fillText(skill.name, cx, 172);

  // Proficiency / Subtitle pill
  ctx.fillStyle = skill.color;
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillText(`${skill.badge} • ${skill.level}`, cx, 202);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [activePreset, setActivePreset] = useState<'quantum' | 'cyber' | 'aurora'>('quantum');
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [focusedSkill, setFocusedSkill] = useState<SkillNodeConfig | null>(null);

  // References to communicate with render loop without re-triggering useEffect
  const wireframeRef = useRef(wireframeMode);
  const speedRef = useRef(rotationSpeed);
  const presetRef = useRef(activePreset);

  useEffect(() => {
    wireframeRef.current = wireframeMode;
  }, [wireframeMode]);

  useEffect(() => {
    speedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    presetRef.current = activePreset;
  }, [activePreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Software-WebGL Detection Guard (per Three.js skill guidelines)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Scene, Camera, Renderer Setup
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Map (PMREM + RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig (Warm Key, Cool Hemisphere Fill, Accent Point)
    const keyLight = new THREE.DirectionalLight(0x06b6d4, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd946ef, 2.2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const hemiLight = new THREE.HemisphereLight(0x8b5cf6, 0x050816, 1.2);
    scene.add(hemiLight);

    // 5. Composite 3D Procedural Model (THREE.Group)
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // Part A: Central Quantum Core (Icosahedron Inner Crystal)
    const coreGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x082f49,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    modelGroup.add(coreMesh);

    // Part B: Outer Lattice Cage (Icosahedron Wireframe/Facet)
    const outerGeo = new THREE.IcosahedronGeometry(1.35, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.9,
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    modelGroup.add(outerMesh);

    // Part C: Gyroscopic Torus Ring 1 (Horizontal Orbit - Inner)
    const ring1Geo = new THREE.TorusGeometry(1.78, 0.026, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    modelGroup.add(ring1);

    // Part D: Gyroscopic Torus Ring 2 (Vertical Incline Orbit - Middle)
    const ring2Geo = new THREE.TorusGeometry(2.12, 0.022, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    modelGroup.add(ring2);

    // Part E: Gyroscopic Torus Ring 3 (Diagonal Orbit - Outer)
    const ring3Geo = new THREE.TorusGeometry(2.48, 0.018, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0xd946ef,
      metalness: 0.95,
      roughness: 0.15,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.set(Math.PI / 6, Math.PI / 4, 0);
    modelGroup.add(ring3);

    // Part F: Circulating Icon-Based Skills Orbits (10 Real-time circulating billboard badges)
    const skillsGroup = new THREE.Group();
    modelGroup.add(skillsGroup);

    // Arrays to store resources for clean disposal
    const createdTextures: THREE.CanvasTexture[] = [];
    const createdMaterials: THREE.Material[] = [];
    const createdGeometries: THREE.BufferGeometry[] = [];
    const skillSprites: { config: SkillNodeConfig; sprite: THREE.Sprite; group: THREE.Group }[] = [];

    const beaconGeo = new THREE.SphereGeometry(0.045, 12, 12);
    createdGeometries.push(beaconGeo);

    SKILL_NODES.forEach((skill) => {
      const nodeGroup = new THREE.Group();

      // High-resolution Canvas Texture for crisp billboard rendering
      const texture = generateSkillIconTexture(skill);
      createdTextures.push(texture);

      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
        depthTest: true
      });
      createdMaterials.push(spriteMat);

      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.64, 0.64, 1);
      nodeGroup.add(sprite);

      // Micro beacon core beneath sprite
      const beaconMat = new THREE.MeshBasicMaterial({ color: skill.hexColor });
      createdMaterials.push(beaconMat);
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      nodeGroup.add(beacon);

      skillsGroup.add(nodeGroup);
      skillSprites.push({ config: skill, sprite, group: nodeGroup });
    });

    // Part G: Quantum Swarm Particle Cloud
    const particleCount = 180;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.5 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    createdGeometries.push(particlesGeo);

    const particlesMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.035,
      transparent: true,
      opacity: 0.75,
    });
    createdMaterials.push(particlesMat);

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    modelGroup.add(particleSystem);

    // Contact Grounding Plane Shadow
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    createdGeometries.push(shadowGeo);

    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    createdMaterials.push(shadowMat);

    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.1;
    scene.add(shadowPlane);

    // 6. Interactive Mouse Parallax and Raycasting for Skill Hover
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2(-999, -999);
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.75;
      targetRotationX = -y * 0.6;
      mouseVector.set(x, y);

      // Raycast against circulating skill sprites
      raycaster.setFromCamera(mouseVector, camera);
      const interactiveTargets = skillSprites.map(s => s.sprite);
      const intersects = raycaster.intersectObjects(interactiveTargets, false);

      if (intersects.length > 0) {
        const hitSprite = intersects[0].object as THREE.Sprite;
        const matched = skillSprites.find(s => s.sprite === hitSprite);
        if (matched) {
          setFocusedSkill(matched.config);
          return;
        }
      }
      setFocusedSkill(null);
    };

    container.addEventListener('pointermove', onPointerMove);

    // 7. Render Loop with Orbital Kinematics
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const speed = speedRef.current;

      // Color Theme preset adjustments
      const currentPreset = presetRef.current;
      if (currentPreset === 'quantum') {
        coreMat.color.setHex(0x06b6d4);
        outerMat.color.setHex(0x8b5cf6);
        keyLight.color.setHex(0x06b6d4);
        rimLight.color.setHex(0xd946ef);
      } else if (currentPreset === 'cyber') {
        coreMat.color.setHex(0x10b981);
        outerMat.color.setHex(0x06b6d4);
        keyLight.color.setHex(0x10b981);
        rimLight.color.setHex(0x3b82f6);
      } else if (currentPreset === 'aurora') {
        coreMat.color.setHex(0xf43f5e);
        outerMat.color.setHex(0x8b5cf6);
        keyLight.color.setHex(0xf43f5e);
        rimLight.color.setHex(0x38bdf8);
      }

      // Wireframe toggle
      coreMat.wireframe = wireframeRef.current;

      // Core complex rotational motion
      coreMesh.rotation.y += 0.45 * delta * speed;
      coreMesh.rotation.x += 0.22 * delta * speed;

      outerMesh.rotation.y -= 0.28 * delta * speed;
      outerMesh.rotation.z += 0.18 * delta * speed;

      ring1.rotation.z += 0.45 * delta * speed;
      ring2.rotation.y += 0.4 * delta * speed;
      ring3.rotation.x += 0.35 * delta * speed;
      particleSystem.rotation.y += 0.12 * delta * speed;

      // Update position of each circulating skill along its designated 3D orbit
      skillSprites.forEach(({ config, group, sprite }) => {
        const angle = config.phase + elapsed * config.speed * speed;
        const rawX = Math.cos(angle) * config.radius;
        const rawZ = Math.sin(angle) * config.radius;
        const rawY = Math.sin(angle * 2) * 0.08; // organic harmonic undulating wave

        const pos = new THREE.Vector3(rawX, rawY, rawZ);
        if (config.tilt[0] !== 0 || config.tilt[1] !== 0 || config.tilt[2] !== 0) {
          const euler = new THREE.Euler(config.tilt[0], config.tilt[1], config.tilt[2]);
          pos.applyEuler(euler);
        }
        group.position.copy(pos);

        // Highlight sprite on focus
        if (focusedSkill && focusedSkill.id === config.id) {
          sprite.scale.set(0.82, 0.82, 1);
        } else {
          sprite.scale.set(0.64, 0.64, 1);
        }
      });

      // Smooth exponential damping towards target pointer rotation
      modelGroup.rotation.y = THREE.MathUtils.damp(modelGroup.rotation.y, targetRotationY, 4, delta);
      modelGroup.rotation.x = THREE.MathUtils.damp(modelGroup.rotation.x, targetRotationX, 4, delta);

      // Render frame
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 8. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Clean Lifecycle Disposal
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationFrameId);

      // Dispose Geometries
      coreGeo.dispose();
      outerGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      createdGeometries.forEach(g => g.dispose());

      // Dispose Materials & Textures
      coreMat.dispose();
      outerMat.dispose();
      ring1Mat.dispose();
      ring2Mat.dispose();
      ring3Mat.dispose();
      createdMaterials.forEach(m => m.dispose());
      createdTextures.forEach(t => t.dispose());

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [focusedSkill?.id]);

  return (
    <div className={`relative w-full h-[470px] sm:h-[510px] flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-cyan-500/30 bg-gradient-to-b from-slate-950/85 via-[#060b18] to-slate-950/95 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl group ${className}`}>
      
      {/* 3D Scene Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,rgba(139,92,246,0.09)_45%,transparent_75%)] pointer-events-none" />

      {/* Cyber Grid Subtle Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40c_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40c_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-50" />

      {/* Top Floating Telemetry Header with Dynamic Skill Focus */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        {focusedSkill ? (
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-950/95 border border-cyan-400 text-xs font-mono text-cyan-200 shadow-xl shadow-cyan-900/50 pointer-events-auto animate-pulse">
            <span 
              className="w-2.5 h-2.5 rounded-full" 
              style={{ backgroundColor: focusedSkill.color }} 
            />
            <span className="font-bold text-white">{focusedSkill.name}</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300">{focusedSkill.category}</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-[10px] text-cyan-300 font-bold border border-cyan-700/60">
              {focusedSkill.level}
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-lg pointer-events-auto">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="font-bold">WebGL 3D Matrix Core: 10 Icon Skills Orbiting</span>
          </div>
        )}

        <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/85 border border-slate-700/60 text-[11px] font-mono text-slate-400">
          <RotateCw className="w-3 h-3 text-cyan-400" />
          <span>Hover icon or drag to steer</span>
        </div>
      </div>

      {/* Three.js Isolated Canvas Mount Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10"
        title="Interactive 3D WebGL Matrix: move your cursor over circulating skill icons or core"
      />

      {/* Sleek Collapsible Ergonomic Bottom Dock */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 w-[94%] max-w-[530px]">
        {/* Collapse / Expand Tab Toggle */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="px-3 py-0.5 rounded-t-lg bg-slate-900/90 border-t border-x border-cyan-500/30 text-[10px] font-mono text-cyan-300 hover:text-white transition-all shadow-md flex items-center gap-1.5"
            aria-label={isDockCollapsed ? 'Show 3D HUD' : 'Collapse 3D HUD'}
          >
            <Sliders className="w-2.5 h-2.5 text-cyan-400" />
            <span>{isDockCollapsed ? '▴ 3D HUD Controls' : '▾ Collapse'}</span>
          </button>
        </div>

        {/* Controls Dock Surface */}
        {!isDockCollapsed && (
          <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-950/95 border border-cyan-500/40 backdrop-blur-md shadow-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Color Presets */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono text-slate-400 mr-1 hidden sm:inline">Matrix:</span>
              <button
                onClick={() => setActivePreset('quantum')}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-medium transition-all ${
                  activePreset === 'quantum'
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200'
                    : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Quantum
              </button>
              <button
                onClick={() => setActivePreset('cyber')}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-medium transition-all ${
                  activePreset === 'cyber'
                    ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-200'
                    : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Emerald
              </button>
              <button
                onClick={() => setActivePreset('aurora')}
                className={`px-2 py-1 rounded-lg text-[10px] font-mono font-medium transition-all ${
                  activePreset === 'aurora'
                    ? 'bg-rose-500/25 border border-rose-400 text-rose-200'
                    : 'bg-slate-900/90 text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                Aurora
              </button>
            </div>

            {/* Wireframe and Speed Action Controls */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={() => setWireframeMode(!wireframeMode)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 border transition-all ${
                  wireframeMode
                    ? 'bg-purple-600/30 border-purple-400 text-purple-200 font-bold'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Toggle Wireframe Architecture"
              >
                <Layers className="w-3 h-3 text-purple-400" />
                <span>Wireframe</span>
              </button>

              <button
                onClick={() => setRotationSpeed((prev) => (prev >= 2 ? 0.5 : prev + 0.5))}
                className="px-2.5 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1 bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                title="Change Orbit Angular Velocity"
              >
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{rotationSpeed}x Orbit Speed</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
