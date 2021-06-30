import React from 'react';
import axios from 'axios';

import "./Offices.css";
import { DOMAIN } from ".././constants/Domain.js";

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
            addOfficeDetailsName: '',
            addOfficeDetailsLocation: '',
            addOfficeDetailsCity: '',
            addOfficeDetailsWeekdayHours: null,
            addOfficeDetailsSaturdayHours: null,
            addOfficeDetailsSundayHours: null,
            addOfficeError: false,
            editOfficeDetailsId: '',
            editOfficeDetailsName: '',
            editOfficeDetailsLocation: '',
            editOfficeDetailsCity: '',
            editOfficeDetailsWeekdayHours: null,
            editOfficeDetailsSaturdayHours: null,
            editOfficeDetailsSundayHours: null,
            editOfficeError: false,
            filterCity: ''
        };

        this.removeOffice = this.removeOffice.bind(this);
        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleOfficeLocationInput = this.handleOfficeLocationInput.bind(this);
        this.addOffice = this.addOffice.bind(this);
        this.editOffice = this.editOffice.bind(this);
        this.addOfficeResetForm = this.addOfficeResetForm.bind(this);
        this.editOfficeResetForm = this.editOfficeResetForm.bind(this);
        this.populateEditValues = this.populateEditValues.bind(this);
        this.onFilter= this.onFilter.bind(this);
        this.onFilterClear= this.onFilterClear.bind(this);
    }

    addEventListeners() {
        const openAddDialogButton = document.getElementById("openAddDialogButton");
        const addOfficeDialog = document.getElementById("add-office-dialog");
        const editOfficeDialog = document.getElementById("edit-office-dialog");
        const buttonCloseAddDialog = document.getElementById("closeAddOfficeDialog");
        const buttonCloseEditDialog = document.getElementById("closeЕditOfficeDialog");
        const addOfficeButton = document.getElementById("addOffice");
        const editOfficeButton = document.getElementById("editOffice");

        if (openAddDialogButton) {
            openAddDialogButton.addEventListener("click", function () {
                addOfficeDialog.open();
            });
            buttonCloseAddDialog.addEventListener("click", function () {
                addOfficeDialog.close();
            });
        }

        buttonCloseEditDialog.addEventListener("click", function () {
            editOfficeDialog.close();
        });

        editOfficeButton.addEventListener("click", this.editOffice);

        addOfficeButton.addEventListener("click", this.addOffice);

        const addOfficeCityInput = document.getElementById("addOfficeCityInput");
        if (addOfficeCityInput) {
            addOfficeCityInput.addEventListener("input", this.handleOfficeLocationInput);
            addOfficeCityInput.addEventListener("change", this.handleInputValue);
        }

        const filterOfficeCityInput = document.getElementById("filterOfficeCityInput");
        if (filterOfficeCityInput) {
            filterOfficeCityInput.addEventListener("input", this.handleOfficeLocationInput);
            filterOfficeCityInput.addEventListener("change", this.handleInputValue);
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

        const editOfficeCityInput = document.getElementById("editOfficeCityInput");
        if (editOfficeCityInput) {
            editOfficeCityInput.addEventListener("input", this.handleOfficeLocationInput);
            editOfficeCityInput.addEventListener("change", this.handleInputValue);
        }

        const editOfficeNameInput = document.getElementById("editOfficeNameInput");
        if (editOfficeNameInput) {
            editOfficeNameInput.addEventListener("change", this.handleInputValue);
        }

        const editOfficeLocationInput = document.getElementById("editOfficeLocationInput");
        if (editOfficeLocationInput) {
            editOfficeLocationInput.addEventListener("change", this.handleInputValue);
        }

        const editOfficeWeekdayHours = document.getElementById("editOfficeWeekdayHours");
        if (editOfficeWeekdayHours) {
            editOfficeWeekdayHours.addEventListener("change", this.handleInputValue);
        }

        const editOfficeSaturdayHours = document.getElementById("editOfficeSaturdayHours");
        if (editOfficeSaturdayHours) {
            editOfficeSaturdayHours.addEventListener("change", this.handleInputValue);
        }
        const editOfficeSundayHours = document.getElementById("editOfficeSundayHours");
        if (editOfficeSundayHours) {
            editOfficeSundayHours.addEventListener("change", this.handleInputValue);
        }
    }

    removeOffice(id) {
        const removeOfficesURL = DOMAIN + 'api/offices/';
        const accessToken = JSON.parse(sessionStorage.getItem('user')).accessToken;

        axios.delete(removeOfficesURL + id, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        ).then(res => {
            window.location.reload();
        });
    }

    addOffice() {
        const addOfficesURL = DOMAIN + 'api/offices';
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
            const accessToken = JSON.parse(sessionStorage.getItem('user')).accessToken;

            axios.post(addOfficesURL, addOfficeDetails, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(res => {
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

    editOffice() {
        const editOfficesURL = DOMAIN + 'api/offices';
        const editOfficeDialog = document.getElementById("edit-office-dialog");

        const editOfficeDetails = {
            id: this.state.editOfficeDetailsId,
            name: this.state.editOfficeDetailsName,
            location: this.state.editOfficeDetailsLocation,
            city: this.state.editOfficeDetailsCity,
            weekdayHours: this.state.editOfficeDetailsWeekdayHours,
            saturdayHours: this.state.editOfficeDetailsSaturdayHours,
            sundayHours: this.state.editOfficeDetailsSundayHours
        };

        if (this.state.editOfficeDetailsName &&
            this.state.editOfficeDetailsCity && 
            this.state.editOfficeDetailsLocation) {
            const accessToken = JSON.parse(sessionStorage.getItem('user')).accessToken;
            
            axios.put(editOfficesURL, editOfficeDetails, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(res => {
                this.setState({editOfficeError: false});
                editOfficeDialog.close();
                this.editOfficeResetForm();
                window.location.reload();
            }).catch(error => {
                this.setState({editOfficeError: true});
            });
        } else {
            this.setState({editOfficeError: true});
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
        const getOfficesURL = DOMAIN + 'api/offices';

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

    editOfficeResetForm() {
        const inputs = document.querySelectorAll(".edit-office-input");
        inputs.forEach(input => {
            input.value = '';
        });
    }

    populateEditValues(id) {
        const office = this.state.offices.filter(o => o.id === id)[0];
        this.setState({editOfficeDetailsId: office.id,
                        editOfficeDetailsName: office.name,
                        editOfficeDetailsLocation: office.location,
                        editOfficeDetailsCity: office.city,
                        editOfficeDetailsWeekdayHours: office.weekdayHours,
                        editOfficeDetailsSaturdayHours: office.saturdayHours,
                        editOfficeDetailsSundayHours: office.sundayHours});

        document.getElementById("edit-office-dialog").open();
    }

    onFilter() {
        let filteredOffices = this.state.offices;
        if (this.state.filterCity) {
            filteredOffices = filteredOffices.filter(o => o.city === this.state.filterCity);

            this.setState({
                offices: filteredOffices
            })
        } else {
            this.onFilterClear();
        }
    }

    onFilterClear() {
        const getOfficesURL = DOMAIN + 'api/offices';
        
        axios.get(getOfficesURL).then(o => {
            this.setState({
                offices: o.data,
                filterCity: ''
            });
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

        const editOfficeError = () => {
            const editOfficeError = this.state.editOfficeError;

            if (editOfficeError) {
                return <span id="response-msg" className="error">Неуспешно редактиране на офис</span>;
            }
        }
        
        const offices = this.state.offices;
        return (
            <div className="offices-container">
                <div className="offices-header">
                    <ui5-title class="offices-label" level="H1">Нашите офиси</ui5-title>
                    {addOfficeBtn()}
                    <div className="filter-offices-container">
                    <div className="filter-offices-contents">
                        <ui5-input class="suggestion-input filter-office-input" id="filterOfficeCityInput" show-suggestions value={this.state.filterCity} name="filterCity" placeholder="Търсене по град"></ui5-input>
                        <ui5-button id="filter-office-search-button" onClick={this.onFilter} design="Emphasized">Търси</ui5-button>
                        <ui5-button id="filter-office-clear-button" onClick={this.onFilterClear}>Изчисти</ui5-button>
                    </div>
                </div>
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
                                        <ui5-button class="offices-button" onClick={this.populateEditValues.bind(null, o.id)}>Промени</ui5-button>
                                        <ui5-button class="offices-button" onClick={this.removeOffice.bind(null, o.id)} design="Negative">Изтрий</ui5-button>
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

                <ui5-dialog id="edit-office-dialog" header-text="Редактирай Офис">
                    <form>
                        {editOfficeError()}
                        <div >
                            <ui5-label class="edit-office-label" for="editOfficeDetailsName" required>Име: </ui5-label>
                            <ui5-input id="editOfficeNameInput" class="edit-office-input" name="editOfficeDetailsName" value={this.state.editOfficeDetailsName}></ui5-input>
                        </div>
                        <div>
                            <ui5-label class="edit-office-label" for="editOfficeDetailsCity" required>Град: </ui5-label>
                            <ui5-input class="suggestion-input edit-office-input" id="editOfficeCityInput" show-suggestions value={this.state.editOfficeDetailsCity} name="editOfficeDetailsCity" placeholder="Започнете да въвеждате населено място"></ui5-input>
                        </div>
                        <div>
                            <ui5-label class="edit-office-label" for="editOfficeDetailsLocation" required>Адрес: </ui5-label>
                            <ui5-input id="editOfficeLocationInput" class="edit-office-input" name="editOfficeDetailsLocation" value={this.state.editOfficeDetailsLocation}></ui5-input>
                        </div>
                        <div>
                            <ui5-label class="edit-office-label" id="editWorkingHours" >Въведи работно време</ui5-label>
                            <ui5-label class="edit-office-label" id="editWorkingHoursExample">Пример: 9:30 - 18:00</ui5-label>
                            <ui5-label class="edit-office-label" for="editOfficeDetailsWeekdayHours">Делнични дни: </ui5-label>
                            <ui5-input class="edit-office-input" name="editOfficeDetailsWeekdayHours" id="editOfficeWeekdayHours" value={this.state.editOfficeDetailsWeekdayHours}></ui5-input>
                            <ui5-label class="edit-office-label" for="editOfficeDetailsSaturdayHours">Събота: </ui5-label>
                            <ui5-input class="edit-office-input" name="editOfficeDetailsSaturdayHours" id="editOfficeSaturdayHours" value={this.state.editOfficeDetailsSaturdayHours}></ui5-input>
                            <ui5-label class="edit-office-label" for="editOfficeDetailsSundayHours">Неделя: </ui5-label>
                            <ui5-input class="edit-office-input" name="editOfficeDetailsSundayHours" id="editOfficeSundayHours" value={this.state.editOfficeDetailsSundayHours}></ui5-input>
                        </div>
                        <div slot="footer" class="dialog-footer">
                            <ui5-button class="offices-button" id="editOffice" type="submit" design="Emphasized">Редактирай</ui5-button>
                            <ui5-button class="offices-button" id="closeЕditOfficeDialog">Откажи</ui5-button>
                        </div>
                    </form>
                </ui5-dialog>
            </div>
        )
    }
}

export default Offices;