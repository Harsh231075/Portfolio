// scripts/embedData.ts

import { DataAPIClient } from "@datastax/astra-db-ts";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { GoogleGenAI } from "@google/genai";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const {
  ASTRA_DB_NAMESPACE,
  ASTRA_DB_COLLECTION,
  ASTRA_DB_API_ENDPOINT,
  ASTRA_DB_APPLICATION_TOKEN,
  GENAI_API_KEY,
} = process.env;

const ai = new GoogleGenAI({ apiKey: GENAI_API_KEY! });

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 512,
  chunkOverlap: 100,
});

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN!);
const db = client.db(ASTRA_DB_API_ENDPOINT!, {
  keyspace: ASTRA_DB_NAMESPACE!,
});

async function createCollectionIfNotExists() {
  try {
    await db.createCollection(ASTRA_DB_COLLECTION!, {
      vector: {
        dimension: 768,
        metric: "dot_product",
      },
    });
    console.log("✅ Collection created.");
  } catch (err: any) {
    if (err.message?.includes("already exists")) {
      console.log("✅ Collection already exists.");
    } else {
      console.error("❌ Error creating collection:", err);
    }
  }
}

async function loadPdfContent(filePath: string) {
  const loader = new PDFLoader(filePath);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("\n");
}

async function embedAndStoreData() {
  await createCollectionIfNotExists();
  const collection = await db.collection(ASTRA_DB_COLLECTION!);

  const folderPath = path.join(process.cwd(), "public", "data");
  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".pdf"));

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    console.log(`📄 Processing: ${file}`);

    const content = await loadPdfContent(fullPath);
    const chunks = await splitter.splitText(content);

    for (const chunk of chunks) {
      const embedding = await ai.models.embedContent({
        model: "text-embedding-004",
        contents: chunk,
      });

      const vector = embedding.embeddings?.[0]?.values;
      if (!vector) continue;

      await collection.insertOne({
        $vector: vector,
        text: chunk,
        source: file,
      });

      console.log("✅ Chunk inserted");
    }
  }

  console.log("✅ All data embedded and stored.");
}

embedAndStoreData();
