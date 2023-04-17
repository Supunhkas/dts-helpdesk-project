import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CardImg from "../assets/helpDesk.png";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import axios from "axios";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const [userName, setuserName] = React.useState("");
  const [password, setpassword] = React.useState("");

  function onSubmit() {
    var loginKey = Encryption(userName + "`" + password);
    const url =
      "http://192.168.46.174/Authenticate/authenticate?authkey=" + loginKey;
    axios
      .post(url)
      .then((result) => {
        if (result.data.statusCode == "True") {
          localStorage.setItem("token", loginKey);

          navigate("Home");
          showSuccesToast();
        } else {
          showToastMessage();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function Encryption(number) {
    var key = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APIKEY);
    var iv = CryptoJS.enc.Utf8.parse(import.meta.env.VITE_APIKEY);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(number), key, {
      keySize: 64 / 4,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  }
  const handleUsername = (e) => {
    setuserName(e.target.value);
  };

  const handlePassword = (e) => {
    setpassword(e.target.value);
  };
  const showToastMessage = () => {
    toast.error("Pleace Check Details ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };
  const showSuccesToast = () => {
    toast.success("Login Success ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  return (
    <>
      <div style={styles.container}>
        <Paper
          sx={{
            backgroundImage: `url(${CardImg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 5,
            width: "50vw",
            overflow: "hidden",
            "@media (max-width: 768px)": {
              backgroundImage: "none",
            },
          }}
          style={{ zIndex: 100 }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={5}
              elevation={6}
              sx={{
                "@media (max-width: 768px)": {
                  width: "100%",
                },
              }}
            >
              <Box sx={{ height: "100%" }}>
                <Typography variant="h3" gutterBottom sx={{ mx: 4 }}>
                  Welcome Back
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ mx: 4 }}>
                  Fill details to sign in
                </Typography>
                <Box
                  sx={{
                    my: 8,
                    mx: { xs: 2, sm: 4 },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="userName"
                      label="UserName"
                      name="userName"
                      onChange={handleUsername}
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={handlePassword}
                    />

                    <LoadingButton
                      onClick={onSubmit}
                      fullWidth
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: 40,
                      }}
                      loading={loading}
                      variant="contained"
                    >
                      <span>Sign In</span>
                    </LoadingButton>
                  </Box>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </>
  );
};

export default Login;
