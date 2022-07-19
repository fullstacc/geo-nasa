import React, {useState} from 'react'; 
import {useGeolocated} from "react-geolocated"

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
        const status = checked
        console.log('sending to entitylist, status is' , status)
        handleEntityList(entityObject, status)
    } else {
        console.log("Geolocation is not supported by this browser.")
    } 
}

 // ADDED FOR ISS
 const handleDataFeed = (dataFeedObject) => {
  setDataLoaded(true)
  if(dataLoaded) {
    console.log('data is loaded')
    setDataFeed(dataFeedObject)
    console.log('state is loaded', dataFeed)
  }

}

// ADDED FOR ISS
// TODO: Separate into its own module
const getIssData = () => {
  const url = 'https://tle.ivanstanojevic.me/api/tle/25544'
  dataFetcher(url, 'iss', handleDataFeed)

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