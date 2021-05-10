import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

const useLevelUpRoute = () => {
  const history = useHistory();
  const routePath = useRouteMatch().path;
  return () => {
    const newRoute = routePath.slice(0, routePath.lastIndexOf("/"));
    history.push(newRoute);
  };
};

export default useLevelUpRoute;
