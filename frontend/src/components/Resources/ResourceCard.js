import React from "react";
import { Link } from "react-router-dom";

function ResourceCard(props) {
  const formatDate = (date) => {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return day + "/" + month + "/" + year;
  };

  return (
    <div className="flex flex-col col-span-1 rounded-2xl h-fit shadow-[0_0px_20px_0_rgb(0,0,0,0.05)] bg-transparent hover:scale-105 ease-in-out duration-300">
      {props.rdata.image && (
        <img
          className="h-40 w-full rounded-t-2xl object-cover object-center"
          src={props.rdata.image}
          alt="image"
        />
      )}
      <div
        className={`${
          !props.rdata.image && "rounded-t-xl"
        } bg-white rounded-b-xl duration-300  grow p-4`}
      >
        <div>
          <Link
            to={`../resourceview/${props.rdata.id}/`}
            className="text-sm+ font-medium text-slate-700 line-clamp-1 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
          >
            {props.rdata.title}
          </Link>
        </div>
        <p className="mt-2 grow line-clamp-3">{props.rdata.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <a
            href="#"
            className="flex items-center space-x-2 text-xs hover:text-slate-800 dark:hover:text-navy-100"
          >
            {props.rdata?.creator?.profile_pic ? (
              <div className="avatar h-6 w-6">
                <img
                  className="rounded-full"
                  src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                  alt="avatar"
                />
              </div>
            ) : (
              <div className="avatar h-6 w-6">
                <img
                  className="rounded-full"
                  src="https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg"
                  alt="avatar"
                />
              </div>
            )}
            <span className="line-clamp-1">{props.rdata?.creator?.name}</span>
          </a>
          {/* <p className="m-0 flex shrink-0 items-center space-x-1.5 text-slate-400 dark:text-navy-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-xs">{formatDate(props.rdata.date)}</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default ResourceCard;
