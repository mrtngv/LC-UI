import React from 'react';
import axios from 'axios';

import "./AllUsers.css";
import { DOMAIN } from "././constants/Domain.js";

class AllUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            allFilteredUsers: [],
            accessToken: "",
            role: "ROLE_CLIENT",
            selectedId: -1,
            filterInput: ""
        };
        this.onListItemSelect = this.onListItemSelect.bind(this);
        this.handleSelectionValue = this.handleSelectionValue.bind(this);
        this.handleInputValue = this.handleInputValue.bind(this);
        this.onUserRoleEdit = this.onUserRoleEdit.bind(this);
        this.onUserRoleDelete = this.onUserRoleDelete.bind(this);
        this.onUserDelete = this.onUserDelete.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onFilterClear = this.onFilterClear.bind(this);
    }

    onFilter() {
        let filterApplied = this.state.allUsers;
        if (this.state.filterInput !== "") {
            filterApplied = filterApplied.filter(p => (p.email === this.state.filterInput || p.stringRoles.includes(this.state.filterInput)));
            console.log(filterApplied);
        }
        this.setState({
            allFilteredUsers: filterApplied
        })
    }

    onFilterClear() {
        console.log("CLEAR");
        this.setState({
            allFilteredUsers: this.state.allUsers,
            filterInput: ""
        });
    }
    onListItemSelect(event) {
        const dialog = document.getElementById("edit-dialog");
        dialog.open();

        this.setState({
            selectedId: event.detail.item.getAttribute("data-id")
        })

        console.log(this.state.selectedId)
    }

    onUserRoleEdit(){
        const URL = DOMAIN + "api/authenticate";
        const id = this.state.selectedId;
        const userDetails = {
            "id": id,
            "role": this.state.role,
            "action": "addRole"
        }

        axios.post(URL, userDetails, {
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        }).then(res => {
            this.onLoad();
            this.onClose();
        });

    }

    onUserRoleDelete(){
        const URL = DOMAIN + "api/authenticate";
        const id = this.state.selectedId;
        const userDetails = {
            "id": id,
            "role": this.state.role,
            "action": "removeRole"
        }

        axios.post(URL, userDetails, {
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        }).then(res => {
            this.onLoad();
            this.onClose();
        });
    }

    onUserDelete(){
        const URL = DOMAIN + "api/authenticate/" + this.state.selectedId;

        axios.delete(URL, {
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken
            }
        }).then(res => {
            this.onLoad();
            this.onClose();
        });
    }

    onClose() {
        const dialog = document.getElementById("edit-dialog");
        dialog.close();
    }

    handleInputValue(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSelectionValue(event) {
        this.setState({
            role: event.target.selectedOption.value
        });
    }

    addEventListeners() {
        document.querySelectorAll('.input').forEach(item => {
            item.addEventListener("change", this.handleInputValue);
        })

        const list = document.getElementById("user-list");
        list.addEventListener("item-click", this.onListItemSelect);

        const selection = document.getElementById("role-selection");
        if(selection){
            selection.addEventListener("change", this.handleSelectionValue);
        }

        const edit = document.getElementById("editUserRole");
        if(edit){
            edit.addEventListener("click", this.onUserRoleEdit);
        }

        const removeRole = document.getElementById("removeUserRole");
        if(removeRole){
            removeRole.addEventListener("click", this.onUserRoleDelete);
        }

        const deleteUser = document.getElementById("deleteUser");
        if(deleteUser){
            deleteUser.addEventListener("click", this.onUserDelete);
        }
    }

    componentDidMount() {
        this.addEventListeners();
        this.onLoad();
    }


    onLoad() {
        const URL = DOMAIN + 'api/authenticate';
        const user = JSON.parse(sessionStorage.getItem('user'));

        this.setState({
            accessToken: user.accessToken,
            role: user.role
        })

        axios.get(URL, {
            headers: {
                'Authorization': 'Bearer ' + user.accessToken
            }
        }).then(u => {
            this.setState({
                allUsers: u.data,
                allFilteredUsers: u.data
            });
            console.log(this.state);
        });
    }

    render() {
        return (
            <div className="all-users-container">
                <ui5-title level="H1">Потребители</ui5-title>
                <div className="filter-user-container">
                            <div className="filter-contents">
                                <ui5-input class="input" name="filterInput" value={this.state.filterInput} 
                                placeholder="Търси по роля, имейл"></ui5-input>
                                <ui5-button id="filter-search-button" design="Emphasized" onClick={this.onFilter}>Търси</ui5-button>
                                <ui5-button id="filter-clear-button" onClick={this.onFilterClear}>Изчисти</ui5-button>
                            </div>
                        </div>
                <div className="list-container">
                    <ui5-list id="user-list" class="full-width">
                        {this.state.allFilteredUsers.map(u => {
                            return (
                                <ui5-li data-id={u.id} description={u.email}
                                    info={u.stringRoles} >{u.username}</ui5-li>
                            )
                        })}
                    </ui5-list>
                </div>

                <ui5-dialog id="edit-dialog" header-text="Промени данни">
                    <section class="login-form">
                        <div className="dialog">
                            <ui5-label>Роля: </ui5-label><br />
                            <ui5-select id="role-selection">
                                <ui5-option value="ROLE_CLIENT" selected>Клиент</ui5-option>
                                <ui5-option value="ROLE_OFFICE_EMPLOYEE">Офис служител</ui5-option>
                                <ui5-option value="ROLE_DELIVERY">Куриер</ui5-option>
                                <ui5-option value="ROLE_MODERATOR">Модератор</ui5-option>
                            </ui5-select>
                        </div>
                    </section>

                    <div slot="footer" class="dialog-footer">
                        <ui5-button id="editUserRole" design="Positive">Добави роля</ui5-button>
                        <ui5-button id="removeUserRole">Премахни роля</ui5-button>
                        <ui5-button id="deleteUser" design="Negative">Изтрий</ui5-button>
                        <ui5-button id="closeDialogButton" design="Transparent" onClick={this.onClose}>Затвори</ui5-button>
                    </div>
                </ui5-dialog>
            </div>
        )
    }
}

export default AllUsers