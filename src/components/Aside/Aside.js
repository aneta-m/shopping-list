import React from "react";
import styles from "./Aside.module.scss";

const Aside = ({ children }) => {
  return <aside className={styles.aside}>{children}</aside>;
};

export default Aside;
