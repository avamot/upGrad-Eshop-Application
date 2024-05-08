
// WelcomeDashboard.js 
import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook 
import NavigationBar from '../components/NavigationBar';
import { IsLoggedInContext } from '../components/IsLoggedInContext';
import { Link } from 'react-router-dom';

function Home({ username }) {
    const history = useNavigate();
    console.log("context: ", IsLoggedInContext);
    console.log("useContext(context): ", useContext(IsLoggedInContext));

    const [isLoggedIn, setIsLoggedIn] = useContext(IsLoggedInContext);




    const handleLogout = async () => {

        setIsLoggedIn({
            isLoggedIn: false
        }, () => {
            console.log(isLoggedIn);
        });


       history('/');
    };

    return (
        <>
            <IsLoggedInContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
                <NavigationBar />
            </IsLoggedInContext.Provider>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="border rounded-lg p-4" style={{ width: '500px', height: '400px' }}>
                    <h2 className="mb-4 text-center">Welcome to Home</h2>
                    <p className="mb-4 text-center">Hello, {username}!</p>
                    <p className="text-center">You are logged in successfully.</p>
                    <div className="text-center">
                    <IsLoggedInContext.Provider value={[false, setIsLoggedIn]}>
                            <button type="submit" className="btn btn-primary mt-3" onClick={handleLogout}>Logout</button>
                        </IsLoggedInContext.Provider>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Home; 