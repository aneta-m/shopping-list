import React from "react";
import MobileNav from "../MobileNav/MobileNav";
import Main from "../Main/Main";
import ToggledPanels from "../ToggledPanels/ToggledPanels";
import CollapsiblePanel from "../CollapsiblePanel/CollapsiblePanel";
import CurrentListView from "../CurrentListView/CurrentListView";
import ListIndex from "../ListIndex/ListIndex";

const MobileListsContent = ({
  toggleRightPanel,
  toggleLeftPanel,
  isRightPanelShown,
  isLeftPanelShown,
}) => {
  return (
    <>
      <MobileNav
        type="main"
        toggleRightPanel={toggleRightPanel}
        toggleLeftPanel={toggleLeftPanel}
      />
      <Main>
        <CurrentListView isMobile={true} toggleFilter={toggleRightPanel} />
      </Main>
      {isRightPanelShown && (
        <CollapsiblePanel onClose={toggleRightPanel} direction="right">
          <ToggledPanels />
        </CollapsiblePanel>
      )}
      {isLeftPanelShown && (
        <CollapsiblePanel onClose={toggleLeftPanel} direction="left">
          <h1>Twoje listy</h1>
          <ListIndex
            className="py-1"
            onItemClick={() => setTimeout(toggleLeftPanel, 200)}
          />
        </CollapsiblePanel>
      )}
    </>
  );
};

export default MobileListsContent;
