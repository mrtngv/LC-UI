import React from 'react';
import Navbar from "./Navbar";
import "./App.css";

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      titleName: ""
    };
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  componentDidMount() {
    this.addEventListeners();
  }

  addEventListeners() {
    const nameInput = document.getElementById("name-input");
    nameInput.addEventListener("input", this.handleNameInput);
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", this.handleSubmitButton);
  }

  handleSubmitButton(event) {
    const oldName = this.state.name;
    this.setState({
      titleName: oldName,
      name: ""
    })
  }

  handleNameInput(event) {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <div>
        <Navbar/>
        <div className="main-section">
          <h1>{this.state.titleName}</h1>
          <ui5-label class="samples-big-margin-right" for="name-input" required>Name</ui5-label>
          <ui5-input id="name-input" placeholder="Enter your Name" value={this.state.name} required></ui5-input>
          <ui5-button id="submit-button" design="Emphasized">Изпрати</ui5-button>
        </div>
      </div>
    )
  }
}

export default App;