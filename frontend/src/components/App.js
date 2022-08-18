import React, {Component} from "react";
import {createRoot} from "react-dom/client";
import Navbar from "./Navbar";
import {BrowserRouter as Router} from "react-router-dom";

export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Router>
                    <Navbar/>
                </Router>
            </div>
        )
    }
}

const appDiv = document.getElementById('app')
const root = createRoot(appDiv)
root.render(<App/>)