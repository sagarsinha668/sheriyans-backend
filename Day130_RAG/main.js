import { Pinecone } from "@pinecone-database/pinecone";
import fs from "fs";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import dotenv from "dotenv";
import PDFParse from "pdf-parse";

dotenv.config();

const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const embeddings = new MistralAIEmbeddings({ model: "mistral-embed" });
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});
const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

// Step 1: Read PDF
async function readPDF(filePath) {
  const pdfBuffer = fs.readFileSync(filePath);
  const data = await PDFParse(pdfBuffer);
  console.log("✓ PDF read:", data.numpages, "pages");
  return data.text;
}

// Step 2: Split text into chunks
async function splitTextIntoChunks(text) {
  const chunks = await splitter.splitText(text);
  console.log("✓ Text split into", chunks.length, "chunks");
  return chunks;
}

// Step 3: Create embeddings
async function createEmbeddingsForChunks(chunks) {
  const vectors = [];
  for (let i = 0; i < chunks.length; i++) {
    const vector = await embeddings.embedQuery(chunks[i]);
    vectors.push({
      id: `chunk-${i}`,
      values: vector,
      metadata: { text: chunks[i] },
    });
    if ((i + 1) % 5 === 0) console.log(`  Embedded ${i + 1}/${chunks.length}`);
  }
  console.log("✓ Created embeddings for all chunks");
  return vectors;
}

// Step 4: Store in Pinecone
async function storeInPinecone(vectors) {
  // Upload in batches of 100
  for (let i = 0; i < vectors.length; i += 100) {
    await index.upsert(vectors.slice(i, i + 100));
  }
  console.log("✓ Stored in Pinecone");
}

// Step 5: Search in Pinecone
async function searchPinecone(query) {
  const queryVector = await embeddings.embedQuery(query);
  const results = await index.query({
    vector: queryVector,
    topK: 3,
    includeMetadata: true,
  });

  console.log("\n--- Search Results for:", query, "---");
  results.matches.forEach((match, i) => {
    console.log(`\n${i + 1}. Score: ${match.score.toFixed(3)}`);
    console.log(match.metadata.text.substring(0, 200) + "...");
  });
}

// Main
async function main() {
  console.log("Starting RAG...\n");

  const pdfPath = "./resume.pdf"; // Change this to your PDF path
  const text = await readPDF(pdfPath);
  const chunks = await splitTextIntoChunks(text);
  const vectors = await createEmbeddingsForChunks(chunks);
  await storeInPinecone(vectors);

  // Try a search
  await searchPinecone("What are technical skills?");

  console.log("\nDone!");
}

main().catch(console.error);
