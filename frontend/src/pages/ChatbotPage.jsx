import React, { useState, useRef, useEffect } from "react";
import { askGemini } from "../config/gemini";

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
    <div className="min-h-screen bg-gradient-to-b from-[#DBEEF8] to-[#FFFFFF] p-6 max-w-3xl mx-auto flex flex-col">
      <h1 className="text-3xl font-bold mb-6 text-center">Smart ChatBot</h1>
      <div className="flex-1 border rounded-lg p-4 shadow-md bg-white mb-4 overflow-y-auto" style={{ minHeight: 400 }}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`px-4 py-2 rounded-lg max-w-xs ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start mb-2">
            <div className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatbotPage;
