# Enterprise Face Recognition via Edge Compute & Google Cloud Vectors

This project is a modernized, serverless Face Recognition and Vector Database identity platform built strictly with **Deno Fresh**, **Google Firestore**, and **ONNX Edge Machine Learning**. 

This repository was completely refactored from a legacy Oracle 23ai + Python hardware-dependent architecture into an ultra-fast, zero-proprietery-hardware framework designed for presentation to CTOs/CIOs.

---

## 🚀 Key Architectural Advantages

### 1. Edge Compute & Pure TypeScript
By deploying exclusively on **Deno Fresh**, all heavy Python middleware layers and backend image transmission dependencies have been eliminated. Client connections natively interface with Google Cloud.
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

1. **Enterprise Aesthetic Presentation**
   - Impregnated with a deep Obsidian / Zinc-900 CSS architecture. 
   - Utilizes precision *OpticalFadeIn* micro-animations and zero-delay transition stacks optimized for high-end executive presentations.

2. **The Database Seeder (`/populate`)**
   - Includes a massive automated ingestion pipeline designed to dynamically map arbitrary face databases.
   - **Hugging Face Dataloop**: Will securely download, parse, execute ONNX math, and upload 10,000 distinct faces from the `ashraq/tmdb-people-image` HF dataset directly to Google Cloud.

3. **Dynamic Re-Querying Dashboard (`/`)**
   - Reactive Age Range filters (`Min Age` and `Max Age`).
   - Granular exact-match sliders (`Euclidean Tolerance Limits`).
   - Modifying a slider executes a 400ms debounced re-fetch, eliminating the need to repeatedly upload source images.

---

## 🖥 Prerequisites

- **Deno** 1.40+ (`deno --version`)
- A **Google Cloud Platform (GCP)** Account
- A corresponding **Firestore Native Database**.

### Firestore Setup (Composite Indexing)
Because Google Cloud organizes fast-lookups using deep Indexing, you must create a specialized `512-dimensional` Vector Index on your GCP target. 

Run the provided script to deploy your index configuration directly to GCP:
```bash
.\scratch\create_arcface_index.bat
```

### Credentials
Place your `service.json` Google Cloud Administrator key exactly in the root of this project repository. The application will detect this automatically to securely connect to Firebase.

---

## 🏃 Setup & Execution

**1. Run Locally:**
Boot the Deno server utilizing Hot Module Reloading:
```bash
deno task start
```
*Visit `http://localhost:8000` to interact with the system or `http://localhost:8000/populate` to begin seeding the database!*

**2. Deploy to Production:**
The source is bundled and perfectly abstracted via Docker. Deploy to your Google Cloud ecosystem simply by executing:
```bash
deno task deploy
```
