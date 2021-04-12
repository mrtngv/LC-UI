import React from 'react';
import "./Offices.css";
import "@ui5/webcomponents/dist/Card";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Label";
import OfficesData from "./OfficesData.js";

class Offices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    addEventListeners() {
        const addOfficeButton = document.getElementById("openDialogButton");
        const addOfficeDialog = document.getElementById("add-office-dialog");
        const buttonCloseDialog = document.getElementById("closeAddOfficeDialog");

        addOfficeButton.addEventListener("click", function () {
            addOfficeDialog.open();
        });
        buttonCloseDialog.addEventListener("click", function () {
            addOfficeDialog.close();
        });
    }

    componentDidMount() {
        this.addEventListeners();
    }

    render() {
        return (
            <div>
                <div>
                    <ui5-label>Нашите офиси: </ui5-label>
                    <ui5-button id="openDialogButton" design="Emphasized">Добави офис</ui5-button>
                </div>
                {OfficesData.map(o => {
                    return (
                        <div className="office-card">
                            <ui5-card
                                heading={o.OfficeCity + " (" + o.officeId + ")"}
                                class="small">
                                <ui5-timeline>
                                    <div>
                                        <ui5-button>Промени</ui5-button>
                                        <ui5-button design="Negative">Изтрий</ui5-button>
                                    </div>
                                    <ui5-timeline-item title-text={o.officeLocation} icon="locate-me"></ui5-timeline-item>
                                    <ui5-timeline-item title-text={o.officeTelephone} icon="phone"></ui5-timeline-item>
                                </ui5-timeline>
                            </ui5-card>
                        </div>
                    )
                })}
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