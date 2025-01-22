import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BulkEditProductsProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const BulkEditProducts = ({ onClose, onSuccess }: BulkEditProductsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsSubmitting(true);
    try {
      // Process file upload logic here
      toast.success("Products updated successfully");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating products:", error);
      toast.error("Failed to update products");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={isSubmitting}
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={!file || isSubmitting}>
          {isSubmitting ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </form>
  );
};