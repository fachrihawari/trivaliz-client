'use client'

import React, { useState, useEffect } from 'react';
import { IoTimeOutline } from "react-icons/io5";
import { LuArrowLeft, LuCheck, LuCircleCheck } from 'react-icons/lu';
import { RiMenu4Line } from "react-icons/ri";

export default function QuestionPage() {
  const [timeLeft, setTimeLeft] = useState(211); // 3:31 in seconds
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full p-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-gray-800 p-2 hover:bg-gray-100 rounded-full">
          <LuArrowLeft size={24} />
        </button>
        <div className="bg-yellow-400 px-4 py-1 rounded-full text-black flex items-center gap-1">
          <IoTimeOutline className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <button className="text-gray-800 p-2 rounded-full hover:bg-gray-100">
          <RiMenu4Line className="h-6 w-6" />
        </button>
      </div>

      {/* Question Counter */}
      <div className="text-gray-800 mb-6">
        <p className="text-lg">
          Question 01 <span className="float-right">1 of 2</span>
        </p>
        <div className="w-full flex gap-2 mt-2">
          <div className="flex-1 bg-yellow-400 h-4 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-gray-200 h-4 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-gray-200 h-4 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-gray-200 h-4 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-gray-200 h-4 rounded-full transition-all duration-300" />
        </div>
      </div>

      {/* Question */}
      <div className="text-gray-800 text-3xl font-bold my-10">
        What is the largest land animal in the world?
      </div>

      {/* Answer Options */}
      <p className="text-gray-600 text-lg mb-4">Choose your answer</p>
      <div className="grid grid-cols-2 gap-4 mb-20">
        {[
          { text: 'Elephant', color: 'from-red-400 to-red-500' },
          { text: 'Rhino', color: 'from-blue-400 to-blue-500' },
          { text: 'Giraffe', color: 'from-yellow-400 to-yellow-500' },
          { text: 'Tiger', color: 'from-green-400 to-green-500' },
          { text: 'Hippopotamus', color: 'from-purple-400 to-purple-500' },
          { text: 'Lion', color: 'from-pink-400 to-pink-500' },
          { text: 'Gorilla', color: 'from-indigo-400 to-indigo-500' },
          { text: 'Bear', color: 'from-orange-400 to-orange-500' }
        ].map(({ text, color }) => (
          <button
            key={text}
            onClick={() => setSelectedAnswer(text)}
            className={`text-white hover:opacity-90 bg-gradient-to-r ${color} py-6 rounded-2xl text-center transition-all duration-200 text-lg relative
            ${selectedAnswer ? selectedAnswer === text
                ? 'font-semibold'
                : `opacity-25`
              : '' }
            `}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
