import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AboutSection from "../AboutSection";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import LoggedOutContent from "./LoggedOutContent";
import logo from '../../../assets/images/company-logo.png';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: "#9d1112",
        width: "100%"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

const DesktopLoggedOut = (props) => {
    const { classes } = props;

    return (
        <div className={"desktop desktop-menu"}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={"header-cont"}>
                    <Typography variant="h6" color="inherit" noWrap>
                        Burn Notice
                    </Typography>
                    <div>
                        <img src={logo} className={"logo"} alt={"company logo"}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={"drawer"}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <CardHeader title={"Welcome"}/>
                    <LoggedOutContent/>
                    <AboutSection closeMenu={props.closeMenu}/>
            </Drawer>
        </div>
    );
};

DesktopLoggedOut.propTypes = {
    classes: PropTypes.object.isRequired,
    closeMenu: PropTypes.func,
    logout: PropTypes.func,
    user: PropTypes.shape({
        id: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }),
};

export default withStyles(styles)(DesktopLoggedOut);