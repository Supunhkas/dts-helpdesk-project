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
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import PendingIcon from "@mui/icons-material/Pending";
import { Stack } from "@mui/system";
import { baseURL } from "../App";
import dayjs from "dayjs";
import axios from "axios";

export default function AddModal({ show, close }) {
  const handleClose = () => close();
  const [status, setStatus] = React.useState("10");
  const [assignBy, setAssignBy] = React.useState("1");
  const [assignTo, setAssignTo] = React.useState("0");
  const [companyId, setCompanyId] = React.useState("1");
  const [assetId, setAssetId] = React.useState("0");
  const [description, setDescription] = React.useState("");
  const [severity, setSeverity] = React.useState("0");
  const [incedent, setIncedent] = React.useState("0");

  const [getStatus, setGetStatus] = React.useState([]);
  const [getSeverties, setGetSeverties] = React.useState([]);
  const [getIncedents, setGetIncedents] = React.useState([]);
  const [getAssets, setGetAssets] = React.useState([]);
  const [getUsers, setGetUsers] = React.useState([]);
  var now = dayjs();
  var formattedDate = now.format("YYYY/MM/DD");

  const submitDetails = (e) => {
    e.preventDefault();

    const formParams = new URLSearchParams();
    formParams.append("statusId", 4);
    formParams.append("createdDate", formattedDate);
    formParams.append("severityId", severity);
    formParams.append("incidentId", incedent);
    formParams.append("companyId", companyId);
    formParams.append("assigneeId", assignTo);
    formParams.append("assignedBy", assignBy);
    formParams.append("description", description);
    formParams.append("assetId", assetId);

    axios
      .post(`${baseURL}PostNewHelp`, formParams.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(formParams.toString());
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const statuses = await axios.get(`${baseURL}/GetHelpDeskStatuses`);
        setGetStatus(statuses.data);
        const severities = await axios.get(`${baseURL}/GetHelpDeskSeverities`);
        setGetSeverties(severities.data);
        const incidents = await axios.get(`${baseURL}/GetHelpDeskIncidents`);
        setGetIncedents(incidents.data);
        const assets = await axios.get(`${baseURL}/GetHelpDeskAssets`);
        setGetAssets(assets.data);
        const users = await axios.get(`${baseURL}/GetHelpDeskUsers`);
        setGetUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (show) {
      fetchData();
    }
  }, [show]);

  const handeIncedent = (event) => {
    const value = event.target.value;
    setIncedent(value);
  };
  const handeSeverity = (event) => {
    const value = event.target.value;
    setSeverity(value);
  };
  const handleAssetId = (event) => {
    const value = event.target.value;
    setAssetId(value);
  };
  const handleAssignee = (event) => {
    const value = event.target.value;
    setAssignTo(value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
      <Dialog open={show} onClose={handleClose}>
        <Stack
          display={"flex"}
          flexDirection="row"
          justifyContent={"space-between"}
        >
          <DialogTitle fontWeight={"bold"}>Create New Ticket</DialogTitle>
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
          {/* status input  */}
          <IconButton color="primary">
            <PendingIcon />
          </IconButton>
          <Select
            id="statusSelect"
            value={status}
            variant="standard"
            placeholder="status"
            label="Status"
            disabled
            displayEmpty
            style={{ marginBottom: 5, width: 400, marginTop: 5 }}
          >
            <MenuItem value="">Select status</MenuItem>
            <MenuItem value={10}>New</MenuItem>
          </Select>
          <Divider />
          {/* assign By input  */}
          <IconButton color="primary">
            <PersonIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Assign By"
            value={assignBy}
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
              value={assignTo}
              variant="standard"
              placeholder="Assign To"
              label="Assign To"
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
              value={assetId}
              variant="standard"
              placeholder="Asset ID"
              label="Asset ID"
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            variant="standard"
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />

          <IconButton color="primary">
            <LocationCityIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Company Id"
            disabled
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value)}
            variant="standard"
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />

          <Divider />
          {/* severity select input  */}
          <IconButton color="primary">
            <PriorityHighIcon />
          </IconButton>

          <FormControl>
            <Select
              id="severitySelect"
              value={severity}
              variant="standard"
              placeholder="Severity"
              label="Severity"
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
              value={incedent}
              variant="standard"
              placeholder="Incident"
              label="Incident"
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
          <Button variant="contained" color="success" onClick={submitDetails}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
