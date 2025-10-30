import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { IceBreakingQuestion } from "@shared/schema";
import { iceBreakingQuestions } from "@/data/questions";
import logoWhite from "@assets/2 (1)_1759505350960.png";

export default function Questions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: supabaseQuestions, isLoading } = useQuery<IceBreakingQuestion[]>({
    queryKey: ['/api/ice-breaking-questions'],
    queryFn: async () => {
      if (!supabase) {
        return [];
      }
      const { data, error } = await supabase
        .from('ice_breaking_questions')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: isSupabaseConfigured()
  });

  const questions = isSupabaseConfigured() && supabaseQuestions 
    ? supabaseQuestions.map(q => q.question)
    : iceBreakingQuestions;

  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    setOffset(currentTouch - touchStart);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && questions && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    
    setOffset(0);
    setTouchStart(0);
    setTouchEnd(0);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (questions && currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  if (isSupabaseConfigured() && isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
        <div className="text-white text-xl" data-testid="text-loading">
          Loading questions...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col">
      <div className="p-4 md:p-6 flex items-center justify-between border-b border-white/10">
        <Link href="/socials">
          <Button variant="ghost" size="sm" className="gap-2 text-white hover:bg-white/10" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <img src={logoWhite} alt="The Date Alchemy" className="h-8 w-auto" data-testid="img-logo-questions" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
        <div 
          className="w-full max-w-3xl mb-8 rounded-lg overflow-hidden shadow-2xl"
          data-testid="img-featured"
        >
          <img 
            src="https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=1200&q=80"
            alt="Connection"
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        <div 
          ref={containerRef}
          className="w-full max-w-3xl select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="transition-all duration-300 ease-out"
            style={{
              transform: isDragging ? `translateX(${offset}px)` : 'translateX(0)',
              opacity: isDragging ? 0.8 : 1
            }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12 min-h-[200px] flex items-center justify-center">
              <p 
                className="text-2xl md:text-3xl lg:text-4xl text-white text-center font-light leading-relaxed"
                data-testid="text-question"
              >
                {questions[currentIndex]}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="text-white hover:bg-white/10 disabled:opacity-30 h-12 w-12"
            data-testid="button-previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="text-white/80 text-sm font-medium min-w-[100px] text-center" data-testid="text-counter">
            {currentIndex + 1} / {questions.length}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            disabled={currentIndex === questions.length - 1}
            className="text-white hover:bg-white/10 disabled:opacity-30 h-12 w-12"
            data-testid="button-next"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="mt-6 text-center text-white/60 text-sm" data-testid="text-swipe-hint">
          Swipe left or right to navigate
        </div>
      </div>
    </div>
  );
}
