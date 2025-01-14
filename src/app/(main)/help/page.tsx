'use client'

import Button from "@/components/button";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function Help() {
  return (
    <div className="min-h-dvh bg-white">
      <div className="h-14 px-4 border-b flex items-center">
        <Link href="/" replace className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <LuArrowLeft size={24} />
        </Link>
        <h1 className="ml-2 font-medium">Help</h1>
      </div>

      <div className="py-4 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Welcome to Trivaliz! 🎉
            <span className="block text-lg font-medium text-gray-600 mt-2">Your Fun Quiz Adventure!</span>
          </h1>

          <div className="grid gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-gray-100 w-10 h-10 items-center justify-center flex rounded-full mr-3">🎮</span>
                What is Trivaliz?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Trivaliz is your go-to fun quiz game! Match wits with others, guess popular answers, and win big points! It&apos;s like a party game in your pocket! 🎈
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-gray-100 w-10 h-10 items-center justify-center flex rounded-full mr-3">📝</span>
                How to Play
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center bg-gray-50 p-2 rounded-lg">
                  <span className="text-xl mr-2">🎯</span>
                  Play with friends or make new ones!
                </li>
                <li className="flex items-center bg-gray-50 p-2 rounded-lg">
                  <span className="text-xl mr-2">❓</span>
                  Answer fun survey questions
                </li>
                <li className="flex items-center bg-gray-50 p-2 rounded-lg">
                  <span className="text-xl mr-2">⭐</span>
                  Popular answers = More points!
                </li>
                <li className="flex items-center bg-gray-50 p-2 rounded-lg">
                  <span className="text-xl mr-2">👑</span>
                  Become the quiz champion!
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-gray-100 w-10 h-10 items-center justify-center flex rounded-full mr-3">🎯</span>
                Easy Controls
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <span className="text-2xl mb-1 block">🎯</span>
                  Choose Answer
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <span className="text-2xl mb-1 block">⏱️</span>
                  Beat the Clock
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <span className="text-2xl mb-1 block">🎪</span>
                  Join Games
                </div>
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <span className="text-2xl mb-1 block">🏆</span>
                  Track Progress
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="bg-gray-100 w-10 h-10 items-center justify-center flex rounded-full mr-3">💫</span>
                Need a Hand?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Stuck somewhere? Don&apos;t worry! Our friendly team is here to help you have the best quiz experience! 🌟
              </p>
              <Button className="w-full">
                <span className="mr-2">🎪</span>
                Get Help Now!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
