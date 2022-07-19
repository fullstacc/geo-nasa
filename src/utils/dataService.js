import axios from "axios"



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


    
}

export {dataFetcher}