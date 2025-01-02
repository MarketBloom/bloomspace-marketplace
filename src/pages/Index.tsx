import { Header } from "@/components/Header";
import { FilterBar } from "@/components/FilterBar";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 z-0" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 animate-float">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                Fresh Local Flowers
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Support local florists and discover unique arrangements
              </p>
              
              <div className="max-w-4xl mx-auto">
                <FilterBar />
              </div>
              
              <Button className="mt-8 bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                Find Flowers
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Arrangements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-w-4 aspect-h-3 bg-gray-100" />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Beautiful Bouquet</h3>
                    <p className="text-gray-600">From $79.99</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;