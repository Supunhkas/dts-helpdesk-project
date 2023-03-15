import * as React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";

import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import PendingIcon from "@mui/icons-material/Pending";
import { baseURL } from "../App";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import axios from "axios";

export default function EditAssignByTicket({
  show,
  close,
  ticketId,
  isModalEdit,
}) {
  const [isLoaded, setisLoaded] = React.useState(false);
  const handleClose = () => close();
  var now = dayjs();
  var formattedDate = now.format("YYYY/MM/DD");

  const [getSeverties, setGetSeverties] = React.useState([]);
  const [getIncedents, setGetIncedents] = React.useState([]);
  const [getAssets, setGetAssets] = React.useState([]);
  const [getUsers, setGetUsers] = React.useState([]);
  const [getStatuses, setGetStatuses] = React.useState([]);

  const [assignBy, setAssignBy] = React.useState("1");
  const [getSeverty, setGetSeverty] = React.useState("0");
  const [getIncedent, setGetIncedent] = React.useState("0");
  const [getAsset, setGetAsset] = React.useState("0");
  const [getUser, setGetUser] = React.useState("0");
  const [getStatus, setGetStatus] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [getTicket, setGetTicket] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const statuses = await axios.get(`${baseURL}/GetHelpDeskStatuses`);
        setGetStatuses(statuses.data);
        const severities = await axios.get(`${baseURL}/GetHelpDeskSeverities`);
        setGetSeverties(severities.data);
        const incidents = await axios.get(`${baseURL}/GetHelpDeskIncidents`);
        setGetIncedents(incidents.data);
        const assets = await axios.get(`${baseURL}/GetHelpDeskAssets`);
        setGetAssets(assets.data);
        const users = await axios.get(`${baseURL}/GetHelpDeskUsers`);
        setGetUsers(users.data);

        const ticket = await axios.get(`${baseURL}GetHelpDesk?id=` + ticketId);
        setGetTicket(ticket.data);
        setGetSeverty(ticket.data.severityId);
        setGetIncedent(ticket.data.incidentId);
        setGetAsset(ticket.data.assetId);
        setGetUser(ticket.data.assigneeId);
        setGetStatus(ticket.data.statusId);
        setDescription(ticket.data.description);
        setisLoaded(true);
        console.log(ticket.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ticketId]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const formParams = new URLSearchParams();
    formParams.append("statusId", getStatus);
    formParams.append("ticketId", ticketId);
    formParams.append("assigneeId", getUser);
    formParams.append("severityId", getSeverty);
    formParams.append("incidentId", getIncedent);
    formParams.append("description", description);
    formParams.append("assetId", getAsset);

    axios
      .post(`${baseURL}/UpdateHelp`, formParams.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log("response", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setGetStatus(value);
  };

  const handeIncedent = (event) => {
    const value = event.target.value;
    setGetIncedent(value);
  };
  const handeSeverity = (event) => {
    const value = event.target.value;
    setGetSeverty(value);
  };
  const handleAssetId = (event) => {
    const value = event.target.value;
    setGetAsset(value);
  };
  const handleAssignee = (event) => {
    const value = event.target.value;
    setGetUser(value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
      <Dialog open={show} onClose={handleClose}>
        <Stack
          display={"flex"}
          flexDirection="row"
          justifyContent={"space-between"}
        >
          <DialogTitle fontWeight={"bold"}> Ticket</DialogTitle>
          <DialogTitle
            color={"red"}
            fontWeight={"bold"}
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          >
            X
          </DialogTitle>
        </Stack>
        <Divider />

        <DialogContent>
          <IconButton color="primary">
            <PendingIcon />
          </IconButton>
          <Select
            id="statusSelect"
            value={getStatus}
            variant="standard"
            placeholder="status"
            onChange={handleChange}
            label="Status"
            disabled={!isModalEdit}
            style={{ marginBottom: 5, width: 400, marginTop: 5 }}
          >
            {getStatuses.map((item) => (
              <MenuItem value={item.Id} key={item.Id}>
                {item.Description}
              </MenuItem>
            ))}
          </Select>
          <Divider />

          {/* assign by input  */}
          <IconButton color="primary">
            <PersonIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Assign By"
            value={assignBy}
            disabled
            onChange={(e) => setAssignBy(e.target.value)}
            variant="standard"
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />
          {/* assign to input  */}
          <IconButton color="primary">
            <SupervisorAccountIcon />
          </IconButton>
          <FormControl>
            <Select
              id="assigneSelect"
              value={getUser}
              variant="standard"
              placeholder="Assign To"
              label="Assign To"
              disabled={!isModalEdit}
              style={{ marginBottom: 5, width: 400, marginTop: 5 }}
              onChange={handleAssignee}
            >
              <MenuItem value="0">-- Select User --</MenuItem>
              {getUsers.length > 0 &&
                getUsers.map((item) => (
                  <MenuItem key={item.User_id} value={item.User_id}>
                    {item.user_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <Divider />
          {/* create date input  */}
          <IconButton color="primary">
            <CalendarMonthIcon />
          </IconButton>
          <TextField
            value={formattedDate}
            label="Cretaed Date"
            placeholder="Created Date"
            disabled
            style={{ marginBottom: 5, width: 400, marginTop: 5 }}
          />
          <Divider />
          {/* set asset itd input field  */}
          <IconButton color="primary">
            <CorporateFareIcon />
          </IconButton>
          <FormControl>
            <Select
              id="assetIdSelect"
              value={getAsset}
              variant="standard"
              placeholder="Asset ID"
              label="Asset ID"
              disabled={!isModalEdit}
              style={{ marginBottom: 5, width: 400, marginTop: 5 }}
              onChange={handleAssetId}
            >
              <MenuItem value="0">-- Select handleAssetId --</MenuItem>
              {getAssets.length > 0 &&
                getAssets.map((item) => (
                  <MenuItem key={item.asset_id} value={item.asset_id}>
                    {item.asset_name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Divider />
          <IconButton color="primary">
            <CorporateFareIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Description"
            disabled={!isModalEdit}
            onChange={(e) => setDescription(e.target.value)}
            variant="standard"
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />

          <IconButton color="primary">
            <PriorityHighIcon />
          </IconButton>
          <FormControl>
            <Select
              id="severitySelect"
              value={getSeverty}
              variant="standard"
              placeholder="Severity"
              label="Severity"
              disabled={!isModalEdit}
              style={{ marginBottom: 5, width: 400, marginTop: 5 }}
              onChange={handeSeverity}
            >
              <MenuItem value="0">-- Select getSeverties --</MenuItem>
              {getSeverties.length > 0 &&
                getSeverties.map((item) => (
                  <MenuItem key={item.Id} value={item.Id}>
                    {item.Description}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Divider />
          {/* incedent selet input  */}
          <IconButton color="primary">
            <SmsFailedIcon />
          </IconButton>
          <FormControl>
            <Select
              id="incedentSelect"
              value={getIncedent}
              variant="standard"
              placeholder="Incident"
              label="Incident"
              disabled={!isModalEdit}
              style={{ marginBottom: 5, width: 400, marginTop: 5 }}
              onChange={handeIncedent}
            >
              <MenuItem value="0">-- Select an incident --</MenuItem>
              {getIncedents.length > 0 &&
                getIncedents.map((item) => (
                  <MenuItem key={item.Id} value={item.Id}>
                    {item.Description}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Divider />
        </DialogContent>

        <DialogActions style={{ marginBottom: 10 }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
