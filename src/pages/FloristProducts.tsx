import { useAuth } from "@/hooks/useAuth";
import { DashboardLayout } from "@/components/florist-dashboard/DashboardLayout";
import { FloristProductList } from "@/components/florist-dashboard/FloristProductList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddProductForm } from "@/components/florist-dashboard/AddProductForm";

const FloristProducts = () => {
  const { user } = useAuth();
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Products</h1>
              <p className="text-muted-foreground">
                Manage your product catalog and visibility
              </p>
            </div>
            <Button onClick={() => setIsAddProductOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <FloristProductList floristId={user.id} />

          <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <AddProductForm 
                floristId={user.id} 
                onProductAdded={() => setIsAddProductOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FloristProducts;