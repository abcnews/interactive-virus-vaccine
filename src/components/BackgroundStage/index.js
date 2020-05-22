import "./keyshapejs.js";

import React, { useEffect } from "react";
import SVG from "react-inlinesvg";

import styles from "./styles.scss";
import testsvg from "./images/vax.svg";
import virus from "./images/virus.svg";

import vaccine1 from "./testing/vaccine1-1.svg";
import vaccine2 from "./testing/vaccine1-2.svg";
import vaccine3 from "./testing/vaccine1-3.svg";
import vaccine4 from "./testing/vaccine1-4.svg";
import vaccine5 from "./testing/vaccine1-5.svg";
import vaccine6 from "./testing/vaccine1-6.svg";
import vaccine7 from "./testing/vaccine1-7.svg";
import vaccine8 from "./testing/vaccine1-8.svg";
import vaccine9 from "./testing/vaccine1-9.svg";

export default props => {
  useEffect(() => {
    console.log(props.storyState);
  });

  const getAnimation = key => {
    switch (props.storyState) {
      case "one":
        return vaccine1;
      case "two":
        return vaccine2;
      case "three":
        return vaccine3;
      case "four":
        return vaccine4;
      case "five":
        return vaccine5;
      case "six":
        return vaccine6;
      case "seven":
        return vaccine7;
      case "eight":
        return vaccine8;
      case "nine":
        return vaccine9;
      default:
        return vaccine1;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.svgContainer}>
        <SVG
          src={props.storyState === "virus" ? virus : getAnimation()}
          // uniquifyIDs={true}
          // uniqueHash={"unique"}
        />
      </div>
      <div className={styles.preload}>
        {/* <SVG src={vaccine1} uniquifyIDs={true} />
        <SVG src={vaccine2} uniquifyIDs={true} />
        <SVG src={vaccine3} uniquifyIDs={true} />
        <SVG src={vaccine4} uniquifyIDs={true} />
        <SVG src={vaccine5} uniquifyIDs={true} />
        <SVG src={vaccine6} uniquifyIDs={true} />
        <SVG src={vaccine7} uniquifyIDs={true} />
        <SVG src={vaccine8} uniquifyIDs={true} />
        <SVG src={vaccine9} uniquifyIDs={true} /> */}
      </div>
    </div>
  );
};
