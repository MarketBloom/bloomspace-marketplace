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
      florist_profiles: {
        Row: {
          about_text: string | null
          address: string
          banner_url: string | null
          commission_rate: number | null
          created_at: string
          delivery_cutoff: string | null
          delivery_end_time: string | null
          delivery_fee: number | null
          delivery_radius: number | null
          delivery_slot_duration: unknown | null
          delivery_start_time: string | null
          id: string
          is_premium: boolean | null
          logo_url: string | null
          minimum_order_amount: number | null
          operating_hours: Json | null
          premium_since: string | null
          setup_completed_at: string | null
          setup_progress: number | null
          social_links: Json | null
          store_name: string
          store_status: string | null
          updated_at: string
          verified: boolean | null
        }
        Insert: {
          about_text?: string | null
          address: string
          banner_url?: string | null
          commission_rate?: number | null
          created_at?: string
          delivery_cutoff?: string | null
          delivery_end_time?: string | null
          delivery_fee?: number | null
          delivery_radius?: number | null
          delivery_slot_duration?: unknown | null
          delivery_start_time?: string | null
          id: string
          is_premium?: boolean | null
          logo_url?: string | null
          minimum_order_amount?: number | null
          operating_hours?: Json | null
          premium_since?: string | null
          setup_completed_at?: string | null
          setup_progress?: number | null
          social_links?: Json | null
          store_name: string
          store_status?: string | null
          updated_at?: string
          verified?: boolean | null
        }
        Update: {
          about_text?: string | null
          address?: string
          banner_url?: string | null
          commission_rate?: number | null
          created_at?: string
          delivery_cutoff?: string | null
          delivery_end_time?: string | null
          delivery_fee?: number | null
          delivery_radius?: number | null
          delivery_slot_duration?: unknown | null
          delivery_start_time?: string | null
          id?: string
          is_premium?: boolean | null
          logo_url?: string | null
          minimum_order_amount?: number | null
          operating_hours?: Json | null
          premium_since?: string | null
          setup_completed_at?: string | null
          setup_progress?: number | null
          social_links?: Json | null
          store_name?: string
          store_status?: string | null
          updated_at?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "florist_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: string
          order_id: string | null
          price_at_time: number
          product_id: string | null
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          order_id?: string | null
          price_at_time: number
          product_id?: string | null
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          order_id?: string | null
          price_at_time?: number
          product_id?: string | null
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          commission_amount: number
          created_at: string
          customer_id: string | null
          delivery_address: string | null
          delivery_time: string | null
          florist_id: string | null
          id: string
          is_delivery: boolean | null
          status: string | null
          stripe_payment_id: string | null
          total_amount: number
          updated_at: string
        }
        Insert: {
          commission_amount: number
          created_at?: string
          customer_id?: string | null
          delivery_address?: string | null
          delivery_time?: string | null
          florist_id?: string | null
          id?: string
          is_delivery?: boolean | null
          status?: string | null
          stripe_payment_id?: string | null
          total_amount: number
          updated_at?: string
        }
        Update: {
          commission_amount?: number
          created_at?: string
          customer_id?: string | null
          delivery_address?: string | null
          delivery_time?: string | null
          florist_id?: string | null
          id?: string
          is_delivery?: boolean | null
          status?: string | null
          stripe_payment_id?: string | null
          total_amount?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_florist_id_fkey"
            columns: ["florist_id"]
            isOneToOne: false
            referencedRelation: "florist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          florist_id: string | null
          id: string
          images: string[] | null
          in_stock: boolean | null
          is_hidden: boolean | null
          occasion: string[] | null
          price: number
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          florist_id?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          is_hidden?: boolean | null
          occasion?: string[] | null
          price: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          florist_id?: string | null
          id?: string
          images?: string[] | null
          in_stock?: boolean | null
          is_hidden?: boolean | null
          occasion?: string[] | null
          price?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_florist_id_fkey"
            columns: ["florist_id"]
            isOneToOne: false
            referencedRelation: "florist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          customer_id: string | null
          florist_id: string | null
          id: string
          order_id: string | null
          rating: number | null
          updated_at: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          florist_id?: string | null
          id?: string
          order_id?: string | null
          rating?: number | null
          updated_at?: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          customer_id?: string | null
          florist_id?: string | null
          id?: string
          order_id?: string | null
          rating?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_florist_id_fkey"
            columns: ["florist_id"]
            isOneToOne: false
            referencedRelation: "florist_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
