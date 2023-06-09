import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "@mantine/form";
import {
  Stepper,
  Group,
  Code,
  Button,
  TextInput,
  PasswordInput,
  Select,
  MultiSelect,
} from "@mantine/core";
import { motion } from "framer-motion";
import "./Landing.css";

const SignUp = (props) => {
  const [active, setActive] = useState(0);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
      class: "",
      exam: "",
    },

    validate: (values) => {
      if (active === 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
          password:
            values.password.length < 6
              ? "Password must include at least 6 characters"
              : null,
          confirmPassword: values.confirmPassword !== values.password ? "Passwords did not match" : null,
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

      return {};
    },
  });

  const nextStep = () =>
    setActive((current) => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 2 ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <motion.div
      initial={false}
      animate={{ x: props.page === 1 ? (window.innerWidth<1024?"-100vw":"-50vw") : 0}}
      transition={{ duration: 0.7 }}
      className="signup"
    >
        <div className="signup-content">
          <span className="signup-heading">Create Account</span>
          <span className="signup-subheading">Sign up using email and enter details.</span>
          <Stepper active={active} progressIcon={false} breakpoint="sm">
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
                transitionProps={{ transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }}
                {...form.getInputProps("class")}
              />
              <MultiSelect
                mt="md"
                withAsterisk
                label="Exam"
                placeholder="What are you preparing for?"
                data={["Jee Main", "Jee Advanved", "NEET", "KVPY"]}
                transitionProps={{ transition: 'pop-top-left', duration: 100, timingFunction: 'ease' }}
                {...form.getInputProps("exam")}
              />
            </Stepper.Step>
            <Stepper.Completed>
              Completed! Form values:
              <Code block mt="xl">
                {JSON.stringify(form.values, null, 2)}
              </Code>
            </Stepper.Completed>
          </Stepper>

          <Group position="right" mt="sm">
            {active !== 0 && (
              <Button className="signup-prev" variant="default" onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 2 && <Button className="signup-next" onClick={nextStep}>Next step</Button>}
          </Group>
          <div className="switch">
            <span>Already have an account?</span>
            <Link className="switch-button" to="/login" exact onClick={() => props.handleSwitch(1)}>Sign up</Link>
            {/* <button onClick={() => props.handleSwitch(1)}>Sign in</button> */}
          </div>
        </div>
    </motion.div>
  );
};

export default SignUp;
