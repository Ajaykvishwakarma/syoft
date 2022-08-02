import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import style from '../Login/Login.module.css';
import MenuItem from '@mui/material/MenuItem';

const axios = require("axios");



const theme = createTheme();

export const Register = () => {

  const baseUrl = `https://syofts.herokuapp.com` 

  const navigate = useNavigate();
  const roles = [
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'manager',
      label: 'Manager',
    },
    {
      value: 'staff',
      label: 'Staff',
    }
  ];
  
  const [role, setRole] = React.useState('');

  const handleChange = (e) => {
    setRole(e.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data)
    const user = ({
      username : data.get('username'),
      phone : data.get('phone'),
      role : role,
      email: data.get('email'),
      password: data.get('password'),
    });
    signUp(user)
    async function signUp(user) {
      const a = await axios.post(`${baseUrl}/signup`, user)
      const response = a.data;
      if(response.status === 'success') {

      }else{
        alert('Please Provide Unique credential')
      }
      alert('please signin now')
      navigate('/signin')
    }
  }
  return (
    <div className={style.reg_div}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" style={{marginBottom: "20px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="username"
                  label="User Name"
                  type="username"
                  id="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-phone"
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-select-role"
                select
                label="Select Role *"
                fullWidth
                value={role}
                onChange={handleChange}
              >
                {roles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
         
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        
      </Container>
    
    </ThemeProvider>
    </div>
  );
}