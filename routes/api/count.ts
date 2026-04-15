import { getDb } from "../../utils/firebase.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  async GET() {
    try {
      const db = await getDb();
      // Google Firestore Aggregation Query for massive scalability zero-cost counting
      const coll = db.collection("images4_arcface");
      const aggregateQuery = await coll.count().get();
      const numDocs = aggregateQuery.data().count;

      return new Response(JSON.stringify({ count: numDocs }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: any) {
      console.error(e);
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
