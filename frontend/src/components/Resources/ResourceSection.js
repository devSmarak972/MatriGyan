import React from "react";
import ResourceCard from "./ResourceCard";
import ResourceSectionHeader from "./ResourceSectionHeader";
import PageSeperator from "../Courses/PageSeperator";
const ResourceSection = ({props}) => {
  console.log(props,"resources");
  return (
    <div class="mt-4 transition-all duration-[.25s] sm:mt-5 lg:mt-6">
      {/* <ResourceSectionHeader title={props.sectionname}></ResourceSectionHeader> */}
      {props.sectionname && <PageSeperator title={props.sectionname}></PageSeperator>}

      <div class="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {props.cards.map(el => {
          return <ResourceCard props={el}></ResourceCard>;
        })}
      </div>
    </div>
  );
};

export default ResourceSection;
