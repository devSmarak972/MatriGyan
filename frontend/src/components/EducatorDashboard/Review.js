import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mantine/core";

const Review = (props) => {
  return (
    <div className="noHoverCard card mb-2 py-4 px-4 flex flex-column gap-3">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <img src={props.img} className="rounded-full w-18 h-18" />
          <div className="flex flex-column py-1">
            <span className="text-base font-semibold text-slate-700">
              {props.name}
            </span>
            <span className="text-sm font-medium text-slate-500">
              {props.courses} courses
            </span>
            
          </div>
        </div>
        <FontAwesomeIcon
          icon={faQuoteRight}
          style={{ color: "#c7e5ff" }}
          className="h-18"
        />
      </div>
      <div className="flex gap-2 mb-[-15px]">
        <Rating value={props.rating} fractions={10} readOnly />
        <span>({props.rating})</span>
      </div>
      <span className="text-slate-700 text-sm">{props.review}</span>
      <div className="flex justify-between items-center mb-[-5px]">
        <span className="text-sm font-semibold">{props.course}</span>
        <div className="flex gap-8 items-center">
          <span className="text-sm font-semibold">{props.date}</span>
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

export default Review;
