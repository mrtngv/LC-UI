import React from 'react';
import "./Navbar.css";


class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {   
    };
  }


  render() {
    return (
      <div>
        <ui5-shellbar 
            class="shellbar"
            primary-title="CSCB025"
            secondary-title="Проект логистична компания"
        >
	        <ui5-button icon="menu" slot="startButton" id="startButton"></ui5-button>
        </ui5-shellbar>
        <div className="sidenav">
          <ui5-side-navigation>
              <ui5-side-navigation-item text="Заяви пратка" icon="sap-icon://product"></ui5-side-navigation-item>
              <ui5-side-navigation-item text="Проследи пратка" icon="sap-icon://sys-find"></ui5-side-navigation-item>
              <ui5-side-navigation-item text="Офиси" icon="sap-icon://functional-location"></ui5-side-navigation-item>
              <ui5-side-navigation-item text="За компанията" icon="sap-icon://building"></ui5-side-navigation-item>
          </ui5-side-navigation>          
        </div>
      </div>
    )
  }
}

export default Navbar;