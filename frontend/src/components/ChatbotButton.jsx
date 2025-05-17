import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChatbotButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to="/chatbot"
      className="fixed bottom-8 right-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <button
          type="button"
          className={`fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#306F84] hover:bg-[#2C6F85] rounded-full flex items-center justify-center shadow-xl transition-all duration-300 focus:outline-none`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => window.location.href = '/chatbot'}
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </button>
        {isHovered && (
          <div className="absolute bottom-16 right-0 bg-white px-4 py-2 rounded-lg shadow-lg text-sm text-gray-700 whitespace-nowrap">
            Chat with HealthBot
          </div>
        )}
      </div>
    </Link>
  );
};

export default ChatbotButton; 