import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  Stepper,
  Group,
  PinInput,
  Code,
  Button,
  TextInput,
  PasswordInput,
  NumberInput,
  Select,
  Input,
  MultiSelect,
} from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import "./Landing.css";

const SignUp = (props) => {
  const [active, setActive] = useState(0);
  const [subactive, setSubactive] = useState(0);

  const [phone, setPhone] = useState();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      class: "",
      exam: "",
      phone: "",
      otp: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
          password:
            values.password.length < 6
              ? "Password must include at least 6 characters"
              : null,
          confirmPassword:
            values.confirmPassword !== values.password
              ? "Passwords did not match"
              : null,
        };
      }

      if (active === 1) {
        return {
          firstname:
            values.firstname.trim().length < 2
              ? "Name must include at least 2 characters"
              : null,
          lastname:
            values.lastname.trim().length < 2
              ? "Name must include at least 2 characters"
              : null,
          class: !values.class ? "Select your class" : null,
          exam:
            values.exam.length === 0 ? "Select atleast one target exam" : null,
        };
      }

      if (active === 2 && subactive === 0) {
        return {
          phone:
            values.phone.toString().substring(0, 2) !== "91"
              ? "Invalid country code"
              : values.phone.toString().substring(2).length !== 10
              ? "Invalid phone number"
              : null,
        };
      }

      if (active === 2 && subactive === 1) {
        return {
          otp: values.otp.length !== 6 ? "Incomplete OTP" : null,
        };
      }

      return {};
    },
  });

  const nextStep = () => {
    console.log(active, subactive);
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current === 2 && subactive === 0 ? current : current + 1;
    });
    setSubactive((current) => {
      console.log(current);
      if (form.validate().hasErrors) {
        return current;
      }
      return active === 2 && current === 0 ? current + 1 : current;
    });
  };

  const prevStep = () => {
    setActive((current) =>
      current === 2 && subactive === 1 ? current : current - 1
    );
    setSubactive(0);
  };

  return (
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
      className="signup"
    >
      <div className="signup-content">
        <span className="signup-heading">Create Account</span>
        <span className="signup-subheading">
          Sign up using email and enter details.
        </span>

        <AnimatePresence>
          <Stepper
            styles={{
              stepBody: { margin: 0 },
              step: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
              },
              stepLabel: { textAlign: "center" },
              separator: {
                marginLeft: 0,
                marginRight: 0,
                marginTop: "-3.78rem",
              },
              stepDescription: { width: "4rem", textAlign: "center" },
              content: {
                height: "15rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
            }}
            active={active}
            progressIcon={false}
          >
            <Stepper.Step label="Step 1" description="Profile settings">
              <TextInput
                mt="md"
                withAsterisk
                label="Email"
                placeholder="user@email.com"
                {...form.getInputProps("email")}
              />
              <PasswordInput
                mt="md"
                withAsterisk
                label="Password"
                placeholder="Password"
                {...form.getInputProps("password")}
              />
              <PasswordInput
                mt="md"
                withAsterisk
                label="Confirm password"
                placeholder="Confirm password"
                {...form.getInputProps("confirmPassword")}
              />
            </Stepper.Step>

            <Stepper.Step label="Step 2" description="Personal information">
              <div className="name-input">
                <TextInput
                  mt="md"
                  withAsterisk
                  label="First Name"
                  placeholder="First Name"
                  {...form.getInputProps("firstname")}
                />
                <TextInput
                  mt="md"
                  withAsterisk
                  label="Last Name"
                  placeholder="Last Name"
                  {...form.getInputProps("lastname")}
                />
              </div>
              <Select
                mt="md"
                withAsterisk
                label="Class"
                placeholder="Select your class"
                data={["Class IX", "Class X", "Class XI", "Class XII"]}
                transitionProps={{
                  transition: "pop-top-left",
                  duration: 100,
                  timingFunction: "ease",
                }}
                {...form.getInputProps("class")}
              />
              <MultiSelect
                mt="md"
                withAsterisk
                label="Exam"
                placeholder="What are you preparing for?"
                data={["Jee Main", "Jee Advanved", "NEET", "KVPY"]}
                transitionProps={{
                  transition: "pop-top-left",
                  duration: 100,
                  timingFunction: "ease",
                }}
                {...form.getInputProps("exam")}
              />
            </Stepper.Step>
            <Stepper.Step label="Step 3" description="OTP Verification">
              <Stepper
                className="inner-stepper"
                active={subactive}
                onStepClick={setSubactive}
              >
                <Stepper.Step>
                  <div
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
                  >
                    <NumberInput
                      mb="xl"
                      mt="md"
                      withAsterisk
                      placeholder="91 0000 000 000"
                      hideControls={true}
                      label="Mobile Number"
                      {...form.getInputProps("phone")}
                    />
                    <span
                      style={{ margin: "auto 1rem", color: "var(--grey-dark)" }}
                      className="switch"
                    >
                      (We will send you a code via SMS text message to your
                      phone number)
                    </span>
                  </div>
                </Stepper.Step>
                <Stepper.Step>
                  <Group position="center">
                    <PinInput
                      mb="sm"
                      length={6}
                      type="number"
                      {...form.getInputProps("otp")}
                    />
                  </Group>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span
                      style={{
                        marginRight: "0.3rem",
                        marginBottom: 0,
                        color: "var(--grey-dark)",
                      }}
                      className="switch"
                    >
                      Did not receive OTP?
                    </span>
                    <span
                      style={{
                        marginBottom: 0,
                        cursor: "pointer",
                        color: "var(--primary)",
                        fontWeight: 600,
                      }}
                      className="switch"
                    >
                      Resend
                    </span>
                  </div>
                </Stepper.Step>
              </Stepper>
            </Stepper.Step>
            <Stepper.Completed>
              Completed! Form values:
              <Code block mt="xl">
                {JSON.stringify(form.values, null, 2)}
              </Code>
            </Stepper.Completed>
          </Stepper>
        </AnimatePresence>

        <Group position="right" mt="sm">
          {active !== 0 && (
            <Button
              className="signup-prev"
              variant="default"
              onClick={prevStep}
            >
              Back
            </Button>
          )}
          {active !== 3 && (
            <Button className="signup-next" onClick={nextStep}>
              {active < 2
                ? "Next step"
                : subactive == 0
                ? "Send OTP"
                : "Sign Up"}
            </Button>
          )}
        </Group>
        <div className="switch">
          <span>Already have an account?</span>
          <Link
            className="switch-button"
            to="/login"
            exact
            onClick={() => props.handleSwitch(1)}
          >
            Sign up
          </Link>
          {/* <button onClick={() => props.handleSwitch(1)}>Sign in</button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
