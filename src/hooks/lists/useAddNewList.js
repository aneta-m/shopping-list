import React from "react";
import { addNewList } from "../../features/lists/listsSlice";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const useAddNewList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  return async () => {
    const newList = { date: new Date(), title: "New shopping list", list: [] };
    const id = await dispatch(addNewList(newList));
    id && history.push(`/lists/${id}`);
  };
};

export default useAddNewList;
