import React, { useState } from "react";
import styles from "./MobileNav.module.scss";
import Button from "../Button/Button";
import { useDispatch } from "react-redux";
import { addNewList } from "../../features/lists/listsSlice";

const MobileNav = ({ type, toggleFilter }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    const newList = { date: new Date(), title: "New shopping list", list: [] };
    dispatch(addNewList(newList));
  };
  return type === "main" ? (
    <>
      <nav className={styles.nav}>
        <div className={styles.nav_side_btns}>
          <Button link to="lists" type="large_icon">
            <i className="fas fa-hamburger"></i>
          </Button>
          <Button type="large_icon" onClick={toggleFilter}>
            <i className="fas fa-filter"></i>
          </Button>
        </div>
        <div className={styles.nav_center}>
          <Button type="xl_icon" onClick={handleClick}>
            <i className="fas fa-plus"></i>
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
            onClick={handleClick}
          >
            <i className="fas fa-plus"></i>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
