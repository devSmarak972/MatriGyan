import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from 'axios';
import { getCookie } from "./utils/apiCaller";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
// axios.defaults.headers.common['Cookie'] = "csrftoken="+getCookie("csrftoken");

// axios.interceptors.request.use(
//     config => {
  
      
//      console.log("axios")
//       if (document.cookie.includes('csrftoken')) {   
//         config.headers['Cookie']= getCookie("csrftoken");
//       }
     
//       return config;
//     },
//     error => {  
//       return Promise.reject(error.data.error.message);
//     }
//   );
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
