import React from 'react'
import { CSSProperties } from 'react';
import "./style.css";

interface LoadingProps {
    activate?:boolean;
    setActivate?: (active:boolean) => void;
    classCss?: string;
}

// react-app-env.d.ts o declarations.d.ts

declare module 'react' {
  interface CSSProperties {
    '--delay'?: string;
  }
}

const Loading = ({active, setActivate, classCss}) => {
    return (
    <div className={active ? `${classCss} content-loading activate` : "content-loading"}>
        <div className="titan"></div>
        <ul className='titan-loading'>
            <li style={{ "--delay" : "-1.4s"}}></li>
            <li style={{ "--delay": "-1.2s" }}></li>
            <li style={{ "--delay" : "-1s" }}></li>
        </ul>
    </div>
  )
}

export default Loading;