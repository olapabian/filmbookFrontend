import React, { Component, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import filmbookLogo from "../../imgs/logos/download.png";
import SignUp from "../SignUp/SignUp"
import { getAuthToken, requestLogin, requestRegister, setAuthToken } from '../../Helpers/axios_helper';

interface LoginState {
    showSignUp: boolean;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
}

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
    const navigate = useNavigate();
    const [state, setState] = React.useState<LoginState>({
        showSignUp: false,
        firstName: "",
        lastName: "",
        username: "",
        password: "",
    });

    const toggleSignUp = () => {
        setState(prevState => ({
            ...prevState,
            showSignUp: !prevState.showSignUp
        }));
    }

    const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const usernameInput = form.elements.namedItem("username") as HTMLInputElement | null;
        const passwordInput = form.elements.namedItem("password") as HTMLInputElement | null;
        const username = usernameInput ? usernameInput.value : "";
        const password = passwordInput ? passwordInput.value : "";

        onLogin(username, password);  
    }

    const onLogin = (username: string, password: string): void => {
        requestLogin("POST", "/login", { username, password })
            .then((response) => {
                setAuthToken(response.data.token);
                console.log(getAuthToken());
                console.log("Udało się zalogować");
                navigate("/home"); 
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message); 
                } else {
                    console.log("Nie udało się zalogować");
                }
            });
    }

    const onRegister = (firstName: string, lastName: string, username: string, password: string, gender: string) => {
        requestRegister("POST", "/register", { firstName, lastName, username, password, gender })
        .then((response) => {
            setAuthToken(response.data.token);
            console.log("Udało się zarejestrować");
            toggleSignUp();
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message); // Display error message
            } else {
                console.log("Nie udało się zarejestrować");
            }
        });
    }

    return (
        <div className="login">
            {state.showSignUp && <SignUp onClose={toggleSignUp} onRegister={onRegister}/> }

            <div className="login-container">
                <div className="login-header">
                    <img src={filmbookLogo} alt="filmbook logo" />
                    <h2>RecenzujmyRazem - Portal Społecznościowy dla Miłośników Filmów</h2>
                </div>
                <div className="login-fields" >
                    <form className="login-box" onSubmit={handleLogin}>
                        <input name="username" type="text" placeholder="Login" required/>
                        <input name="password" type="password" placeholder="Hasło" required/>
                        <button type="submit" className="btn-login">Zaloguj się</button>
                    </form>
                    <p>Jeszcze nie masz konta?</p>
                    <button className="btn-create-acc" onClick={toggleSignUp}>Zarejestruj się</button>
                </div>
            </div>
            <footer className="footer">
                <h3>Aleksandra Pabian</h3>
            </footer>
        </div>
    );
}

export default Login;
