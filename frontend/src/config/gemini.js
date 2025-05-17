// gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load the API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in .env");
}

// Initialize the generative AI model
const genAI = new GoogleGenerativeAI(API_KEY);

// Export model instance for use elsewhere
export const getChatModel = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({
    history: [], // you can optionally add conversation history here
  });
  return chat;
};
