import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./CollapsiblePanel.module.scss";

const CollapsiblePanel = ({ onClose, isClosing, children }) => {
  const [animation, setAnimation] = useState(styles.on_enter);

  const handleClick = (e) => {
    setAnimation(styles.on_exit);
    setTimeout(onClose, 350);
  };

  const closePanel = () => {
    isClosing ? handleClick() : console.log("isNot");
  };

  useEffect(() => closePanel(), [isClosing]);

  return (
    <div className={`${styles.collapsible_panel} ${animation}`}>
      <div className={styles.close}>
        <Button onClick={handleClick} type="close" className={styles.btn}>
          &times;
        </Button>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default CollapsiblePanel;
