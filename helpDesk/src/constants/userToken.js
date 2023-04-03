// import { useState } from "react";

// export default function useToken() {
//   const getToken = () => {
//     const userToken = localStorage.getItem("token");
//     // const userToken = JSON.parse(tokenString);

//     if (typeof userToken === "undefined") {
//       return false;
//     } else {
//       return userToken;
//     }
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = (userToken) => {
//     localStorage.setItem("token", JSON.stringify(userToken));
//     setToken(userToken.token);
//   };

//   return {
//     setToken: saveToken,
//     token,
//   };
// }
