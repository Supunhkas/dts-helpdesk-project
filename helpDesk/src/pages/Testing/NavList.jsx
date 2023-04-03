import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function LogoutButton() {
  const navigate = useNavigate();
  return (
    <ListItemButton onClick={() => (localStorage.clear(), navigate("/"))}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  );
}

export default function NavItems() {
  const [components, setComponents] = React.useState([]);
  const [subcomponents, setSubComponents] = React.useState([]);
  const token = localStorage.getItem("token");
  const [openStates, setOpenStates] = React.useState([]);

  function loadSub(code, index) {
    setOpenStates((prevStates) =>
      prevStates.map((state, i) => (i === index ? !state : state))
    );
    axios
      .get(
        `http://192.168.168.174/Access/GetAccessSubComponent?headCompId=${code}&authkey=${token}`
      )
      .then((res) => {
        setSubComponents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    axios
      .get("http://192.168.168.174/Access/GetAccessHeadComponent")
      .then((res) => {
        setComponents(res.data);
        setOpenStates(res.data.map(() => false)); // initialize all states to false
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          {components &&
            components.map((component, index) => (
              <React.Fragment key={component.code}>
                <ListItemButton
                  onClick={() => loadSub(component.code, index)}
                  sx={{ height: "60px" }}
                >
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText primary={component.description} />
                  {openStates[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                  {subcomponents &&
                    subcomponents.map((item) => (
                      <ListItemButton key={item.code}>
                        <ListItemText primary={item.description} />
                      </ListItemButton>
                    ))}
                </Collapse>
              </React.Fragment>
            ))}
        </div>
        <div style={{ marginBottom: "15%" }}>
          <LogoutButton />
        </div>
      </div>
    </React.Fragment>
  );
}
