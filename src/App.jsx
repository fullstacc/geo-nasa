

// import { Viewer, Entity } from "resium";
// import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner"
import Toolbar from "./components/Toolbar";
import { useState } from 'react';


// TODO: Separate into separate feed component
const feedOptions = ['My Location']

function App() {
  const [bannerVisible, setBannerVisible] = useState(true)

  const closeBanner = (event) => {
    // close the welcome banner
    if (bannerVisible) {
      setBannerVisible(false)
      event.preventDefault();
    }
  
  }

  return (
  <div >
  <Banner bannerVisible={bannerVisible} closeBanner={closeBanner} />
  <Toolbar bannerVisible={bannerVisible} feedOptions={feedOptions}/>
  </div>
  )
}

export default App;