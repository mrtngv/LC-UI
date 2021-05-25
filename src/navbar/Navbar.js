import React from 'react';
import { connect } from "react-redux";
import "./Navbar.css";
import { logout } from "../actions/auth";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onNavbarSelect = this.onNavbarSelect.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
}

onNavbarSelect(event) {
    const newRoute = event.detail.item.id;
    this.props.history.push(('/' + newRoute));
}

onSidebarCollapse() {
  const sidenav = document.getElementById('side-navigation');
  sidenav.collapsed = !sidenav.collapsed;
}

onLogin() {
  this.props.history.push(('/login'));
}

onLogout() {
  const { dispatch } = this.props;
  dispatch(logout(this.state.username, this.state.password));
}

addEventListeners() {
    const navigation = document.getElementById('side-navigation');
    navigation.addEventListener("selection-change", this.onNavbarSelect);
    const onSidebarCollapseButton = document.getElementById('startButton');
    onSidebarCollapseButton.addEventListener('click', this.onSidebarCollapse);
    const shellbar = document.getElementById('shellbar');
    const popover = document.getElementById('popover');
    shellbar.addEventListener("profile-click", function(event) {
      popover.openBy(event.detail.targetRef);
    });
    const profile = document.getElementById("profile");
    profile.addEventListener("click", () => { this.props.history.push('/profile') });
}

componentDidMount() {
  const user = this.props.user;
  this.addEventListeners();

  if (user) {
    this.setState({
      currentUserName: user.username,
      showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
      showAdminBoard: user.roles.includes("ROLE_ADMIN"),
    });
  }
}

  render() {
    return (
      <div>
        <ui5-shellbar 
            className="shellbar"
            id="shellbar"
            primary-title="CSCB025"
            secondary-title="Проект логистична компания"
        >
          <ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
          <ui5-avatar id="nav-profile" slot="profile" icon="customer"></ui5-avatar>
          : <ui5-link icon="sap-icon://customer" onClick={this.onLogin} id="login">Вход/Регистрация</ui5-link>}

        </ui5-shellbar>
        <div className="sidenav">
          <ui5-side-navigation id="side-navigation">
              <ui5-side-navigation-item text="Всички пратки" icon="sap-icon://product" id="package/all"></ui5-side-navigation-item>
              <ui5-side-navigation-item text="Заяви пратка" icon="sap-icon://product" id="package/ship"></ui5-side-navigation-item>
              <ui5-side-navigation-item text="Проследи пратка" icon="sap-icon://sys-find" id="package/track"></ui5-side-navigation-item>
              <ui5-side-navigation-item text="Офиси" icon="sap-icon://functional-location" id="offices"></ui5-side-navigation-item>
              <ui5-side-navigation-item text="За компанията" icon="sap-icon://building" id="company"></ui5-side-navigation-item>
          </ui5-side-navigation>          
        </div>
        <ui5-popover id="popover" placement-type="Bottom" horizontal-align="Right" show-arrow="false">
          <div className="popover-content">
            <ui5-list separators="None" >
              <ui5-li icon="settings" id="profile">My account</ui5-li>
              {this.props.user ? <ui5-li icon="log" onClick={this.onLogout}>Sign out</ui5-li> : null}
            </ui5-list>
          </div>
        </ui5-popover>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Navbar);