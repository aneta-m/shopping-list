import React, { useEffect } from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = ({ closeDropdown, children }) => {
  useEffect(() => {
    window.addEventListener("click", closeDropdown);
    return () => window.removeEventListener("click", closeDropdown);
  });
  return <div className={styles.dropdown}>{children}</div>;
};

export default Dropdown;
