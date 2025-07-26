import { Clock, Target, TrendingUp, Users, BookOpen, Award } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time-Bound Tests",
      description:
        "Practice under real exam conditions with customizable time limits to improve your speed and accuracy.",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Topic-Wise MCQs",
      description: "Access thousands of questions organized by subjects and topics for focused learning.",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Instant Results",
      description: "Get immediate feedback with detailed explanations to understand your mistakes.",
      color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Progress Tracking",
      description: "Monitor your improvement with comprehensive analytics and performance insights.",
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Competitive Mode",
      description: "Challenge friends and compete with other students in live quiz battles.",
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/50 dark:text-pink-400",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certification",
      description: "Earn certificates and badges as you complete tests and achieve milestones.",
      color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-600 dark:text-purple-400 font-semibold text-lg">Our Features</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
            Everything You Need to
            <br />
            <span className="text-purple-600 dark:text-purple-400">Excel in Your Tests</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need to master any subject and ace your
            exams with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden">
              {/* Background gradient that changes on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 dark:from-gray-800 dark:via-purple-900/10 dark:to-blue-900/10 group-hover:from-purple-100/50 group-hover:via-blue-100/30 group-hover:to-purple-50/50 dark:group-hover:from-purple-900/20 dark:group-hover:via-blue-900/15 dark:group-hover:to-purple-800/20 transition-all duration-500 rounded-3xl"></div>

              {/* Main card content */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:border-purple-300/50 dark:group-hover:border-purple-600/50 rounded-3xl p-8 h-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/10 dark:group-hover:shadow-purple-500/20 group-hover:-translate-y-2">
                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-400/20 dark:to-blue-400/20 rounded-bl-3xl group-hover:from-purple-500/20 group-hover:to-blue-500/20 dark:group-hover:from-purple-400/30 dark:group-hover:to-blue-400/30 transition-all duration-500"></div>

                {/* Icon container with enhanced styling */}
                <div className="relative z-10 mb-6">
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl`}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  </div>

                  {/* Small decorative dots */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-400 dark:bg-purple-500 rounded-full opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full opacity-40 group-hover:opacity-80 group-hover:scale-150 transition-all duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full"></div>

                {/* Floating particles effect */}
                <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 dark:bg-purple-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-300"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-500"></div>
                <div className="absolute bottom-8 left-6 w-1 h-1 bg-pink-400 dark:bg-pink-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
