import * as React from "react";
import SubComponent1 from "./subComponents/SubComponent1";
import SubComponent2 from "./subComponents/SubComponent2";
import SubComponent3 from "./subComponents/SubComponent3";
import SubComponent4 from "./subComponents/SubComponent4";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { InputLabel } from "@mui/material";

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
        const componentsArray = res.data.map((subcomponent) => {
          const ComponentToRender = subcomponent.code;
          const PascalCaseComponent = eval(ComponentToRender);
          return <PascalCaseComponent key={subcomponent.id} />;
        });

        setSubComponents(componentsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code]);

  return (
    <React.Fragment>
      {subcomponents.length > 0 ? (
        subcomponents
      ) : (
        <InputLabel>Loading subcomponents...</InputLabel>
      )}
    </React.Fragment>
  );
}

export default Componentloader;
