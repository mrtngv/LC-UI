import React from 'react'; 
import { Redirect } from 'react-router-dom';
import "./Profile.css";
import axios from 'axios';

import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js"
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        const user = JSON.parse(sessionStorage.getItem('user'));

        this.state = {
            username: user ? user.username : '',
            email: user ? user.email : '',
            password: '',
            confirmPassword: '',
            formErrors: {username: '', email: '', password: '', confirmPassword: ''},
            emailValid: true,
            passwordValid: false,
            usernameValid: true,
            formValid: false,
            responseMsg: {}
        };

        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    mapUserRoles(user) {
        switch (user.role) {
        case 'ROLE_CLIENT':
            return 'Клиент';
        case 'ROLE_OFFICE_EMPLOYEE':
            return 'Офис служител';
        case 'ROLE_DELIVERY':
            return 'Доставчик';
        case 'ROLE_MODERATOR':
            return 'Модератор';
        default:
            break;
        }
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    onEdit() {
        const editProfileUrl = 'http://localhost:8080/api/authenticate/edit';
        const loginUrl = "http://localhost:8080/api/authenticate/login";

        const accessToken = JSON.parse(sessionStorage.getItem('user')).accessToken;
        const editUserDetails = {
            'username': this.state.username,
            'email': this.state.email,
            'password': this.state.password
        }

        if (this.state.formValid && accessToken) {
            axios.post(editProfileUrl, editUserDetails, {
                headers: {
                  'Authorization': 'Bearer ' + accessToken
                }
              }).then(res => {
                const loginDetails = {
                    "username": this.state.username,
                    "password": this.state.password
                }

                axios.post(loginUrl, loginDetails).then(response => {
                    if (response.data.accessToken) {
                        sessionStorage.setItem("user", JSON.stringify(response.data));
                    }

                    this.setState({responseMsg: {success: true, error: false}});
                })
            }).catch(error => {
                this.setState({responseMsg: {error: true, success: false}});
            });
        }
    }

    handleSubmit() {
        this.onEdit();
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
                        emailValid: emailValid ? true : false,
                        passwordValid: passwordValid,
                        usernameValid: usernameValid ? true : false
                      }, this.validateForm);
    }
      
    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid});
    }

    render() {
        const formErrors = this.state.formErrors;
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (!user) {
            return <Redirect to="/login" />;
        }

        const responseMessage = () => {
            const responseMsg = this.state.responseMsg;

            if (responseMsg.success) {
                return <span id="response-msg" className="success">Успешно променени данни</span>;
            } else if (responseMsg.error) {
                return <span id="response-msg" className="error">Неуспешно променени данни</span>;
            }
        }

        return (
            <div className="container">
                <div className="profile-wrapper inner-container">
                    <ui5-card heading={"Здравей, " + user.username.charAt(0).toUpperCase() + user.username.slice(1)} subheading={this.mapUserRoles(user)} class="small">
                        <div className="content">
                            <form id="myForm" name="myForm" ref={el => (this.form = el)} onKeyPress={this.handleKeypress} onSubmit={this.onEdit}>
                                {responseMessage()}
                                <ui5-label class="profile-label" for="usernameInput" required>Потребителско име:</ui5-label>
                                <ui5-input class={"profile-input" + (formErrors.username ? ' error' : '')} value={user.username} id="usernameInput" name="username" placeholder="" onKeyPress={this.handleKeypress} onBlur={(e) => {
                                    this.validateInput(e);}} required></ui5-input> {formErrors.username ? <span className="error">{formErrors.username}</span> : null}
                                <ui5-label class="profile-label" for="emailInput" required>Имейл адрес:</ui5-label>
                                <ui5-input class={"profile-input" + (formErrors.email ? ' error' : '')} id="emailInput" name="email" placeholder="" onKeyPress={this.handleKeypress} onBlur={(e) => {
                                    this.validateInput(e);}} value={user.email} required></ui5-input> {formErrors.email ? <span className="error">{formErrors.email}</span> : null}
                                <ui5-label class="profile-label" for="passwordInput" required>Парола:</ui5-label>
                                <ui5-input class={"profile-input" + (formErrors.password ? ' error' : '')} id="passwordInput" type="Password" name="password" onBlur={(e) => {
                                    this.validateInput(e);}} value={this.state.password} placeholder="" onKeyPress={this.handleKeypress} required></ui5-input>{formErrors.password ? <span className="error">{formErrors.password}</span> : null}
                                <ui5-label class="profile-label" for="passwordInput" required>Потвърди парола:</ui5-label>
                                <ui5-input class={"profile-input" + (formErrors.confirmPassword ? ' error' : '')} id="confirmPasswordInput" type="Password" name="confirmPassword" onBlur={(e) => {
                                    this.validateInput(e);}} value={this.state.confirmPassword} placeholder="" onKeyPress={this.handleKeypress} required></ui5-input>{formErrors.confirmPassword ? <span className="error">{formErrors.confirmPassword}</span> : null}
                                <ui5-button class="submit-btn" type="submit" icon="activate" onClick={this.onEdit}>Промяна на данни</ui5-button>
                            </form>
                        </div>
                    </ui5-card>
                </div>
            </div>
        );
    }
}

export default Profile