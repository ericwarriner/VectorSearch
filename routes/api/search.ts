import { Handlers } from "$fresh/server.ts";
import { getDb } from "../../utils/firebase.ts";
import { FieldValue } from "npm:firebase-admin/firestore";
import { Buffer } from "node:buffer";

interface SearchRequest {
  vector: number[];
  min_age: number;
  max_age: number;
  num_rows: number;
  tolerance: number;
}

export const handler: Handlers = {
  async POST(req, _ctx) {
    try {
      const db = getDb();
      if (!db) {
        return new Response(
          JSON.stringify({ error: "Database not initialized." }),
          { status: 500 },
        );
      }

      const data: SearchRequest = await req.json();

      if (!data.vector || data.vector.length === 0) {
        return new Response(JSON.stringify({ error: "Missing vector" }), {
          status: 400,
        });
      }

      // Query Firestore Vector Search
      const imagesColl = db.collection("images4_arcface");
      const vectorValue = FieldValue.vector(data.vector);

      const results = await imagesColl
        .findNearest({
          vectorField: "embedding_vector",
          queryVector: vectorValue,
          limit: 250, // Fetch up to 250 to allow deep post-filtering
          distanceMeasure: "EUCLIDEAN",
          distanceResultField: "distance",
          distanceThreshold: data.tolerance,
        })
        .get();

      const filtered = [];
      for (const doc of results.docs) {
        const d = doc.data();

        let age = -1;
        if (d.birthday) {
          const bday = new Date(d.birthday);
          const diffFn = Date.now() - bday.getTime();
          age = Math.floor(diffFn / (1000 * 60 * 60 * 24 * 365.25));
        }

        // Apply age parameters if provided. If age is unknown (-1), we can choose to include or exclude them. 
        // We will include them only if they asked for a very wide range, else we filter out unknown ages.
        let inAgeRange = true;
        if (age !== -1) {
             if (age < data.min_age || age > data.max_age) inAgeRange = false;
        } else {
             // If age is completely unknown, we exclude them to be strict about the parameter.
             inAgeRange = false;
        }

        if (inAgeRange) {
          filtered.push({
            id: d.id,
            name: d.name || "Unknown",
            image_base64: d.image_blob
              ? Buffer.from(d.image_blob).toString("base64")
              : null,
            distance: d.distance || 0,
            age: age
          });
        }
      }

      // Slice the final array to the requested number of UI rows
      const finalSubset = filtered.slice(0, data.num_rows);

      return new Response(JSON.stringify(finalSubset), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      console.error(e);
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
      });
    }
  },
};
