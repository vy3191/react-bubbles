import React from "react";
import AvatarImage from '../images/avatar.png';
import './Login.css';
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>     
      <form >
          <h4>Welcome to the Bubble App!</h4>
          <div className="imgcontainer">
            <img src={AvatarImage} alt="Avatar" class="avatar" />
          </div>
          <div class="container">
            <label for="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="uname" required />

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required />
                
            <button type="submit">Login</button>
            <label>
              <input type="checkbox" checked="checked" name="remember" /> Remember me
            </label>
          </div>
          <div class="container" style={{backgroundColor:'#f1f1f1'}}>
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot <a href="#">password?</a></span>
        </div>
      </form>
    </>
  );
};

export default Login;
