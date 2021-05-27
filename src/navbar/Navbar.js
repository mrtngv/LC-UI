import React from 'react';
import "./Navbar.css";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onNavbarSelect = this.onNavbarSelect.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
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
  sessionStorage.removeItem("user");
  window.location.reload();
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
    if (profile) {
      profile.addEventListener("click", () => { this.props.history.push('/profile') });
    }
}

componentDidMount() {
  this.addEventListeners();
}

  render() {
  const user = JSON.parse(sessionStorage.getItem('user'));
    return (
      <div>
        <ui5-shellbar 
            className="shellbar"
            id="shellbar"
            primary-title="CSCB025"
            secondary-title="Проект логистична компания"
        >
          <ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
          <ui5-avatar id="nav-profile" initials={user ? user.username.charAt(0).toUpperCase() : ''} icon={user ? '' : "customer"} slot="profile"></ui5-avatar>

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
              {user ? <ui5-li icon="settings" id="profile">Профил</ui5-li> : <ui5-li icon="settings" onClick={this.onLogin}>Вход/Регистрация</ui5-li>}
              {user ? <ui5-li icon="log" onClick={this.onLogout}>Изход</ui5-li> : null}
            </ui5-list>
          </div>
        </ui5-popover>
      </div>
    )
  }
}

export default Navbar;