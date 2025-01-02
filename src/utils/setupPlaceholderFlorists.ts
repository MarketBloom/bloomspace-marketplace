import { createClient } from '@supabase/supabase-js';
import { toast } from "sonner";

const SUPABASE_URL = "https://senfrikghcfchjjlosxx.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlbmZyaWtnaGNmY2hqamxvc3h4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTc5MDMyNiwiZXhwIjoyMDUxMzY2MzI2fQ.vHR8J6gq6qQvwQn4rUNMhHwmQOFzHBhETgQkGXLRbtY";

const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

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

type UpdateProfileToFloristParams = {
  profile_id: string;
  store_name: string;
  phone_number: string;
};

type AddFloristProductsParams = {
  florist_id: string;
};

export const setupPlaceholderFlorists = async () => {
  try {
    console.log('Starting placeholder florists setup...');
    
    for (const florist of PLACEHOLDER_FLORISTS) {
      console.log(`Creating florist account for ${florist.storeName}...`);
      
      // Create the user account using admin client
      const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
        email: florist.email,
        password: florist.password,
        email_confirm: true,
        user_metadata: {
          full_name: florist.storeName,
          role: "florist"
        }
      });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      console.log('Auth data:', authData);

      if (authData.user) {
        console.log(`Setting up florist profile for ${florist.storeName}...`);
        
        // Call our database function to set up the florist profile
        const { error: fnError } = await adminClient.functions.invoke(
          'update_profile_to_florist',
          {
            body: {
              profile_id: authData.user.id,
              store_name: florist.storeName,
              phone_number: florist.phone
            } satisfies UpdateProfileToFloristParams
          }
        );

        if (fnError) {
          console.error('Profile setup error:', fnError);
          throw fnError;
        }

        console.log(`Adding products for ${florist.storeName}...`);
        
        // Add products for this florist
        const { error: productsError } = await adminClient.functions.invoke(
          'add_florist_products',
          {
            body: {
              florist_id: authData.user.id
            } satisfies AddFloristProductsParams
          }
        );

        if (productsError) {
          console.error('Products setup error:', productsError);
          throw productsError;
        }

        console.log(`Successfully created florist: ${florist.storeName}`);
        toast.success(`Created placeholder florist: ${florist.storeName}`);
      }
    }

    console.log('All placeholder florists created successfully!');
    toast.success("All placeholder florists have been created successfully!");
  } catch (error) {
    console.error("Error setting up placeholder florists:", error);
    toast.error("Failed to create placeholder florists");
  }
};