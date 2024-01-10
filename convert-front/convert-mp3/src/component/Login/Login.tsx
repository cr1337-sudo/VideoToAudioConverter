import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import "./Login.css";

interface AccountLink {
  showCreateAccountLink: boolean;
  InputButton: boolean
}
const Login: React.FC<AccountLink> = (props: AccountLink) => {


  return (
    <div >
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid  item xs={1}>
          
        {props.InputButton && (
          <TextField id="outlined" label="Name" defaultValue="" />
            )}
            </Grid>
        <Grid item xs={1}>
          <TextField id="outlined-required" label="Email" defaultValue="" />
        </Grid>
        <Grid item xs={1}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={2}>
        {props.InputButton ? <Button variant="contained">Sign In</Button> : <Button variant="contained">Log In</Button> }
          <p>
            {props.showCreateAccountLink && (
              <Link to="/register" className="CreateAccount">
                Create account
              </Link>
            )}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
