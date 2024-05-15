import React, { useState, useContext }  from "react";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
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



export default function SignUp() {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState(['user']);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [contactNumber, setContactNumber] = useState(''); 
    const [error, setError] = useState(''); // State to manage error messages 
    
   
    const history = useNavigate(); 

  

    const handleSignup = async (e) => { 
        try { 

            e.preventDefault();
           
  
            const response = await axios.post('http://localhost:8080/api/auth/signup', { 
                email, 
                role,
                password, 
                firstName, 
                lastName,
                contactNumber
            }); 

            sessionStorage.setItem('myTokenName', response.data.token);
            console.log(sessionStorage.getItem('myTokenName'));
             
            // Handle successful signup 
           
            console.log(response); 

            

            history('/products'); 
        } catch (error) { 
            // Handle signup error 
            console.error('Signup failed:', error.response ? error.response.data : error.message); 
            setError(error.response ? error.response.data : error.message); 
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
            console.log("error.response.status",error.response.status)
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
                        Sign up
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    value={firstName}
                                    onChange={e => {setFirstName(e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    value={lastName}
                                    onChange={e => {setLastName(e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={e => {setEmail(e.target.value)}}
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
                                    onChange={e => {setPassword(e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="confirmPassword"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={e => {setConfirmPassword(e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="contactNumber"
                                    label="Contact Number"
                                    type="contactNumber"
                                    id="contactNumber"
                                    autoComplete="contactNumber"
                                    value={contactNumber}
                                    onChange={e => {setContactNumber(e.target.value)}}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={handleSignup}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" underline="always" color="initial">
                                    Already have an account? Sign in
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
