import React, { useState, createContext, useContext } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavigationBar from "../components/NavigationBar";
import Copyright from "../components/Copyright";
import { IsLoggedInContext } from '../components/IsLoggedInContext';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { jwtDecode } from 'jwt-decode' ;




const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

// async function loginUser(credentials) {
//     return fetch('http://localhost:3000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(credentials)
//     })
//       .then(data => data.json())
//    }

   

export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    // const [error, setError] = useState(''); 
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [isLoggedIn, setIsLoggedIn, error, setError] = useContext(IsLoggedInContext);
    const history = useNavigate(); 


    console.log("context: ", IsLoggedInContext);
    console.log("useContext(context): ", useContext(IsLoggedInContext));
  
    const handleLogin = async (e) => { 
        e.preventDefault();
        try { 
            const response = await axios.post('http://localhost:8080/api/auth/signin', 
            { username, password }); 

            // const response = await axios.get('http://localhost:8080/api/users', 
            // { username, password }); 
           
            console.log('Login successful:', response); 
           
            setIsLoggedIn({
                isLoggedIn: true,
                token: response.data.token
            }, () => {
                console.log("isLoggedIn",isLoggedIn);
                console.log(token);
            })
            const header = `Authorization: Bearer ${response.data.token}`;
            console.log("header", header);
           // return axios.get(URLConstants.USER_URL, { headers: { header } });
            try{
                await axios.get('http://localhost:8080/api/users', { headers: { header } });

            } catch (error){
                setError(error.response.status);
                console.log("error.response.status",error.response.status)

            }
                history('/products'); 

                 
                
            
        } catch (error) { 
            console.error('Login failed:', error.response ? error.response.data : error.message); 
            setError('Invalid username or password.'); 
        } 
    }; 
    
  
        
    return (
        <>
           <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn, error, setError]}>
            <NavigationBar />
            </IsLoggedInContext.Provider>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Email Address"
                                    name="username"
                                    autoComplete="username"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button onClick={handleLogin}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                <Link href="/signup" underline="always" color="initial">
                                 Don't have an account? Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
            <Copyright />



        </>

    );
}