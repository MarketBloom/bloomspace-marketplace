import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Download, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Papa from "papaparse";
import { toast } from "sonner";

interface BulkProductOperationsProps {
  floristId: string;
  onProductsUploaded: () => void;
}

interface ProductCSVData {
  title: string;
  description: string;
  base_price: string;
  category: string;
  occasions: string;
  size_names: string;
  size_prices: string;
}

export const BulkProductOperations = ({ floristId, onProductsUploaded }: BulkProductOperationsProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          const products = results.data
            .filter((row): row is ProductCSVData => 
              Boolean(row && typeof row === 'object' && 'title' in row && 'base_price' in row)
            );
          
          for (const product of products) {
            try {
              // Insert the main product
              const { data: productData, error: productError } = await supabase
                .from("products")
                .insert({
                  florist_id: floristId,
                  title: product.title,
                  description: product.description || "",
                  price: parseFloat(product.base_price),
                  category: product.category || null,
                  occasion: product.occasions ? product.occasions.split(",") : [],
                })
                .select()
                .single();

              if (productError) throw productError;

              // Handle sizes if provided
              if (product.size_names && product.size_prices) {
                const sizeNames = product.size_names.split(",");
                const sizePrices = product.size_prices.split(",");
                const basePrice = parseFloat(product.base_price);

                const sizes = sizeNames.map((name: string, index: number) => ({
                  product_id: productData.id,
                  name: name.trim(),
                  price_adjustment: parseFloat(sizePrices[index]) - basePrice,
                  is_default: index === 0
                }));

                const { error: sizesError } = await supabase
                  .from("product_sizes")
                  .insert(sizes);

                if (sizesError) throw sizesError;
              }
            } catch (error) {
              console.error("Error processing product:", product.title, error);
              toast.error(`Failed to import product: ${product.title}`);
            }
          }

          toast.success(`Successfully imported ${products.length} products`);
          onProductsUploaded();
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          toast.error("Failed to parse CSV file");
        },
      });
    } catch (error) {
      console.error("Error uploading products:", error);
      toast.error("Failed to upload products");
    } finally {
      setIsUploading(false);
      // Reset the file input
      event.target.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Product Operations</CardTitle>
        <CardDescription>
          Import multiple products at once using a CSV file
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Prepare your CSV file with the following columns: title, description, base_price, category, occasions, size_names, size_prices. 
            Make sure to follow the correct format for each column.
          </AlertDescription>
        </Alert>

        <div className="relative w-full">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
            disabled={isUploading}
          />
          <Button
            variant="default"
            onClick={() => document.getElementById("csv-upload")?.click()}
            disabled={isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload CSV"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};