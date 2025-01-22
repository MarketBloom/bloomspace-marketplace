import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { FloristProfile } from "@/types/florist";

export const useFloristProfile = (floristId: string | undefined) => {
  const queryClient = useQueryClient();

  const {
    data: floristProfile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["floristProfile", floristId],
    queryFn: async () => {
      if (!floristId) throw new Error("Florist ID is required");
      
      const { data, error } = await supabase
        .from("florist_profiles")
        .select("*")
        .eq("id", floristId)
        .single();

      if (error) throw error;

      // Ensure proper typing of JSON fields
      const profile: FloristProfile = {
        ...data,
        operating_hours: data.operating_hours as Record<string, { open: string; close: string }>,
        delivery_slot_duration: String(data.delivery_slot_duration || ''),
        delivery_cutoff_times: (data.delivery_cutoff_times || {}) as Record<string, string>,
        delivery_time_frames: (data.delivery_time_frames || {
          morning: false,
          midday: false,
          afternoon: false,
        }) as { morning: boolean; midday: boolean; afternoon: boolean },
        coordinates: String(data.coordinates || ''),
        geocoded_address: (data.geocoded_address || {}) as Record<string, any>,
        social_links: (data.social_links || {}) as Record<string, string>,
      };

      return profile;
    },
    enabled: !!floristId,
  });

  const updateProfile = useMutation({
    mutationFn: async (updatedProfile: Partial<FloristProfile>) => {
      if (!floristId) throw new Error("Florist ID is required");

      const { error } = await supabase
        .from("florist_profiles")
        .update(updatedProfile)
        .eq("id", floristId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["floristProfile", floristId] });
    },
  });

  return {
    floristProfile,
    isLoading,
    error,
    updateProfile,
  };
};