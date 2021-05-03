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
import "@ui5/webcomponents-fiori/dist/Wizard.js";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/RadioButton";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/Option";
import Data from './Data.js';

class Package extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senderName: "",
      senderPhone: "",
      senderEmail: "",
      senderAddress: "",
      receiverName: "",
      receiverPhone: "",
      receiverEmail: "",
      receiverAddress: "",
      packageType: "",
      packageWeight: "",
      packagePrice: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }

  componentDidMount() {
    //this.addEventListeners();
  }

  addEventListeners() {

  }

  handleInputValue(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div class="main-section">
        <ui5-wizard id="wiz">
          <ui5-wizard-step icon="product" heading="Данни за пратката" selected>
            <ui5-title>1. Данни за пратката</ui5-title>
            <div id="type-of-package-radio-button" class="radio-button-group">
              <ui5-title level="H3">Вид на пратката:</ui5-title>
              <ui5-radiobutton text="Документи" selected name="GroupC"></ui5-radiobutton>
              <ui5-radiobutton text="Колет" value-state="None" name="GroupC"></ui5-radiobutton>
              <ui5-radiobutton text="Палет" value-state="None" name="GroupC"></ui5-radiobutton>
            </div>
            <div id="package-weight">
              <ui5-title level="H3">Тегло на пратката:</ui5-title>
              <ui5-select class="package-weight-select">
                <ui5-option selected>Под 5кг</ui5-option>
                <ui5-option>5-15кг</ui5-option>
                <ui5-option>Над 15кг</ui5-option>
              </ui5-select>
            </div>


            {/* <!-- Move to step 2 --> */}
            <ui5-button id="toStep2">Step 2</ui5-button>
          </ui5-wizard-step>
        </ui5-wizard>
      </div>
    )
  }
}

export default Package;