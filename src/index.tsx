import React from 'react'
window.React = React
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./Modules";
const element = document.getElementById('root');
if(element){
  const root = createRoot(element);
  root.render(<App />);
}
