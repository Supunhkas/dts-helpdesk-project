import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

function SubComponent1() {
  return (
    <>
      <div>SubComponent1</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>gsg</TableCell>
              <TableCell>gsg</TableCell>
              <TableCell>IDsgs</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default SubComponent1;
