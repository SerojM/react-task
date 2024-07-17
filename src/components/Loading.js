import React from 'react';
import {ReactComponent as Spinner} from "../assets/images/spinner.svg";

function Loading(props) {
    return (
        <div className='spinnerWrapper'>
            <span className='spinnerContainer'><Spinner/></span>
        </div>
    );
}

export default Loading;
