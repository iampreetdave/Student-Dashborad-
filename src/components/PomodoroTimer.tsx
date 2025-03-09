import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Quote } from 'lucide-react';
import { TimerState } from '../types';

const QUOTES = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Success is not final, failure is not fatal. - Winston Churchill",
  "Don't count the days, make the days count. - Muhammad Ali",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Focus on the journey, not the destination. - Greg Anderson",
  "Your time is limited, don't waste it. - Steve Jobs",
  "Quality is not an act, it is a habit. - Aristotle",
  "The secret of getting ahead is getting started. - Mark Twain",
  "Small progress is still progress. - Anonymous",
  "Stay focused, go after your dreams. - LL Cool J"
];

const PomodoroTimer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    mode: 'work'
  });
  const [quote, setQuote] = useState(QUOTES[0]);
  const [showQuote, setShowQuote] = useState(true);

  useEffect(() => {
    let interval: number;

    if (timer.isRunning) {
      interval = setInterval(() => {
        if (timer.seconds === 0) {
          if (timer.minutes === 0) {
            // Play sound when timer ends
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play();

            // Switch modes
            const newMode = timer.mode === 'work' ? 'break' : 'work';
            setTimer({
              minutes: newMode === 'work' ? 25 : 5,
              seconds: 0,
              isRunning: false,
              mode: newMode
            });
            return;
          }
          setTimer(prev => ({
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59
          }));
        } else {
          setTimer(prev => ({
            ...prev,
            seconds: prev.seconds - 1
          }));
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // Rotate quotes every 30 seconds
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setShowQuote(false);
      setTimeout(() => {
        setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
        setShowQuote(true);
      }, 500);
    }, 30000);

    return () => clearInterval(quoteInterval);
  }, []);

  const toggleTimer = () => {
    setTimer(prev => ({ ...prev, isRunning: !prev.isRunning }));
  };

  const resetTimer = () => {
    setTimer({
      minutes: timer.mode === 'work' ? 25 : 5,
      seconds: 0,
      isRunning: false,
      mode: timer.mode
    });
  };

  const progress = ((timer.mode === 'work' ? 25 : 5) * 60 - (timer.minutes * 60 + timer.seconds)) / ((timer.mode === 'work' ? 25 : 5) * 60) * 100;

  return (
    <div className="bg-white text-black dark:bg-white dark:text-black p-6 rounded-lg shadow-md relative overflow-hidden"> {/* ✅ Keeps it white */}
      <div className={`absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-1000 ease-linear`} style={{ width: `${progress}%` }}></div>
      
      <h2 className={`text-2xl font-bold mb-4 text-center transition-colors duration-300 ${timer.mode === 'work' ? 'text-blue-600' : 'text-green-600'}`}>
        {timer.mode === 'work' ? 'Work Time' : 'Break Time'}
      </h2>
      
      <div className="relative">
        <div className={`text-6xl font-mono text-center mb-6 transition-all duration-300 ${timer.isRunning ? 'scale-105' : 'scale-100'}`}>
          {String(timer.minutes).padStart(2, '0')}:
          {String(timer.seconds).padStart(2, '0')}
        </div>
        
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={toggleTimer}
            className={`transform transition-all duration-300 hover:scale-110 p-3 rounded-full ${
              timer.isRunning 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white`}
          >
            {timer.isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transform transition-all duration-300 hover:scale-110"
          >
            <RotateCcw size={24} />
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Quote size={16} />
            <span className="text-sm font-semibold">Today's Motivation</span>
          </div>
          <div className={`transition-all duration-500 ${showQuote ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'}`}>
            <p className="text-sm text-gray-700 italic">{quote}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
