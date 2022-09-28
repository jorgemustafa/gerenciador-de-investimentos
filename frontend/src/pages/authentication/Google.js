import React, {useEffect} from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import {connect} from 'react-redux';
import {googleAuthenticate} from "../../actions/auth";
import queryString from 'query-string'

const Google = ({googleAuthenticate}) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        if (state && code) {
            googleAuthenticate(state, code);
        }
    }, [location]);

    return (
        <Redirect to='/'></Redirect>
    );
};

export default connect(null, {googleAuthenticate})(Google);