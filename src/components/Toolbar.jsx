import { useState } from 'react';
import Checkbox from './Checkbox';

    const Toolbar = ({bannerVisible, feedOptions, handleEntityList}) => {
    if (!bannerVisible) {
        return (<div className="toolbar"> 
        <h3>Feed Options</h3>
        <fieldset>
            <legend>Select a Feed</legend>
            {feedOptions.map((option, i) => {
                return (
                    <div key={i}>
                        < Checkbox name={option} handleEntityList={handleEntityList}/>
                    </div>
                )
            })}
        </fieldset>
        
        </div>)
    }
    
}

export default Toolbar