import React, {useState} from 'react'; 
import {dataFetcher} from '../utils/dataService'
import {useGeolocated} from "react-geolocated"
import { propagate, twoline2satrec, gstime, eciToGeodetic } from 'satellite.js';


// TODO: refactor to ES6
function Checkbox({name, handleEntityList}) { 
  // state for checkbox
  const [checked, setChecked] = useState(false);
    // state for datafeeds; (there is probably a smarter way to do this)
    // when the data is loaded, the state will change which will cause a re-render and your entity will appear
  const [dataFeed, setDataFeed] = useState(false)

  
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
  dataFetcher(url, 'iss', setDataFeed)
  if (dataFeed){

    const d = new Date()

    // with the TLE data, load it into satellite-js
  const satrec = twoline2satrec(dataFeed.line1, dataFeed.line2);

  //  position is in km, velocity is in km/s, both the ECI coordinate frame.
  const positionAndVelocity = propagate(satrec, d);

  // gmst is required for coordinate conversion, per satellite-js docs
  const gmst = gstime(d);

  // position
  const position = eciToGeodetic(positionAndVelocity.position, gmst);



  // CALL HANDLEENTITYLIST() AND UPDATE IT WITH THE ISS ENTITY OBJECT ATTRIBUTES
  let status = checked
  
  // TO DO: RETURN THE DATAFETCHER OBJECT AND ADD IT TO THE ENTITYLIST

  // let handleEntityList deal with the conversion to cesium radians for lat/lon
  const entityObject = {
    name: 'International Space Station',

    longitude: position.longitude,
    latitude: position.latitude,
    height: position.height * 1000,
    size: 5,
    color: 'red'
  }
  console.log('this is the entity object going into the list', entityObject)
  handleEntityList(entityObject, status)
  }
  
  

}

 
  return ( 
    <div>
        <input type="checkbox" id={name} name={name} defaultChecked={checked} onChange={handleChange} />
        <label htmlFor={name}>{name} </label>
    </div>
      
  ); 

}; 



export {Checkbox}