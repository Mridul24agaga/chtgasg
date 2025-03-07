import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingSection() {
  return (
    <section id="pricing" className="relative bg-[#0a1433] py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-[#4ecdc4] opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#4361ee] opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#4ecdc4]"></div>
            <span className="text-[#4ecdc4] font-medium">PRICING PLANS</span>
            <div className="w-6 h-0.5 bg-[#4ecdc4]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            AI CHATBOTS FOR EVERY BUSINESS
          </h2>

          <p className="text-gray-400 text-lg">
            Choose the perfect AI chatbot solution for your business needs with our flexible pricing options.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-[#0c1a40] rounded-2xl overflow-hidden border border-gray-800 transition-transform hover:-translate-y-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">AI Chatbot</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$499</span>
                <span className="text-gray-400 mb-1">one-time</span>
              </div>
              <p className="text-gray-400 mb-6">Retainer: $35/mo</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Pre-built AI responses for FAQs</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Basic lead capture</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Website integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Monthly usage up to 1,000 conversations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Basic analytics</span>
                </li>
              </ul>

              <Link
                href="#contact"
                className="block w-full py-3 px-6 bg-transparent border border-[#4ecdc4] text-[#4ecdc4] text-center rounded-lg font-medium hover:bg-[#4ecdc4]/10 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Advanced Plan */}
          <div className="bg-[#0c1a40] rounded-2xl overflow-hidden border border-gray-800 transition-transform hover:-translate-y-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Advanced AI Chatbot</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$1,299</span>
                <span className="text-gray-400 mb-1">one-time</span>
              </div>
              <p className="text-gray-400 mb-6">Retainer: $80/mo</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom-trained AI responses</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Multi-channel integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Lead qualification & appointment booking</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Monthly usage up to 5,000 conversations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Advanced analytics & insights</span>
                </li>
              </ul>

              <Link
                href="#contact"
                className="block w-full py-3 px-6 bg-transparent border border-[#4ecdc4] text-[#4ecdc4] text-center rounded-lg font-medium hover:bg-[#4ecdc4]/10 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Enterprise Plan - Most Popular */}
          <div className="bg-gradient-to-b from-[#0c1a40] to-[#102045] rounded-2xl overflow-hidden border border-[#4ecdc4] transition-transform hover:-translate-y-2 relative">
            {/* Most Popular Badge */}
            <div className="absolute top-0 right-0 bg-[#4ecdc4] text-[#0a1433] text-xs font-bold py-1 px-4 rounded-bl-lg">
              MOST POPULAR
            </div>

            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Enterprise AI Chatbot</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$2,999</span>
                <span className="text-gray-400 mb-1">one-time</span>
              </div>
              <p className="text-gray-400 mb-6">Retainer: $199/mo</p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Fully customized AI assistant</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Advanced NLP capabilities</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">CRM & analytics tools integration</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited conversations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">24/7 premium support</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-[#4ecdc4] mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Custom AI model development</span>
                </li>
              </ul>

              <Link
                href="#contact"
                className="block w-full py-3 px-6 bg-[#4ecdc4] text-[#0a1433] text-center rounded-lg font-medium hover:bg-[#4ecdc4]/90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-gray-400">
            All plans include a 14-day satisfaction guarantee. Need a custom solution?
            <Link href="#contact" className="text-[#4ecdc4] hover:underline ml-1">
              Contact us
            </Link>{" "}
            for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  )
}

