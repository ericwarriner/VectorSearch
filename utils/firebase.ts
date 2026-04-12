import { cert, getApps, initializeApp } from "npm:firebase-admin/app";
import { getFirestore } from "npm:firebase-admin/firestore";

let _app: any = null;
let _db: any = null;

export function getDb() {
  if (_db) return _db;

  if (getApps().length > 0) {
    _app = getApps()[0];
  } else {
    const serviceAccountJson = Deno.env.get("FIREBASE_SERVICE_ACCOUNT_KEY");
    try {
      let localServiceAccount = null;
      try {
        const stat = Deno.statSync("./service.json");
        if (stat.isFile) {
            localServiceAccount = JSON.parse(Deno.readTextFileSync("./service.json"));
        }
      } catch (_) {}

      if (localServiceAccount) {
        _app = initializeApp({ credential: cert(localServiceAccount), projectId: "ericwarriner2" });
      } else if (serviceAccountJson) {
        const serviceAccount = JSON.parse(serviceAccountJson);
        _app = initializeApp({ credential: cert(serviceAccount), projectId: "ericwarriner2" });
      } else {
        // Fallback to Application Default Credentials
        _app = initializeApp({ projectId: "ericwarriner2" });
      }
    } catch (e: any) {
      console.warn("\n=======================================================");
      console.warn("🔥 FIREBASE INITIALIZATION ERROR 🔥");
      console.warn("Could not load Google Application Credentials.");
      console.warn("Reason:", e.message);
      console.warn("To run locally, please download a Service Account JSON key from Firebase,");
      console.warn("save it in your directory, and create a .env file with:");
      console.warn("GOOGLE_APPLICATION_CREDENTIALS=\"./your-key-file.json\"");
      console.warn("=======================================================\n");
    }
  }

  if (_app) {
    _db = getFirestore(_app);
    // Force REST transport to avoid gRPC TLS socket issues in Deno Node compat layer
    try {
        _db.settings({ preferRest: true });
    } catch(e) {
        console.warn("Could not configure REST preferred transport:", e);
    }
  }
  return _db;
}
