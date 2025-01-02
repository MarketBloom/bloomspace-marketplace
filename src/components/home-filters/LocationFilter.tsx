import { Input } from "@/components/ui/input";
import { useState } from "react";

export const LocationFilter = () => {
  const [location, setLocation] = useState("");

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full text-xs h-8 font-mono"
      />
    </div>
  );
};