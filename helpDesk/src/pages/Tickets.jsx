import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteIcon from "@mui/icons-material/Delete";

import { Chip } from "@mui/material";
import Title from "./Title";
import { cards } from "../data/data";
import "./tickets.css";

function preventDefault(event) {
  event.preventDefault();
}

export default function Tickets() {
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
        >
          Add new Ticket
        </Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Ticket No</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Assign By</TableCell>
            <TableCell>Assign To</TableCell>
            <TableCell>Asset Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.tNo}>
              <TableCell>{card.tNo}</TableCell>

              <TableCell>
                <Chip
                  label={card.status}
                  className="chip"
                  style={{ width: 75 }}
                  color={
                    card.status === "high"
                      ? "error"
                      : card.status === "medium"
                      ? "warning"
                      : "success"
                  }
                />
              </TableCell>
              <TableCell>{card.location}</TableCell>
              <TableCell>{card.assignBy}</TableCell>
              <TableCell>{card.assignTo}</TableCell>
              <TableCell>{card.assetName}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={2}>
                  <IconButton color="success">
                    <EditSharpIcon />
                  </IconButton>
                  <IconButton color="error">
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more
      </Link>
    </React.Fragment>
  );
}
