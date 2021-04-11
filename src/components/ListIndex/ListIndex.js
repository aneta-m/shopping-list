import React from "react";
import styles from "./ListIndex.module.scss";
import List from "../List/List";
import Loader from "../Loader/Loader";
import ListIndexItem from "../ListIndexItem/ListIndexItem";
import { useSelector } from "react-redux";
import {
  getNoncurrentLists,
  getLoadingStatus,
} from "../../features/lists/listsSlice";
import { PROCESSING, FAILED } from "../../features/status/statusConstants";

const ListIndex = () => {
  const lists = useSelector(getNoncurrentLists);
  const listsStatus = useSelector(getLoadingStatus);
  return (
    <div className={styles.list_index}>
      {listsStatus === PROCESSING && <Loader />}
      {listsStatus === FAILED &&
        "Something went wrong, we can't load your lists."}
      <List>
        {lists &&
          lists.map((list) => (
            <ListIndexItem key={list.id} id={list.id} title={list.title} />
          ))}
      </List>
    </div>
  );
};

export default ListIndex;
