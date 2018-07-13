import React from 'react';
import ReactDOM from 'react-dom';
import MyCustomRenderer from './myCustomRenderer';
import './index.css';
// import App from './App';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, document.getElementById('root'));
// MyCustomRenderer.render(<Home />, document.getElementById('root'));
registerServiceWorker();
