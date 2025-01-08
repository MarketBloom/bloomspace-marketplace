export interface FloristProfile {
  id: string;
  store_name: string;
  address: string;
  about_text: string | null;
  operating_hours: Record<string, { open: string; close: string }> | null;
  delivery_cutoff: string | null;
  is_premium: boolean | null;
  premium_since: string | null;
  verified: boolean | null;
  commission_rate: number | null;
  created_at: string;
  updated_at: string;
  delivery_start_time: string | null;
  delivery_end_time: string | null;
  delivery_slot_duration: string | null;
  logo_url: string | null;
  banner_url: string | null;
  social_links: Record<string, string> | null;
  delivery_fee: number | null;
  delivery_radius: number | null;
  minimum_order_amount: number | null;
  setup_progress: number | null;
  store_status: string | null;
  setup_completed_at: string | null;
  delivery_days: string[] | null;
  pickup_only_days: string[] | null;
  delivery_cutoff_times: Record<string, string> | null;
  same_day_enabled: boolean | null;
  delivery_time_frames: {
    morning: boolean;
    midday: boolean;
    afternoon: boolean;
  } | null;
}

export interface FloristProfilesTable {
  Row: FloristProfile;
  Insert: {
    id: string;
    store_name: string;
    address: string;
    about_text?: string | null;
    operating_hours?: Record<string, { open: string; close: string }> | null;
    delivery_cutoff?: string | null;
    is_premium?: boolean | null;
    premium_since?: string | null;
    verified?: boolean | null;
    commission_rate?: number | null;
    created_at?: string;
    updated_at?: string;
    delivery_start_time?: string | null;
    delivery_end_time?: string | null;
    delivery_slot_duration?: string | null;
    logo_url?: string | null;
    banner_url?: string | null;
    social_links?: Record<string, string> | null;
    delivery_fee?: number | null;
    delivery_radius?: number | null;
    minimum_order_amount?: number | null;
    setup_progress?: number | null;
    store_status?: string | null;
    setup_completed_at?: string | null;
    delivery_days?: string[] | null;
    pickup_only_days?: string[] | null;
    delivery_cutoff_times?: Record<string, string> | null;
    same_day_enabled?: boolean | null;
    delivery_time_frames?: {
      morning: boolean;
      midday: boolean;
      afternoon: boolean;
    } | null;
  };
  Update: Partial<FloristProfilesTable['Insert']>;
}