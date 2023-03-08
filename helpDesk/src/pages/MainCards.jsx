import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function MainCards() {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    axios
      .get("http://192.168.87.174/HelpDesk/GetDetailedHelpDeskDetails")
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  function getNewStatus(card) {
    return card.status === "New";
  }
  function getPendingStatus(card) {
    return card.status === "Pending";
  }
  function getCompleteStatus(card) {
    return card.status === "Complete";
  }
  function getAllStatus(card) {
    return card.status;
  }
  return (
    <>
      <Card
        style={{
          width: 300,
          height: 150,
          margin: 20,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        <CardContent>
          <Typography variant="body2" color="white" fontSize={25}>
            New Tickets
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {cards.filter(getNewStatus).length}
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
            Pending Tickets
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {cards.filter(getPendingStatus).length}
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
          <Typography variant="body2" color="#fff" fontSize={25}>
            Complete Tickets
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {cards.filter(getCompleteStatus).length}
          </Typography>
        </CardContent>
      </Card>
      <Card
        style={{
          width: 300,
          height: 150,
          margin: 20,
          backgroundColor: "purple",
          color: "#fff",
        }}
      >
        <CardContent>
          <Typography variant="body2" color="#fff" fontSize={25}>
            All Tickets
          </Typography>

          <Typography gutterBottom variant="h5" component="h2">
            {cards.filter(getAllStatus).length}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
