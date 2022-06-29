import React from "react";
import { Viewer } from "./components/Cesium";
import { WelcomeMessage } from "./components/WelcomeMessage"


function App() {
  return (
  <div>
    <WelcomeMessage/>
    <Viewer />
  </div>
  )
}

export default App;