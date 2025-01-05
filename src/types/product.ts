export interface Size {
  id: string;
  name: string;
  price: string;
  images?: string[];
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  product_sizes?: Size[];
  images?: string[];
  category?: string;
  occasion?: string[];
}