import React from 'react';
import axios from 'axios';

import "./AllPackages.css";
import PackageData from "./PackageData.js";
import { DOMAIN } from ".././constants/Domain.js";

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

// TODO: -> линк към user details, който ще го има във втората колона на пратено от: {име} и пратено до {име}

class AllPackages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packages: [],
            selectedPackageId: "1",
            role: ""
        };
        this.onPackageDetailsClose = this.onPackageDetailsClose.bind(this);
        this.onPackageListSelect = this.onPackageListSelect.bind(this);
    }

    onPackageListSelect(event) {
        const id = event.detail.item.getAttribute("data-id");
        this.setState({
            selectedPackageId: id
        })
    }

    onPackageDetailsClose() {
        this.setState({
            selectedPackageId: -1
        })
    }

    addEventListeners() {
        const packageList = document.getElementById('packageList');
        if (packageList) {

            packageList.addEventListener("item-click", this.onPackageListSelect);
        }
    }

    removeEventListeners() {
        const packageList = document.getElementById('packageList');
        packageList.removeEventListener("item-click", this.onPackageListSelect);
    }

    componentDidMount() {
        this.addEventListeners();
        const URL = DOMAIN + "api/packages";
        //const accessToken = JSON.parse(sessionStorage.getItem('user')).accessToken;
        axios.get(URL).then(p => {
            this.setState({
                packages: p.data
            });
        })

        try {
            const role = JSON.parse(sessionStorage.getItem('user')).role;
            this.setState({
                role: role
            })
        }
        catch (e) { }
    }

    // componentDidUpdate() {
    //     this.removeEventListeners();
    //     this.addEventListeners();
    // }

    render() {
        const Package = this.state.packages.find(d => d.id == this.state.selectedPackageId);
        return (
            <div className="packages-view-container">
                <div className="packages-view-table">
                    <ui5-flexible-column-layout id="fcl" layout="TwoColumnsMidExpanded">
                        <div slot="startColumn">
                            <ui5-list id="packageList" header-text="Пратки">
                                {this.state.packages.map(m => {
                                    return (
                                        <div>
                                            <ui5-li data-id={m.id} icon="navigation-right-arrow" icon-end description={"Id: " + m.id} info={m.ePackageStatus} info-state="Success">{m.senderFirstName + " " + m.senderLastName}</ui5-li>
                                        </div>
                                    )
                                })}

                            </ui5-list>
                        </div>
                        {Package ?
                            <div slot="midColumn">
                                <div class="colHeader">
                                    {this.state.role !== "ROLE_CLIENT" ?
                                        <ui5-bar>
                                            <ui5-button design="Positive" slot="endContent">Промени</ui5-button>
                                            <ui5-button design="Negative" slot="endContent">Изтрий</ui5-button>
                                            <ui5-button id="mid-column-close-button" design="Transparent" slot="endContent" onClick={this.onPackageDetailsClose}>Затвори</ui5-button>
                                        </ui5-bar> :
                                        <ui5-bar>
                                            <ui5-button id="mid-column-close-button" design="Transparent" slot="endContent" onClick={this.onPackageDetailsClose}>Затвори</ui5-button>
                                        </ui5-bar>}
                                </div>
                                <ui5-timeline>
                                    <ui5-timeline-item id="test-item" icon="person-placeholder" item-name="Потребителски данни:">
                                        <div className="information-container">
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
                                                <span><b>{Package.fromAddress}</b></span>
                                            </div>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Пратено От:</div> &nbsp;&nbsp;&nbsp;
                                            <span>
                                                <b>{Package.senderFirstName} </b>
                                                <b>{Package.senderLastName}</b>
                                            </span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">От Адрес:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.fromAddress}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Пратено До:</div> &nbsp;&nbsp;&nbsp;
                                            <span>
                                                <b>{Package.receiverFirstName} </b>
                                                <b>{Package.receiverLastName}</b>
                                            </span>
                                        </div>
                                    </ui5-timeline-item>
                                    <ui5-timeline-item id="test-item" icon="locate-me" item-name="Данни за Доставка:">
                                        <div className="information-row">
                                            <div className="information-item">Доставка до:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>Адрес: </b>&nbsp;{Package.toAddress}</span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Доставка от Куриер:</div> &nbsp;&nbsp;&nbsp;
                                            {/* <span><b>{Package.deliveredByName}</b>&nbsp; Тел. {Package.deliveredByPhone}</span> */}
                                        </div>
                                    </ui5-timeline-item>

                                    <ui5-timeline-item id="test-item" icon="tags" item-name="Допълнителна информация към пратката:">
                                        <div className="information-row">
                                            <div className="information-item">Тип:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.ePackageType}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Тегло:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.weight}</b></span>
                                        </div>
                                        <div className="information-row">
                                            {/* <ui5-badge color-scheme="8">solution provided 8</ui5-badge> */}
                                            <ui5-badge color-scheme="9">Чупливи предмети</ui5-badge>
                                        </div>
                                    </ui5-timeline-item>
                                    <ui5-timeline-item title-text="Статус на Пратката" subtitle-text={"Обработена на " + Package.dateOfRegistration} icon="calendar">
                                        <div className="information-row">
                                            <div className="information-item">Очаквана дата за Вземане/Доставка:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.dateOfDelivery}</b></span>
                                        </div>
                                        <ui5-badge color-scheme="6">
                                            <ui5-icon name="accept" slot="icon"></ui5-icon>Доставена
                                        </ui5-badge>
                                    </ui5-timeline-item>
                                </ui5-timeline>
                            </div> : null}
                    </ui5-flexible-column-layout>
                </div>
            </div>
        )
    }
}

export default AllPackages