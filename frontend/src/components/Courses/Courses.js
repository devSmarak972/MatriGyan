import React from "react";
import PageSeperator from "./PageSeperator";
import Row from "./Row";

function PopularCourses({ title, courseData }) {
  console.log("Courses: ", courseData);
  return (
    <>
      {title && <PageSeperator title={title}></PageSeperator>}
      <Row courseData={courseData}></Row>

    </>
  );
}

export default PopularCourses;
