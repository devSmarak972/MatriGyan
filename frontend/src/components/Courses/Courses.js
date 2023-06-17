import React from "react";
import PageSeperator from "./PageSeperator";
import Row from "./Row";
function PopularCourses({title}) {
  return (
    <>
    <PageSeperator title = {title}></PageSeperator>
    <Row></Row>
    </>
  );
}

export default PopularCourses;
