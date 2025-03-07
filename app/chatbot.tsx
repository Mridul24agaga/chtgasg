"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, X, MessageSquare, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateChatResponse } from "@/app/actions/chat-actions"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface PredefinedQuestion {
  id: string
  text: string
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I'm your AI assistant. How can I help you with our AI chatbot solutions today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Add predefined questions
  const predefinedQuestions: PredefinedQuestion[] = [
    { id: "q1", text: "What services do you offer?" },
    { id: "q2", text: "How much does it cost?" },
    { id: "q3", text: "Do you offer multilingual support?" },
    { id: "q4", text: "How can I contact you?" },
  ]

  // Add this function to handle clicking on a predefined question
  const handlePredefinedQuestion = (questionText: string) => {
    if (isLoading) return

    setInput(questionText)
    // Use setTimeout to allow the input to update before submitting
    setTimeout(() => {
      const event = { preventDefault: () => {} } as React.FormEvent
      handleSubmit(event)
    }, 100)
  }

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Get response from Gemini API
      const response = await generateChatResponse(
        [...messages, userMessage],
        "You are an AI assistant for Chatinify, a company that provides AI chatbot solutions. Only answer questions related to the website content. If asked about anything unrelated, politely redirect the conversation to the company's services.",
      )

      // Add assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat bubble button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#4ecdc4] text-black shadow-lg hover:bg-[#3dbdb5] transition-all duration-300 animate-bounce"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Chat window */}
      <div
        className={cn(
          "flex flex-col w-full max-w-[400px] h-[500px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 transform",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
        )}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a1433] text-black">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#4ecdc4] flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-black" />
            </div>
            <div>
              <h3 className="font-medium text-white">Chatinify</h3>
              <p className="text-xs text-white">AI Chatbot Solutions</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    message.role === "user" ? "bg-[#4ecdc4] text-black" : "bg-gray-200 text-black",
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-gray-200 text-black">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat input */}
        <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
          <div className="flex items-end space-x-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4ecdc4] resize-none text-black"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "p-2 rounded-full",
                input.trim() && !isLoading
                  ? "bg-[#4ecdc4] text-black hover:bg-[#3dbdb5]"
                  : "bg-gray-200 text-black cursor-not-allowed",
              )}
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Predefined Questions */}
          <div className="mt-3 flex flex-wrap gap-2">
            {predefinedQuestions.map((question) => (
              <button
                key={question.id}
                type="button"
                onClick={() => handlePredefinedQuestion(question.text)}
                disabled={isLoading}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {question.text}
              </button>
            ))}
          </div>
        </form>
      </div>
    </div>
  )
}

