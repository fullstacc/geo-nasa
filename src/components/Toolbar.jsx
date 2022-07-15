import { useState } from 'react';

    const Toolbar = ({bannerVisible, feedOptions, handleEntityList}) => {
    if (!bannerVisible) {
        return (<div className="toolbar"> 
        <h3>Feed Options</h3>
        <fieldset>
            <legend>Select a Feed</legend>
            {feedOptions.map((option, i) => {
                return (
                    <div key={i}>
                        <input type="checkbox" id={option} name={option} onChange={handleEntityList}/>
                        <label htmlFor={option}>{option}</label>
                    </div>
                    // <div key={i}>
                    //     < Checkbox name={option} updateEntities={updateEntities}/>
                    // </div>
                )
            })}
        </fieldset>
        
        </div>)
    }
    
}

export default Toolbar