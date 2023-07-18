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

  useEffect(()=>{
    axios.get("http://127.0.0.1:8000/get-resources/")
    .then((res)=>{
      console.log(res.data.sections);
      setResources(res.data.sections);
      console.log(resources, "resources")
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  // if(resources.length==0){
  //   return null;
  // }

  // useEffect(() => {
  //   setResources({
  //     sections: resources.map((section) => ({
  //       ...section,
  //       cards: section.cards.filter((card) => {
  //         console.log(card.name.toLowerCase(), search.toLowerCase());
  //         console.log(card.name.toLowerCase().includes(search.toLowerCase()));
  //         return card.name.toLowerCase().includes(search.toLowerCase());
  //       }),
  //     })),
  //   });
  // }, [search]);

  // if(resources.length==0){
  //   return null;
  // }

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="main-content w-full pb-8 px-8 mx-8">
        <div className="form-wrapper p-8 m-8">
          <FilterTopBar
            search={search}
            handleSearch={handleSearch}
          ></FilterTopBar>
        </div>
        <div className="container-lg page__container px-6">
        {resources.map((el) => {
          console.log(el, "el");
          return <ResourceSection resource={el}></ResourceSection>;
        })}
      </div>
      </div>
    </div>
  );
};

export default Resources;
