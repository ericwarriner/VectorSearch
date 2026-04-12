import * as ort from "npm:onnxruntime-web";

let arcfaceSession: ort.InferenceSession | null = null;
let isInitializing = false;

// HuggingFace direct URL for ArcFace ResNet-100
const MODEL_URL = "https://huggingface.co/garavv/arcface-onnx/resolve/main/arc.onnx";

/**
 * Initializes the ONNX WebAssembly runtime and fetches the ArcFace ResNet-100 model.
 */
export async function initArcFaceModels() {
    if (arcfaceSession) return arcfaceSession;
    if (isInitializing) {
        // Wait for other initialization to finish
        while(!arcfaceSession) {
            await new Promise(r => setTimeout(r, 100));
        }
        return arcfaceSession;
    }
    
    isInitializing = true;
    try {
        console.log("Downloading ArcFace ResNet-100 (512D) from Hugging Face...");
        // Configure WebAssembly paths to use CDN if missing locally
        ort.env.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";
        
        arcfaceSession = await ort.InferenceSession.create(MODEL_URL, {
            executionProviders: ['wasm']
        });
        console.log("ArcFace ONNX Model Initialized Successfully.");
        return arcfaceSession;
    } finally {
        isInitializing = false;
    }
}

/**
 * Normalizes a cropped canvas face into a 112x112 NCHW Float32 ONNX Tensor.
 */
function prepareImageTensor(canvas: HTMLCanvasElement): ort.Tensor {
    // ArcFace expects Exactly 112x112
    const size = 112;
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = size;
    tempCanvas.height = size;
    const ctx = tempCanvas.getContext("2d")!;
    ctx.drawImage(canvas, 0, 0, size, size);
    
    const imgData = ctx.getImageData(0, 0, size, size).data;
    
    // NHWC format: Float32Array[1 * 112 * 112 * 3]
    const float32Data = new Float32Array(3 * size * size);
    
    // Normalize and pack as Height-Width-Channel directly
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const i = (y * size + x) * 4;
            const r = imgData[i];
            const g = imgData[i + 1];
            const b = imgData[i + 2];

            const destIdx = (y * size + x) * 3;
            // Normalize (value - 127.5) / 127.5
            float32Data[destIdx + 0] = (r - 127.5) / 127.5;
            float32Data[destIdx + 1] = (g - 127.5) / 127.5;
            float32Data[destIdx + 2] = (b - 127.5) / 127.5;
        }
    }
    
    return new ort.Tensor('float32', float32Data, [1, size, size, 3]);
}

/**
 * Extracts a 512D vector from an HTML Image Element tightly isolated on a face.
 */
export async function getArcFaceVector(imgElement: HTMLImageElement, box: {x: number, y: number, width: number, height: number}): Promise<number[]> {
    const session = await initArcFaceModels();
    
    // 1. Crop face from the exact coordinates to canvas
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, box.width);
    canvas.height = Math.max(1, box.height);
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(imgElement, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);

    // 2. Prepare ONNX Float32Array Tensor
    const tensor = prepareImageTensor(canvas);

    // 3. Inference
    const inputName = session.inputNames[0];
    const feeds: Record<string, ort.Tensor> = {};
    feeds[inputName] = tensor;
    
    const outputData = await session.run(feeds);
    const outputName = session.outputNames[0];
    
    // Get Raw Float32Array
    const rawVector = outputData[outputName].data as Float32Array;
    
    // 4. L2 Normalization (Required for Euclidean Distance scaling)
    let sum = 0;
    for (let i = 0; i < rawVector.length; i++) {
        sum += rawVector[i] * rawVector[i];
    }
    const norm = Math.sqrt(sum);
    
    const finalVector: number[] = new Array(rawVector.length);
    for (let i = 0; i < rawVector.length; i++) {
        finalVector[i] = rawVector[i] / norm;
    }
    
    return finalVector;
}
