import { Viewer, Entity, CustomDataSource } from "resium";
import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner";
import Toolbar from "./components/Toolbar";
import { useState } from "react";
console.log('DID IT WORK', import.meta.env)

const feedOptions = ["My Location", "International Space Station"];

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [entityList, setEntityList] = useState([]);


 
  // function to update list of displayed entities
  // the "status" here will come from the checkbox value
  const handleEntityList = (entity, status) => {
    console.log('status within handleEntityList is ', status)
    // in this case, status === false means that the item is not showing and we should add it to the entity list
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
          console.log('mapping over entity list', x)
          const x_pos = x.position[0]
          const y_pos = x.position[1]
          const acc = x.accuracy
          const position = Cartesian3.fromDegrees(x_pos, y_pos, acc)
          const point = {pixelSize:15}
    return (
      <Entity
        name={x.name}
        key={i}

        position={position}
        point={point}
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
