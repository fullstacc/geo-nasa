import React, { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import { Cartesian3 } from 'cesium';
import dataFetcher from '../utils/dataService';

function Checkbox({ name, handleEntityList }) {
  // state for checkbox
  const [checked, setChecked] = useState(false);

  // ADDED FOR ISS
  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataFeed, setDataFeed] = useState(null);

  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
  });

  const getLocation = () => {
    if (isGeolocationEnabled && isGeolocationAvailable) {
      const revisedEntityObject = {
        position: Cartesian3.fromDegrees(coords.longitude, coords.latitude, coords.accuracy),
        description: 'Your position',
        name,
        type: 'static',
      };
      const status = checked;
      handleEntityList(revisedEntityObject, status);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // ADDED FOR ISS
  const handleDataFeed = (dataFeedObject) => {
    if (dataLoaded === false) {
      setDataFeed(dataFeedObject);
      setDataLoaded(true);
    }
  };

  // ADDED FOR ISS
  useEffect(() => {
    if (dataLoaded) {
      handleEntityList(dataFeed, false);
    }
  }, [dataLoaded]);

  // ADDED FOR ISS
  // TODO: Separate into its own module
  const getIssData = () => {
    console.log('starting getIssData');
    const url = 'https://tle.ivanstanojevic.me/api/tle/25544';
    dataFetcher('iss', url, handleDataFeed, dataFeed);
  };

  const handleChange = () => {
    setChecked(!checked);
    if (name === 'My Location') {
      getLocation();
    }
    if (name === 'International Space Station') {
      getIssData();
    }
  };

  return (
    <div>
      <input type="checkbox" id={name} name={name} defaultChecked={checked} onChange={handleChange} />
      <label htmlFor={name}>
        {name}
      </label>
    </div>

  );
}

export default Checkbox;
