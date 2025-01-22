import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { BulkEditProducts } from "./BulkEditProducts";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

export interface BulkProductOperationsProps {
  floristId: string;
  onProductsUploaded: (options?: RefetchOptions) => Promise<QueryObserverResult<any[], Error>>;
}

export const BulkProductOperations = ({ floristId, onProductsUploaded }: BulkProductOperationsProps) => {
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
            onSuccess={onProductsUploaded}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};