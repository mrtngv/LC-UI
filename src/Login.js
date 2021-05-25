import React from 'react';
import axios from 'axios';

import "./Login.css";

import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";

import { login } from "./actions/auth";
import { connect } from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.getPrivateContent = this.getPrivateContent.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onRoleChange(event) {
        this.setState({
            form: event.detail.selectedButton.getAttribute("id")
        })
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        console.log(name + ":" + value);
    }

    onLogin() {
        this.setState({
            loading: true,
        });
        const { dispatch, history } = this.props;
        dispatch(login(this.state.username, this.state.password)).then(() => {
          history.push("/profile");
          window.location.reload();
        }).catch(() => {
          this.setState({
            loading: false
          });
        });
    }

    getPrivateContent() {
        console.log(this.state.token);
        const testURL = "http://localhost:8080/api/test/signed";
        const token = {
            headers: {
                Authorization: "Bearer " + this.state.token
            }
        }

        axios.get(testURL, token).then(res => this.setState({ text: res.data }));
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

    render() {
        const { isLoggedIn } = this.props;

    return (
        <div className="container">
            <div className="inner-container">
                <ui5-title level="H2">Вход в системата</ui5-title><br />
                <ui5-label for="usernameInput" required>Потребителско име:</ui5-label>
                <ui5-input id="usernameInput" name="username" placeholder="" required></ui5-input>
                <ui5-label for="passwordInput" required>Парола:</ui5-label>
                <ui5-input id="passwordInput" type="Password" name="password" placeholder="" required></ui5-input><br />
                <ui5-button class="submit-btn" id="login-submit-btn" onClick={this.onLogin}>Вход</ui5-button><br />
            </div>
            <span>
                <ui5-label>Нямате профил?</ui5-label>
                <ui5-label id="register-link">Регистрация</ui5-label>
            </span>
        </div>
      );
    }
  }
  
  function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
      isLoggedIn,
      message
    };
  }
  
  export default connect(mapStateToProps)(Login);