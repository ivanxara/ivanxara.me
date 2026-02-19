"use client";

import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Html, Environment, useTexture, ContactShadows } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowDown, Loader2, Github, Linkedin, Mail, ArrowRight } from "lucide-react";

// --- DATA ---
const journey = [
  { organization: "loba", role: "zoho developer", period: "2023 — present", description: "architecting end-to-end zoho solutions, scripting, and system integrations." },
  { organization: "univ. of aveiro", role: "software dev", period: "2021 — 2023", description: "deep dive into software development fundamentals, databases, and hands-on projects." },
];

const projects = [
  { title: "athlt.link", role: "design & dev", tech: ["nuxt", "vue", "supabase"], image: "https://picsum.photos/id/13/1600/900" },
  { title: "relevoai.com", role: "design & dev", tech: ["next.js", "ai"], image: "https://picsum.photos/id/14/1600/900" },
  { title: "z2g", role: "design & dev", tech: ["next.js", "supabase"], image: "https://picsum.photos/id/15/1600/900" },
  { title: "reidompipas", role: "design & dev", tech: ["next.js", "supabase"], image: "https://picsum.photos/id/16/1600/900" },
];

// --- 3D COMPONENT ---
function LiquidScreen({ hoveredIndex }: { hoveredIndex: number | null }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  const textures = useTexture(projects.map((p) => p.image));
  textures.forEach(t => {
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.repeat.set(1, 1);
  });

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return;

    const targetDistort = hoveredIndex !== null ? 0.05 : 0.4; // Softer wobble for the new style
    const targetOpacity = hoveredIndex !== null ? 1 : 0.8;
    const targetScale = hoveredIndex !== null ? 1.1 : 0.85;
    const lerpSpeed = 0.06;

    materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, lerpSpeed);
    materialRef.current.opacity = THREE.MathUtils.lerp(materialRef.current.opacity, targetOpacity, lerpSpeed);
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), lerpSpeed);

    if (hoveredIndex !== null) {
      materialRef.current.map = textures[hoveredIndex];
      materialRef.current.color = new THREE.Color("white"); 
    } else {
      materialRef.current.map = null;
      materialRef.current.color = new THREE.Color("#18181b"); // Slightly lighter dark metal
    }
    materialRef.current.needsUpdate = true;

    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    const targetRotationX = hoveredIndex !== null ? 0 : Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    const targetRotationY = hoveredIndex !== null ? 0 : Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, lerpSpeed);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, lerpSpeed);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      {/* Softer, slightly rounded plane look via distortion */}
      <planeGeometry args={[8, 4.5, 128, 128]} />
      <MeshDistortMaterial ref={materialRef} envMapIntensity={2} clearcoat={1} clearcoatRoughness={0.2} metalness={0.8} roughness={0.2} speed={1.5} transparent={true} />
    </mesh>
  );
}

function Loader() {
  return <Html center><Loader2 className="w-6 h-6 text-zinc-500 animate-spin" /></Html>;
}

export default function CompletePortfolio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="relative bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* --- 3D CANVAS BACKGROUND --- */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
          <color attach="background" args={["#0a0a0a"]} />
          <Suspense fallback={<Loader />}>
            <Environment preset="city" />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <LiquidScreen hoveredIndex={hoveredIndex} />
            <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={20} blur={3} far={5} color="#000000" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 w-full mix-blend-difference lowercase">
        
        {/* 1. SOFT MINIMALIST HERO */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-700/50 bg-zinc-900/30 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-zinc-300 tracking-tight">available for work</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl font-semibold tracking-tighter text-white"
          >
            ivan xará.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 text-lg md:text-2xl text-zinc-400 font-medium tracking-tight max-w-lg"
          >
            full-stack developer blending clean code with soft, interactive design.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-12 flex flex-col items-center gap-2 text-zinc-500"
          >
             <span className="text-sm font-medium tracking-tight">scroll</span>
             <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.div>

        </section>

        {/* 2. ABOUT SECTION */}
        <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 max-w-6xl mx-auto w-full">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-semibold tracking-tight text-zinc-500 sticky top-32 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-700" /> about
              </h2>
            </div>
            <div className="lg:col-span-8 flex flex-col gap-24">
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl md:text-4xl font-medium leading-tight tracking-tight text-white">
                based in portugal. i build robust digital architectures wrapped in uncompromising, minimalist aesthetics.
              </motion.p>
              
              <div className="flex flex-col border-t border-zinc-800/50">
                {journey.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col md:flex-row justify-between py-8 border-b border-zinc-800/50 group">
                    <div className="flex flex-col gap-1 md:w-1/2">
                      <h3 className="text-2xl font-semibold tracking-tight text-white">{item.organization}</h3>
                      <span className="text-sm font-medium text-zinc-500">{item.role}</span>
                    </div>
                    <div className="flex flex-col md:w-1/2 mt-4 md:mt-0 gap-3">
                      <span className="text-sm font-medium text-zinc-500 bg-zinc-900/50 w-fit px-3 py-1 rounded-full">{item.period}</span>
                      <p className="text-base font-medium text-zinc-400 leading-relaxed">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROJECTS SECTION */}
        <section className="min-h-screen py-32 px-6 md:px-16 lg:px-24 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-500 mb-16 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-zinc-700" /> selected works
            </h2>
            
            <div className="flex flex-col">
              {projects.map((project, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} className="group relative flex flex-col md:flex-row items-start md:items-center justify-between py-10 md:py-14 border-b border-zinc-800/50 cursor-pointer">
                  
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-zinc-600 hidden md:block">0{index + 1}</span>
                    <h3 className="text-4xl md:text-6xl font-semibold tracking-tighter transition-all duration-300 group-hover:translate-x-4 text-white">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-8 mt-6 md:mt-0 opacity-50 group-hover:opacity-100 transition-all duration-300 md:group-hover:-translate-x-4">
                    <div className="flex flex-wrap gap-2 text-sm font-medium text-zinc-400">
                      {project.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/30">{t}</span>
                      ))}
                    </div>
                    <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 hidden md:block" />
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CONTACT SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-32 relative">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex flex-col items-center">
            <h2 className="text-6xl md:text-8xl font-semibold tracking-tighter text-white mb-6">let's talk.</h2>
            <p className="text-xl font-medium text-zinc-400 tracking-tight">got a project in mind? drop me a line.</p>
          </motion.div>
          
          <div className="mt-12 flex items-center gap-4 pointer-events-auto">
            <a href="#" className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900/30 hover:bg-white hover:text-black font-medium transition-all duration-300 flex items-center gap-2">
              <Mail className="w-4 h-4" /> email me
            </a>
            <a href="#" className="p-3 rounded-full border border-zinc-800 bg-zinc-900/30 hover:bg-white hover:text-black transition-all duration-300"><Github className="w-5 h-5" /></a>
            <a href="#" className="p-3 rounded-full border border-zinc-800 bg-zinc-900/30 hover:bg-white hover:text-black transition-all duration-300"><Linkedin className="w-5 h-5" /></a>
          </div>
          
          <p className="absolute bottom-8 text-sm font-medium text-zinc-600 tracking-tight">
            © {new Date().getFullYear()} ivan xará.
          </p>
        </section>

      </div>
    </main>
  );
}