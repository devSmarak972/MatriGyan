import React, { useEffect, useState } from "react";
import ResourceCard from "./ResourceCard";
import ResourceSectionHeader from "./ResourceSectionHeader";
import PageSeperator from "../Courses/PageSeperator";
const ResourceSection = (props) => {
  const [cards, setCards] = useState(props.resource.cards);

  useEffect(() => {
    setCards((prev) =>
      props.resource.cards.filter((card) =>
        card.title.toLowerCase().includes(props.search)
      )
    );
  }, [props.search]);

  useEffect(() => {
    setCards(props.resource.cards);
  }, [props.resource.cards]);

  if (cards.length == 0) {
    return null;
  }

  return (
    <div className="mt-4 transition-all duration-[.25s] sm:mt-5 lg:mt-6">
      {/* <ResourceSectionHeader title={props.resource.sectionname}></ResourceSectionHeader> */}
      <PageSeperator title={props.resource.sectionname}></PageSeperator>

      <div className="my-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {cards.map((card) => {
          return (
            <ResourceCard
              rdata={card}
              key={card.id}
              className=""
            ></ResourceCard>
          );
        })}
      </div>
    </div>
  );
};

export default ResourceSection;
