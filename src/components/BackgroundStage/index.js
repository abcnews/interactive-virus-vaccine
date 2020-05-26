import "./keyshapejs.js";

import React, { useEffect, useState } from "react";
import SVG from "react-inlinesvg";
import { useWindowSize } from "@react-hook/window-size";

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
import vaccine10 from "./testing/vaccine1-10.svg";
import vaccine11 from "./testing/vaccine1-11.svg";
import vaccine12 from "./testing/vaccine1-12.svg";

// Load our animation files
const base = "./sequence/";
const sequences = {
  default: {
    one: require(base + "vaccine1-1.svg"),
    two: require(base + "vaccine1-2.svg"),
    three: require(base + "vaccine1-3.svg"),
    four: require(base + "vaccine1-4.svg"),
    five: require(base + "vaccine1-5.svg"),
    six: require(base + "vaccine1-6.svg"),
    seven: require(base + "vaccine1-7.svg"),
    eight: require(base + "vaccine1-8.svg"),
    nine: require(base + "vaccine1-9.svg"),
    ten: require(base + "vaccine1-10.svg"),
    eleven: require(base + "vaccine1-11.svg"),
    twelve: require(base + "vaccine1-12.svg")
  }
};

export default props => {
  const [preload, setPreload] = useState(true);
  const [windowWidth, windowHeight] = useWindowSize();
  const [view, setView] = useState("default");

  console.log(windowWidth);

  useEffect(() => {
    setTimeout(() => {
      setPreload(false);
    }, 2000);
  }, []); // Load once on mount

  const getAnimation = key => {
    switch (props.storyState) {
      case "one":
        return sequences.default.one;
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
      case "ten":
        return vaccine10;
      case "eleven":
        return vaccine11;
      case "twelve":
        return vaccine12;
      default:
        return vaccine1;
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.svgContainer}>
        <SVG
          src={sequences[view][props.storyState]}
          // uniquifyIDs={true}
          // uniqueHash={"unique"}
          baseURL="/home"
        />
      </div>
      {/* {preload && (
        <div className={styles.preload}>
          <SVG src={vaccine1} uniquifyIDs={true} />
          <SVG src={vaccine2} uniquifyIDs={true} />
          <SVG src={vaccine3} uniquifyIDs={true} />
          <SVG src={vaccine4} uniquifyIDs={true} />
          <SVG src={vaccine5} uniquifyIDs={true} />
          <SVG src={vaccine6} uniquifyIDs={true} />
          <SVG src={vaccine7} uniquifyIDs={true} />
          <SVG src={vaccine8} uniquifyIDs={true} />
          <SVG src={vaccine9} uniquifyIDs={true} />
          <SVG src={vaccine10} uniquifyIDs={true} />
          <SVG src={vaccine11} uniquifyIDs={true} />
          <SVG src={vaccine12} uniquifyIDs={true} />
        </div>
      )} */}
    </div>
  );
};
