import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { useState } from "react";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { ViewToggle } from "@/components/search/ViewToggle";
import { MobileFilterButton } from "@/components/search/MobileFilterButton";

const Search = () => {
  const [viewMode, setViewMode] = useState<'products' | 'florists'>('products');
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-background font-mono">
      <Header />
      
      <main>
        <SearchHeader />

        <div className="container mx-auto px-4 py-12">
          <div className="lg:grid lg:grid-cols-[220px_1fr] gap-6">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pb-12">
              <FilterBar />
            </aside>

            {/* Mobile Filter Button */}
            <MobileFilterButton />

            {/* Main Content */}
            <div>
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} setPage={setPage} />
              <SearchResults viewMode={viewMode} page={page} setPage={setPage} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;