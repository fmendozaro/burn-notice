// component to show the list of firefighter components

// follow many vacancies for reference

// Can be put in multiple places

import React from 'react';
import Firefighter from "./FireFighter";
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import Typography from '@material-ui/core/Typography';
import "../../css/Firefighter.css"
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const ExpansionPanel = (MuiExpansionPanel);
const ExpansionPanelDetails = (MuiExpansionPanelDetails);
const ExpansionPanelSummary = (props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = 'ExpansionPanelSummary';


const ManyFirefighters = ({ firemanList }) => (
    <ExpansionPanel id="ff_content">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
            <Typography id="ff_title">Current Crew</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails id="ff_body">
            {firemanList.map(firefighter => <Firefighter key={firefighter.id} {...firefighter} />)}
        </ExpansionPanelDetails>
    </ExpansionPanel>
);

ManyFirefighters.propTypes = {
    firemanList: PropTypes.array
};

export default ManyFirefighters;