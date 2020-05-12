import React, { useState } from "react";
import styles from "./styles.scss";

import BackgroundStage from "../BackgroundStage";
import CustomPanel from "../CustomPanel";

import Scrollyteller, {
  loadOdysseyScrollyteller
} from "@abcnews/scrollyteller";

const scrollyData = loadOdysseyScrollyteller(
  "", // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
  "u-full", // Class to apply to mount point u-full makes it full width in Odyssey
  "mark" // Name of marker in CoreMedia eg. for "point" use #point default: #mark
);

export default props => {
  const [storyState, setStoryState] = useState();

  const processMarker = event => {
    console.log(event);
    setStoryState(event.key)
  };

  return (
    <Scrollyteller
      panels={scrollyData.panels}
      onMarker={processMarker}
      panelComponent={CustomPanel}
    >
      <BackgroundStage storyState={storyState} />
    </Scrollyteller>
  );
};
