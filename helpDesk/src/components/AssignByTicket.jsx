import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Chip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ViewUserModal from "./ViewUserModal";
import axios from "axios";
import EditAssignByTicket from "./EditAssignByTicket";
import { baseURL } from "../App";

const rowsPerPageOptions = [5, 10, 25];
const AssignByTicket = () => {
  const [ticketData, setTicketData] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isModalEdit, setIsModalEdit] = React.useState(true);
  const [ticketId, setTicketId] = React.useState("");

  var User_id = 2;

  const [editRowData, setEditRowData] = React.useState("");

  const [selectedRowData, setSelectedRowData] = React.useState(null);
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
        .post(`${baseURL}/DeleteHelp?Id=${ticketId}`)
        .then(() => {
          alert("Delete Successfully");
          getData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${baseURL}/GetAssignedTickets?id=${User_id}`)
      .then((res) => {
        setTicketData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function viewData(rowData) {
    setSelectedRowData(rowData);
  }
  function opendViewEdit(viewModel, ticketId) {
    if (viewModel == "edit") {
      setIsModalEdit(true);
    } else {
      setIsModalEdit(false);
    }
    setIsOpenModal(true);
    setTicketId(ticketId);
  }
  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ticket ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Description</TableCell>
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
                  style={{ width: 80 }}
                  color={
                    item.status === "Complete"
                      ? "success"
                      : item.status === "Pending"
                      ? "warning"
                      : "primary"
                  }
                />
              </TableCell>
              <TableCell>{item.createdDate}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.assetId}</TableCell>
              <TableCell>{item.severity}</TableCell>
              <TableCell>{item.incident}</TableCell>
              <TableCell>
                <Stack direction="row">
                  <IconButton
                    color="primary"
                    onClick={() => opendViewEdit("view", item.ticketId)}
                  >
                    <RemoveRedEyeIcon />
                  </IconButton>

                  <IconButton
                    color="success"
                    onClick={() => opendViewEdit("edit", item.ticketId)}
                  >
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

      <EditAssignByTicket
        show={isOpenModal}
        close={() => setIsOpenModal(false)}
        isModalEdit={isModalEdit}
        ticketId={ticketId}
      />
      {selectedRowData && (
        <ViewUserModal
          show={true}
          rowData={selectedRowData}
          close={() => setSelectedRowData(null)}
        />
      )}
    </React.Fragment>
  );
};

export default AssignByTicket;
