import React from "react";
import styles from "./styles.scss";
import worm from "./worm.svg";

import BackgroundStage from "../BackgroundStage";
import CustomPanel from "../CustomPanel"

import Scrollyteller, {
  loadOdysseyScrollyteller
} from "@abcnews/scrollyteller";

const scrollyData = loadOdysseyScrollyteller(
  "", // If set to eg. "one" use #scrollytellerNAMEone in CoreMedia
  "u-full", // Class to apply to mount point u-full makes it full width in Odyssey
  "mark" // Name of marker in CoreMedia eg. for "point" use #point default: #mark
);

export default props => {
  return (
    <Scrollyteller
      panels={scrollyData.panels}
      onMarker={() => console.log("mark")}
      panelComponent={CustomPanel}
    >
      <BackgroundStage />
    </Scrollyteller>
  );
};
