import React, {useState} from 'react'; 
import {useGeolocated} from "react-geolocated"

function Checkbox({name, handleEntityList}) { 
  // state for checkbox
  const [checked, setChecked] = useState(false);
  

  function getLongAndLat() {
    return new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );
}

const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

 const getLocation = () => {
  

    if (isGeolocationEnabled && isGeolocationAvailable) {
      console.log('made it here  ' , coords.latitude)
 
        const entityObject = {
          name : name,
          position: [coords.longitude, coords.latitude],
          description: 'Your position',
          accuracy: coords.accuracy
        }
        const status = checked
        console.log('sending to entitylist, status is' , status)
        handleEntityList(entityObject, status)
    } else {
        console.log("Geolocation is not supported by this browser.")
    } 
}


function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
    "Longitude: " + position.coords.longitude)
    const myPosition = [position.coords.latitude, position.coords.longitude]
    return myPosition
}
  
  const handleChange = () => { 
    setChecked(!checked)
    getLocation()
}

 
  return ( 
    <div>
        <input type="checkbox" id={name} name={name} defaultChecked={checked} onChange={handleChange} />
        <label htmlFor={name}>{name} </label>
    </div>
      
  ); 

}; 



export {Checkbox}