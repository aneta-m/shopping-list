import React from "react";
import styles from "./ModalDialog.module.scss";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const ModalDialog = ({ title, confirmDesc, onConfirm, onClose, children }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  return (
    <Modal onClick={onClose}>
      <div className={styles.modal_dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_dialog_title}>{title}</div>
        <div className={styles.modal_dialog_content}>{children}</div>
        <div className={styles.modal_dialog_actions}>
          <Button
            className={styles.modal_dialog_btn}
            type="cancel"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className={styles.modal_dialog_btn}
            type="confirm"
            onClick={handleConfirm}
          >
            {confirmDesc}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDialog;
