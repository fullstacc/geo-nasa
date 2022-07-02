import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as Cesium from 'cesium';
import './index.css'


/*When importing global CSS files in React, 
it's a best practice to import the CSS file into your index.js file.  */

// NEW IDEA: KEEP CESIUM OUTSIDE OF REACT: THEY KEEP FIGHTING EACHOTHER

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


const viewer = new Cesium.Viewer('cesium', {
  timeline: false,
  animation: false,
  navigationHelpButton: false
});   

var skyAtmosphere = viewer.scene.skyAtmosphere;
var skyCheckbox = document.getElementById('skyCheckbox');

// skyCheckbox.addEventListener('change', function() {
//   viewer.scene.skyAtmosphere = skyCheckbox.checked ? skyAtmosphere : undefined;
// }, false);