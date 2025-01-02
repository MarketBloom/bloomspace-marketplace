import React from 'react';
import { ProductCard } from "@/components/ProductCard";
import { FloristCard } from "@/components/FloristCard";
import { Loader2 } from "lucide-react";
import { Pagination } from "./Pagination";

interface SearchResultsProps {
  viewMode: 'products' | 'florists';
  isLoading: boolean;
  data: any;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export const SearchResults = ({ 
  viewMode, 
  isLoading, 
  data, 
  page, 
  setPage,
  totalPages 
}: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data?.items || data.items.length === 0) {
    return (
      <div className="text-center py-12 min-h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold mb-2">
          No {viewMode} found
        </h2>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search criteria
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {data.items.map((item: any) => (
          <div key={item.id} className="animate-fade-in-up">
            {viewMode === 'products' ? (
              <ProductCard
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                images={item.images}
                floristName={item.florist_profiles?.store_name}
                floristId={item.florist_id}
              />
            ) : (
              <FloristCard
                id={item.id}
                storeName={item.store_name}
                address={item.address}
                aboutText={item.about_text}
              />
            )}
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination 
          page={page} 
          totalPages={totalPages} 
          setPage={setPage} 
        />
      )}
    </div>
  );
};