import { useEffect, useState } from "preact/hooks";
import { h } from "preact";
import SearchDemo from "./Search.tsx";

export default function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);

  const totalSlides = 6;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        setCurrentSlide(curr => Math.min(curr + 1, totalSlides - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlide(curr => Math.max(curr - 1, 0));
      }
    };
    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slides = [
    {
      id: "intro",
      content: (
        <div class="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-12 space-y-8 md:space-y-0 slide-in z-10 relative w-full h-full min-h-[60vh] max-w-6xl px-4">
          {/* Stunning Background Vector Mesh */}
          <div class="absolute inset-[-50%] -z-10 flex items-center justify-center opacity-30 pointer-events-none mix-blend-screen" style={{ maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>
             <svg viewBox="0 0 800 800" class="w-full h-full max-w-none opacity-40">
                <g stroke="#22d3ee" stroke-width="0.5" fill="none">
                   <animateTransform attributeName="transform" type="rotate" from="0 400 400" to="360 400 400" dur="120s" repeatCount="indefinite" />
                   {/* 512D Mathematical Space Representation */}
                   <polygon points="400,50 750,250 750,550 400,750 50,550 50,250" stroke-dasharray="4 8" opacity="0.3"/>
                   <polygon points="400,100 650,250 650,450 400,600 150,450 150,250" opacity="0.4"/>
                   <polygon points="400,150 550,250 550,350 400,450 250,350 250,250" stroke-dasharray="2 4" opacity="0.6"/>
                   
                   {/* Matrix Lattice */}
                   <path d="M 400 50 L 400 750 M 50 250 L 750 550 M 50 550 L 750 250" stroke-width="0.2" opacity="0.5"/>
                   
                   {/* Outer Orbits */}
                   <circle cx="400" cy="400" r="100" stroke-dasharray="1 10" stroke-width="2"/>
                   <circle cx="400" cy="400" r="250" stroke-dasharray="2 20" stroke-width="1.5"/>
                   <circle cx="400" cy="400" r="350" stroke-dasharray="5 30" stroke-width="1"/>
                </g>
             </svg>
          </div>

          <div class="flex flex-col items-start w-full md:w-1/2">
             <div class="mb-4">
               <span class="inline-flex items-center space-x-2 py-1.5 px-4 rounded text-zinc-400 text-xs font-mono tracking-[0.2em] uppercase border border-white/5 bg-white/5">
                 <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-80"></div>
                 <span>Architecture Realignment</span>
               </span>
             </div>
             <h1 class="text-5xl md:text-7xl font-light tracking-tight text-white drop-shadow-sm text-left">
               Google Cloud <br/><span class="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-500">Vector Search</span>
             </h1>
             <p class="text-lg font-light text-zinc-400 mt-6 leading-relaxed">
               A state-of-the-art serverless architecture migration transitioning AI workloads away from monolithic constraints. Powered entirely by <span class="text-zinc-200">Google Cloud Run</span> and <span class="text-zinc-200">Firestore</span>.
             </p>
             <div class="mt-8 flex items-center space-x-4 border-t border-white/10 pt-6 w-full">
              <img src="/eric_warriner.jpg" class="w-10 h-10 rounded-full border border-white/10 object-cover" alt="Eric S. Warriner" />
               <div class="flex flex-col">
                  <span class="text-zinc-200 font-medium text-sm">Eric S. Warriner</span>
                  <span class="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Cloud Application Modernization Engineer</span>
               </div>
             </div>
          </div>
          
          <div class="w-full md:w-1/2 flex justify-end">
             <div class="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl w-full max-w-[360px] shadow-[0_0_50px_rgba(0,0,0,0.5)] glow-border-hover relative">
               <div class="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-2xl"></div>
               <h3 class="text-sm font-mono text-zinc-300 mb-5 uppercase tracking-[0.2em] border-b border-white/5 pb-4 relative z-10 flex items-center"><div class="w-2 h-2 rounded bg-cyan-400 mr-2"></div> Agenda</h3>
               <ol class="space-y-3 text-zinc-400 font-light text-[13px] list-decimal list-outside ml-4 marker:text-cyan-600 relative z-10">
                  <li class="pl-2">Strategic Vision & Challenges</li>
                  <li class="pl-2">Vector Geometry Primer</li>
                  <li class="pl-2">Cross-Pillar Architecture & ArcFace</li>
                  <li class="pl-2">Security, Privacy & Compliance</li>
                  <li class="pl-2">Technical Deep Dive & POV</li>
                  <li class="pl-2">Executive Value: CIO / CFO / CPO</li>
                  <li class="pl-2">Implementation Timeline</li>
                  <li class="pl-2 font-semibold text-white">Live Prototype Demo</li>
                  <li class="pl-2">Why Act Now?</li>
               </ol>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: "technical-strategy",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Strategic <span class="text-red-400">Vision</span> & Challenges
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              We face a critical strategic challenge: legacy monolithic databases (like Oracle 23ai) are explicitly bottlenecking highly-agile AI workloads by tangling generic application architecture directly with proprietary database functions.
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row items-stretch gap-6 w-full justify-center mt-8">
             <div class="flex flex-col space-y-4 w-full max-w-sm">
                 <div class="bg-red-950/20 border border-red-500/20 p-5 rounded-xl flex flex-col items-start relative h-1/2">
                   <div class="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                   </div>
                   <h3 class="text-lg font-semibold text-zinc-200 mb-1">Monolithic Bottleneck</h3>
                   <p class="text-xs text-zinc-400 leading-relaxed">Tightly coupled monoliths force massive cross-domain sync delays and lock-in.</p>
                 </div>
                 <div class="bg-red-950/20 border border-red-500/20 p-5 rounded-xl flex flex-col items-start relative h-1/2">
                   <div class="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                   </div>
                   <h3 class="text-lg font-semibold text-zinc-200 mb-1">The FPGA Hardware Trap</h3>
                   <p class="text-xs text-zinc-400 leading-relaxed">Proprietary FPGA machines inherently block the dynamic upgrades necessary to pivot to newer ML models.</p>
                 </div>
             </div>
             
             <div class="flex items-center justify-center px-2 text-zinc-600"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></div>

             <div class="bg-cyan-900/20 border border-cyan-500/30 p-8 rounded-xl w-full max-w-md flex flex-col items-center justify-center text-center space-y-4 relative glow-border-hover shadow-[0_0_20px_rgba(34,211,238,0.1)]">
               <div class="absolute inset-0 bg-cyan-500/5 blur-xl mix-blend-screen animate-pulse pointer-events-none"></div>
               <div class="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 relative z-10 mb-2">
                 <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
               </div>
               <h3 class="text-2xl font-semibold text-zinc-200 relative z-10">Decoupled Serverless Vision</h3>
               <p class="text-sm text-zinc-400 leading-relaxed relative z-10">We propose separating intelligence from storage. By isolating inference workloads strictly to browser-edge devices, we enable "hot-swappable" models that completely bypass static hardware ceilings.</p>
             </div>
          </div>
        </div>
      )
    },
    {
      id: "vector-education",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Vector <span class="text-teal-400">Geometry 101</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              A vector is simply a structured numerical array. By extracting deep visual features from an image and mapping them into 512 numerical dimensions, we can plot them physically. The absolute physical geometric distance between two coordinates dictates their exact visual similarity.
            </p>
          </div>
          
          <div class="w-full max-w-3xl bg-zinc-900/40 p-8 rounded-2xl border border-white/5 relative overflow-hidden glow-border-hover flex flex-col md:flex-row items-center gap-8 shadow-2xl mt-4">
             <div class="absolute inset-0 bg-teal-500/5 blur-3xl mix-blend-screen animate-pulse pointer-events-none"></div>
             
             <div class="flex flex-col items-center space-y-4 z-10 w-1/3">
               <div class="w-24 h-24 rounded-lg bg-zinc-800 border border-teal-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                 <svg viewBox="0 0 24 24" class="w-12 h-12 text-teal-400" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><circle cx="9" cy="9" r="1" fill="currentColor" stroke="none"></circle><circle cx="15" cy="9" r="1" fill="currentColor" stroke="none"></circle></svg>
               </div>
               <div class="font-mono text-[10px] text-teal-400 text-center tracking-widest break-words bg-black/50 p-2 rounded border border-white/5 w-full">
                  [ 0.12,<br/>-0.45,<br/>0.89,<br/>... ]
               </div>
             </div>

             <div class="w-2/3 h-full z-10 border-l border-white/10 pl-8 flex items-center justify-center">
                 <svg viewBox="0 0 200 150" class="w-full h-full max-w-[300px]">
                   {/* Grid Axes */}
                   <line x1="20" y1="130" x2="190" y2="130" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-linecap="round"/>
                   <line x1="20" y1="130" x2="20" y2="10" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-linecap="round"/>
                   <path d="M 185 125 L 190 130 L 185 135 M 15 15 L 20 10 L 25 15" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                   
                   {/* Known Database Points */}
                   <circle cx="160" cy="50" r="3" fill="#64748b"/>
                   <text x="160" y="42" fill="#94a3b8" font-size="5" text-anchor="middle">Unrelated (Far)</text>
                   
                   <circle cx="140" cy="110" r="3" fill="#64748b"/>
                   
                   {/* Closest Database Match */}
                   <circle cx="70" cy="40" r="3" fill="#2dd4bf">
                      <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                   </circle>
                   <text x="70" y="32" fill="#2dd4bf" font-size="5" text-anchor="middle">Nearest Match</text>
                   
                   {/* Target Vector Point Animating onto the graph */}
                   <circle cx="20" cy="130" r="4" fill="#38bdf8">
                     <animate attributeName="cx" values="20;50;50;50;20" dur="8s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="130;70;70;70;130" dur="8s" repeatCount="indefinite" />
                   </circle>

                   {/* Drawing Distance Lines (Fades in when dot arrives) */}
                   <line x1="50" y1="70" x2="70" y2="40" stroke="#2dd4bf" stroke-width="1.5" stroke-dasharray="2 2" opacity="0">
                     <animate attributeName="opacity" values="0;0;1;1;0" dur="8s" repeatCount="indefinite" />
                   </line>
                   <line x1="50" y1="70" x2="160" y2="50" stroke="#64748b" stroke-width="0.5" stroke-dasharray="1 3" opacity="0">
                     <animate attributeName="opacity" values="0;0;1;1;0" dur="8s" repeatCount="indefinite" />
                   </line>
                   
                   <text x="70" y="60" fill="#2dd4bf" font-size="4.5" opacity="0">
                     <animate attributeName="opacity" values="0;0;1;1;0" dur="8s" repeatCount="indefinite" />
                     Lowest Limit Distance
                   </text>
                   
                   <text x="10" y="8" fill="white" font-size="6" font-family="monospace">d₂</text>
                   <text x="195" y="140" fill="white" font-size="6" font-family="monospace">d₁</text>
                 </svg>
             </div>
          </div>
        </div>
      )
    },
    {
      id: "architecture",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-6xl space-y-12 slide-in px-4 mt-8">
          <div class="text-center space-y-4">
            <h2 onClick={() => setShowSpeakerNotes(true)} class="text-2xl md:text-4xl font-semibold text-white tracking-tight cursor-pointer group flex items-center justify-center space-x-2">
              <span>Cross-Pillar <span class="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">Solution Architecture</span></span>
              <span class="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-500 bg-white/5 rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-mono border border-white/10" title="Speaker Notes">i</span>
            </h2>
            <p class="text-zinc-400 font-light max-w-2xl mx-auto">Bridging two distinct technical domains: highly-distributed <span class="text-white">Application Modernization</span> on the edge seamlessly integrating into <span class="text-white">Data &amp; AI</span> in the Cloud.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative">
            
            {/* Background connection line for desktop */}
            <div class="hidden md:block absolute top-[28%] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-blue-500/20 via-cyan-400/30 to-purple-500/20 z-0"></div>

            {/* Phase 1: Client ML Inference */}
            <div class="flex flex-col p-8 rounded-xl transition-all duration-500 hover:-translate-y-1 border border-white/10 bg-zinc-900/40 backdrop-blur-sm group glow-border-hover relative overflow-hidden z-10">
              <div class="absolute top-0 right-0 bg-blue-500/20 text-blue-200 text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded-bl-lg">Domain 1: App Mod</div>
              <div class="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors delay-100 mix-blend-screen rounded-xl blur-xl"></div>
              <div class="h-14 w-14 border border-white/10 rounded-xl flex items-center justify-center mb-6 mt-4 bg-black text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all relative">
                 <svg viewBox="0 0 50 50" class="w-8 h-8">
                   {/* Browser/Client outline */}
                   <rect x="5" y="10" width="40" height="30" rx="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
                   <line x1="5" y1="18" x2="45" y2="18" stroke="currentColor" stroke-width="1.5"/>
                   <circle cx="10" cy="14" r="1" fill="currentColor"/>
                   {/* Face / ML Scan */}
                   <g transform="translate(15, 22)">
                      <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-dasharray="2 2" stroke-width="1">
                        <animateTransform attributeName="transform" type="rotate" from="0 10 10" to="360 10 10" dur="4s" repeatCount="indefinite"/>
                      </circle>
                      <path d="M 7 10 L 13 10 M 10 7 L 10 13" stroke="currentColor" stroke-width="1"/>
                   </g>
                   {/* Scanning Laser */}
                   <line x1="5" y1="20" x2="45" y2="20" stroke="#60a5fa" stroke-width="1.5" opacity="0.8">
                     <animate attributeName="y1" values="20;38;20" dur="2s" repeatCount="indefinite"/>
                     <animate attributeName="y2" values="20;38;20" dur="2s" repeatCount="indefinite"/>
                   </line>
                 </svg>
              </div>
              <h3 class="text-lg font-semibold text-zinc-100 mb-2 tracking-wide z-10">Client ML Inference</h3>
              <p class="text-zinc-400 text-sm leading-relaxed z-10">
                Generating precise 512-dimensional identity embeddings locally in the browser leveraging ArcFace ResNet-100 via ONNX WebAssembly.
              </p>
            </div>

            {/* Phase 2: Serverless Compute */}
            <div class="flex flex-col p-8 rounded-xl transition-all duration-500 hover:-translate-y-1 border border-white/10 bg-zinc-900/40 backdrop-blur-sm group glow-border-hover relative overflow-hidden z-10">
              <div class="absolute top-0 right-0 bg-cyan-500/20 text-cyan-200 text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded-bl-lg">Domain 1: App Mod</div>
              <div class="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors delay-100 mix-blend-screen rounded-xl blur-xl"></div>
              <div class="h-14 w-14 border border-white/10 rounded-xl flex items-center justify-center mb-6 mt-4 bg-black text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all relative">
                <svg viewBox="0 0 50 50" class="w-8 h-8">
                  {/* Floating Edge Nodes */}
                  <circle cx="10" cy="25" r="2" fill="currentColor"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
                  <circle cx="40" cy="15" r="2" fill="currentColor"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" repeatCount="indefinite"/></circle>
                  <circle cx="40" cy="35" r="2" fill="currentColor"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" repeatCount="indefinite"/></circle>
                  {/* Neural Hub */}
                  <path d="M 25 25 L 10 25 M 25 25 L 40 15 M 25 25 L 40 35" stroke="currentColor" stroke-width="1" stroke-dasharray="2 2" opacity="0.5">
                     <animate attributeName="stroke-dashoffset" values="4;0" dur="0.5s" repeatCount="indefinite" />
                  </path>
                  <path d="M 22 15 L 28 25 L 20 25 L 28 35" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round">
                     <animate attributeName="stroke" values="#22d3ee;#fff;#22d3ee" dur="2s" repeatCount="indefinite"/>
                  </path>
                  <circle cx="25" cy="25" r="10" fill="none" stroke="currentColor" stroke-width="0.5">
                     <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite"/>
                     <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-zinc-100 mb-2 tracking-wide z-10">Serverless Compute</h3>
              <p class="text-zinc-400 text-sm leading-relaxed z-10">
                Google Cloud Run executing elastically at scale, replacing heavy legacy middleware with a streamlined TypeScript container architecture.
              </p>
            </div>

            {/* Phase 3: Cloud Firestore */}
            <div class="flex flex-col p-8 rounded-xl transition-all duration-500 hover:-translate-y-1 border border-white/10 bg-zinc-900/40 backdrop-blur-sm group glow-border-hover relative overflow-hidden z-10">
              <div class="absolute top-0 right-0 bg-purple-500/20 text-purple-200 text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded-bl-lg">Domain 2: Data &amp; AI</div>
              <div class="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors delay-100 mix-blend-screen rounded-xl blur-xl"></div>
              <div class="h-14 w-14 border border-white/10 rounded-xl flex items-center justify-center mb-6 mt-4 bg-black text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all relative">
                <svg viewBox="0 0 50 50" class="w-8 h-8">
                  {/* Cloud Database Stacks */}
                  <ellipse cx="25" cy="15" rx="14" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M 11 15 V 35 M 39 15 V 35" stroke="currentColor" stroke-width="1.5" fill="none"/>
                  <ellipse cx="25" cy="25" rx="14" ry="4" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
                  <ellipse cx="25" cy="35" rx="14" ry="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
                  
                  {/* Flowing Data queries */}
                  <path d="M 25 15 L 25 35" stroke="currentColor" stroke-width="2" stroke-dasharray="2 6">
                     <animate attributeName="stroke-dashoffset" values="8;0" dur="0.8s" repeatCount="indefinite"/>
                  </path>
                  <circle cx="25" cy="35" r="2" fill="currentColor">
                    <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="indefinite"/>
                  </circle>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-zinc-100 mb-2 tracking-wide z-10">Cloud Firestore</h3>
              <p class="text-zinc-400 text-sm leading-relaxed z-10">
                Executing rapid <code class="bg-black border border-white/5 px-1.5 py-0.5 rounded text-xs text-zinc-300 font-mono">findNearest</code> vector queries directly on Google Cloud to locate highly exact matches.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "arcface-model",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Enterprise Identity via <span class="text-cyan-400">ArcFace</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              We leverage State-of-the-Art Additive Angular Margin Loss (ArcFace) to project faces into a massively distinct 512-dimensional hypersphere, natively isolated within the browser.
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-12 w-full justify-center">
            {/* Animated SVG Graphic */}
            <div class="w-64 h-64 relative flex items-center justify-center bg-black/40 rounded-full border border-white/5 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
              <svg viewBox="0 0 100 100" class="w-3/4 h-3/4 text-cyan-400">
                {/* Orbital Rings */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 4">
                  <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.5">
                  <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="15s" repeatCount="indefinite"/>
                </circle>
                
                {/* Minimalist Face Node */}
                <path d="M 40 45 Q 43 42 45 45 M 55 45 Q 57 42 60 45" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M 40 55 Q 50 65 60 55" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                
                {/* Projecting Vectors */}
                <g stroke="currentColor" stroke-width="0.5" stroke-opacity="0.8">
                  <line x1="50" y1="50" x2="80" y2="20"><animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" /></line>
                  <line x1="50" y1="50" x2="20" y2="80"><animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2.5s" repeatCount="indefinite" /></line>
                  <line x1="50" y1="50" x2="15" y2="35"><animate attributeName="stroke-dasharray" values="0,100;100,0" dur="1.8s" repeatCount="indefinite" /></line>
                  <line x1="50" y1="50" x2="85" y2="65"><animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2.2s" repeatCount="indefinite" /></line>
                </g>
                <circle cx="50" cy="50" r="1.5" fill="white" />
              </svg>
              <div class="absolute inset-0 bg-cyan-400/20 blur-2xl rounded-full mix-blend-screen animate-pulse"></div>
            </div>

            <div class="flex flex-col space-y-6 max-w-md">
              <div class="bg-zinc-900/50 p-6 rounded-xl border border-white/5 glow-border-hover">
                <h4 class="text-white font-semibold flex items-center space-x-2"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 block"></span><span>ResNet-100 Architecture</span></h4>
                <p class="text-zinc-400 text-sm mt-2">Deeper mathematical extraction than MobileNet, ignoring lighting, angle, or accessories to strictly match facial bone alignment and distance.</p>
              </div>
              <div class="bg-zinc-900/50 p-6 rounded-xl border border-white/5 glow-border-hover">
                <h4 class="text-white font-semibold flex items-center space-x-2"><span class="w-1.5 h-1.5 rounded-full bg-cyan-400 block"></span><span>512-Dimensional Accuracy</span></h4>
                <p class="text-zinc-400 text-sm mt-2">Yields mathematically undeniable Euclidean distance similarities, shrinking false-positive boundaries completely natively in your RAM.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "architecture-pitch",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Future-Proof by <span class="text-purple-400">Design</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Escape the hardware trap. Proprietary FPGA machines rigidly lock you into outdated machine learning chips. This decentralized edge-cloud architecture abstracts intelligence entirely into software.
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-12 w-full justify-center mt-8">
            <div class="flex flex-col space-y-6 max-w-md">
              <div class="bg-zinc-900/50 p-6 rounded-xl border border-white/5 glow-border-hover">
                <h4 class="text-white font-semibold flex items-center space-x-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400 block"></span><span>Instant Model Hot-Swapping</span></h4>
                <p class="text-zinc-400 text-sm mt-2">When a new breakthrough LLM or Vision model releases next week, simply replace the Hugging Face URI. Zero hardware required. Instant iteration.</p>
              </div>
              <div class="bg-zinc-900/50 p-6 rounded-xl border border-white/5 glow-border-hover">
                <h4 class="text-white font-semibold flex items-center space-x-2"><span class="w-1.5 h-1.5 rounded-full bg-purple-400 block"></span><span>Containerized Scale</span></h4>
                <p class="text-zinc-400 text-sm mt-2">Deno Fresh deployed to Google Cloud Run scales to a million hits instantly. Forget ordering physical server racks—let serverless infrastructure auto-scale your demands globally.</p>
              </div>
            </div>

            {/* Animated SVG Graphic */}
            <div class="w-64 h-64 relative flex items-center justify-center bg-black/40 rounded-xl border border-white/5 shadow-[0_0_40px_rgba(192,132,252,0.1)] overflow-hidden">
              <svg viewBox="0 0 100 100" class="w-full h-full text-purple-400 absolute inset-0">
                {/* Background Grid */}
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="0.5"/>
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Cloud Hub */}
                <path d="M 30 50 Q 30 35 45 35 Q 50 25 65 30 Q 75 35 75 50 Q 80 60 65 60 L 35 60 Q 20 60 30 50 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                
                {/* Animated Model Swapping Box */}
                <g>
                  {/* The Box */}
                  <rect x="40" y="70" width="20" height="15" rx="2" fill="none" stroke="#22d3ee" stroke-width="1" />
                  <path d="M 45 77 L 55 77 M 45 80 L 52 80" stroke="#22d3ee" stroke-width="0.5" stroke-linecap="round" />
                  
                  {/* Animation for the box floating up into the cloud */}
                  <animateTransform attributeName="transform" type="translate" values="0,20; 0,-30; 0,20" keyTimes="0; 0.5; 1" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0; 1; 0" keyTimes="0; 0.5; 1" dur="4s" repeatCount="indefinite" />
                </g>

                {/* Data streaming lines */}
                <line x1="50" y1="20" x2="50" y2="10" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2">
                  <animate attributeName="stroke-dashoffset" values="4;0" dur="0.5s" repeatCount="indefinite"/>
                </line>
                <line x1="40" y1="25" x2="35" y2="15" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2">
                  <animate attributeName="stroke-dashoffset" values="4;0" dur="0.5s" repeatCount="indefinite"/>
                </line>
                <line x1="60" y1="25" x2="65" y2="15" stroke="currentColor" stroke-width="0.5" stroke-dasharray="2 2">
                  <animate attributeName="stroke-dashoffset" values="4;0" dur="0.5s" repeatCount="indefinite"/>
                </line>
              </svg>
              <div class="absolute inset-0 bg-purple-400/10 blur-xl mix-blend-screen animate-pulse"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "privacy-gdpr",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Zero-Trust <span class="text-emerald-400">Privacy Model</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Because inference runs completely locally via ONNX WebAssembly, raw facial imagery never leaves the device. Only an irreversible mathematical matrix is transmitted. Full GDPR Compliance natively built-in.
            </p>
          </div>
          
          <div class="w-full max-w-3xl bg-zinc-900/50 p-8 rounded-2xl border border-emerald-500/10 shadow-[0_0_40px_rgba(16,185,129,0.05)] text-center relative overflow-hidden">
            <svg viewBox="0 0 200 100" class="w-full h-40 text-emerald-400 z-10 relative">
               {/* Laptop */}
               <rect x="20" y="30" width="40" height="30" rx="2" fill="none" stroke="white" stroke-width="2"/>
               <line x1="10" y1="65" x2="70" y2="65" stroke="white" stroke-width="3" stroke-linecap="round"/>
               {/* Image locked in laptop */}
               <circle cx="40" cy="45" r="8" fill="none" stroke="currentColor" stroke-width="1.5">
                  <animate attributeName="r" values="8;9;8" dur="2s" repeatCount="indefinite" />
               </circle>
               <path d="M35 55 Q 40 50 45 55" stroke="currentColor" stroke-width="1.5" fill="none"/>
               
               {/* Vector transmission */}
               <g stroke-dasharray="2 4" stroke="currentColor" stroke-width="1.5">
                  <path d="M 60 45 L 140 45" fill="none">
                    <animate attributeName="stroke-dashoffset" values="6;0" dur="0.5s" repeatCount="indefinite" />
                  </path>
               </g>
               <text x="100" y="38" fill="currentColor" font-size="6" font-family="monospace" text-anchor="middle" letter-spacing="2">[ 0.12, -0.4, 0.99 ... ]</text>

               {/* Secure Cloud DB */}
               <path d="M 140 50 Q 140 35 155 35 Q 160 25 175 30 Q 185 35 185 50 Q 190 60 175 60 L 145 60 Q 130 60 140 50 Z" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" />
               <rect x="155" y="40" width="16" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
               <path d="M 160 40 V 35 A 3 3 0 0 1 166 35 V 40" fill="none" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <div class="absolute inset-0 bg-emerald-400/5 blur-3xl rounded-full mix-blend-screen animate-pulse"></div>
          </div>
        </div>
      )
    },
    {
      id: "tco-slide",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Total Cost of Ownership <span class="text-amber-400">(TCO)</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Say goodbye to $500,000 FPGA racks and Oracle Enterprise licensing. Google Cloud Run scales perfectly to zero when unutilized, dropping your idle infrastructure cost down to nothing.
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-12 w-full justify-center">
             <div class="flex flex-col items-center p-6 bg-red-950/20 border border-red-500/20 rounded-xl relative opacity-50">
                <svg viewBox="0 0 100 100" class="w-32 h-32 text-red-500">
                   <rect x="20" y="20" width="60" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
                   <rect x="25" y="25" width="5" height="5" fill="currentColor"><animate attributeName="opacity" values="1;0.2;1" dur="1s" repeatCount="indefinite"/></rect>
                   <rect x="20" y="40" width="60" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
                   <rect x="25" y="45" width="5" height="5" fill="currentColor"/>
                   <rect x="20" y="60" width="60" height="15" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
                   <rect x="25" y="65" width="5" height="5" fill="currentColor"/>
                   <line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" stroke-width="3"/>
                </svg>
                <div class="mt-4 font-mono text-xs uppercase tracking-widest text-red-400">On-Prem FPGA</div>
             </div>
             <div class="text-zinc-600 font-light text-2xl">vs</div>
             <div class="flex flex-col items-center p-6 bg-amber-900/10 border border-amber-500/30 rounded-xl glow-border-hover relative">
               <div class="absolute inset-0 bg-amber-400/5 blur-xl mix-blend-screen animate-pulse"></div>
                <svg viewBox="0 0 100 100" class="w-32 h-32 text-amber-400">
                   <path d="M 30 60 Q 30 40 45 40 Q 50 25 65 30 Q 75 35 75 50 Q 85 60 70 70 L 35 70 Q 20 70 30 60 Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="200" stroke-dashoffset="0">
                      <animate attributeName="stroke-dashoffset" values="200;0" dur="3s" repeatCount="indefinite"/>
                   </path>
                   <text x="50" y="55" fill="currentColor" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">$0.00</text>
                   <text x="50" y="65" fill="currentColor" font-size="4" font-family="monospace" text-anchor="middle" opacity="0.6">IDLE COST</text>
                </svg>
                <div class="mt-4 font-mono text-xs uppercase tracking-widest text-amber-400">Serverless Run</div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: "code-splitting",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Proof of <span class="text-blue-400">Simplicity</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed">
              In legacy infrastructure, querying similarities required hundreds of lines of custom Python drivers parsing data from specialized FPGA servers. 
              <br/><br/>
              By natively integrating with Google Cloud SDK on the edge, the entire enterprise vector search executes entirely securely within just 5 standard parameters. No custom hardware mappings required.
            </p>
          </div>
          
          <div class="w-full max-w-3xl bg-[#0d1117] p-8 rounded-xl border border-white/10 shadow-2xl relative group mt-4">
            <div class="absolute right-4 top-4 text-[10px] font-mono text-cyan-400 uppercase tracking-widest border border-cyan-400/20 bg-cyan-400/10 py-1.5 px-3 rounded z-10">Edge Function</div>
            <div class="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-600 rounded-l-xl"></div>
            <pre class="text-xs md:text-sm font-mono text-slate-300 leading-loose overflow-x-auto pt-6 pb-2">
              <code class="block">
<span class="text-purple-400">const</span> results = <span class="text-purple-400">await</span> imagesColl.<span class="text-blue-300">findNearest</span>({`{`}
  <span class="text-slate-400">vectorField</span>: <span class="text-green-300">"embedding_vector"</span>,
  <span class="text-slate-400">queryVector</span>: FieldValue.<span class="text-blue-300">vector</span>(data.vector),
  <span class="text-slate-400">limit</span>: <span class="text-orange-300">250</span>,
  <span class="text-slate-400">distanceMeasure</span>: <span class="text-green-300">"EUCLIDEAN"</span>,
  <span class="text-slate-400">distanceThreshold</span>: tolerance,
{`}`} ).<span class="text-blue-300">get</span>();

<span class="text-slate-500 italic">// 0 Server Scaling. 0 Matrix Math Required. PURE VELOCITY.</span>
              </code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: "vector-synthesis",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Relational + Vector <span class="text-indigo-400">Synthesis</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Legacy infrastructure suffers devastating latency attempting to intersect strict relational metadata (Age, Gender) with massive AI matrices via isolated table-scans. Google Firestore flawlessly intertwines relational trees deeply inside the native Vector Index.
            </p>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-12 w-full justify-center mt-8">
            <div class="flex flex-col max-w-sm space-y-6">
               <div class="p-6 bg-zinc-900/50 rounded-xl border border-white/5 glow-border-hover">
                   <h4 class="font-bold text-white flex items-center mb-2"><div class="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></div>Traditional SQL</h4>
                   <p class="text-xs text-zinc-400 font-mono">WHERE age &gt; 40 AND gender = 'M'</p>
               </div>
               <div class="flex justify-center text-zinc-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4"></path></svg></div>
               <div class="p-6 bg-zinc-900/50 rounded-xl border border-white/5 glow-border-hover">
                   <h4 class="font-bold text-white flex items-center mb-2"><div class="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2"></div>Vector Proximity</h4>
                   <p class="text-xs text-zinc-400 font-mono">ORDER BY distance(embedding) ASC</p>
               </div>
            </div>

            <div class="w-72 h-72 relative flex items-center justify-center bg-black/40 rounded-full border border-white/5 shadow-[0_0_50px_rgba(99,102,241,0.15)]">
               <svg viewBox="0 0 100 100" class="w-3/4 h-3/4">
                 {/* SQL Grid mapping */}
                 <pattern id="sqlGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                   <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(59,130,246,0.3)" stroke-width="0.5"/>
                 </pattern>
                 <rect x="10" y="10" width="40" height="40" fill="url(#sqlGrid)">
                   <animate attributeName="x" values="10;20;10" dur="4s" repeatCount="indefinite"/>
                 </rect>
                 
                 {/* Vector Network overlapping */}
                 <g stroke="#22d3ee" stroke-width="0.5" fill="none" opacity="0.8">
                   <polygon points="50,20 80,40 70,80 30,70" stroke-dasharray="2 2" />
                   <circle cx="50" cy="20" r="1.5" fill="#22d3ee"/>
                   <circle cx="80" cy="40" r="1.5" fill="#22d3ee"/>
                   <circle cx="70" cy="80" r="1.5" fill="#22d3ee"/>
                   <circle cx="30" cy="70" r="1.5" fill="#22d3ee"/>
                 </g>

                 {/* Convergence Core */}
                 <circle cx="45" cy="45" r="8" fill="none" stroke="#818cf8" stroke-width="1.5">
                   <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
                 </circle>
                 <circle cx="45" cy="45" r="2" fill="#818cf8">
                   <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
                 </circle>
                 
                 {/* Convergence rays */}
                 <path d="M 25 25 L 40 40 M 65 30 L 50 45 M 50 70 L 45 55 M 25 60 L 40 50" stroke="#818cf8" stroke-width="1" stroke-dasharray="2 4">
                    <animate attributeName="stroke-dashoffset" values="6;0" dur="1s" repeatCount="indefinite"/>
                 </path>
               </svg>
               <div class="absolute inset-0 bg-indigo-500/10 blur-2xl rounded-full mix-blend-screen animate-pulse"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "data-flow",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-6xl space-y-12 slide-in px-4">
           <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Deep Dive: <span class="text-fuchsia-400">Simulated POV</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              We simulate a Proof of Value for the secure API integration. Addressing critical security constraints directly, this interactive telemetry traces how we completely isolate biometric data before it ever hits the database.
            </p>
          </div>

          <div class="w-full h-40 bg-zinc-900/40 rounded-2xl border border-white/5 relative flex items-center justify-around px-12 shadow-2xl overflow-hidden glow-border-hover">
             {/* Background glowing line */}
             <div class="absolute left-10 right-10 h-[1px] bg-zinc-800 top-1/2 -translate-y-1/2"></div>
             
             {/* Animated Payload Node riding the line */}
             <div class="absolute w-6 h-2 bg-fuchsia-400 shadow-[0_0_15px_#e879f9] rounded-full top-[calc(50%-4px)] z-20">
               <animate attributeName="left" values="10%; 90%; 10%" dur="6s" repeatCount="indefinite" />
             </div>

             {/* 1. Client Browser */}
             <div class="z-10 flex flex-col items-center relative bg-[#050505] p-2 rounded-full ring-4 ring-[#050505]">
                <div class="w-16 h-16 rounded-full border border-fuchsia-400/30 flex items-center justify-center bg-fuchsia-400/5">
                   <svg viewBox="0 0 24 24" class="w-8 h-8 text-fuchsia-400" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div class="mt-4 text-[10px] uppercase tracking-widest font-mono text-zinc-400 text-center">Web Client<br/><span class="text-fuchsia-400">WebGL ONNX</span></div>
             </div>

             {/* 2. Abstract Payload */}
             <div class="z-10 flex flex-col items-center relative bg-[#050505] p-2 rounded-full ring-4 ring-[#050505]">
                <div class="w-16 h-16 rounded-full border border-blue-400/30 flex items-center justify-center bg-blue-400/5">
                   <span class="text-blue-400 font-mono text-xl font-bold">[ ]</span>
                </div>
                <div class="mt-4 text-[10px] uppercase tracking-widest font-mono text-zinc-400 text-center">Irreversible Matrix<br/><span class="text-blue-400">2KB Vector</span></div>
             </div>

             {/* 3. Deno Edge / Load Balancer */}
             <div class="z-10 flex flex-col items-center relative bg-[#050505] p-2 rounded-full ring-4 ring-[#050505]">
                <div class="w-16 h-16 rounded-full border border-teal-400/30 flex items-center justify-center bg-teal-400/5">
                   <svg viewBox="0 0 24 24" class="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div class="mt-4 text-[10px] uppercase tracking-widest font-mono text-zinc-400 text-center">Deno Edge<br/><span class="text-teal-400">Global Firewall</span></div>
             </div>

             {/* 4. Google Cloud Target */}
             <div class="z-10 flex flex-col items-center relative bg-[#050505] p-2 rounded-full ring-4 ring-[#050505]">
                <div class="w-16 h-16 rounded-full border border-cyan-400/30 flex items-center justify-center bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                   <svg viewBox="0 0 24 24" class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                </div>
                <div class="mt-4 text-[10px] uppercase tracking-widest font-mono text-zinc-400 text-center">Firestore<br/><span class="text-cyan-400">Native Execution</span></div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: "business-value",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-7xl space-y-10 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Executive <span class="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">Value Realization</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Quantifying the measurable impact across three executive lenses.
            </p>
          </div>
          
          <div class="w-full flex flex-col md:flex-row items-stretch gap-5 relative mt-2">
             {/* CIO Panel */}
             <div class="w-full md:w-1/3 bg-zinc-900/60 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
               <div class="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
               <h3 class="text-white text-xl font-bold mb-5 flex items-center relative z-10"><span class="bg-blue-500/20 text-blue-400 px-2.5 py-1 rounded text-xs font-mono mr-3 tracking-widest">CIO</span> Stability</h3>
               
               <ul class="space-y-5 text-zinc-400 relative z-10">
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">GDPR Compliance</h4><p class="text-xs leading-relaxed">Biometric data never leaves the browser. Zero regulatory exposure.</p></div>
                  </div>
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">99.999% SLA</h4><p class="text-xs leading-relaxed">Multi-region failover across continent zones automatically.</p></div>
                  </div>
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-blue-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">Zero-Downtime DR</h4><p class="text-xs leading-relaxed">No single point of failure. Edge clusters self-heal globally.</p></div>
                  </div>
               </ul>
             </div>

             {/* CFO Panel */}
             <div class="w-full md:w-1/3 bg-zinc-900/60 border border-emerald-500/10 rounded-2xl p-6 relative overflow-hidden group">
               <div class="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors"></div>
               <h3 class="text-white text-xl font-bold mb-5 flex items-center relative z-10"><span class="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded text-xs font-mono mr-3 tracking-widest">CFO</span> Financials</h3>
               
               <ul class="space-y-5 text-zinc-400 relative z-10">
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">CapEx → OpEx Shift</h4><p class="text-xs leading-relaxed">Converts $500K+ capital hardware purchases to pay-per-query consumption billing.</p></div>
                  </div>
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">License Elimination</h4><p class="text-xs leading-relaxed">Oracle DB licensing (~$47.5K/processor/yr) replaced by Firestore with zero seat fees.</p></div>
                  </div>
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">Zero Depreciation</h4><p class="text-xs leading-relaxed">No 3-5 year FPGA hardware lifecycle. Cloud assets never land on the balance sheet.</p></div>
                  </div>
               </ul>
             </div>

             {/* CPO Panel */}
             <div class="w-full md:w-1/3 bg-zinc-900/60 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
               <div class="absolute inset-0 bg-amber-500/5 group-hover:bg-amber-500/10 transition-colors"></div>
               <h3 class="text-white text-xl font-bold mb-5 flex items-center relative z-10"><span class="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded text-xs font-mono mr-3 tracking-widest">CPO</span> Agility</h3>
               
               <ul class="space-y-5 text-zinc-400 relative z-10">
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-amber-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">Speed to Market</h4><p class="text-xs leading-relaxed">Skip 6-month hardware procurement. Ship features in days, not quarters.</p></div>
                  </div>
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-amber-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">Competitive Edge</h4><p class="text-xs leading-relaxed">Hot-swap to the latest ML models from HuggingFace instantly. No hardware refresh.</p></div>
                  </div>
                  <div class="flex items-start">
                     <svg class="w-5 h-5 text-amber-400 mr-3 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                     <div><h4 class="text-zinc-200 font-semibold text-sm mb-0.5">Revenue Unlock</h4><p class="text-xs leading-relaxed">Sub-100ms semantic search directly lifts conversion rates and user engagement.</p></div>
                  </div>
               </ul>
             </div>
          </div>
        </div>
      )
    },
    {
      id: "implementation-timeline",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Implementation <span class="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">Timeline & Plan</span>
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Migrating from Oracle to Google Serverless is mapped aggressively into a 6-week technical schedule.
            </p>
          </div>

          <div class="w-full max-w-3xl flex flex-col space-y-4 relative mt-8">
             <div class="absolute left-[38px] top-4 bottom-4 w-[2px] bg-zinc-800 z-0"></div>
             
             {/* Phase 1 */}
             <div class="flex items-center space-x-6 relative z-10 w-full group">
               <div class="w-20 font-mono text-xs text-zinc-500 text-right shrink-0">Wk 1-2</div>
               <div class="w-6 h-6 rounded-full bg-black border-2 border-indigo-400 shrink-0 shadow-[0_0_15px_rgba(129,140,248,0.4)] flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-indigo-400"/></div>
               <div class="bg-zinc-900/80 border border-white/5 p-5 rounded-xl w-full group-hover:border-indigo-400/30 transition-colors">
                 <h4 class="text-white font-bold mb-1">Phase 1: Cloud Foundation & Target Analysis</h4>
                 <p class="text-sm text-zinc-400 leading-relaxed">Provision Google Cloud Project schemas, deploy isolated Deno mock endpoints, and validate ML edge integration architecture constraints.</p>
               </div>
             </div>

             {/* Phase 2 */}
             <div class="flex items-center space-x-6 relative z-10 w-full group">
               <div class="w-20 font-mono text-xs text-zinc-500 text-right shrink-0">Wk 3-5</div>
               <div class="w-6 h-6 rounded-full bg-black border-2 border-cyan-400 shrink-0 flex items-center justify-center"><div class="w-2 h-2 rounded-full bg-cyan-400"/></div>
               <div class="bg-zinc-900/80 border border-white/5 p-5 rounded-xl w-full group-hover:border-cyan-400/30 transition-colors">
                 <h4 class="text-white font-bold mb-1">Phase 2: Database Migration & Vector Seeding</h4>
                 <p class="text-sm text-zinc-400 leading-relaxed">Map monolithic Oracle relational tables to Firestore, batch-generate 512D ArcFace matrices via bulk seeder workers, and verify strict index integrity.</p>
               </div>
             </div>

             {/* Phase 3 */}
             <div class="flex items-center space-x-6 relative z-10 w-full group">
               <div class="w-20 font-mono text-xs text-emerald-500 text-right shrink-0 font-bold tracking-widest">WK 6</div>
               <div class="w-6 h-6 rounded-full bg-black border-2 border-emerald-400 shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.4)]">
                 <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
               </div>
               <div class="bg-emerald-900/10 border border-emerald-500/30 p-5 rounded-xl w-full">
                 <h4 class="text-emerald-400 font-bold mb-1">Phase 3: UAT & Production Cut-over</h4>
                 <p class="text-sm text-emerald-100/60 leading-relaxed">Execute User Acceptance Testing against the shadow index, seamlessly switch global DNS traffic routing to the Edge Load Balancer, and officially decommission idle Oracle hardware.</p>
               </div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: "demo",
      content: (
        <div class="w-full h-full flex items-center justify-center slide-in px-2 md:px-0 pt-0">
          <SearchDemo />
        </div>
      ),
    },
    {
      id: "why-now",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-5xl space-y-12 slide-in px-4">
          <div class="text-center space-y-4">
            <h2 class="text-3xl md:text-5xl font-semibold text-white tracking-tight">
              Why Act <span class="text-red-400">Now</span>?
            </h2>
            <p class="text-lg text-zinc-400 max-w-2xl mx-auto font-light">
              Every quarter of delay compounds technical debt, increases migration risk, and surrenders competitive ground.
            </p>
          </div>

          <div class="w-full max-w-3xl flex flex-col space-y-5 mt-4">
             <div class="bg-red-950/20 border border-red-500/20 p-6 rounded-xl flex items-start space-x-5 group hover:border-red-500/40 transition-colors">
                <div class="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <svg class="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 class="text-white font-bold text-lg mb-1">Legacy Support Lifecycle Closing</h4>
                  <p class="text-sm text-zinc-400 leading-relaxed">Oracle 23ai extended support and FPGA firmware update windows are narrowing. Migrating proactively avoids emergency cut-overs under deadline pressure with zero runway for testing.</p>
                </div>
             </div>

             <div class="bg-amber-950/20 border border-amber-500/20 p-6 rounded-xl flex items-start space-x-5 group hover:border-amber-500/40 transition-colors">
                <div class="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                  <svg class="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 class="text-white font-bold text-lg mb-1">Compounding Cost of Delay</h4>
                  <p class="text-sm text-zinc-400 leading-relaxed">Every month on legacy infrastructure burns ~$42K in idle Oracle licensing plus FPGA power and cooling costs that serverless completely eliminates from day one.</p>
                </div>
             </div>

             <div class="bg-cyan-950/20 border border-cyan-500/20 p-6 rounded-xl flex items-start space-x-5 group hover:border-cyan-500/40 transition-colors">
                <div class="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                  <svg class="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <div>
                  <h4 class="text-white font-bold text-lg mb-1">Competitors Are Already Moving</h4>
                  <p class="text-sm text-zinc-400 leading-relaxed">Vector search is becoming table stakes. Organizations that modernize now capture first-mover advantage in AI-native product experiences while laggards are still procuring hardware.</p>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: "closing",
      content: (
        <div class="flex flex-col items-center justify-center w-full max-w-4xl space-y-10 slide-in px-4 relative min-h-[60vh]">
          {/* Animated background constellation */}
          <div class="absolute inset-[-30%] -z-10 flex items-center justify-center opacity-25 pointer-events-none" style={{ maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)', WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)' }}>
            <svg viewBox="0 0 400 400" class="w-full h-full max-w-none">
              {/* Pulsing connection nodes */}
              <g fill="none">
                {/* Central handshake pulse */}
                <circle cx="200" cy="200" r="40" stroke="#22d3ee" stroke-width="0.5" stroke-dasharray="3 6">
                  <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="30s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="200" r="80" stroke="#22d3ee" stroke-width="0.3" stroke-dasharray="2 8">
                  <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="45s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="200" r="130" stroke="#a78bfa" stroke-width="0.3" stroke-dasharray="4 12">
                  <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="60s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="200" r="180" stroke="#818cf8" stroke-width="0.2" stroke-dasharray="2 16">
                  <animateTransform attributeName="transform" type="rotate" from="360 200 200" to="0 200 200" dur="80s" repeatCount="indefinite" />
                </circle>

                {/* Floating particles */}
                <circle cx="200" cy="120" r="2" fill="#22d3ee">
                  <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="280" cy="200" r="2" fill="#a78bfa">
                  <animate attributeName="r" values="1;3;1" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="280" r="2" fill="#22d3ee">
                  <animate attributeName="r" values="1;3;1" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="120" cy="200" r="2" fill="#818cf8">
                  <animate attributeName="r" values="1;3;1" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;1;0.3" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="150" cy="140" r="1.5" fill="#f59e0b">
                  <animate attributeName="r" values="1;2.5;1" dur="5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx="260" cy="270" r="1.5" fill="#34d399">
                  <animate attributeName="r" values="1;2.5;1" dur="4.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.2;0.8;0.2" dur="4.5s" repeatCount="indefinite" />
                </circle>

                {/* Connecting lines between particles */}
                <line x1="200" y1="120" x2="280" y2="200" stroke="#22d3ee" stroke-width="0.3" stroke-dasharray="2 4">
                  <animate attributeName="stroke-dashoffset" values="6;0" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="280" y1="200" x2="200" y2="280" stroke="#a78bfa" stroke-width="0.3" stroke-dasharray="2 4">
                  <animate attributeName="stroke-dashoffset" values="6;0" dur="2.5s" repeatCount="indefinite" />
                </line>
                <line x1="200" y1="280" x2="120" y2="200" stroke="#22d3ee" stroke-width="0.3" stroke-dasharray="2 4">
                  <animate attributeName="stroke-dashoffset" values="6;0" dur="1.8s" repeatCount="indefinite" />
                </line>
                <line x1="120" y1="200" x2="200" y2="120" stroke="#818cf8" stroke-width="0.3" stroke-dasharray="2 4">
                  <animate attributeName="stroke-dashoffset" values="6;0" dur="2.2s" repeatCount="indefinite" />
                </line>
              </g>
            </svg>
          </div>

          <div class="mb-2">
            <span class="inline-flex items-center space-x-2 py-1.5 px-4 rounded text-zinc-400 text-xs font-mono tracking-[0.2em] uppercase border border-white/5 bg-white/5">
              <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-80"></div>
              <span>Google Cloud &middot; Vector Search</span>
            </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-light tracking-tight text-white text-center">
            Thank <span class="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">You</span>
          </h1>

          <p class="text-xl text-zinc-400 font-light text-center max-w-xl leading-relaxed">
            Thank you for the opportunity to present today. We are excited to partner with you on this transformation.
          </p>

          <div class="mt-6 bg-zinc-900/60 backdrop-blur-xl border border-white/10 px-10 py-5 rounded-2xl text-center glow-border-hover relative">
            <div class="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-2xl"></div>
            <p class="text-2xl font-light text-zinc-200 relative z-10">Questions?</p>
            <p class="text-sm text-zinc-500 mt-2 font-mono tracking-widest relative z-10">We'd love to hear from you.</p>
          </div>

          <div class="mt-8 flex items-center space-x-4 border-t border-white/10 pt-6">
            <img src="/eric_warriner.jpg" class="w-10 h-10 rounded-full border border-white/10 object-cover" alt="Eric S. Warriner" />
            <div class="flex flex-col">
               <span class="text-zinc-200 font-medium text-sm">Eric S. Warriner</span>
               <span class="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Cloud Application Modernization Engineer</span>
            </div>
          </div>
        </div>
      )
    },
  ];

  const nextSlide = () =>
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow user to use left/right arrows unless they are in an input field
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) {
        return;
      }
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    globalThis.addEventListener("keydown", handleKeyDown);
    return () => globalThis.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div class="relative w-full h-screen overflow-hidden bg-[#050505] text-white flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Background Ambience (Laser focus, minimal glow) */}
      <div class="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      
      {/* Main Slide Content */}
      <main class="flex-grow flex items-center justify-center p-4 md:p-12 z-10 w-full h-[calc(100vh-100px)] relative">
        {slides[currentSlide].content}
      </main>

      {/* Minimalist Navigation */}
      <nav class="absolute bottom-10 left-0 right-0 flex items-center justify-center space-x-12 z-20">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          class="text-xs tracking-[0.2em] uppercase font-medium text-zinc-500 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] hover:-translate-x-1 disabled:hover:translate-x-0 disabled:opacity-20 disabled:hover:drop-shadow-none disabled:hover:text-zinc-500 disabled:cursor-not-allowed transition-all duration-300"
        >
          Prev
        </button>
        <div class="flex space-x-5 items-center">
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              class={`cursor-pointer transition-all duration-500 rounded-full ${
                currentSlide === idx 
                  ? "h-1 w-10 bg-black glow-border-active" 
                  : "h-[1px] w-4 bg-zinc-700 hover:bg-zinc-400 hover:shadow-[0_0_5px_rgba(255,255,255,0.5)]"
              }`}
            >
            </div>
          ))}
        </div>
        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          class="text-xs tracking-[0.2em] uppercase font-medium text-zinc-500 hover:text-cyan-400 hover:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] hover:translate-x-1 disabled:hover:translate-x-0 disabled:opacity-20 disabled:hover:drop-shadow-none disabled:hover:text-zinc-500 disabled:cursor-not-allowed transition-all duration-300"
        >
          Next
        </button>
      </nav>

      {/* Speaker Notes Modal */}
      {showSpeakerNotes && (
        <div class="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" onClick={() => setShowSpeakerNotes(false)}>
          <div class="bg-zinc-950 border border-white/10 p-8 md:p-12 rounded-3xl max-w-3xl w-full text-left shadow-[0_0_50px_rgba(0,0,0,0.8)] relative slide-in" onClick={e => e.stopPropagation()}>
             {/* Glow effect */}
             <div class="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 blur-xl rounded-3xl pointer-events-none"></div>
             
             <button class="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10" onClick={() => setShowSpeakerNotes(false)}>
               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
             </button>
             
             <div class="flex items-center space-x-3 mb-6 relative z-10">
               <div class="w-2 h-2 rounded bg-cyan-400"></div>
               <h3 class="text-xs font-mono text-cyan-400 uppercase tracking-widest">Presenter Talking Points</h3>
             </div>
             
             <h2 class="text-3xl font-light text-white mb-8 tracking-tight relative z-10">Cross-Pillar Architecture</h2>
             
             <div class="space-y-6 text-zinc-300 text-[15px] leading-relaxed relative z-10">
                <div class="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <p><strong class="text-blue-400 font-semibold mb-2 block tracking-wide">1. App Mod Pillar (Compute & Edge)</strong>
                  "We are migrating away from monolithic legacy architectures. We've pushed the ML inference via WebAssembly out to the client edge, while utilizing elastic, serverless Google Cloud Run containers to orchestrate the backend without idle overhead or FPGA licensing."</p>
                </div>
                
                <div class="p-5 bg-white/5 border border-white/10 rounded-xl">
                  <p><strong class="text-purple-400 font-semibold mb-2 block tracking-wide">2. Data & AI Pillar (Retrieval)</strong>
                  "The application layer creates the intelligence (embeddings), but it crosses over to the Data & AI pillar via Firestore to extract value. We leverage its native algorithmic <span class="bg-black border border-white/10 px-1 rounded text-xs translate-y-[-1px] inline-block">findNearest</span> functionality to seamlessly perform real-time semantic matches."</p>
                </div>
                
                <div class="mt-8 p-5 bg-zinc-900 rounded-xl border border-white/5 border-l-4 border-l-amber-500 shadow-inner">
                  <p class="font-mono text-amber-500 text-xs mb-2 uppercase tracking-widest">The Elevator Pitch</p>
                  <p class="text-zinc-400 italic">"This isn't an infrastructure lift-and-shift. We are marrying modern App Mod containerized scale with advanced Data & AI semantic retrieval to prove an end-to-end modernized cloud solution."</p>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Subtle Antigravity Footer */}
      <div class="absolute bottom-5 right-6 pointer-events-auto z-40 group cursor-default">
        <div class="flex items-center space-x-2 opacity-20 group-hover:opacity-100 transition-opacity duration-700">
           <svg class="w-3 h-3 text-cyan-400 group-hover:text-cyan-300 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
             <path d="M2 17l10 5 10-5"></path>
             <path d="M2 12l10 5 10-5"></path>
           </svg>
           <p class="text-[8px] text-zinc-400 font-mono tracking-widest uppercase">
              Engineered with <span class="text-white">Google Antigravity IDE</span>
           </p>
        </div>
      </div>

    </div>
  );
}
