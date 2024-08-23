import { Button } from "../ui/button";
import { Modal } from "../modal";
import { useState } from "react";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-store-modal";
import { Deletesize } from "@/actions/sizesActions";

export const SizeAlertModal = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const { isSizeAlertOpen, closeSizeAlert } = useModalStore();
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await Deletesize(id);
      toast.success("Color deleted successfully.");
      closeSizeAlert();
    } catch (error) {
      toast.error("Failed to delete Color.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Delete Alert"
      description={` Are you sure you want to delete this size? This action cannot
            be undone.`}
      isOpen={isSizeAlertOpen}
      onClose={closeSizeAlert}
    >
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={closeSizeAlert} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="destructive"
          onClick={() => {
            onDelete(id);
          }}
          disabled={loading}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
