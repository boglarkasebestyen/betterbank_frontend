import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import {MyContext} from "../myContext/MyContext";
import Card from "../components/Card";
import Cookies from "js-cookie";

function CreateAccount() {

	const {
		//state
		firstName,
		lastName,
		userName,
		email,
		password,
		userNameError,
		firstNameError,
		lastNameError,
		emailError,
		passwError,
		error,
		//functions
		handleFirstNameChange,
		handleLastNameChange,
		handleUserNameChange,
		handleEmailChange,
		handlePasswordChange,
		validate,
		clearForm,
		authenticateWithAPI,
		setError,
	} = useContext(MyContext);

	const history = useHistory();
  	const redirectToLogin = () => {
    // history.push('/createAccount');
		// using the href from Navigation, not the "path" I was thinking I need: {id:"createAccount", text: "Open Acount", tooltipText: "Open your BetterBank® account", href:"#/createAccount"}
		// I don't want to be able to go back in the browser:
		history.replace({pathname: '/', search: "", state: {isRedirectFromCreateAccount : true}});
  }

	const [user, setUser] = useState({
		firstname: "",
		lastname: "",
		username: "",
		email: "",
		password: ""
	});

	async function submitUser() {
		if (!validate()) {
			return;
		}

		authenticateWithAPI();
		
		const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL || "http://localhost:1337";
    	let userToken = Cookies.get("token");
			if (!userToken) {
			authenticateWithAPI();
		  userToken = Cookies.get("token");
		}

		const response = await fetch(`${API_URL}/newusers`, {
		  method: "POST",
			headers: userToken && { Authorization: `Bearer ${userToken}` },
		  body: JSON.stringify({
				firstname: firstName,
				lastname: lastName,
				username: userName,
				email: email,
				password: password,
		  }),
		});
	
		if (!response.ok) {
			console.log(response.statusText)
		  setError(response.statusText);
		} else {
			const responseObj = await response.json();
			const error = responseObj.error;
			if (error) {
				setError(error);
			} else {
				clearForm();
				redirectToLogin();
			}
		}
	}	

	return (
		<Card
			bgcolor="warning"
			header="Open Account" 
			body={
				<>
						{(() => {
							if (error) {
								return (
									<div className="error">{error}</div>
									);
								} 
							})()}

					{(() => {
							if (userNameError) {
								return (
									<div className="error">{userNameError}</div>
									);
								} 
							})()}

						{(() => {
							if (firstNameError) {
								return (
									<div className="error">{firstNameError}</div>
									);
								} 
							})()}

							{(() => {
							if (lastNameError) {
								return (
									<div className="error">{lastNameError}</div>
									);
								} 
							})()}

							{(() => {
							if (emailError) {
								return (
									<div className="error">{emailError}</div>
									);
								} 
							})()}

							{(() => {
							if (passwError) {
								return (
									<div className="error">{passwError}</div>
									);
								} 
						})()}

		
					<h6 className="card-text mt-5 mb-2">Username</h6>
					<input type="input" className="form-control" id="username" placeholder="Create a username." value={userName} onChange={handleUserNameChange}/>
					<h6 className="card-text mt-4 mb-2">First Name</h6>
					<input type="input" className="form-control" id="name" placeholder="Your first name is..." value={firstName} onChange={handleFirstNameChange}/>
					<h6 className="card-text mt-4 mb-2">Last Name</h6>
					<input type="input" className="form-control" id="name" placeholder="Your last name is..." value={lastName} onChange={handleLastNameChange}/>
					<br/>
					<h6 className="card-text mb-2">Email address</h6>
					<input type="input" className="form-control" id="email" placeholder="Your email address is..." value={email} onChange={handleEmailChange}/>
					<br/>
					<h6 className="card-text mb-2">Password</h6>
					<input type="password" className="form-control" id="password" placeholder="**********" value={password} onChange={handlePasswordChange}/>
					<br/>
					<button type="submit" disabled={!userName && !firstName && !lastName && !email && !password} id="submitbutton" className="submitBtn btn btn-light" onClick={e => submitUser()} >Create Account</button>
				</>
			}
		/>
	)
}

export default CreateAccount;