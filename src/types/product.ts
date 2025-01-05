export interface Size {
  id: string;
  name: string;
  price: number;
  isDefault: boolean;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  product_sizes?: Size[];
}