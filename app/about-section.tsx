import Image from "next/image"
import { ArrowRight, Settings, Users } from "lucide-react"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Enhanced Images */}
          <div className="relative h-[400px] md:h-[550px] group">
            {/* Main image with improved styling */}
            <div
              className="absolute right-0 top-0 w-[90%] h-[90%] rounded-xl overflow-hidden shadow-2xl 
                           transition-all duration-500 group-hover:scale-[1.02] z-10"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/abt.png"
                  alt="Team collaboration"
                  fill
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Smaller overlapping image with improved styling */}
            <div
              className="absolute left-0 bottom-0 w-[65%] h-[65%] rounded-xl overflow-hidden 
                           border-8 border-white shadow-xl transition-all duration-500 
                           group-hover:translate-x-2 group-hover:-translate-y-2 z-20"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/abt1.png"
                  alt="Business meeting"
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent opacity-60"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full border-4 border-[#4361ee]/20 
                           hidden md:block z-0"
            ></div>
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-full border-4 border-[#4361ee]/20 
                           hidden md:block z-0"
            ></div>
          </div>

          {/* Right side - Content */}
          <div className="relative">
            {/* Small label */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 bg-[#4361ee]"></div>
              <span className="text-[#4361ee] font-medium">ABOUT OUR COMPANY</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1433] mb-6 leading-tight">
              WE WANT TO BRING BUSINESS AND THE DIGITAL WORLD TOGETHER
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-8 text-lg">
              This is the main factor that sets us apart from our competition and allows us to deliver a specialist
              business consultancy service. Through our years of experience, we've also learned that while each channel
              has its own set of advantages, they all work best when strategically paired with other channels.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#4361ee]/10 rounded-lg">
                  <Users className="w-6 h-6 text-[#4361ee]" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#0a1433] mb-1">5+</div>
                  <div className="text-gray-600">Years on the market</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#4361ee]/10 rounded-lg">
                  <Settings className="w-6 h-6 text-[#4361ee]" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#0a1433] mb-1">35+</div>
                  <div className="text-gray-600">Projects delivered so far</div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[#4361ee] text-white px-6 py-3 rounded-lg hover:bg-[#4361ee]/90 transition-colors"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#4361ee] opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#4ecdc4] opacity-5 blur-3xl"></div>
    </section>
  )
}

