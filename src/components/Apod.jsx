import {dataFetcher} from '../utils/dataService'
import {useEffect, useState} from 'react'

const Apod = () => {

    // APOD target
    const apod_url = `https://api.nasa.gov/planetary/apod?`
    const [apod, setApod] = useState(null)
    const [dataLoaded, setDataLoaded] = useState(false)


    const handleApod = (apodObject) => {
        setApod(apodObject)
        setDataLoaded(true)
    }

    useEffect(() => {
        dataFetcher('apod', apod_url, handleApod, apod);
        // setApod({
        //     date: responseObject.date,
        //     explanation: responseObject.explanation,
        //     hdurl: hdurl,
        // })
      }, []);

      //  {Object.entries(apod).map(([key, value]) => `key ${key} value ${value}`)}

    return (
        <div id="apod">
            <h1>NASA Astronomy Photo of the Day </h1>
            <h2>{dataLoaded ? (apod.date) : null
            } : {dataLoaded ? (apod.title) : null
            } </h2>
            
            <b> Credit : {dataLoaded ? (apod.copyright) : null}</b>
            <img id="apod-img" src={dataLoaded ? (apod.hdurl) : null}></img>
            <p><i>{dataLoaded ? (apod.explanation) : null}</i>
            
            </p>
            
            
            
           
        
        </div>
    )
}

export {Apod}

// TODO: fix the async nature of getting the apod and storing it in an object
// see: country database