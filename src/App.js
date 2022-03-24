import React from "react";
import {HashRouter, Route} from "react-router-dom";
import './index.css';

import Navbar from "./components//Navbar";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Transfer from "./pages/Transfer";
import Invest from "./pages/Invest";
import AllData from "./pages/AllData";


function App() {
	return (
		<HashRouter>
				<Navbar/>
				<div className="container"> 
					<Route exact path="/" component={Login} />
					<Route path="/CreateAccount" component={CreateAccount} />
					<Route path="/Deposit/" component={Deposit} />
					<Route path="/Withdraw/" component={Withdraw} />
					<Route path="/Transfer/" component={Transfer} />
					<Route path="/Invest/" component={Invest} />
					<Route path="/AllData/" component={AllData} />
				</div>
		</HashRouter>
	);
}


export default App;