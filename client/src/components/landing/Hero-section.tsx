import { Button } from "@/components/ui/button"
import { Play, Star, Users } from "lucide-react"

import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted/50 pt-8 pb-20 ">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full opacity-60 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-primary/70 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-accent rounded-full opacity-50 animate-pulse"></div>
      <div className="absolute top-60 right-1/3 w-2 h-2 bg-secondary rounded-full opacity-60 animate-pulse"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 ">
            <div className="inline-block">
              <span className="bg-secondary text-secondary-foreground px-4 pb-1 pt-1  rounded-full text-sm font-medium border border-border">
                Welcome To TestMaster
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Master Your Skills
                <br />
                <span className="text-primary">Ace Every Test</span>
              </h1>

              <p className="text-2xl text-muted-foreground leading-relaxed max-w-lg">
                Practice with thousands of topic-wise MCQs in a time-bound environment. Boost your knowledge and exam
                performance with our comprehensive test platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link to='generate'>
              <Button
              
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-xl shadow-xl hover:shadow-xl transition-all duration-200"
               >
                <Link to="/generate">
    Start Testing Free
  </Link>
          
              </Button>
                
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent hover:text-accent-foreground px-10 py-6 text-xl  transition-all duration-200"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full border-2 border-background"></div>
                  <div className="w-12 h-12 bg-secondary/80 rounded-full border-2 border-background"></div>
                  <div className="w-12 h-12 bg-accent rounded-full border-2 border-background"></div>
                  <div className="w-12 h-12 bg-muted rounded-full border-2 border-background flex items-center justify-center text-foreground font-bold text-lg">
                    +
                  </div>
                </div>
                 <div className="ml-4 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className="font-semibold text-lg text-foreground">50k+ Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                    <span className="text-base text-muted-foreground ml-1">4.9 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
               <img
                src="https://illustrations.popsy.co/amber/web-design.svg"
                alt="Students taking online tests illustration"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl shadow-lg p-4 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-full animate-pulse"></div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Test Completed</div>
                  <div className="text-xs text-muted-foreground">Score: 95%</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl shadow-lg p-4 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <div className="text-accent-foreground font-bold text-lg">⏱️</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Time Remaining</div>
                  <div className="text-xs text-muted-foreground">15:30 mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}







