import React from 'react';
import axios from 'axios';
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "./TrackPackage.css";
import TrackPackageRow from './TrackPackageRow';
import image from '../images/track-order.png';

class TrackPackage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packageId: '',
            isFragile: '',
            ePackageType: '',
            weight: '',
            fromOffice: '',
            fromAddress: '',
            senderFirstName: '',
            senderLastName: '',
            senderTelephoneNumber: '',
            toOffice: '',
            toAddress: '',
            receiverFirstName: '',
            receiverLastName: '',
            receiverTelephoneNumber: '',
            isReturnToOffice: '',
            dateOfDelivery: '',
            isFirm: '',
            ePayMethod: ''
        };

        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.packageType = this.packageType.bind(this);
    }

    handleInputValue(event) {
        this.setState({
            packageId: event.target.value
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
        const URL = "http://localhost:8080/api/packages/specific";
        const privateCode = this.state.packageId;

        axios.post(URL, {
            code: privateCode
        }).then(response => {
            this.setState({
                isFragile: response.data.isFragile,
                ePackageType: response.data.ePackageType,
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
                dateOfDelivery: response.data.dateOfDelivery,
                isFirm: response.data.isFirm,
                ePayMethod: response.data.ePayMethod
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
                return 'Документи'
            case 'BOX':
                return 'Кашон'
            case 'PALLET':
                return 'Палет'
            case 'ELECTRONICS':
                return 'Електроника'
            case 'BAG':
                return 'Колет'
            default:
                return ''
        }
    }

    render() {
        return (
            <div className="track-package">
                <div className="track-package-container">
                    <ui5-card heading="Проследи пратка" class="small">
                        <div className="track-package-card-content">
                            <ui5-input id="track-package-input" placeholder="Въведи номер на пратка" data-layout-span="XL9" type="String"></ui5-input>
                            <ui5-button id="track-package-btn" data-layout-span="XL9" design="Emphasized" >Проследи</ui5-button>
                        </div>
                        <img src={image} alt="Track Package"/>
                    </ui5-card>

                    <div id="package-info">
                        <div className="package-header-wrapper">
                            <span class="package-header">Информация за пратка</span>
                            <ui5-button id="edit-package" data-layout-span="XL9" design="Emphasized" >Редактирай пратка</ui5-button>
                        </div>

                        <ui5-table class="package-table" id="table">
                            <TrackPackageRow title="Номер на пратка" value={this.state.packageId} />
                            <TrackPackageRow title="Тип на пратката" value={this.packageType()} />
                            <TrackPackageRow title="Тегло" value={this.state.weight} />
                            <TrackPackageRow title="Чупливо" value={this.state.isFragile ? 'Да' : 'Не'} />
                            <TrackPackageRow title="Подател" value={this.state.senderFirstName + ' ' + this.state.senderLastName} />
                            <TrackPackageRow title="Телефон на подател" value={this.state.senderTelephoneNumber} />
                            <TrackPackageRow title="Получател" value={this.state.receiverFirstName + ' ' + this.state.receiverLastName} />
                            <TrackPackageRow title={this.state.fromOffice ? "Изпратено от офис" : "Изпратено от адрес"} value={this.state.fromAddress} />
                            <TrackPackageRow title={this.state.toOffice ? "Изпратено към офис" : "Изпратено към адрес"} value={this.state.toAddress} />
                            <TrackPackageRow title="Телефон на получател" value={this.state.receiverTelephoneNumber} />
                        </ui5-table>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default TrackPackage;
