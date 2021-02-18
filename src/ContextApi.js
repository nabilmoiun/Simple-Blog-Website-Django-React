import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const Context = React.createContext()

const ContextApi = props => {
    
        const [state, setState] = useState({
             posts: [],
             isUserLoggedIn: false,
             token: "",
             user: "",
             message: "",
             loading: true
        })
        const localhost = "http://localhost:8000";

    useEffect( () => {
        let accessToken = localStorage.getItem('token');
        if(accessToken) {
            setState({
                ...state,
                isUserLoggedIn: true,
                token: accessToken,
                user: localStorage.getItem('user')
            });
        }
        const url = "https://jsonplaceholder.typicode.com/posts";
        axios.get(url)
        .then(response => {
            setState({
                ...state,
                posts: response.data.slice(0, 50),
                loading: false
            });
        })
        .catch(error => {
            console.log(error);
        })
    },[]);

   const hideMessage = () => {
        setState({
            ...state,
            message: ""
        });
    };

    const handleLogin = (event, data) => {
        event.preventDefault();
        axios.post(localhost + '/api/login/', data)
        .then(response => {
            // Update user status on successful login
            setState({
                ...state,
                isUserLoggedIn: true,
                token: response.data['access'],
                user: response.data['user'],
                message: response.data['response']
            });
            // Stores the access token and user instance to localstorage on successful login
            localStorage.setItem('token', response.data['access']);
            localStorage.setItem('user', response.data['user']);
            setTimeout(hideMessage, 3000);
        })
        .catch(error => {
            let loginErrorMessage = document.getElementById("login-error");
            loginErrorMessage.innerHTML = error.response.data['detail'];
            setTimeout(function () {
                loginErrorMessage.innerHTML = "";
            }, 2000);
        })
    }
    
    const handleLogout = () => {
        // let messageHideFunction = hideMessage;
        // Remove the access token from localstorage on logout
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setState({
            ...state,
            token: "",
            user: "",
            isUserLoggedIn: false,
            message: "Logged out"
        });
        setTimeout(hideMessage, 3000);
    }

    const handleRegister = (event, data, history) => {
        event.preventDefault()
        // let messageHideFunction = hideMessage;
        axios.post(localhost + '/api/register/', data)
        .then(response => {
            return response;
        })
        .then(data => {
            // Handling registration fails and success status
            if(data.status.toString() === "203") {
                document.getElementById("register-error").innerHTML = data.data['response'];
            }
            if(data.status.toString() === "200") {
                document.getElementById("register-error").innerHTML = "";
                setState({
                    ...state,
                    message: data.data['response']
                });
                setTimeout(hideMessage, 3000)
                history.push('/login');
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    
        return (
            <Context.Provider value={
                {
                    ...state,
                    login: handleLogin,
                    logout: handleLogout,
                    register: handleRegister,
                    hideMessage: hideMessage,
                }
            }>
                {props.children}
            </Context.Provider>
        )

}

export default ContextApi;
