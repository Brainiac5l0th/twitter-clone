import useEditModal from "@/hooks/useEditModal";

import { useCallback, useState } from "react";
import Modal from "../Modal";

const EditModal = () => {
  // hooks
  const editModal = useEditModal();

  //states
  const [isLoading, setIsLoading] = useState(false);

  //handler
  const handleSubmit = useCallback(() => {}, []);

  return (
    <Modal
      isOpen={editModal.isOpen}
      disabled={isLoading}
      actionLabel=""
      onClose={editModal.onClose}
      onSubmit={handleSubmit}
    />
  );
};

export default EditModal;
