import { Json } from './database';

export interface ProductSizesTable {
  Row: {
    id: string;
    product_id: string | null;
    name: string;
    price_adjustment: number;
    is_default: boolean | null;
    created_at: string;
    updated_at: string;
    images: string[] | null;
  };
  Insert: {
    id?: string;
    product_id?: string | null;
    name: string;
    price_adjustment: number;
    is_default?: boolean | null;
    created_at?: string;
    updated_at?: string;
    images?: string[] | null;
  };
  Update: Partial<ProductSizesTable['Insert']>;
}

export interface ProductsTable {
  Row: {
    id: string;
    florist_id: string | null;
    title: string;
    description: string | null;
    price: number;
    images: string[] | null;
    category: string | null;
    occasion: string[] | null;
    in_stock: boolean | null;
    is_hidden: boolean | null;
    created_at: string;
    updated_at: string;
  };
  Insert: {
    id?: string;
    florist_id?: string | null;
    title: string;
    description?: string | null;
    price: number;
    images?: string[] | null;
    category?: string | null;
    occasion?: string[] | null;
    in_stock?: boolean | null;
    is_hidden?: boolean | null;
    created_at?: string;
    updated_at?: string;
  };
  Update: Partial<ProductsTable['Insert']>;
}

export interface Size {
  id: string;
  name: string;
  price: string;
  images?: string[];
  isDefault?: boolean;
}

export interface Product {
  id: string;
  florist_id: string | null;
  title: string;
  description: string | null;
  price: number;
  images?: string[] | null;
  category?: string | null;
  occasion?: string[] | null;
  in_stock?: boolean | null;
  is_hidden?: boolean | null;
  created_at: string;
  updated_at: string;
  product_sizes?: Size[];
}