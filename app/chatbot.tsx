"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

export default function MockChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Quick questions
  const quickQuestions = [
    "Tell me about your AI Chatbot solutions",
    "Explain your content automation services",
    "What are your pricing options?",
    "Can you show me some of your past work?",
  ]

  // Mock responses for common questions
  const mockResponses: Record<string, string> = {
    default:
      "Thank you for your message. Our team at Chatingify specializes in creating custom AI chatbot solutions for businesses of all sizes. How can I help you further?",
    pricing:
      "We offer three pricing tiers:\n\n1. Basic: $499 one-time + $35/mo\n2. Advanced: $1,299 one-time + $80/mo\n3. Enterprise: $2,999 one-time + $199/mo\n\nAll plans include a 14-day satisfaction guarantee. Would you like more details about what's included in each plan?",
    services:
      "Our AI chatbot solutions include:\n\n• Customer Support Chatbots\n• Sales & Lead Generation\n• Multilingual Chatbots\n• E-commerce Assistants\n• Scheduling Chatbots\n• Document Processing Bots\n\nEach solution is customized to meet your specific business needs.",
    "past work":
      "We've delivered over 35 successful projects in the past 5 years. Some of our recent work includes:\n\n• An e-commerce assistant for a fashion retailer that increased sales by 23%\n• A multilingual support bot for a global SaaS company\n• A document processing solution for a legal firm\n\nWould you like me to arrange a demo to show you these in action?",
    contact:
      "You can reach our team at chatingify@gmail.com. Would you like us to contact you directly to discuss your specific requirements?",
  }

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen)
    // Focus input when chat opens
    setTimeout(() => {
      if (!isOpen && inputRef.current) {
        inputRef.current.focus()
      }
    }, 300)
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  // Get mock response based on user input
  const getMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()

    if (input.includes("pricing") || input.includes("cost") || input.includes("price") || input.includes("how much")) {
      return mockResponses.pricing
    } else if (
      input.includes("services") ||
      input.includes("offer") ||
      input.includes("provide") ||
      input.includes("solution")
    ) {
      return mockResponses.services
    } else if (
      input.includes("past") ||
      input.includes("work") ||
      input.includes("portfolio") ||
      input.includes("example")
    ) {
      return mockResponses["past work"]
    } else if (
      input.includes("contact") ||
      input.includes("email") ||
      input.includes("phone") ||
      input.includes("reach")
    ) {
      return mockResponses.contact
    } else {
      return mockResponses.default
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const responseText = getMockResponse(userMessage.content)
      setMessages((prev) => [...prev, { role: "assistant", content: responseText }])
      setIsLoading(false)
    }, 1000)
  }

  // Handle quick question click
  const handleQuickQuestionClick = (question: string) => {
    setInput(question)
    setTimeout(() => {
      const form = document.getElementById("chat-form") as HTMLFormElement
      if (form) form.requestSubmit()
    }, 100)
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isLoading])

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to close chat
      if (e.key === "Escape" && isOpen) {
        toggleChat()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  // Determine if we're on mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return (
    <div
      style={{
        position: "fixed",
        bottom: isMobile ? "0" : "24px",
        right: isMobile ? "0" : "24px",
        zIndex: 9999,
        fontFamily: "Inter, system-ui, sans-serif",
        width: isMobile && isOpen ? "100%" : "auto",
        height: isMobile && isOpen ? "100%" : "auto",
      }}
    >
      {isOpen ? (
        <div
          style={{
            width: isMobile ? "100%" : "350px",
            height: isMobile ? "100%" : "auto",
            maxHeight: isMobile ? "100%" : "80vh",
            backgroundColor: "white",
            borderRadius: isMobile ? "0" : "8px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            animation: isMobile ? "slideUp 0.3s ease" : "fadeIn 0.3s ease",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              backgroundColor: "#4169E1", // Royal blue similar to the image
              padding: "14px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <div>
              <div style={{ fontWeight: "bold", fontSize: "16px" }}>Chatingify AI Assistant</div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Always here to help</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "20px",
                  height: "3px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  borderRadius: "2px",
                }}
              ></div>
              <button
                onClick={toggleChat}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0",
                  margin: "0",
                  width: "24px",
                  height: "24px",
                }}
              >
                ×
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef}
            style={{
              height: isMobile ? "calc(100% - 130px)" : "400px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              padding: "10px",
              backgroundColor: "#f5f7fb",
              flexGrow: 1,
            }}
          >
            {messages.length === 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    marginBottom: "4px",
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#4169E1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "8px",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "10px 14px",
                      borderRadius: "0 12px 12px 12px",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      maxWidth: "calc(100% - 50px)",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    <p style={{ margin: 0 }}>Hi there! 👋 Welcome to Chatingify AI Solutions.</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    padding: "0 4px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "#4169E1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "8px",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      padding: "10px 14px",
                      borderRadius: "0 12px 12px 12px",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      maxWidth: "calc(100% - 50px)",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    <p style={{ margin: 0 }}>How can I help you transform your business with AI today?</p>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    margin: "12px 0",
                  }}
                >
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestionClick(question)}
                      style={{
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        backgroundColor: "white",
                        fontSize: "14px",
                        textAlign: "left",
                        cursor: "pointer",
                        color: "#333",
                        transition: "all 0.2s ease",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        margin: "0",
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: message.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: "4px",
                    padding: "0 4px",
                  }}
                >
                  {message.role === "assistant" && (
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "#4169E1",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "8px",
                        flexShrink: 0,
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                  <div
                    style={{
                      backgroundColor: message.role === "user" ? "#4169E1" : "white",
                      padding: "10px 14px",
                      borderRadius: message.role === "user" ? "12px 0 12px 12px" : "0 12px 12px 12px",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      maxWidth: "calc(100% - 50px)",
                      fontSize: "14px",
                      color: message.role === "user" ? "white" : "#333",
                      alignSelf: message.role === "user" ? "flex-end" : "flex-start",
                      whiteSpace: "pre-line", // Preserve line breaks in responses
                    }}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div
                style={{
                  display: "flex",
                  marginBottom: "4px",
                  padding: "0 4px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#4169E1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "8px",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "10px 14px",
                    borderRadius: "0 12px 12px 12px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    maxWidth: "calc(100% - 50px)",
                  }}
                >
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div
            style={{
              borderTop: "1px solid #E5E7EB",
              padding: "10px",
              backgroundColor: "white",
            }}
          >
            <form
              id="chat-form"
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: "8px",
                position: "relative",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  borderRadius: "20px",
                  border: "1px solid #E5E7EB",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                style={{
                  backgroundColor: "#4169E1",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
                  opacity: isLoading || !input.trim() ? 0.7 : 1,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="white" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#4169E1",
            color: "white",
            border: "none",
            boxShadow: "0 4px 16px rgba(65, 105, 225, 0.3)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            marginRight: isMobile ? "16px" : "0",
            marginBottom: isMobile ? "16px" : "0",
            animation: "pulse 2s infinite",
            position: "absolute",
            bottom: "0",
            right: "0",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z"
              fill="white"
            />
          </svg>
        </button>
      )}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(65, 105, 225, 0.4);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(65, 105, 225, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(65, 105, 225, 0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .typing-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          height: 16px;
        }
        
        .typing-dots span {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #4169E1;
          opacity: 0.6;
        }
        
        .typing-dots span:nth-child(1) {
          animation: bounce 1s infinite;
        }
        
        .typing-dots span:nth-child(2) {
          animation: bounce 1s infinite 0.2s;
        }
        
        .typing-dots span:nth-child(3) {
          animation: bounce 1s infinite 0.4s;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
        
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        
        body, html {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}

