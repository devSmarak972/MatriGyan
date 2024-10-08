import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPen } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/StudentDashboard/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, Modal, createStyles } from "@mantine/core";
import UploadAvatar from "../components/ProfilePage/UploadAvatar";
import axios from 'axios';
import { Input } from '@mantine/core';
import { Button } from '@mantine/core';

const useStyles = createStyles(() => ({
  content: {
    borderRadius: 16,
  },
}));

const EditProfile = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [avatar, setAvatar] = useState(null);
  const { classes } = useStyles();
  const [userDetails,setDetails] = useState({"user":{"first_name":"Name","last_name":""}});
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState(userDetails.is_student ? userDetails.student.phone : "");


  const handleFname = (event) =>{
    setFname(event.target.value);
    console.log(fname);
  }

  const handlePhone = (event) =>{
    setPhone(event.target.value);
    console.log(phone);
  }

  const handleLname = (event) =>{
    setLname(event.target.value);
    console.log(lname);
  }

  const handleEmail = (event) =>{
    setEmail(event.target.value);
    console.log(email);
  }

  const handleUsername = (event) =>{
    setUsername(event.target.value);
    console.log(username);
  }

  const handleSubmit = ()=>{
    if(userDetails.is_student){

        console.log(fname,lname,email,username,phone);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit-student/2/`,{
            first_name:fname,
            last_name:lname,
            email:email,
            username:username,
            phone:phone
        })
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }else{

        console.log(fname,lname,email,username);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/edit-educator/1/`, {
            first_name:fname,
            last_name:lname,
            email:email,
            username:username
        })
        .then((res)=>{  
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
  }

  useEffect(()=>{
    const fetchDetails = async ()=>{
      try{
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-user/`,{withCredentials:true});
        console.log(res.data);
        setDetails(res.data);
      } catch(error){
        console.log(error);
      }
    }

    fetchDetails();
  }, [])

  useEffect(()=>{
    setFname(userDetails.user.first_name);
    setLname(userDetails.user.last_name);
    setEmail(userDetails.user.email);
    setUsername(userDetails.user.username);
    if(userDetails.is_student){
      setPhone(userDetails.student.phone);
    }
  }, [userDetails])

  const initials = (name) => {
    const words = name.split(" ");
    const initials = [];
    for (let i = 0; i < words.length; i++) {
      const initial = words[i].charAt(0).toUpperCase();
      initials.push(initial);
    }
    return initials.join("");
  };

  return (
    <div>
      <Sidebar />
      <div className="main-content pb-8 flex flex-col items-center md:ml-[var(--main-sidebar-width)]">
        <div className="relative bg-gradient-to-br from-white to-[var(--primary)] w-full mb-[60px]">
          <Modal
            centered
            size="auto"
            opened={opened}
            onClose={close}
            title="Profile Picture"
            classNames={{ content: classes.content }}
          >
            <UploadAvatar
              close={close}
              preview={avatar}
              setAvatar={setAvatar}
            />
          </Modal>
          <Avatar
            className={`${avatar && "drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"} translate-y-1/2 rounded-full w-[120px] h-[120px] object-cover object-center mx-auto mt-[50px]`}
            src={avatar} //{(!userDetails.is_student && userDetails.educator.profile_pic)}
            alt={userDetails.user.first_name}
            color="violet"
            children={
              <span className="text-xl">{initials("Full Name")}</span>
            }
          ></Avatar>
          <FontAwesomeIcon
            icon={faPen}
            onClick={open}
            className="scale-90 cursor-pointer text-white bg-[var(--primary)] rounded-full p-2 absolute left-1/2 translate-x-[27px] translate-y-[27px]"
          />
        </div>
        <span className="text-xl font-semibold mt-4">{userDetails.user.first_name} {userDetails.user.last_name}</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full px-6 gap-6 mt-8 max-w-[350px] sm:max-w-[700px]">
          <div className="col-span-1 flex flex-col">
            <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
              First Name
            </span>
            <Input
            value={fname}
            onChange={handleFname}
            placeholder={userDetails.user.first_name}
            />
            {/* <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
            {userDetails.user.first_name}
            </span> */}
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
              Last Name
            </span>
            <Input
            value={lname}
            onChange={handleLname}
            placeholder={userDetails.user.last_name}
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
              Email
            </span>
            <Input
            value={email}
            onChange={handleEmail}
            placeholder={userDetails.user.email}
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
              Username
            </span>
            <Input
            value={username}
            onChange={handleUsername}
            placeholder={userDetails.user.username}
            />
          </div>
          {/* {props.userType === 2 && (
            <div className="col-span-1 flex flex-col">
              <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
                School
              </span>
              <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
                Dehli Public School, Ruby Park
              </span>
            </div>
          )} */}
          {userDetails.is_student && (
            <div className="col-span-1 flex flex-col">
              <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
                Phone
              </span>
              <Input
                value={phone}
                placeholder={userDetails.is_student && userDetails.student.phone}
                onChange={handlePhone}
                />
            </div>
          )}
          {props.userType === 1 && (
            <div className="col-span-1 flex flex-col">
              <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
                Courses
              </span>
              <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
                JEE Mains, KVPY
              </span>
            </div>
          )}
        </div>
        <Link
          to={userDetails.is_student ? "/student" : "/educator"}
          className="fixed bottom-8 group flex gap-2 items-center"
        >
          <span className="font-semibold text-[15px] group-hover:text-[var(--primary)] ease-in-out duration-300">
            Go to Dashboard
          </span>
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-slate-600 group-hover:bg-[var(--primary)] group-hover:text-white p-1.5 group-hover:scale-125 w-[15px] h-[15px] group-hover:-rotate-45 rounded-full ease-in-out duration-300"
          />
        </Link>
        <Button variant="light" color="blue" style={{"margin":"10px"}} onClick={handleSubmit}>
        Save
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
