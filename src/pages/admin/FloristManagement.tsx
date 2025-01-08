import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

interface Florist {
  id: string;
  store_name: string;
  address: string;
  store_status: string;
  created_at: string;
  setup_progress: number;
}

const FloristManagement = () => {
  const [florists, setFlorists] = useState<Florist[]>([]);

  useEffect(() => {
    const fetchFlorists = async () => {
      const { data } = await supabase
        .from("florist_profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setFlorists(data);
      }
    };

    fetchFlorists();
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      private: "bg-yellow-100 text-yellow-800",
      published: "bg-green-100 text-green-800",
    };

    return (
      <Badge className={variants[status] || "bg-gray-100"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AdminLayout currentPage="Florists">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Florist Management</h1>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Store Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Setup Progress</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {florists.map((florist) => (
              <TableRow key={florist.id}>
                <TableCell>{florist.store_name}</TableCell>
                <TableCell>{florist.address}</TableCell>
                <TableCell>
                  {getStatusBadge(florist.store_status)}
                </TableCell>
                <TableCell>{florist.setup_progress}%</TableCell>
                <TableCell>
                  {new Date(florist.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // TODO: Implement florist details view
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

export default FloristManagement;