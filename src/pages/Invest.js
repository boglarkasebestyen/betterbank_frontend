import React, {useContext, useEffect, useState} from "react";
import {MyContext} from "../myContext/MyContext";
import Card from "../components/Card";
import Cookies from "js-cookie";
import gif from "../images/gif.gif";

function Invest() {

	const {
		//state:
		balance,
		error,
		investError,
		investSuccessMessageVisible,
		investAmount,
		investResult,
		//functions:
		validateInvest,
		setError,
		authenticateWithAPI ,
		getBalance,
		investHandleChange,
		setInvestSuccessMessageVisible,
		setInvestAmount,
		setInvestResult
	} = useContext(MyContext);

	

	useEffect(()=> {
		getBalance();
	}); 
	

	async function submitInvest() {
		if(!validateInvest()) {
			return;
		}

		let userToken = Cookies.get("token");
			if (!userToken) {
				authenticateWithAPI();
				userToken = Cookies.get("token");
			}

			let username = Cookies.get("username");
			
			const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL || "http://localhost:1337";
			const response = await fetch(`${API_URL}/transactions/invest`, {
				method: "POST",
				headers: userToken && { Authorization: `Bearer ${userToken}` },
				body: JSON.stringify({
					to: username,
					from: username,
					amount: investAmount
				}),
			});


		setError("");
    if (!response.ok) {
		  setError(response.statusText);
		} else {
			const responseObj = await response.json();
			const error = responseObj.error;
			if (error) {
				setError(error);
			} else {
				console.log("invest result: " + responseObj.result);
        setInvestResult(responseObj.result === 1);			
				setInvestSuccessMessageVisible(true);
      }
			getBalance();
		};
  };


	function investOkBtn() {
		window.open("https://www.lamborghinistore.com/us/")
		setInvestAmount("");
  	setInvestSuccessMessageVisible(false);
	}

	return (
		<Card
				bgcolor="warning"
				header="Invest"
				body= {
					<>  
						{(() => {
							if (investSuccessMessageVisible === true) {
								if (investResult) {
									return (
										<div className="successMessage">
											<h5>(˵ ͡° ͜ʖ ͡°˵)</h5>
											<p>Your investment has doubled the added amount!</p>
											<button type="submit" id="redirectToLambo" className="submitBtn btn btn-light" onClick={() => investOkBtn()}>Ok</button>             
										</div>
										);
								} else {
									return (
										<div className="successMessage">
											<img src={gif} alt="animated gif" />
										</div>
									);
								}
							}
            })()}


						{(() => {
              if (investError) {
                return (
                  <div className="error">{investError}</div>
                  );
              }
            })()}

						{(() => {
              if (error) {
                return (
                  <div className="error">{error}</div>
                  );
              }
            })()}

						<h6 className="invest-text mt-4 mb-5 font-weight-bolder" >Your current balance is: ${balance}</h6>
						{/* amount */}
						<h6 className="invest-text mt-4 mb-2 font-weight-bolder">The amount you wish to invest:</h6>
						{/* added value so that state can change */}
						<input type="input" className="form-control" value={investAmount} onChange={investHandleChange}/>
						<br />
						<button type="submit" disabled={!investAmount} className="submitBtn btn btn-light" id="submitbutton" onClick={() => submitInvest()}>Invest</button> 
					</>
				}  
		/>
	)
}

export default Invest;