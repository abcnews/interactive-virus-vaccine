import "./keyshapejs.js";
import "@babel/polyfill";

import React from "react";
import { render } from "react-dom";
import App from "./components/App";
import jankdefer from "jankdefer";

const PROJECT_NAME = "interactive-scrollout";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

const fragment = document.querySelector(".html-fragment");
const embed = document.querySelector(".embed-fragment");

if (fragment) fragment.className = "inline-content html-fragment full u-full";
if (embed) embed.className = "embed-fragment u-full";

function init() {
  render(<App projectName={PROJECT_NAME} />, root);
}

// Use Ash Kyd's handy function to
// stop jank and load header hero first before loading
// the rest of the page.
jankdefer(init, {
  framerateTarget: 50,
  timeout: 4000,
  threshold: 5,
  debug: false
});

if (module.hot) {
  module.hot.accept("./components/App", () => {
    try {
      if (window.__ODYSSEY__) {
        init(window.__ODYSSEY__);
      } else {
        window.addEventListener('odyssey:api', e => {
          init(e.detail);
        });
      }
      
    } catch (err) {
      import("./components/ErrorBox").then(exports => {
        const ErrorBox = exports.default;
        render(<ErrorBox error={err} />, root);
      });
    }
  });
}

if (process.env.NODE_ENV === "development") {
  console.debug(`[${PROJECT_NAME}] public path: ${__webpack_public_path__}`);
}
