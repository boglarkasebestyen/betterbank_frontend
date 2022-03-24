import React, {useContext, useEffect} from "react";
import {MyContext} from "../myContext/MyContext";
import Card from "../components/Card";
import Cookies from "js-cookie";

function Deposit() {

  const {
    //state:
    depositAmount,
    balance,
    depositError,
    error,
    //functions:
    depositHandleChange,
    validateDeposit,
    depositSuccessMessageVisible,
    setError,
    authenticateWithAPI ,
    setDepositSuccessMessageVisible,
    setDepositAmount,
    getBalance
  } = useContext(MyContext);

  useEffect(()=> {
    getBalance();
  }); 

	// const [deposit, setDeposit] = useState({
  //   amount: "" ,
  //   datetime: "" 
	// });

  async function submitDeposit() {
    if(!validateDeposit()) {
      return;
    }
	
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
		const response = await fetch(`${API_URL}/transactions/deposit`, {
		  method: "POST",
			headers: userToken && { Authorization: `Bearer ${userToken}` },
		 	body: JSON.stringify({
        to: username,
        from: username,
        amount: depositAmount
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
        setDepositSuccessMessageVisible(false)
			} else {
        setDepositSuccessMessageVisible(true);
      }
		};
  };

  let clearMsgDeposit = () => {
    setDepositAmount("");
    setDepositSuccessMessageVisible(false);
  }

  return (
    <Card
        bgcolor="warning"
        header="Deposit"
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
              if (depositError) {
                return (
                  <div className="error">{depositError}</div>
                  );
              }
            })()}

            {(() => {
							if (depositSuccessMessageVisible === true) {
								return (
                  <div className="successMessage">
                    <h5>Awesome!</h5>
                    <p>Your deposit was received!</p>
                    <button type="submit" id="submitbutton" className="submitBtn btn btn-light" onClick={() => clearMsgDeposit()}>Ok</button>             
                  </div>
				        );
							}
						})()}

          	<h6 className="card-text mt-4 mb-5 font-weight-bolder">Your current balance is: ${balance}</h6>
						<h6 className="card-text mt-4 mb-2 font-weight-bolder">The amount you wish to deposit:</h6>
            {/* added value so that state can change */}
						<input type="input" className="form-control" id="depositAmount" value={depositAmount} onChange={depositHandleChange}/>
						<br/>                                                                              
						<button type="submit" disabled={!depositAmount} id ="submitbutton" className="submitBtn btn btn-light" onClick={() => submitDeposit()}>Deposit</button>            
          </>
        }  
    />
  )
}

export default Deposit;
