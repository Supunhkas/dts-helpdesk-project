import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import data from "../data/data";

const card = (
  <React.Fragment>
    <CardContent>
      {data.map((item, i) => (
        <>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {item.tNo}
          </Typography>
          <Typography variant="h5" component="div">
            {item.location}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.status}
          </Typography>
        </>
      ))}`
    </CardContent>
  </React.Fragment>
);

const Dashboard = () => {
  return (
    <div style={{ flex: 1 }}>
      <Paper sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
        <Card variant="outlined">{card}</Card>
      </Paper>
    </div>
  );
};

export default Dashboard;
