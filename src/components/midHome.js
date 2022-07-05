import React , { useEffect, useState } from "react";
const defaultProps = {
    need : 'Sharma'
}
export default function HomeMid(props){
    const [state, setState] = useState(defaultProps);
    let obj = {
        
    };
    return(
        <div>i am a home mid {props.need?props.need:defaultProps.need}</div>
    )
}

