import React from "react";
import List from "../List/List";
import Loader from "../Loader/Loader";
import ListIndexItem from "../ListIndexItem/ListIndexItem";
import { useSelector } from "react-redux";
import { getNoncurrentLists, getStatus } from "../../features/lists/listsSlice";
import { PROCESSING, FAILED } from "../../features/status/statusConstants";

const ListIndex = () => {
  const lists = useSelector(getNoncurrentLists);
  const listsStatus = useSelector(getStatus);
  return (
    <div>
      {listsStatus === PROCESSING && <Loader />}
      {listsStatus === FAILED && "failed"}
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
