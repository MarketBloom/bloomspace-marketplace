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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Application {
  id: string;
  full_name: string;
  email: string;
  store_name: string;
  created_at: string;
  status: string;
  about_business: string;
  years_experience: number;
  specialties: string[];
}

const ApplicationReview = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("florist_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch applications");
      return;
    }

    setApplications(data);
  };

  const handleApprove = async (id: string) => {
    setIsApproving(true);
    try {
      const { error } = await supabase.functions.invoke('approve-florist-application', {
        body: { applicationId: id }
      });

      if (error) throw error;

      toast.success("Application approved successfully");
      fetchApplications();
      setIsDetailsOpen(false);
    } catch (error: any) {
      console.error("Error approving application:", error);
      toast.error(error.message || "Failed to approve application");
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("florist_applications")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;

      toast.success("Application rejected");
      fetchApplications();
      setIsDetailsOpen(false);
    } catch (error: any) {
      toast.error("Failed to reject application");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={variants[status] || "bg-gray-100"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <AdminLayout currentPage="Applications">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Florist Applications</h1>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Store</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.full_name}</TableCell>
                <TableCell>{app.store_name}</TableCell>
                <TableCell>{app.email}</TableCell>
                <TableCell>
                  {new Date(app.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{getStatusBadge(app.status)}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedApp(app);
                      setIsDetailsOpen(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          {selectedApp && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Application Details</DialogTitle>
                <DialogDescription>
                  Review the application details below
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Full Name</h3>
                    <p>{selectedApp.full_name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Store Name</h3>
                    <p>{selectedApp.store_name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p>{selectedApp.email}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Years Experience</h3>
                    <p>{selectedApp.years_experience}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium">About Business</h3>
                  <p className="mt-1">{selectedApp.about_business}</p>
                </div>

                <div>
                  <h3 className="font-medium">Specialties</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {selectedApp.specialties?.map((specialty) => (
                      <Badge key={specialty} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedApp.status === "pending" && (
                  <div className="flex justify-end gap-4 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => handleReject(selectedApp.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(selectedApp.id)}
                      disabled={isApproving}
                    >
                      {isApproving ? "Approving..." : "Approve"}
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default ApplicationReview;