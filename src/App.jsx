

// import { Viewer, Entity } from "resium";
// import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner"
import { useState } from 'react';





// setTimeout(
//   () => setCounter(counter + 1),
//   1000
// )




// When we use Cesium we initialize the Viewer object, but in cesium-react we can mount the Viewer component.




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
  </div>
  )
}

export default App;