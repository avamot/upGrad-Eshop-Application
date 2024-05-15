import React, { useState, useContext } from 'react';
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
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import "react-toastify/dist/ReactToastify.css";
import '../components/login.css';



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



export default function Login() {
    const classes = useStyles();
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [error, setError] = useState(''); 
    const history = useNavigate(); 
    
  
    const handleLogin = async (e) => { 
        e.preventDefault();
     
        try { 
            const response = await axios.post('http://localhost:8080/api/auth/signin', 
            { username, password }); 

            sessionStorage.setItem('myTokenName', response.data.token);
            console.log(sessionStorage.getItem('myTokenName'));
             
           
            console.log('Login successful:', response); 

            localStorage.setItem("token", response.data.token); //set token in localstorage
         
           
                history('/products'); 

                 
                
            
        } catch (error) { 
            console.error('Login failed:', error.response ? error.response.data : error.message); 
            setError('Invalid username or password.'); 
        } 

        try{
            const token = sessionStorage.getItem('myTokenName');
            const response = await axios.get('http://localhost:8080/api/users',
             { headers: {
                
                'Authorization': `Bearer ${token}`  
                } 
            }); 

        } catch (error){
            setError(error.response.status);
            console.log("error.response.status",error.response.status);
            if (!(error.response.status === 401 || error.response.status === 403)){
                console.log("inside 1");
                sessionStorage.setItem("isAuthorized", "true");
            }
            else {
                sessionStorage.setItem("isAuthorized", "false");
            }
            
        }

        
    }; 
    
  
        
    return (
        <>
            <NavigationBar />
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