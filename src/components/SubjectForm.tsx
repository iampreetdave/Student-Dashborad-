import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Subject } from '../types';

interface SubjectFormProps {
  onAddSubject: (subject: Subject) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ onAddSubject }) => {
  const [name, setName] = useState('');
  const [marks, setMarks] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && marks && year) {
      onAddSubject({
        id: Date.now().toString(),
        name,
        marks: Number(marks),
        year: Number(year)
      });
      setName('');
      setMarks('');
      setYear(new Date().getFullYear().toString());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Subject Name"
        className="flex-1 p-2 border rounded bg-white text-black dark:bg-white dark:text-black" // ✅ Always white input & black text
        required
      />
      <input
        type="number"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        placeholder="Marks"
        min="0"
        max="100"
        className="w-24 p-2 border rounded bg-white text-black dark:bg-white dark:text-black" // ✅ Always white input & black text
        required
      />
      <input
        type="number"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        placeholder="Year"
        min="2000"
        max="2100"
        className="w-28 p-2 border rounded bg-white text-black dark:bg-white dark:text-black" // ✅ Always white input & black text
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
      >
        <PlusCircle size={20} />
        Add
      </button>
    </form>
  );
};

export default SubjectForm;
