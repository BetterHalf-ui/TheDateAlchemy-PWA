import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import logoOrange from "@assets/1 (1)_1759505350950.png";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();

  const handleSignUp = () => {
    console.log("Sign Up triggered", { email, password });
    setLocation("/dashboard");
  };

  const handleLogIn = () => {
    console.log("Log In triggered", { email, password });
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-4 md:p-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-4">
            <div className="flex justify-center">
              <img src={logoOrange} alt="The Date Alchemy" className="h-12 w-auto" data-testid="img-logo-auth" />
            </div>
            <CardTitle className="text-2xl text-center" data-testid="text-auth-title">Welcome</CardTitle>
            <CardDescription className="text-center" data-testid="text-auth-description">
              Sign up or log in to continue your journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1 hover-elevate active-elevate-2"
                onClick={handleSignUp}
                data-testid="button-signup"
              >
                Sign Up
              </Button>
              <Button 
                variant="outline"
                className="flex-1 hover-elevate active-elevate-2"
                onClick={handleLogIn}
                data-testid="button-login"
              >
                Log In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
