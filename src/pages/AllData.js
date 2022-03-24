import React, {useContext, useState, useEffect} from 'react';
import {MyContext} from "../myContext/MyContext";
import Cookies from "js-cookie";
import Card from "../components/Card";


function AllData() {

	let [transactions, setTransactions] = useState([]);

	const {
		authenticateWithAPI,
		setError,
	} = useContext(MyContext);

	useEffect(()=> {
		getAlldata();
	}, []); 


	async function getAlldata() {

		let userToken = Cookies.get("token");
		if (!userToken) {
			authenticateWithAPI();
			userToken = Cookies.get("token");
		}

		let username = Cookies.get("username");
		if (!username) {
			return;
		}

		const API_URL = process.env.REACT_APP_NEXT_PUBLIC_API_URL || "http://localhost:1337";
		const response = await fetch(`${API_URL}/transactions/alltransactions`, {
			method: "POST",
			headers: userToken && { Authorization: `Bearer ${userToken}` },
			body: JSON.stringify({
				username: username
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
					return;
				}
				setTransactions(responseObj);
			};
		};

		
		return (
			<Card
				bgcolor="warning"
				header="All Transactions"
				body={
					<div className="getalldata">
							<table>
								<tbody>
									<tr>
										<th>To</th>
										<th>From</th>
										<th>Amount</th>
										<th>Date</th>
									</tr>
									{transactions.map((transaction, index) => {

										function formatMyDate(value, locale = 'en-US') {
											return new Date(value).toLocaleDateString(locale);
										}

										let timestamp = transaction.createdAt;

										return (
											<tr key={index}>
												<td>{transaction.to}</td>
												<td>{transaction.from}</td>
												<td>{transaction.amount}</td>
												<td>{formatMyDate(timestamp)}</td>
											</tr>
										);
									})}
								</tbody>
							</table> 
						</div>
						/* <br/>
						<>
						<table>
								<tbody>
									<tr>
										<th>From</th>
									</tr>
									{transactions.map((transaction, index) => {
										return (
											<tr key={index} className="alldata" style={{display:"inline-block"}}>
												<td>{transaction.from}</td>
											</tr>
										);
									})}
								</tbody>
							</table> 
						</>
						<br/>
					</><>
					<table>
						<tbody>
							<tr>
								<th>Amount</th>
							</tr>
							{transactions.map((transaction, index) => {
								return (
									<tr key={index} className="alldata" style={{display:"inline-block"}}>
										<td>{transaction.amount}</td>
									</tr>
								);
							})}
						</tbody>
					</table> 
					<br/>
					</></><>
					<table>
							<tbody>
								<tr>
									<th>Date</th>
								</tr>
								{transactions.map((transaction, index) => {
									return (
										<tr key={index} className="alldata" style={{display:"inline-block"}}>
											<td>{transaction.createdAt}</td>
										</tr>
									);
								})}
							</tbody>
						</table> 
					</></> */}
				
			/>
		)
};

	
export default AllData;



