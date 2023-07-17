import React, { useEffect, useState } from "react";
import PageSeperator from "./PageSeperator";
import Row from "./Row";

function PopularCourses({ title, courses }) {
  console.log("Courses: ", courses);
  return (
    <>
      {title && <PageSeperator title={title}></PageSeperator>}
      {courses && <Row courseData={courses}></Row>}
    </>
  );
}

export default PopularCourses;
