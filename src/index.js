import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import App from './js/app';


ReactDOM.render(
        <BrowserRouter>
            <AppContainer />
        </BrowserRouter>, 
        document.getElementById('root')
   );

if (module.hot) {
    module.hot.accept('./components/AppContainer', () => {
        const NextApp = require('./components/AppContainer').default;
        ReactDOM.render(
            <BrowserRouter>
                 <AppContainer />
            </BrowserRouter>,
            document.getElementById('root')
        );
    });
}