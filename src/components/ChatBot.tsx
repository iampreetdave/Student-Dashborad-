import React, { useState } from 'react';

interface ChatBotProps {
  toggleDarkMode: () => void;
  controlPomodoro: (action: 'start' | 'pause' | 'reset') => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ toggleDarkMode, controlPomodoro }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'bot'; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleUserInput = (inputText: string) => {
    if (!inputText.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: inputText }]);
    setInput(''); // Clear input field

    let response = "I'm not sure how to respond to that.";
    const lowerInput = inputText.toLowerCase();

    // Handling "hi" or "hello"
    if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
      response = "👋 Hello! How can I assist you today?";
    } else if (lowerInput.includes('dark mode')) {
      toggleDarkMode();
      response = "🌙 Dark mode toggled.";
    } else if (lowerInput.includes('start')) {
      controlPomodoro('start');
      response = "⏳ Timer started.";
    } else if (lowerInput.includes('pause')) {
      controlPomodoro('pause');
      response = "⏸️ Timer paused.";
    } else if (lowerInput.includes('reset')) {
      controlPomodoro('reset');
      response = "🔄 Timer reset.";
    } else if (lowerInput === 'help') {
      response = "🔹 **Commands:**\n" +
        "1️⃣ Toggle dark mode\n" +
        "2️⃣ Start, pause, or reset the Pomodoro timer\n" +
        "3️⃣ Motivate me\n" +
        "4️⃣ What can you do\n" +
        "5️⃣ Open Google Drive\n" +
        "6️⃣ Open Google Calendar";
    } else if (lowerInput.includes('motivate me')) {
      response = "🚀 Keep pushing forward! Every small step leads to success.";
    } else if (lowerInput.includes('what can you do')) {
      response = "🤖 I can toggle dark mode, control the Pomodoro timer, provide motivation, and open Google services.";
    } else if (lowerInput.includes('open google drive')) {
      window.open("https://drive.google.com", "_blank");
      response = "📂 Opening Google Drive...";
    } else if (lowerInput.includes('open google calendar')) {
      window.open("https://calendar.google.com", "_blank");
      response = "📅 Opening Google Calendar...";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: response }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      {/* Open/Close Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-transform hover:scale-105 hover:shadow-blue-400 animate-pulse"
      >
        {isOpen ? '❌ Close Jarvis' : '💬 Open Jarvis'}
      </button>

      {isOpen && (
        <div className="w-80 h-96 backdrop-blur-md bg-black/30 border border-blue-400 shadow-xl rounded-lg p-4 mt-2 animate-fade-in">
          {/* Chat Window */}
          <div className="h-72 overflow-y-auto border-b mb-2 p-2 text-sm text-white">
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 ${msg.sender === 'user' ? 'text-right text-blue-400' : 'text-left text-green-300'}`}>
                <strong>{msg.sender === 'user' ? '🧑 You: ' : '🤖 Jarvis: '}</strong>{msg.text}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <input
            type="text"
            className="w-full p-2 border rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUserInput(input);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
