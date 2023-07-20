import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPen } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../components/StudentDashboard/Sidebar";
import { useDisclosure } from "@mantine/hooks";
import { Avatar, Modal, createStyles } from "@mantine/core";
import UploadAvatar from "../components/ProfilePage/UploadAvatar";

const useStyles = createStyles(() => ({
  content: {
    borderRadius: 16,
  },
}));

const ProfilePage = (props) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [avatar, setAvatar] = useState(null);
  const { classes } = useStyles();

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
    <div className="h-screen">
      <Sidebar />
      <div className="h-screen main-content pb-8 flex flex-col items-center md:ml-[var(--main-sidebar-width)]">
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
            className={`${
              avatar && "drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
            } translate-y-1/2 rounded-full w-[120px] h-[120px] object-cover object-center mx-auto mt-[50px]`}
            src={avatar}
            alt="Anish Datta"
            color="violet"
            children={
              <span className="text-xl">{initials("Anish Datta")}</span>
            }
          ></Avatar>
          <FontAwesomeIcon
            icon={faPen}
            onClick={open}
            className="scale-90 cursor-pointer text-white bg-[var(--primary)] rounded-full p-2 absolute left-1/2 translate-x-[27px] translate-y-[27px]"
          />
        </div>
        <span className="text-xl font-semibold mt-4">Anish Datta</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full px-6 gap-6 mt-8 max-w-[350px] sm:max-w-[700px]">
          <div className="col-span-1 flex flex-col">
            <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
              Name
            </span>
            <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
              Anish Datta
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
              Email
            </span>
            <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
              anishd3139@gmail.com
            </span>
          </div>
          <div className="col-span-1 flex flex-col">
            <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
              Phone
            </span>
            <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
              +91 861 727 9674
            </span>
          </div>
          {props.userType === 2 && (
            <div className="col-span-1 flex flex-col">
              <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
                School
              </span>
              <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
                Dehli Public School, Ruby Park
              </span>
            </div>
          )}
          {props.userType === 1 && (
            <div className="col-span-1 flex flex-col">
              <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
                Class
              </span>
              <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
                XI
              </span>
            </div>
          )}
          {props.userType === 1 && (
            <div className="col-span-1 flex flex-col">
              <span className="ml-2 mb-1 font-semibold text-[var(--grey-dark)]">
                Exams
              </span>
              <span className="bg-white px-3 py-2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.03)] rounded-xl font-medium text-[var(--black)] ">
                JEE Mains, KVPY
              </span>
            </div>
          )}
        </div>
        <div className="h-full flex flex-col justify-end">
          <Link
            to={props.userType === 1 ? "/student" : "/educator"}
            className="py-4 group flex gap-2 items-center"
          >
            <span className="align-bottom font-semibold text-[15px] group-hover:text-[var(--primary)] ease-in-out duration-300">
              Go to Dashboard
            </span>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="text-slate-600 group-hover:bg-[var(--primary)] group-hover:text-white p-1.5 group-hover:scale-125 w-[15px] h-[15px] group-hover:-rotate-45 rounded-full ease-in-out duration-300"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
