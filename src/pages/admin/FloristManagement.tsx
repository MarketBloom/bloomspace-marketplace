import { useEffect, useState } from "react";
import { StoreSettingsForm } from "@/components/store-management/StoreSettingsForm";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { FloristProfile } from "@/types/florist";

export const FloristManagement = () => {
  const [floristProfile, setFloristProfile] = useState<FloristProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFloristProfile();
  }, []);

  const fetchFloristProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('florist_profiles')
        .select('*')
        .single();

      if (error) throw error;
      
      // Convert operating_hours from Json to proper type
      const profile = {
        ...data,
        operating_hours: data.operating_hours as Record<string, { open: string; close: string }>
      };
      
      setFloristProfile(profile);
    } catch (error) {
      console.error('Error fetching florist profile:', error);
      toast({
        title: "Error",
        description: "Failed to load florist profile",
        variant: "destructive",
      });
    }
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      await fetchFloristProfile();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Store Management</h1>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <StoreSettingsForm 
          initialData={floristProfile || undefined}
          onSubmit={handleProfileUpdate}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FloristManagement;