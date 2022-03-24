import React, { useContext } from "react";
import {useLocation} from "react-router-dom";
import {useHistory} from "react-router-dom";
import {MyContext} from "../myContext/MyContext";
import ReactTooltip from "react-tooltip";
import Cookies from "js-cookie";
import Login from "../pages/Login";
import logo from "../images/logo.png";

function NavBar() {

  const {loggedInUserName, setLoggedInUserName} = useContext(MyContext);

  /* Highlighting: The navigation bar highlights the element of the current page the user is on. */
  /* Highlight the current page the user is on / active page, even on refresh */
  const location = useLocation();
  const history = useHistory();

  const redirectToLogin = () => {
    history.replace('/#');
  }

  const logOut = () => {
    Cookies.set("username", "");
    setLoggedInUserName("");
    redirectToLogin();
  }
  
  // an array of objects; pages[classIndex] is enough to access it
  const loggedOutPages = [{id:"login", text: "Login", tooltipText: "Log in to your account", href:"#/"}];
                          // {id:"createAccount", text: "Open Acount", tooltipText: "Open your BetterBank® account", href:"#/createAccount"}];
  
  //preventing user logout when refreshing the page
  const isLoggedIn = (Cookies.get("username") && (Cookies.get("username").length > 0)) || loggedInUserName.length > 0;
  
  const pages = isLoggedIn ? [               
                {id:"deposit",text: "Deposit", tooltipText: "Deposit cash & checks on any device", href:"#/deposit"},
                {id:"withdraw",text: "Withdraw", tooltipText: "Withdraw cash & checks on any device", href:"#/withdraw"},
                {id:"transfer",text: "Transfer", tooltipText: "Transfer cash & checks on any device", href:"#/transfer"},
                {id:"invest",text: "Invest", tooltipText: "Invest cash & checks on any device", href:"#/invest"},
                {id:"allData",text: "All Data", tooltipText: "All your transactions and more", href:"#/allData"},
                {id:"logout", text: "Log Out", tooltipText: "Log out from your account", href:"", onclick:logOut}
  ] : loggedOutPages;


  const getClass = (classIndex) => {
    const currentPage = location.pathname; //accessing pathname from the location object
    const renderedPage = pages[classIndex].href.split("#").pop(); //from which we'll get "withdraw", "deposit", etc.
    return renderedPage === currentPage ? "current" : "";
  }

  return (
    <>   
      <div className="blurr">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a href={{Login}} className="navbar-brand mt-1 ml-5">
            <img src={logo} className="banklogo" alt="BetterBank"/>
          </a>
          <div className="container">
            {/* BUTTON */}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              {/* hamburger icon */}
              <span className="navbar-toggler-icon"></span> 
            </button>

            {/*  container containing nav items from item 1 till length of page */}
            <div className="collapse navbar-collapse nav-container" id="navbarNav">

              {/* container containing each nav item only */}
              <ul className="navbar-nav navitem-container ml-auto">
                {pages.map((item, index) => 
                  <li key={index} className="nav-item">
                    {(() => {
                      if (item.href.length > 0) {
                        return <a data-tip data-for={item.id} className={`nav-link pl-2 pr-2 mt-2 ml-1 ${getClass(index)}`} href={item.href}>{item.text}</a>
                      } else {
                        return <a data-tip data-for={item.id} className={`nav-link pl-2 pr-2 mt-2 ml-1 ${getClass(index)}`} onClick={item.onclick}>{item.text}</a>
                      }
                    })()}                    
                    <ReactTooltip id={item.id} effect='solid'>
                      <span>{item.tooltipText}</span>
                    </ReactTooltip>
                  </li>
                )}
              </ul>
              {/* end of container for nav items */}
            </div>
            {/* end of main container */}
          </div>
        </nav>
      </div>
    </>
  )
}

export default NavBar;

