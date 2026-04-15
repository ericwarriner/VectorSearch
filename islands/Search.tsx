import { useEffect, useRef, useState } from "preact/hooks";

interface SearchResponse {
  distance: number;
  id: number;
  image_base64: string;
  name: string;
}

export default function SearchDemo() {
  const [results, setResults] = useState<SearchResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializingML, setInitializingML] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageSrc, setUploadedImageSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Loading ML Models...");
  const imgRef = useRef<HTMLImageElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [numRows, setNumRows] = useState(10);
  const [minAge, setMinAge] = useState(20);
  const [maxAge, setMaxAge] = useState(80);
  const [tolerance, setTolerance] = useState(2.50); // Euclidean Distance Tolerance (Increased for ArcFace)
  const [faceapi, setFaceapi] = useState<any>(null);
  const [currentVector, setCurrentVector] = useState<number[] | null>(null);
  const inferenceMs = useRef(0);
  const [telemetry, setTelemetry] = useState<
    { inference: number; latency: number; payload: string } | null
  >(null);
  const [dbCount, setDbCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/count")
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) setDbCount(data.count);
      })
      .catch((err) => console.error("Could not fetch DB count", err));
  }, []);

  useEffect(() => {
    async function loadModels() {
      try {
        const fa = await import("npm:@vladmandic/face-api");
        setFaceapi(fa);

        // Fast SSD MobileNet strictly for drawing the box
        await fa.nets.ssdMobilenetv1.loadFromUri("/models");

        // Initialize massive ONNX pipeline
        const { initArcFaceModels } = await import("../utils/arcface.ts");
        await initArcFaceModels();

        setInitializingML(false);
        setStatus("Models loaded. Ready for inference.");
      } catch (err) {
        console.error("Model load error", err);
        setError("Failed to load Face Models. Ensure static/models exists.");
        setStatus("Initialization failed.");
      }
    }
    loadModels();
  }, []);

  // Debounce reactor for auto-searching on slider drag
  useEffect(() => {
    if (!currentVector) return;
    const t = setTimeout(() => {
      executeQuery(currentVector);
    }, 400); // 400ms debounce
    return () => clearTimeout(t);
  }, [currentVector, numRows, minAge, maxAge, tolerance]);

  const handleFileUpload = async (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    setResults([]);
    setError(null);
    setLoading(true);
    setStatus("Analyzing face image...");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const src = event.target?.result as string;
      setUploadedImageSrc(src);

      setTimeout(async () => {
        await processFace(src);
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const processFace = async (src: string) => {
    try {
      if (!imgRef.current) throw new Error("Image element missing");
      if (!faceapi) throw new Error("Face API is not loaded yet.");

      const detection = await faceapi.detectSingleFace(imgRef.current);

      if (!detection) {
        setError("No face detected in the image.");
        setStatus("Detection failed.");
        setLoading(false);
        return;
      }

      setStatus("Computing mathematical identity using ArcFace ResNet-100...");
      const startT = performance.now();
      const { getArcFaceVector } = await import("../utils/arcface.ts");
      const vector = await getArcFaceVector(imgRef.current, detection.box);
      inferenceMs.current = performance.now() - startT;

      setCurrentVector(vector); // Triggers executeQuery dynamically
    } catch (err: any) {
      setError(err.message || "Unknown error parsing face");
      setLoading(false);
    }
  };

  const executeQuery = async (vector: number[]) => {
    try {
      setLoading(true);
      setStatus("Searching Firestore...");
      const startQ = performance.now();

      const payloadBody = {
        vector,
        min_age: minAge,
        max_age: maxAge,
        num_rows: numRows,
        tolerance: tolerance,
      };
      const pSize = (JSON.stringify(payloadBody).length / 1024).toFixed(2);

      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}: ${await response.text()}`,
        );
      }

      const data: SearchResponse[] = await response.json();
      setResults(data);
      setSelectedIndex(0);

      setTelemetry({
        inference: Math.round(inferenceMs.current),
        latency: Math.round(performance.now() - startQ),
        payload: pSize,
      });

      // Dynamically refresh Database Count
      fetch("/api/count")
        .then((res) => res.json())
        .then((countData) => {
          if (countData.count !== undefined) setDbCount(countData.count);
        })
        .catch(() => {});

      setStatus(
        data.length > 0
          ? `Query Complete: ${data.length} matches`
          : "No similar faces found.",
      );
    } catch (err: any) {
      setError(err.message || "Database Query Failed");
      setStatus("Error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="w-full max-w-5xl bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-2xl flex flex-col relative overflow-hidden glow-border-hover">
      <div class="flex justify-between items-end border-b border-white/10 pb-6 mb-8 z-10 relative">
        <div>
          <h2 class="text-2xl font-light tracking-tight text-white mb-2 flex items-center">
            <div class="w-2 h-2 rounded-full bg-cyan-400 mr-3 animate-pulse">
            </div>
            Firestore Vector Search
          </h2>
          <p class="text-zinc-500 text-xs font-mono tracking-widest uppercase">
            STATUS // {status}
          </p>
        </div>

        {telemetry && (
          <div class="hidden md:flex space-x-6 bg-black/60 border border-green-500/20 px-4 py-2 rounded-lg backdrop-blur-md">
            <div class="flex flex-col">
              <span class="text-[9px] text-green-500/70 font-mono tracking-widest uppercase">
                Inference Time
              </span>
              <span class="text-green-400 font-mono text-sm">
                {telemetry.inference}ms
              </span>
            </div>
            <div class="flex flex-col border-l border-green-500/20 pl-6">
              <span class="text-[9px] text-green-500/70 font-mono tracking-widest uppercase">
                Payload Size
              </span>
              <span class="text-green-400 font-mono text-sm">
                {telemetry.payload} KB
              </span>
            </div>
            <div class="flex flex-col border-l border-green-500/20 pl-6">
              <span class="text-[9px] text-green-500/70 font-mono tracking-widest uppercase">
                Cloud Latency
              </span>
              <span class="text-green-400 font-mono text-sm">
                {telemetry.latency}ms
              </span>
            </div>
            {dbCount !== null && (
              <div
                class="flex flex-col border-l border-green-500/20 pl-6 cursor-help"
                title="Total Vectors Indexed in Database"
              >
                <span class="text-[9px] text-green-500/70 font-mono tracking-widest uppercase">
                  Vectors Indexed
                </span>
                <span class="text-green-400 font-mono text-sm">
                  {dbCount.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        )}

        <div class="flex items-center space-x-4">
          <label class="px-5 py-2 rounded text-xs tracking-[0.1em] uppercase font-semibold bg-white text-black hover:bg-zinc-200 cursor-pointer transition-colors shadow-sm inline-block">
            {initializingML ? "Loading Models..." : "Upload Image"}
            <input
              type="file"
              accept="image/*"
              class="hidden"
              disabled={initializingML}
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 z-10 relative">
        {/* Sidebar Controls */}
        <div class="md:col-span-4 flex flex-col space-y-6">
          <div class="bg-black/30 rounded-lg p-6 border border-white/5">
            <h3 class="text-xs uppercase tracking-widest font-bold mb-5 text-zinc-400">
              Query Parameters
            </h3>

            <div class="space-y-6">
              <div>
                <div class="flex justify-between text-xs text-zinc-400 mb-2 font-mono">
                  <label>MAXIMUM_RESULTS</label>
                  <span class="text-cyan-400">{numRows}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={numRows}
                  onInput={(e: any) => setNumRows(Number(e.target.value))}
                  class="w-full h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                />
              </div>

              <div class="border-t border-white/5 pt-4">
                <div class="flex justify-between text-xs text-zinc-400 mb-2 font-mono">
                  <label>SIMILARITY_DISTANCE</label>
                  <span class="text-cyan-400">{tolerance.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="5.0"
                  step="0.05"
                  value={tolerance}
                  onInput={(e: any) => setTolerance(Number(e.target.value))}
                  class="w-full h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                />
              </div>

              <div class="flex space-x-4">
                <div class="flex-1 border-t border-white/5 pt-4">
                  <label class="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Min Age Restrict
                  </label>
                  <input
                    type="number"
                    value={minAge}
                    onInput={(e: any) => setMinAge(Number(e.target.value))}
                    class="w-full bg-black/50 border border-white/5 rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none transition-colors text-zinc-300 font-mono"
                  />
                </div>
                <div class="flex-1 border-t border-white/5 pt-4">
                  <label class="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                    Max Age Restrict
                  </label>
                  <input
                    type="number"
                    value={maxAge}
                    onInput={(e: any) => setMaxAge(Number(e.target.value))}
                    class="w-full bg-black/50 border border-white/5 rounded px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none transition-colors text-zinc-300 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {uploadedImageSrc && (
            <div class="bg-black/30 rounded-lg p-2 border border-white/5 flex flex-col items-center glow-border-active transform z-10">
              <img
                ref={imgRef}
                src={uploadedImageSrc}
                class="w-full h-auto rounded shadow-lg border border-white/5 opacity-90"
                alt="Query Face"
              />
              <div class="w-full text-center mt-2 text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
                Target Encoding
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div class="md:col-span-8">
          {error && (
            <div class="p-4 bg-red-950/30 border border-red-500/30 rounded text-red-400 mb-6 font-mono text-xs">
              ERROR: {error}
            </div>
          )}

          {loading && (
            <div class="flex flex-col items-center justify-center h-64 space-y-4">
              <div class="flex space-x-2">
                <div class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce">
                </div>
                <div
                  class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"
                  style="animation-delay: 0.1s"
                >
                </div>
                <div
                  class="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce"
                  style="animation-delay: 0.2s"
                >
                </div>
              </div>
              <p class="text-zinc-500 text-xs font-mono tracking-widest uppercase">
                {status}
              </p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 p-6 overflow-y-auto max-h-[60vh] 
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-zinc-700
              [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-zinc-500">
              {results.map((res, index) => (
                <div
                  key={res.id}
                  onClick={() => setSelectedIndex(index)}
                  class={`bg-zinc-900 rounded border border-white/5 transition-all duration-300 group relative cursor-pointer ${
                    index === selectedIndex
                      ? "glow-border-active scale-[1.20] z-20 shadow-[0_0_50px_rgba(34,211,238,0.4)]"
                      : "glow-border-hover z-0"
                  }`}
                >
                  {res.image_base64
                    ? (
                      <div class="w-full h-40 overflow-hidden relative rounded-t">
                        <img
                          src={`data:image/jpeg;base64,${res.image_base64}`}
                          class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                        </div>
                      </div>
                    )
                    : (
                      <div class="w-full h-40 bg-zinc-800 flex items-center justify-center relative rounded-t">
                        <span class="text-zinc-600 font-mono text-xs">
                          NO ASSET
                        </span>
                        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent">
                        </div>
                      </div>
                    )}
                  <div class="p-4 absolute bottom-0 left-0 right-0 pointer-events-none">
                    <div class="font-medium text-sm text-zinc-100 truncate tracking-wide">
                      {res.name}
                    </div>
                    <div class="flex justify-between items-center mt-1">
                      <div class="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                        Distance
                      </div>
                      <div class="text-[10px] text-cyan-400 font-mono bg-cyan-900/30 px-1 py-0.5 rounded">
                        {res.distance.toFixed(5)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && !error && !uploadedImageSrc && (
            <div class="flex flex-col items-center justify-center h-64 space-y-4 text-zinc-600 border border-dashed border-white/5 rounded-xl">
              <svg
                class="w-8 h-8 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M12 4v16m8-8H4"
                >
                </path>
              </svg>
              <p class="text-xs uppercase tracking-widest font-mono opacity-60">
                Awaiting Query Vector
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
