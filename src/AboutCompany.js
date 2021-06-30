import React from 'react';
import { DOMAIN } from "./constants/Domain.js";
import "./AboutCompany.css";
import axios from 'axios';

class AboutCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {}
        };
    }

    componentDidMount() {
        const URL = DOMAIN + "api/authenticate/aboutCompany";

        axios.get(URL).then(p => {
            console.log(p.data);
            this.setState({
               info: p.data
            });
        });

    }

    render() {
        return (
            <div className="about-company-container">
                <ui5-title level="h2">{this.state.info.name}</ui5-title>
                <p>{this.state.info.about}</p>
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