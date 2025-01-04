import { AddProductForm } from "./AddProductForm";
import { ProductList } from "./ProductList";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

interface ProductManagementProps {
  products: Product[];
  floristId: string;
  onProductAdded: () => void;
}

export const ProductManagement = ({ products, floristId, onProductAdded }: ProductManagementProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Add New Product</h2>
      <AddProductForm floristId={floristId} onProductAdded={onProductAdded} />

      <h2 className="text-2xl font-semibold">Current Products</h2>
      <ProductList products={products} />
    </div>
  );
};