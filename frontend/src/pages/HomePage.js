import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";
import {Routes} from "../routes";
import { Provider} from "react-redux";
import store from '../store'

// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Settings from "./Settings";
import BootstrapTables from "./tables/BootstrapTables";
import Signin from "./authentication/Signin";
import Signup from "./authentication/Signup";
import ResetPasswordConfirm from "./authentication/ResetPasswordConfirm";
import ResetPassword from "./authentication/ResetPassword";
import Lock from "./authentication/Lock";
import NotFoundPage from "./authentication/NotFound";
import ServerError from "./authentication/ServerError";
import Activate from "./authentication/Activate"

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import Accordion from "./components/Accordion";
import Alerts from "./components/Alerts";
import Badges from "./components/Badges";
import Breadcrumbs from "./components/Breadcrumbs";
import Buttons from "./components/Buttons";
import Forms from "./components/Forms";
import Modals from "./components/Modals";
import Navs from "./components/Navs";
import Navbars from "./components/Navbars";
import Pagination from "./components/Pagination";
import Popovers from "./components/Popovers";
import Progress from "./components/Progress";
import Tables from "./components/Tables";
import Tabs from "./components/Tabs";
import Tooltips from "./components/Tooltips";
import Toasts from "./components/Toasts";


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
            <>
                <Preloader show={loaded ? false : true}/>
                <Sidebar/>

                <main className="content">
                    <Navbar/>
                    <Component {...props} />
                    <Footer toggleSettings={toggleSettings} showSettings={showSettings}/>
                </main>
            </>
        )}
        />
    );
};
const authLinks = (isAuthenticated) => {

}

const Homepage = () => (
    <Provider store={store}>
        <Switch>
            <RouteWithLoader exact path={Routes.Signin.path} component={Signin}/>
            <RouteWithLoader exact path={Routes.Signup.path} component={Signup}/>
            <RouteWithLoader exact path={Routes.Activate.path} component={Activate}/>
            <RouteWithLoader exact path={Routes.ResetPasswordConfirm.path} component={ResetPasswordConfirm}/>
            <RouteWithLoader exact path={Routes.ResetPassword.path} component={ResetPassword}/>
            <RouteWithLoader exact path={Routes.Lock.path} component={Lock}/>
            <RouteWithLoader exact path={Routes.NotFound.path} component={NotFoundPage}/>
            <RouteWithLoader exact path={Routes.ServerError.path} component={ServerError}/>
            <RouteWithSidebar exact path={Routes.DashboardOverview.path} component={DashboardOverview}/>
            <RouteWithSidebar exact path={Routes.Transactions.path} component={Transactions}/>
            <RouteWithSidebar exact path={Routes.Settings.path} component={Settings}/>
            <RouteWithSidebar exact path={Routes.BootstrapTables.path} component={BootstrapTables}/>
            <RouteWithSidebar exact path={Routes.Accordions.path} component={Accordion}/>
            <RouteWithSidebar exact path={Routes.Alerts.path} component={Alerts}/>
            <RouteWithSidebar exact path={Routes.Badges.path} component={Badges}/>
            <RouteWithSidebar exact path={Routes.Breadcrumbs.path} component={Breadcrumbs}/>
            <RouteWithSidebar exact path={Routes.Buttons.path} component={Buttons}/>
            <RouteWithSidebar exact path={Routes.Forms.path} component={Forms}/>
            <RouteWithSidebar exact path={Routes.Modals.path} component={Modals}/>
            <RouteWithSidebar exact path={Routes.Navs.path} component={Navs}/>
            <RouteWithSidebar exact path={Routes.Navbars.path} component={Navbars}/>
            <RouteWithSidebar exact path={Routes.Pagination.path} component={Pagination}/>
            <RouteWithSidebar exact path={Routes.Popovers.path} component={Popovers}/>
            <RouteWithSidebar exact path={Routes.Progress.path} component={Progress}/>
            <RouteWithSidebar exact path={Routes.Tables.path} component={Tables}/>
            <RouteWithSidebar exact path={Routes.Tabs.path} component={Tabs}/>
            <RouteWithSidebar exact path={Routes.Tooltips.path} component={Tooltips}/>
            <RouteWithSidebar exact path={Routes.Toasts.path} component={Toasts}/>
            <Redirect to={Routes.NotFound.path}/>
        </Switch>
    </Provider>
)

export default Homepage