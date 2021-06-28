import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import "./Profile.css";

import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Title";

class Profile extends Component {
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

    render() {
        const user = JSON.parse(sessionStorage.getItem('user'));

        if (!user) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="container">
                <div className="profile-wrapper">
                    <ui5-card heading={user.username.charAt(0).toUpperCase() + user.username.slice(1)} subheading={this.mapUserRoles(user)} class="small">
                    <div className="content">
                        <ui5-button icon="activate">Промяна на потрбителски данни</ui5-button>
                    </div>
                    </ui5-card>
                </div>
            </div>
        );
    }
}

export default Profile