import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { BulkEditProducts } from "./BulkEditProducts";

interface BulkProductOperationsProps {
  onSuccess: () => void;
}

export const BulkProductOperations = ({ onSuccess }: BulkProductOperationsProps) => {
  const [showBulkEdit, setShowBulkEdit] = useState(false);

  return (
    <>
      <Button onClick={() => setShowBulkEdit(true)}>
        Bulk Edit Products
      </Button>

      <Dialog open={showBulkEdit} onOpenChange={setShowBulkEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bulk Edit Products</DialogTitle>
          </DialogHeader>
          <BulkEditProducts 
            onClose={() => setShowBulkEdit(false)}
            onSuccess={onSuccess}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};