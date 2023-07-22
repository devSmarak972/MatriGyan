import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../utils/getUser";
import { toast } from "react-toastify";

const Logout = (props) => {
  console.log(props);
  const navigate = useNavigate();
  function handleLogout(e) {
    const config = {
      withCredentials: true,
      // headers: {
      //   "X-CSRFToken": getCookie("csrftoken"),
      // },
    };
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, config)
      .then((res) => {
        if (res.data.success) {
          navigate("/");
          props.setLoader(true);
          toast("Logged Out Successfully.");
        }
      });
    // props.user.current = getUser()
    //   .then((res) => res)
    //   .catch((e) => console.log(e));
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
