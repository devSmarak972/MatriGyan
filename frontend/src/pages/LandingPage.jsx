import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/LandingPage/Navbar";
import Stats from "../components/LandingPage/Stats";
import Home from "../components/LandingPage/Home";
import Category from "../components/LandingPage/Category";
import Info from "../components/LandingPage/Info";
import Instructors from "../components/LandingPage/Instructors";
import Courses from "../components/LandingPage/Courses";
// import '../components/LandingPage/assets/css/bootstrap.min.css';
// import '../components/LandingPage/assets/css/owl.carousel.min.css';
// import '../components/LandingPage/assets/css/owl.theme.default.min.css';
// import '../components/LandingPage/assets/css/style.css';
import "font-awesome/css/font-awesome.min.css";

// import AOS from 'aos';
// import 'aos/dist/aos.css';
import Point from "../components/LandingPage/Point";
import Footer from "../components/LandingPage/Footer";
import SearchLanding from "../components/LandingPage/SearchLanding";
import Loader from "../loader";
const LandingPage = () => {
  // useEffect(() => {
  //   AOS.init();
  // }, []);
  const [loader, setLoader] = useState(true)
  useEffect(()=>{
    
      console.log(loader,"loader")
      setLoader(false);
      
   
  },[])
  // import
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Courses");
  const [searchPage, setSearchPage] = useState(0);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
    {loader?<Loader></Loader>:""}

  
    <div className="main-wrapper" id="landingpage">
      <Navbar
        searchPage={searchPage}
        setSearchPage={setSearchPage}
        search={search}
        category={category}
        handleSearch={handleSearch}
        handleCategory={handleCategory}
      ></Navbar>
      {!searchPage && (
        <div>
          <Home
            search={search}
            handleSearch={handleSearch}
            category={category}
            handleCategory={handleCategory}
            searchPage={searchPage}
            setSearchPage={setSearchPage}
          ></Home>
          <Stats></Stats>
          <Category></Category>
          <Courses></Courses>
          <Info></Info>
          <Instructors></Instructors>
          <Point></Point>
          <Footer></Footer>
        </div>
      )}
      {searchPage && (
        <SearchLanding
          search={search}
          handleSearch={handleSearch}
          category={category}
          handleCategory={handleCategory}
        />
      )}
    </div>
    </>
  );
};

export default LandingPage;
