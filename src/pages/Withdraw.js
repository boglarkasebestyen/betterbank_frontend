import React, {useContext, useEffect} from "react";
import {MyContext} from "../myContext/MyContext";
import Card from "../components/Card";
import Cookies from "js-cookie";

function Withdraw() {
  const {
    //state:
    balance,
    error,
    //functions:
    withdrawAmount,
    withdrawHandleChange,
    withdrawError,
    withdrawSuccessMessageVisible,
    authenticateWithAPI ,
    setError,
    validateWithdraw,
    setWithdrawAmount,
    setWithdrawSuccessMessageVisible,
    getBalance
  } = useContext(MyContext);

  useEffect(()=> {
    getBalance();
  }); 

  // const [withdraw, setWithdraw] = useState({
  //   amount: "" ,
  //   datetime: "" 
	// });

  async function submitWithdraw() {
    if(!validateWithdraw()) {
      return;
    };

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
		const response = await fetch(`${API_URL}/transactions/withdraw`, {
		  method: "POST",
			headers: userToken && { Authorization: `Bearer ${userToken}` },
		 	body: JSON.stringify({
        to: username,
        from: username,
        amount: withdrawAmount
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
        setWithdrawSuccessMessageVisible(false)
			} else {
        setWithdrawSuccessMessageVisible(true);
      }
		};
  };

  let clearMsgWithdraw = () => {
    setWithdrawAmount("");
    setWithdrawSuccessMessageVisible(false);
  }

  return (
    <Card
			bgcolor="warning"
			header="Withdraw"
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
            if (withdrawError) {
              return (
                <div className="error">{withdrawError}</div>
                );
            }
          })()}

          {(() => {
            if (withdrawSuccessMessageVisible === true) {
              return (
                <div className="successMessage">
                  <h5>Awesome!</h5>
                  <p>Your withdrawal was succesful.</p>
                  {/* show OK button */}
                  <button type="submit" id="submitbutton" className="submitBtn btn btn-light" onClick={() => clearMsgWithdraw()}>Ok</button>             
                </div>
					    );
			      } 
						})()}
					<h6 className="card-text mt-4 mb-5 font-weight-bolder">Your current balance is: ${balance}</h6>
					<h6 className="card-text mt-4 mb-2 font-weight-bolder">The amount you wish to withdraw:</h6>
          {/* added value so that state can change */}
					<input type="input" className="form-control" id="withdrawAmount" value={withdrawAmount} onChange={withdrawHandleChange}/>
					<br/>
					<button type="submit" disabled={!withdrawAmount} id="submitbutton" className="submitBtn btn btn-light" onClick={() => submitWithdraw()}>Withdraw</button>
				</>
      }
    />
  )
}

export default Withdraw;
