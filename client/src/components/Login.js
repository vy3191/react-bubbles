import React, {useState} from "react";
import AvatarImage from '../images/avatar.png';
import LOCAL_STORAGE_KEY from '../constants/constant';
import axios from 'axios';
import {axiosWithAuth} from '../Auth/Api';
import './Login.css';
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const defaultUser = {username:"", password:""};
  const [user, setUser] = useState(defaultUser);
  const [error, setError] = useState('')
  const handleChange = (event) => {
     setUser({...user, [event.target.name]:event.target.value});
  }
  const handleSubmit = (event) => {
      event.preventDefault();
      console.log(user)
      axiosWithAuth().post(`/api/login`, user)
           .then(response => {
              console.log(response);
              if(response.status === 200) {
                  window.localStorage.setItem(LOCAL_STORAGE_KEY, response.data.payload);
                  props.history.push('/bubbles-page');
                  setUser(defaultUser);
              }
           })
           .catch(error => {
             console.log(error);
             setError(error.response)
           })
  }
  console.log(props)
  return (
    <>     
      <form onSubmit={handleSubmit}>
          <h4>Welcome to the Bubble App!</h4>
          <div className="imgcontainer">
            <img src={AvatarImage} alt="Avatar" className="avatar" />
          </div>
          <div className="container">
            <label htmlFor="uname"><b>Username</b></label>
            <input type="text"
                   placeholder="Enter Username" 
                   name="username"
                   onChange={handleChange}
                   value={user.username}
                   required />

            <label htmlFor="psw"><b>Password</b></label>
            <input type="password" 
                   placeholder="Enter Password"
                   name="password" 
                   onChange={handleChange}
                   value={user.password}
                   required />                
            <button type="submit">Login</button>
            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label>
          </div>
          <div className="container" style={{backgroundColor:'#f1f1f1'}}>
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw">{" "}Forgot <a href="#">password?</a></span>
        </div>
      </form>
    </>
  );
};

export default Login;
