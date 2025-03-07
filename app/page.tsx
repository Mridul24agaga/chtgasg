"use client"

import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import AboutSection from "./about-section"
import ServicesSection from "./services"
import BlogSection from "./blog"
import ContactSection from "./contact"
import Footer from "./footer"
import PricingSection from "./pricing"
import ChatBot from "./chatbot"

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isLoaded, setIsLoaded] = useState(false)
  const [counter, setCounter] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const chartBarsRef = useRef<HTMLDivElement>(null)

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(sectionId)
  }

  // Handle scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      const sections = ["home", "about", "services", "blog", "contact"]

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate counter from 0 to 10
  useEffect(() => {
    if (isLoaded) {
      const interval = setInterval(() => {
        setCounter((prev) => {
          if (prev < 10) {
            return prev + 1
          }
          clearInterval(interval)
          return 10
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isLoaded])

  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Animate chart bars
  useEffect(() => {
    if (chartBarsRef.current && isLoaded) {
      const bars = chartBarsRef.current.querySelectorAll("div")
      bars.forEach((bar, index) => {
        setTimeout(() => {
          bar.classList.add("h-full")
        }, index * 150)
      })
    }
  }, [isLoaded])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particles array
    const particles: Particle[] = []
    const particleCount = Math.min(window.innerWidth < 768 ? 30 : 100, window.innerWidth / 10)

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const isSparkling = Math.random() < 0.3 // 30% of particles will sparkle
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        color: isSparkling
          ? `rgba(255, 255, 255, ${Math.random() * 0.7 + 0.3})`
          : `rgba(78, 205, 196, ${Math.random() * 0.5 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        connections: [],
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        originalX: 0,
        originalY: 0,
        wobble: Math.random() * 2 * Math.PI,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleRadius: Math.random() * 5 + 2,
        sparkle: isSparkling,
        sparkleSize: Math.random() * 3 + 1,
        sparkleOpacity: Math.random() * 0.5 + 0.5,
        sparkleSpeed: Math.random() * 0.05 + 0.02,
        sparklePhase: Math.random() * Math.PI * 2,
      })
    }

    // Store original positions for wobble effect
    particles.forEach((p) => {
      p.originalX = p.x
      p.originalY = p.y
    })

    // Mouse interaction
    const mouse = {
      x: undefined as number | undefined,
      y: undefined as number | undefined,
      radius: 150,
      active: false,
      clickRadius: 0,
      clickX: 0,
      clickY: 0,
      clickActive: false,
    }

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x
      mouse.y = event.y
      mouse.active = true
    })

    window.addEventListener("mouseout", () => {
      mouse.active = false
    })

    // Click effect
    window.addEventListener("click", (event) => {
      mouse.clickX = event.x
      mouse.clickY = event.y
      mouse.clickRadius = 0
      mouse.clickActive = true
    })

    // Touch interaction for mobile
    window.addEventListener(
      "touchmove",
      (event) => {
        if (event.touches.length > 0) {
          mouse.x = event.touches[0].clientX
          mouse.y = event.touches[0].clientY
          mouse.active = true

          // Prevent scrolling when interacting with canvas
          if (event.target === canvas) {
            event.preventDefault()
          }
        }
      },
      { passive: false },
    )

    window.addEventListener("touchend", () => {
      setTimeout(() => {
        mouse.active = false
      }, 100) // Small delay to make interaction feel more responsive
    })

    window.addEventListener(
      "touchstart",
      (event) => {
        if (event.touches.length > 0) {
          mouse.clickX = event.touches[0].clientX
          mouse.clickY = event.touches[0].clientY
          mouse.clickRadius = 0
          mouse.clickActive = true

          // Prevent scrolling when interacting with canvas
          if (event.target === canvas) {
            event.preventDefault()
          }
        }
      },
      { passive: false },
    )

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update click ripple effect
      if (mouse.clickActive) {
        mouse.clickRadius += 5
        ctx.beginPath()
        ctx.arc(mouse.clickX, mouse.clickY, mouse.clickRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(78, 205, 196, ${1 - mouse.clickRadius / 150})`
        ctx.lineWidth = 2
        ctx.stroke()

        if (mouse.clickRadius > 150) {
          mouse.clickActive = false
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply wobble effect
        p.wobble += p.wobbleSpeed
        const wobbleX = Math.sin(p.wobble) * p.wobbleRadius
        const wobbleY = Math.cos(p.wobble) * p.wobbleRadius

        // Move particles
        p.x = p.originalX + p.speedX + wobbleX
        p.y = p.originalY + p.speedY + wobbleY

        p.originalX += p.speedX
        p.originalY += p.speedY

        // Bounce off edges
        if (p.originalX < 0 || p.originalX > canvas.width) {
          p.speedX *= -1
          p.originalX += p.speedX
        }
        if (p.originalY < 0 || p.originalY > canvas.height) {
          p.speedY *= -1
          p.originalY += p.speedY
        }

        // Mouse/touch interaction
        if (mouse.active && mouse.x !== undefined && mouse.y !== undefined) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx)
            const force = (mouse.radius - distance) / mouse.radius

            p.speedX -= Math.cos(angle) * force * 0.1
            p.speedY -= Math.sin(angle) * force * 0.1

            // Limit speed
            const maxSpeed = 3
            const currentSpeed = Math.sqrt(p.speedX * p.speedX + p.speedY * p.speedY)
            if (currentSpeed > maxSpeed) {
              p.speedX = (p.speedX / currentSpeed) * maxSpeed
              p.speedY = (p.speedY / currentSpeed) * maxSpeed
            }
          }
        }

        // Update pulse
        p.pulse += p.pulseSpeed
        if (p.pulse > 1) p.pulse = 0

        // Calculate pulse effect
        const pulseSize = p.radius * (1 + Math.sin(p.pulse * Math.PI * 2) * 0.2)

        // Draw particle with pulse effect
        ctx.beginPath()
        ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Add sparkling effect
        if (p.sparkle) {
          p.sparklePhase += p.sparkleSpeed
          const sparkleOpacity = Math.abs(Math.sin(p.sparklePhase)) * p.sparkleOpacity

          // Draw sparkle
          if (sparkleOpacity > 0.1) {
            const size = p.sparkleSize * sparkleOpacity

            // Horizontal line
            ctx.beginPath()
            ctx.moveTo(p.x - size, p.y)
            ctx.lineTo(p.x + size, p.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${sparkleOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()

            // Vertical line
            ctx.beginPath()
            ctx.moveTo(p.x, p.y - size)
            ctx.lineTo(p.x, p.y + size)
            ctx.strokeStyle = `rgba(255, 255, 255, ${sparkleOpacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()

            // Diagonal lines for extra sparkle
            ctx.beginPath()
            ctx.moveTo(p.x - size * 0.7, p.y - size * 0.7)
            ctx.lineTo(p.x + size * 0.7, p.y + size * 0.7)
            ctx.strokeStyle = `rgba(255, 255, 255, ${sparkleOpacity * 0.7})`
            ctx.lineWidth = 0.5
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(p.x - size * 0.7, p.y + size * 0.7)
            ctx.lineTo(p.x + size * 0.7, p.y - size * 0.7)
            ctx.strokeStyle = `rgba(255, 255, 255, ${sparkleOpacity * 0.7})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }

        // Reset connections
        p.connections = []

        // Find connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            p.connections.push({
              particle: p2,
              opacity: 1 - distance / 100,
            })
          }
        }

        // Draw connections
        for (const connection of p.connections) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(connection.particle.x, connection.particle.y)
          ctx.strokeStyle = `rgba(78, 205, 196, ${connection.opacity * 0.2})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Add glow effect
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
      )
      gradient.addColorStop(0, "rgba(78, 205, 196, 0.05)")
      gradient.addColorStop(1, "rgba(10, 20, 51, 0)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add random sparkles
      if (Math.random() < 0.03) {
        // Control frequency of new sparkles
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 4 + 2
        const opacity = Math.random() * 0.7 + 0.3

        // Draw sparkle
        ctx.beginPath()
        ctx.moveTo(x - size, y)
        ctx.lineTo(x + size, y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x, y - size)
        ctx.lineTo(x, y + size)
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", () => {})
      window.removeEventListener("mouseout", () => {})
      window.removeEventListener("touchmove", () => {})
      window.removeEventListener("touchend", () => {})
      window.removeEventListener("click", () => {})
      window.removeEventListener("touchstart", () => {})
    }
  }, [])

  // Calculate parallax effect based on mouse position
  const getParallaxStyle = (strength = 20) => {
    return {
      transform: `translate(${(mousePosition.x - 0.5) * strength}px, ${(mousePosition.y - 0.5) * strength}px)`,
      transition: "transform 0.1s ease-out",
    }
  }

  return (
    <div className="bg-[#0a1433] text-white overflow-hidden relative font-sans">
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a1433] z-50 transition-transform duration-300 transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-6">
          <Link href="/" className="flex items-center ml-4">
            <div className="relative w-16 h-16 overflow-hidden">
              <Image src="/lgoo.png" width={64} height={64} alt="Logo" className="rounded-lg" />
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-[#4ecdc4] transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
        </div>

        <nav className="flex flex-col items-center mt-12 space-y-8">
          {["home", "about", "services", "blog", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`text-2xl font-medium relative ${
                activeSection === section ? "text-[#4ecdc4]" : "text-white"
              } hover:text-[#4ecdc4] transition-colors`}
            >
              {section.toUpperCase()}
              <span
                className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[#4ecdc4] transform origin-left transition-transform duration-300 ${
                  activeSection === section ? "scale-x-100" : "scale-x-0"
                }`}
              ></span>
            </button>
          ))}

          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
            className="mt-8 bg-[#4ecdc4] text-[#0a1433] px-8 py-3 rounded-md font-medium hover:bg-[#4ecdc4]/90 transition-colors relative overflow-hidden group"
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </Link>
        </nav>
      </div>

      <div id="home" className="min-h-screen relative">
        {/* Background Canvas */}
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />

        {/* Grid Pattern Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] bg-repeat opacity-5 -z-10"></div>

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a1433] via-[#0a1433] to-[#102045] -z-10"></div>

        {/* Glowing Orbs with animation */}
        <div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#4ecdc4] opacity-5 blur-3xl -z-10 animate-pulse"
          style={{
            animationDuration: "8s",
            ...getParallaxStyle(30),
          }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-full bg-[#33bbcf] opacity-5 blur-3xl -z-10 animate-pulse"
          style={{
            animationDuration: "12s",
            animationDelay: "1s",
            ...getParallaxStyle(20),
          }}
        ></div>

        {/* Navigation */}
        <header
          className={`flex justify-between items-center p-4 md:p-6 relative z-10 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000 backdrop-blur-sm bg-[#0a1433]/70 border-b border-[#4ecdc4]/10 sticky top-0`}
        >
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden h-10 w-10 flex items-center justify-center text-white hover:text-[#4ecdc4] transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center ml-2">
              <div className="relative w-16 h-15 overflow-hidden my-2">
                <Image src="/lgoo.png" width={64} height={64} alt="Logo" className="rounded-lg" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-2">
            {["home", "about", "services", "blog", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`relative group px-4 py-2 rounded-md transition-all duration-300 ${
                  activeSection === section ? "text-[#4ecdc4] bg-[#4ecdc4]/10" : "text-white hover:bg-white/5"
                }`}
              >
                <span className="font-medium transition-colors">{section.toUpperCase()}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 mx-auto w-1/2 h-0.5 bg-[#4ecdc4] transform origin-center transition-transform duration-300 ${
                    activeSection === section ? "scale-x-100" : "scale-x-0"
                  } group-hover:scale-x-100`}
                ></span>
              </button>
            ))}
          </nav>

          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("contact")
            }}
            className="bg-[#4ecdc4] text-[#0a1433] px-3 py-1.5 rounded-md text-sm font-medium hover:bg-[#4ecdc4]/90 transition-colors relative z-10 overflow-hidden group"
          >
            <span className="relative z-10">Get in Touch</span>
            <span className="absolute inset-0 w-full h-full bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </Link>
        </header>

        {/* Mobile Content */}
        <div
          className={`md:hidden px-6 pt-12 pb-8 relative z-10 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-1000`}
        >
          {/* Headline */}
          <h1 className="text-[#4ecdc4] text-4xl sm:text-5xl font-bold leading-tight mb-8 tracking-tight">
            <span
              className="block transform transition-all duration-700 delay-100"
              style={{
                transitionProperty: "opacity, transform",
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              UNLOCK THE FUTURE
            </span>
            <span
              className="block transform transition-all duration-700 delay-300"
              style={{
                transitionProperty: "opacity, transform",
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              WITH ARTIFICIAL
            </span>
            <span
              className="block transform transition-all duration-700 delay-500"
              style={{
                transitionProperty: "opacity, transform",
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(20px)",
              }}
            >
              INTELLIGENCE
            </span>
          </h1>

          {/* Description */}
          <p
            className="text-base sm:text-lg text-gray-300 mb-10 leading-relaxed transform transition-all duration-700 delay-700"
            style={{
              transitionProperty: "opacity, transform",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0)" : "translateY(20px)",
            }}
          >
            We harness the power of AI to drive innovation, efficiency, and growth for your business
          </p>

          {/* GET STARTED Button */}
          <div
            className="transform transition-all duration-700 delay-900 mx-auto"
            style={{
              transitionProperty: "opacity, transform",
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
            }}
          >
            <button className="bg-[#4ecdc4] text-[#0a1433] font-medium rounded-full w-36 h-36 flex items-center justify-center relative overflow-hidden group">
              <span className="relative z-10 font-semibold">GET STARTED</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="absolute -inset-1 bg-[#4ecdc4] blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <span className="absolute inset-0 rounded-full border-2 border-[#4ecdc4] scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"></span>
            </button>
          </div>
        </div>

        {/* Desktop Content - Hidden on mobile */}
        <div
          className={`hidden md:block relative z-10 ${
            isLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-1000`}
        >
          <main className="container mx-auto px-4 pt-24 relative">
            <div
              className="text-center max-w-4xl mx-auto mb-16 transform transition-all duration-1000"
              style={{
                transitionProperty: "opacity, transform",
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? "translateY(0)" : "translateY(40px)",
              }}
            >
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                <span className="text-[#4ecdc4] inline-block overflow-hidden">
                  <span
                    className="inline-block transform transition-transform duration-1000 delay-300"
                    style={{ transform: isLoaded ? "translateY(0)" : "translateY(100%)" }}
                  >
                    UNLOCK
                  </span>
                </span>{" "}
                <span className="inline-block overflow-hidden">
                  <span
                    className="inline-block transform transition-transform duration-1000 delay-400"
                    style={{ transform: isLoaded ? "translateY(0)" : "translateY(100%)" }}
                  >
                    THE FUTURE WITH
                  </span>
                </span>
                <br />
                <span className="text-white inline-block overflow-hidden">
                  <span
                    className="inline-block transform transition-transform duration-1000 delay-500"
                    style={{ transform: isLoaded ? "translateY(0)" : "translateY(100%)" }}
                  >
                    ARTIFICIAL INTELLIGENCE
                  </span>
                </span>
              </h1>
            </div>

            <div className="flex flex-row items-center justify-between gap-8">
              {/* Left side - Stats */}
              <div
                className="w-1/3 transform transition-all duration-1000 delay-700"
                style={{
                  transitionProperty: "opacity, transform",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateX(0)" : "translateX(-40px)",
                }}
              >
                <div className="flex flex-col items-center lg:items-end">
                  {/* Chart */}
                  <div ref={chartBarsRef} className="mb-4 flex items-end gap-2 h-32">
                    <div
                      className="w-8 bg-[#4ecdc4] opacity-30 rounded-t-md h-0 transition-[height] duration-1000 ease-out"
                      style={{ transitionDelay: "800ms", height: isLoaded ? "16px" : "0" }}
                    ></div>
                    <div
                      className="w-8 bg-[#4ecdc4] opacity-50 rounded-t-md h-0 transition-[height] duration-1000 ease-out"
                      style={{ transitionDelay: "1000ms", height: isLoaded ? "20px" : "0" }}
                    ></div>
                    <div
                      className="w-8 bg-[#4ecdc4] opacity-70 rounded-t-md h-0 transition-[height] duration-1000 ease-out"
                      style={{ transitionDelay: "1200ms", height: isLoaded ? "24px" : "0" }}
                    ></div>
                    <div
                      className="w-8 bg-[#4ecdc4] opacity-90 rounded-t-md h-0 transition-[height] duration-1000 ease-out"
                      style={{ transitionDelay: "1400ms", height: isLoaded ? "28px" : "0" }}
                    ></div>
                    <div
                      className="w-8 bg-[#4ecdc4] rounded-t-md h-0 transition-[height] duration-1000 ease-out"
                      style={{ transitionDelay: "1600ms", height: isLoaded ? "32px" : "0" }}
                    ></div>
                  </div>

                  {/* Months */}
                  <div className="flex gap-2 text-xs text-gray-400 mb-8">
                    <span className="w-8 text-center">JUN</span>
                    <span className="w-8 text-center">JUL</span>
                    <span className="w-8 text-center">AUG</span>
                    <span className="w-8 text-center">SEP</span>
                    <span className="w-8 text-center">OCT</span>
                  </div>

                  {/* Growth text */}
                  <div className="text-center lg:text-right">
                    <div className="flex items-center justify-center lg:justify-end">
                      <span className="text-7xl font-bold text-white">{counter}</span>
                      <span className="text-4xl text-[#4ecdc4]">x</span>
                    </div>
                    <div className="uppercase text-sm tracking-wider font-medium">
                      <div>GROWTH IN</div>
                      <div>CLIENT SUCCESS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center - 3D Visualization */}
              <div
                className="w-1/3 flex justify-center transform transition-all duration-1000 delay-900"
                style={{
                  transitionProperty: "opacity, transform",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateY(0)" : "translateY(30px)",
                }}
              >
                <div className="relative w-80 h-80">
                  <Image
                    src="/cc.png"
                    alt="AI Neural Network Visualization"
                    width={800}
                    height={800}
                    className="object-contain animate-float"
                  />
                </div>
              </div>

              {/* Right side - Text and CTA */}
              <div
                className="w-1/3 flex flex-col items-start transform transition-all duration-1000 delay-1100"
                style={{
                  transitionProperty: "opacity, transform",
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? "translateX(0)" : "translateX(40px)",
                }}
              >
                <div className="text-left">
                  <p className="text-gray-300 text-lg leading-relaxed">
                    We harness the power of AI to drive innovation, efficiency, and growth for your business
                  </p>
                </div>

                <Link href="#pricing">
                  <button className="bg-[#4ecdc4] hover:bg-[#3dbdb5] text-[#0a1433] font-semibold rounded-full w-36 h-36 flex items-center justify-center transition-colors relative overflow-hidden group">
                    <span className="relative z-10">GET STARTED</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <div className="absolute -inset-1 bg-[#4ecdc4] blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <span className="absolute inset-0 rounded-full border-2 border-[#4ecdc4] scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"></span>
                  </button>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <PricingSection />

      {/* Blog Section (White Background) */}
      <div id="blog">
        <BlogSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
      <ChatBot />
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }

        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// TypeScript interfaces
interface Connection {
  particle: Particle
  opacity: number
}

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  connections: Connection[]
  pulse: number
  pulseSpeed: number
  originalX: number
  originalY: number
  wobble: number
  wobbleSpeed: number
  wobbleRadius: number
  sparkle: boolean
  sparkleSize: number
  sparkleOpacity: number
  sparkleSpeed: number
  sparklePhase: number
}