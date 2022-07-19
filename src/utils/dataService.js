import axios from "axios"



// fetcher written in a generic way
// pass to it the url and the type of data you're attempting to get (name attribute), and it will update your component's state with its result
// TODO: refactor so that this takes in a url and a schema, and populates the schema
const dataFetcher = (Url, name, stateUpdater=undefined, stateStatus=undefined) => {

    if (name === 'apod') {
        console.log('NASA KEY', import.meta.env.VITE_NASA_KEY)


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
        axios.get(Url).then((response) => {
            console.log('attempting to reach endpoint...')
            let responseObject = {
                name: 'International Space Station',
                line1: response.data.line1,
                line2: response.data.line2,
                date: response.data.date,
                name: response.data.name,
                satelliteId: response.data.satelliteId,
                description: 'International Space Station'
            }
            stateUpdater(responseObject)
        })
    }
    
}

export {dataFetcher}