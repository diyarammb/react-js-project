import React , { useEffect, useState } from "react";
import globals from '../utils/global';
import { pageConfig } from '../configuration/home';
const defaultProps = {
    
}
export default function Home(props){
    const [state, setState] = useState(defaultProps);
    let obj = {
        
    };
    return(
        <div>{globals._mapRender(pageConfig.body, state, obj)}</div>
    )
}

