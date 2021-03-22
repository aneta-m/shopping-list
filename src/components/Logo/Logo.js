import React from "react";
import styles from "./Logo.module.scss";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <div className={styles.logo}>
        <div className={styles.logo__inner}>
          <span className={styles.logo__text}>Shopping</span>
          <div className={styles.logo__icon}>
            <i className="fas fa-shopping-basket"></i>
          </div>
          <span className={`${styles.logo__text} font_l`}>LIST</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
