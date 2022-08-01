import {
  propagate, twoline2satrec, gstime, eciToGeodetic,
} from 'satellite.js';

// fetcher
const tleTranslate = (objectToTranslate) => {
  const d = new Date();

  // with the TLE data, load it into satellite-js
  const satrec = twoline2satrec(objectToTranslate.line1, objectToTranslate.line2);

  //  position is in km, velocity is in km/s, both the ECI coordinate frame.
  const positionAndVelocity = propagate(satrec, d);

  // gmst is required for coordinate conversion, per satellite-js docs
  const gmst = gstime(d);

  // position
  const position = eciToGeodetic(positionAndVelocity.position, gmst);

  // const height = position.height * 1000
  // const translatedPosition = Cartesian3(position.longitude, position.latitude, height)

  // this object contains the parameters necessary to display it in resium
  const translatedObject = {
    name: 'International Space Station',
    longitude: position.longitude,
    latitude: position.latitude,
    height: position.height * 1000,
    size: 5,
    type: 'satellite',
  };

  console.log('this is the translated object: ', translatedObject);
  return (translatedObject);
};

/* use this when mapping the entityList and running into objects
that are static positions on the map (i.e. 'my location') */

export default tleTranslate;
