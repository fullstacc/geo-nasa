import { useState } from 'react';
const Toolbar = ({bannerVisible, feedOptions}) => {
    if (!bannerVisible) {
        return (<div className="toolbar"> 
        <h3>Feed Options</h3>
        <fieldset>
            <legend>Select a Feed</legend>
            {feedOptions.map((option, i) => {
                return (
                    <div key={i}>
                        <input type="checkbox" id={option} name={option}/>
                        <label htmlFor={option}>{option}</label>

                    </div>
                )
            })}
        </fieldset>
        
        </div>)
    }
    
}

export default Toolbar