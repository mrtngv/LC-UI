import React from 'react';

import "./Navbar.css";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.onNavbarSelect = this.onNavbarSelect.bind(this);
    this.onSignInButtonClick = this.onSignInButtonClick.bind(this);
    this.onProfileItemClick = this.onProfileItemClick.bind(this);
  }

  onNavbarSelect(event) {
    const newRoute = event.detail.item.id;
    this.props.history.push(('/' + newRoute));
  }

  onSidebarCollapse() {
    const sidenav = document.getElementById('side-navigation');
    sidenav.collapsed = !sidenav.collapsed;
  }

  onSignInButtonClick() {
    this.props.history.push("/login");
  }

  onProfileItemClick(event) {
    const pressedListButtonId = event.detail.item.id;
    if (pressedListButtonId === "sign-out") {
      sessionStorage.removeItem("JWT");
      sessionStorage.removeItem("USERNAME");
      this.props.history.push("/login");
    }
  }

  addEventListeners() {
    const navigation = document.getElementById('side-navigation');
    navigation.addEventListener("selection-change", this.onNavbarSelect);
    const onSidebarCollapseButton = document.getElementById('startButton');
    onSidebarCollapseButton.addEventListener('click', this.onSidebarCollapse);

    const popoverOpener = document.getElementById("profile-button");
    const unsignedPopover = document.getElementById("unsigned-popover");
    const signedPopover = document.getElementById("signed-popover");

    popoverOpener.addEventListener("click", () => {
      if (signedPopover) {
        signedPopover.openBy(popoverOpener);
      }
      else {
        if(unsignedPopover){
          unsignedPopover.openBy(popoverOpener);
        }
      }
    });

    const profilePopover = document.getElementById('my-profile-list');
    if (profilePopover) {
      profilePopover.addEventListener("item-click", this.onProfileItemClick);
    }
  }

  removeEventListeners() {
    const navigation = document.getElementById('side-navigation');
    navigation.removeEventListener("selection-change", this.onNavbarSelect);
    const onSidebarCollapseButton = document.getElementById('startButton');
    onSidebarCollapseButton.removeEventListener('click', this.onSidebarCollapse);

    const popoverOpener = document.getElementById("profile-button");
    const unsignedPopover = document.getElementById("unsigned-popover");
    const signedPopover = document.getElementById("signed-popover");

    popoverOpener.removeEventListener("click", () => {
      if (signedPopover) {
        signedPopover.openBy(popoverOpener);
      }
      else {
        if(unsignedPopover){
          unsignedPopover.openBy(popoverOpener);
        }
      }
    });

    const profilePopover = document.getElementById('my-profile-list');
    if (profilePopover) {
      profilePopover.removeEventListener("item-click", this.onProfileItemClick);
    }
  }

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate() {
    this.removeEventListeners();
    this.addEventListeners();
  }

  render() {
    const username = sessionStorage.getItem("USERNAME");
    return (
      <div>
        <ui5-shellbar
          class="shellbar"
          primary-title="CSCB025"
          secondary-title="Проект логистична компания"
        >
          <ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
          <ui5-button id="profile-button" slot="profile" icon="sap-icon://customer"></ui5-button>
        </ui5-shellbar>

        {username ? <ui5-popover id="signed-popover" placement-type="Bottom">
          <div class="popover-header">
            <ui5-title>{username}</ui5-title>
          </div>

          <div class="popover-content">
            <ui5-list id="my-profile-list" separators="None" >
              <ui5-li icon="sys-find">My packages</ui5-li>
              <ui5-li icon="edit">Edit profile</ui5-li>
              <ui5-li icon="sys-help">Help</ui5-li>
              <ui5-li id="sign-out" icon="log">Sign out</ui5-li>
            </ui5-list>
          </div>
        </ui5-popover> :
          <ui5-popover id="unsigned-popover" placement-type="Bottom">
            <ui5-button id="signin-button" onClick={this.onSignInButtonClick}>Вход/Регистрация</ui5-button>
          </ui5-popover>
        }


        <div className="sidenav">
          <ui5-side-navigation id="side-navigation">
            <ui5-side-navigation-item text="Вход/Регистрация" icon="sap-icon://customer" id="login"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="Всички пратки" icon="sap-icon://product" id="package/all"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="Заяви пратка" icon="sap-icon://product" id="package/ship"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="Проследи пратка" icon="sap-icon://sys-find" id="package/track"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="Офиси" icon="sap-icon://functional-location" id="offices"></ui5-side-navigation-item>
            <ui5-side-navigation-item text="За компанията" icon="sap-icon://building" id="company"></ui5-side-navigation-item>
          </ui5-side-navigation>
        </div>
      </div>
    )
  }
}

export default Navbar;