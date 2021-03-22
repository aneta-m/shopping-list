import React from "react";
import styles from "./FlexListItem.module.scss";

const FlexListItem = ({ id, children }) => {
  return (
    <li key={id} className={styles.flex_list_item}>
      {children}
    </li>
  );
};

export default FlexListItem;
