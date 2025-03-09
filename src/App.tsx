import React, { useState, useEffect } from 'react';
import { Subject } from './types';
import PomodoroTimer from './components/PomodoroTimer';
import TodoList from './components/TodoList'; // ✅ Import To-Do List
import SubjectForm from './components/SubjectForm';
import SubjectList from './components/SubjectList';
import GradeAnalysis from './components/GradeAnalysis';
import EditModal from './components/EditModal';
import { GraduationCap } from 'lucide-react';
import DarkModeToggle from './components/DarkModeToggle';

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

  const openGoogleDrive = () => {
    window.open('https://drive.google.com/', '_blank');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Dark Mode Toggle & Google Drive Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <GraduationCap size={32} className="text-blue-600 mr-2" />
            <h1 className="text-3xl font-bold">Student Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={openGoogleDrive}
              className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
            >
              📂 Google Drive
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

          {/* Pomodoro Timer & To-Do List Side by Side */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* ✅ Both components will be displayed side by side on medium+ screens */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full md:w-1/2">
              <PomodoroTimer />
            </div>
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
    </div>
  );
}

export default App;
