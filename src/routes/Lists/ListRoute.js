import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ListsContent from "../../components/ListsContent/ListsContent";
import { fetchList } from "../../features/currentList/currentListSlice";
import {
  getListsIds,
  getLoadingStatus as getListsLoadingStatus,
} from "../../features/lists/listsSlice";
import { SUCCEEDED } from "../../features/status/statusConstants";
import useLevelUpRoute from "../../hooks/routes/useLevelUpRoute";
const ListRoute = ({ isMobile }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const allIds = useSelector(getListsIds);
  const listsLoadingStatus = useSelector(getListsLoadingStatus);
  const goLevelUp = useLevelUpRoute();

  useEffect(() => {
    if (allIds.includes(id)) {
      dispatch(fetchList(id));
    }
    if (listsLoadingStatus === SUCCEEDED && !allIds.includes(id)) {
      goLevelUp();
    }
  }, [id, listsLoadingStatus]);

  return <ListsContent isMobile={isMobile} />;
};

export default ListRoute;
