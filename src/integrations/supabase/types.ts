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
      favorite_florists: {
        Row: {
          created_at: string
          customer_id: string
          florist_id: string
          id: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          florist_id: string
          id?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          florist_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_florists_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_florists_florist_id_fkey"
            columns: ["florist_id"]
            isOneToOne: false
            referencedRelation: "florist_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      florist_applications: {
        Row: {
          about_business: string | null
          address: string | null
          admin_notes: string | null
          average_order_value: number | null
          created_at: string
          delivery_capabilities: string | null
          email: string
          full_name: string
          has_physical_store: boolean | null
          id: string
          instagram_url: string | null
          phone: string | null
          portfolio_urls: string[] | null
          specialties: string[] | null
          status: string | null
          store_name: string | null
          updated_at: string
          website_url: string | null
          weekly_order_capacity: number | null
          years_experience: number | null
        }
        Insert: {
          about_business?: string | null
          address?: string | null
          admin_notes?: string | null
          average_order_value?: number | null
          created_at?: string
          delivery_capabilities?: string | null
          email: string
          full_name: string
          has_physical_store?: boolean | null
          id?: string
          instagram_url?: string | null
          phone?: string
          portfolio_urls?: string[] | null
          specialties?: string[] | null
          status?: string | null
          store_name?: string | null
          updated_at?: string
          website_url?: string | null
          weekly_order_capacity?: number | null
          years_experience?: number | null
        }
        Update: {
          about_business?: string | null
          address?: string | null
          admin_notes?: string | null
          average_order_value?: number | null
          created_at?: string
          delivery_capabilities?: string | null
          email?: string
          full_name?: string
          has_physical_store?: boolean | null
          id?: string
          instagram_url?: string | null
          phone?: string
          portfolio_urls?: string[] | null
          specialties?: string[] | null
          status?: string | null
          store_name?: string
          updated_at?: string
          website_url?: string | null
          weekly_order_capacity?: number | null
          years_experience?: number | null
        }
        Relationships: []
      }
      florist_profiles: {
        Row: {
          about_text: string | null
          address: string
          banner_url: string | null
          commission_rate: number | null
          coordinates: unknown | null
          created_at: string
          delivery_cutoff: string | null
          delivery_cutoff_times: Json | null
          delivery_days: string[] | null
          delivery_end_time: string | null
          delivery_fee: number | null
          delivery_radius: number | null
          delivery_slot_duration: unknown | null
          delivery_start_time: string | null
          delivery_time_frames: Json | null
          geocoded_address: Json | null
          id: string
          is_premium: boolean | null
          logo_url: string | null
          minimum_order_amount: number | null
          operating_hours: Json | null
          pickup_only_days: string[] | null
          premium_since: string | null
          same_day_enabled: boolean | null
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
          coordinates?: unknown | null
          created_at?: string
          delivery_cutoff?: string | null
          delivery_cutoff_times?: Json | null
          delivery_days?: string[] | null
          delivery_end_time?: string | null
          delivery_fee?: number | null
          delivery_radius?: number | null
          delivery_slot_duration?: unknown | null
          delivery_start_time?: string
          delivery_time_frames?: Json | null
          geocoded_address?: Json | null
          id: string
          is_premium?: boolean | null
          logo_url?: string | null
          minimum_order_amount?: number | null
          operating_hours?: Json | null
          pickup_only_days?: string[] | null
          premium_since?: string | null
          same_day_enabled?: boolean | null
          setup_completed_at?: string
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
          coordinates?: unknown | null
          created_at?: string
          delivery_cutoff?: string | null
          delivery_cutoff_times?: Json | null
          delivery_days?: string[] | null
          delivery_end_time?: string | null
          delivery_fee?: number | null
          delivery_radius?: number | null
          delivery_slot_duration?: unknown | null
          delivery_start_time?: string
          delivery_time_frames?: Json | null
          geocoded_address?: Json | null
          id?: string
          is_premium?: boolean | null
          logo_url?: string | null
          minimum_order_amount?: number | null
          operating_hours?: Json | null
          pickup_only_days?: string[] | null
          premium_since?: string | null
          same_day_enabled?: boolean | null
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
      gift_card_transactions: {
        Row: {
          amount: number
          created_at: string
          gift_card_id: string
          id: string
          order_id: string | null
          transaction_type: string
        }
        Insert: {
          amount: number
          created_at?: string
          gift_card_id: string
          id?: string
          order_id?: string | null
          transaction_type: string
        }
        Update: {
          amount?: number
          created_at?: string
          gift_card_id?: string
          id?: string
          order_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "gift_card_transactions_gift_card_id_fkey"
            columns: ["gift_card_id"]
            isOneToOne: false
            referencedRelation: "gift_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gift_card_transactions_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      gift_cards: {
        Row: {
          code: string
          created_at: string
          current_balance: number
          expires_at: string | null
          id: string
          initial_balance: number
          is_active: boolean | null
          message: string | null
          purchaser_id: string | null
          recipient_email: string | null
          recipient_name: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          current_balance: number
          expires_at?: string | null
          id?: string
          initial_balance: number
          is_active?: boolean | null
          message?: string | null
          purchaser_id?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          updated_at: string
        }
        Update: {
          code?: string
          created_at?: string
          current_balance?: number
          expires_at?: string | null
          id?: string
          initial_balance?: number
          is_active?: boolean | null
          message?: string | null
          purchaser_id?: string | null
          recipient_email?: string | null
          recipient_name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gift_cards_purchaser_id_fkey"
            columns: ["purchaser_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_points: {
        Row: {
          created_at: string
          customer_id: string
          id: string
          points_balance: number | null
          total_points_earned: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: string
          points_balance?: number | null
          total_points_earned?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: string
          points_balance?: number | null
          total_points_earned?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "loyalty_points_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
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
          gift_message: string | null
          gift_recipient_name: string | null
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
          gift_message?: string | null
          gift_recipient_name?: string | null
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
          gift_message?: string | null
          gift_recipient_name?: string | null
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
      product_sizes: {
        Row: {
          created_at: string
          id: string
          images: string[] | null
          is_default: boolean | null
          name: string
          price_adjustment: number
          product_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          images?: string[] | null
          is_default?: boolean | null
          name: string
          price_adjustment?: number
          product_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          images?: string[] | null
          is_default?: boolean | null
          name?: string
          price_adjustment?: number
          product_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_sizes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
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
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown | null
          f_table_catalog: unknown | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown | null
          f_table_catalog: string | null
          f_table_name: unknown | null
          f_table_schema: unknown | null
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: string | null
          f_table_schema?: string | null
          srid?: number
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: string | null
          f_table_schema?: string | null
          srid?: number
          type?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: {
          oldname: string
          newname: string
          version: string
        }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: {
          tbl: unknown
          col: string
        }
        Returns: unknown
      }
      _postgis_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_scripts_pgsql_version: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      _postgis_selectivity: {
        Args: {
          tbl: unknown
          att_name: string
          geom: unknown
          mode?: string
        }
        Returns: number
      }
      _st_3dintersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_bestsrid: {
        Args: {
          "": unknown
        }
        Returns: number
      }
      _st_contains: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_coveredby:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_covers:
        | {
            Args: {
              geog1: unknown
              geog2: unknown
            }
            Returns: boolean
          }
        | {
            Args: {
              geom1: unknown
              geom2: unknown
            }
            Returns: boolean
          }
      _st_crosses: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_intersects: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: {
          line1: unknown
          line2: unknown
        }
        Returns: number
      }
      _st_longestline: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: number
      }
      _st_orderingequals: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_overlaps: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_touches: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      _st_within: {
        Args: {
          geom1: unknown
          geom2: unknown
        }
        Returns: boolean
      }
      get_secret: {
        Args: {
          secret_name: string;
        };
        Returns: {
          secret: string;
        }[];
      };
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
    : never,
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
