import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { FloristProfile } from "@/types/florist";

const FloristDetail = () => {
  const { user } = useAuth();
  const { data: floristProfile, isLoading, error } = useQuery({
    queryKey: ["floristProfile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("florist_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data as FloristProfile;
    },
    enabled: !!user,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading florist details</div>;

  const fullAddress = `${floristProfile.street_address}, ${floristProfile.suburb}, ${floristProfile.state} ${floristProfile.postcode}`;

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">Florist</h2>
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="font-medium">{floristProfile.store_name}</p>
        <p className="text-sm text-gray-600">{fullAddress}</p>
        {floristProfile.about_text && (
          <p className="text-sm text-gray-600 mt-2">{floristProfile.about_text}</p>
        )}
      </div>
    </div>
  );
};

export default FloristDetail;