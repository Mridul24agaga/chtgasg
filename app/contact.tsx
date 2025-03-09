"use client"

import type React from "react"
import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [calendlyLoaded, setCalendlyLoaded] = useState(false)

  // Load Calendly script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.onload = () => setCalendlyLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      // Replace YOUR_ACCESS_KEY with your actual Web3Forms access key
      const apiKey = "4fffa478-d53d-44ad-8b04-e47740bb8194"

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          // Optional: Add a from_name to customize the sender name in emails
          from_name: "Your Website Contact Form",
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(true)
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setError("Something went wrong. Please try again later.")
      }
    } catch (err) {
      setError("An error occurred. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative bg-white py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#4ecdc4] opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#4361ee] opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#4361ee]"></div>
            <span className="text-[#4361ee] font-medium">GET IN TOUCH</span>
            <div className="w-6 h-0.5 bg-[#4361ee]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1433] mb-6 leading-tight">
            LET'S START A CONVERSATION
          </h2>

          <p className="text-gray-600 text-lg">
            Have questions about our AI chatbot solutions? Ready to transform your business with cutting-edge AI
            technology? Reach out to us today.
          </p>
        </div>

        {/* Contact Form and Calendly in a flex container */}
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#0a1433] mb-6">Send us a message</h3>

            {success ? (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Thank you for your message!</p>
                <p>We will get back to you as soon as possible.</p>
              </div>
            ) : null}

            {error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Error</p>
                <p>{error}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4ecdc4] focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4ecdc4] focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4ecdc4] focus:border-transparent outline-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                  placeholder="How can we help you?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#4ecdc4] focus:border-transparent outline-none transition-all resize-none disabled:opacity-70 disabled:cursor-not-allowed"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              {/* Web3Forms requires a hidden honeypot field to prevent spam */}
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-4 bg-[#4361ee] text-white font-medium rounded-lg hover:bg-[#4361ee]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4361ee] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Calendly Widget */}
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-12 lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#0a1433] mb-6">Schedule a Meeting</h3>
            <p className="text-gray-600 mb-6">
              Prefer to talk directly? Schedule a call with our team at a time that works for you.
            </p>

            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/chatingify?hide_gdpr_banner=1"
              style={{ minWidth: "320px", height: "700px" }}
            >
              {!calendlyLoaded && (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-[#4361ee]" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

