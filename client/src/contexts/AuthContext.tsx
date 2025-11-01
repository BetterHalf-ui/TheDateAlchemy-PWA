import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { UserProfile } from "@shared/schema";

interface AuthContextType {
  user: SupabaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from user_profiles table
  const fetchProfile = async (userId: string) => {
    if (!supabase) {
      console.warn("Supabase not configured");
      return null;
    }

    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  };

  // Initialize auth state on mount
  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const initAuth = async () => {
      if (!supabase) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        // Set a safety timeout - if auth doesn't complete in 5 seconds, stop loading
        timeoutId = setTimeout(() => {
          if (mounted) setLoading(false);
        }, 5000);

        // Get initial session with timeout protection
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!error && mounted) {
          setUser(session?.user ?? null);
          if (session?.user) {
            const userProfile = await fetchProfile(session.user.id);
            if (mounted) setProfile(userProfile);
          }
        }
      } catch (error) {
        // Silently handle errors - auth is not critical for viewing content
      } finally {
        clearTimeout(timeoutId);
        if (mounted) setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes (only if supabase exists)
    let subscription: any;
    if (supabase) {
      try {
        const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            if (mounted) {
              setUser(session?.user ?? null);
              if (session?.user) {
                const userProfile = await fetchProfile(session.user.id);
                if (mounted) setProfile(userProfile);
              } else {
                setProfile(null);
              }
            }
          }
        );
        subscription = sub;
      } catch (error) {
        // Silently handle auth listener setup errors
      }
    }

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    if (!supabase) {
      return { error: new Error("Supabase not configured") };
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: new Error("Supabase not configured") };
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error };
      }

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    if (!supabase) {
      return;
    }
    await supabase.auth.signOut();
  };

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
