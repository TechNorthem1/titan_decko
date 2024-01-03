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
    <div className={active ? "body active" : "body"}>
      <div className="center">
        <div className="ring"></div>
        <span>Cargando...</span>
      </div>
    </div>
  )
}

export default Loading;