import React from "react";
import Header from "../../components/Header/Header";
import ListsContent from "../../components/ListsContent/ListsContent";

const Lists = ({ isMobile }) => {
  return (
    <>
      <Header isMobile={isMobile} />
      <ListsContent isMobile={isMobile} />
    </>
  );
};
export default Lists;
