import { Bot, MessageSquare, Globe, ShoppingCart, Calendar, FileText } from "lucide-react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function ServicesSection() {
  return (
    <section className="relative bg-[#0a1433] py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 right-1/3 w-80 h-80 rounded-full bg-[#4ecdc4] opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/2 w-64 h-64 rounded-full bg-[#4361ee] opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#4ecdc4]"></div>
            <span className="text-[#4ecdc4] font-medium">OUR SERVICES</span>
            <div className="w-6 h-0.5 bg-[#4ecdc4]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            ADVANCED AI CHATBOT SOLUTIONS
          </h2>

          <p className="text-gray-400 text-lg">
            Our specialized AI chatbots are designed to transform customer interactions, streamline support, and drive
            engagement across all your digital channels.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Service Card 1 */}
          <div className="bg-[#0c1a40] p-8 rounded-xl border border-gray-800 transition-transform hover:translate-y-[-5px]">
            <div className="p-4 bg-[#4ecdc4]/10 rounded-xl inline-block mb-4">
              <Bot className="w-8 h-8 text-[#4ecdc4]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Customer Support Chatbots</h3>
            <p className="text-gray-400 mb-6">
              24/7 intelligent support chatbots that handle customer inquiries, troubleshoot common issues, and escalate
              complex problems to human agents.
            </p>
            <Link href="#" className="text-[#4ecdc4] hover:text-[#4ecdc4]/80 flex items-center gap-2">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Service Card 2 */}
          <div className="bg-[#0c1a40] p-8 rounded-xl border border-gray-800 transition-transform hover:translate-y-[-5px]">
            <div className="p-4 bg-[#4ecdc4]/10 rounded-xl inline-block mb-4">
              <MessageSquare className="w-8 h-8 text-[#4ecdc4]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Sales & Lead Generation</h3>
            <p className="text-gray-400 mb-6">
              Conversational chatbots that qualify leads, answer product questions, and guide customers through the
              sales funnel to boost conversion rates.
            </p>
            <Link href="#" className="text-[#4ecdc4] hover:text-[#4ecdc4]/80 flex items-center gap-2">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Service Card 3 */}
          <div className="bg-[#0c1a40] p-8 rounded-xl border border-gray-800 transition-transform hover:translate-y-[-5px]">
            <div className="p-4 bg-[#4ecdc4]/10 rounded-xl inline-block mb-4">
              <Globe className="w-8 h-8 text-[#4ecdc4]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Multilingual Chatbots</h3>
            <p className="text-gray-400 mb-6">
              AI-powered chatbots that communicate fluently in multiple languages, helping you expand your global reach
              and support international customers.
            </p>
            <Link href="#" className="text-[#4ecdc4] hover:text-[#4ecdc4]/80 flex items-center gap-2">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Service Card 4 */}
          <div className="bg-[#0c1a40] p-8 rounded-xl border border-gray-800 transition-transform hover:translate-y-[-5px]">
            <div className="p-4 bg-[#4ecdc4]/10 rounded-xl inline-block mb-4">
              <ShoppingCart className="w-8 h-8 text-[#4ecdc4]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">E-commerce Assistants</h3>
            <p className="text-gray-400 mb-6">
              Shopping assistants that help customers find products, compare options, track orders, and process returns
              to enhance the online shopping experience.
            </p>
            <Link href="#" className="text-[#4ecdc4] hover:text-[#4ecdc4]/80 flex items-center gap-2">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Service Card 5 */}
          <div className="bg-[#0c1a40] p-8 rounded-xl border border-gray-800 transition-transform hover:translate-y-[-5px]">
            <div className="p-4 bg-[#4ecdc4]/10 rounded-xl inline-block mb-4">
              <Calendar className="w-8 h-8 text-[#4ecdc4]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Scheduling Chatbots</h3>
            <p className="text-gray-400 mb-6">
              Intelligent assistants that manage appointments, send reminders, and handle rescheduling to streamline
              your booking process and reduce no-shows.
            </p>
            <Link href="#" className="text-[#4ecdc4] hover:text-[#4ecdc4]/80 flex items-center gap-2">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          {/* Service Card 6 */}
          <div className="bg-[#0c1a40] p-8 rounded-xl border border-gray-800 transition-transform hover:translate-y-[-5px]">
            <div className="p-4 bg-[#4ecdc4]/10 rounded-xl inline-block mb-4">
              <FileText className="w-8 h-8 text-[#4ecdc4]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Document Processing Bots</h3>
            <p className="text-gray-400 mb-6">
              AI chatbots that extract information from documents, answer questions about content, and help users
              navigate complex information systems.
            </p>
            <Link href="#" className="text-[#4ecdc4] hover:text-[#4ecdc4]/80 flex items-center gap-2">
              Learn more
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 bg-[#4ecdc4] text-[#0a1433] font-medium px-8 py-4 rounded-lg hover:bg-[#4ecdc4]/90 transition-colors"
          >
            Explore Our Chatbot Solutions
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

