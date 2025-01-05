import { ProductCard } from "@/components/ProductCard";

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string;
  occasion?: string[];
  displaySize?: string;
  displayPrice?: number;
  sizeId?: string;
  florist_id?: string;
}

interface FloristProductsProps {
  products: Product[];
  floristName: string;
  floristId: string;
  filters: {
    budget?: number[];
    categories?: string[];
    occasions?: string[];
  };
}

export const FloristProducts = ({ 
  products, 
  floristName, 
  floristId, 
  filters 
}: FloristProductsProps) => {
  const filteredProducts = products.filter(product => {
    // Filter by budget
    if (filters.budget && filters.budget.length > 0) {
      const maxBudget = filters.budget[0];
      if ((product.displayPrice || product.price) > maxBudget) {
        return false;
      }
    }

    // Filter by category
    if (filters.categories && filters.categories.length > 0) {
      if (!product.category || !filters.categories.includes(product.category)) {
        return false;
      }
    }

    // Filter by occasion
    if (filters.occasions && filters.occasions.length > 0) {
      if (!product.occasion || !product.occasion.some(occ => filters.occasions?.includes(occ))) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Our Products</h2>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={`${product.id}-${product.sizeId || 'default'}`}
              {...product}
              floristName={floristName}
              floristId={floristId}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">No products found</h2>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more products
          </p>
        </div>
      )}
    </div>
  );
};