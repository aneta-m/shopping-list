import React from "react";
import styles from "./ToggledPanel.module.scss";
import Button from "../Button/Button";

const ToggledPanel = ({
  title,
  handleToggle,
  toggleDesc,
  func,
  funcDesc,
  children,
}) => {
  return (
    <div>
      <h1 className={styles.hd}>{title}</h1>
      {children}
      <div className={styles.flex_btns}>
        <Button type="secondary" className={styles.btn} onClick={handleToggle}>
          {toggleDesc}
        </Button>
        <Button type="secondary" className={styles.btn} onClick={func}>
          {funcDesc}
        </Button>
      </div>
    </div>
  );
};

export default ToggledPanel;
