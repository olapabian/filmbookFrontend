import React from 'react';
import "./signUp.scss";
import { FaWindowClose } from "react-icons/fa";

interface SignUpProps {
    onClose: () => void;
    onRegister: (firstName: string, lastName: string, username: string, password: string) => void; // Zaktualizowany typ
    onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void; 
    onSubmitRegister: (event: React.FormEvent<HTMLFormElement>) => void; 
}




const SignUp: React.FC<SignUpProps> = ({ onClose, onRegister, onChangeHandler, onSubmitRegister }) => { 

    const handleRegister = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault(); 
        const firstName = "firstName"; 
        const lastName = "lastName";
        const username = "username"; 
        const password = ""; 
        onRegister(firstName, lastName, username, password);
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
                    <form onSubmit={onSubmitRegister}>
                        <div className="signup-fields">
                            <div className="signup-inputs">
                                <div className="signup-text">
                                    <input name="firstName" type="text" placeholder='Imie' onChange={onChangeHandler}/>
                                    <input name="lastName" type="text" placeholder='Nazwisko' onChange={onChangeHandler}/>
                                    <input name="username" type="text" placeholder='Nazwa Użytkownika' onChange={onChangeHandler}/>
                                    <input name="password" type="password" placeholder='Hasło' onChange={onChangeHandler}/>
                                </div>
                                <div className="signup-checkbox">
                                    <p>Płeć:</p>
                                    <div className="gender-input">
                                        <label htmlFor="female">
                                            <input type="radio" name="gender" value="Female" id="female"/>
                                            Kobieta
                                        </label>
                                        <label htmlFor="male">
                                            <input type="radio" name="gender" value="Male" id="male"/>
                                            Mężczyzna
                                        </label>
                                        <label htmlFor="custom">
                                            <input type="radio" name="gender" value="Custom" id="custom"/>
                                            Inna
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn-create-acc" onClick={handleRegister}>Zarejestruj się</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;
