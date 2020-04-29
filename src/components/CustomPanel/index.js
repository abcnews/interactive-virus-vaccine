import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./styles.scss";

import JsxParser from "react-jsx-parser";


// import story from "../App/story";
// import { AppContext } from "../../AppContext";
// const tempData = require("../App/yearly-bom-sci.json");

function roundTo(number, precision) {
  return Math.round(number * 10 ** precision) / 10 ** precision;
}

const AVERAGE_PARENT_AGE = 30;
const BIRTHYEAR_CUTOFF = 1998;
const HOTTEST_YEAR_FOR_CALC = 2014
const HOTTEST_TEMP = 1.52

export default props => {
  const base = useRef();

  // // Global context
  // const { birthYear } = useContext(AppContext);

  const [hidePanel, setHidePanel] = useState(false);

  // const calculatedBirthYear =
  //   birthYear >= BIRTHYEAR_CUTOFF ? birthYear - AVERAGE_PARENT_AGE : birthYear;

  // // Birth year calculations
  // let birthYearTemp = tempData.find(d => d.Year === calculatedBirthYear).Temp;
  // let roundBirthYearTemp = roundTo(Math.abs(birthYearTemp), 2);
  // let hottestYearComparison = birthYearTemp - HOTTEST_TEMP;
  // let roundHottestYearComparison = roundTo(Math.abs(hottestYearComparison), 2);
  // let fiveYearAge = HOTTEST_YEAR_FOR_CALC - calculatedBirthYear;

  // Once on mount
  useEffect(() => {
    if (!base.current) return;
    if (!props.nodes) return;

    // Tell scrollyteller that this is a panel
    props.reference(base.current);

    if (!props.config.swap) {
      const isMobile = window.innerWidth < 440;
      // Append CoreMedia nodes
      props.nodes.forEach(node => {
        // Make sure images fit inside the panels
        if (
          node.className.indexOf("ImageEmbed") > -1 ||
          node.tagName === "IMG"
        ) {
          node.style.setProperty("display", "block");
          node.style.setProperty("margin", "auto");
          node.style.setProperty(
            "width",
            isMobile ? "83.333333%" : "66.66667%"
          );
          node.style.setProperty("padding-left", "0.875rem");
          node.style.setProperty("padding-right", "0.875rem");
          if (node.hasAttribute("height")) {
            node.removeAttribute("height");
          }
        } else if (node.querySelector("img")) {
          node.style.setProperty("margin", "auto");
          node.style.setProperty(
            "width",
            isMobile ? "83.333333%" : "66.66667%"
          );
          node.style.setProperty("padding-left", "0.875rem");
          node.style.setProperty("padding-right", "0.875rem");
          [].slice.call(node.querySelectorAll("img")).forEach(img => {
            img.removeAttribute("height");
          });
        }
        base.current.appendChild(node);
      });
    }

    // On unmount
    return () => {
      if (!base.current) return;
      if (!props.nodes) return;

      props.nodes.forEach(node => {
        if (base.current.contains(node)) {
          base.current.removeChild(node);
        }
      });
    };
  }, []);

  // const config = story(props.config.key, 1974);
  let align = styles.right;
  // if (typeof config.fullWidth === "undefined" || config.fullWidth === true)
    align = "";

  // let shouldHide = () => {
  //   // Put additional hiding factors here
  //   if (birthYear < 2008 && props.config.age === "young") return true;
  //   else return false;
  // };

  // useEffect(() => {
  //   if (!props.config.hide) return;

  //   const aboveYearText = props.config.hide.match(/above\d+/g);
  //   const aboveYear = aboveYearText ? aboveYearText[0].match(/\d+/g) : null;

  //   const belowYearText = props.config.hide.match(/below\d+/g);
  //   const belowYear = belowYearText ? belowYearText[0].match(/\d+/g) : null;

  //   const processAbove = props.config.hide.includes("above");
  //   const processBelow = props.config.hide.includes("below");

  //   let shouldHide = false;

  //   if (processAbove) {
  //     if (birthYear > aboveYear) shouldHide = true;
  //   }

  //   if (processBelow) {
  //     if (birthYear < belowYear) shouldHide = true;
  //   }

  //   setHidePanel(shouldHide);
  // }, [birthYear]);

  return (
    <div
      className={
        styles.base +
        " " +
        styles.light +
        " " +
        align +
        " " +
        (hidePanel ? styles.hidden : "")
      }
      ref={base}
    >
      {props.config.swap &&
        props.nodes.map((node, index) => {
          return (
            <JsxParser
              key={index}
              renderInWrapper={false}
              bindings={{
                birthYear: calculatedBirthYear,
                fiveYearAge: fiveYearAge,
                birthDateAverage: roundBirthYearTemp,
                birthDateAverageAboveBelow:
                  birthYearTemp < 0 ? "below" : "above",
                coolerThanHottest: roundHottestYearComparison
              }}
              jsx={node.outerHTML}
            />
          );
        })}
    </div>
  );
};
