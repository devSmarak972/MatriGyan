import React, { useState } from "react";
import ResourceCard from "./ResourceCard";
import ResourceSectionHeader from "./ResourceSectionHeader";
import PageSeperator from "../Courses/PageSeperator";
const ResourceSection = (props) => {
  console.log(props.resource.cards,props.resource.sectionname);
  console.log("Resource Section");
  const [cards,setCards] = useState(props.resource.cards);
  if(cards.length==0){
    return null;
  }
  return (
    <div className="mt-4 transition-all duration-[.25s] sm:mt-5 lg:mt-6">
      {/* <ResourceSectionHeader title={props.sectionname}></ResourceSectionHeader> */}
      <PageSeperator title={props.resource.sectionname}></PageSeperator>

      {cards.map((card)=>{
        console.log(card,"card");
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        <ResourceCard rdata={card} key={card.id}></ResourceCard>
        {/* console.log("heelo"); */}
    </div>
      })}
    </div>
  );
};

export default ResourceSection;
