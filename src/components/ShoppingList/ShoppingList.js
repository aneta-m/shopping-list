import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./ShoppingList.module.scss";
import List from "../List/List";
import ListHeader from "../ListHeader/ListHeader";
import EditableListItem from "../EditableListItem/EditableListItem";
import EmptyListItem from "../EmptyListItem/EmptyListItem";
import EditableText from "../EditableText/EditableText";
import {
  getCurrentList,
  getStatus,
  selectFilteredList,
} from "../../features/currentList/currentListSlice";
import { editListTitle } from "../../features/lists/listsSlice";
import Loader from "../Loader/Loader";
import {
  IDLE,
  FAILED,
  PROCESSING,
} from "../../features/status/statusConstants";

const ShoppingList = ({ toggleFilter, isMobile }) => {
  const list = useSelector(getCurrentList);
  const status = useSelector(getStatus);
  const filteredList = useSelector(selectFilteredList);
  const [title, setTitle] = useState(list.title);
  const [sortingMethod, setSortingMethod] = useState(null);
  let sortedList = filteredList;
  if (sortingMethod === "1") {
    sortedList = [...filteredList].sort((itemA, itemB) => {
      return itemA.text < itemB.text ? -1 : 1;
    });
  }
  if (sortingMethod === "2") {
    sortedList = [...filteredList].sort((itemA, itemB) => {
      return itemA.labelId < itemB.labelId ? -1 : 1;
    });
  }
  const dispatch = useDispatch();
  const updateListTitle = (text) =>
    dispatch(editListTitle(list.id, { title: text }));

  const isNotEmpty = (obj) => Object.keys(obj).length;

  useEffect(() => {
    setTitle(list.title);
  }, [list]);

  return (
    <>
      {isNotEmpty(list) ? (
        <div className={styles.shopping_list}>
          <ListHeader
            id={list.id}
            toggleFilter={toggleFilter}
            isMobile={isMobile}
            sortingMethod={sortingMethod}
            onSortingMethodChange={(value) => setSortingMethod(value)}
          >
            <EditableText
              type="heading"
              text={title ? title : ""}
              update={updateListTitle}
            ></EditableText>
          </ListHeader>
          <List>
            <EmptyListItem maxTextLenth="70" />
            {sortedList
              ? sortedList.map((item) => (
                  <EditableListItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    labelId={item.labelId}
                    maxTextLength="70"
                  />
                ))
              : ""}
          </List>
          {status === PROCESSING && <Loader />}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ShoppingList;
