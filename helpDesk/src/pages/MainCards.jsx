import React from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { cards } from "../data/data";

export default function MainCards() {
  function getHighStatus(card) {
    return card.status === "high";
  }
  function getMediumStatus(card) {
    return card.status === "medium";
  }
  function getLowStatus(card) {
    return card.status === "low";
  }
  return (
    <>
      <Card
        style={{
          width: 300,
          height: 150,
          margin: 20,
          backgroundColor: "#f44336",
          color: "white",
        }}
      >
        <CardContent>
          <Typography variant="body2" color="white" fontSize={25}>
            High Status Tickets
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {cards.filter(getHighStatus).length}
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          width: 300,
          height: 150,
          margin: 20,
          backgroundColor: "#ffa726",
        }}
      >
        <CardContent>
          <Typography variant="body2" color="textSecondary" fontSize={25}>
            Medium Status Tickets
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {cards.filter(getMediumStatus).length}
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          width: 300,
          height: 150,
          margin: 20,
          backgroundColor: "#00c853",
          color: "#fff",
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="#fff"
            fontWeight="900"
            fontSize={25}
          >
            Low Status Tickets
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {cards.filter(getLowStatus).length}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
