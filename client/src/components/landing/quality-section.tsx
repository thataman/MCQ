import { Brain, Settings, Headphones, CreditCard } from "lucide-react"

export function QualitySection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Smart Learning",
      description:
        "AI-powered adaptive learning that adjusts to your pace and identifies knowledge gaps for personalized study plans.",
      image: "https://illustrations.popsy.co/amber/artificial-intelligence.svg",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Customization Options",
      description:
        "Tailor your test experience with custom difficulty levels, time limits, and question types to match your needs.",
      image: "https://illustrations.popsy.co/amber/settings.svg",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "24/7 Support",
      description:
        "Get help whenever you need it with our dedicated support team available around the clock via chat and email.",
      image: "https://illustrations.popsy.co/amber/customer-support.svg",
      color: "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Flexible Plans",
      description:
        "Choose from various subscription plans that fit your budget and learning goals, with options for students and professionals.",
      image: "https://illustrations.popsy.co/amber/credit-card.svg",
      color: "bg-orange-100 text-orange-600 dark:bg-orange-900/50 dark:text-orange-400",
    },
  ]

  return (
    <section className="relative bg-gradient-to-br from-background to-muted/50 pt-8 pb-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-600 dark:text-purple-400 font-semibold text-lg">Our Features</span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">
            We Provide The Best Quality
            <br />
            <span className="text-purple-600 dark:text-purple-400">Learning Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with proven educational methods to deliver an unmatched test
            preparation experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden">
              {/* Background gradient that changes on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 dark:from-gray-800 dark:via-purple-900/10 dark:to-blue-900/10 group-hover:from-purple-100/50 group-hover:via-blue-100/30 group-hover:to-purple-50/50 dark:group-hover:from-purple-900/20 dark:group-hover:via-blue-900/15 dark:group-hover:to-purple-800/20 transition-all duration-500 rounded-3xl"></div>

              {/* Main card content */}
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group-hover:border-purple-300/50 dark:group-hover:border-purple-600/50 rounded-3xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-500/10 dark:group-hover:shadow-purple-500/20 group-hover:-translate-y-2">
                {/* Image section */}
                <div className="relative overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 dark:from-purple-400/30 dark:to-blue-400/30 rounded-bl-3xl group-hover:from-purple-500/30 group-hover:to-blue-500/30 dark:group-hover:from-purple-400/40 dark:group-hover:to-blue-400/40 transition-all duration-500"></div>

                  {/* Floating icon */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6 pt-8 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 text-center">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-500 rounded-full"></div>

                {/* Floating particles effect */}
                <div className="absolute top-4 left-4 w-1 h-1 bg-purple-400 dark:bg-purple-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-300"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-500"></div>
                <div className="absolute bottom-16 left-6 w-1 h-1 bg-pink-400 dark:bg-pink-500 rounded-full opacity-0 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
