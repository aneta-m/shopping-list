import React from "react";
import styles from "./Header.module.scss";
import Logo from "../Logo/Logo";
import Nav from "../Nav/Nav";

const Header = ({ isMobile, type }) => {
  return (
    <header className={styles.header}>
      <Logo />
      {isMobile ? null : <Nav type={type} />}
    </header>
  );
};

export default Header;
