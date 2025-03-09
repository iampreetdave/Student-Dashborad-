import React, { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState('');

  const addTask = () => {
    if (taskText.trim() === '') return;
    const newTask: Task = { id: Date.now(), text: taskText, completed: false };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const completeTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
    setTimeout(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }, 3000); // Remove task after 3 seconds
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold mb-2 dark:text-white">To-Do List</h3>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          placeholder="Add a new task..."
        />
        <button onClick={addTask} className="px-3 py-2 bg-blue-500 text-white rounded-md">
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-2 rounded-md flex justify-between items-center ${
              task.completed ? 'line-through text-gray-400' : 'text-black dark:text-white'
            }`}
          >
            {task.text}
            {!task.completed && (
              <button
                onClick={() => completeTask(task.id)}
                className="text-green-500 font-semibold"
              >
                ✅ Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
