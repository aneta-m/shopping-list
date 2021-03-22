import React from "react";
import List from "../List/List";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { getNoncurrentLists } from "../../features/lists/listsSlice";
import { filtersCleared } from "../../features/labels/labelsSlice";
import { fetchList } from "../../features/currentList/currentListSlice";

const AsideListIndex = () => {
  const lists = useSelector(getNoncurrentLists);
  const dispatch = useDispatch();
  return (
    <div>
      <h2 className="py-1">Pozostałe listy</h2>
      <List>
        {lists &&
          lists.map((list) => (
            <li key={list.id}>
              <Button
                type="li"
                onClick={() => {
                  dispatch(fetchList(list.id));
                  dispatch(filtersCleared());
                }}
              >
                {list.title}
              </Button>
            </li>
          ))}
      </List>
    </div>
  );
};

export default AsideListIndex;
