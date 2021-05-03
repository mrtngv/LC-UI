import React from 'react';

import "./AllPackages.css";
import PackageData from "./PackageData.js";

import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";
import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableColumn.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js"


class AllPackages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPackageId: ""
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
        console.log(Package);
        return (
            <div>
                <div className="packages-header-bar">
                    <ui5-bar design="Header">
                        <ui5-button icon="home" title="Go home" slot="startContent"></ui5-button>
                        <ui5-label id="basic-label" slot="middleContent">Активни пратки:</ui5-label>

                        <ui5-button icon="action-settings" title="Go to settings" slot="endContent"></ui5-button>
                        <ui5-input id="package-search-input" placeholder="Намери пратка..."></ui5-input>
                    </ui5-bar>
                </div>


                <div className="packages-flexible-column-layout">
                    <ui5-flexible-column-layout id="fcl" layout="TwoColumnsMidExpanded">
                        <div slot="startColumn">
                            <ui5-list id="packageList" header-text="Packages">
                                {PackageData.map(m => {
                                    return (
                                        <div>
                                            <ui5-li data-id={m.packageId} icon="navigation-right-arrow" icon-end description={"Id: " + m.packageId} info={m.status} info-state="Success">{m.shippedFrom}</ui5-li>
                                        </div>
                                    )
                                })}

                            </ui5-list>
                        </div>
                        {Package ?
                            <div slot="midColumn">
                                <div class="colHeader">
                                    <ui5-button design="Emphasized">Edit</ui5-button>
                                    <ui5-button design="Transparent" icon="add"></ui5-button>
                                    <ui5-button id="fullscreenEndColumn" design="Transparent" icon="full-screen"></ui5-button>
                                    <ui5-button onClick={this.onPackageDetailsClose} id="closeEndColumn" icon="decline" design="Transparent"></ui5-button>
                                </div>
                                <div className="delivery-information">
                                    <div className="customer-details">
                                        <h3>Customer Details</h3>
                                        <ui5-label>Phone Number: </ui5-label>
                                        <h4>{Package.telephoneNumber}</h4>
                                        <ui5-label>Name </ui5-label>
                                        <h4>{Package.shippedFrom}</h4>
                                    </div>
                                    <div className="package-details">
                                        <h3>Package Details</h3>
                                        <ui5-label>Package Identification:</ui5-label>
                                        <h4>{Package.packageId}</h4>
                                        <ui5-label>Processed By </ui5-label>
                                        <h4>{Package.processedBy}</h4>
                                        <ui5-label>Status </ui5-label>
                                        <h4>{Package.status}</h4>
                                        <ui5-label>Shipped To: </ui5-label>
                                        <h4>{Package.shippedTo}</h4>
                                        <ui5-label>Shipping Date </ui5-label>
                                        <h4>{Package.shippingDate}</h4>
                                    </div>
                                    <div className="delivery-details">
                                        {Package.deliveredBy ?
                                            <div>
                                                <h3>Deivery Details</h3>
                                                <ui5-label>Deviver By: </ui5-label>
                                                <h4>{Package.deliveredBy.name}</h4>
                                                <ui5-label>telephone : </ui5-label>
                                                <h4>{Package.deliveredBy.telephone}</h4>
                                            </div> : null}
                                    </div>
                                </div>
                            </div> : null}
                    </ui5-flexible-column-layout>
                </div>
            </div>
        )
    }
}

export default AllPackages