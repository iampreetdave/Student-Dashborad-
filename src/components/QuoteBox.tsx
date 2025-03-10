import React, { useState, useEffect } from "react";

const defaultQuotes = [
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "Your time is limited, so don’t waste it living someone else’s life.",
];

const QuoteBox: React.FC = () => {
  const [customQuote, setCustomQuote] = useState<string>(() => 
    localStorage.getItem("customQuote") || ""
  );
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("customQuote", customQuote);
  }, [customQuote]);

  const handleSaveQuote = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Today's Motivation</h2>
      
      {isEditing ? (
        <div>
          <input
            type="text"
            value={customQuote}
            onChange={(e) => setCustomQuote(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-black"
            placeholder="Enter your custom quote..."
          />
          <button
            onClick={handleSaveQuote}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg italic">
            {customQuote || defaultQuotes[Math.floor(Math.random() * defaultQuotes.length)]}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
          >
            {customQuote ? "Edit Quote" : "Add Quote"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuoteBox;
