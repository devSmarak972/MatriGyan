import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faBookOpen,
  faCalendar,
  faFileLines,
  faHouse,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(0);
  const [open, setOpen] = useState(0);

  return (
    <div className="sidebar print:hidden">
      {window.innerWidth < 768 && (
        <motion.div
          initial={false}
          animate={{ x: open === 0 ? 0 : 75 }}
          transition={{ duration: 0.5 }}
          style={{ position: "absolute", zIndex: 1000 }}
        >
          <FontAwesomeIcon
            icon={faBars}
            style={{
              color: "#278bf0",
              zIndex: 1000,
              position: "absolute",
              top: 0,
            }}
            className="p-2 rounded-full bg-blue-100 w-[1.6rem] h-[1.6rem] m-3 cursor-pointer"
            onClick={() => setOpen((prev) => 1 - prev)}
          />
        </motion.div>
      )}
      {/* <!-- Main Sidebar --> */}
      <motion.div
        className="main-sidebar"
        initial={{ x: window.innerWidth < 768 ? -80 : 0 }}
        animate={{ x: open === 0 ? (window.innerWidth < 768 ? -80 : 0) : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex h-full w-full flex-col items-center border-r border-slate-150 bg-white dark:border-navy-700 dark:bg-navy-800">
          <div className="flex pt-4">
            <Link to="/">
              <img
                className="h-11 w-11 transition-transform duration-500 ease-in-out hover:rotate-[360deg]"
                src="/logo-bg.png"
                alt="logo"
              />
            </Link>
          </div>

          <div className="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto pt-6">
            <Link
              to="#"
              title="Dashboard"
              className={`relative flex h-11 w-11 items-center justify-center rounded-lg ${
                sidebar === 0 ? `bg-[var(--background-light)]` : ``
              } text-primary outline-none transition-colors duration-200 hover:bg-[var(--background-light)] dark:bg-navy-600 dark:text-accent-light dark:hover:bg-navy-450 dark:active:bg-navy-450/90`}
              onClick={() => setSidebar(0)}
            >
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: sidebar === 0 ? "#228bf0" : "#B6B6B6" }}
                className="scale-150"
              />
            </Link>

            <Link
              to="#"
              className={`flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 ${
                sidebar === 1 ? `bg-[var(--background-light)]` : ``
              } hover:bg-[var(--background-light)] active:bg-[var(--background-light)] dark:hover:bg-navy-300/20 dark:active:bg-navy-300/25`}
              onClick={() => setSidebar(1)}
            >
              <FontAwesomeIcon
                icon={faBookOpen}
                style={{ color: sidebar === 1 ? "#228bf0" : "#B6B6B6" }}
                className="scale-125"
              />
            </Link>

            <Link
              to="#"
              className={`flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 ${
                sidebar === 2 ? `bg-[var(--background-light)]` : ``
              } hover:bg-[var(--background-light)] active:bg-[var(--background-light)] dark:hover:bg-navy-300/20 dark:active:bg-navy-300/25`}
              onClick={() => setSidebar(2)}
            >
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ color: sidebar === 2 ? "#228bf0" : "#B6B6B6" }}
                className="scale-150"
              />
            </Link>

            <Link
              to="#"
              className={`flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 ${
                sidebar === 3 ? `bg-[var(--background-light)]` : ``
              } hover:bg-[var(--background-light)]active:bg-[var(--background-light)]dark:hover:bg-navy-300/20 dark:active:bg-navy-300/25`}
              onClick={() => setSidebar(3)}
            >
              <FontAwesomeIcon
                icon={faFileLines}
                style={{ color: sidebar === 3 ? "#228bf0" : "#B6B6B6" }}
                className="scale-150"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center space-y-3 py-3">
            {/* <!-- Settings --> */}
            <a
              href="form-layout-5.html"
              className="flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:active:bg-navy-300/25"
            >
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-opacity="0.3"
                  fill="currentColor"
                  d="M2 12.947v-1.771c0-1.047.85-1.913 1.899-1.913 1.81 0 2.549-1.288 1.64-2.868a1.919 1.919 0 0 1 .699-2.607l1.729-.996c.79-.474 1.81-.192 2.279.603l.11.192c.9 1.58 2.379 1.58 3.288 0l.11-.192c.47-.795 1.49-1.077 2.279-.603l1.73.996a1.92 1.92 0 0 1 .699 2.607c-.91 1.58-.17 2.868 1.639 2.868 1.04 0 1.899.856 1.899 1.912v1.772c0 1.047-.85 1.912-1.9 1.912-1.808 0-2.548 1.288-1.638 2.869.52.915.21 2.083-.7 2.606l-1.729.997c-.79.473-1.81.191-2.279-.604l-.11-.191c-.9-1.58-2.379-1.58-3.288 0l-.11.19c-.47.796-1.49 1.078-2.279.605l-1.73-.997a1.919 1.919 0 0 1-.699-2.606c.91-1.58.17-2.869-1.639-2.869A1.911 1.911 0 0 1 2 12.947Z"
                />
                <path
                  fill="currentColor"
                  d="M11.995 15.332c1.794 0 3.248-1.464 3.248-3.27 0-1.807-1.454-3.272-3.248-3.272-1.794 0-3.248 1.465-3.248 3.271 0 1.807 1.454 3.271 3.248 3.271Z"
                />
              </svg>
            </a>

            <div
              x-data="usePopper({placement:'right-end',offset:12})"
              className="flex"
            >
              <button x-ref="popperRef" className="avatar h-12 w-12">
                <img
                  className="rounded-full"
                  src="StudentDashboard/images/avatar/avatar-12.jpg"
                  alt="avatar"
                />
                <span className="absolute right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-success dark:border-navy-700"></span>
              </button>

              <div className="popper-root fixed" x-ref="popperRoot">
                <div className="popper-box w-64 rounded-lg border border-slate-150 bg-white shadow-soft dark:border-navy-600 dark:bg-navy-700">
                  <div className="flex items-center space-x-4 rounded-t-lg bg-slate-100 py-5 px-4 dark:bg-navy-800">
                    <div className="avatar h-14 w-14">
                      <img
                        className="rounded-full"
                        src="StudentDashboard/images/avatar/avatar-12.jpg"
                        alt="avatar"
                      />
                    </div>
                    <div>
                      <a
                        href="#"
                        className="text-base font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
                      >
                        Travis Fuller
                      </a>
                      <p className="text-xs text-slate-400 dark:text-navy-300">
                        Product Designer
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col pt-2 pb-5">
                    <a
                      href="#"
                      className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-warning text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>

                      <div>
                        <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
                          Profile
                        </h2>
                        <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
                          Your profile setting
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-info text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                      </div>

                      <div>
                        <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
                          Messages
                        </h2>
                        <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
                          Your messages and tasks
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>

                      <div>
                        <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
                          Team
                        </h2>
                        <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
                          Your team activity
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-error text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>

                      <div>
                        <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
                          Activity
                        </h2>
                        <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
                          Your activity and events
                        </div>
                      </div>
                    </a>
                    <a
                      href="#"
                      className="group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-navy-600 dark:focus:bg-navy-600"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4.5 w-4.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>

                      <div>
                        <h2 className="font-medium text-slate-700 transition-colors group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light">
                          Settings
                        </h2>
                        <div className="text-xs text-slate-400 line-clamp-1 dark:text-navy-300">
                          Webapp settings
                        </div>
                      </div>
                    </a>
                    <div className="mt-3 px-4">
                      <button className="btn h-9 w-full space-x-2 bg-primary text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.5"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
