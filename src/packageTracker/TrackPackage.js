import React from 'react';
import "@ui5/webcomponents/dist/Label";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents-fiori/dist/Timeline";
import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Table";
import "@ui5/webcomponents/dist/TableColumn";
import "@ui5/webcomponents/dist/TableRow";
import "@ui5/webcomponents/dist/TableCell";
import "./TrackPackage.css";
import { Grid } from '@ui5/webcomponents-react';
import PackageData from '../packageView/PackageData';
import TrackPackageRow from './TrackPackageRow'
let Package;

class TrackPackage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            packageId: '',
            status: '',
            packageType: '',
            packageWeight: '',
            isShippedFromOffice: '',
            shippedFromOfficeName: '',
            senderName: '',
            senderAddress: '',
            senderTelephone: '',
            isShippedToOffice: '',
            isShippedToOfficeName: '',
            recipientName: '',
            recipientAddress: '',
            recipientTelephone: '',
            processedBy: '',
            deliveredByName: '',
            deliveredByPhone: '',
            shippingDate: '',
            deliveryDate: ''
        };

        this.handleInputValue = this.handleInputValue.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        Package = PackageData.find( element => element.packageId === this.state.packageId);

        if (Package) {
            this.setState({
                status: Package.status,
                packageType: Package.packageType,
                packageWeight: Package.packageWeight,
                isShippedFromOffice: Package.isShippedFromOffice,
                shippedFromOfficeName: Package.shippedFromOfficeName,
                senderName: Package.senderName,
                senderAddress: Package.senderAddress,
                senderTelephone: Package.senderTelephone,
                isShippedToOffice: Package.isShippedToOffice,
                shippedToOfficeName: Package.shippedToOfficeName,
                recipientName: Package.recipientName,
                recipientAddress: Package.recipientAddress,
                recipientTelephone: Package.recipientTelephone,
                processedBy: Package.processedBy,
                deliveredByName: Package.deliveredByName,
                deliveredByPhone: Package.deliveredByPhone,
                shippingDate: Package.shippingDate,
                deliveryDate: Package.deliveryDate
            });

            document.getElementById('package-info').style.display = "block";
        } else {
            document.getElementById('package-info').style.display = "none";
        }
    }

    render() {
        return (
            <div className="track-package">
                <div className="track-package-container">
                    <Grid>
                        <ui5-label id="track-package-label" data-layout-span="XL12" for="track-package-input">Проследи пратка</ui5-label>
                        <ui5-input id="track-package-input" placeholder="Въведи номер на пратка" data-layout-span="XL9" ></ui5-input>
                        <ui5-button id="track-package-btn" data-layout-span="XL9" design="Emphasized" >Проследи</ui5-button>
                    </Grid>
                </div>
                <div id="package-info">
                    <div className="package-header">
                        <span>Информация за пратка</span>
                    </div>

                    <ui5-timeline>
	                    <ui5-timeline-item title-text="Дата на изпращане" subtitle-text={this.state.shippingDate} icon="product">
                        </ui5-timeline-item>
                        <ui5-timeline-item title-text="Дата на получаване" subtitle-text={this.state.deliveryDate} icon="sap-icon://person-placeholder">
                        </ui5-timeline-item>
                    </ui5-timeline>

                    <ui5-table class="package-table" id="table">
                        <TrackPackageRow title="Номер на пратка" value={this.state.packageId} />
                        <TrackPackageRow title="Статус" value={this.state.status} />
                        <TrackPackageRow title="Тип на пратката" value={this.state.packageType} />
                        <TrackPackageRow title="Тегло" value={this.state.packageWeight} />
                        <TrackPackageRow title="Чупливо" value={this.state.isFragile ? 'yes' : 'no'} />
                        <TrackPackageRow title="Подател" value={this.state.senderName} />
                        <TrackPackageRow title="Адрес на подател" value={this.state.senderAddress} />
                        <TrackPackageRow title="Телефон на подател" value={this.state.senderTelephone} />
                        <TrackPackageRow title="Изпретено от офис" value={this.state.isShippedFromOffice ? this.state.shippedFromOfficeName : 'no'} />
                        <TrackPackageRow title="Изпретено към офис" value={this.state.isShippedToOffice ? this.state.isShippedToOfficeName : 'no'} />
                        <TrackPackageRow title="Получател" value={this.state.recipientName} />
                        <TrackPackageRow title="Адрес на получател" value={this.state.recipientAddress} />
                        <TrackPackageRow title="Телефон на получател" value={this.state.recipientTelephone} />
                        <TrackPackageRow title="Обработил пратката" value={this.state.processedBy} />
                        <TrackPackageRow title="Име на доставчик" value={this.state.deliveredByName} />
                        <TrackPackageRow title="Номер на доставчик" value={this.state.deliveredByPhone} />
                    </ui5-table>
                </div>
            </div>
        )
    }
}

export default TrackPackage;
