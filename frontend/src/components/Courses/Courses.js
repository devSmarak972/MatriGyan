import React from "react";
import PageSeperator from "./PageSeperator";
import Row from "./Row";
function PopularCourses(props) {
  return (
    <>
    <PageSeperator title = {props.title}></PageSeperator>
    <Row courses = {props.courses}></Row>
    </>
  );
}

export default PopularCourses;
