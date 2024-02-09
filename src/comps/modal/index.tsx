import React from "react";
import styles from "./styles.module.scss";
import { Box } from "@/types";

interface Props {
  target: Box;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EditModal(props: Props) {
  return (
    <div>
      <div className={styles.modal} onClick={() => props.setIsModalOpen(false)}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          <span
            className={styles.close}
            onClick={() => props.setIsModalOpen(false)}
          >
            &times;
          </span>
          <p>{props.target.text}</p>
        </div>
      </div>
    </div>
  );
}
