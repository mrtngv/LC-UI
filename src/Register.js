import React from 'react'; 
import axios from 'axios';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }   

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onRegister() {
        const register_url = 'http://localhost:8080/api/authenticate/register';
        const registerUserDetails = {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password
        }

        axios.post(register_url, registerUserDetails).then(res => {
            this.props.history.push("/login");
        }).catch(error => {
            this.resetForm();
        });
    }

    handleSubmit() {
        this.onRegister();
    }

    handleKeypress(e) {
        //it triggers by pressing the enter key
        if (e.charCode === 13 && this.state.username && this.state.email && this.state.password) {
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

    render() {
        return (
            <div className="container">
                <div className="inner-container">
                    <form onKeyPress={this.handleKeypress}>
                        <ui5-title level="H2">Създаване на профил</ui5-title><br/>
                        <ui5-label class="register-label" for="usernameInput" required>Потребителско име:</ui5-label>
                        <ui5-input class="register-input" id="usernameInput" name="username" placeholder="" onKeyPress={this.handleKeypress} required></ui5-input>
                        <ui5-label class="register-label" for="emailInput" required>Имейл адрес:</ui5-label>
                        <ui5-input class="register-input" id="emailInput" name="email" placeholder="" onKeyPress={this.handleKeypress} required></ui5-input>
                        <ui5-label class="register-label" for="passwordInput" required>Парола:</ui5-label>
                        <ui5-input class="register-input" id="passwordInput" type="Password" name="password" value={this.state.password} placeholder="" onKeyPress={this.handleKeypress} required></ui5-input><br />
                        <ui5-button class="submit-btn" id="register-submit-btn" type="submit" onClick={this.onRegister}>Регистрация</ui5-button>
                    </form>
                </div>
            </div >
        )
    }
}

export default Register