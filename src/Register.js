import React from 'react'; import axios from 'axios';

import "./Login.css";
import image from './images/register-logistic.jpg'; 
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            formErrors: {username: '', email: '', password: '', username: '', confirmPassword: ''},
            emailValid: false,
            passwordValid: false,
            usernameValid: false,
            formValid: false
        };

        this.handleInputValue = this.handleInputValue.bind(this);
        this.onRegister = this.onRegister.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }   

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(name + ":" + value);
    }

    onRegister() {
        const register_url = 'http://localhost:8080/api/authenticate/register';
        const registerUserDetails = {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        }

        if (this.state.formValid) {
            axios.post(register_url, registerUserDetails).then(res => {
            this.props.history.push("/login");
            }).catch(error => {
                this.resetForm();
            });
        }
    }

    addEventListeners() {
        const loginNameInput = document.getElementById("usernameInput");
        if (loginNameInput) {
            loginNameInput.addEventListener("change", this.handleInputValue);
        }
        const loginPasswordInput = document.getElementById("passwordInput");
        if (loginPasswordInput) {
            loginPasswordInput.addEventListener("change", this.handleInputValue);
        }
        const registerEmailInput = document.getElementById("emailInput");
        if (registerEmailInput) {
            registerEmailInput.addEventListener("change", this.handleInputValue);
        }
    }

    componentDidMount() {
        this.addEventListeners();
    }

    resetForm() {
        const inputs = document.querySelectorAll(".register-input");
        inputs.forEach(input => {
            input.value = '';
        });
    }

    validateInput(e) {
        var value = e.target.value;
        var name = e.target.name;
        this.validateField(name, value);
    }
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
        let passwordMatch = this.state.passwordMatch;
      
        switch(fieldName) {
          case 'email':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : 'Невалиден имейл';
            break;
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '' : 'Паролата трябва да е поне 6 символа';
            break;
          case 'username':
            usernameValid = value.match(/^[a-z0-9!_-]{4,16}$/i);
            fieldValidationErrors.username = usernameValid ? '' : 'Невалидно потребителско име';
            break;
          case 'confirmPassword':
            passwordMatch = this.state.password === value;
            passwordValid = passwordMatch;
            fieldValidationErrors.confirmPassword = passwordMatch ? '' : 'Паролите не съвпадат';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        passwordValid: passwordValid,
                        usernameValid: usernameValid
                      }, this.validateForm);
    }
      
    validateForm() {
            this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid});
    }

    render() {
        const formErrors = this.state.formErrors;
        return (
            <div className="container">
                <div className="inner-container register">
                    <form onKeyPress={this.handleKeypress}>
                        <ui5-title level="H2">Създаване на профил</ui5-title><br/>
                        <ui5-label class="register-label" for="usernameInput" required>Потребителско име:</ui5-label>
                        <ui5-input class={"register-input" + (formErrors.username ? ' error' : '')} id="usernameInput" name="username" placeholder="" onKeyPress={this.handleKeypress} onBlur={(e) => {
                            this.validateInput(e);}} value={this.state.username} required></ui5-input> {formErrors.username ? <span className="error">{formErrors.username}</span> : null}
                        <ui5-label class="register-label" for="emailInput" required>Имейл адрес:</ui5-label>
                        <ui5-input class={"register-input" + (formErrors.email ? ' error' : '')} id="emailInput" name="email" placeholder="" onKeyPress={this.handleKeypress} onBlur={(e) => {
                            this.validateInput(e);}}value={this.state.email} required></ui5-input> {formErrors.email ? <span className="error">{formErrors.email}</span> : null}
                        <ui5-label class="register-label" for="passwordInput" required>Парола:</ui5-label>
                        <ui5-input class={"register-input" + (formErrors.password ? ' error' : '')} id="passwordInput" type="Password" name="password" onBlur={(e) => {
                            this.validateInput(e);}} value={this.state.password} placeholder="" onKeyPress={this.handleKeypress} required></ui5-input>{formErrors.password ? <span className="error">{formErrors.password}</span> : null}
                        <ui5-label class="register-label" for="passwordInput" required>Потвърди парола:</ui5-label>
                        <ui5-input class={"register-input" + (formErrors.confirmPassword ? ' error' : '')} id="confirmPasswordInput" type="Password" name="confirmPassword" onBlur={(e) => {
                        this.validateInput(e);}} value={this.state.confirmPassword} placeholder="" onKeyPress={this.handleKeypress} required></ui5-input>{formErrors.confirmPassword ? <span className="error">{formErrors.confirmPassword}</span> : null}<br/>
                        <ui5-button class="submit-btn" id="register-submit-btn" type="submit" onClick={this.onRegister}>Регистрация</ui5-button>
                    </form>
                    <img src={image} alt="Sign up Logistic Company" />;
                </div>
            </div>
        )
    }
}

export default Register