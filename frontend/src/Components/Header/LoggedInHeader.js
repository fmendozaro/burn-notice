import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import axios from 'axios';
import AdminHeader from "./AdminHeader";
import UserHeader from "./UserHeader";
import Register from "../User/Register";

class LoggedInMenu extends Component {

    state = {
        redirect: false
    };

    determineAdmin = () => {
        switch (this.props.user.chief) {
            case null:
                return;
            case false:
                return <UserHeader logout={this.logout}/>;
            default:
                return <AdminHeader logout={this.logout}/>;
        }
    };

    logout = () => {
        axios.get("/api/logout").then(() => {
            this.setState({redirect: true})
        })
            .catch(error => {
                console.log(error)
            })
    };

    render() {
        if (this.state.redirect){
            return (<Redirect to={"/user/login"}/>)
        }
        return (
            <React.Fragment>
                {this.determineAdmin()}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};
export default connect(mapStateToProps, actions)(LoggedInMenu);



