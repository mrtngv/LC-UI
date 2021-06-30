import React from 'react';
import { DOMAIN } from "./constants/Domain.js";
import "./AboutCompany.css";
import axios from 'axios';

class AboutCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            info: {},
            isClicked: false,
            sectionName: "",
            sectionAbout: ""
        };
        this.onRedactButton = this.onRedactButton.bind(this);
        this.onSaveButton = this.onSaveButton.bind(this);
        this.onBackButton = this.onBackButton.bind(this);
        this.handleInputValue = this.handleInputValue.bind(this);
        this.onInfoLoad = this.onInfoLoad.bind(this);
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }


    onRedactButton() {
        this.setState({
            isClicked: true
        })
    }

    onSaveButton() {
        const URL = DOMAIN + "api/authenticate/aboutCompany";

        const user = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = user.accessToken;

        const aboutDetails = {
            "name": this.state.sectionName,
            "about": this.state.sectionAbout
        }

        axios.post(URL, aboutDetails, {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }).then(res => {
            this.setState({
                isClicked: false
            });
            this.onInfoLoad();
        });

    }

    onBackButton() {
        this.setState({
            isClicked: false
        })
    }

    addEventListeners() {
        document.querySelectorAll('.input').forEach(item => {
            item.addEventListener("change", this.handleInputValue);
        })
    }

    removeEventListeners() {
        document.querySelectorAll('.input').forEach(item => {
            item.removeEventListener("change", this.handleInputValue);
        })
    }

    componentDidMount() {
        this.addEventListeners();
        this.onInfoLoad();
    }

    onInfoLoad() {

        const URL = DOMAIN + "api/authenticate/aboutCompany";

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            const role = user.role;

            if (role === "ROLE_MODERATOR") {
                this.setState({
                    role: role
                })
            }
        }

        axios.get(URL).then(p => {
            this.setState({
                info: p.data,
                sectionName: p.data.name,
                sectionAbout: p.data.about
            });
        });

    }

    componentDidUpdate(){
        this.removeEventListeners();
        this.addEventListeners();
    }

    render() {
        return (
            <div className="about-company-container">
                {this.state.isClicked ?
                    <div>
                        <div className="t">
                            <ui5-input class="input" name="sectionName" value={this.state.info.name}></ui5-input>
                            <div>
                                <ui5-button id="save-about-info-btn" design="Emphasized" onClick={this.onSaveButton}>Запази</ui5-button>
                                <ui5-button design="Transparent" onClick={this.onBackButton}>Откажи</ui5-button>
                            </div>
                        </div>
                        <div className="desc">
                            <ui5-textarea class="input" name="sectionAbout" growing="true" value={this.state.info.about}></ui5-textarea>
                        </div>
                    </div> :
                    <div className="editable-about-company">
                        <div className="t">
                            <ui5-title level="h2">{this.state.info.name}</ui5-title>
                            {this.state.role !== "" &&
                                <ui5-button design="Emphasized" onClick={this.onRedactButton}>Редактирай</ui5-button>}
                        </div>
                        <i><div className="desc">{this.state.info.about}</div></i>
                        <div className="t">
                            <ui5-title level="h2">Нашият Екип</ui5-title>
                        </div>
                    </div>}
                <ui5-list id="team-list" class="full-width">
                    <ui5-li description={this.state.info.har1}>{this.state.info.person1}</ui5-li>
                    <ui5-li description={this.state.info.har2}>{this.state.info.person2}</ui5-li>
                    <ui5-li description={this.state.info.har3}>{this.state.info.person3}</ui5-li>
                    <ui5-li description={this.state.info.har4}>{this.state.info.person4}</ui5-li>
                    <ui5-li description={this.state.info.har5}>{this.state.info.person5}</ui5-li>
                </ui5-list>
            </div>
        )
    }
}

export default AboutCompany