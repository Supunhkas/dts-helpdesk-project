import * as React from "react";
import SubComponent1 from "./subComponents/SubComponent1";
import SubComponent2 from "./subComponents/SubComponent2";
import SubComponent3 from "./subComponents/SubComponent3";
import SubComponent4 from "./subComponents/SubComponent4";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../constants/Navbar";

function Componentloader() {
  const [subcomponents, setSubComponents] = React.useState([]);
  const token = localStorage.getItem("token");
  const code = localStorage.getItem("code");

  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(
        `http://192.168.46.174/Access/GetAccessSubComponent?headCompId=${code}&authkey=${token}`
      )
      .then((res) => {
        setSubComponents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <React.Fragment>
        {subcomponents.map((subcomponent) => {
          switch (subcomponent.code) {
            case "1.1":
              return <SubComponent1 key={subcomponent.id} />;
            case "1.2":
              return <SubComponent2 key={subcomponent.id} />;
            case "1.3":
              return <SubComponent3 key={subcomponent.id} />;
            case "1.4":
              return <SubComponent4 key={subcomponent.id} />;
            default:
              return null;
          }
        })}
      </React.Fragment>
    </React.Fragment>
  );
}

export default Componentloader;
