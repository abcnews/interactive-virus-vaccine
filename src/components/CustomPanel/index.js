import React, { useState, useEffect, useRef, useContext } from "react";

import styles from "./styles.scss";

const FADE_THRESHOLD = 300;

const d3 = { ...require("d3-scale") };

const opacityScale = d3
  .scaleLinear()
  .domain([1, FADE_THRESHOLD])
  .range([0, 1]);

export default props => {
  const base = useRef();
  const [opacity, setOpacity] = useState(1.0);

  const onScroll = () => {
    // Only run on Scrollout panels
    if (props.config.scrollout) {
      const top = base.current.getBoundingClientRect().top;
      const bottom = base.current.getBoundingClientRect().bottom;

      // Fade in top
      if (top < window.innerHeight && top > 0) {
        const pixelsAboveFold = window.innerHeight - top;

        if (pixelsAboveFold > FADE_THRESHOLD) {
          setOpacity(1.0);
        } else {
          setOpacity(opacityScale(pixelsAboveFold));
        }
      }

      // Fade in bottom
      if (bottom > 0 && bottom < window.innerHeight) {
        if (bottom > FADE_THRESHOLD) {
          setOpacity(1.0);
        } else {
          setOpacity(opacityScale(bottom));
        }
      }
    }
  };

  // Once on mount we append Core text to the panels/pars
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

    window.addEventListener("scroll", onScroll);

    // On unmount
    return () => {
      if (!base.current) return;
      if (!props.nodes) return;

      props.nodes.forEach(node => {
        if (base.current.contains(node)) {
          base.current.removeChild(node);
        }
      });
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`${styles.base} ${styles.light} ${
        props.config.scrollout ? styles.scrollout : ""
      }`}
    >
      <div className={styles.inner}>
        <div
          className={`${
            props.config.scrollout ? "custom-scrollout-panel" : ""
          } ${styles.panel}`}
          ref={base}
          style={{ opacity: opacity }}
        ></div>
      </div>
    </div>
  );
};
