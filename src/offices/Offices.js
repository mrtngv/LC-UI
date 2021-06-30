import React from 'react';
import axios from 'axios';

import "./Offices.css";

import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";
import "@ui5/webcomponents/dist/MessageStrip";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

class Offices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offices: [],
            editOfficeDetails: {},
            addOfficeDetailsName: '',
            addOfficeDetailsLocation: '',
            addOfficeDetailsCity: '',
            addOfficeDetailsWeekdayHours: null,
            addOfficeDetailsSaturdayHours: null,
            addOfficeDetailsSundayHours: null,
            addOfficeError: false
        };
        this.removeOffice = this.removeOffice.bind(this);
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleOfficeLocationInput = this.handleOfficeLocationInput.bind(this);
        this.addOffice = this.addOffice.bind(this);
        this.addOfficeResetForm = this.addOfficeResetForm.bind(this);
    }

    addEventListeners() {
        const openAddDialogButton = document.getElementById("openAddDialogButton");
        const addOfficeDialog = document.getElementById("add-office-dialog");
        const buttonCloseDialog = document.getElementById("closeAddOfficeDialog");
        const addOfficeButton = document.getElementById("addOffice");

        if (openAddDialogButton) {
            openAddDialogButton.addEventListener("click", function () {
                addOfficeDialog.open();
            });
            buttonCloseDialog.addEventListener("click", function () {
                addOfficeDialog.close();
            });
        }

        addOfficeButton.addEventListener("click", this.addOffice);

        const addOfficeCityInput = document.getElementById("addOfficeCityInput");
        if (addOfficeCityInput) {
            addOfficeCityInput.addEventListener("input", this.handleOfficeLocationInput);
            addOfficeCityInput.addEventListener("change", this.handleInputValue);
        }

        const addOfficeNameInput = document.getElementById("addOfficeNameInput");
        if (addOfficeNameInput) {
            addOfficeNameInput.addEventListener("change", this.handleInputValue);
        }

        const addOfficeLocationInput = document.getElementById("addOfficeLocationInput");
        if (addOfficeLocationInput) {
            addOfficeLocationInput.addEventListener("change", this.handleInputValue);
        }

        const addOfficeWeekdayHours = document.getElementById("addOfficeWeekdayHours");
        if (addOfficeWeekdayHours) {
            addOfficeWeekdayHours.addEventListener("change", this.handleInputValue);
        }

        const addOfficeSaturdayHours = document.getElementById("addOfficeSaturdayHours");
        if (addOfficeSaturdayHours) {
            addOfficeSaturdayHours.addEventListener("change", this.handleInputValue);
        }
        const addOfficeSundayHours = document.getElementById("addOfficeSundayHours");
        if (addOfficeSundayHours) {
            addOfficeSundayHours.addEventListener("change", this.handleInputValue);
        }
    }

    handleAddOfficeSubmit() {
        this.onRegister();
    }

    removeOffice(event) {
        const id = event.target.getAttribute("value");
        let offices = this.state.offices;
        const officeToRemove = offices.find(o => o.id === id);
        const index = offices.indexOf(officeToRemove);
        if (index > -1) {
            offices.splice(index, 1);
        }
        this.setState({
            offices: offices
        })
    }

    addOffice() {
        const addOfficesURL = 'http://localhost:8080/api/offices';
        const addOfficeDialog = document.getElementById("add-office-dialog");

        const addOfficeDetails = {
            name: this.state.addOfficeDetailsName,
            location: this.state.addOfficeDetailsLocation,
            city: this.state.addOfficeDetailsCity,
            weekdayHours: this.state.addOfficeDetailsWeekdayHours,
            saturdayHours: this.state.addOfficeDetailsSaturdayHours,
            sundayHours: this.state.addOfficeDetailsSundayHours
        };

        if (this.state.addOfficeDetailsName &&
            this.state.addOfficeDetailsCity && 
            this.state.addOfficeDetailsLocation) {
            axios.post(addOfficesURL, addOfficeDetails).then(res => {
                this.setState({addOfficeError: false});
                addOfficeDialog.close();
                this.addOfficeResetForm();
            }).catch(error => {
                this.setState({addOfficeError: true});
            });
        } else {
            this.setState({addOfficeError: true});
        }
    }

    handleOfficeLocationInput(event) {
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

    componentDidMount() {
        const getOfficesURL = 'http://localhost:8080/api/offices';

        this.addEventListeners();

        axios.get(getOfficesURL).then(o => {
            this.setState({
                offices: o.data
            });
        });
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    addOfficeResetForm() {
        const inputs = document.querySelectorAll(".add-office-input");
        inputs.forEach(input => {
            input.value = '';
        });
    }

    render() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userRole = user ? user.role : "NO_ROLE";

        const addOfficeBtn = () => {
            if (userRole === "ROLE_MODERATOR") {
                return <ui5-segmentedbutton class="buttons-container">
                    <ui5-button id="openAddDialogButton" design="Emphasized">Добави офис</ui5-button>
                </ui5-segmentedbutton>
            }
        }

        const addOfficeError = () => {
            const addOfficeError = this.state.addOfficeError;

            if (addOfficeError) {
                return <span id="response-msg" className="error">Неуспешно добавяне на офис</span>;
            }
        }

        const offices = this.state.offices;
        return (
            <div className="offices-container">
                <div className="offices-header">
                    <ui5-label class="offices-label">Нашите офиси</ui5-label>
                    {addOfficeBtn()}
                </div>
                {offices.map(o => {
                    return (
                        <div className="office-card">
                            <ui5-card
                                heading={o.name}
                                class="small">
                                <ui5-timeline class="office-card-timeline">
                                    <ui5-timeline-item class="office-element" title-text={o.city + ', ' + o.location} icon="locate-me"></ui5-timeline-item>
                                    <ui5-timeline-item id="working-hours-title" class="office-element" title-text={'РАБОТНО ВРЕМЕ'} icon="history">
                                        <div class="working-hours">Понеделник - Петък: <span class={o.weekdayHours || 'closed'}>{o.weekdayHours || 'Затворен'}</span></div>
                                        <div class="working-hours">Събота: <span class={o.saturdayHours || 'closed'}>{o.saturdayHours || 'Затворен'}</span></div>
                                        <div class="working-hours">Неделя: <span class={o.sundayHours || 'closed'}>{o.sundayHours || 'Затворен'}</span></div>
                                    </ui5-timeline-item>
                                </ui5-timeline>
                                {userRole === "ROLE_MODERATOR" ?
                                    <div class="offices-buttons-wrapper">
                                        <ui5-button class="offices-button">Промени</ui5-button>
                                        <ui5-button class="offices-button" value={o.id} onClick={this.removeOffice} design="Negative">Изтрий</ui5-button>
                                    </div>
                                    : ''
                                }
                            </ui5-card>
                        </div>
                    )
                })}

                <ui5-dialog id="add-office-dialog" header-text="Добави Офис">
                    <form>
                        {addOfficeError()}
                        <div >
                            <ui5-label class="add-office-label" for="addOfficeDetailsName" required>Име: </ui5-label>
                            <ui5-input id="addOfficeNameInput" class="add-office-input" name="addOfficeDetailsName" value={this.state.addOfficeDetailsName}></ui5-input>
                        </div>
                        <div>
                            <ui5-label class="add-office-label" for="addOfficeDetailsCity" required>Град: </ui5-label>
                            <ui5-input class="suggestion-input add-office-input" id="addOfficeCityInput" show-suggestions value={this.state.addOfficeDetailsCity} name="addOfficeDetailsCity" placeholder="Започнете да въвеждате населено място"></ui5-input>
                        </div>
                        <div>
                            <ui5-label class="add-office-label" for="addOfficeDetailsLocation" required>Адрес: </ui5-label>
                            <ui5-input id="addOfficeLocationInput" class="add-office-input" name="addOfficeDetailsLocation" value={this.state.addOfficeDetailsLocation}></ui5-input>
                        </div>
                        <div>
                            <ui5-label class="add-office-label" id="addWorkingHours" >Въведи работно време</ui5-label>
                            <ui5-label class="add-office-label" id="addWorkingHoursExample">Пример: 9:30 - 18:00</ui5-label>
                            <ui5-label class="add-office-label" for="addOfficeDetailsWeekdayHours">Делнични дни: </ui5-label>
                            <ui5-input class="add-office-input" name="addOfficeDetailsWeekdayHours" id="addOfficeWeekdayHours" value={this.state.addOfficeDetailsWeekdayHours}></ui5-input>
                            <ui5-label class="add-office-label" for="addOfficeDetailsSaturdayHours">Събота: </ui5-label>
                            <ui5-input class="add-office-input" name="addOfficeDetailsSaturdayHours" id="addOfficeSaturdayHours" value={this.state.addOfficeDetailsSaturdayHours}></ui5-input>
                            <ui5-label class="add-office-label" for="addOfficeDetailsSundayHours">Неделя: </ui5-label>
                            <ui5-input class="add-office-input" name="addOfficeDetailsSundayHours" id="addOfficeSundayHours" value={this.state.addOfficeDetailsSundayHours}></ui5-input>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <ui5-button class="offices-button" id="addOffice" type="submit" onClick={this.addOffice} design="Emphasized">Добави</ui5-button>
                            <ui5-button class="offices-button" id="closeAddOfficeDialog">Откажи</ui5-button>
                        </div>
                    </form>
                </ui5-dialog>
            </div>
        )
    }
}

export default Offices;