import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import "../pages/tickets.css";
import { baseURL } from "../App";
import { Chip, Divider, Stack } from "@mui/material";

const rowsPerPageOptions = [5, 10, 25];
const Ticketlog = ({ show, close, ticketId }) => {
  const [ticketLog, setTicketLog] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

  const handleClose = () => close();

  React.useEffect(() => {
    if (show) {
      getlogs();
    }

    function getlogs() {
      axios
        .get(`${baseURL}/GetDetailsLog?id=${ticketId}`)
        .header({ "X-My-Secret-Token": "jjjjj" })
        .then((res) => {
          setTicketLog(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [ticketId]);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ticketLog.length) : 0;
  return (
    <div>
      <Dialog open={show} onClose={handleClose} maxWidth={false}>
        <Stack
          display={"flex"}
          flexDirection="row"
          justifyContent={"space-between"}
        >
          <DialogTitle fontWeight={"bold"}> Ticket Logs</DialogTitle>
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
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ticket ID</TableCell>
                <TableCell>Status</TableCell>
                {/* <TableCell>User</TableCell> */}
                <TableCell>Activity</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? ticketLog.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : ticketLog
              ).map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.ticketId}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.statusId}
                      className="chip"
                      style={{ width: 90 }}
                      color={
                        item.statusId === "Complete"
                          ? "success"
                          : item.statusId === "Pending"
                          ? "warning"
                          : "primary"
                      }
                    />
                  </TableCell>
                  {/* <TableCell>{item.userId}</TableCell> */}
                  <TableCell>{item.activityId}</TableCell>
                  <TableCell>{item.remarks}</TableCell>
                  <TableCell>{item.dateTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={ticketLog ? ticketLog.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Ticketlog;
