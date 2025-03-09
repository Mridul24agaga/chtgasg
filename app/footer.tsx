import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0a1433] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="mb-6 inline-block">
              <Image src="/lgoo.png" alt="Chatinify Logo" width={150} height={50} className="mb-4" />
            </Link>
            <p className="text-gray-400 mb-6">
              Transforming businesses with cutting-edge AI chatbot solutions that drive engagement, streamline support,
              and boost conversions.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/chatingify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#4ecdc4] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/chatingify"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#4ecdc4] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#home" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#blog" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Customer Support Chatbots
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Sales & Lead Generation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Multilingual Chatbots
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  E-commerce Assistants
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  Scheduling Chatbots
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-[#4ecdc4] mr-3" />
                <a href="mailto:chatingify@gmail.com" className="text-gray-400 hover:text-[#4ecdc4] transition-colors">
                  chatingify@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#081128] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Chatingify. All rights reserved.
            </p>
           
          </div>
        </div>
      </div>
    </footer>
  )
}

