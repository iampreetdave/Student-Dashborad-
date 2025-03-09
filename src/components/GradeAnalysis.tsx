import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Subject } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface GradeAnalysisProps {
  subjects: Subject[];
}

const GradeAnalysis: React.FC<GradeAnalysisProps> = ({ subjects }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  
  const years = [...new Set(subjects.map(subject => subject.year))].sort();
  const filteredSubjects = selectedYear === 'all' 
    ? subjects 
    : subjects.filter(subject => subject.year === selectedYear);

  const data = {
    labels: filteredSubjects.map(subject => subject.name), // ✅ Ensure labels are strings
    datasets: [
      {
        label: 'Marks',
        data: filteredSubjects.map(subject => subject.marks),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    animation: {
      duration: 500,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Subject Performance Analysis ${selectedYear !== 'all' ? `- ${selectedYear}` : '(All Years)'}`,
        font: {
          size: 16,
          weight: 600, // ✅ FIXED TypeScript error
        },
        padding: 20,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: '#000', // ✅ Ensure text is black in light mode
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const average = filteredSubjects.length
    ? filteredSubjects.reduce((acc, curr) => acc + curr.marks, 0) / filteredSubjects.length
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-black dark:text-white">
          Class Average: {average.toFixed(2)}%
        </h3>
        <select
          value={selectedYear === 'all' ? 'all' : selectedYear.toString()}
          onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="px-3 py-2 border rounded-md text-black dark:text-white bg-white dark:bg-gray-700"
        >
          <option value="all">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default GradeAnalysis;
