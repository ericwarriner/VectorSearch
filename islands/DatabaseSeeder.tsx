import { useState, useEffect, useRef } from "preact/hooks";
import { h } from "preact";

// Note: Sample images used for seeding. Must have CORS headers enabled (or we proxy).
// Some of these use a dummy image generation service for reliable CORS.
const SEED_DATA = [
  { id: 101, name: "Ada Lovelace", url: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Ada_Lovelace_portrait.jpg", birthday: "1815-12-10", gender: 0 },
  { id: 102, name: "Alan Turing", url: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg", birthday: "1912-06-23", gender: 1 },
  { id: 103, name: "Grace Hopper", url: "https://upload.wikimedia.org/wikipedia/commons/5/55/Grace_Hopper.jpg", birthday: "1906-12-09", gender: 0 }
];

export default function DatabaseSeeder() {
  const [initializingML, setInitializingML] = useState(true);
  const [faceapi, setFaceapi] = useState<any>(null);
  const [status, setStatus] = useState<string>("Loading Models...");
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [filesToAdd, setFilesToAdd] = useState<File[]>([]);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    async function loadModels() {
      try {
        const fa = await import("npm:@vladmandic/face-api");
        setFaceapi(fa);
        // Load SSD MobileNet specifically just for finding the box coordinates
        await fa.nets.ssdMobilenetv1.loadFromUri('/models');
        
        // Initialize massive ONNX pipeline
        const { initArcFaceModels } = await import("../utils/arcface.ts");
        await initArcFaceModels();

        setInitializingML(false);
        setStatus("Ready to seed database.");
      } catch (err) {
        console.error(err);
        setStatus("Failed to load models.");
      }
    }
    loadModels();
  }, []);

  const handleCustomUpload = (e: Event) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      setFilesToAdd(files);
      setStatus(`Prepared ${files.length} custom files for encoding.`);
  };

  const processAndUpload = async () => {
      if (!faceapi) return;
      setIsProcessing(true);
      setStatus("Starting batch encoding...");
      setProgress(0);

      const itemsToSeed = [];
      let total = filesToAdd.length;

      try {
          if (total > 0) {
              // Custom file upload loop
              for (let i = 0; i < total; i++) {
                  const file = filesToAdd[i];
                  setStatus(`Encoding ${file.name} (${i + 1}/${total})...`);
                  const src = await new Promise<string>((resolve) => {
                      const reader = new FileReader();
                      reader.onload = (e) => resolve(e.target?.result as string);
                      reader.readAsDataURL(file);
                  });
                  
                  const vector = await getVectorFromSrc(src);
                  if (vector) {
                     const smallSrc = await resizeImageToBase64(src, 300);
                     const base64Data = smallSrc.replace(/^data:image\/\w+;base64,/, "");
                     itemsToSeed.push({
                         id: Math.floor(Math.random() * 1000000),
                         name: file.name.split('.')[0] || "Unknown",
                         image_base64: base64Data,
                         vector: vector,
                         birthday: "1990-01-01",
                         gender: 1
                     });
                  }
                  setProgress(Math.floor(((i + 1) / total) * 100));
              }
          } else {
              // Automatic sample set loop
              total = SEED_DATA.length;
              for (let i = 0; i < total; i++) {
                  const person = SEED_DATA[i];
                  setStatus(`Encoding ${person.name} (${i + 1}/${total})...`);

                  const req = await fetch(person.url, { mode: 'cors' });
                  if (!req.ok) {
                     console.warn(`Failed to fetch ${person.name}`);
                     continue;
                  }
                  const blob = await req.blob();
                  const src = await new Promise<string>((resolve) => {
                      const reader = new FileReader();
                      reader.onload = (e) => resolve(e.target?.result as string);
                      reader.readAsDataURL(blob);
                  });
                  
                  const vector = await getVectorFromSrc(src);
                  if (vector) {
                     const smallSrc = await resizeImageToBase64(src, 300);
                     const base64Data = smallSrc.replace(/^data:image\/\w+;base64,/, "");
                     itemsToSeed.push({
                         id: person.id,
                         name: person.name,
                         image_base64: base64Data,
                         vector: vector,
                         birthday: person.birthday,
                         gender: person.gender
                     });
                  }
                  setProgress(Math.floor(((i + 1) / total) * 100));
              }
          }

          setStatus("Pushing batches to Firestore...");
          const req = await fetch("/api/seed", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(itemsToSeed)
          });

          if (!req.ok) throw new Error(await req.text());

          setStatus(`Successfully seeded ${itemsToSeed.length} identities into Firestore!`);
          setProgress(100);

      } catch(e: any) {
          console.error(e);
          setStatus(`Fatal Error: ${e.message}`);
      } finally {
          setIsProcessing(false);
      }
  };

  const ingestHuggingFace = async () => {
      if (!faceapi) return;
      setIsProcessing(true);
      setStatus("Starting Hugging Face Ingestion...");
      setProgress(0);

      const BATCH_SIZE = 50;
      const MAX_TOTAL = 10000;
      let totalProcessed = 0;
      let successCount = 0;

      try {
          while (successCount < MAX_TOTAL) {
              setStatus(`Fetching HF Batch (Offset: ${totalProcessed})...`);
              const hfReq = await fetch(`https://datasets-server.huggingface.co/rows?dataset=ashraq%2Ftmdb-people-image&config=default&split=train&offset=${totalProcessed}&length=${BATCH_SIZE}`);
              if (!hfReq.ok) throw new Error("Failed to fetch from Hugging Face API");
              const hfData = await hfReq.json();

              if (!hfData.rows || hfData.rows.length === 0) break;

              const batchItems = [];
              for (const rowObj of hfData.rows) {
                  const r = rowObj.row;
                  totalProcessed++;
                  
                  if (!r.image || !r.image.src) continue;

                  setStatus(`Encoding ${r.name} (${successCount}/${MAX_TOTAL}) | Scanned: ${totalProcessed}`);

                  try {
                      const imgReq = await fetch(r.image.src, { mode: 'cors' });
                      if (!imgReq.ok) continue;
                      const blob = await imgReq.blob();
                      const src = await new Promise<string>((resolve) => {
                          const reader = new FileReader();
                          reader.onload = (e) => resolve(e.target?.result as string);
                          reader.readAsDataURL(blob);
                      });

                      const vector = await getVectorFromSrc(src);
                      if (vector) {
                         const smallSrc = await resizeImageToBase64(src, 300);
                         const base64Data = smallSrc.replace(/^data:image\/\w+;base64,/, "");
                         batchItems.push({
                             id: r.id,
                             name: r.name,
                             image_base64: base64Data,
                             vector: vector,
                             birthday: r.birthday || "1990-01-01",
                             gender: r.gender
                         });
                         successCount++;
                         setProgress(Math.floor((successCount / MAX_TOTAL) * 100));
                      }
                  } catch (err) {
                      console.warn("Dataset mapping failed for", r.name);
                  }

                  if (successCount >= MAX_TOTAL) break;
              }

              if (batchItems.length > 0) {
                  setStatus(`Pushing batch of ${batchItems.length} into Firestore...`);
                  const req = await fetch("/api/seed", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(batchItems)
                  });
                  if (!req.ok) throw new Error(await req.text());
              }
          }

          setStatus(`Victory! Successfully ingested ${successCount} cinematic identities directly from Hugging Face!`);
          setProgress(100);

      } catch(e: any) {
          console.error(e);
          setStatus(`Fatal Error: ${e.message}`);
      } finally {
          setIsProcessing(false);
      }
  };

  const resizeImageToBase64 = async (src: string, maxDim: number): Promise<string> => {
      return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
              let { width, height } = img;
              if (width > maxDim || height > maxDim) {
                  if (width > height) { height *= maxDim / width; width = maxDim; }
                  else { width *= maxDim / height; height = maxDim; }
              }
              const canvas = document.createElement("canvas");
              canvas.width = Math.floor(width);
              canvas.height = Math.floor(height);
              const ctx = canvas.getContext("2d");
              if (ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL("image/jpeg", 0.7)); 
          };
          img.onerror = () => resolve(src);
          img.src = src;
      });
  };

  const getVectorFromSrc = async (src: string): Promise<number[] | null> => {
      return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = async () => {
             try {
                // Determine face bounds bounding box
                const detection = await faceapi.detectSingleFace(img);
                if (!detection) {
                   resolve(null);
                   return;
                }
                
                // Pass directly to our massive 512D ONNX mathematical parser
                const { initArcFaceModels, getArcFaceVector } = await import("../utils/arcface.ts");
                const vector = await getArcFaceVector(img, detection.box);
                resolve(vector);
             } catch(e) {
                console.error("Detection error:", e);
                resolve(null);
             }
          };
          img.onerror = () => resolve(null);
          img.src = src;
      });
  };

  return (
    <div class="w-full max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <h2 class="text-3xl font-bold text-white mb-6">Database Seeder Dashboard</h2>
        <p class="text-gray-300 mb-8 border-l-4 border-indigo-500 pl-4 py-1">
           Because the database was emptied, use this tool to securely generate and upload multi-dimensional vectors natively from your browser directly into Google Firestore.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div class="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h3 class="text-lg font-bold text-indigo-300 mb-4">Option A: Top Samples</h3>
                <p class="text-sm text-gray-400 mb-6">Downloads a tiny batch of Computer Scientists, computes their Encodings locally.</p>
                <button 
                  onClick={processAndUpload} 
                  disabled={initializingML || isProcessing || filesToAdd.length > 0}
                  class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold uppercase tracking-widest disabled:opacity-30 transition-colors">
                  Run Auto-Seed
                </button>
            </div>

            <div class="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h3 class="text-lg font-bold text-teal-300 mb-4">Option B: Custom Dir</h3>
                <p class="text-sm text-gray-400 mb-6">Select a folder of photos from your computer. The filename will be mapped.</p>
                <label class="block w-full py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold uppercase tracking-widest text-center cursor-pointer transition-colors disabled:opacity-30">
                  Select Photos
                  <input type="file" multiple accept="image/*" class="hidden" onChange={handleCustomUpload} disabled={initializingML || isProcessing} />
                </label>
            </div>

            <div class="bg-black/30 p-6 rounded-2xl border border-white/5">
                <h3 class="text-lg font-bold text-purple-300 mb-4">Option C: Hugging Face</h3>
                <p class="text-sm text-gray-400 mb-6">Deep query into the `ashraq/tmdb-people-image` dataset to autonomously encode exactly 10,000 faces from the internet.</p>
                <button 
                  onClick={ingestHuggingFace} 
                  disabled={initializingML || isProcessing}
                  class="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold uppercase tracking-widest disabled:opacity-30 transition-colors">
                  Stream 10,000 Faces
                </button>
            </div>
        </div>

        {filesToAdd.length > 0 && (
            <div class="mb-6 flex space-x-4">
                <div class="flex-grow text-teal-200">Loaded {filesToAdd.length} custom images for processing.</div>
                <button onClick={processAndUpload} disabled={isProcessing} class="px-6 py-2 bg-indigo-600 rounded drop-shadow hover:bg-indigo-500 font-bold transition-all disabled:opacity-30 text-white">Execute Seed</button>
                <button onClick={() => setFilesToAdd([])} class="px-6 py-2 border border-gray-500 text-gray-300 rounded hover:bg-white/5 font-bold transition-all disabled:opacity-30">Clear</button>
            </div>
        )}

        <div class="bg-zinc-900 rounded-lg p-5 mt-4 flex flex-col relative overflow-hidden">
            <div class="absolute inset-0 bg-indigo-600/20" style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}></div>
            <div class="relative z-10 flex justify-between items-center text-sm font-mono text-gray-300">
               <span>STATUS: {status}</span>
               <span>{progress}%</span>
            </div>
        </div>
    </div>
  );
}
