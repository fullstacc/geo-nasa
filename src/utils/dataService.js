import axios from "axios"
import {tleTranslate} from '../utils/translationService'



// fetcher
const dataFetcher = (name, Url, stateUpdater, stateStatus) => {
    console.log('NASA KEY', import.meta.env.VITE_NASA_KEY)
    
    if (name === 'apod') {
        let targetUrl = Url+'api_key='+import.meta.env.VITE_NASA_KEY

        axios.get(targetUrl).then((response) => {
            console.log('attempting to reach endpoint...')
            
            let responseObject = {
                date: response.data.date,
                explanation: response.data.explanation,
                hdurl: response.data.hdurl,
                title: response.data.title,
                copyright: response.data.copyright
            }
            stateUpdater(responseObject)
        })
        .catch((e) => console.log(e))
    }

    if (name === 'iss') {
        let targetUrl = Url

        axios.get(targetUrl).then((response) => {
            let responseObject = {
                name: 'International Space Station',
                line1: response.data.line1,
                line2: response.data.line2,
                date: response.data.date,
                name: response.data.name,
                satelliteId: response.data.satelliteId,
                description: 'International Space Station'
            }
            

            // translate it into numbers resium can use to display an object
            tleTranslate(responseObject)

            console.log('this is the fetched response', responseObject)
        })
    }


    
}

export {dataFetcher}