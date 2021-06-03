import React from 'react';
import axios from 'axios';

import "./Login.css";

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
            password: ""
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    // onRoleChange(event) {
    //     this.setState({
    //         form: event.detail.selectedButton.getAttribute("id")
    //     })
    // }

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

        axios.post(URL, userDetails).then(response => {

            if (response.data.accessToken) {
                sessionStorage.setItem("user", JSON.stringify(response.data));
            }

            this.props.history.push("/profile");
            window.location.reload();
        }).catch(error => {
            this.resetForm();
         })
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

    render() {
        return (
            <div className="container">
                <div className="inner-container">
                    <form onKeyPress={this.handleKeypress}>
                        <ui5-title level="H2">Вход в системата</ui5-title><br />
                        <ui5-label class="login-label" for="usernameInput" required>Потребителско име:</ui5-label>
                        <ui5-input class="login-input" id="usernameInput" name="username" placeholder="" onKeyPress={this.handleKeypress} required></ui5-input>
                        <ui5-label class="login-label" for="passwordInput" required>Парола:</ui5-label>
                        <ui5-input class="login-input" id="passwordInput" value={this.state.password} type="Password" name="password" placeholder="" onKeyPress={this.handleKeypress} required></ui5-input><br />
                        <ui5-button class="submit-btn" onClick={this.handleSubmit} type="submit">Вход</ui5-button>
                    </form>
                    <span>
                        <ui5-label>Нямате профил?</ui5-label>
                        <ui5-label id="register-link">Регистрация</ui5-label>
                    </span>
                </div>
            </div>
        )
    }
}

export default Login