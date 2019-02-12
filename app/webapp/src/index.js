import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Config from './AWS'
import registerServiceWorker from './registerServiceWorker';


console.log("Used Config", Config)
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
