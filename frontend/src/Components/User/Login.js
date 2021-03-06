import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { withRouter, Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import '../../css/Login.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import Divider from "@material-ui/core/Divider/Divider";
import HeartRate from "../HeartRate";


class Login extends Component {
    state = {
      sap: "",
      password: "",
      error: false,
      redirect: false
    };

    login = event => {
        console.log(event.charCode);
        event.preventDefault();
        event.stopPropagation();
        this.props.toggleLoading();
        axios.post("/api/login", `sap=${this.state.sap}&password=${this.state.password}`)
            .then(() => {
                this.setState({redirect: true});
                this.props.toggleLoading()
            })
            .catch(() => {
                this.props.toggleLoading();
                this.props.showModal(["Oops","Looks like that combination didn't match what we have", "Please try again"]);
                this.setState({error: true})
            })
    };

    inputHandler = type => event => {
        this.setState({
            [type]: event.target.value
        })
    };

    render(){
        if (this.state.redirect){
            this.props.fetchUser();
            return <Redirect to={"/user/profile"}/>
        }
        return (
            <div className="login-cont">
                <div className="login-header" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div className={"login-header-h3"}>
                        <Typography component="h3" variant="h2" gutterBottom className={"login-header"}>
                            Sign in
                        </Typography>
                    </div>
                    <HeartRate/>
                </div>
                <Divider style={{margin: "3vh 0"}}/>
                <div className="login-info">
                    <Typography component="p" gutterBottom className={"login-header"}>
                        Use your SAP number, and your custom password
                    </Typography>
                </div>
                <form>
                    <div className="form-cont">

                        <div className="login-input-cont">
                            <TextField
                                error={this.state.error}
                                id={`outlined-username`}
                                label="SAP"
                                value={this.state.sap}
                                onChange={this.inputHandler('sap')}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="login-input-cont">
                            <TextField
                                error={this.state.error}
                                id={`outlined-password`}
                                label="Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.inputHandler('password')}
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                    </div>
                    <div className="login-actions-cont">
                            <Button type={"submit"} variant="contained" color="primary" className={"login-button"} onClick={this.login}>Continue</Button>
                    </div>
                </form>
                </div>
        )
    }
}

Login.propTypes = {
    toggleLoading: PropTypes.func,
    showModal: PropTypes.func
};

export default withRouter(connect(null, actions)(Login));