import React from "react";
import Button from "../Button/Button";
import styles from "./Nav.module.scss";
import useAddNewList from "../../hooks/lists/useAddNewList";

const Nav = ({ type }) => {
  const handleClick = useAddNewList();
  return type === "lists" ? (
    <nav className={styles.nav}>
      <Button link to="/" onClick={handleClick}>
        <i className="fas fa-plus mx-05"></i>Add new
      </Button>
    </nav>
  ) : (
    <nav className={styles.nav}>
      <Button onClick={handleClick}>
        <i className="fas fa-plus mx-05"></i>Add new
      </Button>
      <Button link to="/lists">
        Lists
      </Button>
    </nav>
  );
};

export default Nav;
