# Enterprise Face Recognition via Edge Compute & Google Cloud Vectors

This project is a modernized, serverless Face Recognition and Vector Database identity platform. It is currently deployed via **Deno Fresh 2.0**, **Google Firestore**, and **ONNX Edge Machine Learning**.

This repository was meticulously refactored from a legacy Oracle 23ai + Python hardware-dependent architecture into an ultra-fast, zero-proprietery-hardware framework engineered for live executive keynote presentations.

---

## 🚀 Key Architectural Advantages

### 1. Deno Fresh 2.0 & Pure TypeScript
By deploying exclusively on **Deno Fresh 2.0**, all heavy Python middleware layers and backend image transmission dependencies have been eliminated. The project utilizes the newest JSR registry paradigms and the `Builder` compiler API for rendering Tailwind CSS v3 assets.

- **Serverless Scaling:** Instantly scale to millions of hits via Google Cloud Run encapsulation. No need to order or manage hardware nodes.

### 2. Client-Side ML (Zero-Latency ONNX Runtimes)
Facial inference is processed entirely on the client's WebGL computational layer using `Microsoft's onnxruntime-web`.

- High-resolution photographs never breach the network boundary initially.
- Math executes entirely in the user's local RAM.

### 3. "ArcFace" Math vs Cloud Native Vectors
We dynamically load massive **State of the Art (SOTA) ArcFace ResNet-100** architectures mathematically identical to enterprise clearance systems.

- Every detected face projects onto a `512-dimensional` continuous hypersphere.
- Google Cloud Firestore's Vector Search (`findNearest`) instantly maps this projection against the entire database utilizing highly efficient Euclidean distance algorithms.

---

## 🛠 Features

1. **Executive Keynote "Cold Open" Module (`/`)**
   - Transformed into a full-screen, clicker-ready presentation deck.
   - Impregnated with a deep Obsidian / Zinc-900 CSS architecture.
   - Utilizes precision _OpticalFadeIn_ micro-animations and zero-delay transition stacks optimized for high-end executive delivery.

2. **Invisible Presenter Telemetry Mode**
   - **Secret Speaker Notes:** The application features a dynamic Presenter Mode. Pressing the **`N`** key (or silently clicking the slide title header) will toggle an invisible modal containing exact executive elevator pitches and technical talking points mapped strictly to the active slide. 

3. **The Database Seeder (`/populate`)**
   - Includes a massive automated ingestion pipeline designed to dynamically map arbitrary face databases.
   - **Hugging Face Dataloop**: Will securely download, parse, execute ONNX math, and upload 10,000 distinct cinematic faces from the `ashraq/tmdb-people-image` HF dataset directly to Google Cloud.

4. **Dynamic Re-Querying Target Dashboard**
   - Granular exact-match sliders (`Euclidean Tolerance Limits`) and Age Range filters (`Min Age` and `Max Age`).
   - Modifying a slider executes a 400ms debounced re-fetch against Google's Vector Search, eliminating the need to repeatedly upload source images.

---

## 🖥 Prerequisites

- **Deno** 2.0+ (`deno --version`)
- A **Google Cloud Platform (GCP)** Account
- A corresponding **Firestore Native Database**.

### Firestore Setup (Composite Indexing)
Because Google Cloud organizes fast-lookups using deep Indexing, you must create a specialized `512-dimensional` Vector Index on your GCP target. Run the provided script to deploy your index configuration directly to GCP:

```bash
.\scratch\create_arcface_index.bat
```

### Credentials
For local development, place your `service.json` Google Cloud Administrator key exactly in the root of this project repository. The application will detect this automatically to securely connect to Firebase. In production (Cloud Run), the application gracefully falls back to Application Default Credentials (ADC).

---

## 🏃 Setup & Execution

**1. Development (Live Reloading)**
Boot the Deno Fresh 2.0 live-reload builder:
```bash
deno task start
```
_Visit `http://localhost:8000` to run the active presentation or `http://localhost:8000/populate` to seed the database._

**2. Compile Artifacts**
To build the Tailwind assets and Preact Islands ahead of time:
```bash
deno task build
```

**3. Deploy to Production**
The source is seamlessly containerized and tailored for GCP environments. Deploy to Cloud Run using Google Buildpacks by executing:
```bash
deno task deploy
```
