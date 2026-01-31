import { useState, useEffect } from 'react';
import { motion, AnimatePresence, } from 'motion/react';
// SignUp
const slidesSignUp = [
  {
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1080&q=80",
    title: "Organize Your Tasks",
    description: "Create and manage your to-do lists in one place"
  },
  {
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1080&q=80",
    title: "Plan Your Day",
    description: "Break your goals into simple, actionable tasks"
  },
  {
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1080&q=80",
    title: "Build Better Habits",
    description: "Stay consistent and turn plans into daily routines"
  }
];

// SignIn
const slidesSignIn = [
  {
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1080&q=80",
    title: "Focus on What Matters",
    description: "Pick up where you left off and stay on track"
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1080&q=80",
    title: "Get Things Done",
    description: "Complete tasks efficiently and meet your deadlines"
  },
  {
    image: "https://images.unsplash.com/photo-1494173853739-c21f58b16055?auto=format&fit=crop&w=1080&q=80",
    title: "Track Your Progress",
    description: "See what you've accomplished and what's next"
  }
];


type TAuthType = "signup" | "signin"

type ImageCarouselPropt = {
  valueAuthType:TAuthType
}
export function ImageCarousel({valueAuthType } : ImageCarouselPropt) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = valueAuthType === "signup" ? slidesSignUp : slidesSignIn;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden lg:flex lg:flex-1 relative bg-gradient-to-br from-blue-600 to-purple-700 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80" />
          </div>

          <div className="relative h-full flex flex-col justify-end p-12 text-white">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl mb-4"
            >
              {slides[currentSlide].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl text-blue-100 mb-8"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className="group relative"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide
                      ? 'w-12 bg-white'
                      : 'w-8 bg-white/40 group-hover:bg-white/60'
                    }`} />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
