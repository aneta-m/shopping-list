import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Aside from "../../components/Aside/Aside";
import MobileNav from "../../components/MobileNav/MobileNav";
import Main from "../../components/Main/Main";
import ToggledPanels from "../../components/ToggledPanels/ToggledPanels";
import CollapsiblePanel from "../../components/CollapsiblePanel/CollapsiblePanel";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import ListIndex from "../../components/ListIndex/ListIndex";

const Lists = ({ isMobile }) => {
  const [isPanelShown, setIsPanelShown] = useState(false);
  const [isPanelClosing, setIsPanelClosing] = useState(true);

  const togglePanel = () => {
    setIsPanelShown((prevState) => !prevState);
    isPanelClosing &&
      setIsPanelClosing((prevIsPanelClosing) => !prevIsPanelClosing);
  };

  const closePanel = () => {
    setIsPanelClosing((prevIsPanelClosing) => !prevIsPanelClosing);
    console.log(isPanelClosing);
  };

  return (
    <>
      <Header isMobile={isMobile} />

      {isMobile ? (
        <MobileNav type="main" toggleFilter={togglePanel} />
      ) : (
        <Aside>
          <h2 className="py-1">Twoje listy</h2>
          <ListIndex />

          {isPanelShown && (
            <CollapsiblePanel
              onClose={togglePanel}
              direction="right"
              isClosing={isPanelClosing}
            >
              <ToggledPanels />
            </CollapsiblePanel>
          )}
        </Aside>
      )}
      <Main>
        <ShoppingList
          isMobile={isMobile}
          toggleFilter={isPanelShown ? closePanel : togglePanel}
        />
      </Main>
      {isPanelShown && isMobile && (
        <CollapsiblePanel onClose={togglePanel} direction="left">
          <ToggledPanels />
        </CollapsiblePanel>
      )}
    </>
  );
};

export default Lists;
