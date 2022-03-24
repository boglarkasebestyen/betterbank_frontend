import React from "react";
import {useContext} from "react";
import {MyContext} from "../myContext/MyContext";
import Cookies from "js-cookie";

function Card(props) {

    function classes() {
      const bg  = props.bgcolor ? ' bg-' + props.bgcolor : "";
      const txt = props.txtcolor ? ' text-' + props.txtcolor: "";

      return 'card ' + bg + txt;
    }
    return (
      <div className="blurr"> 
        <div className={`cardContainer mb-5 mt-5 pt-2 ${classes()}`}>

        {(() => {
          let username = Cookies.get("username");;
							if (username) {
								return (
                  <>                                                                                                
                    <div className="username mt-2">Welcome back, {username}!</div>
                  </>
								) 
							}
						})()}
     
         
          <div className="card-header pt-4">
            {props.header}
          </div>


          <div className="card-body">
            {props.title && (<h5 className="card-title mb-4">{props.title}</h5>)}
            {props.text && (<p className="card-text">{props.text}</p>)}
            {props.body}
          </div>
        </div>
      </div>
    );    
  }

  export default Card;