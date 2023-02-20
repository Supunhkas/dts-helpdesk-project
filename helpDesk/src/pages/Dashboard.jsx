import React from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
//////////////////////////////
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
//////////////////////////////////
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
//////////////////////////////////

import { cards } from "../data/data";
import Navbar from "../constants/Navbar";

////////////////////////////////////////
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//////////////////////////////////////////////

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginTop: 30, marginLeft: 10 }}>Status of servers</h3>
          <Button
            variant="contained"
            style={{ marginRight: 10, marginTop: 30 }}
          >
            Add New Ticket
          </Button>
        </div>
        {/* card section  */}
        <Paper
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 2,
            margin: 5,
          }}
        >
          {cards.map((card) => (
            <Card
              key={card.tNo}
              style={{
                width: 300,
                height: 150,
                margin: 20,
                backgroundColor: "#ff3",
              }}
            >
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {card.tNo}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {card.location}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Paper>
        {/* end of card section  */}

        <Paper sx={{ margin: 5, marginTop: 10 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Assign Ticket" {...a11yProps(0)} />
              <Tab label="Assignee Ticket" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ticket </TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Location</TableCell>
                  <TableCell align="right">Assign By</TableCell>
                  <TableCell align="right">Assign To</TableCell>
                  <TableCell align="right">Asset Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((card) => (
                  <TableRow
                    key={card.tNo}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {card.tNo}
                    </TableCell>
                    <TableCell align="right">{card.status}</TableCell>
                    <TableCell align="right">{card.location}</TableCell>
                    <TableCell align="right">{card.assignBy}</TableCell>
                    <TableCell align="right">{card.assignTo}</TableCell>
                    <TableCell align="right">{card.assetName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Assignee Ticket
          </TabPanel>
        </Paper>
      </div>
    </>
  );
};

export default Dashboard;
