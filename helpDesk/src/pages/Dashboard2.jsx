import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tickets from "./Tickets";
import MainCards from "./MainCards";
import AsigneeTicket from "../components/AsigneeTicket";
import AssignByTicket from "../components/AssignByTicket";
import CustomAppBar from "../constants/CustomAppBar";
import CustomDrawer from "../constants/CustomDrawer";
import { Outlet, useOutlet } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        DTS
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// tab panel function
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const outlet = useOutlet();

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <CustomAppBar open={open} toggleDrawer={toggleDrawer} />
        <CustomDrawer open={open} toggleDrawer={toggleDrawer} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {outlet ? (
              <Outlet />
            ) : (
              <>
                <Grid container spacing={3}>
                  {/* Main cards */}
                  <Grid item xs={12} md={12} lg={12}>
                    <Paper
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "row",
                        height: 240,
                        backgroundColor: "transparent",
                      }}
                    >
                      <MainCards />
                    </Paper>
                  </Grid>

                  <Grid item xs={12}>
                    <Paper
                      sx={{ p: 2, display: "flex", flexDirection: "column" }}
                    >
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="All Tickets" {...a11yProps(0)} />
                        <Tab label="Assignee Tickets" {...a11yProps(1)} />
                        <Tab label="Assign By Tickets" {...a11yProps(2)} />
                      </Tabs>

                      <TabPanel value={value} index={0}>
                        <Tickets />
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        <AsigneeTicket />
                      </TabPanel>
                      <TabPanel value={value} index={2}>
                        <AssignByTicket />
                      </TabPanel>
                    </Paper>
                  </Grid>
                </Grid>
                <Copyright sx={{ pt: 4 }} />
              </>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard2() {
  return <DashboardContent />;
}
