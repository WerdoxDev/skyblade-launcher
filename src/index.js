import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import switchToPage from './react/utilities/switch-to-page';
import App from './react/App';

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);

switchToPage('store-container', 'grid')
