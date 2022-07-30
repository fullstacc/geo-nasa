/* eslint-disable indent */
import axios from 'axios';
import { tleTranslate } from './translationService';

// fetcher
const dataFetcher = (name, Url, stateUpdater) => {
     if (name === 'apod') {
        const targetUrl = `${Url}api_key=${import.meta.env.VITE_NASA_KEY}`;

        axios.get(targetUrl).then((response) => {
            console.log('attempting to reach endpoint...');

            const responseObject = {
                date: response.data.date,
                explanation: response.data.explanation,
                hdurl: response.data.hdurl,
                title: response.data.title,
                copyright: response.data.copyright,
            };
            stateUpdater(responseObject);
        })
        .catch((e) => console.log(e));
    }

    if (name === 'iss') {
        const targetUrl = Url;

        axios.get(targetUrl).then((response) => {
            const responseObject = {
                name: 'International Space Station',
                line1: response.data.line1,
                line2: response.data.line2,
                date: response.data.date,
                satelliteId: response.data.satelliteId,
                description: 'International Space Station',
            };

            // translate it into numbers resium can use to display an object
            const translatedObject = (tleTranslate(responseObject));
            stateUpdater(translatedObject);
        });
    }
};

export default dataFetcher;
