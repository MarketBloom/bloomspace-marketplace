import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUploadForm } from "@/components/become-florist/ImageUploadForm";
import { ProductManagement } from "@/components/florist-dashboard/ProductManagement";
import { StoreSettingsForm } from "@/components/store-management/StoreSettingsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const StoreManagement = () => {
  const { user } = useAuth();

  const { data: floristProfile, refetch } = useQuery({
    queryKey: ["floristProfile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("florist_profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { data: products, refetch: refetchProducts } = useQuery({
    queryKey: ["products", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("florist_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const handleImageUpload = async (type: "logo" | "banner", url: string) => {
    try {
      const { error } = await supabase
        .from("florist_profiles")
        .update({ [type === "logo" ? "logo_url" : "banner_url"]: url })
        .eq("id", user?.id);

      if (error) throw error;
      toast.success(`${type === "logo" ? "Logo" : "Banner"} updated successfully`);
      refetch();
    } catch (error) {
      console.error("Error updating store image:", error);
      toast.error(`Failed to update ${type === "logo" ? "logo" : "banner"}`);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Store Management</h1>
          <p className="text-muted-foreground mb-8">
            Customize and manage your store's appearance, products, and settings
          </p>

          <Tabs defaultValue="branding" className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto gap-4">
              <TabsTrigger value="branding" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Branding & Images
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Products
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Store Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Store Branding</CardTitle>
                  <CardDescription>
                    Upload your store's logo and banner image to customize your store's appearance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {floristProfile?.logo_url && (
                      <div>
                        <p className="text-sm font-medium mb-2">Current Logo</p>
                        <img 
                          src={floristProfile.logo_url} 
                          alt="Store Logo" 
                          className="w-32 h-32 object-contain bg-white rounded-lg border"
                        />
                      </div>
                    )}
                    {floristProfile?.banner_url && (
                      <div>
                        <p className="text-sm font-medium mb-2">Current Banner</p>
                        <img 
                          src={floristProfile.banner_url} 
                          alt="Store Banner" 
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    <ImageUploadForm onImageUpload={handleImageUpload} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>
                    Add, edit, and manage your store's products
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductManagement
                    products={products || []}
                    floristId={user.id}
                    onProductAdded={refetchProducts}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Store Settings</CardTitle>
                  <CardDescription>
                    Configure your store's basic information and delivery settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StoreSettingsForm
                    initialData={floristProfile}
                    onUpdate={refetch}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default StoreManagement;