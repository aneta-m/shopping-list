import React from "react";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import styles from "./Nav.module.scss";
import { addNewList } from "../../features/lists/listsSlice";

const Nav = ({ type }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    const newList = { date: new Date(), title: "New shopping list", list: [] };
    dispatch(addNewList(newList));
  };

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
