import React, {useState} from 'react'; 
import {Cartesian3} from 'cesium'
import {Entity, PointGraphics} from 'resium'

function Checkbox({name, handleEntityList}) { 
  // state for checkbox
  const [checked, setChecked] = useState(false);


  const [returnEntity, setReturnEntity]  = useState(null)

 const getLocation = () => {
  console.log('FIRING GETLOCATION')
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        const entityObject = {
          name : name,
          position: [-74.0707383, 40.7117244],
          description: 'test'
        }
        const status = checked
        console.log('sending to entitylist, status is' , status)
    } else {
        console.log("Geolocation is not supported by this browser.") 
    }
}
function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude)
    const position2 = Cartesian3.fromDegrees(-74.0707383, 40.7117244, 100);
    // this works; what we need is to return this data to resium viewer in order to render the position using an entity
    // setReturnEntity(<Entity position={position2}>
    //   <PointGraphics pixelSize={10} />
    // </Entity>)
    handleEntityList(returnEntity)
}
  
  const handleChange = () => { 
    // console.log('FUNCTION status of checked')
    // checked ? setChecked(false) : setChecked(true)
    console.log(`FUNCTION state for checkbox ${name} is now `,checked) 
    setChecked(!checked)
    getLocation()
}
  console.log('GLOBAL current state of checked is', checked)

 
  return ( 
    <div>
        <input type="checkbox" id={name} name={name} defaultChecked={checked} onChange={handleChange} />
        <label htmlFor={name}>{name} {checked.toString()}</label>
    </div>
      
  ); 

}; 



export {Checkbox}