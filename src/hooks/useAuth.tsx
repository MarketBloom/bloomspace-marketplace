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
      
      // First, create the auth user
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
        const error = new Error("No user data returned after signup");
        console.error(error);
        toast.error("Failed to create account. Please try again.");
        return { data: null, error };
      }

      console.log("Auth user created successfully:", authData.user.id);

      // If role is florist, create initial florist profile
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
          // Don't throw here, as the auth user is already created
          toast.error("Account created but there was an error setting up your florist profile.");
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
        throw error;
      }

      const role = data.user?.user_metadata?.role;
      if (role === "florist") {
        navigate("/florist-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/");
    } catch (error: any) {
      toast.error(error.message);
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