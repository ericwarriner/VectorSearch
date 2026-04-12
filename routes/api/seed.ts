import { Handlers } from "$fresh/server.ts";
import { getDb } from "../../utils/firebase.ts";
import { FieldValue } from "npm:firebase-admin/firestore";
import { Buffer } from "node:buffer";

interface SeedRequest {
  id: number;
  name: string;
  image_base64: string; // The base64 format without data:image prefix
  vector: number[];
  birthday?: string; // ISO date string
  gender?: number; // 0 for female, 1 for male
}

export const handler: Handlers = {
  async POST(req, _ctx) {
    try {
      const db = getDb();
      if (!db) {
        return new Response(JSON.stringify({ error: "Database not initialized" }), { status: 500 });
      }

      const items: SeedRequest[] = await req.json();
      
      const imagesColl = db.collection('images4_arcface');
      const batch = db.batch();

      let successCount = 0;

      for (const item of items) {
          if (!item.vector || item.vector.length === 0) continue;
          
          const docRef = imagesColl.doc(item.id.toString());
          const payload: any = {
              id: item.id,
              name: item.name,
              embedding_vector: FieldValue.vector(item.vector),
              birthday: item.birthday || new Date().toISOString(),
              gender: item.gender || 1
          };

          if (item.image_base64) {
             // Convert base64 back to a byte array so Firestore can store it as blob
             payload.image_blob = Buffer.from(item.image_base64, "base64");
          }

          batch.set(docRef, payload);
          successCount++;
      }

      await batch.commit();

      return new Response(JSON.stringify({ success: true, inserted: successCount }), {
        headers: { "Content-Type": "application/json" },
      });

    } catch (e: any) {
      console.error(e);
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }
};
