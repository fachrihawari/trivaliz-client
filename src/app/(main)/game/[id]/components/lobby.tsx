'use client'

import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"
import { useParams } from "next/navigation"
import { useState } from "react"
import { FiCopy, FiShare2 } from "react-icons/fi"
import { GiCheckeredFlag } from "react-icons/gi"

export default function Lobby() {
  const { id } = useParams()
  const [copied, setCopied] = useState(false)
  const shareableUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/game/${id}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl)
      setCopied(true)
      alert("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      alert("Failed to copy link")
    }
  }

  const share = async () => {
    try {
      await navigator.share({
        title: 'Trivaliz - Join my game!',
        text: 'Join my trivia game!',
        url: shareableUrl
      })
    } catch (err) {
      alert("Failed to share")
    }
  }

  return (
    <div className="min-h-full bg-white">
      <div className="h-14 px-4 border-b flex items-center">
        <Link href="/" replace className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
          <LuArrowLeft size={24} />
        </Link>
        <h1 className="ml-2 font-medium">Game Lobby</h1>
      </div>

      <div className="p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center mb-2">Waiting for Players</h2>
          <p className="text-gray-600 text-center mb-8">The game will start by the host, be ready!</p>

          <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
            <h3 className="text-lg font-semibold mb-4">Invite Players</h3>
            <div className="space-y-4">
              <p className="text-gray-600">Share this link with your friends to join the game:</p>
              <input
                type="text"
                value={shareableUrl}
                readOnly
                className="flex-1 w-full bg-gray-50 border rounded-lg px-4 py-2.5 text-base focus:outline-none focus:border-primary transition"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex flex-1 justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition"
                  title="Copy link"
                >
                  <FiCopy size={20} className={copied ? "text-green-500" : "text-gray-600"} />
                  <span className="text-sm font-medium text-gray-700">Copy</span>
                </button>
                <button
                  onClick={share}
                  className="flex flex-1 justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition"
                  title="Share"
                >
                  <FiShare2 size={20} className="text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Share</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Players (3/4)</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Lobby Open</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-primary bg-opacity-10 rounded-lg border border-primary">
                <div className="w-10 h-10 bg-primary bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-medium">You</span>
                </div>
                <div className="flex-1">
                  <span className="font-medium">You (Host)</span>
                  <div className="text-primary font-medium text-sm">Game Master</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition">
                <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-700 font-medium">JS</span>
                </div>
                <div className="flex-1">
                  <span className="font-medium">John Smith</span>
                  <div className="text-gray-500 text-sm">Ready</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-200 hover:bg-green-50 transition">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                  <span className="text-green-700 font-medium">AJ</span>
                </div>
                <div className="flex-1">
                  <span className="font-medium">Alice Johnson</span>
                  <div className="text-gray-500 text-sm">Ready</div>
                </div>
              </div>

            <button
              className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <GiCheckeredFlag />
              Start Game
            </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
