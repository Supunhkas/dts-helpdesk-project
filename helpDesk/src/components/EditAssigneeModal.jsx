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
import { InputLabel } from "@mui/material";
import { toast } from "react-toastify";
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

export default function EditAssigneeModal(props) {
  const { show, close, ticketId, isModalEdit } = props;

  const [isLoaded, setisLoaded] = React.useState(false);
  const handleClose = () => close();
  var now = dayjs();
  var formattedDate = now.format("YYYY/MM/DD");

  const [getSeverties, setGetSeverties] = React.useState([]);
  const [getIncedents, setGetIncedents] = React.useState([]);
  const [getAssets, setGetAssets] = React.useState([]);
  const [getUsers, setGetUsers] = React.useState([]);
  const [getStatuses, setGetStatuses] = React.useState([]);
  const [getActivities, setGetActivities] = React.useState([]);

  const [assignBy, setAssignBy] = React.useState("1");
  const [getSeverty, setGetSeverty] = React.useState("0");
  const [getIncedent, setGetIncedent] = React.useState("0");
  const [getAsset, setGetAsset] = React.useState("0");
  const [getUser, setGetUser] = React.useState("0");
  const [getStatus, setGetStatus] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [getTicket, setGetTicket] = React.useState("");
  const [activity, setActivity] = React.useState("0");
  const [remarks, setRemarks] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (show) {
          const statuses = await axios.get(`${baseURL}/GetHelpDeskStatuses`);
          setGetStatuses(statuses.data);
          const severities = await axios.get(
            `${baseURL}/GetHelpDeskSeverities`
          );
          setGetSeverties(severities.data);
          const incidents = await axios.get(`${baseURL}/GetHelpDeskIncidents`);
          setGetIncedents(incidents.data);
          const assets = await axios.get(`${baseURL}/GetHelpDeskAssets`);
          setGetAssets(assets.data);
          const users = await axios.get(`${baseURL}/GetHelpDeskUsers`);
          setGetUsers(users.data);
          const activities = await axios.get(
            `${baseURL}/GetHelpDeskActivities`
          );
          setGetActivities(activities.data);

          const ticket = await axios.get(
            `${baseURL}GetHelpDesk?id=` + ticketId
          );
          setGetTicket(ticket.data);
          setGetSeverty(ticket.data.severityId);
          setGetIncedent(ticket.data.incidentId);
          setGetAsset(ticket.data.assetId);
          setGetUser(ticket.data.assigneeId);
          setGetStatus(ticket.data.statusId);
          setDescription(ticket.data.description);
          setisLoaded(true);
        }
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
    formParams.append("severityId", getSeverty);
    formParams.append("incidentId", getIncedent);
    formParams.append("description", description);
    formParams.append("ticketId", ticketId);
    formParams.append("assetId", getAsset);
    formParams.append("assigneeId", getUser);
    formParams.append("remarks", remarks);

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
    showToastMessage();
    handleClose();
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
  const handleActivity = (event) => {
    const value = event.target.value;
    setActivity(value);
  };
  const handleRemarksChange = (e) => {
    const value = e.target.value;
    setRemarks(value);
  };
  const showToastMessage = () => {
    toast.success("Update Ticket Successfully. ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1500,
    });
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
          <FormControl
            variant="standard"
            style={{ marginBottom: 15, width: 400, marginTop: 5 }}
          >
            <InputLabel shrink id="statusSelect">
              Status
            </InputLabel>
            <Select
              labelId="statusSelect"
              value={getStatus}
              onChange={handleChange}
              disabled={!isModalEdit}
            >
              {getStatuses.map((item) => (
                <MenuItem value={item.Id} key={item.Id}>
                  {item.Description}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Divider />
          {/* input activites  */}

          {isModalEdit ? (
            <>
              <IconButton color="primary">
                <SupervisorAccountIcon />
              </IconButton>
              <FormControl
                variant="standard"
                style={{ marginBottom: 15, width: 400, marginTop: 5 }}
              >
                <InputLabel shrink id="activitySelect">
                  Activity
                </InputLabel>
                <Select
                  labelId="activitySelect"
                  value={activity}
                  disabled={!isModalEdit}
                  onChange={handleActivity}
                >
                  <MenuItem value="0">-- Select Activity --</MenuItem>
                  {getActivities.length > 0 &&
                    getActivities.map((item) => (
                      <MenuItem key={item.Id} value={item.Id}>
                        {item.Description}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </>
          ) : null}

          <Divider />
          {/* remarks input  */}
          {isModalEdit ? (
            <>
              <IconButton color="primary">
                <PersonIcon />
              </IconButton>
              <TextField
                id="outlined-basic"
                label="Remarks"
                variant="standard"
                value={remarks}
                disabled={!isModalEdit}
                onChange={handleRemarksChange}
                style={{ marginBottom: 5, marginTop: 5, width: 400 }}
              />
            </>
          ) : null}

          <Divider />

          {/* assign by input  */}

          <IconButton color="primary">
            <PersonIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Assign By"
            value={assignBy}
            onChange={(e) => setAssignBy(e.target.value)}
            disabled
            variant="standard"
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />
          {/* assign to input  */}

          <IconButton color="primary">
            <SupervisorAccountIcon />
          </IconButton>

          <FormControl
            variant="standard"
            style={{ marginBottom: 15, width: 400, marginTop: 5 }}
          >
            <InputLabel shrink id="assigneSelect">
              Severity
            </InputLabel>
            <Select
              labelId="assigneSelect"
              value={getUser}
              disabled
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
          <FormControl
            variant="standard"
            style={{ marginBottom: 15, width: 400, marginTop: 5 }}
          >
            <InputLabel shrink id="assetIdSelect">
              Asset Id
            </InputLabel>
            <Select
              labelId="assetIdSelect"
              value={getAsset}
              disabled
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

          {/* input description  */}

          <IconButton color="primary">
            <CorporateFareIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="standard"
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />

          {/* edit severity   */}

          <IconButton color="primary">
            <PriorityHighIcon />
          </IconButton>
          <FormControl
            variant="standard"
            style={{ marginBottom: 15, width: 400, marginTop: 5 }}
          >
            <InputLabel shrink id="selcetSeverity">
              Severity
            </InputLabel>
            <Select
              labelId="selcetSeverity"
              value={getSeverty}
              variant="standard"
              disabled
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
          <FormControl
            variant="standard"
            style={{ marginBottom: 5, width: 400, marginTop: 5 }}
          >
            <InputLabel shrink id="incedentSelect">
              Incident
            </InputLabel>
            <Select
              value={getIncedent}
              labelId="incedentSelect"
              onChange={handeIncedent}
              disabled
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
            Close
          </Button>
          {isModalEdit ? (
            <Button variant="contained" color="success" onClick={handleUpdate}>
              Update
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
