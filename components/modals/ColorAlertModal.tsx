import { Button } from "../ui/button";
import { Modal } from "../modal";
import { useState } from "react";
import { DeleteColor } from "@/actions/colorsActions";
import { toast } from "sonner";
import { useModalStore } from "@/hooks/store/use-store-modal";

export const ColorAlertModal = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const { isColorAlertOpen, closeColorAlert } = useModalStore();
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await DeleteColor(id);
      toast.success("Color deleted successfully.");
      closeColorAlert();
    } catch (error) {
      toast.error("Failed to delete Color.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title="Delete Alert"
      description={` Are you sure you want to delete this color? This action cannot
            be undone.`}
      isOpen={isColorAlertOpen}
      onClose={closeColorAlert}
    >
      <div className="flex justify-end gap-2">
        <Button
          variant="secondary"
          onClick={closeColorAlert}
          disabled={loading}
        >
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
