import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import CssBaseline from 'material-ui/CssBaseline';
import { MuiThemeProvider } from 'material-ui/styles';
import { Fragment } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { loadTranslations, syncTranslationWithStore } from 'react-redux-i18n';
import { TRANSLATION_DATA } from './config/translation';
import { changeLang } from './actions/ui-interact';
import { theme } from './theme/Customize';
import InitService from './services/InitService';
import RequireAuth from './components/auth/RequireAuth';

import reducers from './reducers';
import './styles/css/index.css';

import Main from './components/main/Main';
// const WithAuthentication = RequireAuth(Main);

// ONLY USED FOR DEMOS ( remove in production )
// window.DUMMY_DTA_FOLDER = `${process.env.PUBLIC_URL}/assets/dummy_data`;


export const store = createStore(reducers, {}, compose(applyMiddleware(ReduxThunk)));

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
                <Route to="*" component={ RequireAuth(Main) } />
            </Router>
        </Fragment>
    </MuiThemeProvider>
</Provider>, document.getElementById('root'));

// perform tasks after app loads
// ex: get notifications
InitService.getInstance().init();
