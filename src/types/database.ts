import { OrderItemsTable, OrdersTable } from './order';
import { ProductSizesTable, ProductsTable } from './product';
import { ReviewsTable } from './review';
import { FloristApplicationsTable } from './application';
import { FloristProfilesTable } from './florist';
import { ProfilesTable } from './profile';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      florist_applications: FloristApplicationsTable;
      florist_profiles: FloristProfilesTable;
      order_items: OrderItemsTable;
      orders: OrdersTable;
      product_sizes: ProductSizesTable;
      products: ProductsTable;
      profiles: ProfilesTable;
      reviews: ReviewsTable;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};