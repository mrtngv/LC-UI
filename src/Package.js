import React from 'react';
import "./Package.css";
import "./Data.js";

import "@ui5/webcomponents-fiori/dist/SideNavigation.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";
import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";
import "@ui5/webcomponents-fiori/dist/ShellBar";
import "@ui5/webcomponents/dist/Icon.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents-icons/dist/Assets.js"
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import Data from './Data.js';

class Package extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      titleName: ""
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  componentDidMount() {
    this.addEventListeners();
  }

  addEventListeners() {
    const nameInput = document.getElementById("name");
    nameInput.addEventListener("input", this.handleInput);
    const lnameInput = document.getElementById("lastName");
    lnameInput.addEventListener("input", this.handleInput);
    const pnameInput = document.getElementById("phone");
    pnameInput.addEventListener("input", this.handleInput);
    const enameInput = document.getElementById("email");
    enameInput.addEventListener("input", this.handleInput);
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", this.handleSubmitButton);
  }

  handleSubmitButton(event) {
    let person = {
      firstName: this.state.name,
      familyName: this.state.lastName,
      phone: this.state.phone,
      email: this.state.email
    }
    Data.unshift(person);
  }

  handleInput(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="main-section">
          <ui5-input id="name" placeholder="Enter your Name" value={this.state.name} required></ui5-input>
          <ui5-input id="lastName" placeholder="Enter your Last Name" value={this.state.lastName} required></ui5-input>
          <ui5-input id="phone" placeholder="Enter your Name" value={this.state.phone} required></ui5-input>
          <ui5-input id="email" placeholder="Enter your Name" value={this.state.email} required></ui5-input>
          <ui5-button id="submit-button" design="Emphasized">Изпрати</ui5-button>
        </div>

        <ui5-table class="demo-table" id="table">
          <ui5-table-column slot="columns">
            <span >First Name</span>
          </ui5-table-column>

          <ui5-table-column slot="columns" min-width="800" popin-text="Supplier">
            <span >Family Name</span>
          </ui5-table-column>

          <ui5-table-column slot="columns" min-width="600" popin-text="Dimensions" demand-popin>
            <span >Phone Number</span>
          </ui5-table-column>

          <ui5-table-column slot="columns" min-width="600" popin-text="Weight" demand-popin>
            <span >E-Mail Address</span>
          </ui5-table-column>
          {Data.map(user =>
            <ui5-table-row key={user.id}>
              <ui5-table-cell>
                {user.firstName}
              </ui5-table-cell>
              <ui5-table-cell>
                {user.familyName}
              </ui5-table-cell>
              <ui5-table-cell>
                {user.phone}
              </ui5-table-cell>
              <ui5-table-cell>
                {user.email}
              </ui5-table-cell>
            </ui5-table-row>)}
        </ui5-table>
      </div>
    )
  }
}

export default Package;