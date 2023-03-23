import React, {useEffect, useState} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {Routes} from "./routes";
import {Provider} from "react-redux";
import store from './store'

// pages
import DashboardOverview from "./pages/sidebar/dashboard/DashboardOverview";
import Transactions from "./pages/sidebar/Extrato/Transactions";
import Settings from "./pages/Settings";
import Signin from "./pages/authentication/Signin";
import Signup from "./pages/authentication/Signup";
import ResetPasswordConfirm from "./pages/authentication/ResetPasswordConfirm";
import ResetPassword from "./pages/authentication/ResetPassword";
import NotFoundPage from "./pages/authentication/NotFound";
import Activate from "./pages/authentication/Activate"
import Google from "./pages/authentication/Google";

// components
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import AddTransaction from "./pages/sidebar/transactions/addTransactions/AddTransaction";
import NewInvestment from "./pages/sidebar/transactions/addTransactions/NewInvestment";
import ReInvestment from "./pages/sidebar/transactions/addTransactions/ReInvestment";
import Sale from "./pages/sidebar/transactions/addTransactions/Sale";


const RouteWithLoader = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Route {...rest} render={props => (<> <Preloader show={loaded ? false : true}/> <Component {...props} /> </>)}/>
    );
};


const RouteWithSidebar = ({component: Component, ...rest}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const localStorageIsSettingsVisible = () => {
        return localStorage.getItem('settingsVisible') === 'false' ? false : true
    }

    const [showSettings, setShowSettings] = useState(localStorageIsSettingsVisible);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        localStorage.setItem('settingsVisible', !showSettings);
    }

    return (
        <Route {...rest} render={props => (
            localStorage.getItem('access') ? (
                <>
                    <Preloader show={!loaded}/>
                    <Sidebar/>

                    <main className="content">
                        <Navbar/>
                        <Component {...props} />
                        <Footer toggleSettings={toggleSettings} showSettings={showSettings}/>
                    </main>
                </>
            ) : <Redirect to={{pathname: Routes.Signin.path, state: {from: props.location}}}/>

        )}
        />
    );
};

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>

                {/*if authenticated*/}
                <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview}/>
                <RouteWithSidebar exact path={Routes.Settings.path} component={Settings}/>
                <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions}/>
                <RouteWithSidebar exact path={Routes.AddTransaction.path} component={AddTransaction}/>
                <RouteWithSidebar exact path={Routes.NewInvestment.path} component={NewInvestment}/>
                <RouteWithSidebar exact path={Routes.Sale.path} component={Sale}/>
                <RouteWithSidebar exact path={Routes.ReInvestment.path} component={ReInvestment}/>

                {/*auth*/}
                <RouteWithLoader exact path={Routes.Signin.path} component={Signin}/>
                <RouteWithLoader exact path={Routes.Signup.path} component={Signup}/>
                <RouteWithLoader exact path={Routes.Activate.path} component={Activate}/>
                <RouteWithLoader exact path={Routes.Google.path} component={Google}/>
                <RouteWithLoader exact path={Routes.ResetPasswordConfirm.path} component={ResetPasswordConfirm}/>
                <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword}/>

                {/*other*/}
                <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage}/>
                <Redirect to={Routes.NotFound.path}/>
            </Switch>
        </BrowserRouter>
    </Provider>
)

export default App