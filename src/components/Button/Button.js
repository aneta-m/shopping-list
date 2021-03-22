import React from "react";
import styles from "./Button.module.scss";
import { Link } from "react-router-dom";

const Button = ({
  type,
  onClick,
  className,
  propagation,
  link,
  to,
  children,
}) => {
  let classes = styles.btn + " ";

  type && (classes += styles[`type_${type}`] + " ");
  className && (classes += className);

  const handleClick = (e) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return link ? (
    <Link
      to={to}
      className={`${classes}`}
      onClick={propagation && onClick ? onClick : handleClick}
    >
      {children}
    </Link>
  ) : (
    <button
      className={`${classes}`}
      onClick={propagation && onClick ? onClick : handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
