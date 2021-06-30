import React from 'react';
import axios from 'axios';

import "./EditAllPackages.css";
import { DOMAIN } from ".././constants/Domain.js";
import { OFFICES } from ".././constants/Endpoints.js";
import { mapPackageStatus } from ".././constants/MapPackageStatus";

import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js"
import "@ui5/webcomponents/dist/Badge";

class EditAllPackages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accessToken: JSON.parse(sessionStorage.getItem('user')).accessToken,
            package: {},
            allOfficeCities: [],
            offices: [],
            senderTelephoneNumber: "",
            receiverTelephoneNumber: "",
            toAddress: "",
            toOffice: false,
            returnToOffice: false,
            returnLocation: "",
            dateOfDelivery: "",
            toCity: "",
            alternativeCity: "",
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleReceiverSuggestionInputValue = this.handleReceiverSuggestionInputValue.bind(this);
        this.handleAlternativeSuggestionInputValue = this.handleAlternativeSuggestionInputValue.bind(this);
        this.handleSelectionValue = this.handleSelectionValue.bind(this);
        this.handleCheckboxValue = this.handleCheckboxValue.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    onSubmit() {
        const URL = DOMAIN + "api/packages";
        const id = this.state.package.id;
        const packageDetails = {
            id: id,
            senderTelephoneNumber: this.state.senderTelephoneNumber,
            receiverTelephoneNumber: this.state.receiverTelephoneNumber,
            toAddress: this.state.toAddress,
            toOffice: this.state.toOffice,
            returnToOffice: this.state.returnToOffice,
            returnLocation: this.state.returnLocation,
            dateOfDelivery: this.state.dateOfDelivery,
            toCity: this.state.toCity,
            alternativeCity: this.state.alternativeCity
        }

        axios.put(URL, packageDetails, {
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        }).then(res => {
            this.setState({
                requestPosted: true
            });
        });
    }

    onCancel() {
        this.props.history.push('/package/all');
    }

    handleReceiverSuggestionInputValue(event) {
        const isChecked = this.state.toOffice;

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
                    toAddress: locationa.location
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
                    returnLocation: locationa.location
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

    handleCheckboxValue(event) {
        this.setState({
            [event.target.name]: event.target.checked
        });
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSelectionValue(event) {
        this.setState({
            [event.target.name]: event.target.selectedOption.value
        });
    }

    getMinimumDeliveryDate() {
        var minDate = new Date();
        var dd = String(minDate.getDate()).padStart(2, '0');
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

    addEventListeners() {
        document.querySelectorAll('.selection').forEach(item => {
            item.addEventListener("change", this.handleSelectionValue);
        })

        document.querySelectorAll('.checkbox').forEach(item => {
            item.addEventListener("change", this.handleCheckboxValue);
        })

        document.querySelectorAll('.input').forEach(item => {
            item.addEventListener("change", this.handleInputValue);
        })

        const receiverSuggestionInput = document.getElementById("editReceiverLocationInput");
        if (receiverSuggestionInput) {
            receiverSuggestionInput.addEventListener("input", this.handleReceiverSuggestionInputValue);
        }

        const alternativeSuggestionInput = document.getElementById("editAlternativeLocationInput");
        if (alternativeSuggestionInput) {
            alternativeSuggestionInput.addEventListener("input", this.handleAlternativeSuggestionInputValue);
        }

        const submitChanges = document.getElementById("approve-edit-package-button");
        if (submitChanges) {
            submitChanges.addEventListener("click", this.onSubmit);
        }
    }

    removeEventListeners() {
        document.querySelectorAll('.selection').forEach(item => {
            item.removeEventListener("change", this.handleSelectionValue);
        })

        document.querySelectorAll('.checkbox').forEach(item => {
            item.removeEventListener("change", this.handleCheckboxValue);
        })

        document.querySelectorAll('.input').forEach(item => {
            item.removeEventListener("change", this.handleInputValue);
        })

        const receiverSuggestionInput = document.getElementById("editReceiverLocationInput");
        if (receiverSuggestionInput) {
            receiverSuggestionInput.removeEventListener("input", this.handleReceiverSuggestionInputValue);
        }

        const alternativeSuggestionInput = document.getElementById("editAlternativeLocationInput");
        if (alternativeSuggestionInput) {
            alternativeSuggestionInput.removeEventListener("input", this.handleAlternativeSuggestionInputValue);
        }

        const submitChanges = document.getElementById("approve-edit-package-button");
        if (submitChanges) {
            submitChanges.removeEventListener("click", this.onSubmit);
        }
    }

    componentDidMount() {
        this.addEventListeners();

        const URL = DOMAIN + "api/packages/" + this.props.location.state;

        axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        }).then(p => {
            this.setState({
                package: p.data,
                senderTelephoneNumber: p.data.senderTelephoneNumber,
                receiverTelephoneNumber: p.data.receiverTelephoneNumber,
                toAddress: p.data.toAddress,
                toOffice: p.data.toOffice,
                returnToOffice: p.data.returnToOffice,
                returnLocation: p.data.returnLocation,
                dateOfDelivery: p.data.dateOfDelivery,
                toCity: p.data.toCity,
                alternativeCity: p.data.alternativeCity
            });
        });



        const URL_OFFICES = DOMAIN + OFFICES;

        axios.get(URL_OFFICES).then(o => {
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
        const Package = this.state.package;
        console.log(this.state);
        return (
            <div className="packages-view-container" >
                {
                    this.state.package && this.state.package.dateOfRequest ?
                        <div className="ui5-card-replica">
                            <div className="card-title">
                                <div>
                                    <ui5-title level="H2">Редакция на пратка</ui5-title>
                                    <ui5-badge color-scheme="6">
                                        <ui5-icon name="accept" slot="icon"></ui5-icon>{mapPackageStatus(Package.ePackageStatus)}
                                    </ui5-badge>
                                </div>
                                <div>
                                    <ui5-button id="approve-edit-package-button" design="Positive">Редактирай</ui5-button>
                                    <ui5-button design="Negative" onClick={this.onCancel}>Откажи</ui5-button>
                                </div>
                            </div>
                            <div className="edit-package-card-container">
                                <div className="first-edit-container-item">
                                    <div className="container-box">
                                        <div className="information-row">
                                            <div className="information-item">Пратено От:</div> &nbsp;&nbsp;&nbsp;
                                            <span>
                                                {Package.firm && <b>{Package.firmName},  </b>}
                                                <b>{Package.senderFirstName} </b>
                                                <b>{Package.senderLastName}</b>
                                            </span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">От Адрес:</div> &nbsp;&nbsp;&nbsp;
                                            <span>
                                                {Package.fromOffice && <b>ОФИС: </b>}
                                                <b>{Package.fromCity},  {Package.fromAddress}</b>
                                            </span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item input-field">Телефон:</div><br />
                                            <ui5-input class="input" id="editSenderNumberInput" name="senderTelephoneNumber"
                                                placeholder="Телефон" value={Package.senderTelephoneNumber} required></ui5-input>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Имейл:</div> &nbsp;&nbsp;&nbsp;
                                            <span>{Package.senderEmail !== "" ? <b>{Package.senderEmail}</b>
                                                : <b>Няма въведен имейл</b>}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="container-box">
                                        <div className="information-row">
                                            <div className="information-item">Коментар:</div> &nbsp;&nbsp;&nbsp;
                                            <span>{Package.comment !== "" ? <b>{Package.comment}</b>
                                                : <b>Няма коментар към пратката</b>}</span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Алтернативен адрес:</div><br />
                                            {Package.returnToOffice ?
                                                <ui5-checkbox checked class="checkbox" id="edit-is-return-office-checkbox" name="returnToOffice" text="До офис"></ui5-checkbox>
                                                :
                                                <ui5-checkbox class="checkbox" id="edit-is-return-office-checkbox" name="returnToOffice" text="До офис"></ui5-checkbox>
                                            }
                                            <br /><span>
                                                <ui5-input class="suggestion-input" id="editAlternativeLocationInput" show-suggestions name="alternativeCity"
                                                    value={this.state.alternativeCity}></ui5-input>
                                                {this.state.returnToOffice === true ?
                                                    <span>
                                                        <ui5-select class="selection" name="returnLocation" placeholder="Choose office">
                                                            {/* <ui5-option value="" selected></ui5-option> */}
                                                            {this.state.offices.filter(o => o.city === this.state.alternativeCity).map(o => {
                                                                return (
                                                                    <ui5-option value={o.location}>{o.location}</ui5-option>
                                                                )
                                                            })}
                                                        </ui5-select>
                                                    </span> :
                                                    <span>
                                                        <ui5-input class="input" id="editAlternativeAddressInput" name="returnLocation"
                                                            placeholder="Адрес" value={this.state.returnLocation} required></ui5-input>
                                                    </span>}
                                            </span>
                                        </div>
                                        <div className="information-row">
                                            {Package.fragile && <ui5-badge color-scheme="9">Чупливи предмети</ui5-badge>}
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Тип:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.ePackageType}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Тегло:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.weight}кг</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Цена:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.price.toFixed(2)}лв.</b></span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="container-box">
                                        <div className="information-row">
                                            <div className="information-item">Пратено До:</div> &nbsp;&nbsp;&nbsp;
                                            <span>
                                                {Package.toFirm && <b>{Package.toFirmName},  </b>}
                                                <b>{Package.receiverFirstName} </b>
                                                <b>{Package.receiverLastName}</b>
                                            </span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Доставка до:</div><br />
                                            {Package.toOffice ?
                                                <ui5-checkbox checked class="checkbox" id="edit-is-to-office-checkbox" name="toOffice" text="До офис"></ui5-checkbox>
                                                :
                                                <ui5-checkbox class="checkbox" id="edit-is-to-office-checkbox" name="toOffice" text="До офис"></ui5-checkbox>
                                            }
                                             <br /><span>
                                                <ui5-input class="suggestion-input" id="editReceiverLocationInput" show-suggestions name="toCity" 
                                                placeholder="Населено място" value={Package.toCity}></ui5-input>
                                                {this.state.toOffice === true ?
                                                    <span>
                                                        <ui5-select class="selection" name="toAddress" placeholder="Choose office">
                                                            {/* <ui5-option value="" selected></ui5-option> */}
                                                            {this.state.offices.filter(o => o.city === this.state.toCity).map(o => {
                                                                return (
                                                                    <ui5-option value={o.location}>{o.location}</ui5-option>
                                                                )
                                                            })}
                                                        </ui5-select>
                                                    </span> :
                                                    <span>
                                                        <ui5-input class="input" id="editReceiverAddressInput" name="toAddress" placeholder="Адрес" required></ui5-input>
                                                    </span>}
                                            </span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item input-field">Телефон:</div><br />
                                            <ui5-input class="input" id="editReceiverNumberInput" name="receiverTelephoneNumber"
                                                placeholder="Телефон" value={Package.receiverTelephoneNumber} required></ui5-input>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Имейл:</div> &nbsp;&nbsp;&nbsp;
                                            <span>{Package.receiverEmail !== "" ? <b>{Package.receiverEmail}</b>
                                                : <b>Няма въведен имейл</b>}</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="container-box">
                                        <div className="information-row">
                                            <div className="information-item">Дата на заявяване:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.dateOfRequest.slice(0, 10)}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Дата на изпращане:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.dateOfSending}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item input-field">Очаквана дата за вземане/доставка:</div><br />
                                            <ui5-date-picker class="input" format-pattern='yyyy-MM-dd' name="dateOfDelivery" value="Веднага (1-3 работни дни)"
                                                min-date={this.getMinimumDeliveryDate()} max-date={this.getMaximumDeliveryDate()}></ui5-date-picker><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="edit-package-card-container">
                                <div className="first-edit-container-item">
                                    <div className="information-row">
                                        <div className="information-item">Сума:</div> &nbsp;&nbsp;&nbsp;
                                        <span><b>{Package.cashOnDelivery}лв.</b></span>
                                    </div>
                                    <div className="information-row">
                                        <div className="information-item">Изплащане до:</div> &nbsp;&nbsp;&nbsp;
                                        {Package.iban === "" ?
                                            <span>
                                                {Package.isReturnCashToOffice && <b>ОФИС: </b>}
                                                <b>{Package.returnCashCity},  {Package.returnCashAddress}</b>
                                            </span>
                                            :
                                            <span>
                                                <b>Банков превод</b>
                                            </span>
                                        }
                                    </div>
                                </div>
                                {Package.iban !== "" ? <div className="second-container-item">
                                    <div className="information-row">
                                        <div className="information-item">Титуляр:</div> &nbsp;&nbsp;&nbsp;
                                        <span><b>{Package.bankAccountOwner}</b></span>
                                    </div>
                                    <div className="information-row">
                                        <div className="information-item">IBAN:</div> &nbsp;&nbsp;&nbsp;
                                        <span><b>{Package.iban}</b></span>
                                    </div>
                                    <div className="information-row">
                                        <div className="information-item">BIC:</div> &nbsp;&nbsp;&nbsp;
                                        <span><b>{Package.bic}</b></span>
                                    </div>
                                    <div className="information-row">
                                        <div className="information-item">Банка:</div> &nbsp;&nbsp;&nbsp;
                                        <span><b>{Package.bank}</b></span>
                                    </div>
                                </div> : <div></div>}

                            </div>
                        </div> : null
                }
            </div>
        )
    }
}
export default EditAllPackages