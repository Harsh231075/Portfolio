// lib/vectorSearch.ts
import { DataAPIClient } from "@datastax/astra-db-ts";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  GENAI_API_KEY,
} = process.env;

function getAIClient() {
  return new GoogleGenAI({ apiKey: GENAI_API_KEY || "dummy-key" });
}

function getDb() {
  const endpoint = ASTRA_DB_API_ENDPOINT || "https://dummy-endpoint.astra.datastax.com";
  const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN || "dummy-token");
  return client.db(endpoint, {
    keyspace: ASTRA_DB_NAMESPACE || "default_keyspace",
  });
}

export const searchRelevantChunks = async (query: string) => {
  const ai = getAIClient();
  const db = getDb();
  const embedding = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: query,
  });

  const vector = embedding.embeddings?.[0]?.values;
  if (!vector || vector.length === 0) {
    throw new Error("Failed to generate embedding.");
  }
  const collection = await db.collection(ASTRA_DB_COLLECTION || "default_collection");
  const cursor = collection.find(
    {},
    {
      sort: {
        $vector: vector,
      },
      limit: 5,
    }
  );

  const documents = await cursor.toArray();

  const contextText = documents.map((doc) => doc.text).join("\n");



  return contextText

}