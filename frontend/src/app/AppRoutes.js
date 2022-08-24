import React, {Component, Suspense, lazy} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Spinner from '../app/shared/Spinner';
import {Provider} from 'react-redux';
import store from './store'

const Dashboard = lazy(() => import('./dashboard/Dashboard'));
const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));
const BasicElements = lazy(() => import('./form-elements/BasicElements'));
const BasicTable = lazy(() => import('./tables/BasicTable'));
const Mdi = lazy(() => import('./icons/Mdi'));
const ChartJs = lazy(() => import('./charts/ChartJs'));
const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));
const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));
const Activate = lazy(() => import('./user-pages/Activate'));
const ResetPasswordConfirm = lazy(() => import('./user-pages/ResetPasswordConfirm'));
const ResetPassword = lazy(() => import('./user-pages/ResetPassword'));


// noinspection BadExpressionStatementJS
class AppRoutes extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner/>}>
                <Provider store={store}>
                        <Switch>
                            <Route exact path="/dashboard" component={Dashboard}/>
                            <Route path="/basic-ui/buttons" component={Buttons}/>
                            <Route path="/basic-ui/dropdowns" component={Dropdowns}/>
                            <Route path="/basic-ui/typography" component={Typography}/>
                            <Route path="/form-Elements/basic-elements" component={BasicElements}/>
                            <Route path="/tables/basic-table" component={BasicTable}/>
                            <Route path="/icons/mdi" component={Mdi}/>
                            <Route path="/charts/chart-js" component={ChartJs}/>
                            <Route path="/error-pages/error-404" component={Error404}/>
                            <Route path="/error-pages/error-500" component={Error500}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/reset-password" component={ResetPassword}/>
                            <Route exact path="/password/reset/confirm/:uid/:token" component={ResetPasswordConfirm}/>
                            <Route exact path="/activate/:uid/:token" component={Activate}/>

                            <Redirect to="/dashboard"/>
                        </Switch>
                </Provider>
            </Suspense>
        );
    }
}

export default AppRoutes;