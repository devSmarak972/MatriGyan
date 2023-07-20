import React from "react";
import Header from "../components/Courses/Header";
import Courses from "../components/Courses/Courses";
import "./CoursePage/css/material-icons.css";
import "./CoursePage/css/app.css";
import "../components/Courses/transition.css";
import Sidebar from "../components/StudentDashboard/Sidebar";
import Filters from "../components/Courses/Filters";
import Backdrop from "../components/Courses/Backdrop";
import { useState } from "react";
import { useEffect } from "react";
import courseData from "../components/Courses/Details.json";
import ResourceSection from "../components/Resources/ResourceSection";
import data from "../components/Resources/resources.json";
import PageSeperator from "../components/Courses/PageSeperator";

function MyContents(props) {
  if (props.user !== 2) {
    window.location.href = "/not-found";
  }

  return (
    <div className="page-section tw-page">
      <Sidebar></Sidebar>
      <div className="container page__container pt-6">
        <Courses title="My Courses" courseData={courseData}></Courses>
      </div>
      <div className="container page__container pt-6 main-content w-full pb-8 px-8 ">
        <ResourceSection props={data.sections[0]}></ResourceSection>
      </div>
    </div>
  );
}

export default MyContents;
