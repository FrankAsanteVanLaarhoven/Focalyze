import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { 
  Brain, RotateCw, ZoomIn, ZoomOut, Zap, Sparkles, 
  Info, ShieldCheck, Activity, Eye, Layers 
} from 'lucide-react';

interface BrainRegion {
  id: string;
  name: string;
  role: string;
  adhdImpact: string;
  color: number;
  position: [number, number, number];
  researchCitation: string;
}

const BRAIN_REGIONS: BrainRegion[] = [
  {
    id: 'dlpfc',
    name: 'Dorsolateral Prefrontal Cortex (DLPFC)',
    role: 'Top-Down Working Memory, Task Prioritization & Executive Inhibit',
    adhdImpact: 'Hypoactivation during prolonged tasks; delayed neurodevelopmental cortical maturation by ~2–3 years.',
    color: 0x6366f1, // Indigo
    position: [0.8, 1.2, 1.4],
    researchCitation: 'Shaw et al. (2007) Attention-deficit/hyperactivity disorder is characterized by a delay in cortical maturation. PNAS.'
  },
  {
    id: 'striatum',
    name: 'Ventral Striatum & Nucleus Accumbens',
    role: 'Dopaminergic Incentive Salience, Motivation & Reward Delay Discounting',
    adhdImpact: 'Steep delay discounting; reduced tonic dopamine transporter (DAT) availability leads to reward deficiency syndrome.',
    color: 0xf59e0b, // Amber
    position: [0.4, 0.1, 0.3],
    researchCitation: 'Volkow et al. (2009) Evaluating dopamine reward pathway in ADHD: clinical implications. JAMA.'
  },
  {
    id: 'amygdala',
    name: 'Amygdala & Limbic Circuitry',
    role: 'Emotional Salience, Rejection Sensitivity Dysphoria (RSD) & Threat Detection',
    adhdImpact: 'Hyper-reactive to perceived social evaluation; impaired top-down inhibition from prefrontal cortex.',
    color: 0xf43f5e, // Rose
    position: [-0.9, -0.4, 0.4],
    researchCitation: 'Surman et al. (2013) Understanding deficient emotional self-regulation in adults with ADHD. Am J Psychiatry.'
  },
  {
    id: 'acc',
    name: 'Anterior Cingulate Cortex (ACC)',
    role: 'Conflict Monitoring, Error Detection & Cognitive Flexibility',
    adhdImpact: 'Reduced error-related negativity (ERN) amplitudes, causing difficulty shifting cognitive sets smoothly.',
    color: 0x14b8a6, // Teal
    position: [0.0, 0.8, 0.8],
    researchCitation: 'Bush et al. (1999) Anterior cingulate cortex dysfunction in ADHD. Biological Psychiatry.'
  }
];

