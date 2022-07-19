import { Viewer, Entity, CustomDataSource } from "resium";
import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner";
import Toolbar from "./components/Toolbar";
import { useState } from "react";
// console.log('DID IT WORK', import.meta.env)

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
          if (x.name === 'My Location'){
            console.log('parsing my location')

            let x_pos = x.position[0]
            let y_pos = x.position[1]
            let acc = x.accuracy
            let position = Cartesian3.fromDegrees(x_pos, y_pos, acc)
            let point = {pixelSize: 15}
            let description = x.description

          } // end if
          
          else if (x.name === 'International Space Station') {
              console.log('parsing the ISS', x)
              let x_pos = x.longitude
              let y_pos = x.latitude
              let height = x.height
              let position = Cartesian3.fromRadians(x_pos, y_pos, height)
              console.log('this is the ISS position', position)
              let point = {pixelSize: 15}
              let description = x.description
          }
          
    return (
      <Entity
        name={x.name}
        key={i}
        position={position}
        point={point}
        description={description}
      />
    )
  })}
        </CustomDataSource>
      </Viewer>
    </div>
  );
}

export default App;
