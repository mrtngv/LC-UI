import React from 'react';
import axios from 'axios';

import "./Package.css";
import "./Data.js";
import { DOMAIN } from ".././constants/Domain.js";
import { OFFICES } from ".././constants/Endpoints.js";

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
import "@ui5/webcomponents/dist/DatePicker";


class Package extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      senderFirstName: "",
      senderLastName: "",
      isSenderFirm: false,
      senderFirmName: "",
      senderPhone: "",
      senderEmail: "",
      senderCity: "",
      senderAddress: "",
      sentFromOffice: false,
      receiverFirstName: "",
      receiverLastName: "",
      isReceiverFirm: false,
      receiverFirmName: "",
      receiverPhone: "",
      receiverEmail: "",
      receiverCity: "",
      receiverAddress: "",
      sentToOffice: false,
      packageType: "DOCUMENTS",
      packageWeight: 3,
      isFragile: false,
      returnToOffice: true,
      ifDeliveryImpossible: "RETURN TO OFFICE",
      alternativeCity: "",
      alternativeAddress: "",
      requestComment: "",
      paymentMethod: "CASH",
      requestDate: this.getTodayDate(),
      deliveryDate: this.getTodayDate(),
      allOfficeCities: [],
      offices: [],
      loggedUserEmail: ""
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleSenderSuggestionInputValue = this.handleSenderSuggestionInputValue.bind(this);
    this.handleReceiverSuggestionInputValue = this.handleReceiverSuggestionInputValue.bind(this);
    this.handleAlternativeSuggestionInputValue = this.handleAlternativeSuggestionInputValue.bind(this);
    this.handleSelectionValue = this.handleSelectionValue.bind(this);
    this.handleCheckboxValue = this.handleCheckboxValue.bind(this);
    this.onRequestSend = this.onRequestSend.bind(this);
    this.declineRequest = this.declineRequest.bind(this);
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

  handleSenderSuggestionInputValue(event) {
    const isChecked = this.state.sentFromOffice;

    if (isChecked) {
      let city_database_entries = this.state.allOfficeCities;

      const value = event.target.value;

      var suggestionItems = [];


      if (value) {
        suggestionItems = city_database_entries.filter(item => {
          return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
      }

      [].slice.call(event.target.children).forEach(child => {
        event.target.removeChild(child);
      });

      suggestionItems.forEach(item => {
        var li = document.createElement("ui5-suggestion-item");
        li.icon = "world";
        li.text = item;
        event.target.appendChild(li);
      });

      const locationa = this.state.offices.find(o => o.city === event.target.value);
      if (locationa) {

        this.setState({
          [event.target.name]: event.target.value,
          senderAddress: locationa.location
        });
      } else {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    }

    else {


      let city_database_entries = ["Благоевград", "Бургас", "Варна", "Велико Търново", "Видин", "Враца", "Габрово", "Добрич",
        "Кърджали", "Кюстендил", "Ловеч", "Монтана", "Пазарджик", "Перник", "Плевен", "Пловдив", "Разград", "Русе", "Силистра",
        "Сливен", "Смолян", "София-град", "София-област", "Стара Загора", "Търговище", "Хасково", "Шумен", "Ямбол"];

      const value = event.target.value;

      var suggestionItems = [];


      if (value) {
        suggestionItems = city_database_entries.filter(item => {
          return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
      }

      [].slice.call(event.target.children).forEach(child => {
        event.target.removeChild(child);
      });

      suggestionItems.forEach(item => {
        var li = document.createElement("ui5-suggestion-item");
        li.icon = "world";
        li.text = item;
        event.target.appendChild(li);
      });

      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  handleReceiverSuggestionInputValue(event) {
    const isChecked = this.state.sentToOffice;

    if (isChecked) {
      let city_database_entries = this.state.allOfficeCities;

      const value = event.target.value;

      var suggestionItems = [];


      if (value) {
        suggestionItems = city_database_entries.filter(item => {
          return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
      }

      [].slice.call(event.target.children).forEach(child => {
        event.target.removeChild(child);
      });

      suggestionItems.forEach(item => {
        var li = document.createElement("ui5-suggestion-item");
        li.icon = "world";
        li.text = item;
        event.target.appendChild(li);
      });

      const locationa = this.state.offices.find(o => o.city === event.target.value);
      if (locationa) {

        this.setState({
          [event.target.name]: event.target.value,
          receiverAddress: locationa.location
        });
      } else {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    }

    else {


      let city_database_entries = ["Благоевград", "Бургас", "Варна", "Велико Търново", "Видин", "Враца", "Габрово", "Добрич",
        "Кърджали", "Кюстендил", "Ловеч", "Монтана", "Пазарджик", "Перник", "Плевен", "Пловдив", "Разград", "Русе", "Силистра",
        "Сливен", "Смолян", "София-град", "София-област", "Стара Загора", "Търговище", "Хасково", "Шумен", "Ямбол"];

      const value = event.target.value;

      var suggestionItems = [];


      if (value) {
        suggestionItems = city_database_entries.filter(item => {
          return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
      }

      [].slice.call(event.target.children).forEach(child => {
        event.target.removeChild(child);
      });

      suggestionItems.forEach(item => {
        var li = document.createElement("ui5-suggestion-item");
        li.icon = "world";
        li.text = item;
        event.target.appendChild(li);
      });

      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  handleAlternativeSuggestionInputValue(event) {
    const isChecked = this.state.returnToOffice;

    if (isChecked) {
      let city_database_entries = this.state.allOfficeCities;

      const value = event.target.value;

      var suggestionItems = [];


      if (value) {
        suggestionItems = city_database_entries.filter(item => {
          return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
      }

      [].slice.call(event.target.children).forEach(child => {
        event.target.removeChild(child);
      });

      suggestionItems.forEach(item => {
        var li = document.createElement("ui5-suggestion-item");
        li.icon = "world";
        li.text = item;
        event.target.appendChild(li);
      });

      const locationa = this.state.offices.find(o => o.city === event.target.value);
      if (locationa) {

        this.setState({
          [event.target.name]: event.target.value,
          alternativeAddress: locationa.location
        });
      } else {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }

    }

    else {


      let city_database_entries = ["Благоевград", "Бургас", "Варна", "Велико Търново", "Видин", "Враца", "Габрово", "Добрич",
        "Кърджали", "Кюстендил", "Ловеч", "Монтана", "Пазарджик", "Перник", "Плевен", "Пловдив", "Разград", "Русе", "Силистра",
        "Сливен", "Смолян", "София-град", "София-област", "Стара Загора", "Търговище", "Хасково", "Шумен", "Ямбол"];

      const value = event.target.value;

      var suggestionItems = [];


      if (value) {
        suggestionItems = city_database_entries.filter(item => {
          return item.toUpperCase().indexOf(value.toUpperCase()) === 0;
        });
      }

      [].slice.call(event.target.children).forEach(child => {
        event.target.removeChild(child);
      });

      suggestionItems.forEach(item => {
        var li = document.createElement("ui5-suggestion-item");
        li.icon = "world";
        li.text = item;
        event.target.appendChild(li);
      });

      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  handleSelectionValue(event) {
    if (event.target.name === "ifDeliveryImpossible") {
      if (event.target.selectedOption.value === "RETURN TO ADDRESS") {
        this.setState({
          returnToOffice: false,
          alternativeCity: this.state.senderCity,
          alternativeAddress: this.state.senderAddress
        });
      }
      else if (event.target.selectedOption.value === "DIFFERENT ADDRESS") {
        this.setState({
          returnToOffice: false
        });
      }
    }
    this.setState({
      [event.target.name]: event.target.selectedOption.value
    });
  }

  handleCheckboxValue(event) {

    this.setState({
      [event.target.name]: event.target.checked
    });
  }

  calculatePrice() {
    const basePrice = 1.50;
    const homeDelivery = 2.00;
    const pricerPerKg = 0.30;

    let samplePrice = basePrice + (this.state.packageWeight * pricerPerKg);

    if (!this.state.sentFromOffice) {
      samplePrice += homeDelivery;
    }
    if (!this.state.sentToOffice) {
      samplePrice += homeDelivery;
    }
    if (this.state.ifDeliveryImpossible === "DIFFERENT ADDRESS") {
      samplePrice += homeDelivery;
    }

    samplePrice = samplePrice.toFixed(2);

    return samplePrice;
  }

  hideButton(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
      btn.style.display = "none";
    }
  }

  getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  getMinimumDeliveryDate() {
    var minDate = new Date();
    var dd = String(minDate.getDate() + 3).padStart(2, '0');
    var mm = String(minDate.getMonth() + 1).padStart(2, '0');
    var yyyy = minDate.getFullYear();

    minDate = yyyy + '-' + mm + '-' + dd;
    return minDate;
  }

  getMaximumDeliveryDate() {
    var maxDate = new Date();
    var dd = String(maxDate.getDate()).padStart(2, '0');
    var mm = String(maxDate.getMonth() + 2).padStart(2, '0');
    var yyyy = maxDate.getFullYear();

    maxDate = yyyy + '-' + mm + '-' + dd;
    return maxDate;
  }

  onRequestSend() {
    const url = 'http://localhost:8080/api/packages';

    try {
      const email = JSON.parse(sessionStorage.getItem('user')).email;
      this.setState({
        loggedUserEmail: email
      })
    }
    catch (e) {}

    const packageDetails = {
      "senderFirstName": this.state.senderFirstName,
      "senderLastName": this.state.senderLastName,
      "isFirm": this.state.isSenderFirm,
      "firmName": this.state.senderFirmName,
      "senderTelephoneNumber": this.state.senderPhone,
      "senderEmail": this.state.senderEmail,
      "fromCity": this.state.senderCity,
      "toFirm": true,//this.state.isReceiverFirm,
      "fromAddress": this.state.senderAddress,
      "fromOffice": this.state.sentFromOffice,
      "receiverFirstName": this.state.receiverFirstName,
      "receiverLastName": this.state.receiverLastName,
      "toFirmName": this.state.receiverFirmName,
      "receiverTelephoneNumber": this.state.receiverPhone,
      "receiverEmail": this.state.receiverEmail,
      "toCity": this.state.receiverCity,
      "toAddress": this.state.receiverAddress,
      "toOffice": this.state.sentToOffice, //bool
      "ePackageType": this.state.packageType,
      "weight": this.state.packageWeight,
      "isFragile": this.state.isFragile,
      "returnToOffice": this.state.returnToOffice,
      "alternativeCity": this.state.alternativeCity,
      "returnLocation": this.state.alternativeAddress,
      "comment": this.state.requestComment,
      "ePayMethod": this.state.paymentMethod,
      "dateOfDelivery": this.state.deliveryDate,
      "dateOfSending": this.state.requestDate
      //"userEmail": this.state.loggedUserEmail
    }

    // const packageDetails = {
    //   "senderFirstName": "Екатерина",
    //   "senderLastName": "Герасимова",
    //   "isFirm": false,
    //   "firmName": "",
    //   "senderTelephoneNumber": "0887898989",
    //   "senderEmail": "kati@mail.bg",
    //   "fromCity": this.state.senderCity,
    //   "toFirm": false,//this.state.isReceiverFirm,
    //   "fromAddress": this.state.senderAddress,
    //   "fromOffice": this.state.sentFromOffice,
    //   "receiverFirstName": "Martin",
    //   "receiverLastName": "Georgiev",
    //   "toFirmName": "",
    //   "receiverTelephoneNumber": "088787878",
    //   "receiverEmail": this.state.receiverEmail,
    //   "toCity": this.state.receiverCity,
    //   "toAddress": this.state.receiverAddress,
    //   "toOffice": this.state.sentToOffice, //bool
    //   "ePackageType": this.state.packageType,
    //   "weight": this.state.packageWeight,
    //   "isFragile": this.state.isFragile,
    //   "returnToOffice": this.state.returnToOffice,
    //   "alternativeCity": this.state.alternativeCity,
    //   "returnLocation": this.state.alternativeAddress,
    //   "comment": this.state.requestComment,
    //   "ePayMethod": this.state.paymentMethod,
    //   "dateOfDelivery": this.state.deliveryDate,
    //   "dateOfSending": this.state.requestDate
    // }

    axios.post(url, packageDetails).then(res => {
      this.props.history.push("/");
    });
  }

  declineRequest() {
    console.log(this.state.senderFirmName + this.state.senderLastName);
  }

  addEventListeners() {
    const toStep2 = document.getElementById("toSenderButton");
    toStep2.addEventListener("click", () => {
      this.moveToWizardStep(1);
      this.hideButton("toSenderButton");
    });
    const toStep3 = document.getElementById("toReceiverButton");
    toStep3.addEventListener("click", () => {
      this.moveToWizardStep(2);
      this.hideButton("toReceiverButton");
    });
    const toStep4 = document.getElementById("toAdditioalDetailsButton");
    toStep4.addEventListener("click", () => {
      this.moveToWizardStep(3);
      this.hideButton("toAdditioalDetailsButton");
    });
    const toFinalStep = document.getElementById("toFinalizeButton");
    toFinalStep.addEventListener("click", () => {
      this.moveToWizardStep(4);
      this.hideButton("toFinalizeButton");
    });

    document.querySelectorAll('.selection').forEach(item => {
      item.addEventListener("change", this.handleSelectionValue);
    })

    document.querySelectorAll('.checkbox').forEach(item => {
      item.addEventListener("change", this.handleCheckboxValue);
    })

    document.querySelectorAll('.input').forEach(item => {
      item.addEventListener("change", this.handleInputValue);
    })

    document.querySelectorAll("ui5-messagestrip").forEach(messageStrip => {
      messageStrip.addEventListener("close", () => {
        messageStrip.parentNode.removeChild(messageStrip);
      });
    });

    const senderSuggestionInput = document.getElementById("senderLocationInput");
    if (senderSuggestionInput) {
      senderSuggestionInput.addEventListener("input", this.handleSenderSuggestionInputValue);
    }

    const receiverSuggestionInput = document.getElementById("receiverLocationInput");
    if (receiverSuggestionInput) {
      receiverSuggestionInput.addEventListener("input", this.handleReceiverSuggestionInputValue);
    }

    const alternativeSuggestionInput = document.getElementById("alternativeLocationInput");
    if (alternativeSuggestionInput) {
      alternativeSuggestionInput.addEventListener("input", this.handleAlternativeSuggestionInputValue);
    }


    const sendRequestButton = document.getElementById("sendRequestButton");
    if (sendRequestButton) {
      sendRequestButton.addEventListener("click", this.onRequestSend);
    }

    const declineRequestButton = document.getElementById("declineRequestButton");
    if (declineRequestButton) {
      declineRequestButton.addEventListener("click", this.declineRequest);
    }
  }

  removeEventListeners() {
    document.querySelectorAll('.selection').forEach(item => {
      item.removeEventListener("change", this.handleSelectionValue);
    })

    document.querySelectorAll('.input').forEach(item => {
      item.removeEventListener("change", this.handleInputValue);
    })


    document.querySelectorAll('.checkbox').forEach(item => {
      item.removeEventListener("change", this.handleCheckboxValue);
    })

    const senderSuggestionInput = document.getElementById("senderLocationInput");
    if (senderSuggestionInput) {
      senderSuggestionInput.removeEventListener("input", this.handleSenderSuggestionInputValue);
    }

    const receiverSuggestionInput = document.getElementById("receiverLocationInput");
    if (receiverSuggestionInput) {
      receiverSuggestionInput.removeEventListener("input", this.handleReceiverSuggestionInputValue);
    }

    const alternativeSuggestionInput = document.getElementById("alternativeLocationInput");
    if (alternativeSuggestionInput) {
      alternativeSuggestionInput.removeEventListener("input", this.handleAlternativeSuggestionInputValue);
    }

    const sendRequestButton = document.getElementById("sendRequestButton");
    if (sendRequestButton) {
      sendRequestButton.removeEventListener("click", this.onRequestSend);
    }

    const declineRequestButton = document.getElementById("declineRequestButton");
    if (declineRequestButton) {
      declineRequestButton.removeEventListener("click", this.declineRequest);
    }
  }

  componentDidMount() {
    this.addEventListeners();

    const URL = DOMAIN + OFFICES;

    axios.get(URL).then(o => {
      const officesCity = [...new Set(o.data.map(c => c["city"]))];
      this.setState({
        allOfficeCities: officesCity,
        offices: o.data
      });
    })
  }

  componentDidUpdate() {
    this.removeEventListeners();
    this.addEventListeners();
  }

  render() {
    let averagePrice = this.calculatePrice();
    console.log(this.state);
    return (
      <div className="main-section">
        <ui5-wizard id="request-package-wizard">
          <ui5-wizard-step id="firstStep" icon="product" heading="Данни за пратката" selected>
            <div className="step-first-distance">
              <ui5-title class="step-title">1. Данни за пратката</ui5-title>
              <ui5-title class="sub-title" level="H4">Вид на пратката:</ui5-title>
              <ui5-select class="selection" name="packageType" id="package-type-select">
                <ui5-option selcted value="DOCUMENTS">Документи</ui5-option>
                <ui5-option value="BOX">Кашон</ui5-option>
                <ui5-option value="PALLET">Палет</ui5-option>
              </ui5-select>
              <div id="package-weight">
                <ui5-title class="sub-title" level="H4">Тегло на пратката:</ui5-title>
                <ui5-select class="selection" name="packageWeight" id="package-weight-select">
                  <ui5-option value="3" selected>Под 5кг</ui5-option>
                  <ui5-option value="10">5-15кг</ui5-option>
                  <ui5-option value="16">Над 15кг</ui5-option>
                </ui5-select>
              </div>


              {/* <!-- Move to step 2 --> */}
              <ui5-button class="to-step-button" id="toSenderButton">Напред</ui5-button>
            </div>
          </ui5-wizard-step>

          <ui5-wizard-step id="secondStep" icon="sap-icon://person-placeholder" heading="Подател" disabled>
            <div className="step-distance">
              <ui5-title class="step-title">2. Подател</ui5-title>
              <div className="step-two-container">
                <ui5-title level="H4">Лични данни:</ui5-title>
                <ui5-checkbox class="checkbox" id="is-firm-checkbox" name="isSenderFirm" text="Искам да изпратя от името на фирма"></ui5-checkbox><br />
                <div className="sender-personal-information">
                  {this.state.isSenderFirm === true ?
                    <div>
                      <ui5-label for="firmNameInput" required>Име на фирма:</ui5-label><br />
                      <ui5-input class="input" id="firmNameInput" name="senderFirmName" placeholder="" required></ui5-input><br />
                      <div className="flex-container-input">
                        <div>
                          <ui5-label for="senderFirstNameInput" required>Име на упълномощено лице:</ui5-label><br />
                          <ui5-input class="input" id="senderFirstNameInput" name="senderFirstName" placeholder="" required></ui5-input><br />
                        </div>
                        <div className="second-flex-input-item">
                          <ui5-label for="senderLastNameInput" required>Фамилия на упълномощено лице:</ui5-label><br />
                          <ui5-input class="input" id="senderLastNameInput" name="senderLastName" placeholder="" required></ui5-input><br />
                        </div>
                      </div>
                    </div> :
                    <div className="flex-container-input">
                      <div>
                        <ui5-label for="senderFirstNameInput" required>Име:</ui5-label><br />
                        <ui5-input class="input" id="senderFirstNameInput" name="senderFirstName" placeholder="" required></ui5-input><br />
                      </div>
                      <div className="second-flex-input-item">
                        <ui5-label for="senderLastNameInput" required>Фамилия:</ui5-label><br />
                        <ui5-input class="input" id="senderLastNameInput" name="senderLastName" placeholder="" required></ui5-input><br />
                      </div>
                    </div>
                  }
                  <div className="flex-container-input">
                    <div>
                      <ui5-label for="senderNumberInput" required>Телефон:</ui5-label><br />
                      <ui5-input class="input" id="senderNumberInput" name="senderPhone" placeholder="" required></ui5-input><br />
                    </div>
                    <div className="second-flex-input-item">
                      <ui5-label for="senderEmailInput" required>Имейл:</ui5-label><br />
                      <ui5-input class="input" id="senderEmailInput" name="senderEmail" placeholder="" required></ui5-input><br />
                    </div>
                  </div>
                </div>
                <ui5-title level="H4">Откъде изпращате пратката?</ui5-title>
                <ui5-checkbox class="checkbox" id="is-from-office-checkbox" name="sentFromOffice" text="Искам да изпратя от офис"></ui5-checkbox><br />
                <div className="flex-container-input">
                  <div>
                    <ui5-label for="senderLocationInput" required>Населено място:</ui5-label><br />
                      <ui5-input class="suggestion-input" id="senderLocationInput" show-suggestions name="senderCity" placeholder="Започнете да въвеждате населено място"></ui5-input>
                  </div>
                  {this.state.sentFromOffice === true ?
                    <div className="second-flex-input-item">
                      <ui5-label for="senderAddress" required>Офис:</ui5-label><br />
                      {/* ! ще се взимат офисите от бекенда като са готови */}
                      <ui5-select class="selection" name="senderAddress" placeholder="Choose office">
                        {/* <ui5-option value="" selected></ui5-option> */}
                        {this.state.offices.filter(o => o.city === this.state.senderCity).map(o => {
                          return (
                            <ui5-option value={o.location}>{o.location}</ui5-option>
                          )
                        })}
                      </ui5-select>
                    </div> :
                    <div className="second-flex-input-item">
                      <ui5-label for="senderAddressInput" required>Адрес:</ui5-label><br />
                      <ui5-input class="input" id="senderAddressInput" name="senderAddress" placeholder="" required></ui5-input><br />
                    </div>}
                </div>
              </div>

              {/* <!-- Move to step 3 --> */}
              <ui5-button class="to-step-button" id="toReceiverButton">Напред</ui5-button>
            </div>
          </ui5-wizard-step>

          <ui5-wizard-step id="thirdStep" icon="sap-icon://person-placeholder" heading="Получател" disabled>
            <div className="step-distance">
              <ui5-title class="step-title">3. Получател</ui5-title>
              <ui5-title level="H4">Лични данни:</ui5-title>
              <ui5-checkbox class="checkbox" id="is-firm-checkbox" name="isReceiverFirm" text="Искам да изпратя до фирма"></ui5-checkbox><br />
              <div className="receiver-personal-information">
                {this.state.isReceiverFirm === true ?
                  <div>
                    <ui5-label for="receiverFirmNameInput" required>Име на фирма:</ui5-label><br />
                    <ui5-input class="input" id="receiverFirmNameInput" name="receiverFirmName" placeholder="" required></ui5-input><br />
                    <div className="flex-container-input">
                      <div>
                        <ui5-label for="receiverFirstNameInput" required>Име на упълномощено лице:</ui5-label><br />
                        <ui5-input class="input" id="receiverFirstNameInput" name="receiverFirstName" placeholder="" required></ui5-input><br />
                      </div>
                      <div className="second-flex-input-item">
                        <ui5-label for="receiverLastNameInput" required>Фамилия на упълномощено лице:</ui5-label><br />
                        <ui5-input class="input" id="receiverLastNameInput" name="receiverLastName" placeholder="" required></ui5-input><br />
                      </div>
                    </div>
                  </div> :
                  <div className="flex-container-input">
                    <div>
                      <ui5-label for="receiverFirstNameInput" required>Име:</ui5-label><br />
                      <ui5-input class="input" id="receiverFirstNameInput" name="receiverFirstName" placeholder="" required></ui5-input><br />
                    </div>
                    <div className="second-flex-input-item">
                      <ui5-label for="receiverLastNameInput" required>Фамилия:</ui5-label><br />
                      <ui5-input class="input" id="receiverLastNameInput" name="receiverLastName" placeholder="" required></ui5-input><br />
                    </div>
                  </div>
                }
                <div className="flex-container-input">
                  <div>
                    <ui5-label for="receiverNumberInput" required>Телефон:</ui5-label><br />
                    <ui5-input class="input" id="receiverNumberInput" name="receiverPhone" placeholder="" required></ui5-input><br />
                  </div>
                  <div className="second-flex-input-item">
                    <ui5-label for="receiverEmailInput">Имейл:</ui5-label><br />
                    <ui5-input class="input" id="receiverEmailInput" name="receiverEmail" placeholder="" required></ui5-input><br />
                  </div>
                </div>
              </div>
              <ui5-title level="H4">До къде изпращате пратката?</ui5-title>
              <ui5-checkbox class="checkbox" id="is-to-office-checkbox" name="sentToOffice" text="Искам да изпратя до офис"></ui5-checkbox><br />
              <div className="flex-container-input">
                <div>
                  <ui5-label for="receiverLocationInput" required>Населено място:</ui5-label><br />
                  <ui5-input class="suggestion-input" id="receiverLocationInput" show-suggestions name="receiverCity" placeholder="Започнете да въвеждате населено място"></ui5-input>
                </div>
                {this.state.sentToOffice === true ?
                  <div className="second-flex-input-item">
                    <ui5-label for="receiverAddress" required>Офис:</ui5-label><br />
                    {/* ! ще се взимат офисите от бекенда като са готови */}
                    <ui5-select class="selection" name="receiverAddress">
                      {this.state.offices.filter(o => o.city === this.state.receiverCity).map(o => {
                        return (
                          <ui5-option value={o.location}>{o.location}</ui5-option>
                        )
                      })}
                    </ui5-select>
                  </div> :
                  <div className="second-flex-input-item">
                    <ui5-label for="receiverAddressInput" required>Адрес:</ui5-label><br />
                    <ui5-input class="input" id="receiverAddressInput" name="receiverAddress" placeholder="" required></ui5-input><br />
                  </div>}
              </div>

              {/* <!-- Move to step 4 --> */}
              <ui5-button class="to-step-button" id="toAdditioalDetailsButton" >Напред</ui5-button>
            </div>
          </ui5-wizard-step>

          <ui5-wizard-step id="fourthStep" icon="sap-icon://add-product" heading="Допълнително" disabled>
            <div className="step-distance">
              <ui5-title class="step-title">4. Допълнителни данни за пратката</ui5-title>
              <div className="additional-package-details">
                <ui5-title class="sub-title" level="H4">При невъзможност за доставка:</ui5-title>
                <ui5-select class="selection" name="ifDeliveryImpossible" id="delivery-impossible-select">
                  <ui5-option value="RETURN TO OFFICE" selected>Върни до наш офис</ui5-option>
                  <ui5-option value="RETURN TO ADDRESS">Върни до адрес на подателя</ui5-option>
                  <ui5-option value="DIFFERENT ADDRESS">Върни до друг адрес</ui5-option>
                </ui5-select><br />
                {(this.state.ifDeliveryImpossible === "DIFFERENT ADDRESS" || this.state.ifDeliveryImpossible === "RETURN TO OFFICE") &&
                  <div className="flex-container-input">
                    <div>
                      <ui5-label for="alternativeLocationInput" required>Населено място:</ui5-label><br />
                      <ui5-input class="suggestion-input" id="alternativeLocationInput" show-suggestions name="alternativeCity" placeholder="Започнете да въвеждате населено място"></ui5-input>
                    </div>
                    {this.state.ifDeliveryImpossible === "RETURN TO OFFICE" ?
                      <div className="second-flex-input-item">
                        <ui5-label for="alternativeAddress" required>Офис:</ui5-label><br />
                        {/* ! ще се взимат офисите от бекенда като са готови */}
                        <ui5-select class="selection" name="alternativeAddress">
                          {this.state.offices.filter(o => o.city === this.state.alternativeCity).map(o => {
                            return (
                              <ui5-option value={o.location}>{o.location}</ui5-option>
                            )
                          })}
                        </ui5-select>
                      </div> :
                      <div className="second-flex-input-item">
                        <ui5-label for="alternativeAddressInput" required>Адрес:</ui5-label><br />
                        <ui5-input class="input" id="alternativeAddressInput" name="alternativeAddress" placeholder="" required></ui5-input><br />
                      </div>}
                  </div>}
                <ui5-title level="H4">Допълнителни грижи за пратката:</ui5-title>
                <ui5-checkbox class="checkbox" id="is-fragile" name="isFragile" text="Чупливо съдържание" ></ui5-checkbox><br />
                <ui5-checkbox class="checkbox" id="email-notif" name="emailNotifications" text="Искам да получавам имейл известия за статуса на пратката" checked ></ui5-checkbox><br />
                <ui5-label for="orderComment">Коментар към заявката:</ui5-label><br />
                <ui5-textarea class="input" id="orderComment" name="requestComment" placeholder="Напр. номер на звънец, указания за доставка..."></ui5-textarea><br />
                <div className="flex-container-input">
                  <div>
                    <ui5-title class="sub-title" level="H4">Дата на изпращане:</ui5-title>
                    <ui5-date-picker class="input" format-pattern='yyyy-MM-dd' name="requestDate" value={this.state.requestDate}
                      min-date={this.state.requestDate} max-date={this.getMaximumDeliveryDate()}></ui5-date-picker><br />
                  </div>
                  <div className="second-flex-input-item">
                    <ui5-title class="sub-title" level="H4">Желана дата на доставка:</ui5-title>
                    <ui5-date-picker class="input" format-pattern='yyyy-MM-dd' name="deliveryDate" value="Веднага (1-3 работни дни)"
                      min-date={this.getMinimumDeliveryDate()} max-date={this.getMaximumDeliveryDate()}></ui5-date-picker><br />
                  </div>
                </div>
              </div>

              {/* <!-- Move to step 5 --> */}
              <ui5-button class="to-step-button" id="toFinalizeButton" >Напред</ui5-button>
            </div>
          </ui5-wizard-step>

          <ui5-wizard-step id="finalStep" icon="sap-icon://accept" heading="Финализиране на заявката" disabled>
            <div className="step-distance">
              <ui5-title class="step-title">5. Финализиране на заявката:</ui5-title>
              <ui5-messagestrip id="first-message-strip" type="Warning">Цената не е крайна и подлежи на промяна след измерване теглото на пратката (0.30лв/кг).</ui5-messagestrip>
              <ui5-messagestrip class="message-strip" type="Information">Заплащането се извършва на място (на куриер или в офис).</ui5-messagestrip>
              <span className="final-price-span">
                <ui5-title class="sub-title" level="H4">Ориентировъчна цена:</ui5-title>
                <ui5-title class="sub-title" id="final-price" level="H4"> {averagePrice}лв.</ui5-title>
              </span>
              <ui5-title class="sub-title" level="H4">Начин на плащане:</ui5-title>
              <ui5-select class="selection" name="paymentMethod" id="payment-select">
                <ui5-option value="CASH" icon="sap-icon://money-bills" selected>Наложен платеж</ui5-option>
                <ui5-option value="CARD" icon="sap-icon://credit-card">Карта</ui5-option>
                <ui5-option value="RECEIVER_CASH" icon="sap-icon://customer-and-supplier">Цената се поема от получателя</ui5-option>
              </ui5-select><br />
              <ui5-button class="to-step-button" id="sendRequestButton" design="Emphasized">Заяви пратка</ui5-button>
              <ui5-button class="to-step-button" id="declineRequestButton" design="Negative">Откажи</ui5-button>
            </div>
          </ui5-wizard-step>
        </ui5-wizard>
      </div>
    )
  }
}

export default Package;