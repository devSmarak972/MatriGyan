import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Course from "./Course";

const CurrentCourses = () => {
  const ref = useRef(null);
  
  const [slides, setSlides] = useState(0);
   var courses = [
     {
       percent: 100,
       coursename: "Basic Mathematics - I",
       educator: "Anand Yadav",
       image: "https://i.ytimg.com/vi/dfUDCgaFOBE/maxresdefault.jpg",
     },
     {
       percent: 90,
       coursename: "JEE Mains Physics Crash Course",
       educator: "Mridul Nayak",
       image:
         "https://www.careerorbits.com/wp-content/uploads/2022/04/JMCC-page-thumbnail.jpg",
     },
     {
       percent: 45,
       coursename: "JEE Advanced PYQ rapid",
       educator: "Adarsh Gupta",
       image:
         "https://score-cdn-devinfinitylearn.s3.ap-south-1.amazonaws.com/Ilwebsite/Autopayment/jeeAdvancedThb.webp",
     },
     {
       percent: 50,
       coursename: "JEE Mains Success Achiever Course",
       educator: "Anand Yadav",
       image:
         "https://www.vedantu.com/seo/learning-videos/18aa5c5d-1fb7-41ee-b091-bc65f1a72865.png",
     },
   ];
  useLayoutEffect(() => {
    setSlides(() => {
      let width = ref.current.offsetWidth;
      console.log(width);
      if (width < 500) return 1;
      else if (width < 750) return 1.3;
      else if (width < 1500) return 2.3;
      else return 3.3;
    });
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setSlides(() => {
        let width = ref.current.offsetWidth;
        console.log(width);
        if (width < 500) return 1;
        else if (width < 900) return 1.3;
        else if (width < 1400) return 2.3;
        else return 3.3;
      });
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div transition={{ duration: 0.5, staggerChildren: 0.5 }}>
      <div className="flex justify-between mt-5 px-[var(--margin-x)] transition-all duration-[.25s]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-lg font-bold tracking-wide text-slate-700 dark:text-navy-100">
          My Courses
        </motion.p>
        <a
          href="#"
          class="pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">
          View All
        </a>
      </div>
      <div className="flex">
        <div
          ref={ref}
          className="swiper mx-0 mt-4 px-[var(--margin-x)] transition-all duration-[.25s]">
          <swiper-container
            className="swiper-wrapper"
            slides-per-view={slides}
            space-between="25">
            {courses.map(el => {
              return (
                <swiper-slide>
                  <Course {...el} />
                </swiper-slide>
              );
            })}
          </swiper-container>
        </div>
      </div>
    </div>
  );
};

export default CurrentCourses;
