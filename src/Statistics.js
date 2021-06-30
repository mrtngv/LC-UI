import React from "react"
import ReactApexChart from 'react-apexcharts';

import { DOMAIN } from "./constants/Domain.js";

import "@ui5/webcomponents/dist/Card";
import axios from 'axios';
import "./Statistics.css";

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardDetails: {},
            seriesSystems: [2.5,5],
            cc: {},
            optionsSystems: {
                labels: ['Завършени', 'Да се направят'],
                colors: ['#4CAF50', '#F9C80E'],
                chart: {
                    type: 'donut',
                },
            },
            s1: [4,4],
            s2: [2.5,5],
            seriesInstances: [1,5],
            optionsInstances: {
                labels: ['Завършени', 'Да се направят'],
                colors: ['#4CAF50', '#919191'],
                chart: {
                    type: 'donut',
                },
            }
        }
    }

    componentDidMount(){

    }



    render() {
        return (
            <div className="statistics-container">
                <div className="titlee">
                <p>Content goes here</p>
                </div>
                <div className="dashboard">
                <div className="dashboard-card">
                    <ui5-card  heading="Общо задачи" subheading={ "(" + (this.state.cc.finished+this.state.cc.todo)+ ")"}>
                        <ReactApexChart options={this.state.optionsSystems} series={this.state.s1} type="donut"  />
                    </ui5-card>
                </div>
                <div className="dashboard-card">
                <ui5-card heading="Задачи за седем дена назад от днес" subheading={"(" + (this.state.cc.dateTodo+this.state.cc.dateFinished)+  ")"}>
                    <ReactApexChart options={this.state.optionsInstances} series={this.state.s2} type="donut"  />
                </ui5-card>
                </div>
            </div>
            <div className="dashboard">
                <div className="dashboard-card">
                    <ui5-card  heading="Общо задачи" subheading={ "(" + (this.state.cc.finished+this.state.cc.todo)+ ")"}>
                        <ReactApexChart options={this.state.optionsSystems} series={this.state.s1} type="donut"  />
                    </ui5-card>
                </div>
                <div className="dashboard-card">
                <ui5-card heading="Задачи за седем дена назад от днес" subheading={"(" + (this.state.cc.dateTodo+this.state.cc.dateFinished)+  ")"}>
                    <ReactApexChart options={this.state.optionsInstances} series={this.state.s2} type="donut"  />
                </ui5-card>
                </div>
            </div>
            </div>
        )
    }
}

export default Statistics

