import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { FilterBar } from "@/components/FilterBar";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Testimonials } from "@/components/Testimonials";
import { TrustSection } from "@/components/TrustSection";
import { SetupPlaceholderFloristsButton } from "@/components/SetupPlaceholderFloristsButton";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <FilterBar />
      <Categories />
      <FeaturedProducts />
      <TrustSection />
      <Testimonials />
      {process.env.NODE_ENV === 'development' && <SetupPlaceholderFloristsButton />}
    </div>
  );
}