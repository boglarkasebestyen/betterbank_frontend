import React, {useContext, useEffect} from "react";
import {MyContext} from "../myContext/MyContext";
import Card from "../components/Card";
import Cookies from "js-cookie";

function Transfer() {

	const {
		//state:
		balance,
		transferAmount,
		transferError,
		error,
		destinationUser,
		loggedInUserName,
		//functions:
		validateTransfer,
		transferSuccessMessageVisible,
		setError,
		authenticateWithAPI ,
		setTransferSuccessMessageVisible,
		setTransferAmount,
		getBalance,
		setDestinationUser,
		transferHandleChange,
		handleDestinationUserNameChange
	} = useContext(MyContext);

	useEffect(()=> {
		getBalance();
	}); 


	async function submitTransfer() {
		if(!validateTransfer()) {
			return;
		}

		let userToken = Cookies.get("token");
			if (!userToken) {
				authenticateWithAPI();
				userToken = Cookies.get("token");
			}

			let username = Cookies.get("username");
			console.log("to:" + destinationUser + "from: " + username)
			
			const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL || "http://localhost:1337";
			const response = await fetch(`${API_URL}/transactions/transfer`, {
				method: "POST",
				headers: userToken && { Authorization: `Bearer ${userToken}` },
				body: JSON.stringify({
					to: destinationUser,
					from: username,
					amount: transferAmount
				}),
			});

		setError("");
    if (!response.ok) {
			console.log(response.statusText)
		  setError(response.statusText);
		} else {
			const responseObj = await response.json();
			const error = responseObj.error;
			if (error) {
				setError(error);
        setTransferSuccessMessageVisible(false)
			} else {
        setTransferSuccessMessageVisible(true);
      }
			getBalance();
		};
  };

  let clearMsgTransfer = () => {
    setTransferAmount("");
		setDestinationUser("");
    setTransferSuccessMessageVisible(false);
  }

	return (
		<Card
				bgcolor="warning"
				header="Transfer"
				body= {
					<>  

						{(() => {
							if (error) {
									return (
											<div className="error">{error}</div>
											);
									} 
							})()}

							{(() => {
							if (transferError) {
								return (
									<div className="error">{transferError}</div>
									);
							}
						})()}

						{(() => {
							if (transferSuccessMessageVisible === true) {
								return (
									<div className="successMessage">
										<h5>Awesome!</h5>
										<p>Your transfer went through!</p>
										<button type="submit" id="submitbutton" className="submitBtn btn btn-light" onClick={() => clearMsgTransfer()}>Ok</button>             
									</div>
								);
							}
						})()}

						<h6 className="card-text mt-4 mb-5 font-weight-bolder">Your current balance is: ${balance}</h6>
					
						{/* amount */}
						<h6 className="card-text mt-4 mb-2 font-weight-bolder">The amount you wish to transfer:</h6>
						{/* added value so that state can change */}
						<input type="input" className="form-control" id="transferAmount" value={transferAmount} onChange={transferHandleChange}/>
						<br/>  
						
						{/* user */}
						<h6 className="card-text mt-4 mb-2 font-weight-bolder">Username the amount goes to:</h6>
						{/* added value so that state can change */}
						<input type="input" className="form-control" id="destinationUser" value={destinationUser} onChange={handleDestinationUserNameChange}/>
						<br/>                                                                              
						<button type="submit" disabled={!transferAmount || !destinationUser} id ="submitbutton" className="submitBtn btn btn-light" onClick={() => submitTransfer()}>Transfer</button>            
					</>
				}  
		/>
	)
}

export default Transfer;