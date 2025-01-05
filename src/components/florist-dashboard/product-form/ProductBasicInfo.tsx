import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProductBasicInfoProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

export const ProductBasicInfo = ({
  title,
  setTitle,
  description,
  setDescription,
}: ProductBasicInfoProps) => {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="title">Product Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
    </div>
  );
};