import React from "react";
import ResourceCard from "../components/Resources/ResourceCard";
import ResourceSection from "../components/Resources/ResourceSection";
import Sidebar from "../components/StudentDashboard/Sidebar";
import FilterTopBar from "../components/General/FilterTopBar";

const Resources = () => {
  var data = {
    sections: [
      {
        sectionname: "Recent uploads",
        cards: [
          {
            bgimage:
              "https://entri.app/blog/wp-content/uploads/2020/04/JEE-blog-thumbnail-1-750x375.png",
            name: "JEE Mains study Material",
            description:
              "Complete study material for JEE Mains covering all the important aspects of the syllabus prepared by esteemed faculties with 10+ years of experience",
            avatar:
              "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png",
            uploader: "Roshan Kumar",
            date: "12/7/2023",
          },
          {
            bgimage:
              "https://entri.app/blog/wp-content/uploads/2020/04/JEE-blog-thumbnail-1-750x375.png",
            name: "JEE Mains study Material",
            description:
              "Complete study material for JEE Mains covering all the important aspects of the syllabus prepared by esteemed faculties with 10+ years of experience",
            avatar:
              "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png",
            uploader: "Roshan Kumar",
            date: "12/7/2023",
          },
          {
            bgimage:
              "https://entri.app/blog/wp-content/uploads/2020/04/JEE-blog-thumbnail-1-750x375.png",
            name: "JEE Mains study Material",
            description:
              "Complete study material for JEE Mains covering all the important aspects of the syllabus prepared by esteemed faculties with 10+ years of experience",
            avatar:
              "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png",
            uploader: "Roshan Kumar",
            date: "12/7/2023",
          },
          {
            bgimage:
              "https://entri.app/blog/wp-content/uploads/2020/04/JEE-blog-thumbnail-1-750x375.png",
            name: "JEE Mains study Material",
            description:
              "Complete study material for JEE Mains covering all the important aspects of the syllabus prepared by esteemed faculties with 10+ years of experience",
            avatar:
              "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png",
            uploader: "Roshan Kumar",
            date: "12/7/2023",
          },
          {
            bgimage:
              "https://entri.app/blog/wp-content/uploads/2020/04/JEE-blog-thumbnail-1-750x375.png",
            name: "JEE Mains Formula Sheet",
            description:
              "Complete study material for JEE Mains covering all the important aspects of the syllabus prepared by esteemed faculties with 10+ years of experience",
            avatar:
              "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png",
            uploader: "Roshan Kumar",
            date: "12/7/2023",
          },
          {
            bgimage:
              "https://entri.app/blog/wp-content/uploads/2020/04/JEE-blog-thumbnail-1-750x375.png",
            name: "JEE Advanced study Material",
            description:
              "Complete study material for JEE Mains covering all the important aspects of the syllabus prepared by esteemed faculties with 10+ years of experience",
            avatar:
              "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png",
            uploader: "Roshan Kumar",
            date: "12/7/2023",
          },
        ],
      },
    ],
  };
  return (
    <div>
      <Sidebar></Sidebar>
      <div class="main-content w-full pb-8 px-8">
        <div class="form-wrapper p-8 m-8">
         <FilterTopBar></FilterTopBar>
        </div>
        {data.sections.map(el => {
          return <ResourceSection props={el}></ResourceSection>;
        })}
      </div>
    </div>
  );
};

export default Resources;
