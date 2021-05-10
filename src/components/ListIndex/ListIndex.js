import React from "react";
import styles from "./ListIndex.module.scss";
import List from "../List/List";
import Loader from "../Loader/Loader";
import ListIndexItem from "../ListIndexItem/ListIndexItem";
import { useSelector } from "react-redux";
import {
  getListsArray,
  getLoadingStatus,
} from "../../features/lists/listsSlice";
import { PROCESSING, FAILED } from "../../features/status/statusConstants";

const ListIndex = ({ className, onItemClick }) => {
  const lists = useSelector(getListsArray);
  const listsStatus = useSelector(getLoadingStatus);
  return (
    <div className={`${styles.list_index} ${className}`}>
      {listsStatus === PROCESSING && <Loader />}
      {listsStatus === FAILED &&
        "Something went wrong, we can't load your lists."}
      <List>
        {lists &&
          lists.map((list) => (
            <ListIndexItem
              key={list.id}
              id={list.id}
              title={list.title}
              onItemClick={onItemClick}
            />
          ))}
      </List>
    </div>
  );
};

export default ListIndex;
