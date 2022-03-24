import React, {createContext, useState} from "react";
import Cookies from "js-cookie";

const MyContext = createContext();


function MyContextProvider({children}) {

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [firstNameError, setFirstNameError] = useState("");
	const [lastNameError, setLastNameError] = useState("");

	const [userName, setUserName] = useState("");
	const [userNameError, setUserNameError] = useState("");
	const [users, setUsers] = useState([]);
	const [destinationUser, setDestinationUser] = useState("");

	const [loggedInUserName, setLoggedInUserName] = useState("")
	const [showLoggedInMsg, setShowLoggedInMsg] = useState(false);

	
	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState("");
	const [password, setPassword] = useState("");
	const [passwError, setPasswError] = useState("");


	const [balance, setBalance] = useState(0.0);
	const [depositAmount, setDepositAmount] = useState("");
	const [depositError, setDepositError] = useState("");
	const [depositSuccessMessageVisible, setDepositSuccessMessageVisible] = useState(false); 

	const [withdrawAmount, setWithdrawAmount] = useState("");
	const [withdrawError, setWithdrawError] = useState("");
	const [withdrawSuccessMessageVisible, setWithdrawSuccessMessageVisible] = useState(false); 

	const [transferAmount, setTransferAmount] = useState("");
	const [transferError, setTransferError] = useState("");
	const [transferSuccessMessageVisible, setTransferSuccessMessageVisible] = useState(false);

	const [investAmount, setInvestAmount] = useState("");
	const [investError, setInvestError] = useState("");
	const [investSuccessMessageVisible, setInvestSuccessMessageVisible] = useState(false);
	const [investResult, setInvestResult] = useState(false);

	const [error, setError] = useState("");
	const [result, setResult] = useState("");
	const [dateTime, setDateTime] = useState("");


	let firstNameErrorStr = "";
	let lastNameErrorStr = "";
	let userNameErrorStr = "";
	let emailErrorStr = "";
	let passwordErrorStr = "";
	let depositErrorStr = "";
	let withdrawErrorStr = "";
	let transferErrorStr = "";
	let investErrorStr = "";


	//INPUT VALIDATION WITH ERROR MESSAGES: NO INPUT + ADDITIONAL 
	const validate = () => {
		setUserNameError("");
		setFirstNameError("");
		setLastNameError("");
		setEmailError("");
		setPasswError("");

		//username
		if (!userName) {
			userNameErrorStr = "Oops! Your username can't be blank.";
			//additional: length 
		} else  if (userName.length == 1) {
			userNameErrorStr = "Username must be longer than that.";
		} else if (userName.length > 10) {
			userNameErrorStr = "Username must not exceed 10 characters.";
		}

		//firstName
		if (!firstName) {
			firstNameErrorStr = "Oops! Your first name can't be blank.";
			//additional: name length 
		} else  if (firstName.length == 1) {
				firstNameErrorStr = "First name must be longer than that.";
		} 

		//lastName
		if (!lastName) {
			lastNameErrorStr = "Oops! Your last name can't be blank.";
			//additional: name length 
		} else  if (lastName.length < 2) {
			lastNameErrorStr = "Last name must be longer than that.";
		} 

		//email
		if (!email) {
				emailErrorStr = "Oops! Your email can't be blank.";
				//additional: email length 
		} else if (email.length == 1) {
				emailErrorStr = "Email must be longer than that.";
		}

		//password
		if (!password) {
				passwordErrorStr = "Oops! Your password can't be blank.";
		}

		//if there's no error message, validate 
		//userName
		if (userNameErrorStr == "") {
			// alert("username")
			validateUserName(userName);
		}
		//firstName
		if (firstNameErrorStr == "") {
				validateFirstName(firstName);
		}

		//lastName
		if (lastNameErrorStr == "") {
			validateLastName(lastName);
		}

		//email
		if (emailErrorStr == "") {
			validateEmail(email);
		}
		
		//password
		if (passwordErrorStr == "") {
				validatePassword(password);
		}

		setUserNameError(userNameErrorStr);
		setFirstNameError(firstNameErrorStr);
		setLastNameError(lastNameErrorStr);
		setEmailError(emailErrorStr);
		setPasswError(passwordErrorStr);
		return userNameErrorStr === "" && firstNameErrorStr === "" && lastNameErrorStr === "" && emailErrorStr === "" && passwordErrorStr === ""; //returns true and validate() is executed
	}; 

	//----------------NAME AND USERNAME VALIDATION-----------------------

	const validateFirstName = newFirstName => {
	setFirstNameError("");
	//additonal: limiting input to the letters of the English alphabet, including capital letters
		if(!newFirstName.match(/^[a-zA-Z][a-zA-Z\s]*$/)) {
		//this ok?
			firstNameErrorStr = "Enter letters only";
			setFirstNameError(firstNameErrorStr);
			return false;
		}
		return true;
	};

	const validateLastName = newLastName => {
		setLastNameError("");
		//additonal: limiting input to a mix of letters and numbers
		if(!newLastName.match( /^[a-zA-Z][a-zA-Z\s]*$/)) {
			lastNameErrorStr = "Enter letters only";
			setLastNameError(lastNameErrorStr);
			return false;
		}
		return true;
	};

	const validateUserName = newUserName => {
		setUserNameError("");
		//additonal: limiting input to only Alphabets, Numbers and Underscore and between 3 to 10 characters
		if(!newUserName.match(/^[a-zA-Z0-9_]{4,10}$/)) {
			userNameErrorStr = "Only letters, numbers and underscore, and between 3-10 characters in username.";
			setUserNameError(userNameErrorStr);
			return false;
		}
		return true;
	};



	//----------------EMAIL VALIDATION-----------------------
		//additional: email formatting
		const validateEmail = newEmail => {
			let emailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/; 
			let isValidFormat = str => {
				return str.match(emailFormat);
			}

			if (!isValidFormat(newEmail)) {
				emailErrorStr = "Oops! Bad email format.";
				return false;
			}
			return true;
		};

		//----------------PASSWORD VALIDATION-----------------------

		const validatePassword = newPassword => {
			if (newPassword.length == 1 || newPassword.length < 8) {
				passwordErrorStr = "Password must be longer than that.";
				return false;
			}
			return true;
		};


		//----------------CREATE ACCOUNT FORM ONCHANGE-----------------------


		//this is not used anywhere----------
		const handleClick = e => {
			if (validate()) { 
				//adding all new users, for "All Data"
				let newUser = {
						"userName": userName,
						"firstName": firstName,
						"lastName": lastName,
						"email": email,
						"password": password
				};
				setUsers(users => users.concat(newUser));
				console.log(`these are all of the users: ${users}`)
			} else {
			return;
			}
		};
		//---------------------------------



// form input onchange + setting state
	const handleFirstNameChange = e => {
		let newFirstName = e.currentTarget.value;
		if (!newFirstName || validateFirstName(newFirstName)) {
			setFirstName(newFirstName);
		}
	};

	const handleLastNameChange = e => {
		let newLastName = e.currentTarget.value;
		if (!newLastName || validateLastName(newLastName)) {
			setLastName(newLastName);
		}
	};

	const handleUserNameChange = e => {
		setUserName(e.currentTarget.value);
		};


		const handleEmailChange = e => {
			setEmail(e.currentTarget.value);
		};

		const handlePasswordChange = e => {        
			setPassword(e.currentTarget.value);
		};

		const handleDestinationUserNameChange = e => {
			setDestinationUser(e.currentTarget.value);
		};

	// Create Account success message
	let showSuccessMessageAccount = () => {
		return (
			<div className="successMessage">
					<h5>Awesome!</h5>
					<p>Your account was created.</p>
			</div>
		)
	}

	

		//----------------VALIDATION FOR DEPOSIT, WITHDRAW, TRANSFER, INVEST-----------------------

		const validateNr = (newValue) => {
			//clear error when there's new input
			setDepositError("");
			setWithdrawError("");
			setTransferError("");
			setInvestError("");
			setError("");
			if(!newValue.match(/^([(0-9)]+\.)*([(0-9)]+)*$/)) { //this regex matches numbers from 0 to 9 and + decimal numbers
				depositErrorStr = "Enter numbers only.";
				withdrawErrorStr = "Enter numbers only.";
				transferErrorStr = "Enter numbers only.";
				investErrorStr = "Enter numbers only.";
				setDepositError(depositErrorStr);
				setWithdrawError(withdrawErrorStr);
				setTransferError(transferErrorStr);
				setInvestError(investErrorStr);
				return false; //didn't validate
			} 
			return true; //did validate
		};

		//----------------DEPOSIT INPUT-----------------------
		const depositHandleChange = e => {
			e.preventDefault();
			var newValue = e.target.value;
			if (!validateNr(newValue)) { 
			 	newValue = newValue.slice(0, -1); //when we delete the numbers, it cuts off the last element if that's not a number
			}
			setDepositAmount(newValue);
			setDepositSuccessMessageVisible(false);
		};

		//----------------DEPOSIT VALIDATION-----------------------
		const validateDeposit = () => {
			setDepositError("");
			setDepositSuccessMessageVisible(false);

			if (depositAmount == 0.0) {
				depositErrorStr = "Amount must be higher than 0.";
				setDepositError(depositErrorStr);
				setDepositSuccessMessageVisible(false);
				return false;
			} 

			if (depositAmount.length >= 7) {
				depositErrorStr = "Amount must be lower than that.";
				setDepositError(depositErrorStr);
				setDepositSuccessMessageVisible(false);
				return false;
			}
			return true;
		};

		//----------------WITHDRAW INPUT-----------------------
		const withdrawHandleChange = e => {
			e.preventDefault();
			var newValue = e.target.value;
			if (!validateNr(newValue)) { 
				newValue = newValue.slice(0, -1); //when we delete the numbers, it cuts off the last element if that's not a number
			} 
			setWithdrawAmount(newValue)
			setWithdrawSuccessMessageVisible(false);   
		};

		//---------------WITHDRAW VALIDATION-------------------
		const validateWithdraw = () => {
				setWithdrawError("");
				setWithdrawSuccessMessageVisible(false);

				if (withdrawAmount == 0.0) {
					withdrawErrorStr = "Amount must be higher than 0.";
					setWithdrawError(withdrawErrorStr);
					setWithdrawSuccessMessageVisible(false);
					return false;
				}

				if (withdrawAmount.length >= 7) {
					withdrawErrorStr = "Amount must be lower than that.";
					setWithdrawError(withdrawErrorStr);
					setWithdrawSuccessMessageVisible(false);
					return false;
				}
	
				if (withdrawAmount > balance) {
					withdrawErrorStr = "Amount higher than the account balance.";
					setWithdrawError(withdrawErrorStr);
					setWithdrawSuccessMessageVisible(false);
					return false;
				} 
				return true;
			};

			
			//---------------TRANSFER INPUT, VALIDATION-------------------
			const validateTransfer = () => {
				setTransferError("");
				setTransferSuccessMessageVisible(false);

				if (transferAmount == 0.0) {
					transferErrorStr = "Amount must be higher than 0.";
					setTransferError(transferErrorStr);
					setTransferSuccessMessageVisible(false);
					return false;
				}

				if (transferAmount.length >= 7) {
					transferErrorStr = "Amount must be lower than that.";
					setTransferError(transferErrorStr);
					setTransferSuccessMessageVisible(false);
					return false;
				}
	
				if (transferAmount > balance) {
					transferErrorStr = "Amount higher than the account balance.";
					setTransferError(transferErrorStr);
					setTransferSuccessMessageVisible(false);
					return false;
				} 
				return true;
			};

			//INPUT
			const transferHandleChange = e => {
				e.preventDefault();
				var newValue = e.target.value;
				if (!validateNr(newValue)) { 
					 newValue = newValue.slice(0, -1); //when we delete the numbers, it cuts off the last element if that's not a number
				}
				setTransferAmount(newValue);
				setTransferSuccessMessageVisible(false);
			};


			 //---------------INVEST INPUT, VALIDATION-------------------

			 const validateInvest = () => {
					setInvestError("");
					// setInvestSuccessMessageVisible(false);

					if (investAmount == 0.0) {
						investErrorStr = "Amount must be higher than 0.";
						setInvestError(investErrorStr);
						// setInvestSuccessMessageVisible(false);
						return false;
					}

					if (investAmount.length >= 7) {
						investErrorStr = "Amount must be lower than that.";
						setInvestError(investErrorStr);
						// setInvestSuccessMessageVisible(false);
						return false;
					}
		
					if (transferAmount > balance) {
						transferErrorStr = "Amount higher than the account balance.";
						setInvestError(investErrorStr);
						// setInvestSuccessMessageVisible(false);
						return false;
					} 
					return true;
				};

			//INPUT
			const investHandleChange = e => {
				e.preventDefault();
				var newValue = e.target.value;
				if (!validateNr(newValue)) { 
					 newValue = newValue.slice(0, -1); 
				}
				setInvestAmount(newValue);
				// setInvestSuccessMessageVisible(false);
			};


			//----------------CLEAR FORMS-----------------------

		const clearForm = () => {
			setFirstName("");
			setLastName("");
			setUserName("");
			setEmail("");
			setPassword("");
		};




		//---------------DETECTING PAGE RELOAD AND BROWSER TAB CLOSE / PREVENTING BEFOREUNLOAD EVENT-------------------
		/*
		https://dev.to/eons/detect-page-refresh-tab-close-and-route-change-with-react-router-v5-3pd
		*/

		window.onbeforeunload = (event) => {
			const e = event || window.event;
			// Cancel the event
			e.preventDefault();
			if (e) {
				console.log(loggedInUserName)
				e.returnValue = ''; // Legacy method for cross browser support
			}
			return ''; // Legacy method for cross browser support
		};

	
		//---------------AUTHENTICATION-------------------
		async function authenticateWithAPI() {

			const USER = process.env.REACT_APP_AUTH_USER;
			const PASSWORD = process.env.REACT_APP_AUTH_PASSWORD;
			const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL || "http://localhost:1337";
			const response = await fetch(`${API_URL}/auth/local`, {
			method: "POST",
					headers: {
							"Accept": "application/json",
							"Content-Type": "application/json"
					},
			body: JSON.stringify({
							identifier: USER,
							password: PASSWORD
					})
			});

			if (response.ok) {
					const responseObj = await response.json();
					Cookies.set("token", responseObj.jwt);
			} else {
					console.log(response.statusText)
					setError(response.statusText);
			}
		}



		//------------GET BALANCE FROM DATABASE------------------
		async function getBalance() {
			let userToken = Cookies.get("token");
			if (!userToken) {
				authenticateWithAPI();
				userToken = Cookies.get("token");
			}
	
			let username = Cookies.get("username");;
			if (!username) {
				setError("Not logged in!");
			}

			const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL || "http://localhost:1337";
			const balanceResponse = await fetch(`${API_URL}/transactions/balance`, {
				method: "POST",
				headers: userToken && { Authorization: `Bearer ${userToken}` },
				body: JSON.stringify({
					"username" : username
				})
			});
	
			if (!balanceResponse.ok) {
				console.log(balanceResponse.statusText)
				setError(balanceResponse.statusText);
			} else {
				const balanceResponseObj = await balanceResponse.json();
				const balanceError = balanceResponseObj.error;
				if (!balanceError) {
					setBalance(balanceResponseObj.balance);
				}
			}
			return balance;
		};




		//------------EXPORT CONTEXT------------------
		const defaultContext = {
			//state:
			firstName,
			lastName,
			userName,
			email,
			password,
			firstNameError,
			lastNameError,
			userNameError,
			emailError,
			passwError,
			depositAmount,
			balance,
			depositError,
			withdrawSuccessMessageVisible,
			depositSuccessMessageVisible,
			withdrawAmount,
			withdrawError,
			users,
			error,
			result,
			loggedInUserName,
			showLoggedInMsg,
			dateTime,
			transferAmount,
			transferError,
			transferSuccessMessageVisible,
			destinationUser,
			investAmount,
			investError,
			investSuccessMessageVisible,
			investResult,
			//functions:
			validate,
			handleClick,
			handleFirstNameChange,
			handleLastNameChange,
			handleUserNameChange,
			handleEmailChange,
			handlePasswordChange,
			validateNr,
			depositHandleChange,
			validateDeposit,
			withdrawHandleChange,
			setDepositSuccessMessageVisible,
			showSuccessMessageAccount,
			clearForm,
			authenticateWithAPI,
			setError,			
			setResult,
			setLoggedInUserName,
			setShowLoggedInMsg,
			setDateTime,
			setBalance,
			setDepositAmount,
			validateWithdraw,
			setWithdrawAmount,
			setWithdrawSuccessMessageVisible,
			getBalance,
			validateTransfer,
			validateInvest,
			investHandleChange,
			transferHandleChange,
			setInvestSuccessMessageVisible,
			setInvestResult,
			setInvestAmount,
			setTransferSuccessMessageVisible,
			setTransferAmount,
			setDestinationUser,
			handleDestinationUserNameChange,
		};

		return (
			<MyContext.Provider value={defaultContext}>
				{children}
			</MyContext.Provider>
		)
}

export {MyContext, MyContextProvider};
