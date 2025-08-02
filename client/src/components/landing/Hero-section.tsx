import { Button } from "@/components/ui/button";
import {  Star, Users,MousePointerClick } from "lucide-react";
import { Badge } from "../ui/badge";
import img2 from "../../assets/img2.png";


import { Link } from "react-router-dom";

const studentPortraitUrls = [
  // Young Indian woman in academic setting, soft background
  "https://images.pexels.com/photos/7010181/pexels-photo-7010181.jpeg",

  // Indian male student with books, university backdrop
  "https://images.pexels.com/photos/12222724/pexels-photo-12222724.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",

  // Indian woman student smiling, plain background
  "https://images.unsplash.com/photo-1610163257952-ac62b77abf70?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400",

  // Indian male in casual-professional wear, neutral background
  "https://images.unsplash.com/photo-1607416574666-0578a28a708d?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400",

  // Indian woman wearing glasses, academic look
  "https://images.pexels.com/photos/10366246/pexels-photo-10366246.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",

  // Young Indian male student, clean white background
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400",

  // Indian female student with backpack, solid background
  "https://images.pexels.com/photos/8199165/pexels-photo-8199165.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",

  // Professional young Indian man, studio lighting
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400",

  // Indian woman student with notebook, neutral backdrop
  "https://images.pexels.com/photos/8923658/pexels-photo-8923658.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1",

  // Young Indian male in formal shirt, plain background
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400"
];

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted/50 h-screen ">
      {/* Background decorative elements */}

      
        <div className="flex justify-around items-center h-full  mx-auto">
          <div className="space-y-5 mt-[-80px] mr-[-20px] ">
            <Badge variant={'outline'} className="text-sm p-2 rounded-2xl px-4 border-primary bg-primary/10 text-primary">
              Welcome To TestMaster
            </Badge>

            <div className="space-y-6">
              <h1 className="text-5xl  font-bold text-foreground leading-tight">
                Master Your Skills
                <br />
                <span className="text-primary">Ace Every Test</span>
              </h1>

              <p className="text-md text-muted-foreground leading-relaxed max-w-lg">
                Practice with thousands of topic-wise MCQs in a time-bound
                environment. Boost your knowledge and exam performance with our
                comprehensive test platform.
              </p>
            </div>

            <div className="">
              <Link to="/generate">
                <Button
                 
                  className="p-4"
                >
                  Start Giving Test For Free 
                  <MousePointerClick className=" h-6 w-6" />
                </Button>
              </Link>
              
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full border-2 border-background">
                  <img className="rounded-full" src={studentPortraitUrls[7]} alt="" />
                  </div>
                  <div className="w-12 h-12 bg-secondary/80 rounded-full border-2 border-background">
                  <img className="rounded-full" src={studentPortraitUrls[9]} alt="" />
                  </div>
                  <div className="w-12 h-12 bg-accent rounded-full border-2 border-background">
                  <img className="rounded-full" src={studentPortraitUrls[7]} alt="" />
                  </div>
                   <div className="w-12 h-12 bg-accent rounded-full border-2 border-background">
                  <img className="rounded-full" src={studentPortraitUrls[5]} alt="" />
                  </div>
                  <div className="w-12 h-12 bg-muted rounded-full border-2 border-background flex items-center justify-center text-foreground font-bold text-lg">
                    +
                  </div>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <span className=" text-md text-foreground">
                      10k+ Students
                    </span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-primary text-primary"
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      4.9 Rating
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
            <div className="relative z-10 mt-[-100px] ml-[-160px]" >
              <img
              height={500}
              width={500}
                src={img2}
                alt="Students taking online tests illustration"
                className=""
              />
            

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl shadow-lg p-3 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                  
                  ✅
                </div>
                <div>
                  <div className="text-sm  text-foreground">
                    Test Completed
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Score: 95%
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl shadow-lg p-3 z-20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <div className="text-accent-foreground font-bold text-lg">
                    ⏱️
                  </div>
                </div>
                <div>
                  <div className="text-sm  text-foreground">
                    Time Remaining
                  </div>
                  <div className="text-xs text-muted-foreground">
                    15:30 mins
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </section>
  );
}
