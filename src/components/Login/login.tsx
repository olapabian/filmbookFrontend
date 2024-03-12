import React, { Component, FormEvent } from "react";
import "./login.scss";
import filmbookLogo from "../../imgs/logos/download.png";
import SignUp from "../SignUp/SignUp";
import { request } from '../../Helpers/axios_helper'

interface LoginState {
    showSignUp: boolean;
    active: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

interface LoginProps {
    handleLogin: (username: string, password: string) => void; 
    onLogin: (userData: { username: string, password: string }) => void; 
    onRegister: (userData: { firstName: string, lastName: string, username: string, password: string }) => void; 
}


class Login extends Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            showSignUp: false,
            active: "login",
            firstName: "",
            lastName: "",
            username: "",
            password: "",
        };
        this.toggleSignUp = this.toggleSignUp.bind(this);
    }

    toggleSignUp() {
        this.setState(prevState => ({
            showSignUp: !prevState.showSignUp
        }));
    }

    onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    
    onSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const { username, password } = this.state;
        this.props.onLogin({ username, password });
    }


    onSubmitRegister = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { firstName, lastName, username, password } = this.state;
        this.props.onRegister({ firstName, lastName, username, password });
    }


    handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault(); 
        const { username, password } = this.state; 
        this.props.onLogin({ username, password });
    }

    onLogin = ({ username, password }: { username: string, password: string }) => {
        request("POST",
            "/login",
            { login: username, password: password}
            ).then((response) => {
                console.log("udalo sie")
            }).catch((error) => {
                console.log("nie udalos sie")
            });
    }
    

    

    onRegister = (firstName: string, lastName: string, username: string, password: string) => {
        request("POST",
            "/register",
            { 
                firstName: firstName,
                lastName: lastName,
                login: username, 
                password: password}
            ).then((response) => {
                console.log("udalo sie")
            }).catch((error) => {
                console.log("nie udalos sie")
            });

    }
    render() {
        const { showSignUp } = this.state;
        return (
            <div className="login">
                {showSignUp && <SignUp onClose={this.toggleSignUp} onRegister={this.onRegister} onSubmitRegister={this.onSubmitRegister} onChangeHandler={this.onChangeHandler} />} 

                <div className="login-container">
                    <div className="login-header">
                        <img src={filmbookLogo} alt="filmbook logo" />
                        <h2>RecenzujmyRazem - Portal Społecznościowy dla Miłośników Filmów</h2>
                    </div>
                    <div className="login-fields">
                        <form className="login-box" onSubmit={this.onSubmitLogin}>

                                <input name="username" type="text" placeholder="Login"onChange={this.onChangeHandler} />

                                <input name="password" type="password" placeholder="Hasło" />

                                <button type="submit" className="btn-login" onClick={this.handleLogin} >Zaloguj się</button>

                            
                            <p>Jeszcze nie masz konta?</p>
                            <button className="btn-create-acc" onClick={this.toggleSignUp}>Zarejestruj się</button>
                        </form>
                    </div>
                </div>
                <footer className="footer">
                    <h3>Aleksandra Pabian</h3>
                </footer>
            </div>
        );
    }
}

export default Login;
