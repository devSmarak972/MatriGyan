import React, { useEffect, useState } from "react";
import ResourceCard from "../components/Resources/ResourceCard";
import ResourceSection from "../components/Resources/ResourceSection";
import Sidebar from "../components/StudentDashboard/Sidebar";
import FilterTopBar from "../components/General/FilterTopBar";
import data from "../components/Resources/resources.json";

const Resources = () => {
  const [search, setSearch] = useState("");

  const [resources, setResources] = useState({
    sections: data.sections.map((section) => ({
      ...section,
      cards: section.cards.filter((card) => {
        console.log(card.name.toLowerCase(), search.toLowerCase());
        console.log(card.name.toLowerCase().includes(search.toLowerCase()));
        return card.name.toLowerCase().includes(search.toLowerCase());
      }),
    })),
  });
  useEffect(() => {
    setResources({
      sections: data.sections.map((section) => ({
        ...section,
        cards: section.cards.filter((card) => {
          console.log(card.name.toLowerCase(), search.toLowerCase());
          console.log(card.name.toLowerCase().includes(search.toLowerCase()));
          return card.name.toLowerCase().includes(search.toLowerCase());
        }),
      })),
    });
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div class="main-content w-full pb-8 px-8 mx-8">
        <div class="form-wrapper p-8 m-8">
          <FilterTopBar
            search={search}
            handleSearch={handleSearch}
          ></FilterTopBar>
        </div>
        <div className="container-lg page__container px-6">
        {resources.sections.map((el) => {
          return <ResourceSection props={el}></ResourceSection>;
        })}
      </div>
      </div>
    </div>
  );
};

export default Resources;
