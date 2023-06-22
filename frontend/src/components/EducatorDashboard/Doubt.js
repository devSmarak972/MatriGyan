import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faCircleUp,
  faComment,
  faFileCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Doubt = (props) => {
  return (
    <div className="card py-4 px-8 flex flex-column gap-3">
      <div className="flex justify-between items-center">
        <div className="flex flex-column justify-between py-1">
          <div className="flex items-center gap-1">
            <span>Asked By</span>
            <span className="text-small font-semibold text-slate-700">
              {props.name}
            </span>
          </div>
          <span className="text-sm font-medium text-slate-500">
            {props.video ? "Video " + props.video : "(Live Lecture)"}
          </span>
          <span className="text-sm font-semibold text-slate-500">
            {props.course}
          </span>
        </div>
        <FontAwesomeIcon
          icon={faFileCircleQuestion}
          style={{ color: "#c7e5ff" }}
          className="h-14"
        />
      </div>
      <span className="text-slate-700 font-medium text-base">
        {props.question}
      </span>
      <div className="flex justify-between items-center mb-[-5px]">
        <span className="text-sm">{props.date}</span>
        <div className="flex gap-8 items-center">
          <Link
            to="#"
            className="flex items-center text-[#334155] hover:text-[##228be6]"
          >
            <span className="font-medium mr-1">{props.replies}</span>
            <span className="font-medium mr-1 hidden sm:inline">Replies</span>
            <FontAwesomeIcon icon={faComment} className="h-5" />
          </Link>
          <Link
            to="#"
            className="flex items-center text-[#334155] hover:text-[##228be6]"
          >
            <span className="font-medium mr-1">{props.upvotes}</span>
            <span className="font-medium mr-1 hidden sm:inline">Upvotes</span>
            <FontAwesomeIcon icon={faCircleUp} className="h-5" />
          </Link>
          <FontAwesomeIcon
            icon={faEllipsis}
            style={{ color: "#64748b" }}
            className="h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default Doubt;
