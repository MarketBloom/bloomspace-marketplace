import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface LocationSearchInputProps {
  inputValue: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (value: string) => void;
}

export const LocationSearchInput = ({
  inputValue,
  isLoading,
  onChange,
  onSearch
}: LocationSearchInputProps) => {
  const debouncedValue = useDebounce(inputValue, 300);

  useEffect(() => {
    if (debouncedValue) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Enter suburb or postcode..."
        value={inputValue}
        onChange={onChange}
        className={`w-full pl-8 h-[42px] bg-white/90 border border-black text-xs ${isLoading ? 'opacity-70' : ''}`}
      />
      <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500" />
    </div>
  );
};