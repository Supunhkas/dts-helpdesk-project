import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Paper, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import CardImg from "../assets/helpDesk.png";
import bgVideo from "../assets/video.mp4";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  // video: {
  //   position: "fixed",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: "100%",
  //   zIndex: -1,
  // },
};

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userName: data.get("userName"),
      password: data.get("password"),
    });
  };
  return (
    <>
      {/* <video src={bgVideo} autoPlay loop style={styles.video} /> */}
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
                {" "}
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
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="userName"
                      label="UserName"
                      name="userName"
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
                    />

                    <LoadingButton
                      type="submit"
                      fullWidth
                      sx={{
                        mt: 3,
                        mb: 2,
                        height: 40,
                      }}
                      onClick={handleClick}
                      loading={loading}
                      variant="contained"
                    >
                      <span>Sign In</span>
                    </LoadingButton>
                  </Box>
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
