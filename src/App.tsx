import React, { useState, useEffect } from 'react';
import { Subject } from './types';
import PomodoroTimer from './components/PomodoroTimer';
import TodoList from './components/TodoList';
import SubjectForm from './components/SubjectForm';
import SubjectList from './components/SubjectList';
import GradeAnalysis from './components/GradeAnalysis';
import EditModal from './components/EditModal';
import { GraduationCap } from 'lucide-react';
import DarkModeToggle from './components/DarkModeToggle';
import QuoteBox from './components/QuoteBox';
import ChatBot from './components/ChatBot'; // ✅ Import Jarvis

/* 🔥 Global variables to persist tab references across re-renders */
let googleDriveTab: Window | null = null;
let googleCalendarTab: Window | null = null;

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handleAddSubject = (subject: Subject) => {
    setSubjects([...subjects, subject]);
  };

  const handleDeleteSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
  };

  const handleSaveEdit = (updatedSubject: Subject) => {
    setSubjects(subjects.map(subject => 
      subject.id === updatedSubject.id ? updatedSubject : subject
    ));
  };

  /* ✅ Reuse Google Drive Tab */
  const openGoogleDrive = () => {
    if (googleDriveTab && !googleDriveTab.closed) {
      googleDriveTab.focus();
    } else {
      googleDriveTab = window.open('https://drive.google.com/', '_blank');
    }
  };

  /* ✅ Reuse Google Calendar Tab */
  const openGoogleCalendar = () => {
    if (googleCalendarTab && !googleCalendarTab.closed) {
      googleCalendarTab.focus();
    } else {
      googleCalendarTab = window.open('https://calendar.google.com/', '_blank');
    }
  };

  /* ✅ Function to let Jarvis control Pomodoro Timer */
  const handlePomodoroControl = (action: 'start' | 'pause' | 'reset') => {
    const pomodoroEvent = new CustomEvent('pomodoroControl', { detail: action });
    window.dispatchEvent(pomodoroEvent);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* ✅ Header with Google Drive & Calendar Buttons */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <GraduationCap size={32} className="text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold">STUDBUD</h1>
          </div>
          <div className="flex gap-4">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={openGoogleDrive}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            >
              📂 Google Drive
            </button>
            <button
              onClick={openGoogleCalendar}
              className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
            >
              📅 Google Calendar
            </button>
          </div>
        </div>

        {/* Add Subject & List */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Subject</h2>
            <SubjectForm onAddSubject={handleAddSubject} />
            <SubjectList
              subjects={subjects}
              onDeleteSubject={handleDeleteSubject}
              onEditSubject={handleEditSubject}
            />
          </div>

          {/* Grade Analysis */}
          {subjects.length > 0 && <GradeAnalysis subjects={subjects} />}

          {/* Pomodoro Timer, QuoteBox, and To-Do List */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* ✅ QuoteBox is above the Pomodoro Timer */}
            <div className="flex flex-col w-full md:w-1/2 space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
                <QuoteBox />
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <PomodoroTimer />
              </div>
            </div>

            {/* ✅ To-Do List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/2">
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Subject Modal */}
      <EditModal
        subject={editingSubject}
        isOpen={!!editingSubject}
        onClose={() => setEditingSubject(null)}
        onSave={handleSaveEdit}
      />

      {/* ✅ JARVIS ChatBot */}
      <ChatBot toggleDarkMode={() => setDarkMode(!darkMode)} controlPomodoro={handlePomodoroControl} />
    </div>
  );
}

export default App;
