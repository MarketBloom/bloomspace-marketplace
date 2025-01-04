import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StoreDetailsFormProps {
  formData: {
    storeName: string;
    phone: string;
    address: string;
  };
  setFormData: (data: any) => void;
  onNext: () => void;
}

export const StoreDetailsForm = ({ formData, setFormData, onNext }: StoreDetailsFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="storeName">Store Name</Label>
        <Input
          id="storeName"
          value={formData.storeName}
          onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};