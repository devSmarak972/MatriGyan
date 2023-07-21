import React, { useEffect } from "react";
import { useState } from "react";
import Review from "./Review";
import data from "./data/reviews.json";
import { Select } from "@mantine/core";

const Reviews = (props) => {
  const [sortBy, setSortBy] = useState("");
  console.log(props,"reviews")
  console.log(sortBy);
  var data=props.feedback?props.feedback?.map(el=>{
    var date=new Date(el.date);
    return {
      "img": el.user.profile_img||"StudentDashboard/images/avatar/avatar-8.jpg",
      "name": el.user.full_name||"Anonymous",
      "courses": el.user.enrolled_course.length|0,
      "rating": el.rating,
      "review": el.message,
      "course": el.course.title,
      "date": date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate(),
    }
  }):[]
  if (sortBy === "" || sortBy === "Date") {
    data.sort((a, b) => {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
      return dateB - dateA;
    });
  } else if (sortBy === "Rating") {
    data.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Size") {
    data.sort((a, b) => b.review.length - a.review.length);
  }
  let top5data = data.slice(0, 5);

  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          Student Reviews
        </h2>
        <Select
          placeholder="Sort By"
          data={["Rating", "Date", "Size"]}
          value={sortBy}
          onChange={setSortBy}
          className="w-40"
        />
      </div>
      <div
        className="reviewSection scrollbar"
        style={{ maxHeight: "600px", overflowY: "scroll" }}
      >
        {top5data.map((e) => (
          <Review
            img={e.img}
            name={e.name}
            courses={e.courses}
            rating={e.rating}
            review={e.review}
            course={e.course}
            date={e.date}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
