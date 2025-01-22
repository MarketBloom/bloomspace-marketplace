import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StoreDetailsFormProps {
  formData: {
    storeName: string;
    street_address: string;
    suburb: string;
    state: string;
    postcode: string;
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
        <Label htmlFor="street_address">Street Address</Label>
        <Input
          id="street_address"
          value={formData.street_address}
          onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="suburb">Suburb</Label>
        <Input
          id="suburb"
          value={formData.suburb}
          onChange={(e) => setFormData({ ...formData, suburb: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="postcode">Postcode</Label>
        <Input
          id="postcode"
          value={formData.postcode}
          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
          required
        />
      </div>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};