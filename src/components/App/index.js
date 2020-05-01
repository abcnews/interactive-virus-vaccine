import React from "react";
import styles from "./styles.scss";

const d3 = { ...require("d3-scale") };

const opacityScale = d3
  .scaleLinear()
  .domain([1, 300])
  .range([0, 1]);

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
  const scrollTweener = (progress, panel, pixelsAboveFold) => {
    const scrolloutPanel = document.querySelector(".custom-scrollout-panel");

    if (!panel.config.scrollout) {
      scrolloutPanel.style.opacity = 0.0;
      return;
    }

    console.log(pixelsAboveFold);

    scrolloutPanel.style.opacity = opacityScale(pixelsAboveFold);
  };

  return (
    <Scrollyteller
      panels={scrollyData.panels}
      onMarker={() => console.log("mark")}
      panelComponent={CustomPanel}
      scrollTween={scrollTweener}
    >
      <BackgroundStage />
    </Scrollyteller>
  );
};
