import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./CurrentListView.module.scss";
import List from "../List/List";
import ListHeader from "../ListHeader/ListHeader";
import EditableListItem from "../EditableListItem/EditableListItem";
import EmptyListItem from "../EmptyListItem/EmptyListItem";
import SmallText from "../SmallText/SmallText";
import Loader from "../Loader/Loader";
import {
  getCurrentList,
  getLoadingStatus as getListsLoadingStatus,
  selectFilteredList,
} from "../../features/currentList/currentListSlice";
import {
  getLoadingStatus as getLabelsLoadingStatus,
  requestFailed as labelsRequestFailed,
} from "../../features/labels/labelsSlice";
import { PROCESSING, FAILED } from "../../features/status/statusConstants";

const CurrentListView = ({ toggleFilter, isMobile }) => {
  const dispatch = useDispatch();
  const list = useSelector(getCurrentList);
  const listLoadingStatus = useSelector(getListsLoadingStatus);
  const labelsLoadingStatus = useSelector(getLabelsLoadingStatus);
  const filteredList = useSelector(selectFilteredList);

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

  const isNotEmpty = (obj) => Object.keys(obj).length;

  return (
    <div className={styles.current_list_view}>
      {isNotEmpty(list) ? (
        <>
          <ListHeader
            listId={list.id}
            listTitle={list.title}
            toggleFilter={
              labelsLoadingStatus === FAILED
                ? () => dispatch(labelsRequestFailed())
                : toggleFilter
            }
            isMobile={isMobile}
            sortingMethod={sortingMethod}
            onSortingMethodChange={(value) => setSortingMethod(value)}
          ></ListHeader>
          <List>
            <EmptyListItem maxTextLenth="70" />
            {sortedList.length > 0 ? (
              sortedList.map((item) => (
                <EditableListItem
                  key={item.id}
                  id={item.id}
                  text={item.text}
                  labelId={item.labelId}
                  maxTextLength="70"
                />
              ))
            ) : (
              <SmallText className="py-1">
                There are no items to show.
              </SmallText>
            )}
          </List>
        </>
      ) : (
        <>
          {listLoadingStatus === PROCESSING && <Loader />}
          {listLoadingStatus === FAILED &&
            "Sorry, something went wrong and this list can't be loaded."}
        </>
      )}
    </div>
  );
};

export default CurrentListView;