const BrainExplorer3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeRegion, setActiveRegion] = useState<BrainRegion>(BRAIN_REGIONS[0]);
  const [simulationMode, setSimulationMode] = useState<'adhd' | 'optimized'>('adhd');
  const [particleSpeed, setParticleSpeed] = useState<number>(1.2);
  const [isRotating, setIsRotating] = useState<boolean>(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const brainGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const nodeMeshesRef = useRef<{ mesh: THREE.Mesh; region: BrainRegion }[]>([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const width = container.clientWidth;
    const height = 460;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 2, 20);
    pointLight.position.set(3, 4, 3);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0x10b981, 1.5, 20);
    secondaryLight.position.set(-3, -2, -3);
    scene.add(secondaryLight);

    // 3. Brain Group Construction
    const brainGroup = new THREE.Group();
    brainGroupRef.current = brainGroup;
    scene.add(brainGroup);

    // Generate dual cerebral hemispheres using parametric particle geometry
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Hemisphere coordinates with sulci/gyri folds
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Anatomical brain ellipsoid stretching
      const side = Math.random() > 0.5 ? 1 : -1;
      const r = 1.6 + 0.15 * Math.sin(theta * 6) * Math.cos(phi * 4);

      let x = r * Math.sin(phi) * Math.cos(theta) * 0.85 + (side * 0.35);
      let y = r * Math.sin(phi) * Math.sin(theta) * 0.75 + 0.2;
      let z = r * Math.cos(phi) * 1.1;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color gradation (indigo to cyan to purple)
      const color = new THREE.Color();
      if (simulationMode === 'optimized') {
        color.setHSL(0.55 + Math.random() * 0.15, 0.8, 0.65);
      } else {
        color.setHSL(0.75 + Math.random() * 0.15, 0.7, 0.5);
      }
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    particlesRef.current = particles;
    brainGroup.add(particles);

    // 4. Create Key Neural Region Glowing Nodes
    nodeMeshesRef.current = [];
    BRAIN_REGIONS.forEach((region) => {
      const nodeGeom = new THREE.SphereGeometry(0.14, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: region.color,
        emissive: region.color,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeom, nodeMat);
      nodeMesh.position.set(region.position[0], region.position[1], region.position[2]);
      brainGroup.add(nodeMesh);

      // Add radial pulse aura ring around each region node
      const ringGeom = new THREE.RingGeometry(0.18, 0.22, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: region.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.lookAt(camera.position);
      nodeMesh.add(ringMesh);

      nodeMeshesRef.current.push({ mesh: nodeMesh, region });
    });

    // 5. Connective Synaptic Tracts (Curved Beziers connecting DLPFC to Striatum and ACC)
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.8, 1.2, 1.4),   // DLPFC
      new THREE.Vector3(0.0, 0.8, 0.8),   // ACC
      new THREE.Vector3(0.4, 0.1, 0.3),   // Striatum
      new THREE.Vector3(-0.9, -0.4, 0.4)  // Amygdala
    ]);
    const tubeGeom = new THREE.TubeGeometry(curve, 64, 0.03, 8, false);
    const tubeMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.4,
      wireframe: true
    });
    const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
    brainGroup.add(tubeMesh);

    // 6. Interactive Mouse Drag to Orbit
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !brainGroup) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      brainGroup.rotation.y += deltaX * 0.008;
      brainGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 7. Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        brainGroup.rotation.y += 0.004 * particleSpeed;
      }

      // Pulse nodes rhythmically
      nodeMeshesRef.current.forEach(({ mesh, region }) => {
        const scale = 1.0 + 0.15 * Math.sin(elapsedTime * 3 + region.position[0]);
        mesh.scale.set(scale, scale, scale);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [simulationMode, isRotating, particleSpeed]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                <Brain size={12} className="mr-1" /> WebGL 3D Neuroanatomy
              </Badge>
              <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30">
                Dopaminergic Circuit Telemetry
              </Badge>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              Interactive 3D Neurodynamic Brain & Synapse Explorer
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Explore the fronto-striatal circuits governing executive function, dopamine transmission, and attentional focus in ADHD versus neurotypical brain profiles.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant={simulationMode === 'adhd' ? 'default' : 'outline'}
              onClick={() => setSimulationMode('adhd')}
              className={simulationMode === 'adhd' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'border-slate-700 text-slate-300'}
            >
              <Activity size={14} className="mr-1.5" /> ADHD Baseline State
            </Button>
            <Button
              size="sm"
              variant={simulationMode === 'optimized' ? 'default' : 'outline'}
              onClick={() => setSimulationMode('optimized')}
              className={simulationMode === 'optimized' ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'border-slate-700 text-slate-300'}
            >
              <Sparkles size={14} className="mr-1.5" /> Modulated / Flow State
            </Button>
          </div>
        </div>
      </div>

      {/* 3D Viewport + Region Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3D Canvas Box */}
        <Card className="lg:col-span-2 border-slate-800 bg-slate-950 text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
          <CardHeader className="border-b border-slate-800/80 pb-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-200">
                <Layers size={16} className="text-indigo-400" />
                WebGL Neurodynamic Synapse Cloud
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsRotating(!isRotating)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  <RotateCw size={14} className={`mr-1 ${isRotating ? 'animate-spin' : ''}`} />
                  {isRotating ? 'Auto-Orbit On' : 'Orbit Paused'}
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 relative">
            <div 
              ref={mountRef} 
              className="w-full h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center"
            />
            {/* Overlay Instructions */}
            <div className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-md border border-slate-800">
              Drag mouse to rotate 3D view | Pulsing nodes indicate clinical regions of interest
            </div>
          </CardContent>

          <CardFooter className="border-t border-slate-800/80 py-3 bg-slate-900/50 flex flex-wrap justify-between items-center text-xs text-slate-400 gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> DLPFC
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Striatum
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Amygdala
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" /> ACC
              </span>
            </div>
            <span className="font-mono text-[11px] text-emerald-400">
              {simulationMode === 'adhd' ? '⚡ Phasic DA Transporter Reuptake: High' : '✨ Synaptic Tonic Dopamine: Balanced'}
            </span>
          </CardFooter>
        </Card>

        {/* Right Column: Region Inspector & Clinical Evidence */}
        <div className="space-y-4">
          <Card className="border-slate-200 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Eye size={18} className="text-indigo-600" />
                Select Brain Circuit to Inspect
              </CardTitle>
              <CardDescription>
                Click a circuit to examine its neurobiological role and clinical ADHD profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {BRAIN_REGIONS.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setActiveRegion(region)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center ${
                    activeRegion.id === region.id
                      ? 'border-indigo-600 bg-indigo-50/70 font-semibold shadow-sm text-indigo-950'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate pr-2">{region.name}</span>
                  <span 
                    className="w-3 h-3 rounded-full shrink-0" 
                    style={{ backgroundColor: `#${region.color.toString(16).padStart(6, '0')}` }} 
                  />
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Active Region Clinical Detail Card */}
          <Card className="border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 shadow-md">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-bold text-slate-900 leading-snug">
                  {activeRegion.name}
                </CardTitle>
                <Badge variant="outline" className="border-indigo-300 text-indigo-700 bg-indigo-50 text-[10px]">
                  fMRI ROI
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs leading-relaxed text-slate-600">
              <div>
                <strong className="text-slate-800 block mb-0.5">Neurocognitive Function:</strong>
                {activeRegion.role}
              </div>
              <div className="bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/60 text-amber-900">
                <strong className="block mb-0.5 font-semibold">ADHD Neurodevelopmental Pattern:</strong>
                {activeRegion.adhdImpact}
              </div>
              <div className="text-[11px] text-slate-500 border-t pt-2 mt-2">
                <strong className="text-slate-700 block mb-0.5">Peer-Reviewed Evidence:</strong>
                <em>{activeRegion.researchCitation}</em>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default BrainExplorer3D;
