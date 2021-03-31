import React, { useEffect } from "react";
import styles from "./ModalDialog.module.scss";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";

const ModalDialog = ({ title, confirmDesc, onConfirm, onClose, children }) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const handleEscape = (e) => {
    if (e.keyCode === 27) {
      console.log("27");
      onClose();
    }
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      console.log("13");
      handleConfirm();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleEscape);
    return () => window.removeEventListener("keyup", handleEscape);
  }, []);

  return (
    <Modal onClick={onClose}>
      <div
        className={styles.modal_dialog}
        onClick={(e) => e.stopPropagation()}
        onKeyUp={handleEnter}
      >
        <div className={styles.modal_dialog_title}>{title}</div>
        <div className={styles.modal_dialog_content}>{children}</div>
        <div className={styles.modal_dialog_actions}>
          {onClose && (
            <Button
              className={styles.modal_dialog_btn}
              type="cancel"
              onClick={onClose}
            >
              Cancel
            </Button>
          )}
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
