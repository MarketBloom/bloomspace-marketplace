import { Skeleton } from "@/components/ui/skeleton";

interface SearchResultsHeaderProps {
  isLoading: boolean;
  count: number;
  type: 'products' | 'florists';
}

export const SearchResultsHeader = ({ 
  isLoading, 
  count, 
  type,
}: SearchResultsHeaderProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-medium">
        {count} {type} found
      </h2>
    </div>
  );
};