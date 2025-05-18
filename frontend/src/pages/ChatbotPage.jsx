import React, { useState } from "react";
import { askGemini } from "../config/gemini";

// Remove leading markdown bullets, numbers, and whitespace
function cleanMarkdown(line) {
  return line.replace(/^(\s*[-*]\s*|\s*\d+\.\s*)/, '').trim();
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const reply = await askGemini(input);
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't get a response." }
      ]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#DBEFF9] to-[#F2F8FD] px-2">
      <div className="w-full max-w-4xl bg-[#F5FAFE] border-2 border-[#AACBDA] rounded-2xl shadow-lg flex flex-col -mt-32" style={{ minHeight: 500, height: "80vh" }}>
        {/* Heading */}
        <h1 className="text-2xl font-semibold text-[#2C6F85] text-center py-6 border-b border-[#E0E8F0] mb-0">
          Smart ChatBot
        </h1>
        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: 0 }}>
        {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`px-4 py-2 rounded-xl max-w-[80%] break-words text-base ${
                  msg.sender === "user"
                    ? "bg-[#2C6F85] text-white"
                    : "bg-[#F5FAFE] border-2 border-[#AACBDA] text-[#2C6F85]"
                }`}
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap"
                }}
              >
               {msg.sender === "bot" ? cleanMarkdown(msg.text) : msg.text}
            </div>
          </div>
        ))}
        {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-xl bg-[#F5FAFE] border-2 border-[#AACBDA] text-[#2C6F85] flex items-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Thinking...
            </div>
          </div>
        )}
      </div>
        {/* Input Area */}
        <form onSubmit={handleSend} className="flex gap-3 p-4 border-t border-[#E0E8F0]">
        <input
          type="text"
            className="flex-1 px-4 py-3 rounded-xl border-2 border-[#AACBDA] bg-white focus:outline-none focus:border-[#2C6F85] transition-colors"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
            className="bg-[#2C6F85] text-white px-6 py-3 rounded-xl hover:bg-[#1a4d5f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
