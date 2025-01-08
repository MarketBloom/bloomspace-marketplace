import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, role: "customer" | "florist" = "customer") => {
    try {
      console.log("Starting signup process...");
      
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });

      if (authError) {
        console.error("Auth error during signup:", authError);
        return { data: null, error: authError };
      }

      if (!authData.user) {
        console.error("No user data returned after signup");
        return { data: null, error: new Error("No user data returned") };
      }

      console.log("User created successfully:", authData.user.id);

      if (role === "florist") {
        console.log("Creating florist profile...");
        const { error: profileError } = await supabase
          .from("florist_profiles")
          .insert({
            id: authData.user.id,
            store_name: "",
            address: "",
            store_status: "private",
            setup_progress: 0
          });

        if (profileError) {
          console.error("Error creating florist profile:", profileError);
        } else {
          console.log("Florist profile created successfully");
        }
      }
      
      if (role === "florist") {
        navigate("/become-florist");
      } else {
        navigate("/dashboard");
      }

      return { data: authData, error: null };
    } catch (error: any) {
      console.error("Unexpected error during signup:", error);
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        return { data: null, error };
      }

      // Get user role from metadata
      const role = data.user?.user_metadata?.role;
      console.log("User role:", role);
      
      return { data, error: null };
    } catch (error: any) {
      console.error("Unexpected error during sign in:", error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setSession(null);

      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        return { error };
      }

      navigate("/");
      return { error: null };
    } catch (error: any) {
      console.error("Unexpected error during sign out:", error);
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };
};