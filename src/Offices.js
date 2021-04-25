import React from 'react';
import "./Offices.css";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
import "@ui5/webcomponents/dist/MessageStrip";
import OfficesDatas from "./OfficesDatas.js";
import axios from 'axios';

class Offices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            officesData: OfficesDatas,
            role: "Потребител",
            offices: [],
            editOfficeLocation: "",
            addNewOfficeCity: "",
            addNewOfficeLocation: ""
        };
        this.onRoleChange = this.onRoleChange.bind(this);
        this.removeOffice = this.removeOffice.bind(this);
        this.getOffices = this.getOffices.bind(this);
        this.changeOfficeLocation = this.changeOfficeLocation.bind(this);
        this.handleInputValue = this.handleInputValue.bind(this);
        this.addOffice = this.addOffice.bind(this);
        this.closeAddOfficeDialog = this.closeAddOfficeDialog.bind(this);
        this.closeEditOfficeDialog = this.closeEditOfficeDialog.bind(this);
    }

    openAddOfficeDialog() {
        const addOfficeDialog = document.getElementById("add-office-dialog");
        addOfficeDialog.open();
    }

    openEditOfficeDialog() {
        const editOfficeDialog = document.getElementById("edit-office-dialog");
        editOfficeDialog.open();
    }

    closeAddOfficeDialog() {
        this.setState({
            addNewOfficeCity: "",
            addNewOfficeLocation: ""
        })
        const closeOfficeDialog = document.getElementById("add-office-dialog");
        closeOfficeDialog.close();
    }

    closeEditOfficeDialog() {
        this.setState({
            editOfficeLocation: "",
        })
        const closeEditOfficeDialog = document.getElementById("edit-office-dialog");
        closeEditOfficeDialog.close();
    }

    onRoleChange(event) {
        this.setState({
            role: event.detail.selectedButton.getAttribute("id")
        })
    }

    removeOffice(event) {
        const id = event.target.getAttribute("value");
        const deleteURL = "http://localhost:8080/api/" + id;
        axios.delete(deleteURL).then(res => {
            this.getOffices();
        });
    }

    addOffice() {
        const postUrl = "http://localhost:8080/api";
        const data = {
            city: this.state.addNewOfficeCity,
            location: this.state.addNewOfficeLocation
        }
        console.log(data);
        const dialog = document.getElementById("add-office-dialog");
        axios.post(postUrl, data).then(res => {
            this.getOffices();
            dialog.close();
            this.setState({
                addNewOfficeCity: "",
                addNewOfficeLocation: ""
            })
        });
    }

    changeOfficeLocation(event) {
        const id = event.target.getAttribute("value");
        console.log(id);
        const changeLocation = "http://localhost:8080/api/" + id;
        const data = {
            location: this.state.editOfficeLocation
        }
        axios.put(changeLocation, data).then(res => {
            this.getOffices();
            this.setState({
                editOfficeLocation: ""
            })
            this.closeEditOfficeDialog();
        });
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    addEventListeners() {
        const buttonCloseDialog = document.getElementById("closeAddOfficeDialog");
        buttonCloseDialog.addEventListener("click", this.closeAddOfficeDialog);
        const rolesChangeButton = document.getElementById("roles-changes-button");
        rolesChangeButton.addEventListener("selection-change", this.onRoleChange);
        const cityInput = document.getElementById("city");
        cityInput.addEventListener("input", this.handleInputValue);
        const addressInput = document.getElementById("address");
        addressInput.addEventListener("input", this.handleInputValue);
    }

    componentDidMount() {
        this.addEventListeners();
        this.getOffices();
    }

    componentDidUpdate() {
        const locationInput = document.getElementById("location-input");
        if (locationInput) {
            locationInput.addEventListener("input", this.handleInputValue);
            console.log("Is in eventlistener");
            console.log(locationInput);
        }
    }

    getOffices() {
        axios.get("http://localhost:8080/api/offices").then(o => {
            this.setState({
                offices: o.data
            });
        })
    }

    render() {
        const role = this.state.role;
        const OfficesData = this.state.officesData
        const offices = this.state.offices;
        console.log(offices);
        console.log(role);
        return (
            <div>
                <div>
                    <ui5-label>Нашите офиси: </ui5-label>
                    <ui5-segmentedbutton id="roles-changes-button">
                        <ui5-togglebutton id="Потребител" pressed>Потребител</ui5-togglebutton>
                        <ui5-togglebutton id="Офис работник">Офис работник</ui5-togglebutton>
                        <ui5-togglebutton id="Модератор">Модератор</ui5-togglebutton>
                    </ui5-segmentedbutton>
                    {role === "Модератор" && <ui5-button id="openDialogButton" design="Emphasized" onClick={this.openAddOfficeDialog}>Добави офис</ui5-button>}
                </div>

                {offices.map(o => {
                    return (
                        <div className="office-card">
                            <ui5-card
                                heading={o.city + " (" + o.id + ")"}
                                class="small">
                                <ui5-timeline>
                                    {role === "Модератор" &&
                                        <div>
                                            <ui5-button onClick={this.openEditOfficeDialog}>Промени</ui5-button>
                                            <ui5-button value={o.id} onClick={this.removeOffice} design="Negative">Изтрий</ui5-button>
                                        </div>}
                                    <ui5-timeline-item title-text={o.location} icon="locate-me"></ui5-timeline-item>
                                </ui5-timeline>
                            </ui5-card>
                            <ui5-dialog id="edit-office-dialog" header-text="Edit Офис">
                                <section>
                                    <div>
                                        <ui5-label for="location-input" required>Адрес: </ui5-label>
                                        <ui5-input id="location-input"
                                            name="editOfficeLocation"
                                            value={this.state.editOfficeLocation}
                                            placeholder="Enter location"
                                            onChange={this.handleInputValue}>
                                        </ui5-input>
                                    </div>
                                </section>
                                <div slot="footer" class="dialog-footer">
                                    <ui5-button id="addOffice" value={o.id} design="Emphasized" onClick={this.changeOfficeLocation}>Промени</ui5-button>
                                    <ui5-button id="closeAddOfficeDialog" onClick={this.closeEditOfficeDialog}>Откажи</ui5-button>
                                </div>
                            </ui5-dialog>
                        </div>

                    )
                })}
                {this.state.role === "Модератор" ?
                    <ui5-messagestrip type="Positive">Вие сте Логнат като Модератор и можете да променяте, изтривате и добавяте офиси.</ui5-messagestrip>
                    :
                    <ui5-messagestrip type="Warning">{"Вие сте Логнат като " + this.state.role + ". Нямате права за да променяте, изтривате и добавяте офиси."}</ui5-messagestrip>
                }
                <ui5-dialog id="add-office-dialog" header-text="Добави Офис">
                    <section>
                        <div>
                            <ui5-label for="city" required>Град: </ui5-label>
                            <ui5-input id="city" name="addNewOfficeCity" value={this.state.addNewOfficeCity} onChange={this.handleInputValue}></ui5-input>
                        </div>
                        <div>
                            <ui5-label for="address" required>Адрес: </ui5-label>
                            <ui5-input id="address" name="addNewOfficeLocation" value={this.state.addNewOfficeLocation} onChange={this.handleInputValue}></ui5-input>
                        </div>
                    </section>
                    <div slot="footer" class="dialog-footer">
                        <div ></div>
                        <ui5-button id="addOffice" design="Emphasized" onClick={this.addOffice}>Добави</ui5-button>
                        <ui5-button id="closeAddOfficeDialog">Откажи</ui5-button>
                    </div>
                </ui5-dialog>
            </div>
        )
    }
}

export default Offices;