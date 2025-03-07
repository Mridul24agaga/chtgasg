"use server"

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

// Website content for context
const WEBSITE_CONTENT = `
Chatinify is a company that provides AI chatbot solutions.

Services:
- Customer Support Chatbots: 24/7 intelligent support chatbots that handle customer inquiries, troubleshoot common issues, and escalate complex problems to human agents.
- Sales & Lead Generation: Conversational chatbots that qualify leads, answer product questions, and guide customers through the sales funnel to boost conversion rates.
- Multilingual Chatbots: AI-powered chatbots that communicate fluently in multiple languages, helping you expand your global reach and support international customers.
- E-commerce Assistants: Shopping assistants that help customers find products, compare options, track orders, and process returns to enhance the online shopping experience.
- Scheduling Chatbots: Intelligent assistants that manage appointments, send reminders, and handle rescheduling to streamline your booking process and reduce no-shows.
- Document Processing Bots: AI chatbots that extract information from documents, answer questions about content, and help users navigate complex information systems.

Pricing Plans:
1. AI Chatbot: $499 one-time + $35/mo retainer
   - Pre-built AI responses for FAQs
   - Basic lead capture
   - Website integration
   - Monthly usage up to 1,000 conversations
   - Basic analytics

2. Advanced AI Chatbot: $1,299 one-time + $80/mo retainer
   - Custom-trained AI responses
   - Multi-channel integration
   - Lead qualification & appointment booking
   - Monthly usage up to 5,000 conversations
   - Advanced analytics & insights

3. Enterprise AI Chatbot: $2,999 one-time + $199/mo retainer
   - Fully customized AI assistant
   - Advanced NLP capabilities
   - CRM & analytics tools integration
   - Unlimited conversations
   - 24/7 premium support
   - Custom AI model development

Company Information:
- 5+ years on the market
- 35+ projects delivered so far
- Contact: chatinify@gmail.com
`

interface Message {
  role: "user" | "assistant"
  content: string
}

export async function generateChatResponse(messages: Message[], systemPrompt: string): Promise<string> {
  try {
    // Initialize Google Generative AI with API key
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

    // Use gemini-2.0-flash model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-001",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    })

    // Instead of using chat history, we'll use a direct prompt approach
    // Create the prompt with context and conversation history
    let prompt = `${systemPrompt}

WEBSITE CONTENT CONTEXT:
${WEBSITE_CONTENT}

CONVERSATION HISTORY:
`

    // Add conversation history to the prompt
    messages.forEach((msg) => {
      prompt += `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}\n\n`
    })

    // Add final instruction
    prompt += `
Please provide a helpful, friendly, and concise response based only on the website content. If the question is unrelated to Chatinify's services, politely redirect the conversation to the company's AI chatbot solutions.
`

    // Generate content directly without using chat history
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text
  } catch (error) {
    console.error("Error generating chat response:", error)
    return "I'm sorry, I encountered an error while processing your request. Please try again later."
  }
}

