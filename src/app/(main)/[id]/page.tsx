'use client'

import React, { useState, useEffect } from 'react';
import { IoTimeOutline } from "react-icons/io5";
import { LuArrowLeft } from 'react-icons/lu';
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
    <div className="min-h-screen bg-primary p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button className="text-white p-2 hover:bg-white/10 rounded-full">
          <LuArrowLeft size={24} />
        </button>
        <div className="bg-yellow-400 px-4 py-1 rounded-full text-black flex items-center gap-1">
          <IoTimeOutline className="w-4 h-4" />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <button className="text-white p-2 rounded-full">
          <RiMenu4Line className="h-6 w-6" />
        </button>
      </div>

      {/* Question Counter */}
      <div className="text-white mb-6">
        <p className="text-lg">
          Question 01 <span className="float-right">1 of 2</span>
        </p>
        <div className="w-full flex gap-2 mt-2">
          <div className="flex-1 bg-yellow-400 h-2 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-white/20 h-2 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-white/20 h-2 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-white/20 h-2 rounded-full transition-all duration-300" />
          <div className="flex-1 bg-white/20 h-2 rounded-full transition-all duration-300" />
        </div>
      </div>

      {/* Question */}
      <div className="text-white text-3xl font-bold mb-10">
        What is the largest land animal in the world?
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-2 gap-4 mb-20">
        <button
          onClick={() => setSelectedAnswer('A')}
          className={`${selectedAnswer === 'A' ? 'bg-yellow-400' : 'bg-white'} text-black p-4 rounded-2xl text-left hover:bg-yellow-300 transition-colors duration-200`}
        >
          A. Elephant
        </button>
        <button
          onClick={() => setSelectedAnswer('B')}
          className={`${selectedAnswer === 'B' ? 'bg-yellow-400' : 'bg-white'} text-black p-4 rounded-2xl text-left hover:bg-yellow-300 transition-colors duration-200`}
        >
          B. Rhino
        </button>
        <button
          onClick={() => setSelectedAnswer('C')}
          className={`${selectedAnswer === 'C' ? 'bg-yellow-400' : 'bg-white'} text-black p-4 rounded-2xl text-left hover:bg-yellow-300 transition-colors duration-200`}
        >
          C. Giraffe
        </button>
        <button
          onClick={() => setSelectedAnswer('D')}
          className={`${selectedAnswer === 'D' ? 'bg-yellow-400' : 'bg-white'} text-black p-4 rounded-2xl text-left hover:bg-yellow-300 transition-colors duration-200`}
        >
          D. Tiger
        </button>
      </div>
    </div>
  );
}
