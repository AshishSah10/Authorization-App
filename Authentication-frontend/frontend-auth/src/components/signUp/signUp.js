import './signUp.css';
import React, {Component} from "react";
import axios from "axios";

export class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: ''
        }
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }
    validate(){
        const {email, password, confirmPassword} = this.state;
        if(!email || !password){
            window.alert("*please provide mandatory fields");
            return;
        }
        if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
            window.alert("Please provide a valid email");
            return;
        }
        if(password !== confirmPassword){
            window.alert("password and confirm password fields are not matching");
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
            // api call
            const { email, password } = this.state;
            axios.post('http://localhost:8001/users/register', {
                email,
                password
              })
              .then(function (response) {
                console.log(response);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
    render(){
      const {email, password, confirmPassword} = this.state;
      return(
        <div id="sign-up">
            <div><h1>Sign-Up Page</h1></div>
            <div className="form-field">
                <div>EmailId*:</div>
                <input type="email" name="email" value={email} onChange={this.handleOnchange} />
            </div>
            <div className="form-field">
                <div>Password*:</div>
                <input type="password" name="password" value={password} onChange={this.handleOnchange} />
            </div>
            <div className="form-field">
                <div>Confirm Password*:</div>
                <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleOnchange} />
            </div>
            <div className="form-field">
                <button onClick={() => this.props.history.push("/")}>SignIn</button>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        </div>
      );
  }
}

export default SignUp;