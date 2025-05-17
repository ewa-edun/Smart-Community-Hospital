// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in .env");
}

// Initialize the generative AI model
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chatSession = null;

export async function askGemini(message) {
  // Start a chat session if not already started
  if (!chatSession) {
    chatSession = await model.startChat({ history: [] });
  }
  // Send the message and get the response
  const result = await chatSession.sendMessage(message);
  return result.response.text();
}