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
import "@ui5/webcomponents-fiori/dist/Wizard.js";
import "@ui5/webcomponents/dist/Title";
import "@ui5/webcomponents/dist/RadioButton";
import "@ui5/webcomponents/dist/Select";
import "@ui5/webcomponents/dist/Option";
import "@ui5/webcomponents/dist/CheckBox";
import "@ui5/webcomponents/dist/TextArea";

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

  getWizardStep(stepId) {
    const wizard = document.getElementById("request-package-wizard");
    return Array.from(wizard.children)[stepId];
  }

  deselectAllWizardSteps() {
    const wizard = document.getElementById("request-package-wizard");
    Array.from(wizard.children).forEach(step => {
      step.selected = false;
    }
      );
  }

  moveToWizardStep(stepId) {
    this.deselectAllWizardSteps();
    const step = this.getWizardStep(stepId);
    step.selected = true;
    step.disabled = false;
  }

  handleInputValue(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  hideButton(buttonId){
    const btn = document.getElementById(buttonId);
    if(btn) {
      btn.style.display="none";
    }   
  }

  declineRequest(){
    this.deselectAllWizardSteps();
    const firstStep = this.getWizardStep(0);
    firstStep.selected = true;
  }

  addEventListeners() {
    const toStep2 = document.getElementById("toSenderButton");
    toStep2.addEventListener("click", () => {
      this.moveToWizardStep(1);
      this.hideButton("toSenderButton");
    } );
    const toStep3 = document.getElementById("toReceiverButton");
    toStep3.addEventListener("click", () => {
      this.moveToWizardStep(2);
      this.hideButton("toReceiverButton");
    } );
    const toStep4 = document.getElementById("toAdditioalDetailsButton");
    toStep4.addEventListener("click", () => {
      this.moveToWizardStep(3);
      this.hideButton("toAdditioalDetailsButton");
    } );
    const toFinalStep = document.getElementById("toFinalizeButton");
    toFinalStep.addEventListener("click", () => {
      this.moveToWizardStep(4);
      this.hideButton("toFinalizeButton");
    } );    
  }

  removeEventListeners() {  
  }

  componentDidMount() {
    this.addEventListeners();
  }

  componentDidUpdate() {
    this.removeEventListeners();
    this.addEventListeners();
  }

  render() {
    return (
      <div className="main-section">
        <ui5-wizard id="request-package-wizard">
          <ui5-wizard-step id="firstStep" icon="product" heading="Данни за пратката" selected>
            <ui5-title>1. Данни за пратката</ui5-title>
            <div id="type-of-package-radio-buttons" className="radio-button-group">
              <ui5-title level="H3">Вид на пратката:</ui5-title>
              <ui5-radiobutton text="Документи" selected></ui5-radiobutton>
              <ui5-radiobutton text="Колет" value-state="None"></ui5-radiobutton>
              <ui5-radiobutton text="Палет" value-state="None"></ui5-radiobutton>
            </div>
            <div id="package-weight">
              <ui5-title level="H3">Тегло на пратката:</ui5-title>
              <ui5-select className="package-weight-select">
                <ui5-option selected>Под 5кг</ui5-option>
                <ui5-option>5-15кг</ui5-option>
                <ui5-option>Над 15кг</ui5-option>
              </ui5-select>
            </div>


            {/* <!-- Move to step 2 --> */}
            <ui5-button id="toSenderButton">Напред</ui5-button>

          </ui5-wizard-step>
          
          <ui5-wizard-step id="secondStep" icon="sap-icon://person-placeholder" heading="Подател" disabled>
            <ui5-title>2. Подател</ui5-title>
            <div id="sender-type-radio-buttons">
              <ui5-radiobutton text="Физическо лице" selected></ui5-radiobutton>
              <ui5-radiobutton text="Фирма" value-state="None"></ui5-radiobutton>
            </div>
            <div className="sender-personal-information">
              <ui5-label for="senderNameInput" required>Име и фамилия:</ui5-label><br />
              <ui5-input id="senderNameInput" placeholder="" required></ui5-input><br />
              <ui5-label for="senderNumberInput" required>Телефон:</ui5-label><br />
              <ui5-input id="senderNumberInput" placeholder="" required></ui5-input><br />
              <ui5-label for="senderEmailInput" required>Имейл:</ui5-label><br />
              <ui5-input id="senderEmailInput" placeholder="" required></ui5-input><br />
              <ui5-label for="senderLocationInput" required>Населено място:</ui5-label><br />
              <ui5-input id="senderLocationInput" show-suggestions placeholder="Започнете да въвеждате град/село"></ui5-input>
            </div>
            <div className="shipped-from">
              <ui5-title level="H3">Откъде изпращате пратката?</ui5-title>
              <ui5-radiobutton text="Адрес" selected></ui5-radiobutton>
              <ui5-radiobutton text="Офис" value-state="None"></ui5-radiobutton><br />
              <ui5-label for="senderAddressInput" required>Адрес:</ui5-label><br />
              <ui5-input id="senderAddressInput" placeholder="" required></ui5-input><br />
            </div>

            {/* <!-- Move to step 3 --> */}
            <ui5-button id="toReceiverButton">Напред</ui5-button>
          </ui5-wizard-step>

          <ui5-wizard-step id="thirdStep" icon="sap-icon://person-placeholder" heading="Получател" disabled>
            <ui5-title>3. Получател</ui5-title>
            <div id="receiver-type-radio-buttons">
              <ui5-radiobutton text="Физическо лице" selected></ui5-radiobutton>
              <ui5-radiobutton text="Фирма" value-state="None"></ui5-radiobutton>
            </div>
            <div className="receiver-personal-information">
              <ui5-label for="receiverNameInput" required>Име и фамилия:</ui5-label><br />
              <ui5-input id="receiverNameInput" placeholder="" required></ui5-input><br />
              <ui5-label for="receiverNumberInput" required>Телефон:</ui5-label><br />
              <ui5-input id="receiverNumberInput" placeholder="" required></ui5-input><br />
              <ui5-label for="receiverEmailInput">Имейл:</ui5-label><br />
              <ui5-input id="receiverEmailInput" placeholder="" required></ui5-input><br />
              <ui5-label for="receiverLocationInput" required>Населено място:</ui5-label><br />
              <ui5-input id="receiverLocationInput" show-suggestions placeholder="Започнете да въвеждате град/село"></ui5-input>
            </div>
            <div className="shipped-from">
              <ui5-title level="H3">До къде изпращате пратката?</ui5-title>
              <ui5-radiobutton text="Адрес" selected></ui5-radiobutton>
              <ui5-radiobutton text="Офис" value-state="None"></ui5-radiobutton><br />
              <ui5-label for="receiverAddressInput" required>Адрес:</ui5-label><br />
              <ui5-input id="receiverAddressInput" placeholder="" required></ui5-input><br />
            </div>

            {/* <!-- Move to step 4 --> */}
            <ui5-button id="toAdditioalDetailsButton" onClick={this.hideButton("toAdditioalDetailsButton")}>Напред</ui5-button>
          </ui5-wizard-step>

          <ui5-wizard-step id="fourthStep" icon="sap-icon://add-product" heading="Допълнително" disabled>
            <ui5-title>4. Допълнителни данни за пратката</ui5-title>
            <div className="additional-package-details">
              <ui5-checkbox text="Чупливо съдържание" value-state="Error"></ui5-checkbox><br />
              <ui5-title level="H3">При невъзможност за доставка:</ui5-title>
              <ui5-radiobutton text="Върни до адрес на подател" selected></ui5-radiobutton>
              <ui5-radiobutton text="Върни до друг адрес"></ui5-radiobutton>
              <ui5-radiobutton text="Върни до офис" value-state="None"></ui5-radiobutton><br />
              <ui5-label for="orderComment">Коментар към заявката:</ui5-label>
              <ui5-textarea id="orderComment" placeholder="Напр. номер на звънец, указавия за доставка..."></ui5-textarea>
            </div>

            {/* <!-- Move to step 5 --> */}
            <ui5-button id="toFinalizeButton" onClick={this.hideButton("toFinalizeButton")}>Напред</ui5-button>
          </ui5-wizard-step>

          <ui5-wizard-step id="finalStep" icon="sap-icon://accept" heading="Финализиране на заявката" disabled>
            <ui5-title>5. Финализиране на заявката:</ui5-title>
            <ui5-title level="H3">Крайна цена:</ui5-title>
            <ui5-title level="H4">00.00лв.</ui5-title>

            <ui5-radiobutton text="Наложен платеж" selected></ui5-radiobutton>
            <ui5-radiobutton text="Плащане с карта" value-state="None"></ui5-radiobutton>
            <ui5-radiobutton text="Цената се поема от получателя" value-state="None"></ui5-radiobutton><br />

            <ui5-button id="sendRequestButton" design="Emphasized">Заяви пратка</ui5-button>
            <ui5-button id="declineRequestButton" design="Negative">Откажи</ui5-button>

          </ui5-wizard-step>     
        </ui5-wizard>        
      </div>
    )
  }
}

export default Package;