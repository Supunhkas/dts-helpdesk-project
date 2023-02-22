import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

import Title from "./Title";
import { cards } from "../data/data";
function preventDefault(event) {
  event.preventDefault();
}

export default function Cards() {
  return (
    <React.Fragment>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        style={{ marginBottom: 5 }}
      >
        <Title>All Tickets</Title>
        <IconButton aria-label="ticket" color="primary">
          <ConfirmationNumberIcon />
        </IconButton>
      </Stack>

      <Typography component="p" variant="h4">
        {cards.length}
      </Typography>

      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View more details
        </Link>
      </div>
    </React.Fragment>
  );
}
