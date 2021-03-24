import React from "react";
import styles from "./FlexContainer.module.scss";

const FlexContainer = ({ id, children }) => {
  return <div className={styles.flex_container}>{children}</div>;
};

export default FlexContainer;
