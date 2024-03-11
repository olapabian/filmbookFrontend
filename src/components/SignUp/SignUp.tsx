import React from 'react';
import "./signUp.scss";
import { FaWindowClose } from "react-icons/fa";
interface SignUpProps {
    onClose: () => void; // Definicja typu dla onClose
}
const SignUp: React.FC<SignUpProps> = ({ onClose }) =>{
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
                    <form action="#">
                        <div className="signup-fields">
                            <div className="signup-inputs">
                                <div className="signup-text">
                                    <input type="text" placeholder='Imie' />
                                    <input type="text" placeholder='Nazwisko' />
                                    <input type="text" placeholder='Nazwa Użytkownika' />
                                    <input type="password" placeholder='Hasło' />
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
                        <button className="btn-create-acc">Zarejestruj się</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp;
