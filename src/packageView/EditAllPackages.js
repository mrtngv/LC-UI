import React from 'react';
import axios from 'axios';

import "./EditAllPackages.css";
import { DOMAIN } from ".././constants/Domain.js";
import { OFFICES } from ".././constants/Endpoints.js";

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
            senderFirstName: "",
            senderLastName: "",
            isFirm: "",
            firmName: "",
            senderTelephoneNumber: "",
            senderEmail: "",
            fromAddress: "",
            fromOffice: "",
            receiverFirstName: "",
            receiverLastName: "",
            receiverTelephoneNumber: "",
            receiverEmail: "",
            toAddress: "",
            toOffice: "",
            ePackageType: "",
            weight: "",
            isFragile: "",
            returnToOffice: "",
            returnLocation: "",
            comment: "",
            ePayMethod: "",
            dateOfDelivery: "",
            toFirm: "",
            toFirmName: "",
            fromCity: "",
            toCity: "",
            alternativeCity: "",
            dateOfSending: ""
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleReceiverSuggestionInputValue = this.handleReceiverSuggestionInputValue.bind(this);
        this.handleAlternativeSuggestionInputValue = this.handleAlternativeSuggestionInputValue.bind(this);
        this.handleSelectionValue = this.handleSelectionValue.bind(this);
        this.handleCheckboxValue = this.handleCheckboxValue.bind(this);
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
                package: p.data
            });
        }).then(
            this.setState({
                senderFirstName: this.state.package.senderFirstName,
                senderLastName: this.state.package.senderLastName,
                isFirm: this.state.package.isFirm,
                firmName: this.state.package.firmName,
                senderTelephoneNumber: this.state.package.senderTelephoneNumber,
                senderEmail: this.state.package.senderEmail,
                fromAddress: this.state.package.fromAddress,
                fromOffice: this.state.package.fromOffice,
                receiverFirstName: this.state.package.receiverFirstName,
                receiverLastName: this.state.package.receiverLastName,
                receiverTelephoneNumber: this.state.package.receiverTelephoneNumber,
                receiverEmail: this.state.package.receiverEmail,
                toAddress: this.state.package.toAddress,
                toOffice: this.state.package.toOffice,
                ePackageType: this.state.package.ePackageType,
                weight: this.state.package.weight,
                isFragile: this.state.package.isFragile,
                returnToOffice: this.state.package.returnToOffice,
                returnLocation: this.state.package.returnLocation,
                comment: this.state.package.comment,
                ePayMethod: this.state.package.ePayMethod,
                dateOfDelivery: this.state.package.dateOfDelivery,
                toFirm: this.state.package.toFirm,
                toFirmName: this.state.package.toFirmName,
                fromCity: this.state.package.fromCity,
                toCity: this.state.package.toCity,
                alternativeCity: this.state.package.alternativeCity,
                dateOfSending: this.state.package.dateOfSending
            })
        );

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

        return (
            <div className="packages-view-container">
                {this.state.package && this.state.package.dateOfRequest ?
                    <ui5-card heading="Редактирай пратка" subheading={"ID: " + Package.id} class="small">
                        <div className="edit-package-card-container">
                            <div>
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
                                        <div className="information-item">Телефон:</div> &nbsp;&nbsp;&nbsp;
                                        <span><b>{Package.senderTelephoneNumber}</b></span>
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
                                        <br/><span>
                                            <ui5-input class="suggestion-input" id="editAlternativeLocationInput" show-suggestions name="alternativeCity" placeholder="Населено място"></ui5-input>
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
                                                    <ui5-input class="input" id="editAlternativeAddressInput" name="returnLocation" placeholder="Адрес" required></ui5-input>
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
                                        <span><b>{Package.price}лв.</b></span>
                                    </div>
                                </div>
                            </div>
                            <div className="second-container-item">
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
                                        <ui5-checkbox checked class="checkbox" id="edit-is-to-office-checkbox" name="toOffice" text="До офис"></ui5-checkbox><br />
                                        <span>
                                            <ui5-input class="suggestion-input" id="editReceiverLocationInput" show-suggestions name="toCity" placeholder="Населено място"></ui5-input>
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
                                        <div className="information-item">Телефон:</div> &nbsp;&nbsp;&nbsp;
                                        <span><b>{Package.receiverTelephoneNumber}</b></span>
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
                                    </div><br />
                                    <div className="information-row">
                                        <div className="information-item">Очаквана дата за вземане/доставка:</div><br /><br />
                                        <ui5-date-picker class="input" format-pattern='yyyy-MM-dd' name="dateOfDelivery" value="Веднага (1-3 работни дни)"
                                            min-date={this.getMinimumDeliveryDate()} max-date={this.getMaximumDeliveryDate()}></ui5-date-picker><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ui5-card> : null}
            </div>
        )
    }
}
export default EditAllPackages