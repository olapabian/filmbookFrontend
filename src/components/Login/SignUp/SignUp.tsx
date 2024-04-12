import React, { Component, FormEvent, useState } from "react";
import "./signUp.scss";
import { FaWindowClose } from "react-icons/fa";

interface SignUpProps {
    onClose: () => void;
    onRegister: (firstName: string, lastName: string, username: string, password: string, gender: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ onClose, onRegister}) => { 
    const [gender, setGender] = useState<string>(""); // Stan dla płci

    const handleRegister = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const firstNameInput = form.elements.namedItem("firstName") as HTMLInputElement | null;
        const lastNameInput = form.elements.namedItem("lastName") as HTMLInputElement | null;
        const usernameInput = form.elements.namedItem("username") as HTMLInputElement | null;
        const passwordInput = form.elements.namedItem("password") as HTMLInputElement | null;
        const firstName = firstNameInput ? firstNameInput.value : "";
        const lastName = lastNameInput ? lastNameInput.value : "";
        const username = usernameInput ? usernameInput.value : "";
        const password = passwordInput ? passwordInput.value : "";
        onRegister(firstName, lastName, username, password, gender);

    }
    
    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setGender(event.target.value);
    }

    return (
        <>
            <div className="overlay-signup"></div>
            <div className="signup">
                <div className="signup-container">
                    <div className="signup-top">
                        <div className="signup-header">
                            <h1>Utwórz konto</h1>
                        </div>
                        <div className="close-icon-div" onClick={onClose}>
                            <FaWindowClose className="close-icon" />
                        </div>
                    </div>
                    <div className="signup-separator"></div>
                    <form onSubmit={handleRegister}>
                        <div className="signup-fields">
                            <div className="signup-inputs">
                                <div className="signup-text">
                                    <input name="firstName" type="text" placeholder='Imie' required/>
                                    <input name="lastName" type="text" placeholder='Nazwisko' required/>
                                    <input name="username" type="text" placeholder='Nazwa Użytkownika' required/>
                                    <input name="password" type="password" placeholder='Hasło' required/>
                                </div>
                                <div className="signup-checkbox">
                                    <p>Płeć:</p>
                                    <div className="gender-input">
                                        <label htmlFor="female">
                                            <input type="radio" name="gender" value="Female" id="female" onChange={handleGenderChange} required/>
                                            Kobieta
                                        </label>
                                        <label htmlFor="male">
                                            <input type="radio" name="gender" value="Male" id="male" onChange={handleGenderChange} required/>
                                            Mężczyzna
                                        </label>
                                        <label htmlFor="custom">
                                            <input type="radio" name="gender" value="Custom" id="custom" onChange={handleGenderChange} required/>
                                            Inna
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn-create-acc">Zarejestruj się</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;
