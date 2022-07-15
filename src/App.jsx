import { Viewer, Entity, CustomDataSource } from "resium";
import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner";
import Toolbar from "./components/Toolbar";
import { useState } from "react";

const feedOptions = ["My Location", "International Space Station"];

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [entityList, setEntityList] = useState([]);


 
  // function to update list of displayed entities
  // the "status" here will come from the checkbox value
  const handleEntityList = (entity, status) => {
    status ? setEntityList([]) : setEntityList(entityList.concat(entity))
  }

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
        <Toolbar bannerVisible={bannerVisible} feedOptions={feedOptions} handleEntityList={handleEntityList}/>
        <Banner bannerVisible={bannerVisible} closeBanner={closeBanner} />
        <CustomDataSource>
        {entityList.map((x, i) => {
          const x_pos = x.position[0]
          const y_pos = x.position[1]
          const acc = x.accuracy
    return (
      <Entity
        name={x.name}
        key={i}
        position={Cartesian3.fromDegrees(x_pos, y_pos, acc)}
        point={{ pixelSize: 15 }}
        description={x.description}
      />
    )
  })}
        </CustomDataSource>
      </Viewer>
    </div>
  );
}

export default App;
