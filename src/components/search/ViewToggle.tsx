import React from 'react';
import { Button } from "@/components/ui/button";
import { Store, ShoppingBag } from "lucide-react";

interface ViewToggleProps {
  viewMode: 'products' | 'florists';
  setViewMode: (mode: 'products' | 'florists') => void;
  setPage: (page: number) => void;
}

export const ViewToggle = ({ viewMode, setViewMode, setPage }: ViewToggleProps) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={viewMode === 'products' ? 'default' : 'outline'}
        onClick={() => {
          setViewMode('products');
          setPage(1);
        }}
        className="flex-1 sm:flex-none animate-fade-in text-sm"
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        Products
      </Button>
      <Button
        variant={viewMode === 'florists' ? 'default' : 'outline'}
        onClick={() => {
          setViewMode('florists');
          setPage(1);
        }}
        className="flex-1 sm:flex-none animate-fade-in text-sm"
      >
        <Store className="h-4 w-4 mr-2" />
        Florists
      </Button>
    </div>
  );
};