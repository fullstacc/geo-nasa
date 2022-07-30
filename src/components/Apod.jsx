/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from 'react';
import dataFetcher from '../utils/dataService';

const Apod = () => {
  // APOD target
  const apodUrl = 'https://api.nasa.gov/planetary/apod?';
  const [apod, setApod] = useState(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const handleApod = (apodObject) => {
    setApod(apodObject);
    setDataLoaded(true);
  };

  useEffect(() => {
    dataFetcher('apod', apodUrl, handleApod, apod);
  }, []);

  return (
    <div id="apod">
      <h1>NASA Astronomy Photo of the Day </h1>
      <h2>{dataLoaded ? (apod.date) : null} : {dataLoaded ? (apod.title) : null} </h2>
      <b> Credit : {dataLoaded ? (apod.copyright) : null}</b>
      <img id="apod-img" src={dataLoaded ? (apod.hdurl) : null} />
      <p>
        <i>{dataLoaded ? (apod.explanation) : null}</i>
      </p>
    </div>
  );
};

export default Apod;

// TODO: fix the async nature of getting the apod and storing it in an object
// see: country database
