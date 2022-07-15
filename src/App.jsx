import { Viewer, Entity, CustomDataSource } from "resium";
import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner";
import Toolbar from "./components/Toolbar";
import { useState } from "react";

const feedOptions = ["My Location"];

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [entityList, setEntityList] = useState([]);


 
  // function to update list of displayed entities
  const handleEntityList = (entity) => {
    setEntityList(entity);
  }

  const closeBanner = (event) => {
    // close the welcome banner
    if (bannerVisible) {
      setBannerVisible(false);
      event.preventDefault();
      console.log('bannerVisible is now false')
    }
  };


  // TODO: create an entitylist and allow resium to map and display multiple entities
  // {entityList.map((x) => {
  //   return (
  //     <Entity
  //       entity={x}
  //       name="test1"
  //       position={Cartesian3.fromDegrees(-74, 40, 100)}
  //       point={{ pixelSize: 15, color: Color.YELLOW }}
  //       description="Normal Description"
  //     />
  //   )
  // })}

  return (
    <div>
      <Viewer full>
        <Toolbar bannerVisible={bannerVisible} feedOptions={feedOptions} handleEntityList={handleEntityList}/>
        <Banner bannerVisible={bannerVisible} closeBanner={closeBanner} />
        <CustomDataSource>
        <Entity
        name="test1"
        position={Cartesian3.fromDegrees(-74, 40, 100)}
        point={{ pixelSize: 15 }}
        description="Normal Description"
      />
        </CustomDataSource>
      </Viewer>
    </div>
  );
}

export default App;
