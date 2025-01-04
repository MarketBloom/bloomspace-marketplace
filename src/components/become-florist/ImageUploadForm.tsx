import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadFormProps {
  onImageUpload: (type: "logo" | "banner", url: string) => void;
}

export const ImageUploadForm = ({ onImageUpload }: ImageUploadFormProps) => {
  const [uploading, setUploading] = useState({ logo: false, banner: false });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "banner"
  ) => {
    try {
      setUploading({ ...uploading, [type]: true });
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("florist-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("florist-images")
        .getPublicUrl(filePath);

      onImageUpload(type, publicUrl);
      toast.success(`${type === "logo" ? "Logo" : "Banner"} uploaded successfully`);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(`Error uploading ${type === "logo" ? "logo" : "banner"}`);
    } finally {
      setUploading({ ...uploading, [type]: false });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="logo">Store Logo</Label>
        <div className="mt-2">
          <input
            id="logo"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "logo")}
            disabled={uploading.logo}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("logo")?.click()}
            disabled={uploading.logo}
          >
            {uploading.logo ? "Uploading..." : "Upload Logo"}
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="banner">Store Banner</Label>
        <div className="mt-2">
          <input
            id="banner"
            type="file"
            accept="image/*"
            onChange={(e) => handleFileUpload(e, "banner")}
            disabled={uploading.banner}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("banner")?.click()}
            disabled={uploading.banner}
          >
            {uploading.banner ? "Uploading..." : "Upload Banner"}
          </Button>
        </div>
      </div>
    </div>
  );
};