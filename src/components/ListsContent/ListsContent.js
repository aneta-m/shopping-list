import React, { useState } from "react";
import MobileListsContent from "../MobileListsContent/MobileListsContent";
import DesktopListsContent from "../DesktopListsContent/DesktopListsContent";
import { useParams } from "react-router-dom";

const ListsContent = ({ isMobile }) => {
  const { id } = useParams();
  console.log(id);
  const [isFilterPanelShown, setIsFilterPanelShown] = useState(false);
  const [isFilterPanelClosing, setIsFilterPanelClosing] = useState(true);
  const toggleFilterPanel = () => {
    setIsFilterPanelShown((prevState) => !prevState);
    isFilterPanelClosing &&
      setIsFilterPanelClosing(
        (prevIsFilterPanelClosing) => !prevIsFilterPanelClosing
      );
  };
  const closeFilterPanel = () => {
    setIsFilterPanelClosing(
      (prevIsFilterPanelClosing) => !prevIsFilterPanelClosing
    );
  };

  const [isLeftPanelShown, setIsLeftPanelShown] = useState(false);
  const toggleLeftPanel = () => {
    setIsLeftPanelShown((prevState) => !prevState);
  };

  return isMobile ? (
    <MobileListsContent
      toggleRightPanel={toggleFilterPanel}
      toggleLeftPanel={toggleLeftPanel}
      isRightPanelShown={isFilterPanelShown}
      isLeftPanelShown={isLeftPanelShown}
    />
  ) : (
    <DesktopListsContent
      toggleSidePanel={toggleFilterPanel}
      closeSidePanel={closeFilterPanel}
      isSidePanelShown={isFilterPanelShown}
      isSidePanelClosing={isFilterPanelClosing}
    />
  );
};

export default ListsContent;
