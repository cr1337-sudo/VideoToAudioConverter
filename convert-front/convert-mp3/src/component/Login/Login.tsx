import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";
import "./Login.css";

interface AccountLink {
  showCreateAccountLink: boolean;
  InputButton: boolean
}
const Login: React.FC<AccountLink> = (props: AccountLink) => {
  const [user, setUser] = useState({
    mail: "",
    password: "",
  });
  const [checkInput, setCheckInput] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e: any) => {
    
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    console.log(user);
    
  };
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.mail || !user.password) {
      setCheckInput(true)
      return
    }
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);
      
      
      if (data.success == true) {
        navigate('/home')
      } else {
        setError(true)
      }
      
      
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


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
        
        <Grid item xs={1}>
          <TextField   onChange={handleChange} name="mail" id="outlined-required" label="email" defaultValue="" />
        </Grid>
        <Grid item xs={1}>
          <TextField
          onChange={handleChange}
          name="password"
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={2}>
          {checkInput && <p style={{color:"red"}}>All date are required</p>}
          {error && <p style={{color:"red"}}>Failed to login</p>}
       <Button onClick={handleLogin} variant="contained">Log In</Button>
          <p>
            
              <Link to="/register" className="CreateAccount">
                Create account
              </Link>
           
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
