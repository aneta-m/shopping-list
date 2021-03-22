import React from "react";
import styles from "./Modal.module.scss";

const Modal = ({ onClick, children }) => {
  return (
    <div className={styles.modal} onClick={onClick}>
      {children}
    </div>
  );
};

export default Modal;
