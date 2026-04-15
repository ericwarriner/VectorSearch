import { getDb } from "../utils/firebase.ts";

async function check() {
  const db = getDb();
  if (!db) {
    console.log("DB failed to initialize.");
    Deno.exit(1);
  }

  try {
    const collections = await db.listCollections();
    console.log("Found Collections:", collections.map((c) => c.id));

    for (const coll of collections) {
      const snap = await coll.limit(5).get();
      console.log(
        `\nCollection '${coll.id}' contains documents. First few IDs:`,
      );
      snap.forEach((doc) => {
        console.log(` - ${doc.id}`);
      });
    }

    if (collections.length === 0) {
      console.log("No collections found in this database!");
    }
  } catch (e) {
    console.error("Error querying DB:", e);
  }
}

await check();
