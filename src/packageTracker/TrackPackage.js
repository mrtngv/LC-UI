import React from 'react';
import axios from 'axios';

import { DOMAIN } from ".././constants/Domain.js";

import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "./TrackPackage.css";
import { mapPackageStatus } from "../constants/MapPackageStatus";
import TrackPackageRow from './TrackPackageRow';
import image from '../images/track-order.png';

class TrackPackage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            privateCode: '',
            isFragile: '',
            ePackageType: '',
            ePackageStatus: '',
            weight: '',
            fromOffice: '',
            fromAddress: '',
            senderFirstName: '',
            senderLastName: '',
            senderTelephoneNumber: '',
            toOffice: '',
            toAddress: '',
            fromCity: '',
            toCity: '',
            receiverFirstName: '',
            receiverLastName: '',
            receiverTelephoneNumber: '',
            isReturnToOffice: '',
            isFirm: '',
            ePayMethod: '',
            dateOfDelivery: '',
            dateOfRequest: '',
            dateOfSending: ''
        };

        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.packageType = this.packageType.bind(this);
        this.editPackage = this.editPackage.bind(this);
    }

    handleInputValue(event) {
        this.setState({
            privateCode: event.target.value
        });
    }

    addEventListeners() {
        const trackPackageInput = document.getElementById("track-package-input");
        trackPackageInput.addEventListener("change", this.handleInputValue);

        const trackPackageBtn = document.getElementById("track-package-btn");
        trackPackageBtn.addEventListener("click", () => {
            this.handleSubmit();
          }); 
    }

    componentDidMount() {
        this.addEventListeners();
    }

    handleSubmit() {
        const URL = DOMAIN + "api/packages/specific";
        const privateCode = this.state.privateCode;

        axios.post(URL, {
            code: privateCode
        }).then(response => {
            this.setState({
                id: response.data.id,
                isFragile: response.data.isFragile,
                ePackageType: response.data.ePackageType,
                ePackageStatus: response.data.ePackageStatus,
                weight: response.data.weight,
                fromOffice: response.data.fromOffice,
                fromAddress: response.data.fromAddress,
                senderFirstName: response.data.senderFirstName,
                senderLastName: response.data.senderLastName,
                senderTelephoneNumber: response.data.senderTelephoneNumber,
                toOffice: response.data.toOffice,
                toAddress: response.data.toAddress,
                receiverFirstName: response.data.receiverFirstName,
                receiverLastName: response.data.receiverLastName,
                receiverTelephoneNumber: response.data.receiverTelephoneNumber,
                isReturnToOffice: response.data.isReturnToOffice,
                isFirm: response.data.isFirm,
                ePayMethod: response.data.ePayMethod,
                fromCity: response.data.fromCity,
                toCity: response.data.toCity,
                dateOfRequest: response.data.dateOfRequest,
                dateOfSending: response.data.dateOfSending,
                dateOfDelivery: response.data.dateOfDelivery
            });
            document.getElementById('package-info').style.display = "block";
        }).catch(error => {
            console.log("Missing package with this id");
            document.getElementById('package-info').style.display = "none";
        });
    }

    packageType() {
        switch (this.state.ePackageType) {
            case 'DOCUMENTS':
                return '??????????????????'
            case 'BOX':
                return '??????????'
            case 'PALLET':
                return '??????????'
            case 'ELECTRONICS':
                return '??????????????????????'
            case 'BAG':
                return '??????????'
            default:
                return ''
        }
    }

    editPackage() {
        this.props.history.push({
            pathname: '/package/edit',
            state: this.state.id
        });
    }

    render() {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const editPackage = () => {
           if (user && user.role !== "NO_ROLE" && user.role !== "ROLE_CLIENT") {
                return <ui5-button id="edit-package" onClick={this.editPackage} data-layout-span="XL9" design="Emphasized" >???????????????????? ????????????</ui5-button>
           } 
        }
        return (
            <div className="track-package">
                <div className="track-package-container">
                    <ui5-card heading="???????????????? ????????????" class="small">
                        <div className="track-package-card-content">
                            <ui5-input id="track-package-input" placeholder="???????????? ?????????? ???? ????????????" data-layout-span="XL9" type="String"></ui5-input>
                            <ui5-button id="track-package-btn" data-layout-span="XL9" design="Emphasized" >????????????????</ui5-button>
                        </div>
                        <img src={image} alt="Track Package"/>
                    </ui5-card>

                    <div id="package-info">
                        <div className="package-header-wrapper">
                            <span class="package-header">???????????????????? ???? ????????????</span>
                            {editPackage()}
                        </div>

                        <ui5-table class="package-table" id="table">
                            <TrackPackageRow title="?????????? ???? ????????????" value={this.state.privateCode} />

                            <ui5-table-row>
                                <ui5-table-cell slot="default-1" first-in-row>???????????? ???? ????????????</ui5-table-cell>
                                <ui5-table-cell slot="default-2"><ui5-badge color-scheme="6">
                                <ui5-icon name="accept" slot="icon"></ui5-icon>{mapPackageStatus(this.state.ePackageStatus)}
                            </ui5-badge></ui5-table-cell>
                            </ui5-table-row>
                            <TrackPackageRow title="???????? ???? ??????????????????" value={this.state.dateOfRequest.slice(0, 10)} />
                            <TrackPackageRow title="???????? ???? ??????????????????" value={this.state.dateOfSending || '-'} />
                            <TrackPackageRow title="???????? ???? ????????????????????" value={this.state.dateOfDelivery || '-'} />
                            <TrackPackageRow title="?????? ???? ????????????????" value={this.packageType()} />
                            <TrackPackageRow title="??????????" value={this.state.weight} />
                            <TrackPackageRow title="??????????????" value={this.state.isFragile ? '????' : '????'} />
                            <TrackPackageRow title="??????????????" value={this.state.senderFirstName + ' ' + this.state.senderLastName} />
                            <TrackPackageRow title="?????????????? ???? ??????????????" value={this.state.senderTelephoneNumber} />
                            <TrackPackageRow title="??????????????????" value={this.state.receiverFirstName + ' ' + this.state.receiverLastName} />
                            <TrackPackageRow title="?????????????? ???? ??????????????????" value={this.state.receiverTelephoneNumber} />
                            <TrackPackageRow title={this.state.fromOffice ? "?????????????????? ???? ????????" : "?????????????????? ???? ??????????"} value={this.state.fromCity + ', ' + this.state.fromAddress} />
                            <TrackPackageRow title={this.state.toOffice ? "?????????????????? ?????? ????????" : "?????????????????? ?????? ??????????"} value={this.state.toCity + ', ' + this.state.toAddress} />
                        </ui5-table>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default TrackPackage;
