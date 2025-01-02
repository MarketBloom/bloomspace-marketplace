import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";

const Search = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <FilterBar />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="aspect-w-4 aspect-h-3 bg-gray-100" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">Beautiful Bouquet</h3>
                  <p className="text-gray-600 mb-2">From $79.99</p>
                  <p className="text-sm text-gray-500">By Local Florist Name</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;