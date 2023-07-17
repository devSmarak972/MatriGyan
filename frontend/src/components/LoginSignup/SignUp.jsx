import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

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
  MultiSelect,
} from "@mantine/core";
import axios from "axios";
import { MoonLoader } from "react-spinners";
import { auth } from "../../utils/Firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";
import "../../pages/LoginSignup/LoginSignup.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSelect from "./UserSelect";
const SignUp = (props) => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState(0);
  const [active, setActive] = useState(0);
  const [subactive, setSubactive] = useState(0);
  const [logged, setLogged] = useState(false);

  const [otpLoading, setOtpLoading] = useState(0);

  const classes = ["Class IX", "Class X", "Class XI", "Class XII"];
  const exams = ["Jee Main", "Jee Advanved", "NEET", "KVPY"];
  // useEffect(() => {
  //   // navigate("/");
  // }, []);

  // useEffect(() => {

  //   props.handleSwitch(1);
  //   // navigate("../login", { replace: true });
  // }, [logged]);

  const sendOTP = async () => {
    let phone = form.values.phone;
    let appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + phone;
    console.log(appVerifier);

    setOtpLoading(1);
    if (!appVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log(response);
          },
          "expired-callback": () => {},
        },
        auth
      );
      appVerifier = window.recaptchaVerifier;
    }

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP sent successfully!");
        setSubactive(1);
        setOtpLoading(0);
      })
      .catch((error) => {
        console.log(error);
        setOtpLoading(0);
      });
  };

  const verifyOTP = () => {
    let otp = form.values.otp;
    setOtpLoading(1);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setActive((prev) => prev + 1);
        setOtpLoading(0);
      })
      .catch((err) => {
        console.log(err);
        form.setFieldError("otp", "Incorrect OTP");
        setOtpLoading(0);
      });
  };
  const accCreated = () => toast("Account Created Successfully");
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      school: "",
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
          school:
            !values.school !== 0 && userType === 2
              ? "Select associated school"
              : null,
          class: !values.class && userType === 1 ? "Select your class" : null,
          exam:
            (values.exam.length && userType === 1) === 0
              ? "Select atleast one target exam"
              : null,
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
  const submitSignup = (event) => {
    event.preventDefault();

    var data = form.values;

    axios
      .post(`http://localhost:8000/api/register/email`, { data })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        if (res.data["redirect"] === true) {
          accCreated();
          props.handleSwitch(1);
        }
      })
      .catch((err) => {
        console.log(err.message);
        const notify = () => toast(err.message);
        notify();
      });
  };
  //  //  //  //

  const nextStep = async () => {
    console.log("Next Step");
    if (form.validate().hasErrors) {
      setActive((prev) => prev);
    } else if (active === 2 && subactive === 0) setActive((prev) => prev);
    else if (active === 2 && subactive === 1) {
      // verifyOTP();
      setActive((prev) => prev + 1);
    } else {
      setActive((prev) => prev + 1);
    }

    //  //  //  //  //
    console.log("Next Step");
    console.log("Step :" + active);

    if (form.validate().hasErrors) {
      return setSubactive((prev) => prev);
    } else if (active === 2 && subactive === 0) {
      setSubactive(1);
      // sendOTP();
    }
  };

  const prevStep = () => {
    setActive((current) =>
      current === 2 && subactive === 1 ? current : current - 1
    );
    setSubactive(0);
  };
  function funcBtn(e) {
    console.log(e, "funcbtn");
    if (active === 2 && subactive !== 0) submitSignup(e);
    else nextStep(e);
  }

  return (
    <>
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
        <div id="recaptcha-container"></div>
        <AnimatePresence>
          {userType === 0 && <UserSelect setUserType={setUserType} />}
          {userType !== 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="signup-content"
            >
              <span className="signup-heading">Create Account</span>
              <span className="signup-subheading">
                Sign up using email and enter details.
              </span>

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
                    height: "17rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    overflowY: "auto",
                    overflowX: "hidden",
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
                  {userType === 2 && (
                    <Select
                      mt="md"
                      withAsterisk
                      label="School"
                      searchable
                      placeholder="Select associated school"
                      nothingFound="No schools found"
                      data={["School A", "School B", "School C"]}
                      transitionProps={{
                        transition: "pop-top-left",
                        duration: 100,
                        timingFunction: "ease",
                      }}
                      {...form.getInputProps("school")}
                    />
                  )}
                  {userType === 1 && (
                    <div>
                      <Select
                        mt="md"
                        withAsterisk
                        label="Class"
                        placeholder="Select your class"
                        data={classes}
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
                        data={exams}
                        transitionProps={{
                          transition: "pop-top-left",
                          duration: 100,
                          timingFunction: "ease",
                        }}
                        {...form.getInputProps("exam")}
                      />
                    </div>
                  )}
                </Stepper.Step>
                <Stepper.Step label="Step 3" description="OTP Verification">
                  <Stepper
                    className="inner-stepper"
                    active={subactive}
                    onStepClick={setSubactive}
                  >
                    <Stepper.Step>
                      <div className="signup-number-row">
                        <NumberInput
                          mb="xl"
                          mt="md"
                          withAsterisk
                          placeholder="91 0000 000 000"
                          hideControls={true}
                          label="Mobile Number"
                          {...form.getInputProps("phone")}
                        />
                        <span className="switch">
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
                      <div className="resend-otp">
                        <span className="switch resend-otp-span1">
                          Did not receive OTP?
                        </span>
                        <span
                          className="switch resend-otp-span2"
                          onClick={sendOTP}
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

              <Group position="right" mt="sm">
                {otpLoading && (
                  <MoonLoader color="var(--primary)" size="25px" />
                )}
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
                  <Button
                    className="signup-next"
                    // onClick={nextStep}
                    onClick={funcBtn}
                  >
                    {active < 2
                      ? "Next step"
                      : subactive === 0
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
                  Log in
                </Link>
              </div>
              <div
                onClick={() => setUserType(0)}
                className="text-center font-medium -mt-3 text-[var(--grey-dark)] hover:text-[var(--black)] ease-in-out duration-300 cursor-pointer"
              >
                <span>Not {userType === 1 ? "a student" : "an educator"}?</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default SignUp;
