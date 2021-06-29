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
import Package from '../packageSubmit/Package';

class AllPackages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packages: [],
            filteredPackages: [],
            selectedPackageId: 1,
            role: "",
            fromDate: "",
            toDate: "",
            filterInput: ""
        };
        this.handleInputValue = this.handleInputValue.bind(this);
        this.onPackageDetailsClose = this.onPackageDetailsClose.bind(this);
        this.onPackageListSelect = this.onPackageListSelect.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onFilterClear = this.onFilterClear.bind(this);
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
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

    onFilter() {
        let filter = this.state.filteredPackages;
        if (this.state.filterInput !== "") {
            filter = filter.filter(p => (p.senderFirstName + " " + p.senderLastName) === this.state.filterInput
                || p.senderLastName === this.state.filterInput || (p.receiverFirstName + " " + p.receiverLastName) === this.state.filterInput
                || p.receiverLastName === this.state.filterInput || p.senderTelephoneNumber === this.state.filterInput
                || p.receiverTelephoneNumber === this.state.filterInput || p.senderEmail === this.state.filterInput
                || p.receiverEmail === this.state.filterInput || p.fromAddress === this.state.filterInput
                || p.fromCity === this.state.filterInput || p.toAddress === this.state.filterInput || p.toCity === this.state.filterInput);
        }
        if (this.state.fromDate !== ""){
            filter = filter.filter(p => p.dateOfSending === this.state.fromDate);
        }
        this.setState({
            filteredPackages: filter
        })
    }

    onFilterClear() {
        console.log("CLEAR");
        this.setState({
            filteredPackages: this.state.packages,
            filterInput: "",
            toDate: "",
            fromDate: ""
        });
    }

    addEventListeners() {
        const packageList = document.getElementById('packageList');
        if (packageList) {

            packageList.addEventListener("item-click", this.onPackageListSelect);
        }

        document.querySelectorAll('.input').forEach(item => {
            item.addEventListener("change", this.handleInputValue);
        })

        const filterButton = document.getElementById('filter-search-button');
        if (filterButton) {
            filterButton.addEventListener("click", this.onFilter);
        }

        // const clearButton = document.getElementById('filter-clear-button');
        // if (clearButton) {
        //     clearButton.addEventListener("click", this.onFilterClear);
        //     console.log("listener added")
        // }
    }

    removeEventListeners() {
        const packageList = document.getElementById('packageList');
        if (packageList) {
            packageList.removeEventListener("item-click", this.onPackageListSelect);
        }

        document.querySelectorAll('.input').forEach(item => {
            item.removeEventListener("change", this.handleInputValue);
        })

        const filterButton = document.getElementById('filter-search-button');
        if (filterButton) {
            filterButton.removeEventListener("click", this.onFilter);
        }

        // const clearButton = document.getElementById('filter-clear-button');
        // if (clearButton) {
        //     clearButton.removeEventListener("click", this.onFilterClear);
        // }
    }

    componentDidUpdate() {
        this.removeEventListeners();
        this.addEventListeners();
    }

    componentDidMount() {
        this.addEventListeners();
        const URL = DOMAIN + "api/packages";

        const accessToken = JSON.parse(sessionStorage.getItem('user')).accessToken;

        if (accessToken) {

            axios.get(URL, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            }).then(p => {
                this.setState({
                    packages: p.data,
                    filteredPackages: p.data
                });

                if (this.state.filteredPackages.length !== 0) {
                    this.setState({
                        selectedPackageId: this.state.filteredPackages[0].id
                    })
                }
            })

            try {
                const role = JSON.parse(sessionStorage.getItem('user')).role;
                this.setState({
                    role: role
                })
            }
            catch (e) { }

        }


    }


    render() {
        const Package = this.state.filteredPackages.find(d => d.id == this.state.selectedPackageId);
        return (
            <div className="packages-view-container">
                {this.state.filteredPackages.length !== 0 ?
                    <div className="packages-view-table">
                        {this.state.role !== "ROLE_CLIENT" &&
                            <div className="filter-container">
                                <ui5-title level="H4">Филтър</ui5-title>
                                <div className="filter-contents">
                                    <ui5-input class="input" name="filterInput" value={this.state.filterInput} placeholder="Име, телефон, имейл, офис, адрес"></ui5-input>
                                    <ui5-date-picker class="input" value={this.state.fromDate} format-pattern='yyyy-MM-dd' name="fromDate" placeholder="От дата"></ui5-date-picker>
                                    <ui5-date-picker class="input" value={this.state.toDate} format-pattern='yyyy-MM-dd' name="toDate" placeholder="До дата"></ui5-date-picker>
                                    <ui5-button id="filter-search-button" design="Emphasized">Търси</ui5-button>
                                    <ui5-button id="filter-clear-button" onClick={this.onFilterClear}>Изчисти</ui5-button>
                                </div>
                            </div>
                        }
                        <ui5-flexible-column-layout id="fcl" layout="TwoColumnsMidExpanded">
                            <div slot="startColumn">
                                <ui5-list id="packageList" header-text="Пратки">
                                    {this.state.filteredPackages.map(m => {
                                        return (
                                            <div>
                                                <ui5-li data-id={m.id} icon="navigation-right-arrow"
                                                    icon-end description={"Получател: " + m.receiverFirstName + " " + m.receiverLastName}
                                                    info={m.ePackageStatus} info-state="Success">{m.senderFirstName + " " + m.senderLastName}</ui5-li>
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
                                                <div className="first-information-child">
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
                                                </div>
                                                <div>
                                                    <div className="information-row">
                                                        <div className="information-item">Телефон:</div> &nbsp;&nbsp;&nbsp;
                                                        <span><b>{Package.senderTelephoneNumber}</b></span>
                                                    </div>
                                                    <div className="information-row">
                                                        <div className="information-item">Имейл:</div> &nbsp;&nbsp;&nbsp;
                                                        <span><b>{Package.senderEmail}</b></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </ui5-timeline-item>

                                        <ui5-timeline-item id="test-item" icon="locate-me" item-name="Данни за Доставка:">
                                            <div className="information-container">
                                                <div className="first-information-child">
                                                    <div className="information-row">
                                                        <div className="information-item">Пратено До:</div> &nbsp;&nbsp;&nbsp;
                                                        <span>
                                                            {Package.toFirm && <b>{Package.toFirmName},  </b>}
                                                            <b>{Package.receiverFirstName} </b>
                                                            <b>{Package.receiverLastName}</b>
                                                        </span>
                                                    </div>
                                                    <div className="information-row">
                                                        <div className="information-item">Доставка до:</div> &nbsp;&nbsp;&nbsp;
                                                        <span>
                                                            {Package.toOffice && <b>ОФИС: </b>}
                                                            <b>{Package.toCity},  {Package.toAddress}</b>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
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
                                            </div>
                                        </ui5-timeline-item>

                                        <ui5-timeline-item id="test-item" icon="tags" item-name="Допълнителна информация към пратката:">
                                            <div className="information-container">
                                                <div className="first-information-child">
                                                    <div className="information-row">
                                                        <div className="information-item">Коментар:</div> &nbsp;&nbsp;&nbsp;
                                                        <span>{Package.comment !== "" ? <b>{Package.comment}</b>
                                                            : <b>Няма коментар към пратката</b>}</span>
                                                    </div>
                                                    <div className="information-row">
                                                        <div className="information-item">Алтернативен адрес:</div> &nbsp;&nbsp;&nbsp;
                                                        <span>
                                                            {Package.returnToOffice && <b>ОФИС: </b>}
                                                            <b>{Package.alternativeCity},  {Package.returnLocation}</b>
                                                        </span>
                                                    </div>
                                                    <div className="information-row">
                                                        {Package.fragile && <ui5-badge color-scheme="9">Чупливи предмети</ui5-badge>}
                                                    </div>
                                                </div>
                                                <div>
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
                                        </ui5-timeline-item>

                                        <ui5-timeline-item title-text="Статус на Пратката"
                                            subtitle-text={Package.dateOfRegistration !== null ?
                                                ("Обработена на " + Package.dateOfRegistration.slice(0, 10)) : "Непотвърдена"} icon="calendar">
                                            <div className="information-container">
                                                <div className="first-information-child">
                                                    <div className="information-row">
                                                        <div className="information-item">Дата на заявяване:</div> &nbsp;&nbsp;&nbsp;
                                                        <span><b>{Package.dateOfRequest.slice(0, 10)}</b></span>
                                                    </div>
                                                    <div className="information-row">
                                                        <div className="information-item">Дата на изпращане:</div> &nbsp;&nbsp;&nbsp;
                                                        <span><b>{Package.dateOfSending}</b></span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="information-row">
                                                        <div className="information-item">Очаквана дата за вземане/доставка:</div> &nbsp;&nbsp;&nbsp;
                                                        <span><b>{Package.dateOfDelivery}</b></span>
                                                    </div>
                                                    <ui5-badge color-scheme="6">
                                                        <ui5-icon name="accept" slot="icon"></ui5-icon>{Package.ePackageStatus}
                                                    </ui5-badge>
                                                </div>
                                            </div>
                                        </ui5-timeline-item>
                                    </ui5-timeline>
                                </div> : null}
                        </ui5-flexible-column-layout>
                    </div> :
                    this.state.role === "ROLE_CLIENT" ? <ui5-messagestrip type="Information" no-close-button>Все още нямате пратки :(</ui5-messagestrip> :
                        <ui5-messagestrip type="Information" no-close-button>Не съществува такава пратка :(</ui5-messagestrip>
                }
            </div>
        )
    }
}

export default AllPackages