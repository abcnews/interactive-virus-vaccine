import React from "react";
import { render } from "react-dom";
import App from "./components/App";

const PROJECT_NAME = "interactive-scrollout";
const root = document.querySelector(`[data-${PROJECT_NAME}-root]`);

const fragment = document.querySelector(".html-fragment");
const embed = document.querySelector(".embed-fragment");

if (fragment) fragment.className = "inline-content html-fragment full u-full";
if (embed) embed.className = "embed-fragment u-full";

console.log(":)!!!");

function init() {
  render(<App projectName={PROJECT_NAME} />, root);
}

init();

if (module.hot) {
  module.hot.accept("./components/App", () => {
    try {
      init();
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
