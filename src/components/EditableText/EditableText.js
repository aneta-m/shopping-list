import React, { useState, useEffect } from "react";
import styles from "./EditableText.module.scss";

const EditableText = ({ type, text, update, maxLength = "30" }) => {
  const [value, setValue] = useState(text);
  const [prevValue, setPrevValue] = useState(text);

  const updateText = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => setValue(text), [text]);

  const updateItem = () => {
    const trimmedText = value.trim();
    if (prevValue !== trimmedText) {
      if (!trimmedText.length) {
        setValue(prevValue);
      } else {
        update(trimmedText);
        setPrevValue(trimmedText);
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.which === 13) {
      e.target.blur();
    }
  };

  return (
    <input
      className={`${styles.editable_text} ${
        type === "heading" && styles.editable_text_hd
      }`}
      type="text"
      value={value}
      onChange={updateText}
      onKeyUp={handleKeyUp}
      onFocus={() => setPrevValue(value)}
      onBlur={updateItem}
      maxLength={maxLength}
    />
  );
};
export default EditableText;
