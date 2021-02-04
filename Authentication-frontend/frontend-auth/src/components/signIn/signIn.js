import './signIn.css';
import React, {Component} from "react";
import axios from 'axios';

export default class SignIn extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.value = this.validate.bind(this);
    }
    validate(){
        const {email, password} = this.state;
        if(!email || !password){
            window.alert("*please provide mandatory fields");
            return;
        }
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            window.alert("Please provide a valid email");
            return;
        }
        console.log("validated");
        return true;
    }
    handleOnchange(event){
        console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit(){
        if(this.validate()){
            //api call
            const { email, password } = this.state;
            axios.post('http://localhost:8001/users/login', {
                email,
                password
              })
              .then((response) => {
                console.log(response);
                if(response.status === 200){
                    window.localStorage.setItem('login', JSON.stringify(response.data));
                    this.props.history.push("/dashboard");
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
    render(){
      const {email, password} = this.state;
      return(
        <div id="sign-in">
            <div><h1>Sign-In Page</h1></div>
            <div className="form-field">
                <div>EmailId*:</div>
                <input type="email" name="email" value={email} onChange={this.handleOnchange} />
            </div>
            <div className="form-field">
                <div>Password*:</div>
                <input type="password" name="password" value={password} onChange={this.handleOnchange} />
            </div>
            <div className="form-field">
                <button onClick={() => this.props.history.push("/signup")}>SignUp</button>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        </div>
      );
  }
}


