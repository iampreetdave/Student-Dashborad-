import React, { useState } from 'react';
import { Subject } from './types';
import PomodoroTimer from './components/PomodoroTimer';
import SubjectForm from './components/SubjectForm';
import SubjectList from './components/SubjectList';
import GradeAnalysis from './components/GradeAnalysis';
import EditModal from './components/EditModal';
import { GraduationCap } from 'lucide-react';

function App() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap size={32} className="text-blue-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add Subject</h2>
            <SubjectForm onAddSubject={handleAddSubject} />
            <SubjectList
              subjects={subjects}
              onDeleteSubject={handleDeleteSubject}
              onEditSubject={handleEditSubject}
            />
          </div>

          {subjects.length > 0 && (
            <GradeAnalysis subjects={subjects} />
          )}

          <PomodoroTimer />
        </div>
      </div>

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