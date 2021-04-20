import React from "react";
import Aside from "../Aside/Aside";
import Main from "../Main/Main";
import ToggledPanels from "../ToggledPanels/ToggledPanels";
import CollapsiblePanel from "../CollapsiblePanel/CollapsiblePanel";
import CurrentListView from "../CurrentListView/CurrentListView";
import ListIndex from "../ListIndex/ListIndex";

const DesktopListsContent = ({
  toggleSidePanel,
  isSidePanelShown,
  isSidePanelClosing,
  closeSidePanel,
}) => {
  return (
    <>
      <Aside>
        <h2 className="py-1">Twoje listy</h2>
        <ListIndex />

        {isSidePanelShown && (
          <CollapsiblePanel
            onClose={toggleSidePanel}
            direction="left"
            isClosing={isSidePanelClosing}
          >
            <ToggledPanels />
          </CollapsiblePanel>
        )}
      </Aside>
      <Main>
        <CurrentListView
          isMobile={false}
          toggleFilter={isSidePanelShown ? closeSidePanel : toggleSidePanel}
        />
      </Main>
    </>
  );
};

export default DesktopListsContent;
