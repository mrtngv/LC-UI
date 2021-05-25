import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import "./Profile.css";

import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Title";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.mapUserRoles = this.mapUserRoles.bind(this);
}
  mapUserRoles() {
    return this.props.user.roles.map(function(role) {
      switch (role) {
        case 'ROLE_CLIENT':
          return 'Клиент';
          break;
        case 'ROLE_OFFICE_EMPLOYEE':
          return 'Офис служител';
          break;
        case 'ROLE_DELIVERY':
          return 'Доставчик';
          break;
        case 'ROLE_MODERATOR':
          return 'Модератор';
          break;
        default:
          break;
      }
    });
  }

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="profile-wrapper">
          <ui5-card heading={currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1)} subheading={this.mapUserRoles().map(role => role)} class="small">
            <div class="content">
              <ui5-button icon="activate">Промяна на потрбителски данни</ui5-button>
            </div>
          </ui5-card>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);