import React from 'react';

class AboutCompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    render() {
const token = sessionStorage.getItem("JWT");
//sessionStorage.removeItem("JWT");
        return (
            <div>
                <h1>{token}</h1>
            </div>
        )
    }
}

export default AboutCompany