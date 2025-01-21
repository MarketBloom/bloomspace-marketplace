import { useState, useEffect } from 'react';
import { useDebounce } from './use-debounce';
import { supabase } from '@/integrations/supabase/client';

interface Suburb {
  suburb: string;
  state: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

export function useLocationSearch() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suburb[]>([]);
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!debouncedValue || debouncedValue.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('australian_suburbs')
          .select('*')
          .ilike('suburb', `%${debouncedValue}%`)
          .limit(5);

        if (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
          return;
        }

        setSuggestions(data || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedValue]);

  return {
    inputValue,
    setInputValue,
    isLoading,
    suggestions,
    setSuggestions
  };
}