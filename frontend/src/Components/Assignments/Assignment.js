import React from 'react';
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import Card from "@material-ui/core/Card/Card";
import moment from 'moment';

const Assignment = ({ engine, startDate, endDate, station }) => {
    let role = "Truck";
    if (engine){
        role = "Engine"
    }

    let beginningDate = moment(startDate).format('MMMM Do YYYY');
    let closeDate = "Open";
    if (endDate !== "9999"){
        closeDate = moment(endDate).format('MMMM Do YYYY');
    }
    return (
        <Card className={"assignment-cont"}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Role: {role}
                </Typography>
                <Typography variant="h5" component="h2">
                    Station: {station.name}
                </Typography>
                <Typography color="textSecondary" className={"assignment-dates"}>
                    Dates of Assignment:
                </Typography>
                <Typography component="p" className={"date"}>
                    Start: {beginningDate}
                </Typography>
                <Typography component="p" className={"date"}>
                    End: {closeDate}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Assignment

