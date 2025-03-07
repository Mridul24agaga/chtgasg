import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

export default function BlogSection() {
  const blogPosts = [
    {
      id: 1,
      slug: "how-chatbots-can-skyrocket-your-business-sales-in-2025",
      title: "How Chatbots Can Skyrocket Your Business Sales in 2025",
      excerpt:
        "Discover how AI-powered chatbots are transforming the way companies interact with customers and driving revenue growth in 2025.",
      image: "/chatbot.jpg",
      date: "March 6, 2025",
      readTime: "10 min read",
      category: "Sales",
    },
    {
      id: 2,
      slug: "chatbots-vs-humans-support-which-one-is-right-for-your-business",
      title: "Chatbots vs. Human Support: Which One is Right for Your Business?",
      excerpt:
        "Compare the pros and cons of AI chatbots and human customer support to determine the best approach for your business needs.",
      image: "/customer.jpg",
      date: "March 6, 2025",
      readTime: "9 min read",
      category: "Customer Support",
    },
    {
      id: 3,
      slug: "chatbots-save-time-money",
      title: "10 Ways Chatbots Save You Time and Money in Customer Support",
      excerpt:
        "Explore ten powerful ways chatbots help businesses save time and money in customer support while improving customer satisfaction.",
      image: "/first.webp",
      date: "March 6, 2025",
      readTime: "8 min read",
      category: "Customer Support",
    },
  ]

  return (
    <section id="blog" className="relative bg-white py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 rounded-full bg-[#4ecdc4] opacity-5 blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/2 w-64 h-64 rounded-full bg-[#4361ee] opacity-5 blur-3xl"></div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-0.5 bg-[#4ecdc4]"></div>
            <span className="text-[#4ecdc4] font-medium">OUR BLOG</span>
            <div className="w-6 h-0.5 bg-[#4ecdc4]"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#0a1433] mb-6 leading-tight">LATEST INSIGHTS & NEWS</h2>

          <p className="text-gray-600 text-lg">
            Stay updated with the latest trends, insights, and news in the world of AI chatbots and conversational
            intelligence.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[#0c1a40] rounded-xl overflow-hidden border border-gray-200 shadow-md transition-transform hover:-translate-y-2 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-[#4ecdc4] text-[#0a1433] text-xs font-semibold py-1 px-3 rounded-full">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>

                <p className="text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  

                  <Link
                    href={`/${post.slug}`}
                    className="text-[#4ecdc4] hover:text-[#4ecdc4]/80 flex items-center gap-1 text-sm font-medium"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

