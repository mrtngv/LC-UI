import React from 'react';

import "./AllPackages.css";
import PackageData from "./PackageData.js";

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
            selectedPackageId: "1"
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
        packageList.addEventListener("item-click", this.onPackageListSelect);
  
    }

    componentDidMount() {
        this.addEventListeners();
    }

    render() {
        const Package = PackageData.find(d => d.packageId === this.state.selectedPackageId);
        return (
            <div className="packages-view-container">
                <div className="packages-view-table">
                    <ui5-flexible-column-layout id="fcl" layout="TwoColumnsMidExpanded">
                        <div slot="startColumn">
                            <ui5-list id="packageList" header-text="Пратки">
                                {PackageData.map(m => {
                                    return (
                                        <div>
                                            <ui5-li data-id={m.packageId} icon="navigation-right-arrow" icon-end description={"Id: " + m.packageId} info={m.status} info-state="Success">{m.senderName}</ui5-li>
                                        </div>
                                    )
                                })}

                            </ui5-list>
                        </div>
                        {Package ?
                            <div slot="midColumn">
                                <div class="colHeader">
                                    <ui5-bar>
                                        <ui5-button design="Positive" slot="endContent">Промени</ui5-button>
                                        <ui5-button design="Negative" slot="endContent">Изтрий</ui5-button>
                                        <ui5-button id="mid-column-close-button" design="Transparent" slot="endContent" onClick={this.onPackageDetailsClose}>Затвори</ui5-button>
                                    </ui5-bar>
                                </div>
                                <ui5-timeline>
                                    <ui5-timeline-item id="test-item" icon="person-placeholder" item-name="Потребителски данни:">
                                        <div className="information-row">
                                            <div className="information-item">Пратено От:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.senderName}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">От Адрес:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.senderAddress}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Пратено До:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.recipientName}</b></span>
                                        </div>
                                    </ui5-timeline-item>
                                    <ui5-timeline-item id="test-item" icon="locate-me" item-name="Данни за Доставка:">
                                        <div className="information-row">
                                            <div className="information-item">Доставка до:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>Адрес: </b>&nbsp;{Package.recipientAddress}</span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Доставка от Куриер:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.deliveredByName}</b>&nbsp; Тел. {Package.deliveredByPhone}</span>
                                        </div>
                                    </ui5-timeline-item>

                                    <ui5-timeline-item id="test-item" icon="tags" item-name="Допълнителна информация към пратката:">
                                        <div className="information-row">
                                            <div className="information-item">Тип:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.packageType}</b></span>
                                        </div>
                                        <div className="information-row">
                                            <div className="information-item">Тегло:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.packageWeight}</b></span>
                                        </div>
                                        <div className="information-row">
                                            {/* <ui5-badge color-scheme="8">solution provided 8</ui5-badge> */}
                                            <ui5-badge color-scheme="9">Чупливи предмети</ui5-badge>
                                        </div>
                                    </ui5-timeline-item>
                                    <ui5-timeline-item title-text="Статус на Пратката" subtitle-text={"Обработена на " + Package.shippingDate} icon="calendar">
                                        <div className="information-row">
                                            <div className="information-item">Очаквана дата за Вземане/Доставка:</div> &nbsp;&nbsp;&nbsp;
                                            <span><b>{Package.deliveryDate}</b></span>
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