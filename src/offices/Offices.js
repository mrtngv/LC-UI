import React from 'react';
import axios from 'axios';

import "./Offices.css";
import OfficesDatas from "./OfficesDatas.js";
import {DOMAIN} from ".././constants/Domain.js";
import {OFFICES} from ".././constants/Endpoints.js";

import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/SegmentedButton";
import "@ui5/webcomponents/dist/ToggleButton";
import "@ui5/webcomponents/dist/MessageStrip";


class Offices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            officesData: OfficesDatas,
            role: "Потребител",
            editOfficeDetails: {},
            addOfficeDetails: {},
            offices: []
        };
        this.onRoleChange = this.onRoleChange.bind(this);
        this.removeOffice = this.removeOffice.bind(this);
    }

    onRoleChange(event) {
        this.setState({
            role: event.detail.selectedButton.getAttribute("id")
        })
    }

    removeOffice(event) {
        const id=event.target.getAttribute("value");
        let OfficesData = this.state.officesData;
        const officeToRemove = OfficesData.find(o => o.officeId === id);
        const index = OfficesData.indexOf(officeToRemove);
        if (index > -1) {
            OfficesData.splice(index, 1);
        }
        this.setState({
            officesData: OfficesData
        })
    }

    addEventListeners() {
        const addOfficeButton = document.getElementById("openDialogButton");
        const addOfficeDialog = document.getElementById("add-office-dialog");
        const buttonCloseDialog = document.getElementById("closeAddOfficeDialog");
        const rolesChangeButton = document.getElementById("roles-changes-button");
        rolesChangeButton.addEventListener("selection-change", this.onRoleChange);

        addOfficeButton.addEventListener("click", function () {
            addOfficeDialog.open();
        });
        buttonCloseDialog.addEventListener("click", function () {
            addOfficeDialog.close();
        });
    }

    componentDidMount() {
        const URL = DOMAIN+OFFICES;
        this.addEventListeners();
        axios.get(URL).then(o => {
            this.setState({
                offices:o.data

            });
        })
    }

    render() {
        const role = this.state.role;
        const OfficesData = this.state.officesData
        const offices = this.state.offices;
        console.log(role);
        return (
            <div>
                 {
                    offices.map(o =><div><h1>{o.city}</h1><h1>{o.location}</h1></div>)
                }
                <div>
                    <ui5-label>Нашите офиси: </ui5-label>
                    {role === "Модератор" ? <ui5-button id="openDialogButton" design="Emphasized">Добави офис</ui5-button>
                        : <ui5-button id="openDialogButton" disabled design="Emphasized">Добави офис</ui5-button>}
                                        <ui5-segmentedbutton id="roles-changes-button">
                    <ui5-togglebutton id="Потребител" pressed>Потребител</ui5-togglebutton>
                    <ui5-togglebutton id="Офис работник">Офис работник</ui5-togglebutton>
                    <ui5-togglebutton id="Модератор">Модератор</ui5-togglebutton>
                </ui5-segmentedbutton>
                </div>

                {OfficesData.map(o => {
                    return (
                        <div className="office-card">
                            <ui5-card
                                heading={o.OfficeCity + " (" + o.officeId + ")"}
                                class="small">
                                <ui5-timeline>
                                    {role === "Модератор" ?
                                        <div>
                                            <ui5-button >Промени</ui5-button>
                                            <ui5-button value={o.officeId} onClick={this.removeOffice} design="Negative">Изтрий</ui5-button>
                                        </div> :
                                        <div>
                                            <ui5-button disabled>Промени</ui5-button>
                                            <ui5-button value={o.officeId} onClick={this.removeOffice} disabled design="Negative">Изтрий</ui5-button>
                                        </div>}
                                    <ui5-timeline-item title-text={o.officeLocation} icon="locate-me"></ui5-timeline-item>
                                    <ui5-timeline-item title-text={o.officeTelephone} icon="phone"></ui5-timeline-item>
                                </ui5-timeline>
                            </ui5-card>
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
                            <ui5-input id="city"></ui5-input>
                        </div>
                        <div>
                            <ui5-label for="address" required>Адрес: </ui5-label>
                            <ui5-input id="address"></ui5-input>
                        </div>
                        <div>
                            <ui5-label for="officeTelephone" required>Телефонен номер: </ui5-label>
                            <ui5-input id="officeTelephone"></ui5-input>
                        </div>
                    </section>
                    <div slot="footer" class="dialog-footer">
                        <div ></div>
                        <ui5-button id="addOffice" design="Emphasized">Добави</ui5-button>
                        <ui5-button id="closeAddOfficeDialog">Откажи</ui5-button>
                    </div>
                </ui5-dialog>

            </div>
        )
    }
}

export default Offices;