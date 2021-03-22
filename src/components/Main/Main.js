import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  listAdded,
  listRemoved,
  listItemAdded,
  listItemRemoved,
  listItemEdited,
  listsLoading,
  listsLoaded,
  listLoaded,
  loadingFailed,
} from "../../features/lists/listsSlice";
import styles from "./Main.module.scss";

const Main = ({ type, children }) => {
  return (
    <main
      className={`${styles.main} ${
        type === "lists" ? styles["main_type_" + type] : ""
      }`}
    >
      {children}
    </main>
  );
};

export default Main;
