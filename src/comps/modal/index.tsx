import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Box } from "@/types";

interface Props {
  target: Box;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdate: (data: Box) => void;
  onDelete: (id: string) => void;
}

export default function EditModal({
  target,
  setIsModalOpen,
  onUpdate,
  onDelete,
}: Props) {
  const [text, setText] = useState(target.text);
  const [selectedClass, setSelectedClass] = useState(target.class);

  const handleSave = () => {
    onUpdate({ ...target, text, class: selectedClass });
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    onDelete(target.id);
    closeModal();
  };

  return (
    <div>
      <div className={styles.modal} onClick={() => setIsModalOpen(false)}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <span className={styles.close} onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          <div className={styles.formGroup}>
            <label>Text:</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {/* Assuming you have a predefined list of classes */}
              <option value="Name">Name</option>
              <option value="Description">Description</option>
              <option value="Date">Date</option>
              <option value="Amount">Amount</option>
              <option value="Supplier">Supplier</option>
              <option value="Number">Number</option>
            </select>
          </div>
          <div className={styles.footer}>
            <button onClick={handleSave}>Save</button>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleDelete}>Delete Box</button>
          </div>
        </div>
      </div>
    </div>
  );
}
