import './Banner.css';
import Apod from './Apod';

function Banner({ bannerVisible, closeBanner }) {
  if (bannerVisible) {
    return (
      <div className="controlPanel" id="banner">
        <h1> Welcome to GEO. </h1>
        <p> From this app you&apos;ll be able to visualize various data feeds. </p>
        <p>
          <i>
            NOTE: Please wait a few moments before attempting to turn on &quot;My Location&quot;
          </i>
        </p>
        <Apod />
        <form onSubmit={closeBanner}><button className="banner-button" type="submit">OK</button></form>
      </div>
    );
  }
}

export default Banner;
