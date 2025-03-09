import React from 'react';
import { Trash2, Edit } from 'lucide-react';
import { Subject } from '../types';

interface SubjectListProps {
  subjects: Subject[];
  onDeleteSubject: (id: string) => void;
  onEditSubject: (subject: Subject) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, onDeleteSubject, onEditSubject }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Marks
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {subjects.map((subject) => (
            <tr key={subject.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">{subject.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{subject.year}</td>
              <td className="px-6 py-4 whitespace-nowrap">{subject.marks}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEditSubject(subject)}
                    className="text-blue-500 hover:text-blue-700 transition-colors duration-150"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteSubject(subject.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-150"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectList;