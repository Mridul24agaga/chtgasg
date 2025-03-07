"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-[#0a1433] text-white">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a1433] z-50 transition-transform duration-300 transform ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#4ecdc4] transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <nav className="flex flex-col items-center mt-16 space-y-8">
          <Link
            href="/"
            className="text-2xl font-medium text-white hover:text-[#4ecdc4] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            HOME
          </Link>
          <Link
            href="/#about"
            className="text-2xl font-medium text-white hover:text-[#4ecdc4] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            href="/#services"
            className="text-2xl font-medium text-white hover:text-[#4ecdc4] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            SERVICES
          </Link>
          <Link
            href="/#pricing"
            className="text-2xl font-medium text-white hover:text-[#4ecdc4] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            PRICING
          </Link>
          <Link
            href="/#blog"
            className="text-2xl font-medium text-[#4ecdc4] hover:text-[#4ecdc4] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            BLOG
          </Link>
          <Link
            href="/#contact"
            className="text-2xl font-medium text-white hover:text-[#4ecdc4] transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT
          </Link>

          <Link
            href="/#contact"
            className="mt-8 bg-[#4ecdc4] text-[#0a1433] px-8 py-3 rounded-md font-medium hover:bg-[#4ecdc4]/90 transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </nav>
      </div>

      {/* Navigation */}
      <header className="flex justify-between items-center p-4 relative z-10">
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden h-10 w-10 flex items-center justify-center text-white hover:text-[#4ecdc4] transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Link href="/" className="text-xl font-bold">
            <span className="text-white">ai</span>
            <span className="text-[#4ecdc4]">Nexa</span>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link href="/" className="relative group px-3 py-2 text-white">
            <span className="hover:text-[#4ecdc4] transition-colors">HOME</span>
          </Link>

          <Link href="/#about" className="relative group px-3 py-2 text-white">
            <span className="hover:text-[#4ecdc4] transition-colors">ABOUT</span>
          </Link>

          <Link href="/#services" className="relative group px-3 py-2 text-white">
            <span className="hover:text-[#4ecdc4] transition-colors">SERVICES</span>
          </Link>

          <Link href="/#pricing" className="relative group px-3 py-2 text-white">
            <span className="hover:text-[#4ecdc4] transition-colors">PRICING</span>
          </Link>

          <Link href="/#blog" className="relative group px-3 py-2 text-[#4ecdc4]">
            <span className="hover:text-[#4ecdc4] transition-colors">BLOG</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#4ecdc4]"></span>
          </Link>

          <Link href="/#contact" className="relative group px-3 py-2 text-white">
            <span className="hover:text-[#4ecdc4] transition-colors">CONTACT</span>
          </Link>
        </nav>

        <Link
          href="/#contact"
          className="bg-[#4ecdc4] text-[#0a1433] px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#4ecdc4]/90 transition-colors relative z-10"
        >
          Get in Touch
        </Link>
      </header>
    </div>
  )
}

