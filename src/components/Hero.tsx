import { Dispatch, SetStateAction } from 'react';

interface HeroProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  onSearch: () => Promise<void>;
  isLoading: boolean;
}

export const Hero = ({ location, setLocation, onSearch, isLoading }: HeroProps) => {
  return (
    <div className="hero">
      <h1 className="text-4xl font-bold">Find Your Florist</h1>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter your location"
        className="input"
      />
      <button onClick={onSearch} disabled={isLoading} className="button">
        {isLoading ? 'Loading...' : 'Search'}
      </button>
    </div>
  );
};
