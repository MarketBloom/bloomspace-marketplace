import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const FilterBar = () => {
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    // Implement search logic here
    console.log("Searching for location:", location);
  };

  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="text-xs h-8 font-mono"
      />
      <Button size="sm" onClick={handleSearch}>
        <Search className="h-4 w-4" />
      </Button>
    </div>
  );
};