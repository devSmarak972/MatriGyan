import React, { useEffect, useState } from "react";
import PageSeperator from "./PageSeperator";
import Row from "./Row";
function PopularCourses(props) {

  // const [coursesall, setCourses] = useState(props.courses);
  // if(coursesall.length==0){
  //   return null;
  // }

  return (
    <>
    <PageSeperator title = {props.title}></PageSeperator>
    <Row ></Row>
    </>
  );
}

export default PopularCourses;
