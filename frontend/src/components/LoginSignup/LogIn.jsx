import React, { useRef } from "react";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Button, TextInput, Checkbox, PasswordInput } from "@mantine/core";
import { motion } from "framer-motion";
import "../../pages/LoginSignup/LoginSignup.css";
// import setCookie
// import {useCookies} from "react-cookie"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from "../../utils/getUser";

const LogIn = (props) => {
  const user=useRef(false);
  // const [cookies, setCookie, removeCookie] = useCookies(["csrftoken"]);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length === 0 ? "Enter Password" : null),
    },
  });
  
  
  useEffect(()=>{
    (async () => {
       user.current=await getUser();//set this to props.user and remove async
      if(user.current.code===1)
     {
       window.location.href="/student"
     }
     else if(user.current.code===2)
     {
  
       window.location.href="/educator"
     }
    })();
   
    
  },[])
  const handleLogin = (event) => {
    event.preventDefault();

    form.validate();
    if (!form.isValid()) return;

    var data = form.values;

    axios
      .post(
        `http://localhost:8000/api/login/email`,
        { data },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data, res.headers);

        if (res.data["redirect"] === true) {
          if (res.data["utype"] === "student") navigate("../student");
          else if (res.data["utype"] === "educator") navigate("../student");
          else navigate("/");

          // setCookie('csrftoken', , { path: '/' });

          // setCookie();
        } else {
          throw res.data["message"];
        }
      })
      .catch((err) => {
        console.log(err);
        const errToast = () => toast("Failed to login: " + err);
        errToast();
      });
  };
  return (
    <>
      <ToastContainer></ToastContainer>

      <motion.div
        initial={false}
        animate={{
          x:
            props.page === 1
              ? window.innerWidth < 1024
                ? "-100vw"
                : "-50vw"
              : 0,
        }}
        transition={{ duration: 0.7 }}
        className="signin"
      >
        <div className="signin-content">
          <span className="signin-heading">Welcome Back</span>
          <span className="signin-subheading">Sign in to your account.</span>
          <form
            className="form"
            onSubmit={form.onSubmit((values) => console.log(values))}
          >
            <TextInput
              withAsterisk
              label="Email"
              placeholder="user@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <div className="signin_inner-row">
              <Checkbox
                mt="md"
                label="Remember Me"
                {...form.getInputProps("rememberMe", { type: "checkbox" })}
              />
              <a href="">Forgot Password?</a>
            </div>
            <div>
              <Button className="submit" onClick={handleLogin} type="submit">
                Sign in
              </Button>
              <Button className="google" mt="sm">
                <img src="/google.svg" />
                Sign in with Google
              </Button>
            </div>
          </form>
          <div className="switch">
            <span>Don't have an account?</span>

            <Link
              className="switch-button"
              to="/signup"
              exact
              onClick={() => props.handleSwitch(-1)}
            >
              Sign up
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default LogIn;
