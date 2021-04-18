import React, { useState } from "react";
import styles from "./MobileNav.module.scss";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewList,
  getLoadingStatus as getListsLoadingStatus,
  requestFailed as listsRequestFailed,
} from "../../features/lists/listsSlice";
import {
  getLoadingStatus as getLabelsLoadingStatus,
  requestFailed as labelsRequestFailed,
} from "../../features/labels/labelsSlice";
import { FAILED } from "../../features/status/statusConstants";

const MobileNav = ({ type, toggleRightPanel, toggleLeftPanel }) => {
  const dispatch = useDispatch();
  const labelsLoadingStatus = useSelector(getLabelsLoadingStatus);
  const listsLoadingStatus = useSelector(getListsLoadingStatus);
  const addList = () => {
    const newList = { date: new Date(), title: "New shopping list", list: [] };
    dispatch(addNewList(newList));
  };
  return type === "main" ? (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav_side_btns}>
          <Button
            type="large_icon"
            onClick={
              listsLoadingStatus === FAILED
                ? () => dispatch(listsRequestFailed())
                : toggleLeftPanel
            }
          >
            <i className="fas fa-balance-scale-left"></i>
          </Button>
          <Button
            type="large_icon"
            onClick={
              labelsLoadingStatus === FAILED
                ? () => dispatch(labelsRequestFailed())
                : toggleRightPanel
            }
          >
            <i className="fas fa-balance-scale-right"></i>
          </Button>
        </div>
        <div className={styles.nav_center}>
          <Button type="xl_icon" onClick={addList}>
            <i className="fas fa-balance-scale"></i>
          </Button>
        </div>
      </nav>
    </>
  ) : (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav_side_btns}>
          <span></span>
          <Button type="large_icon" link to="/">
            <i className="fas fa-home"></i>
          </Button>
        </div>
        <div className={styles.nav_center}>
          <Button
            className={styles.nav_center_link}
            type="xl_icon"
            link
            to="/"
            onClick={addList}
          >
            <i className="fas fa-plus"></i>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
