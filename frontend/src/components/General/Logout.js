import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "../../utils/getUser";
const Logout = (props) => {
  const navigate = useNavigate();
  function handleLogout(e) {
    const config = {
      withCredentials: true,
      // headers: {
      //   "X-CSRFToken": getCookie("csrftoken"),
      // },
    };
    axios.get(`http://localhost:8000/api/logout`, config).then((res) => {
      console.log(res);
      console.log(res.data, "received data");
      if (res.data.success) {
        toast("Logged Out Successfully.");
        props.user.current = getUser()
          .then((res) => {
            return res;
          })
          .catch((e) => console.log(e));
        navigate("/");
      }
    });
  }
  return (
    <div className="menu flex align-center justify-center ml-auto">
      <h3 onClick={handleLogout} className="cursor-pointer">
        <i className="fa fa-sign-out"></i>
      </h3>
    </div>
  );
};

export default Logout;
