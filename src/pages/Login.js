import React, {useContext, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {MyContext} from "../myContext/MyContext";
import Card from "../components/Card";
import Cookies from "js-cookie";

function Login() {

	const {
		//state
    userName,
		password,
		result,
		//functions
		handleUserNameChange,
		handlePasswordChange,
		authenticateWithAPI,
		setResult,
		clearForm,
		setLoggedInUserName,
		setShowLoggedInMsg,

	} = useContext(MyContext);

	const location = useLocation();

	/*
	The useHistory hook allows us to access React Router's history object.
	Through the history object, we can access and manipulate the current state of the browser history.
	All we need to do is to call the useHistory hook inside a functional component.
	We can use this object to redirect the user to another page by calling history.push('/example-route').
	*/

	//redirects me to Create Account when clicking "Open Account" in Login 
	const history = useHistory();

	const redirectToCreateAccount = () => {
		history.replace('/createAccount');
  }

	const redirectToData = () => {
		history.replace('/allData');
	}


	async function loginUser() {
	
		let userToken = Cookies.get("token");
		if (!userToken) {
			authenticateWithAPI();
			userToken = Cookies.get("token");
		}
		
		const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL || "http://localhost:1337";
		const response = await fetch(`${API_URL}/newusers/login`, {
		  method: "POST",
			headers: userToken && { Authorization: `Bearer ${userToken}` },
		 	body: JSON.stringify({
				username: userName,
				password: password,
		  }),
		});

		setResult("");
		if (!response.ok) {
		 	setResult(response.statusText);
		} else {
			const responseObj = await response.json();
			const result = responseObj.result;
			//if I don't set state, it doesn't appear on the frontend
			setResult(result);
			if (result === "success") { 
				setResult("");
				setShowLoggedInMsg(false)
				setLoggedInUserName(responseObj.username);
				Cookies.set("username", responseObj.username);
				clearForm();
				redirectToData();
			} 
		}
	}	

	return (
		<Card
			bgcolor="warning"
			header="Account log in"
			body={
				<>

					{(() => {
							if (result) {
								return (
									<div className="error">{result}</div>
									);
								} 
							})()}

					{(() => {
							if (setShowLoggedInMsg === false) {
								return (
								<>
								</>
								) 
							}
						})()}

						{(() => {
							if (location.state && location.state.isRedirectFromCreateAccount) {
								return (
									<div className="successMessage">
											<h5>Awesome!</h5>
											<p>Your account was created.</p>
											<p>Please, log in.</p>
									</div>
								) 
							}
						})()}
					
					<h6 className="card-text mt-5 mb-2">Username</h6>
					<input type="input" className="form-control" id="username" placeholder="@" value={userName} onChange={handleUserNameChange}/>
					<h6 className="card-text mt-4 mb-2">Password</h6>
					<input type="password" className="form-control" id="password" placeholder="**********" value={password} onChange={handlePasswordChange}/>
					<br/>
					<button type="submit" disabled={!userName && !password} id="submitbutton" className="submitBtn btn btn-light" onClick={e => loginUser()}>Log in</button>
					<br/>
					<h6 className="account-text font-weight-bold mt-4">Don't have an account yet?</h6>
					<br/>
					<button type="submit" id="submitbutton" className="submitBtn btn btn-light" onClick={redirectToCreateAccount}>Open Account</button>
				</>
				}
		/>
	)
}

export default Login;