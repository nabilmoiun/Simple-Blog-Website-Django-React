import React, { Component } from 'react'
import axios from 'axios';

export const Context = React.createContext()

class ContextApi extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             posts: [],
             isUserLoggedIn: false,
             token: "",
             user: "",
             message: "",
             loading: true
        }
        this.localhost = "http://localhost:8000";
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if(accessToken) {
            this.setState({
                isUserLoggedIn: true,
                token: accessToken,
                user: localStorage.getItem('user')
            })
        }
        const url = "https://jsonplaceholder.typicode.com/posts";
        axios.get(url)
        .then(response => {
            this.setState({
                posts: response.data.slice(0, 50),
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    hideMessage = () => {
        this.setState({
            message: ""
        })
    }

    handleLogin = (event, data) => {
        event.preventDefault();
        let messageHideFunction = this.hideMessage;
        axios.post(this.localhost + '/api/login/', data)
        .then(response => {
            // Update user status on successful login
            this.setState({
                isUserLoggedIn: true,
                token: response.data['access'],
                user: response.data['user'],
                message: response.data['response']
            })
            // Stores the access token and user instance to localstorage on successful login
            localStorage.setItem('token', response.data['access']);
            localStorage.setItem('user', response.data['user']);
            setTimeout(messageHideFunction, 3000);
        })
        .catch(error => {
            let loginErrorMessage = document.getElementById("login-error");
            loginErrorMessage.innerHTML = error.response.data['detail'];
            setTimeout(function () {
                loginErrorMessage.innerHTML = "";
            }, 2000);
        })
    }
    
    handleLogout = () => {
        let messageHideFunction = this.hideMessage;
        // Remove the access token from localstorage on logout
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            token: "",
            user: "",
            isUserLoggedIn: false,
            message: "Logged out"
        })
        setTimeout(messageHideFunction, 3000);
    }

    handleRegister = (event, data, history) => {
        event.preventDefault()
        let messageHideFunction = this.hideMessage;
        axios.post(this.localhost + '/api/register/', data)
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
                this.setState({
                    message: data.data['response']
                })
                setTimeout(messageHideFunction, 3000)
                history.push('/login');
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    render() {
        return (
            <Context.Provider value={
                {
                    ...this.state,
                    login: this.handleLogin,
                    logout: this.handleLogout,
                    register: this.handleRegister,
                    hideMessage: this.hideMessage,
                    history: this.props.history,
                }
            }>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default ContextApi;
