import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PLACEHOLDER_FLORISTS = [
  {
    email: "marktheflorist@example.com",
    password: "placeholder123!",
    storeName: "Mark The Florist",
    phone: "+61 2 9363 1168"
  },
  {
    email: "flowerlaneandco@example.com",
    password: "placeholder123!",
    storeName: "Flower Lane & Co",
    phone: "+61 2 8317 5555"
  },
  {
    email: "fleurdeflo@example.com",
    password: "placeholder123!",
    storeName: "Fleur de Flo",
    phone: "+61 2 9331 6515"
  }
];

export const setupPlaceholderFlorists = async () => {
  try {
    for (const florist of PLACEHOLDER_FLORISTS) {
      // Create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: florist.email,
        password: florist.password,
        options: {
          data: {
            full_name: florist.storeName,
            role: "florist"
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Call our database function to set up the florist profile
        const { error: fnError } = await supabase.rpc(
          'update_profile_to_florist',
          {
            profile_id: authData.user.id,
            store_name: florist.storeName,
            phone_number: florist.phone
          }
        );

        if (fnError) throw fnError;

        // Add products for this florist
        const { error: productsError } = await supabase.rpc(
          'add_florist_products',
          {
            florist_id: authData.user.id
          }
        );

        if (productsError) throw productsError;

        toast.success(`Created placeholder florist: ${florist.storeName}`);
      }
    }

    toast.success("All placeholder florists have been created successfully!");
  } catch (error) {
    console.error("Error setting up placeholder florists:", error);
    toast.error("Failed to create placeholder florists");
  }
};