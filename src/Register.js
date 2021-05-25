import React from 'react'; import axios from 'axios';

import "./Login.css";

import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";

import { connect } from "react-redux";
import { register } from "./actions/auth";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            successful: false
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

        this.setState({
          successful: false,
        });

        const { dispatch, history } = this.props;

        dispatch(register(this.state.username, this.state.email, this.state.password))
        .then(() => {
          this.setState({
            successful: true,
          });
          history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
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
                    <ui5-label for="passwordInput" required>Парола:</ui5-label>
                    <ui5-input id="passwordInput" name="password" placeholder="" type="Password" required></ui5-input><br />
                    <ui5-button class="submit-btn" id="register-submit-btn" onClick={this.onRegister}>Регистрация</ui5-button>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    const { message } = state.message;
    return {
      message,
    };
  }
  
  export default connect(mapStateToProps)(Register);