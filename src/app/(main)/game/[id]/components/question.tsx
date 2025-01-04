'use client'

import React, { useEffect, useMemo } from 'react';
import { IoTimeOutline } from "react-icons/io5";
import { LuArrowLeft } from 'react-icons/lu';
import { RiMenu4Line } from "react-icons/ri";
import { answersAtom, currentQuestionIndexAtom, gameAtom, statusAtom, timerAtom } from '@/atoms/game';
import { useAtom } from 'jotai';
import { RESET } from 'jotai/utils';

const colors = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-red-500 to-red-600',
  'from-yellow-500 to-yellow-600',
  'from-pink-500 to-pink-600',
  'from-indigo-500 to-indigo-600',
  'from-teal-500 to-teal-600',
  'from-orange-500 to-orange-600',
  'from-cyan-500 to-cyan-600'
]

function useGame() {
  const [game] = useAtom(gameAtom)
  console.log(game, "<<<<< why game")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useAtom(currentQuestionIndexAtom)
  const questions = useMemo(() => game?.questions || [], [game])
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex])
  return {
    game,
    questions,
    currentQuestion,
    currentQuestionIndex,
    setCurrentQuestionIndex
  }
}

function useAnswers() {
  const [answers, setAnswers] = useAtom(answersAtom)
  return { answers, setAnswers }
}

function useTimer() {
  const [timer, setTimer] = useAtom(timerAtom)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useAtom(currentQuestionIndexAtom)
  const [_, setStatus] = useAtom(statusAtom)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      if (currentQuestionIndex === 9) {
        setCurrentQuestionIndex(RESET)
        setTimer(RESET)
        // TODO: RESET EVERYTHING
        setStatus('done')
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
        setTimer(RESET)
      }
    }
  }, [timer, currentQuestionIndex])

  const formattedTime = useMemo(() => formatTime(timer), [timer])
  return formattedTime
}

export default function Question() {
  const { currentQuestion, questions, currentQuestionIndex } = useGame()

  return (
    <div className="h-full p-4 bg-white">
      <Header />

      <QuestionCounter currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />

      {/* Question */}
      <div className="text-gray-800 text-3xl font-bold my-10">
        {currentQuestion?.question}
      </div>

      {/* Answer Options */}
      <p className="text-gray-600 text-lg mb-4">Choose your answer</p>
      <AnswerOptions  />
    </div>
  );
}
function AnswerOptions() {
  const { currentQuestion, currentQuestionIndex } = useGame()
  const { answers, setAnswers } = useAnswers()
  const selectedAnswer = useMemo(() => answers[currentQuestionIndex], [answers, currentQuestionIndex])
  console.log(currentQuestion, "<<<<< why")
  return (
    <div className="grid grid-cols-2 gap-4 mb-20">
      {currentQuestion.answers.map((answer, index) => {
        const color = colors[index]
        return (
          (
            <button
              key={answer.text}
              onClick={() => {

                setAnswers((prevAnswers) => {
                  const newAnswers = [...prevAnswers]
                  newAnswers[currentQuestionIndex] = answer.text
                  return newAnswers
                })

              }}
              className={`text-white hover:opacity-90 bg-gradient-to-r ${color} py-6 rounded-2xl text-center transition-all duration-200 text-lg relative
                ${selectedAnswer ? selectedAnswer === answer.text
                  ? 'font-semibold'
                  : `opacity-25`
                  : ''}
                `}
            >
              {answer.text}
            </button>
          )
        )
      })}
    </div>
  )
}

function QuestionCounter({ currentQuestionIndex, totalQuestions }: { currentQuestionIndex: number, totalQuestions: number }) {
  const currentQuestion = currentQuestionIndex + 1
  return (
    <div className="text-gray-800 mb-6">
      <p className="text-lg">
        Question {currentQuestion} <span className="float-right">{currentQuestion} of {totalQuestions}</span>
      </p>
      <div className="w-full flex gap-2 mt-2">
        {Array.from({ length: totalQuestions }).map((_, index) => (
          <div key={index} className={`flex-1 bg-gray-200 h-4 rounded-full transition-all duration-300 ${index < currentQuestion ? 'bg-yellow-400' : ''}`} />
        ))}
      </div>
    </div>
  )
}

function Header() {
  const timer = useTimer()
  return (
    < div className="flex justify-between items-center mb-6" >
      <button className="text-gray-800 p-2 hover:bg-gray-100 rounded-full">
        <LuArrowLeft size={24} />
      </button>
      <div className="bg-yellow-400 px-4 py-1 rounded-full text-black flex items-center gap-1">
        <IoTimeOutline className="w-4 h-4" />
        <span>{timer}</span>
      </div>
      <button className="text-gray-800 p-2 rounded-full hover:bg-gray-100">
        <RiMenu4Line className="h-6 w-6" />
      </button>
    </div >
  )
}
