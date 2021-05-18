import React from 'react'; import axios from 'axios';

import "./Login.css";

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
            username: "",
            email: "",
            password: ""
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.onRegister = this.onRegister.bind(this);

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

        console.log(registerUserDetails);

        axios.post(register_url, registerUserDetails).then(res => {
            console.log("Success" + res);
            this.props.history.push("/");
        });
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

    render() {
        return (
            <div className="container">
                <div className="inner-container">
                <ui5-title level="H2">Създаване на профил</ui5-title><br/>
                    <ui5-label for="usernameInput" required>Потребителско име:</ui5-label>
                    <ui5-input id="usernameInput" name="username" placeholder="" required></ui5-input>
                    <ui5-label for="emailInput" required>Имейл адрес:</ui5-label>
                    <ui5-input id="emailInput" name="email" placeholder="" required></ui5-input>
                    <ui5-label for="regiPassInput" required>Парола:</ui5-label>
                    <ui5-input id="regiPassInput" name="regiPass" placeholder="" required></ui5-input><br />

                    <ui5-button class="submit-btn" id="register-submit-btn" onClick={this.onRegister}>Регистрация</ui5-button>
                </div>
            </div >
        )
    }
}

export default Register