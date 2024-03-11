import React, { Component } from "react";
import "./login.scss";
import filmbookLogo from "../../imgs/logos/download.png";
import SignUp from "../SignUp/SignUp";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignUp: false
        };
        this.toggleSignUp = this.toggleSignUp.bind(this);
    }

    toggleSignUp() {
        this.setState(prevState => ({
            showSignUp: !prevState.showSignUp
        }));
    }

    render() {
        const { showSignUp } = this.state;
        return (
            <div className="login">
                {showSignUp && <SignUp onClose={this.toggleSignUp} />}
                <div className="login-container">
                    <div className="login-header">
                        <img src={filmbookLogo} alt="filmbook logo" />
                        <h2>RecenzujmyRazem - Portal Społecznościowy dla Miłośników Filmów</h2>
                    </div>
                    <div className="login-fields">
                        <div className="login-box">
                            <input type="text" placeholder='e-mail albo numer telefonu'/>
                            <input type="password" placeholder="Hasło" />
                            <button className="btn-login">Zaloguj się</button>
                            <p>Jeszcze nie masz konta?</p>

                            <button className="btn-create-acc" onClick={this.toggleSignUp}>Zarejestruj się</button>
                        </div>
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
