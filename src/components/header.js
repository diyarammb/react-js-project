import React , { useEffect, useState } from "react";
const defaultProps = {
    
}
export default function Header(props){
    const [state, setState] = useState(defaultProps);
    let obj = {
        
    };
    return(
        <div>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/auth">Auth</a>
            <a href="/dashboard">Dashboard</a>
        </div>
    )
}

