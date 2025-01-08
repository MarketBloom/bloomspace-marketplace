export interface Application {
  id: string;
  full_name: string;
  email: string;
  store_name: string | null;
  created_at: string;
  status: string;
  about_business: string | null;
  years_experience: number | null;
  specialties: string[] | null;
}