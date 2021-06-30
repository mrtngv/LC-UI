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
            role: "",
            accessToken: "",
            info: {},
            dashboardDetails: {},
            seriesSystems: [2.5,5],
            cc: {},
            options1: {
                labels: ['Офис служители', 'Куриери', 'Клиенти'],
                colors: ['#4CAF50', '#F9C80E', '#F9110E'],
                chart: {
                    type: 'donut',
                },
            },
            options2: {
                labels: ['От Офис служител', 'От Клиент'],
                colors: ['#4CAF50', '#F9C80E'],
                chart: {
                    type: 'donut',
                },
            },
            options3: {
                labels: ['Регистрирани', 'Анулирани', 'Доставени', 'В Процес', 'В изчакване'],
                colors: ['#4CAF50', '#F9C80E', '#FB13F3', '#3700FF', '#F91111'],
                chart: {
                    type: 'donut',
                },
            },
            options4: {
                labels: ['7 дена назад', 'Остатък'],
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
        const URL = DOMAIN + "api/authenticate/statistics";

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            const role = user.role;

            if (role === "ROLE_MODERATOR") {
                this.setState({
                    role: role,
                    accessToken: user.accessToken,
                })
            }
        }

        axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken
            }}).then(p => {
            this.setState({
                info: p.data,
            });
        });
    }



    render() {
        console.log(this.state.info);
        const a = [this.state.info.statistic1,this.state.info.statistic2,this.state.info.statistic3];
        const b = [this.state.info.statistic4,this.state.info.statistic5];
        const c = [this.state.info.statistic6,this.state.info.statistic7,this.state.info.statistic8,this.state.info.statistic9,this.state.info.statistic10];
        const d = [this.state.info.statistics17,this.state.info.statistics18];
        
        return (
            <div className="statistics-container">
                <div className="titlee">
                <ui5-title level="h4">Статистики, за потребители, регистрация на пратки, статуси на пратки и приходи.</ui5-title>
                </div>
                <div className="dashboard">
                <div className="dashboard-card">
                    <ui5-card  heading="Потребители" subheading="Разпределение на потребителите, спрямо техните роли">
                        <ReactApexChart options={this.state.options1} series={a} type="donut"  />
                    </ui5-card>
                </div>
                <div className="dashboard-card">
                <ui5-card heading="Пратки" subheading="Разпределение на пратките по регистрация за 3 дена назад по ауторизация">
                    <ReactApexChart options={this.state.options2} series={b} type="donut"  />
                </ui5-card>
                </div>
            </div>
            <div className="dashboard">
                <div className="dashboard-card">
                    <ui5-card  heading="Статуси" subheading="Разпределение на всички пратки спрямо техните статуси">
                        <ReactApexChart options={this.state.options3} series={c} type="donut"  />
                    </ui5-card>
                </div>
                <div className="dashboard-card">
                <ui5-card heading="Приходи" subheading="Съпоставка на прихода от последните 7 дена спрямо общия">
                    <ReactApexChart options={this.state.options4} series={d} type="donut"  />
                </ui5-card>
                </div>
            </div>
            </div>
        )
    }
}

export default Statistics

