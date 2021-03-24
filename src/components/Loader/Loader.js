import styles from "./Loader.module.scss";
import React from "react";

const Loader = () => {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
