import React, {Component} from "react";
import axios from "axios";

export class Dashboard extends Component{
    componentDidMount () {
        if (!window.localStorage.getItem('login')) { this.props.history.push('/') }
        const login = JSON.parse(window.localStorage.getItem('login'));
        console.log(login.user.id)
        axios.get('http://localhost:8001/users', {
          headers: { 'x-auth-token': login.userToken }
        })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
    }
    render(){
        return(
            <h1>Dashboard page with user Information</h1>
        );
    }
}

export default Dashboard;