import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ListsContent from "../../components/ListsContent/ListsContent";
import { fetchList } from "../../features/currentList/currentListSlice";

const ListRoute = ({ isMobile }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchList(id));
  }, []);

  return <ListsContent isMobile={isMobile} />;
};

export default ListRoute;
