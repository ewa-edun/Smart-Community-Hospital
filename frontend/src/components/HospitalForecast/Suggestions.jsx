import React from "react";

const Suggestions = () => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">AI Suggestions</h2>
      <ul className="list-disc ml-5 text-gray-700">
        <li>Increase ICU beds in Zone A</li>
        <li>Prepare isolation wards in Zone B</li>
        <li>Mobilize additional staff for next week</li>
      </ul>
    </div>
  );
};

export default Suggestions;
