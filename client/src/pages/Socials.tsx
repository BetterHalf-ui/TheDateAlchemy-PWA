import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle, Calendar, Users, Heart } from "lucide-react";
import logoOrange from "@assets/1 (1)_1759505350950.png";

const tiles = [
  {
    id: 1,
    title: "Ice Breaking Questions",
    icon: MessageCircle,
    link: "/questions",
    available: true,
    bgImage: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80"
  },
  {
    id: 2,
    title: "Under Progress",
    icon: Calendar,
    link: null,
    available: false,
    bgImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80"
  },
  {
    id: 3,
    title: "Under Progress",
    icon: Users,
    link: null,
    available: false,
    bgImage: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80"
  },
  {
    id: 4,
    title: "Under Progress",
    icon: Heart,
    link: null,
    available: false,
    bgImage: "https://images.unsplash.com/photo-1522543558187-768b6df7c25c?w=800&q=80"
  }
];

export default function Socials() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 md:p-6 border-b flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <img src={logoOrange} alt="The Date Alchemy" className="h-8 w-auto" data-testid="img-logo-socials" />
      </div>

      <div className="flex-1 p-6 md:p-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" data-testid="text-socials-title">
              Singles Socials
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-socials-subtitle">
              Connect, explore, and discover meaningful connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tiles.map((tile) => {
              const Icon = tile.icon;
              const TileContent = (
                <div 
                  className="relative h-64 md:h-80 rounded-md overflow-hidden group cursor-pointer hover-elevate active-elevate-2"
                  data-testid={`card-tile-${tile.id}`}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${tile.bgImage})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
                  
                  <div className="relative h-full flex flex-col items-center justify-center text-white p-6 text-center">
                    <Icon className="h-12 w-12 mb-4" />
                    <h3 className="text-2xl font-semibold" data-testid={`text-tile-title-${tile.id}`}>
                      {tile.title}
                    </h3>
                    {!tile.available && (
                      <span className="mt-2 text-sm text-white/80" data-testid={`text-tile-status-${tile.id}`}>
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
              );

              return tile.available ? (
                <Link key={tile.id} href={tile.link!}>
                  {TileContent}
                </Link>
              ) : (
                <div key={tile.id}>
                  {TileContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
