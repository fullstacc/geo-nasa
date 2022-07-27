import { Viewer, Entity, CustomDataSource } from "resium";
import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";
import Banner from "./components/Banner";
import Toolbar from "./components/Toolbar";
import { useState, useEffect } from "react";
import {SampledPositionProperty} from "cesium"
console.log('DID IT WORK', import.meta.env)

const feedOptions = ["My Location", "International Space Station"];

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [entityList, setEntityList] = useState([]);

useEffect(()=> {
  'entityList has changed'
}, [entityList])
 
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


  // {
  //   // alternate version
  //   entityList.map((x, i) => {
  //     // if its a static position on the map, we parse the object differently
  //     if (x.position.length === 2) {
  //       console.log('this is a my position entity')
  //     }
  //   })
  // }


  return (
    <div>
      <Viewer full>
        <Toolbar bannerVisible={bannerVisible} feedOptions={feedOptions} handleEntityList={handleEntityList}/>
        <Banner bannerVisible={bannerVisible} closeBanner={closeBanner} />
        <CustomDataSource>
        


        {entityList.map((x, i) => {
          if (x.type === 'static') {
            console.log('playing with my location')
            const position = x.position
            const name = x.name
            const description = x.description
            const point = {pixelSize:10}
            
            return (
              <Entity name={name} key={i} position={position} point={point} description={description}/>
            )
          }
          if (x.type === 'satellite') {
            console.log('playing with iss')
            // const position = x.position
            const position = Cartesian3.fromRadians(x.longitude, x.latitude, x.height)
            const name = x.name
            const description = x.description
            const height = x.height 
            const point = {pixelSize:10}

            const positionsOverTime = new SampledPositionProperty();
            

            return (
              <Entity name={name} key={i} position={position} point={point} description={description}/>
            )
            
            
          }
          console.log('mapping over entity list', x)
          
          
          
          
    // return (
    //   <Entity
    //     name={x.name}
    //     key={i}
    //     position={x.position}
    //     point={point}
    //     description={x.description}
    //   />
    // )
  })}
        </CustomDataSource>
      </Viewer>
    </div>
  );
}

export default App;
