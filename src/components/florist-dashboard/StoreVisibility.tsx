import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface StoreVisibilityProps {
  storeId: string;
  initialStatus: "private" | "published";
  onStatusChange: (newStatus: "private" | "published") => void;
}

export const StoreVisibility = ({ storeId, initialStatus, onStatusChange }: StoreVisibilityProps) => {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const toggleVisibility = async () => {
    setLoading(true);
    const newStatus = status === "private" ? "published" : "private";

    try {
      const { error } = await supabase
        .from("florist_profiles")
        .update({ store_status: newStatus })
        .eq("id", storeId);

      if (error) throw error;

      setStatus(newStatus);
      onStatusChange(newStatus);
      toast.success(
        `Store ${newStatus === "published" ? "Published" : "Unpublished"}`,
        {
          description: `Your store is now ${
            newStatus === "published" ? "visible to customers" : "private"
          }`,
        }
      );
    } catch (error) {
      toast.error("Error updating store visibility", {
        description: "Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <h3 className="text-sm font-medium">Store Visibility</h3>
        <p className="text-sm text-muted-foreground">
          {status === "private"
            ? "Your store is currently hidden from the marketplace"
            : "Your store is visible to customers"}
        </p>
      </div>
      <Button
        variant={status === "published" ? "default" : "outline"}
        onClick={toggleVisibility}
        disabled={loading}
        className="min-w-[120px]"
      >
        {status === "private" ? (
          <>
            <Eye className="w-4 h-4 mr-2" />
            Publish
          </>
        ) : (
          <>
            <EyeOff className="w-4 h-4 mr-2" />
            Unpublish
          </>
        )}
      </Button>
    </div>
  );
};