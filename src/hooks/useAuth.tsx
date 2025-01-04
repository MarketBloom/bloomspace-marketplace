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
        toast.error(authError.message);
        return { data: null, error: authError };
      }

      if (!authData.user) {
        console.error("No user data returned after signup");
        toast.error("Failed to create account");
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
          toast.error("Account created but there was an error setting up your florist profile");
        } else {
          console.log("Florist profile created successfully");
        }
      }

      toast.success("Account created successfully!");
      
      if (role === "florist") {
        navigate("/become-florist");
      } else {
        navigate("/dashboard");
      }

      return { data: authData, error: null };
    } catch (error: any) {
      console.error("Unexpected error during signup:", error);
      toast.error(error.message || "An unexpected error occurred");
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return { data: null, error };
      }

      toast.success("Welcome back!");
      
      const role = data.user?.user_metadata?.role;
      if (role === "florist") {
        navigate("/florist-dashboard");
      } else {
        navigate("/dashboard");
      }

      return { data, error: null };
    } catch (error: any) {
      toast.error(error.message);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      // First, clear the local state
      setUser(null);
      setSession(null);

      // Then sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error signing out:", error);
        toast.error(error.message);
        return { error };
      }

      // Only navigate and show success message if sign out was successful
      toast.success("Signed out successfully");
      navigate("/");
      return { error: null };
    } catch (error: any) {
      console.error("Unexpected error during sign out:", error);
      toast.error(error.message || "An unexpected error occurred");
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