import React from 'react';

interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, setDarkMode }) => {
  const openGoogleDrive = () => {
    window.open('https://drive.google.com', '_blank');
  };

  return (
    <div className="flex items-center gap-4">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md border border-gray-400"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Google Drive Button */}
      <button
        onClick={openGoogleDrive}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Open Google Drive
      </button>
    </div>
  );
};

export default DarkModeToggle;
