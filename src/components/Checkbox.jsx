import React, {useState} from 'react'; 
import {Cartesian3} from 'cesium'
import {Entity, PointGraphics} from 'resium'

function Checkbox({name, updateEntities}) { 
  // state for checkbox
  const [checked, setChecked] = useState(false);
  const [returnEntity, setReturnEntity]  = useState(null)

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.") 
    }
}
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude)
    const position2 = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
    // this works; what we need is to return this data to resium viewer in order to render the position using an entity
    setReturnEntity(<Entity position={position2}>
      <PointGraphics pixelSize={10} />
    </Entity>)
    updateEntities(returnEntity)
}
  
  const handleChange = () => { 
    
    setChecked(!checked);
    console.log(`state for checkbox ${name} is now `,checked) 

    if (checked) {
        getLocation()
    
  }; 

}
  
  return ( 
    
    <div>
        <input type="checkbox" id={name} name={name} onChange={handleChange}/>
        <label for={name}>{name}</label>

    </div>
      
  ); 

}; 



export {Checkbox}