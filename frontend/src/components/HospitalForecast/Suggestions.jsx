import React from "react";

// Remove leading markdown bullets, numbers, and whitespace
function cleanMarkdown(line) {
  return line.replace(/^(\s*[-*]\s*|\s*\d+\.\s*)/, '').trim();
}

const Suggestions = ({ suggestions }) => {
  if (!suggestions) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
      </div>
    );
  }

  if (Array.isArray(suggestions)) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
        <ul className="list-disc ml-5 text-gray-700">
          {suggestions.map((s, i) => (
            <li key={i}>{cleanMarkdown(s)}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
      <p className="text-gray-700">{cleanMarkdown(suggestions)}</p>
    </div>
  );
};

export default Suggestions;
