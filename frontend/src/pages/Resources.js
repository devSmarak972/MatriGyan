import React, { useEffect, useState } from "react";
import ResourceCard from "../components/Resources/ResourceCard";
import ResourceSection from "../components/Resources/ResourceSection";
import Sidebar from "../components/StudentDashboard/Sidebar";
import FilterTopBar from "../components/General/FilterTopBar";
import data from "../components/Resources/resources.json";
import axios from "axios";

const Resources = () => {
  const [search, setSearch] = useState("");

  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/get-resources/")
      .then((res) => {
        // console.log(res.data.sections);
        setResources(res.data.sections);
        // console.log(resources, "resources");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="min-h-[100vh]  flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar></Sidebar>
      <div className="main-content w-full px-[var(--margin-x)]">
        <div className="form-wrapper mt-3">
          <FilterTopBar
            search={search}
            handleSearch={handleSearch}
          ></FilterTopBar>
        </div>
        <div className="container-lg page__container">
          {resources
            .map((section) => ({
              sectionname: section.sectionname,
              cards: section.cards.filter((card) => {
                // console.log(card.title.toLowerCase(), search);
                return card.title.toLowerCase().includes(search);
              }),
            }))
            .map((el) => {
              return (
                <ResourceSection
                  resource={el}
                  search={search}
                ></ResourceSection>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Resources;
