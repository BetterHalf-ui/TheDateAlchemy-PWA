import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import logoOrange from "@assets/1 (1)_1759505350950.png";
import heroImage from "@assets/clay-banks-VsC9m6Tgx6o-unsplash_1761738016724.jpg";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      
      <div className="absolute top-8 left-8 z-10">
        <img src={logoOrange} alt="The Date Alchemy" className="h-12 md:h-16 w-auto" data-testid="img-logo" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center">
        <div className="max-w-4xl space-y-6 mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-hero-title">
            Redefining Dating for Busy Professionals in Mauritius
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-light" data-testid="text-hero-subtitle">
            Relationship Science Based Match Making
          </p>
        </div>
      </div>

      <div className="relative z-10 pb-12 md:pb-16 flex flex-col sm:flex-row gap-4 items-center justify-center px-6">
        <Link href="/auth">
          <Button 
            size="lg"
            className="min-w-[200px] text-lg h-12 bg-primary hover-elevate active-elevate-2 border border-primary-border"
            data-testid="button-auth"
          >
            The Date Alchemy
          </Button>
        </Link>
        
        <Link href="/socials">
          <Button 
            size="lg"
            className="min-w-[200px] text-lg h-12 bg-primary hover-elevate active-elevate-2 border border-primary-border"
            data-testid="button-socials"
          >
            Singles Socials
          </Button>
        </Link>
      </div>
    </div>
  );
}
