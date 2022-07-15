// import {  Entity, EntityDescription } from "resium";
import './Banner.css';
import { useState } from 'react';

// const [showBanner, setShowBanner] = useState(true)



const Banner = ({bannerVisible, closeBanner }) => {
    if (bannerVisible) {
        return (<div className="controlPanel" id="banner"> 
        <h1>Welcome to GEO.</h1>
        <p>From this app you'll be able to visualize various data feeds.</p>
        <p><i>NOTE: Please wait a few moments before attempting to turn on "My Location"</i></p>
        <form onSubmit={closeBanner} ><button className="banner-button"type="submit">OK</button></form>
        </div>)
    }
    


}

export default Banner