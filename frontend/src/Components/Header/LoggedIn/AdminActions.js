import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Link from "react-router-dom/es/Link";

// icons
import LocationCity from '@material-ui/icons/LocationCity';
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import DropDownList from "../DropDownList";
import ListAlt from "@material-ui/icons/ListAlt";
import Description from "@material-ui/icons/Description";
import LibraryAdd from "@material-ui/icons/LibraryAdd";
import NoteAdd from "@material-ui/icons/NoteAdd";
import Store from "@material-ui/icons/Store";
import Search from "@material-ui/icons/Search";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedIn";
import Assignment from "@material-ui/icons/Assignment";

const AdminActions = ({ closeMenu, user}) => {
    return (
        <Fragment>
        <ListSubheader>Actions</ListSubheader>
            <DropDownList closeMenu={closeMenu}
                          primaryText={"Reports"}
                          mainIcon={<ListAlt/>}
                          listItems={[
                              [<LibraryAdd/>, "Search", "/reports/search"],
                              [<LibraryAdd/>, "Create", "/reports/create/1"],
                              [<Description/>, "My Reports", `/reports/${user ? user.id : ""}`]
                          ]}
            />
            <DropDownList closeMenu={closeMenu}
                          primaryText={"Vacancies"}
                          mainIcon={<Store/>}
                          listItems={[
                              [<Search/>,  'All Vacancies', `/vacancy/show`],
                              [<NoteAdd/>,  'Create Vacancy', `/vacancy/create`],
                              [<AssignmentTurnedIn/> ,'Review Requests', '/transfer/view']
                          ]}
            />
            {[[`Assignment History`, `/assignments/show/${user ? user.id : ""}`], ['Station List', '/stations/all']].map((text, index) => (
                <Link to={text[1]} className={"router-link"} key={index}>
                    <ListItem button onClick={closeMenu}>
                        <ListItemIcon>{text[0] === "Assignment History" ? <Assignment/> : <LocationCity/> }</ListItemIcon>
                        <ListItemText primary={text[0]}/>
                    </ListItem>
                </Link>
            ))}

        </Fragment>
    );
};

AdminActions.propTypes = {
    closeMenu: PropTypes.func,
    user: PropTypes.object,
};

export default AdminActions;
