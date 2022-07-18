import React, {useState} from 'react'; 
import {dataFetcher} from '../utils/dataService'
import {useGeolocated} from "react-geolocated"


// TODO: refactor to ES6
function Checkbox({name, handleEntityList}) { 
  // state for checkbox
  const [checked, setChecked] = useState(false);
  
// TODO: refactor to ES6
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


 // TODO: refactor this to its own module
 const getLocation = () => {
  

    if (isGeolocationEnabled && isGeolocationAvailable) {
 
        const entityObject = {
          name : name,
          position: [coords.longitude, coords.latitude],
          description: 'Your position',
          accuracy: coords.accuracy
        }
        let status = checked
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
  
// handleChange() will function differently depending on the checkbox set (see "name")
  const handleChange = () => { 
    setChecked(!checked)
    if (name === 'My Location') {
      getLocation()
    }
    if (name === 'International Space Station') {
      handleISS()
    
    }
    
}

const handleISS = () => {
  // SET THE URL TO GO TO
  let url = 'https://tle.ivanstanojevic.me/api/tle/25544'
  // CALL DATAFETCHER WITH THE URL, STATEUPDATER, AND STATETSTATUS
  dataFetcher(url, 'iss')
  // CALL HANDLEENTITYLIST() AND UPDATE IT WITH THE ISS ENTITY OBJECT ATTRIBUTES
  let status = checked
  // handleEntityList(entityObject, status)

}

 
  return ( 
    <div>
        <input type="checkbox" id={name} name={name} defaultChecked={checked} onChange={handleChange} />
        <label htmlFor={name}>{name} </label>
    </div>
      
  ); 

}; 



export {Checkbox}