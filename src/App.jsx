import { Viewer, Entity } from "resium";
// import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner";
import Toolbar from "./components/Toolbar";
import { useState } from "react";

// TODO: Separate into separate feed component
const feedOptions = ["My Location"];

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [entityList, setEntityList] = useState([]);

  const closeBanner = (event) => {
    // close the welcome banner
    if (bannerVisible) {
      setBannerVisible(false);
      event.preventDefault();
    }
  };

  return (
    <div>
      <Viewer full>
        <Toolbar bannerVisible={bannerVisible} feedOptions={feedOptions} />
        <Banner bannerVisible={bannerVisible} closeBanner={closeBanner} />
      </Viewer>
    </div>
  );
}

export default App;
