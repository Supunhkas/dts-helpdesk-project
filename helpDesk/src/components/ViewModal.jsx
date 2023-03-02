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

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SmsFailedIcon from "@mui/icons-material/SmsFailed";
import PendingIcon from "@mui/icons-material/Pending";
import { Stack } from "@mui/system";

export default function AddModal({ show, close }) {
  const handleClose = () => close();

  // date function

  return (
    <div>
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
            <IconButton color="primary">
              <PendingIcon />
            </IconButton>
            <Select
              id="statusSelect"
              variant="standard"
              label="Status"
              disabled
              style={{ marginBottom: 5, width: 400, marginTop: 5 }}
            >
              <MenuItem>New</MenuItem>
            </Select>
            <Divider />
            <IconButton color="primary">
              <PersonIcon />
            </IconButton>
            <TextField
              id="outlined-basic"
              label="Assign By"
              variant="standard"
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
              disabled
              style={{ marginBottom: 5, marginTop: 5, width: 400 }}
            />
            <Divider />
            <IconButton color="primary">
              <CalendarMonthIcon />
            </IconButton>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Created Date "
                inputFormat="DD/MM/YYYY"
                disabled
                renderInput={(params) => (
                  <TextField
                    {...params}
                    style={{ marginBottom: 5, marginTop: 5, width: 400 }}
                  />
                )}
              />
            </LocalizationProvider>
            <Divider />
            <IconButton color="primary">
              <CorporateFareIcon />
            </IconButton>
            <TextField
              id="outlined-basic"
              label="Asset Id"
              variant="standard"
              disabled
              style={{ marginBottom: 5, marginTop: 5, width: 400 }}
            />
            <Divider />
            <IconButton color="primary">
              <CorporateFareIcon />
            </IconButton>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="standard"
              disabled
              style={{ marginBottom: 5, marginTop: 5, width: 400 }}
            />
            <Divider />
            <IconButton color="primary">
              <LocationCityIcon />
            </IconButton>
            <TextField
              id="outlined-basic"
              label="Company Id"
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
              disabled
              style={{ marginBottom: 5, marginTop: 5, width: 400 }}
            />
            <Divider />
          </DialogContent>
          <DialogActions style={{ marginBottom: 10 }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </FormControl>
    </div>
  );
}

{
}
