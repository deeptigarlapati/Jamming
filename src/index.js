import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';
import Spotify from './util/Spotify';

Spotify.getAccessToken();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
