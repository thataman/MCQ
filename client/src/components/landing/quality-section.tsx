import { Clock,BarChart3,CheckCircle } from "lucide-react";

export function QualitySection() {
const features = [
  {
    icon: <CheckCircle className="h-12 w-12" />,
    title: "Topic-Based MCQ Tests",
    description:
      "Choose from hundreds of topics and take targeted multiple-choice tests to assess your knowledge in specific subjects.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400",
  },
  {
    icon: <Clock className="h-12 w-12" />,
    title: "Timed Test Sessions",
    description:
      "Practice under real exam conditions with customizable time limits to improve your speed and accuracy in answering MCQs.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400",
  },
  {
    icon: <BarChart3 className="h-12 w-12" />,
    title: "Detailed Analytics",
    description:
      "Get comprehensive performance analysis with score breakdowns, topic-wise accuracy, and improvement suggestions after each test.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    color:
      "bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400",
  },
];
  return (
    <section className="relative  mx-auto bg-gradient-to-br from-background to-muted/50 pt-8 pb-20 ">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">
            We Provide The Best Quality
            <br />
            <span className="text-primary">Learning Experience</span>
          </h2>
          <p className="text-md  max-w-xl mx-auto">
            Our platform combines cutting-edge technology with proven
            educational methods to deliver an unmatched test preparation
            experience.
          </p>
        </div>

        <div className="grid  grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative overflow-hidden border border-primary/50 rounded-3xl">
              {/* Background gradient that changes on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/50 to-primary group-hover:from-primary/10 group-hover:via-primary/50 group-hover:to-primary transition-all duration-500 rounded-3xl"></div>

              {/* Main card content */}
              <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 group-hover:border-primary/50 rounded-3xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2">
                {/* Image section */}
                <div className="relative overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-48 object-cover transition-transform duration-500"
                  />

                  {/* Decorative corner element */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-bl-3xl group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-500"></div>

                  {/* Floating icon */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <div className="group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6 pt-8 space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-md leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 text-center">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
