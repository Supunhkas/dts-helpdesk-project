import * as React from "react";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import PendingIcon from "@mui/icons-material/Pending";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Stack } from "@mui/system";

export default function AddModal({ show, close, rowData }) {
  const handleClose = () => close();

  // date function

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
          <IconButton aria-label="ticket" color="primary">
            <ConfirmationNumberIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Ticket ID"
            variant="standard"
            value={rowData ? rowData.ticketId : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
            InputProps={{
              classes: {
                disabled: "Mui-disabled",
                input: "Mui-disabled-text",
              },
              disableUnderline: true,
              style: {
                fontWeight: "bold",
              },
            }}
          />
          <Divider />
          <IconButton color="primary">
            <PendingIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Status"
            variant="standard"
            value={rowData ? rowData.status : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
            InputProps={{
              classes: {
                disabled: "Mui-disabled",
                input: "Mui-disabled-text",
              },
              disableUnderline: true,
              style: {
                fontWeight: "bold",
              },
            }}
          />

          <Divider />
          <IconButton color="primary">
            <PersonIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Assign By"
            variant="standard"
            value={rowData ? rowData.assignedBy : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />
          <IconButton color="primary">
            <SupervisorAccountIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Assign To"
            variant="standard"
            value={rowData ? rowData.assignee : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />
          <IconButton color="primary">
            <CalendarMonthIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Created Date"
            variant="standard"
            value={rowData ? rowData.createdDate : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />
          <IconButton color="primary">
            <CorporateFareIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Asset Id"
            variant="standard"
            value={rowData ? rowData.assetId : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
            InputProps={{
              classes: {
                disabled: "Mui-disabled",
                input: "Mui-disabled-text",
              },
              disableUnderline: true,
              style: {
                fontWeight: "bold",
              },
            }}
          />
          <Divider />
          <IconButton color="primary">
            <CorporateFareIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Description"
            value={rowData ? rowData.description : ""}
            variant="standard"
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />

          <IconButton color="primary">
            <PriorityHighIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Severity"
            variant="standard"
            value={rowData ? rowData.severity : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />
          <Divider />
          <IconButton color="primary">
            <SmsFailedIcon />
          </IconButton>
          <TextField
            id="outlined-basic"
            label="Incedent"
            variant="standard"
            value={rowData ? rowData.incident : ""}
            disabled
            style={{ marginBottom: 5, marginTop: 5, width: 400 }}
          />

          <Divider />
        </DialogContent>
        <DialogActions style={{ marginBottom: 10 }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  );
}
