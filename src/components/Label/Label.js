import React from "react";
import { useSelector } from "react-redux";
import styles from "./Label.module.scss";
import { selectColorById } from "../../features/labels/labelsSlice";

const Label = ({ colorId, text, className, onClick, isChecked }) => {
  const color = useSelector((state) => selectColorById(state, colorId));
  const backgroundStyle = { backgroundColor: color };
  const handleClick = (e) => {
    onClick();
  };
  return text ? (
    <div
      className={`${styles.text_label} ${className ? className : ""} ${
        isChecked ? styles.checked : ""
      }`}
      onClick={handleClick}
    >
      <div className={styles.label} style={backgroundStyle}></div>
      <div className={styles.text}>{text}</div>
    </div>
  ) : (
    <div
      className={`${styles.label} ${className ? className : ""}`}
      style={backgroundStyle}
      onClick={handleClick}
    ></div>
  );
};

export default Label;
