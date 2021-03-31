import React from "react";
import styles from "./Input.module.scss";

const Input = ({
  placeholder,
  onChange,
  type = "text",
  value,
  maxLength = "30",
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      maxLength="30"
    ></input>
  );
};

export default Input;
