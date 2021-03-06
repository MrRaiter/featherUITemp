import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Fragment } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n';
import { TRANSLATION_DATA } from './config/translation';
import { changeLang } from './actions/ui-interact';
import { theme } from './theme/Customize';
import InitService from './services/InitService';
import StorageService from './services/StorageService';
import RequireAuth from './components/utils/RequireAuth';
// import registerServiceWorker from './registerServiceWorker'; // only if you're server uses HTTPS
import reducers from './reducers';
import './styles/css/index.css';

import Main from './main/Main';


const WithAuthentication = RequireAuth(Main);


export const store = createStore(reducers, { access_token: StorageService.getToken() }, compose(applyMiddleware(ReduxThunk)));

// translation
syncTranslationWithStore(store);
store.dispatch(loadTranslations(TRANSLATION_DATA));
const { language } = store.getState();
changeLang(language);

ReactDOM.render(
<Provider store={ store }>
    <MuiThemeProvider theme={ theme }>
        <Fragment>
            <CssBaseline />
            <Router basename={`/`}>                
                <WithAuthentication />
            </Router>
        </Fragment>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));

// registerServiceWorker(); // only if you're server uses HTTPS

// perform tasks after app loads
// ex: get sidebar notifications
InitService.getInstance().init();
