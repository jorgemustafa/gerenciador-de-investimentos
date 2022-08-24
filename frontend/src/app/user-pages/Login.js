import React, {Component, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {Form} from 'react-bootstrap';
import {connect} from "react-redux";
import {login} from "../actions/auth";
import axios from "axios";

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();

        login(email, password);
    };

    const continueWithGoogle = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/google-oauth2/?redirect_uri=${process.env.REACT_APP_API_URL}/google`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    const continueWithFacebook = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/o/facebook/?redirect_uri=${process.env.REACT_APP_API_URL}/facebook`)

            window.location.replace(res.data.authorization_url);
        } catch (err) {

        }
    };

    if (isAuthenticated) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <div className="d-flex align-items-center auth px-0">
                <div className="row w-100 mx-0">
                    <div className="col-lg-4 mx-auto">
                        <div className="card text-left py-5 px-4 px-sm-5">
                            <div className="brand-logo">
                                <img src={require("../../assets/images/logo.svg")} alt="logo"/>
                            </div>
                            <h4>Hello! let's get started</h4>
                            <h6 className="font-weight-light">Sign in to continue.</h6>
                            <form className="form-group" onSubmit={e => onSubmit(e)}>
                                <div className='form-group'>
                                    <input
                                        className='form-control'
                                        type='email'
                                        placeholder='Email'
                                        name='email'
                                        value={email}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        className='form-control'
                                        type='password'
                                        placeholder='Password'
                                        name='password'
                                        value={password}
                                        onChange={e => onChange(e)}
                                        minLength='6'
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block btn-primary btn-lg
                                             font-weight-medium auth-form-btn">Login
                                </button>
                            </form>
                        </div>
                        <div className="my-2 d-flex justify-content-between align-items-center">
                            <div className="form-check">
                                <label className="form-check-label text-muted">
                                    <input type="checkbox" className="form-check-input"/>
                                    <i className="input-helper"></i>
                                    Keep me signed in
                                </label>
                            </div>
                            <Link to="/reset-password" className="text-primary">Forgot your password?</Link>
                        </div>
                        <div className="mb-2">
                            <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                                <i className="mdi mdi-facebook mr-2" onClick={continueWithFacebook}></i>Connect using
                                facebook
                            </button>
                        </div>
                        <div className="text-center mt-4 font-weight-light">
                            Don't have an account? <Link to="/register"
                                                         className="text-primary">Create</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);