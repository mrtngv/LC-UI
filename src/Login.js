import React from 'react';
import axios from 'axios';

import "./Login.css";
import image from './images/login-logistics.png';

import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            formErrors: {username: '', password: ''},
            passwordValid: false,
            usernameValid: false,
            formValid: false,
            responseMsg: {}
        };

        this.handleInputValue = this.handleInputValue.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onLogin() {
        // const URL = "https://logistics-engine.herokuapp.com/api/authenticate/login";
        const URL = "http://localhost:8080/api/authenticate/login";
        const userDetails = {
            "username": this.state.username,
            "password": this.state.password
        }

        if (this.state.formValid) {
            axios.post(URL, userDetails).then(response => {

                if (response.data.accessToken) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }

                this.props.history.push("/profile");
                window.location.reload();
            }).catch(error => {
                this.setState({responseMsg: {error: true}});
                this.resetForm();
            })
        }
    }

    handleKeypress(e) {
        //it triggers by pressing the enter key
        if (e.charCode === 13) {
            this.handleSubmit();
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
        const register = document.getElementById("register-link");
        register.addEventListener("click", () => { this.props.history.push('/register') });
    }

    componentDidMount() {
        this.addEventListeners();
    }

    resetForm() {
        const inputs = document.querySelectorAll(".login-input");
        inputs.forEach(input => {
            input.value = '';
        });
    }

    handleSubmit() {
        this.onLogin();
    }

    validateInput(e) {
        var value = e.target.value;
        var name = e.target.name;
        this.validateField(name, value);
    }
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let passwordValid = this.state.passwordValid;
        let usernameValid = this.state.usernameValid;
      
        switch(fieldName) {
          case 'password':
            passwordValid = value.length >= 6;
            fieldValidationErrors.password = passwordValid ? '' : 'Паролата трябва да е поне 6 символа';
            break;
          case 'username':
            usernameValid = value.match(/^[a-z0-9!_-]{4,16}$/i);
            fieldValidationErrors.username = usernameValid ? '' : 'Невалидно потребителско име';
            break;
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        passwordValid: passwordValid,
                        usernameValid: usernameValid ? true : false
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.passwordValid && this.state.usernameValid});
    }

    render() {
        const formErrors = this.state.formErrors;

        const responseMessage = () => {
            const responseMsg = this.state.responseMsg;

            if (responseMsg.error) {
                return <span id="response-msg" className="error">Неуспешен вход</span>;
            }
        }

        return (
            <div className="container login">
                <div className="inner-container">
                    <form onKeyPress={this.handleKeypress}>
                        {responseMessage()}
                        <ui5-title level="H2">Вход в системата</ui5-title><br />
                        <div class="login-form-element">
                            <ui5-label class="login-label" for="usernameInput" required>Потребителско име:</ui5-label>
                            <ui5-input class={"login-input" + (formErrors.username ? ' error' : '')} id="usernameInput" name="username" placeholder="" onBlur={(e) => {
                                this.validateInput(e);}} onKeyPress={this.handleKeypress} required></ui5-input>
                            {formErrors.username ? <span className="error">{formErrors.username}</span> : null}
                        </div>
                        <div class="login-form-element">
                            <ui5-label class="login-label" for="passwordInput" required>Парола:</ui5-label>
                            <ui5-input class={"login-input" + (formErrors.password ? ' error' : '')} id="passwordInput" value={this.state.password} type="Password" name="password" placeholder="" onBlur={(e) => {
                                this.validateInput(e);}} onKeyPress={this.handleKeypress} required></ui5-input>
                            {formErrors.password ? <span className="error">{formErrors.password}</span> : null} <br />
                        </div>
                        <ui5-button class="submit-btn" onClick={this.handleSubmit} type="submit">Вход</ui5-button>
                        <span>
                            <ui5-label>Нямате профил?</ui5-label>
                            <ui5-label id="register-link">Регистрация</ui5-label>
                        </span>
                    </form>
                    <div className="image-container">
                        <img src={image} alt="Login Logistic Company" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login