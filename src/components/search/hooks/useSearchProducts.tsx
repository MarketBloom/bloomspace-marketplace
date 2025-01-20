import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, isToday, parseISO } from "date-fns";
import { FloristProfile } from "@/types/florist";

interface UseSearchProductsProps {
  fulfillmentType: "pickup" | "delivery";
  searchParams: URLSearchParams;
  userCoordinates: [number, number] | null;
}

export const useSearchProducts = ({ fulfillmentType, searchParams, userCoordinates }: UseSearchProductsProps) => {
  return useQuery({
    queryKey: ['products', fulfillmentType, searchParams.toString(), userCoordinates?.join(',')],
    queryFn: async () => {
      const budgetStr = searchParams.get('budget');
      const maxBudget = budgetStr ? parseInt(budgetStr) : undefined;
      const location = searchParams.get('location');
      const dateStr = searchParams.get('date');
      
      let query = supabase
        .from('florist_profiles')
        .select(`
          id,
          store_name,
          address,
          about_text,
          operating_hours,
          delivery_fee,
          delivery_radius,
          minimum_order_amount,
          logo_url,
          banner_url,
          social_links,
          store_status,
          coordinates
        `)
        .eq('store_status', 'published');

      const { data: allFlorists, error } = await query;

      if (error) {
        console.error('Error fetching florists:', error);
        throw error;
      }

      // Filter florists based on location and delivery radius if coordinates are available
      if (location && userCoordinates && allFlorists) {
        const { data: filteredFlorists, error: rpcError } = await supabase.rpc<FloristProfile[], { user_lat: number; user_lng: number }>(
          'filter_florists_by_distance',
          {
            user_lat: userCoordinates[0],
            user_lng: userCoordinates[1]
          }
        );

        if (rpcError) {
          console.error('Error filtering florists:', rpcError);
          return [];
        }

        return filteredFlorists || [];
      }

      return allFlorists || [];
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};