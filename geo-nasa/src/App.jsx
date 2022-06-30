

import React from "react";
import { Viewer, Entity } from "resium";
import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner"

// When we use Cesium we initialize the Viewer object, but in cesium-react we can mount the Viewer component.

function App() {
  return (
  <div id="cesiumContainer">
  <Banner/>
  </div>
  )
}

export default App;