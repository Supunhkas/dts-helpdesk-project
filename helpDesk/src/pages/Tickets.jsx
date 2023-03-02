import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import axios from "axios";

import { Chip } from "@mui/material";
import Title from "./Title";
import "./tickets.css";
import AddModal from "../components/AddModal";
import ViewModal from "../components/ViewModal";
import EditModal from "../components/EditModal";

function preventDefault(event) {
  event.preventDefault();
}
const rowsPerPageOptions = [5, 10, 25];

export default function Tickets() {
  const [ticketData, setTicketData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const [open, setOpen] = React.useState(false);
  const [openVIew, setOpenView] = React.useState(false);
  const [editVIew, setEditView] = React.useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ticketData.length) : 0;

  const deleteRow = (ticketId) => {
    const confirmMessage = window.confirm("Are youu sure?");
    console.log(ticketId);
    if (confirmMessage) {
      axios
        .post(`http://192.168.176.174/HelpDesk/DeleteHelp?Id=${ticketId}`)
        .then(() => {
          alert("Delete Successfully");
          getDate();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    axios
      .get("http://192.168.176.174/HelpDesk/GetDetailedHelpDeskDetails")
      .then((res) => {
        setTicketData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////Get from Api

  return (
    <React.Fragment>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        style={{ marginBottom: 5 }}
      >
        <Title>Recent Tickets</Title>
        <Button
          variant="contained"
          style={{ backgroundColor: "#00c853" }}
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add new Ticket
        </Button>
      </Stack>
      <AddModal show={open} close={() => setOpen(false)} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ticket ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Assign By</TableCell>
            <TableCell>Assign To</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Company ID</TableCell>
            {/* <TableCell>Description</TableCell> */}
            <TableCell>Asset ID</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Incident</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? ticketData.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : ticketData
          ).map((item, i) => (
            <TableRow key={item.ticketId}>
              <TableCell>{item.ticketId}</TableCell>

              <TableCell>
                <Chip
                  label={item.status}
                  className="chip"
                  color={
                    item.status === "Complete"
                      ? "success"
                      : item.status === "Pending"
                      ? "warning"
                      : "primary"
                  }
                />
              </TableCell>
              <TableCell>{item.assignedBy}</TableCell>
              <TableCell>{item.assignee}</TableCell>
              <TableCell>{item.createdDate}</TableCell>
              <TableCell>{item.companyId}</TableCell>
              {/* <TableCell>{item.description}</TableCell> */}
              <TableCell>{item.assetId}</TableCell>
              <TableCell>{item.severity}</TableCell>
              <TableCell>{item.incident}</TableCell>
              <TableCell>
                <Stack direction="row">
                  <IconButton color="primary" onClick={() => setOpenView(true)}>
                    <RemoveRedEyeIcon />
                  </IconButton>

                  <IconButton color="success" onClick={() => setEditView(true)}>
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => deleteRow(item.ticketId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={ticketData ? ticketData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ViewModal show={openVIew} close={() => setOpenView(false)} />
      <EditModal show={editVIew} close={() => setEditView(false)} />
    </React.Fragment>
  );
}

{
  /* <IconButton color="error" onClick={() => deleteRow(item.ticketId)}>
  <DeleteIcon />
</IconButton>; */
}
