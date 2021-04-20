import React, { useState, useEffect } from "react";
import Button from "../Button/Button";
import styles from "./CollapsiblePanel.module.scss";

const CollapsiblePanel = ({ onClose, isClosing, direction, children }) => {
  const [animation, setAnimation] = useState(
    direction === "right" ? styles.on_enter__right : styles.on_enter
  );

  const handleClick = (e) => {
    setAnimation(
      direction === "right" ? styles.on_exit__right : styles.on_exit
    );
    setTimeout(onClose, 350);
  };

  const closePanel = () => {
    isClosing && handleClick();
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
