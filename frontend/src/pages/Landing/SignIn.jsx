import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Button, TextInput, Checkbox, PasswordInput } from "@mantine/core";
import { motion } from "framer-motion";
import "./Landing.css";

const SignIn = (props) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <motion.div
      initial={false}
      animate={{ x: props.page === 1 ? (window.innerWidth<1024?"-100vw":"-50vw") : 0 }}
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
            <Button className="submit" type="submit">
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
          
          <Link className="switch-button" to="/signup" exact onClick={() => props.handleSwitch(-1)}>Sign up</Link>
          {/* <button onClick={() => props.handleSwitch(-1)}>Sign up</button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default SignIn;
