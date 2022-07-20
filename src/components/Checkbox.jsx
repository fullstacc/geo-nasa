import React, {useState} from 'react'; 
import {useGeolocated} from "react-geolocated"
import {dataFetcher} from '../utils/dataService'
import { Cartesian3, InfoBox, InfoBoxViewModel } from "cesium";



function Checkbox({name, handleEntityList}) { 
  // state for checkbox
  const [checked, setChecked] = useState(false);

  // ADDED FOR ISS
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFeed, setDataFeed] = useState(null)
  

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

        // TEST
        const revisedEntityObject = {
           position : Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.accuracy),
           description : 'Your position',
           name : name,
           type : 'static'

            
        }
        const status = checked
        console.log('sending to entitylist, status is' , status)
        handleEntityList(revisedEntityObject, status)
    } else {
        console.log("Geolocation is not supported by this browser.")
    } 
}

 // ADDED FOR ISS
 const handleDataFeed = (dataFeedObject) => {
  if(!dataLoaded) {
    setDataFeed(dataFeedObject)
    setDataLoaded(!dataLoaded)
    
  }

}

// ADDED FOR ISS
if (dataLoaded) {
  handleEntityList(dataFeed, false)
}


// ADDED FOR ISS
// TODO: Separate into its own module
const getIssData = () => {
  console.log('starting getIssData')
  const url = 'https://tle.ivanstanojevic.me/api/tle/25544'
  dataFetcher('iss', url, handleDataFeed, dataFeed)

}
  
  const handleChange = () => { 
    setChecked(!checked)
    if (name === 'My Location'){
      getLocation()
    }
    if (name === 'International Space Station'){
      getIssData()
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