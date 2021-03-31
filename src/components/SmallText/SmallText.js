import React from "react";
import styles from "./SmallText.module.scss";

const SmallText = ({ className, children }) => {
  return <div className={`${styles.small_text} ${className}`}>{children}</div>;
};

export default SmallText;
