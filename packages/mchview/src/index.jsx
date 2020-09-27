import React from "react";
import { render } from "react-dom";
import { enableAllPlugins } from "immer";
import configureStore from "./configureStore";
import Root from "./components/layout/Root";

enableAllPlugins();

const store = configureStore();

render(<Root store={store} />, document.querySelector("mchviewapp"));
